# 📋 Blank Slate Tech - Moderator & Admin Guide

**Version 1.0 | June 2026**

---

## Table of Contents
1. [Getting Started](#getting-started)
2. [Admin Dashboard](#admin-dashboard)
3. [Daily Moderation Tasks](#daily-moderation-tasks)
4. [Content Moderation](#content-moderation)
5. [User Management](#user-management)
6. [Revenue & Analytics](#revenue--analytics)
7. [Affiliate Management](#affiliate-management)
8. [Troubleshooting](#troubleshooting)
9. [Quick Reference](#quick-reference)

---

## Getting Started

### Day 1 - Setup

#### 1. Access Admin Dashboard
```
URL: http://localhost:3000
Username: admin@blankslatetech.com
Password: [Your password from setup]
```

#### 2. Verify Services Running
```bash
docker-compose ps
```

You should see:
- ✅ `blank-slate-backend` (running)
- ✅ `blank-slate-mongodb` (running)
- ✅ `blank-slate-redis` (running)
- ✅ `blank-slate-web` (running)

#### 3. First Login
- Go to web dashboard
- Click "Login"
- Enter admin credentials
- You'll see the admin panel

---

## Admin Dashboard

### Dashboard Overview

The dashboard shows real-time metrics:

```
┌─────────────────────────────────────────────┐
│  📊 BLANK SLATE TECH ADMIN DASHBOARD        │
├─────────────────────────────────────────────┤
│                                             │
│  Users: 145        Ideas: 342               │
│  Subscribers: 23   Revenue: $542.15         │
│                                             │
│  [Chart: Ideas Generated (7 days)]          │
│  [Chart: Revenue (7 days)]                  │
│                                             │
│  Recent Activity:                           │
│  • 3 new ideas pending review               │
│  • 2 new subscribers (Pro tier)             │
│  • 1 affiliate withdrawal request           │
│                                             │
└─────────────────────────────────────────────┘
```

### Key Metrics to Monitor

**Daily:**
- New users signed up
- New ideas submitted
- New subscriptions
- Affiliate referrals

**Weekly:**
- Total revenue
- Engagement rate
- Top categories
- Top affiliates

**Monthly:**
- Churn rate
- Growth trends
- User retention
- Revenue forecasts

---

## Daily Moderation Tasks

### Morning Checklist (30 minutes)

```
⏰ 9:00 AM - Start Your Day

□ 1. Check Dashboard
   - Review overnight submissions
   - Note any system issues
   
□ 2. Review New Ideas (5-10 minutes)
   - Navigate to Ideas > Pending
   - Sort by newest first
   - Quick scan for obvious issues
   
□ 3. Check User Reports (2-3 minutes)
   - Navigate to Users > Reported
   - Review any flagged content
   
□ 4. Monitor Analytics (2-3 minutes)
   - Check revenue chart
   - Note any anomalies
   
□ 5. Email Check (5 minutes)
   - Affiliate withdrawal requests
   - User support tickets
   - System alerts
```

### Mid-Day Check (15 minutes)

```
⏰ 1:00 PM - Mid-Day Update

□ 1. Approve/Reject Ideas
   - Review pending ideas from morning
   - Make decisions on borderline ideas
   
□ 2. Respond to User Complaints
   - Check support queue
   - Reply to urgent issues
```

### Evening Wrap-Up (10 minutes)

```
⏰ 5:00 PM - End of Day

□ 1. Final Content Review
   - Approve any last ideas
   
□ 2. Check Revenue
   - Verify daily totals
   
□ 3. Tomorrow's Prep
   - Note any pending tasks
   - Set priorities for tomorrow
```

---

## Content Moderation

### Ideas Moderation

#### Workflow

```
New Idea Submitted
       ↓
   [PENDING]
   (Awaiting Review)
       ↓
   ┌─────────────────┐
   │  APPROVE        │ → [PUBLISHED] ✅
   │  (Good idea)    │
   ├─────────────────┤
   │  REQUEST EDITS  │ → [DRAFT] 📝
   │  (Minor issues) │
   ├─────────────────┤
   │  REJECT         │ → [REJECTED] ❌
   │  (Bad quality)  │
   └─────────────────┘
```

#### Step-by-Step Review Process

1. **Navigate to Ideas Tab**
   ```
   Click: Ideas > Moderation Queue
   ```

2. **Select Pending Idea**
   - Ideas are sorted by date submitted
   - Click idea title to view full details

3. **Review Criteria** (Approve if ✅ all pass)
   ```
   ✅ Title is clear & descriptive
   ✅ Problem is well-defined
   ✅ Solution is feasible
   ✅ No offensive language
   ✅ No spam/self-promotion
   ✅ Tech stack is realistic
   ✅ Market analysis is reasonable
   ✅ AI scores: 50+ originality, 60+ feasibility
   ```

4. **Make Decision**

   **Option A: APPROVE** (Green button)
   ```
   - Idea published immediately
   - Users can now view & vote
   - Idea appears in trending
   ```

   **Option B: REQUEST EDITS** (Yellow button)
   ```
   - Leave comment: "Fix X, Y, Z"
   - Idea stays in draft
   - Author gets notification
   - Can resubmit after edits
   ```

   **Option C: REJECT** (Red button)
   ```
   - Leave reason: "Duplicate", "Not viable", etc
   - Archived from queue
   - Author gets notification
   ```

#### Red Flags 🚩

**REJECT these ideas:**
- Offensive, discriminatory content
- Explicit/adult content
- Spam or plagiarized
- Illegal activities
- Scams or MLM
- Duplicate of existing idea
- Completely unfeasible tech stack

**REQUEST EDITS for:**
- Unclear descriptions
- Unrealistic timelines
- Missing key details
- Grammar/spelling errors
- Vague target audience

#### AI Score Guide

```
Originality (0-100)
├─ 0-30: Existing, been done before
├─ 30-60: Similar to existing, some unique angle
├─ 60-80: Novel approach, interesting twist
└─ 80-100: Truly unique, never seen before

Feasibility (0-100)
├─ 0-30: Extremely difficult, cutting edge
├─ 30-60: Challenging but possible
├─ 60-80: Realistic for indie developer
└─ 80-100: Straightforward to build

Market Potential (0-100)
├─ 0-30: Niche market, limited appeal
├─ 30-60: Moderate market, some demand
├─ 60-80: Strong market demand
└─ 80-100: Huge market opportunity

💡 Approve if: (Originality + Feasibility + Market) / 3 > 60
```

---

## User Management

### Dashboard Features

**Navigate to:** Users > All Users

### User Actions

#### 1. View User Profile
```
Click username → See full profile
├─ Account info
├─ Subscription status
├─ Generated ideas count
├─ Saved ideas count
├─ Affiliate status
└─ Activity history
```

#### 2. Manage Subscriptions
```
Click "Manage Subscription" button
├─ View current tier (Free/Pro/Studio)
├─ View renewal date
├─ View payment history
└─ Option to cancel (rare)
```

#### 3. Handle User Issues

**User Complaint:** "I was charged twice"
```
Steps:
1. View payment history
2. Verify duplicate charges
3. Contact Stripe support
4. Email user with resolution
5. Offer refund if legitimate
6. Log issue in ticket system
```

**User Request:** "Delete my account"
```
Steps:
1. Verify identity (check email)
2. Anonymize all personal data
3. Keep idea records for analytics
4. Send confirmation email
5. Mark account as deleted
```

**Account Security:** "I think I was hacked"
```
Steps:
1. Send password reset link
2. Suggest 2FA enablement
3. Review recent activity
4. Monitor for fraud
5. Contact if suspicious activity detected
```

### Ban/Suspend Users

**When to suspend:**
- Repeated spam submissions
- Harassment/abuse in comments
- Multiple rejected ideas with same issue
- Fraudulent payment attempts

**How to suspend:**
```
Users → Select user → Click "Suspend"
├─ Choose duration (7 days, 30 days, permanent)
├─ Add reason
├─ User gets notification
└─ All accounts locked until unblocked
```

---

## Revenue & Analytics

### Dashboard Metrics

**Navigate to:** Analytics > Dashboard

```
┌─────────────────────────────────────┐
│  📈 REVENUE DASHBOARD               │
├─────────────────────────────────────┤
│                                     │
│  Today's Revenue:      $45.67       │
│  This Month:           $1,234.56    │
│  Lifetime:             $5,432.10    │
│                                     │
│  Subscriptions:        $890.23      │
│  Affiliate Commissions: $234.12     │
│  Other:                $110.21      │
│                                     │
│  [Line chart: Daily revenue]        │
│  [Pie chart: Revenue by type]       │
│                                     │
└─────────────────────────────────────┘
```

### Key Metrics Explained

**Monthly Recurring Revenue (MRR)**
```
= (Pro subscribers × $4.99) + (Studio subscribers × $14.99)
Example: (50 × $4.99) + (15 × $14.99) = $474.85
```

**Churn Rate**
```
= (Cancelled subscriptions / Starting subscribers) × 100
Target: < 5% per month
```

**Customer Acquisition Cost (CAC)**
```
= Marketing spend / New customers acquired
```

**Lifetime Value (LTV)**
```
= (Average subscription value × Average subscription duration)
Target: LTV > 3× CAC
```

### Revenue Reports

**Weekly Report** (Every Monday)
```
1. Check revenue chart
2. Compare to previous week
3. Note growth/decline
4. Check for anomalies
5. Report findings
```

**Monthly Report** (First of month)
```
1. Calculate total revenue
2. Break down by source
3. Calculate MRR
4. Identify trends
5. Plan next month
```

---

## Affiliate Management

### Dashboard Features

**Navigate to:** Affiliates > Dashboard

### Affiliate Metrics

```
┌─────────────────────────────────┐
│  Affiliate ID: AFF-45820        │
│  Code: JOHN123456              │
│  Status: Active                │
├─────────────────────────────────┤
│  Total Referrals: 12           │
│  Conversions: 3 (25%)          │
│  Total Earnings: $150.00       │
│  Pending Earnings: $45.00      │
│  Commission Rate: 20%          │
└─────────────────────────────────┘
```

### Affiliate Tasks

#### 1. Review Affiliate Applications
```
Navigate: Affiliates > Applications
├─ Check applicant details
├─ Verify email
├─ Approve → Generates code
└─ Reject → Send reason
```

#### 2. Process Withdrawal Requests
```
Navigate: Affiliates > Withdrawals
├─ Review pending requests
├─ Verify pending balance
├─ Approve → Transfer to bank
├─ Reject → Note reason
└─ Completed → Mark as processed
```

#### 3. Monitor Top Affiliates
```
Navigate: Affiliates > Rankings
├─ Identify high performers
├─ Increase commission for top 10% (optional)
├─ Contact to thank them
└─ Ask for feedback
```

### Managing Affiliate Issues

**Issue: Affiliate using deceptive tactics**
```
Steps:
1. Review referral sources
2. Check for bot traffic
3. Verify real users
4. If fraud: Revoke code, keep earnings
5. If approved: Send warning
```

**Issue: Slow payout processing**
```
Steps:
1. Check Stripe transfer status
2. Verify bank details
3. Contact support if delayed
4. Notify affiliate of status
```

---

## Troubleshooting

### Common Issues

#### Issue 1: Ideas not generating
```
Symptoms:
- Idea generation button doesn't work
- Users report "error" message
- API returns 500 error

Solution:
1. Check OpenAI API key in .env
2. Verify API hasn't hit rate limit
3. Check MongoDB connection
4. Restart backend: docker-compose restart backend
5. Check logs: docker-compose logs backend
```

#### Issue 2: Stripe webhook not firing
```
Symptoms:
- Subscriptions not updating
- Payments not recorded
- Users can't subscribe

Solution:
1. Verify webhook URL in Stripe dashboard
2. Check webhook secret in .env
3. Restart backend
4. Test webhook manually in Stripe
5. Check backend logs for webhook errors
```

#### Issue 3: Database connection issues
```
Symptoms:
- Can't load ideas
- User profiles not saving
- API returning 500 errors

Solution:
1. Verify MongoDB connection string in .env
2. Check MongoDB Atlas IP whitelist
3. Restart MongoDB: docker-compose restart mongodb
4. Check MongoDB logs
5. Verify credentials
```

#### Issue 4: Users unable to login
```
Symptoms:
- "Invalid credentials" error
- Users locked out
- Session issues

Solution:
1. Check JWT_SECRET in .env
2. Verify password hashing working
3. Check Redis connection
4. Clear user sessions: redis-cli FLUSHALL
5. Have user reset password
```

### Getting Help

**Debug Mode:**
```bash
# Check backend logs in real-time
docker-compose logs -f backend

# Check all services
docker-compose ps

# Restart a specific service
docker-compose restart backend
```

**Check System Health:**
```bash
# API health check
curl http://localhost:5000/api/health

# Database check
mongo "mongodb://localhost:27017/blank-slate-tech"
```

---

## Quick Reference

### Important URLs

```
Admin Dashboard:    http://localhost:3000
Backend API:        http://localhost:5000
MongoDB:            mongodb://localhost:27017
Redis:              localhost:6379
API Health:         http://localhost:5000/api/health
API Docs:           /docs/API.md (in repo)
```

### File Locations

```
Backend:            /backend/
├─ Routes:          /src/routes/
├─ Models:          /src/models/
├─ Services:        /src/services/
└─ Config:          /src/config/

Web:                /web/
├─ Pages:           /src/pages/
├─ Components:      /src/components/
└─ Store:           /src/store/

Docs:               /docs/
├─ SETUP.md         Setup guide
├─ API.md           API documentation
└─ ARCHITECTURE.md  System design
```

### Commands Cheat Sheet

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f [service-name]

# Access MongoDB
docker exec -it blank-slate-mongodb mongosh

# Access Redis
docker exec -it blank-slate-redis redis-cli

# Restart a service
docker-compose restart [service-name]

# View running services
docker-compose ps

# Full rebuild
docker-compose up -d --build

# Clean everything
docker-compose down -v
```

### Database Queries (MongoDB)

**View all ideas:**
```javascript
db.ideas.find().limit(10)
```

**View all users:**
```javascript
db.users.find().limit(10)
```

**View pending ideas:**
```javascript
db.ideas.find({ status: "draft" })
```

**View premium subscribers:**
```javascript
db.users.find({ "subscription.tier": "pro" })
```

**View affiliates:**
```javascript
db.affiliates.find().sort({ totalEarnings: -1 })
```

### Email Templates

**New Idea Rejected:**
```
Subject: Your Idea Submission

Hi [User],

Thank you for submitting "[Idea Title]" to Blank Slate Tech.

After review, we decided not to publish this idea at this time.

Reason: [Specific feedback]

We encourage you to refine and resubmit. Great ideas start with feedback!

Best regards,
Blank Slate Tech Team
```

**Affiliate Payout Processed:**
```
Subject: Your Affiliate Earnings - Payment Sent!

Hi [Affiliate],

Great news! Your affiliate earnings have been processed.

Amount: $[Amount]
Date: [Date]
Status: Completed
Reference: [TXN ID]

The funds should appear in your account within 2-3 business days.

Keep referring great ideas!
Blank Slate Tech Team
```

---

## Daily Schedule Template

```
9:00 AM   - Morning review (dashboard, ideas, reports)
9:30 AM   - Approve/reject 5-10 ideas
10:00 AM  - Respond to user support tickets
10:30 AM  - Check analytics & revenue
11:00 AM  - Process affiliate requests

1:00 PM   - Lunch break

2:00 PM   - Final content moderation sweep
2:30 PM   - Review new user reports
3:00 PM   - Update admin notes
3:30 PM   - Plan next day
4:00 PM   - Buffer time for urgent issues
5:00 PM   - End of day wrap-up

Weekly Tasks:
Monday    - Revenue report
Wednesday - Affiliate review
Friday    - Prepare weekend
```

---

## Tips for Success 🎯

1. **Be Consistent**
   - Review ideas at same times daily
   - Users expect quick turnaround
   - Aim for <24 hour response time

2. **Be Fair**
   - Apply standards consistently
   - Leave helpful comments on rejections
   - Give everyone a chance

3. **Be Engaged**
   - Respond quickly to issues
   - Thank affiliates for referrals
   - Celebrate milestones with community

4. **Be Proactive**
   - Monitor for trends
   - Catch issues early
   - Plan for growth

5. **Document Everything**
   - Keep notes on decisions
   - Track issues & resolutions
   - Build moderation guidelines

---

## Contact & Support

**Your Role:**
- Email: gs0357227@gmail.com
- GitHub: gs0357227-del
- Time Zone: [Your timezone]

**When to Reach Out:**
- System outages/critical bugs
- Policy clarification needed
- Major user complaints
- Revenue/financial questions

---

## Next Steps

1. ✅ Read this guide fully
2. ✅ Access admin dashboard
3. ✅ Review 10 sample ideas
4. ✅ Set up daily schedule
5. ✅ Start moderating!

---

**Welcome to the Blank Slate Tech Moderation Team! 🚀**

*Last Updated: June 12, 2026*
*Version: 1.0*
