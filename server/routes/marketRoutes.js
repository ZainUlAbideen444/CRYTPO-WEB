// routes/marketRoutes.js
const express = require('express');
const { getMarket, getTopGainers, getTopLosers, getCoin } = require('../controllers/marketController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// All market routes require authentication
router.use(protect);

// @route   GET /api/market
router.get('/', getMarket);

// @route   GET /api/market/top-gainers
router.get('/top-gainers', getTopGainers);

// @route   GET /api/market/top-losers
router.get('/top-losers', getTopLosers);

// @route   GET /api/market/:coinId
router.get('/:coinId', getCoin);

module.exports = router;
