// controllers/portfolioController.js — Holdings, P&L, Dashboard stats
const User        = require('../models/User');
const Portfolio   = require('../models/Portfolio');
const Transaction = require('../models/Transaction');
const { fetchMarketData } = require('../utils/fetchCrypto');

// ── GET /api/portfolio ───────────────────────────────────────────────────────
// Returns user's holdings enriched with live prices and P&L
const getPortfolio = async (req, res) => {
  try {
    const userId   = req.user._id;
    const holdings = await Portfolio.find({ userId });

    if (holdings.length === 0) {
      return res.status(200).json({ success: true, data: [], summary: { totalValue: 0, totalInvested: 0, totalPnL: 0, pnlPercent: 0 } });
    }

    // Fetch live prices in one call
    const marketData = await fetchMarketData();
    const priceMap   = Object.fromEntries(marketData.map((c) => [c.id, c.price]));

    let totalValue    = 0;
    let totalInvested = 0;

    const enriched = holdings.map((h) => {
      const currentPrice = priceMap[h.coinId] ?? h.averageBuyPrice;
      const currentValue = currentPrice * h.quantity;
      const costBasis    = h.averageBuyPrice * h.quantity;
      const pnl          = currentValue - costBasis;
      const pnlPercent   = costBasis > 0 ? parseFloat(((pnl / costBasis) * 100).toFixed(2)) : 0;

      totalValue    += currentValue;
      totalInvested += costBasis;

      return {
        _id:            h._id,
        coinSymbol:     h.coinSymbol,
        coinName:       h.coinName,
        coinId:         h.coinId,
        quantity:       h.quantity,
        averageBuyPrice: h.averageBuyPrice,
        currentPrice,
        currentValue:   parseFloat(currentValue.toFixed(2)),
        costBasis:      parseFloat(costBasis.toFixed(2)),
        pnl:            parseFloat(pnl.toFixed(2)),
        pnlPercent,
      };
    });

    const totalPnL    = totalValue - totalInvested;
    const pnlPercent  = totalInvested > 0 ? parseFloat(((totalPnL / totalInvested) * 100).toFixed(2)) : 0;

    res.status(200).json({
      success: true,
      data: enriched,
      summary: {
        totalValue:    parseFloat(totalValue.toFixed(2)),
        totalInvested: parseFloat(totalInvested.toFixed(2)),
        totalPnL:      parseFloat(totalPnL.toFixed(2)),
        pnlPercent,
      },
    });
  } catch (error) {
    console.error('Portfolio error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch portfolio' });
  }
};

// ── GET /api/portfolio/transactions ─────────────────────────────────────────
// Returns user's full trade history, newest first
const getTransactions = async (req, res) => {
  try {
    const page  = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip  = (page - 1) * limit;

    const [transactions, total] = await Promise.all([
      Transaction.find({ userId: req.user._id })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Transaction.countDocuments({ userId: req.user._id }),
    ]);

    res.status(200).json({
      success: true,
      count:      transactions.length,
      total,
      page,
      pages:      Math.ceil(total / limit),
      data:       transactions,
    });
  } catch (error) {
    console.error('Transactions error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch transactions' });
  }
};

// ── GET /api/portfolio/dashboard ─────────────────────────────────────────────
// Aggregated stats for the dashboard page
const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const [user, holdings, transactions, marketData] = await Promise.all([
      User.findById(userId),
      Portfolio.find({ userId }),
      Transaction.find({ userId }).sort({ createdAt: -1 }),
      fetchMarketData(),
    ]);

    const priceMap = Object.fromEntries(marketData.map((c) => [c.id, c.price]));

    // Portfolio value
    let portfolioValue = 0;
    let totalInvested  = 0;
    holdings.forEach((h) => {
      const price = priceMap[h.coinId] ?? h.averageBuyPrice;
      portfolioValue += price * h.quantity;
      totalInvested  += h.averageBuyPrice * h.quantity;
    });

    const totalPnL   = portfolioValue - totalInvested;
    const pnlPercent = totalInvested > 0 ? parseFloat(((totalPnL / totalInvested) * 100).toFixed(2)) : 0;

    // Total account value = portfolio + cash
    const totalAccountValue = portfolioValue + user.virtualBalance;

    // Trade stats
    const buyCount   = transactions.filter((t) => t.type === 'buy').length;
    const sellCount  = transactions.filter((t) => t.type === 'sell').length;
    const totalVolume = transactions.reduce((s, t) => s + t.total, 0);

    // Best and worst performers
    const performers = holdings.map((h) => {
      const currentPrice = priceMap[h.coinId] ?? h.averageBuyPrice;
      const pnlPct = h.averageBuyPrice > 0
        ? ((currentPrice - h.averageBuyPrice) / h.averageBuyPrice) * 100
        : 0;
      return { symbol: h.coinSymbol, pnlPct: parseFloat(pnlPct.toFixed(2)) };
    }).sort((a, b) => b.pnlPct - a.pnlPct);

    res.status(200).json({
      success: true,
      data: {
        availableBalance:   parseFloat(user.virtualBalance.toFixed(2)),
        portfolioValue:     parseFloat(portfolioValue.toFixed(2)),
        totalAccountValue:  parseFloat(totalAccountValue.toFixed(2)),
        totalInvested:      parseFloat(totalInvested.toFixed(2)),
        totalPnL:           parseFloat(totalPnL.toFixed(2)),
        pnlPercent,
        totalTrades:        transactions.length,
        buyCount,
        sellCount,
        totalVolume:        parseFloat(totalVolume.toFixed(2)),
        holdingsCount:      holdings.length,
        bestPerformer:      performers[0] ?? null,
        worstPerformer:     performers[performers.length - 1] ?? null,
        recentTransactions: transactions.slice(0, 5),
      },
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch dashboard stats' });
  }
};

module.exports = { getPortfolio, getTransactions, getDashboardStats };
