# CryptoWeb — Virtual Crypto Trading Platform

Full-stack MERN app: React + Node.js + MongoDB + JWT Auth + Live CoinGecko API

## Quick Start

### 1. Start MongoDB
Make sure MongoDB is running locally:
```bash
mongod
```

### 2. Backend (server)
```bash
cd server
npm install
node server.js
# Runs on http://localhost:5000
```

### 3. Frontend (React)
```bash
npm install
npm run dev
# Runs on http://localhost:5173
```

## Architecture
- **Frontend**: React 18 + Vite + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: MongoDB + Mongoose
- **Auth**: JWT (stored in localStorage)
- **Market Data**: CoinGecko API (with offline fallback)

## Features
- ✅ Real user registration & login (JWT)
- ✅ $1,000 virtual balance stored in MongoDB
- ✅ Live crypto prices from CoinGecko
- ✅ Buy/sell trades stored per user
- ✅ Portfolio shows only YOUR holdings
- ✅ Transactions shows only YOUR trade history
- ✅ Analytics: win/loss from YOUR real trades
- ✅ Dashboard: YOUR real P&L and balance
- ✅ Settings: YOUR account info

## API Endpoints
```
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
GET  /api/market
POST /api/trade/buy
POST /api/trade/sell
GET  /api/portfolio
GET  /api/portfolio/dashboard
GET  /api/portfolio/transactions
```
