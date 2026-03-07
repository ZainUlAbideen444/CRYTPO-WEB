// routes/portfolioRoutes.js
const express = require('express');
const { getPortfolio, getTransactions, getDashboardStats } = require('../controllers/portfolioController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// All portfolio routes require authentication
router.use(protect);

// @route   GET /api/portfolio
router.get('/', getPortfolio);

// @route   GET /api/portfolio/transactions  (also available at /api/transactions)
router.get('/transactions', getTransactions);

// @route   GET /api/portfolio/dashboard
router.get('/dashboard', getDashboardStats);

module.exports = router;
