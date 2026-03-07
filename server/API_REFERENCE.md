# CryptoSim Backend — API Reference & Frontend Integration Guide

## Setup

```bash
cd server
npm install
npm run dev
# Server: http://localhost:5000
```

## Required: MongoDB
- Install MongoDB locally, or use MongoDB Atlas (free tier)
- Update MONGO_URI in .env accordingly

---

## Environment Variables (.env)
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/cryptosim
JWT_SECRET=cryptosim_jwt_super_secret_key_2024
JWT_EXPIRES_IN=7d
COINGECKO_API=https://api.coingecko.com/api/v3
INITIAL_BALANCE=10000
```

---

## API Endpoints

### Auth
| Method | URL | Auth | Body |
|--------|-----|------|------|
| POST | `/api/auth/register` | ❌ | `{ name, email, password }` |
| POST | `/api/auth/login` | ❌ | `{ email, password }` |
| GET | `/api/auth/me` | ✅ | — |

### Market
| Method | URL | Auth |
|--------|-----|------|
| GET | `/api/market` | ✅ |
| GET | `/api/market/top-gainers` | ✅ |
| GET | `/api/market/top-losers` | ✅ |
| GET | `/api/market/:coinId` | ✅ |

### Trade
| Method | URL | Auth | Body |
|--------|-----|------|------|
| POST | `/api/trade/buy` | ✅ | `{ coinId, coinSymbol, coinName, quantity }` |
| POST | `/api/trade/sell` | ✅ | `{ coinId, coinSymbol, coinName, quantity }` |

### Portfolio
| Method | URL | Auth |
|--------|-----|------|
| GET | `/api/portfolio` | ✅ |
| GET | `/api/portfolio/dashboard` | ✅ |
| GET | `/api/portfolio/transactions` | ✅ |
| GET | `/api/transactions` | ✅ |

### Health
| Method | URL |
|--------|-----|
| GET | `/api/health` |

---

## Frontend Integration (React)

### 1. Create an Axios instance (src/api/axios.js)
```js
import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:5000/api' });

// Auto-attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
```

### 2. Login and store token
```js
const res = await api.post('/auth/login', { email, password });
localStorage.setItem('token', res.data.token);
```

### 3. Fetch market data
```js
const res = await api.get('/market');
// res.data.data → array of coins
```

### 4. Execute a buy trade
```js
const res = await api.post('/trade/buy', {
  coinId:     'bitcoin',
  coinSymbol: 'BTC',
  coinName:   'Bitcoin',
  quantity:   0.01,
});
// res.data.data.newBalance → updated balance
```

### 5. Fetch portfolio
```js
const res = await api.get('/portfolio');
// res.data.data    → array of holdings with currentPrice + P&L
// res.data.summary → { totalValue, totalPnL, pnlPercent }
```

---

## Response Format
All responses follow this structure:
```json
{ "success": true, "data": { ... } }
{ "success": false, "message": "Error description" }
```

## Notes
- CoinGecko free tier: ~10-30 req/min. Backend uses mock data fallback automatically.
- Passwords are hashed with bcrypt (10 salt rounds).
- JWT tokens expire in 7 days.
