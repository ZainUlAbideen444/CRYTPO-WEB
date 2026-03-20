// mockData.js — All data for CryptoWeb Trading Platform
// Virtual balance capped at $1,000 — realistic small-account trading

// --- Cryptocurrency Market Data ---
export const cryptoMarket = [
  {
    id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin',
    price: 67842.15, change24h: 2.34, change7d: 8.12,
    marketCap: 1332000000000, volume24h: 28400000000,
    high24h: 68500.00, low24h: 65200.00, circulatingSupply: 19600000,
    color: '#F7931A',
    sparkline: [62000, 63500, 61800, 64200, 65000, 63800, 66000, 67200, 65800, 67842],
  },
  {
    id: 'ethereum', symbol: 'ETH', name: 'Ethereum',
    price: 3541.80, change24h: 1.87, change7d: 5.43,
    marketCap: 425000000000, volume24h: 14200000000,
    high24h: 3620.00, low24h: 3480.00, circulatingSupply: 120000000,
    color: '#627EEA',
    sparkline: [3200, 3300, 3150, 3400, 3380, 3450, 3500, 3480, 3520, 3541],
  },
  {
    id: 'solana', symbol: 'SOL', name: 'Solana',
    price: 182.45, change24h: -1.23, change7d: 12.56,
    marketCap: 79000000000, volume24h: 3800000000,
    high24h: 188.00, low24h: 178.00, circulatingSupply: 435000000,
    color: '#9945FF',
    sparkline: [155, 162, 158, 170, 175, 168, 178, 180, 185, 182],
  },
  {
    id: 'bnb', symbol: 'BNB', name: 'BNB',
    price: 412.30, change24h: 0.95, change7d: 3.21,
    marketCap: 63000000000, volume24h: 1200000000,
    high24h: 418.00, low24h: 405.00, circulatingSupply: 153000000,
    color: '#F3BA2F',
    sparkline: [390, 395, 388, 400, 405, 402, 408, 410, 415, 412],
  },
  {
    id: 'xrp', symbol: 'XRP', name: 'XRP',
    price: 0.6234, change24h: -2.10, change7d: -4.32,
    marketCap: 34000000000, volume24h: 1800000000,
    high24h: 0.6480, low24h: 0.6100, circulatingSupply: 55000000000,
    color: '#00AAE4',
    sparkline: [0.65, 0.66, 0.64, 0.63, 0.65, 0.64, 0.62, 0.63, 0.625, 0.6234],
  },
  {
    id: 'cardano', symbol: 'ADA', name: 'Cardano',
    price: 0.5821, change24h: 3.45, change7d: 6.78,
    marketCap: 20500000000, volume24h: 620000000,
    high24h: 0.5950, low24h: 0.5600, circulatingSupply: 35200000000,
    color: '#0033AD',
    sparkline: [0.52, 0.53, 0.51, 0.54, 0.55, 0.57, 0.56, 0.58, 0.575, 0.5821],
  },
  {
    id: 'avalanche', symbol: 'AVAX', name: 'Avalanche',
    price: 38.92, change24h: 4.12, change7d: 9.88,
    marketCap: 15800000000, volume24h: 580000000,
    high24h: 40.20, low24h: 37.10, circulatingSupply: 406000000,
    color: '#E84142',
    sparkline: [34, 35, 33.5, 36, 37, 36.5, 38, 37.8, 39.5, 38.92],
  },
  {
    id: 'polkadot', symbol: 'DOT', name: 'Polkadot',
    price: 8.74, change24h: -0.88, change7d: 2.15,
    marketCap: 12100000000, volume24h: 380000000,
    high24h: 8.95, low24h: 8.60, circulatingSupply: 1390000000,
    color: '#E6007A',
    sparkline: [8.2, 8.4, 8.1, 8.5, 8.6, 8.55, 8.7, 8.65, 8.8, 8.74],
  },
];

// --- Portfolio Holdings (realistic for $1,000 start) ---
export const portfolioHoldings = [
  {
    coinId: 'bitcoin', symbol: 'BTC', name: 'Bitcoin',
    quantity: 0.002341, avgBuyPrice: 64200.00, currentPrice: 67842.15,
    color: '#F7931A',
  },
  {
    coinId: 'ethereum', symbol: 'ETH', name: 'Ethereum',
    quantity: 0.0512, avgBuyPrice: 3280.00, currentPrice: 3541.80,
    color: '#627EEA',
  },
  {
    coinId: 'solana', symbol: 'SOL', name: 'Solana',
    quantity: 0.820, avgBuyPrice: 171.00, currentPrice: 182.45,
    color: '#9945FF',
  },
  {
    coinId: 'cardano', symbol: 'ADA', name: 'Cardano',
    quantity: 85.00, avgBuyPrice: 0.545, currentPrice: 0.5821,
    color: '#0033AD',
  },
];

// --- Transaction History (realistic $1,000 budget) ---
export const transactionHistory = [
  { id: 'tx001', coin: 'BTC',  type: 'BUY',  quantity: 0.001500, price: 62400.00, total: 93.60,  date: '2024-12-01', time: '09:14:22', status: 'completed' },
  { id: 'tx002', coin: 'ETH',  type: 'BUY',  quantity: 0.025000, price: 3050.00,  total: 76.25,  date: '2024-12-02', time: '14:32:11', status: 'completed' },
  { id: 'tx003', coin: 'SOL',  type: 'BUY',  quantity: 0.500000, price: 168.00,   total: 84.00,  date: '2024-12-03', time: '11:05:44', status: 'completed' },
  { id: 'tx004', coin: 'ADA',  type: 'BUY',  quantity: 50.00000, price: 0.520,    total: 26.00,  date: '2024-12-05', time: '16:21:08', status: 'completed' },
  { id: 'tx005', coin: 'BTC',  type: 'SELL', quantity: 0.000500, price: 64800.00, total: 32.40,  date: '2024-12-08', time: '10:44:55', status: 'completed' },
  { id: 'tx006', coin: 'ETH',  type: 'BUY',  quantity: 0.014000, price: 3200.00,  total: 44.80,  date: '2024-12-10', time: '13:17:33', status: 'completed' },
  { id: 'tx007', coin: 'ADA',  type: 'BUY',  quantity: 35.00000, price: 0.510,    total: 17.85,  date: '2024-12-12', time: '09:58:10', status: 'completed' },
  { id: 'tx008', coin: 'SOL',  type: 'BUY',  quantity: 0.200000, price: 162.00,   total: 32.40,  date: '2024-12-14', time: '15:30:27', status: 'completed' },
  { id: 'tx009', coin: 'BTC',  type: 'BUY',  quantity: 0.000841, price: 65200.00, total: 54.84,  date: '2024-12-18', time: '08:22:19', status: 'completed' },
  { id: 'tx010', coin: 'ETH',  type: 'SELL', quantity: 0.008000, price: 3480.00,  total: 27.84,  date: '2024-12-20', time: '14:11:05', status: 'completed' },
  { id: 'tx011', coin: 'SOL',  type: 'BUY',  quantity: 0.120000, price: 178.00,   total: 21.36,  date: '2025-01-02', time: '11:22:44', status: 'completed' },
  { id: 'tx012', coin: 'ETH',  type: 'BUY',  quantity: 0.011200, price: 3180.00,  total: 35.62,  date: '2025-01-05', time: '14:00:00', status: 'completed' },
];

// --- Portfolio Growth Chart (starting from $1,000) ---
export const portfolioGrowthData = [
  { date: 'Dec 1',  value: 1000,  profit: 0 },
  { date: 'Dec 3',  value: 1024,  profit: 24 },
  { date: 'Dec 5',  value: 1008,  profit: 8 },
  { date: 'Dec 7',  value: 1052,  profit: 52 },
  { date: 'Dec 9',  value: 1078,  profit: 78 },
  { date: 'Dec 11', value: 1061,  profit: 61 },
  { date: 'Dec 13', value: 1095,  profit: 95 },
  { date: 'Dec 15', value: 1118,  profit: 118 },
  { date: 'Dec 17', value: 1103,  profit: 103 },
  { date: 'Dec 19', value: 1142,  profit: 142 },
  { date: 'Dec 21', value: 1169,  profit: 169 },
  { date: 'Dec 23', value: 1148,  profit: 148 },
  { date: 'Dec 25', value: 1184,  profit: 184 },
  { date: 'Dec 27', value: 1212,  profit: 212 },
  { date: 'Dec 29', value: 1196,  profit: 196 },
  { date: 'Dec 31', value: 1238,  profit: 238 },
  { date: 'Jan 2',  value: 1261,  profit: 261 },
  { date: 'Jan 4',  value: 1244,  profit: 244 },
  { date: 'Jan 6',  value: 1278,  profit: 278 },
  { date: 'Jan 8',  value: 1312,  profit: 312 },
];

// --- Monthly Profit / Loss (proportional to $1,000) ---
export const monthlyPnL = [
  { month: 'Jul', profit: 18,  loss: -6  },
  { month: 'Aug', profit: 34,  loss: -12 },
  { month: 'Sep', profit: 22,  loss: -18 },
  { month: 'Oct', profit: 58,  loss: -9  },
  { month: 'Nov', profit: 47,  loss: -22 },
  { month: 'Dec', profit: 124, loss: -31 },
  { month: 'Jan', profit: 78,  loss: -14 },
];

// --- Trading Activity ---
export const tradingActivity = [
  { week: 'W1 Nov', buys: 3, sells: 1, volume: 82 },
  { week: 'W2 Nov', buys: 2, sells: 2, volume: 64 },
  { week: 'W3 Nov', buys: 4, sells: 1, volume: 112 },
  { week: 'W4 Nov', buys: 1, sells: 2, volume: 78 },
  { week: 'W1 Dec', buys: 5, sells: 1, volume: 145 },
  { week: 'W2 Dec', buys: 3, sells: 1, volume: 92 },
  { week: 'W3 Dec', buys: 4, sells: 2, volume: 128 },
  { week: 'W4 Dec', buys: 2, sells: 3, volume: 101 },
];

// --- BTC Price History (24h OHLC) ---
export const btcPriceHistory = [
  { time: '00:00', open: 65400, high: 65900, low: 65100, close: 65700 },
  { time: '02:00', open: 65700, high: 66200, low: 65500, close: 66000 },
  { time: '04:00', open: 66000, high: 66400, low: 65800, close: 65900 },
  { time: '06:00', open: 65900, high: 66100, low: 65200, close: 65500 },
  { time: '08:00', open: 65500, high: 66500, low: 65400, close: 66300 },
  { time: '10:00', open: 66300, high: 67100, low: 66200, close: 66900 },
  { time: '12:00', open: 66900, high: 67500, low: 66700, close: 67200 },
  { time: '14:00', open: 67200, high: 67800, low: 66900, close: 67600 },
  { time: '16:00', open: 67600, high: 68100, low: 67400, close: 67842 },
  { time: '18:00', open: 67842, high: 68300, low: 67600, close: 68100 },
];

// --- Portfolio Allocation ---
export const portfolioAllocation = [
  { name: 'BTC', value: 38.2, color: '#F7931A' },
  { name: 'ETH', value: 27.6, color: '#627EEA' },
  { name: 'SOL', value: 22.8, color: '#9945FF' },
  { name: 'ADA', value: 11.4, color: '#0033AD' },
];

// --- User Profile ($1,000 virtual balance) ---
export const userProfile = {
  id: 'user_001',
  username: 'CryptoTrader_FYP',
  email: 'trader@cryptoweb.io',
  joinDate: '2024-09-01',
  balance: 488.30,        // Remaining cash after trades
  totalInvested: 511.70,  // Spent on holdings
  notifications: 3,
  avatar: null,
  tier: 'Virtual Trader',
  rank: 42,
};

// --- Portfolio Summary Stats ---
export const portfolioStats = {
  totalValue: 1312.45,
  totalInvested: 1000.00,
  totalPnL: 312.45,
  pnlPercent: 31.25,
  availableBalance: 488.30,
  dayChange: 18.32,
  dayChangePercent: 1.41,
  bestPerformer: 'SOL',
  worstPerformer: 'XRP',
  totalTrades: 12,
  winRate: 75.0,
};

// --- Market Sentiment ---
export const marketSentiment = {
  value: 68,
  label: 'Greed',
  trend: 'up',
};

// --- Top Movers ---
export const topMovers = [
  { symbol: 'AVAX', change: 4.12,  price: 38.92  },
  { symbol: 'ADA',  change: 3.45,  price: 0.5821 },
  { symbol: 'BTC',  change: 2.34,  price: 67842  },
  { symbol: 'XRP',  change: -2.10, price: 0.6234 },
  { symbol: 'SOL',  change: -1.23, price: 182.45 },
];
