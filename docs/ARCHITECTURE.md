# 🏗️ Blank Slate Tech - Architecture

## System Architecture

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   Mobile App    │     │  Web Dashboard   │     │  External APIs  │
│  React Native   │     │   React + Vite   │     │   OpenAI, etc   │
└────────┬────────┘     └────────┬─────────┘     └────────┬────────┘
         │                       │                        │
         └───────────────────────┼────────────────────────┘
                                 │
                         ┌───────▼────────┐
                         │   API Server   │
                         │  Express.js    │
                         │   Port 5000    │
                         └───────┬────────┘
                                 │
                    ┌────────────┼────────────┐
                    │            │            │
            ┌───────▼────┐ ┌─────▼──┐ ┌─────▼──┐
            │  MongoDB   │ │ Redis  │ │Stripe  │
            │  Database  │ │ Cache  │ │Payment │
            └────────────┘ └────────┘ └────────┘
```

## Technology Stack

### Backend
- **Framework**: Express.js (Node.js)
- **Database**: MongoDB (NoSQL)
- **Cache**: Redis (Session/Rate limiting)
- **Payment**: Stripe (Subscriptions)
- **AI**: OpenAI GPT-4 (Idea generation)
- **Real-time**: Socket.io (Live updates)
- **Authentication**: JWT (JSON Web Tokens)

### Mobile
- **Framework**: React Native + Expo
- **State**: Redux (State management)
- **HTTP**: Axios (API client)
- **Storage**: Expo SecureStore (Token storage)
- **Navigation**: React Navigation

### Web Dashboard
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **State**: Zustand
- **Router**: React Router v6

### Infrastructure
- **Containerization**: Docker & Docker Compose
- **CI/CD**: GitHub Actions
- **Version Control**: Git/GitHub

## Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  username: String,
  email: String,
  password: String (hashed),
  firstName: String,
  lastName: String,
  avatar: String,
  bio: String,
  subscription: {
    tier: 'free' | 'pro' | 'studio',
    stripeCustomerId: String,
    stripeSubscriptionId: String,
    status: String,
    currentPeriodStart: Date,
    currentPeriodEnd: Date
  },
  usage: {
    ideasGeneratedToday: Number,
    totalIdeasGenerated: Number,
    totalIdeasSaved: Number,
    totalVotesCast: Number,
    lastGeneratedAt: Date
  },
  affiliate: {
    code: String,
    totalReferrals: Number,
    totalEarnings: Number,
    pendingEarnings: Number,
    isActive: Boolean
  },
  savedIdeas: [ObjectId],
  votedIdeas: [{ ideaId, voteType }],
  preferences: {
    theme: String,
    emailNotifications: Boolean,
    pushNotifications: Boolean
  },
  role: 'user' | 'moderator' | 'admin',
  createdAt: Date,
  updatedAt: Date
}
```

### Ideas Collection
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  problem: String,
  solution: String,
  targetAudience: String,
  category: String,
  difficulty: String,
  estimatedDevTime: String,
  requiredTechStack: {
    frontend: [String],
    backend: [String],
    database: [String],
    external: [String]
  },
  monetization: {
    strategy: String,
    estimatedMarketSize: String,
    competitorAnalysis: String
  },
  features: {
    core: [String],
    premium: [String],
    future: [String]
  },
  stats: {
    upvotes: Number,
    downvotes: Number,
    views: Number,
    saves: Number,
    comments: Number
  },
  aiScore: {
    originality: Number,
    feasibility: Number,
    marketPotential: Number,
    overallScore: Number
  },
  author: ObjectId (ref: User),
  generatedBy: 'gpt-4' | 'gpt-3.5' | 'user-submitted',
  tags: [String],
  status: 'published' | 'draft' | 'archived',
  isFeatured: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## API Flow

### User Registration Flow
```
1. POST /auth/register
   ├─ Validate input
   ├─ Hash password (bcrypt)
   ├─ Create user document
   ├─ Generate JWT token
   ├─ Send welcome email
   └─ Return token + user data

2. Track referral (if ref code provided)
   ├─ Find affiliate
   ├─ Create referral entry
   └─ Track conversion later
```

### Idea Generation Flow
```
1. POST /ideas/generate
   ├─ Verify JWT token
   ├─ Check user tier & daily limit
   ├─ Build OpenAI prompt
   ├─ Call GPT-4 API
   ├─ Parse & validate response
   ├─ Create idea document
   ├─ Update user usage stats
   ├─ Broadcast via Socket.io
   └─ Return idea data
```

### Payment Flow
```
1. POST /payments/subscribe
   ├─ Verify JWT token
   ├─ Create Stripe customer
   ├─ Create subscription
   ├─ Store subscription ID
   └─ Send confirmation email

2. Stripe Webhook
   ├─ Verify webhook signature
   ├─ Process event (updated, deleted)
   ├─ Update user subscription
   ├─ Create payment record
   └─ Send email notification
```

## Security Measures

- **Authentication**: JWT with secure tokens
- **Password**: Bcrypt hashing
- **CORS**: Restricted to allowed origins
- **Rate Limiting**: IP-based request throttling
- **Input Validation**: Joi schema validation
- **SQL Injection**: MongoDB prevents injection
- **XSS Protection**: Helmet.js middleware
- **HTTPS**: Enforced in production
- **Sensitive Data**: Never logged or exposed

## Scalability Considerations

### Horizontal Scaling
- Stateless API servers
- Load balancer (Nginx)
- Distributed Redis cache
- Database replication (MongoDB Atlas)

### Performance Optimization
- Response caching (Redis)
- Database indexing
- Pagination for large datasets
- Compression (gzip)
- CDN for static assets
- Lazy loading on frontend

### Monitoring
- Error tracking (Sentry)
- Performance monitoring (New Relic)
- Uptime monitoring
- Log aggregation (ELK stack)

## Deployment Strategy

### Development
- Local Docker Compose
- Hot reload enabled
- Debug logging

### Staging
- Docker containers
- Same as production
- Load testing

### Production
- Docker Compose or Kubernetes
- SSL/TLS certificates
- Environment variables
- Database backups
- CDN for static files
- Error monitoring

---

For more details, see individual component documentation.
