// controllers/tradeController.js — Buy and Sell logic
const { validationResult } = require('express-validator');
const User        = require('../models/User');
const Portfolio   = require('../models/Portfolio');
const Transaction = require('../models/Transaction');
const { fetchCoinPrice, fetchMarketData } = require('../utils/fetchCrypto');

// ── POST /api/trade/buy ──────────────────────────────────────────────────────
const buyCoin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { coinId, coinSymbol, coinName, quantity } = req.body;
  const userId = req.user._id;

  try {
    // 1. Fetch current market price
    const currentPrice = await fetchCoinPrice(coinId);
    if (!currentPrice) {
      return res.status(400).json({ success: false, message: 'Could not fetch coin price' });
    }

    const total = parseFloat((currentPrice * quantity).toFixed(8));

    // 2. Check user's virtual balance
    const user = await User.findById(userId);
    if (user.virtualBalance < total) {
      return res.status(400).json({
        success: false,
        message: `Insufficient balance. Required: $${total.toFixed(2)}, Available: $${user.virtualBalance.toFixed(2)}`,
      });
    }

    const balanceBefore = user.virtualBalance;

    // 3. Deduct balance
    user.virtualBalance = parseFloat((user.virtualBalance - total).toFixed(8));
    await user.save();

    // 4. Update or create portfolio holding (weighted average price)
    let holding = await Portfolio.findOne({ userId, coinSymbol: coinSymbol.toUpperCase() });

    if (holding) {
      // Recalculate weighted average buy price
      const totalQty  = holding.quantity + quantity;
      const totalCost = holding.quantity * holding.averageBuyPrice + quantity * currentPrice;
      holding.averageBuyPrice = parseFloat((totalCost / totalQty).toFixed(8));
      holding.quantity        = parseFloat(totalQty.toFixed(8));
      await holding.save();
    } else {
      holding = await Portfolio.create({
        userId,
        coinSymbol:     coinSymbol.toUpperCase(),
        coinName,
        coinId,
        quantity:       parseFloat(quantity.toFixed(8)),
        averageBuyPrice: currentPrice,
      });
    }

    // 5. Record the transaction
    const transaction = await Transaction.create({
      userId,
      coinSymbol:    coinSymbol.toUpperCase(),
      coinName,
      coinId,
      type:          'buy',
      price:         currentPrice,
      quantity:      parseFloat(quantity.toFixed(8)),
      total,
      balanceBefore,
      balanceAfter:  user.virtualBalance,
    });

    res.status(200).json({
      success: true,
      message: `Successfully bought ${quantity} ${coinSymbol.toUpperCase()} at $${currentPrice}`,
      data: {
        transaction,
        holding,
        newBalance: user.virtualBalance,
      },
    });
  } catch (error) {
    console.error('Buy error:', error);
    res.status(500).json({ success: false, message: 'Server error during buy trade' });
  }
};

// ── POST /api/trade/sell ─────────────────────────────────────────────────────
const sellCoin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { coinId, coinSymbol, coinName, quantity } = req.body;
  const userId = req.user._id;

  try {
    // 1. Check that user holds this coin
    const holding = await Portfolio.findOne({ userId, coinSymbol: coinSymbol.toUpperCase() });
    if (!holding || holding.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: `Insufficient holdings. You have ${holding?.quantity ?? 0} ${coinSymbol.toUpperCase()}`,
      });
    }

    // 2. Fetch current price
    const currentPrice = await fetchCoinPrice(coinId);
    if (!currentPrice) {
      return res.status(400).json({ success: false, message: 'Could not fetch coin price' });
    }

    const total = parseFloat((currentPrice * quantity).toFixed(8));

    // 3. Credit user balance
    const user = await User.findById(userId);
    const balanceBefore = user.virtualBalance;
    user.virtualBalance = parseFloat((user.virtualBalance + total).toFixed(8));
    await user.save();

    // 4. Update or remove portfolio holding
    holding.quantity = parseFloat((holding.quantity - quantity).toFixed(8));
    if (holding.quantity < 0.000001) {
      // Remove holding entirely if balance is negligible
      await Portfolio.deleteOne({ _id: holding._id });
    } else {
      await holding.save();
    }

    // 5. Record the transaction
    const transaction = await Transaction.create({
      userId,
      coinSymbol:   coinSymbol.toUpperCase(),
      coinName,
      coinId,
      type:         'sell',
      price:        currentPrice,
      quantity:     parseFloat(quantity.toFixed(8)),
      total,
      balanceBefore,
      balanceAfter: user.virtualBalance,
    });

    res.status(200).json({
      success: true,
      message: `Successfully sold ${quantity} ${coinSymbol.toUpperCase()} at $${currentPrice}`,
      data: {
        transaction,
        newBalance: user.virtualBalance,
        remainingQuantity: holding.quantity < 0.000001 ? 0 : holding.quantity,
      },
    });
  } catch (error) {
    console.error('Sell error:', error);
    res.status(500).json({ success: false, message: 'Server error during sell trade' });
  }
};

module.exports = { buyCoin, sellCoin };
