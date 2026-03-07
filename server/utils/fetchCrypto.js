// utils/fetchCrypto.js — Fetch live crypto data from CoinGecko
// Falls back to mock data if API is unavailable (rate limiting / offline)
const axios = require('axios');

// ── Supported coins ───────────────────────────────────────────────────────────
const COIN_IDS = [
  'bitcoin', 'ethereum', 'solana', 'binancecoin', 'ripple',
  'cardano', 'avalanche-2', 'polkadot', 'dogecoin', 'chainlink',
];

// ── Static fallback mock data (used when CoinGecko is unavailable) ─────────
const MOCK_MARKET_DATA = [
  { id: 'bitcoin',       symbol: 'BTC', name: 'Bitcoin',   current_price: 67842,  price_change_percentage_24h: 2.34,  market_cap: 1332000000000, total_volume: 28400000000 },
  { id: 'ethereum',      symbol: 'ETH', name: 'Ethereum',  current_price: 3541,   price_change_percentage_24h: 1.87,  market_cap: 425000000000,  total_volume: 14200000000 },
  { id: 'solana',        symbol: 'SOL', name: 'Solana',    current_price: 182.45, price_change_percentage_24h: -1.23, market_cap: 79000000000,   total_volume: 3800000000  },
  { id: 'binancecoin',   symbol: 'BNB', name: 'BNB',       current_price: 412.30, price_change_percentage_24h: 0.95,  market_cap: 63000000000,   total_volume: 1200000000  },
  { id: 'ripple',        symbol: 'XRP', name: 'XRP',       current_price: 0.6234, price_change_percentage_24h: -2.10, market_cap: 34000000000,   total_volume: 1800000000  },
  { id: 'cardano',       symbol: 'ADA', name: 'Cardano',   current_price: 0.5821, price_change_percentage_24h: 3.45,  market_cap: 20500000000,   total_volume: 620000000   },
  { id: 'avalanche-2',   symbol: 'AVAX',name: 'Avalanche', current_price: 38.92,  price_change_percentage_24h: 4.12,  market_cap: 15800000000,   total_volume: 580000000   },
  { id: 'polkadot',      symbol: 'DOT', name: 'Polkadot',  current_price: 8.74,   price_change_percentage_24h: -0.88, market_cap: 12100000000,   total_volume: 380000000   },
  { id: 'dogecoin',      symbol: 'DOGE',name: 'Dogecoin',  current_price: 0.1821, price_change_percentage_24h: 1.55,  market_cap: 26100000000,   total_volume: 1900000000  },
  { id: 'chainlink',     symbol: 'LINK',name: 'Chainlink', current_price: 18.42,  price_change_percentage_24h: 2.88,  market_cap: 10800000000,   total_volume: 820000000   },
];

// ── Format raw CoinGecko data into a consistent shape ───────────────────────
const formatCoin = (coin) => ({
  id:          coin.id,
  symbol:      (coin.symbol || '').toUpperCase(),
  name:        coin.name,
  price:       coin.current_price,
  change24h:   parseFloat((coin.price_change_percentage_24h || 0).toFixed(2)),
  marketCap:   coin.market_cap,
  volume24h:   coin.total_volume,
  image:       coin.image || null,
});

/**
 * Fetch market data for all tracked coins.
 * Returns formatted array; uses mock data on failure.
 */
const fetchMarketData = async () => {
  try {
    const url = `${process.env.COINGECKO_API}/coins/markets`;
    const { data } = await axios.get(url, {
      params: {
        vs_currency: 'usd',
        ids: COIN_IDS.join(','),
        order: 'market_cap_desc',
        per_page: 20,
        page: 1,
        sparkline: false,
        price_change_percentage: '24h',
      },
      timeout: 8000, // 8s timeout
    });
    return data.map(formatCoin);
  } catch (error) {
    console.warn('⚠️  CoinGecko API unavailable — using mock data:', error.message);
    return MOCK_MARKET_DATA.map(formatCoin);
  }
};

/**
 * Get the current price for a single coin.
 * Returns null if the coin is not found.
 */
const fetchCoinPrice = async (coinId) => {
  try {
    const url = `${process.env.COINGECKO_API}/simple/price`;
    const { data } = await axios.get(url, {
      params: { ids: coinId, vs_currencies: 'usd' },
      timeout: 5000,
    });
    return data[coinId]?.usd ?? null;
  } catch {
    // Fall back to mock data
    const mock = MOCK_MARKET_DATA.find((c) => c.id === coinId);
    return mock ? mock.current_price : null;
  }
};

module.exports = { fetchMarketData, fetchCoinPrice, COIN_IDS, MOCK_MARKET_DATA };
