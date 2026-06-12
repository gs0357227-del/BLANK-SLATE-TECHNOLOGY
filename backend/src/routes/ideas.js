const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { ideaGenerationLimiter, apiLimiter } = require('../middleware/rateLimiter');
const IdeaGenerationService = require('../services/ideaGenerationService');
const Idea = require('../models/Idea');
const User = require('../models/User');
const Comment = require('../models/Comment');

// @route   GET /api/ideas
// @desc    Get all ideas with pagination
// @access  Public
router.get('/', apiLimiter, async (req, res, next) => {
  try {
    const { page = 1, limit = 20, category, difficulty, sort = '-createdAt' } = req.query;
    const skip = (page - 1) * limit;

    const filter = { status: 'published' };
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;

    const ideas = await Idea.find(filter)
      .populate('author', 'username avatar')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Idea.countDocuments(filter);

    res.json({
      success: true,
      count: ideas.length,
      total,
      pages: Math.ceil(total / limit),
      data: ideas
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/ideas/trending
// @desc    Get trending ideas
// @access  Public
router.get('/trending', apiLimiter, async (req, res, next) => {
  try {
    const { limit = 10 } = req.query;

    const ideas = await Idea.find({ status: 'published' })
      .populate('author', 'username avatar')
      .sort('-stats.upvotes -stats.views')
      .limit(parseInt(limit));

    res.json({
      success: true,
      data: ideas
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/ideas/:id
// @desc    Get single idea
// @access  Public
router.get('/:id', async (req, res, next) => {
  try {
    const idea = await Idea.findById(req.params.id)
      .populate('author', 'username avatar bio')
      .populate('comments');

    if (!idea) {
      return res.status(404).json({
        success: false,
        message: 'Idea not found'
      });
    }

    // Increment view count
    idea.stats.views += 1;
    await idea.save();

    res.json({
      success: true,
      data: idea
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/ideas/generate
// @desc    Generate new AI idea
// @access  Private
router.post('/generate', protect, ideaGenerationLimiter, async (req, res, next) => {
  try {
    const { category, difficulty, techStack } = req.body;
    const user = await User.findById(req.user.id);

    // Check user limits for free tier
    if (user.subscription.tier === 'free') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (user.usage.lastGeneratedAt) {
        const lastGenerated = new Date(user.usage.lastGeneratedAt);
        lastGenerated.setHours(0, 0, 0, 0);

        if (lastGenerated.getTime() === today.getTime()) {
          if (user.usage.ideasGeneratedToday >= 5) {
            return res.status(403).json({
              success: false,
              message: 'Daily limit reached. Upgrade to Pro for unlimited ideas.',
              limit: 5,
              generated: user.usage.ideasGeneratedToday
            });
          }
        } else {
          user.usage.ideasGeneratedToday = 0;
        }
      }
    }

    // Generate idea
    const result = await IdeaGenerationService.generateIdea(category, difficulty, techStack);

    // Create idea document
    const idea = new Idea({
      ...result.idea,
      author: user._id,
      generatedBy: 'gpt-4',
      sourceData: {
        trendingTopics: req.body.trendingTopics || [],
        techStack: techStack || []
      }
    });

    await idea.save();

    // Update user usage
    user.usage.ideasGeneratedToday += 1;
    user.usage.totalIdeasGenerated += 1;
    user.usage.lastGeneratedAt = new Date();
    await user.save();

    // Broadcast to socket.io
    global.io?.emit('new_idea', {
      ideaId: idea._id,
      title: idea.title,
      category: idea.category,
      author: user.username
    });

    res.status(201).json({
      success: true,
      message: 'Idea generated successfully',
      data: idea
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/ideas/:id/vote
// @desc    Vote on an idea
// @access  Private
router.post('/:id/vote', protect, async (req, res, next) => {
  try {
    const { voteType } = req.body;

    if (!['up', 'down'].includes(voteType)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid vote type'
      });
    }

    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      return res.status(404).json({
        success: false,
        message: 'Idea not found'
      });
    }

    const user = await User.findById(req.user.id);

    // Check if user already voted
    const existingVote = user.votedIdeas.find(v => v.ideaId.toString() === idea._id.toString());

    if (existingVote) {
      // Remove old vote
      if (existingVote.voteType === 'up') {
        idea.stats.upvotes -= 1;
      } else {
        idea.stats.downvotes -= 1;
      }
    }

    // Add new vote
    if (voteType === 'up') {
      idea.stats.upvotes += 1;
    } else {
      idea.stats.downvotes += 1;
    }

    if (existingVote) {
      user.votedIdeas = user.votedIdeas.filter(v => v.ideaId.toString() !== idea._id.toString());
    }

    user.votedIdeas.push({ ideaId: idea._id, voteType });
    user.usage.totalVotesCast += 1;

    await idea.save();
    await user.save();

    res.json({
      success: true,
      message: 'Vote recorded',
      data: idea
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/ideas/:id/save
// @desc    Save idea
// @access  Private
router.post('/:id/save', protect, async (req, res, next) => {
  try {
    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      return res.status(404).json({
        success: false,
        message: 'Idea not found'
      });
    }

    const user = await User.findById(req.user.id);

    if (user.savedIdeas.includes(idea._id)) {
      user.savedIdeas = user.savedIdeas.filter(id => id.toString() !== idea._id.toString());
      idea.stats.saves -= 1;
    } else {
      user.savedIdeas.push(idea._id);
      idea.stats.saves += 1;
    }

    user.usage.totalIdeasSaved = user.savedIdeas.length;

    await idea.save();
    await user.save();

    res.json({
      success: true,
      message: idea.stats.saves > 0 ? 'Idea saved' : 'Idea removed from saved',
      saved: user.savedIdeas.includes(idea._id)
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
