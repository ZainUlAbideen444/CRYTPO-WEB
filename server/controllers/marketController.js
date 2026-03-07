// controllers/marketController.js — Live crypto market data from CoinGecko
const { fetchMarketData, MOCK_MARKET_DATA } = require('../utils/fetchCrypto');

// ── GET /api/market ──────────────────────────────────────────────────────────
// Returns full market listing for all tracked coins
const getMarket = async (req, res) => {
  try {
    const coins = await fetchMarketData();
    res.status(200).json({ success: true, count: coins.length, data: coins });
  } catch (error) {
    console.error('Market fetch error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch market data' });
  }
};

// ── GET /api/market/top-gainers ──────────────────────────────────────────────
// Returns top 5 coins by 24h percentage gain
const getTopGainers = async (req, res) => {
  try {
    const coins = await fetchMarketData();
    const gainers = [...coins]
      .filter((c) => c.change24h > 0)
      .sort((a, b) => b.change24h - a.change24h)
      .slice(0, 5);
    res.status(200).json({ success: true, data: gainers });
  } catch (error) {
    console.error('Top gainers error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch top gainers' });
  }
};

// ── GET /api/market/top-losers ───────────────────────────────────────────────
const getTopLosers = async (req, res) => {
  try {
    const coins = await fetchMarketData();
    const losers = [...coins]
      .filter((c) => c.change24h < 0)
      .sort((a, b) => a.change24h - b.change24h)
      .slice(0, 5);
    res.status(200).json({ success: true, data: losers });
  } catch (error) {
    console.error('Top losers error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch top losers' });
  }
};

// ── GET /api/market/:coinId ──────────────────────────────────────────────────
// Returns data for a single coin by CoinGecko ID
const getCoin = async (req, res) => {
  try {
    const coins = await fetchMarketData();
    const coin = coins.find(
      (c) => c.id === req.params.coinId.toLowerCase()
    );
    if (!coin) {
      return res.status(404).json({ success: false, message: 'Coin not found' });
    }
    res.status(200).json({ success: true, data: coin });
  } catch (error) {
    console.error('Get coin error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch coin data' });
  }
};

module.exports = { getMarket, getTopGainers, getTopLosers, getCoin };
