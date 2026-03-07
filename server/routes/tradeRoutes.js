// routes/tradeRoutes.js
const express = require('express');
const { body } = require('express-validator');
const { buyCoin, sellCoin } = require('../controllers/tradeController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// All trade routes require authentication
router.use(protect);

// Shared trade validation rules
const tradeRules = [
  body('coinId').notEmpty().withMessage('coinId is required').trim().toLowerCase(),
  body('coinSymbol').notEmpty().withMessage('coinSymbol is required').trim().toUpperCase(),
  body('coinName').notEmpty().withMessage('coinName is required').trim(),
  body('quantity')
    .isFloat({ gt: 0 })
    .withMessage('Quantity must be a positive number')
    .toFloat(),
];

// @route   POST /api/trade/buy
router.post('/buy', tradeRules, buyCoin);

// @route   POST /api/trade/sell
router.post('/sell', tradeRules, sellCoin);

module.exports = router;
