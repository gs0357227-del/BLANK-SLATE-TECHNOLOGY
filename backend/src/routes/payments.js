const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const PaymentService = require('../services/paymentService');
const EmailService = require('../services/emailService');
const User = require('../models/User');
const Payment = require('../models/Payment');

// @route   POST /api/payments/subscribe
// @desc    Create subscription
// @access  Private
router.post('/subscribe', protect, async (req, res, next) => {
  try {
    const { tier, period } = req.body;

    if (!['pro', 'studio'].includes(tier)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid tier'
      });
    }

    const user = await User.findById(req.user.id);

    // Create subscription
    const subscription = await PaymentService.createSubscription(user, tier, period);

    // Send confirmation email
    await EmailService.sendSubscriptionConfirmationEmail(user, tier);

    res.json({
      success: true,
      message: 'Subscription created',
      subscription
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/payments/cancel
// @desc    Cancel subscription
// @access  Private
router.post('/cancel', protect, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    await PaymentService.cancelSubscription(user);

    res.json({
      success: true,
      message: 'Subscription cancelled at end of period'
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/payments/webhook
// @desc    Handle Stripe webhooks
// @access  Public
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res, next) => {
  try {
    const sig = req.headers['stripe-signature'];
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (error) {
      return res.status(400).send(`Webhook Error: ${error.message}`);
    }

    // Handle event
    await PaymentService.handleWebhook(event);

    res.json({ received: true });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/payments/history
// @desc    Get payment history
// @access  Private
router.get('/history', protect, async (req, res, next) => {
  try {
    const payments = await Payment.find({ user: req.user.id })
      .sort('-createdAt')
      .limit(20);

    res.json({
      success: true,
      data: payments
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/payments/subscription
// @desc    Get subscription details
// @access  Private
router.get('/subscription', protect, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    res.json({
      success: true,
      data: user.subscription
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
