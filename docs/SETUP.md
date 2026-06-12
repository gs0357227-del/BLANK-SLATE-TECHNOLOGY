# 🚀 Blank Slate Tech - Getting Started Guide

Welcome to **Blank Slate Tech**! This guide will help you set up and run the complete platform.

## 📋 Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **MongoDB** (Atlas free tier: [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas))
- **Docker** & **Docker Compose** ([Download](https://www.docker.com/))
- **OpenAI API Key** ([Get here](https://platform.openai.com/api-keys))
- **Stripe Account** ([Sign up](https://stripe.com))

## ⚙️ Environment Setup

### 1. Clone Repository
```bash
git clone https://github.com/gs0357227-del/BLANK-SLATE-TECHNOLOGY.git
cd BLANK-SLATE-TECHNOLOGY
```

### 2. Create Environment Files

**Backend** - `backend/.env`
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blank-slate-tech
OPENAI_API_KEY=sk-your-key-here
STRIPE_SECRET_KEY=sk_test_your-key-here
STRIPE_WEBHOOK_SECRET=whsec_your-secret-here
JWT_SECRET=your-super-secret-key
EMAIL_FROM=noreply@blankslatetech.com
FRONTEND_URL=http://localhost:3000
```

**Mobile** - `mobile/.env`
```env
REACT_APP_API_URL=http://localhost:5000/api
```

**Web** - `web/.env`
```env
VITE_API_URL=http://localhost:5000/api
```

## 🚀 Quick Start (Docker)

### One-Command Setup
```bash
docker-compose up -d
```

This starts:
- ✅ Backend API on `http://localhost:5000`
- ✅ Web Dashboard on `http://localhost:3000`
- ✅ MongoDB on `localhost:27017`
- ✅ Redis on `localhost:6379`

### View Logs
```bash
docker-compose logs -f backend
```

### Stop Services
```bash
docker-compose down
```

---

## 🏗️ Manual Setup (Development)

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

Backend runs on `http://localhost:5000`

### Mobile App Setup
```bash
cd mobile
npm install
npx expo start
```

Press `i` for iOS or `a` for Android

### Web Dashboard Setup
```bash
cd web
npm install
npm run dev
```

Web runs on `http://localhost:5173`

---

## 🔐 First Time Setup

### 1. Create Admin User
```bash
cd backend
node scripts/createAdmin.js
```

### 2. Seed Categories
```bash
node scripts/seedCategories.js
```

### 3. Configure Stripe
- Add webhook endpoint: `https://yourdomain.com/api/payments/webhook`
- Copy Webhook Secret to `.env`

---

## 📱 Mobile App

### Development
```bash
cd mobile
npm run start
```

### Build for iOS
```bash
eas build --platform ios
```

### Build for Android
```bash
eas build --platform android
```

---

## 🌐 Web Dashboard

### Development
```bash
cd web
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

---

## 🔌 API Documentation

See [API.md](./docs/API.md) for complete API endpoint documentation.

### Key Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/ideas/generate` - Generate AI idea (requires auth)
- `GET /api/ideas` - Get all ideas
- `POST /api/payments/subscribe` - Subscribe to plan

---

## 💰 Monetization Setup

### Enable Premium Features
1. Create Stripe products and prices
2. Add to `.env`:
   - `STRIPE_PRICE_PRO_MONTHLY`
   - `STRIPE_PRICE_PRO_ANNUAL`
   - `STRIPE_PRICE_STUDIO_MONTHLY`
   - `STRIPE_PRICE_STUDIO_ANNUAL`

### Affiliate System
1. Enable affiliate registration in profile
2. Users get referral codes
3. 20% commission on conversions
4. Track earnings in dashboard

---

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Mobile Tests
```bash
cd mobile
npm test
```

---

## 🐛 Troubleshooting

### MongoDB Connection Error
- Verify MongoDB URI in `.env`
- Check IP whitelist in MongoDB Atlas

### OpenAI API Error
- Verify API key is valid
- Check API usage limits

### Stripe Webhook Not Firing
- Verify webhook secret in `.env`
- Check webhook URL is publicly accessible

---

## 📚 Documentation

- [API Documentation](./docs/API.md)
- [Architecture](./docs/ARCHITECTURE.md)
- [Contributing](./docs/CONTRIBUTING.md)

---

## 🤝 Support

- 💬 [GitHub Discussions](https://github.com/gs0357227-del/BLANK-SLATE-TECHNOLOGY/discussions)
- 🐛 [Report Issues](https://github.com/gs0357227-del/BLANK-SLATE-TECHNOLOGY/issues)

---

**Happy coding! 🚀**
