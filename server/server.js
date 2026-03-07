// server.js — CryptoSim Backend Entry Point
require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const connectDB = require('./config/db');

// ── Route imports ─────────────────────────────────────────────────────────────
const authRoutes      = require('./routes/authRoutes');
const marketRoutes    = require('./routes/marketRoutes');
const tradeRoutes     = require('./routes/tradeRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');

// ── Connect to MongoDB ────────────────────────────────────────────────────────
connectDB();

const app = express();

// ── Global Middleware ─────────────────────────────────────────────────────────

// CORS — allow requests from the React frontend
app.use(cors({
  origin: [
    'http://localhost:5173',  // Vite dev server
    'http://localhost:3000',  // CRA dev server (fallback)
    'http://localhost:4173',  // Vite preview
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Parse incoming JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ── Request logger (development) ──────────────────────────────────────────────
if (process.env.NODE_ENV !== 'production') {
  app.use((req, _res, next) => {
    console.log(`→ ${req.method} ${req.originalUrl}`);
    next();
  });
}

// ── API Routes ────────────────────────────────────────────────────────────────
app.use('/api/auth',        authRoutes);
app.use('/api/market',      marketRoutes);
app.use('/api/trade',       tradeRoutes);
app.use('/api/portfolio',   portfolioRoutes);

// Convenience alias: /api/transactions → same as /api/portfolio/transactions
app.use('/api/transactions', require('./middleware/authMiddleware').protect,
  async (req, res) => {
    const { getTransactions } = require('./controllers/portfolioController');
    return getTransactions(req, res);
  }
);

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'CryptoSim API is running',
    timestamp: new Date().toISOString(),
  });
});

// ── 404 handler ───────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ── Global error handler ──────────────────────────────────────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err.stack);

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({ success: false, message: `${field} already exists` });
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ success: false, message: messages.join(', ') });
  }

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
});

// ── Start server ──────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 CryptoSim API running on http://localhost:${PORT}`);
  console.log(`📋 Endpoints:`);
  console.log(`   POST /api/auth/register`);
  console.log(`   POST /api/auth/login`);
  console.log(`   GET  /api/auth/me`);
  console.log(`   GET  /api/market`);
  console.log(`   GET  /api/market/top-gainers`);
  console.log(`   POST /api/trade/buy`);
  console.log(`   POST /api/trade/sell`);
  console.log(`   GET  /api/portfolio`);
  console.log(`   GET  /api/portfolio/dashboard`);
  console.log(`   GET  /api/transactions\n`);
});

module.exports = app;
