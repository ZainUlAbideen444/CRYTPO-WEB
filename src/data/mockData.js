// ============================================================
// mockData.js — All mock data for CryptoSim Trading Simulator
// ============================================================

// --- Cryptocurrency Market Data ---
export const cryptoMarket = [
  {
    id: 'bitcoin',
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 67842.15,
    change24h: 2.34,
    change7d: 8.12,
    marketCap: 1332000000000,
    volume24h: 28400000000,
    high24h: 68500.00,
    low24h: 65200.00,
    circulatingSupply: 19600000,
    color: '#F7931A',
    sparkline: [62000, 63500, 61800, 64200, 65000, 63800, 66000, 67200, 65800, 67842],
  },
  {
    id: 'ethereum',
    symbol: 'ETH',
    name: 'Ethereum',
    price: 3541.80,
    change24h: 1.87,
    change7d: 5.43,
    marketCap: 425000000000,
    volume24h: 14200000000,
    high24h: 3620.00,
    low24h: 3480.00,
    circulatingSupply: 120000000,
    color: '#627EEA',
    sparkline: [3200, 3300, 3150, 3400, 3380, 3450, 3500, 3480, 3520, 3541],
  },
  {
    id: 'solana',
    symbol: 'SOL',
    name: 'Solana',
    price: 182.45,
    change24h: -1.23,
    change7d: 12.56,
    marketCap: 79000000000,
    volume24h: 3800000000,
    high24h: 188.00,
    low24h: 178.00,
    circulatingSupply: 435000000,
    color: '#9945FF',
    sparkline: [155, 162, 158, 170, 175, 168, 178, 180, 185, 182],
  },
  {
    id: 'bnb',
    symbol: 'BNB',
    name: 'BNB',
    price: 412.30,
    change24h: 0.95,
    change7d: 3.21,
    marketCap: 63000000000,
    volume24h: 1200000000,
    high24h: 418.00,
    low24h: 405.00,
    circulatingSupply: 153000000,
    color: '#F3BA2F',
    sparkline: [390, 395, 388, 400, 405, 402, 408, 410, 415, 412],
  },
  {
    id: 'xrp',
    symbol: 'XRP',
    name: 'XRP',
    price: 0.6234,
    change24h: -2.10,
    change7d: -4.32,
    marketCap: 34000000000,
    volume24h: 1800000000,
    high24h: 0.6480,
    low24h: 0.6100,
    circulatingSupply: 55000000000,
    color: '#00AAE4',
    sparkline: [0.65, 0.66, 0.64, 0.63, 0.65, 0.64, 0.62, 0.63, 0.625, 0.6234],
  },
  {
    id: 'cardano',
    symbol: 'ADA',
    name: 'Cardano',
    price: 0.5821,
    change24h: 3.45,
    change7d: 6.78,
    marketCap: 20500000000,
    volume24h: 620000000,
    high24h: 0.5950,
    low24h: 0.5600,
    circulatingSupply: 35200000000,
    color: '#0033AD',
    sparkline: [0.52, 0.53, 0.51, 0.54, 0.55, 0.57, 0.56, 0.58, 0.575, 0.5821],
  },
  {
    id: 'avalanche',
    symbol: 'AVAX',
    name: 'Avalanche',
    price: 38.92,
    change24h: 4.12,
    change7d: 9.88,
    marketCap: 15800000000,
    volume24h: 580000000,
    high24h: 40.20,
    low24h: 37.10,
    circulatingSupply: 406000000,
    color: '#E84142',
    sparkline: [34, 35, 33.5, 36, 37, 36.5, 38, 37.8, 39.5, 38.92],
  },
  {
    id: 'polkadot',
    symbol: 'DOT',
    name: 'Polkadot',
    price: 8.74,
    change24h: -0.88,
    change7d: 2.15,
    marketCap: 12100000000,
    volume24h: 380000000,
    high24h: 8.95,
    low24h: 8.60,
    circulatingSupply: 1390000000,
    color: '#E6007A',
    sparkline: [8.2, 8.4, 8.1, 8.5, 8.6, 8.55, 8.7, 8.65, 8.8, 8.74],
  },
];

// --- Portfolio Holdings ---
export const portfolioHoldings = [
  {
    coinId: 'bitcoin',
    symbol: 'BTC',
    name: 'Bitcoin',
    quantity: 0.5423,
    avgBuyPrice: 58200.00,
    currentPrice: 67842.15,
    color: '#F7931A',
  },
  {
    coinId: 'ethereum',
    symbol: 'ETH',
    name: 'Ethereum',
    quantity: 4.2100,
    avgBuyPrice: 3100.00,
    currentPrice: 3541.80,
    color: '#627EEA',
  },
  {
    coinId: 'solana',
    symbol: 'SOL',
    name: 'Solana',
    quantity: 22.500,
    avgBuyPrice: 165.00,
    currentPrice: 182.45,
    color: '#9945FF',
  },
  {
    coinId: 'bnb',
    symbol: 'BNB',
    name: 'BNB',
    quantity: 3.800,
    avgBuyPrice: 385.00,
    currentPrice: 412.30,
    color: '#F3BA2F',
  },
  {
    coinId: 'cardano',
    symbol: 'ADA',
    name: 'Cardano',
    quantity: 5000,
    avgBuyPrice: 0.5200,
    currentPrice: 0.5821,
    color: '#0033AD',
  },
];

// --- Transaction History ---
export const transactionHistory = [
  { id: 'tx001', coin: 'BTC', type: 'BUY',  quantity: 0.2000, price: 62400.00, total: 12480.00, date: '2024-12-01', time: '09:14:22', status: 'completed' },
  { id: 'tx002', coin: 'ETH', type: 'BUY',  quantity: 2.0000, price: 3050.00,  total: 6100.00,  date: '2024-12-02', time: '14:32:11', status: 'completed' },
  { id: 'tx003', coin: 'SOL', type: 'BUY',  quantity: 10.000, price: 168.00,   total: 1680.00,  date: '2024-12-03', time: '11:05:44', status: 'completed' },
  { id: 'tx004', coin: 'BNB', type: 'BUY',  quantity: 2.0000, price: 380.00,   total: 760.00,   date: '2024-12-05', time: '16:21:08', status: 'completed' },
  { id: 'tx005', coin: 'BTC', type: 'SELL', quantity: 0.0500, price: 64800.00, total: 3240.00,  date: '2024-12-08', time: '10:44:55', status: 'completed' },
  { id: 'tx006', coin: 'ETH', type: 'BUY',  quantity: 1.0000, price: 3200.00,  total: 3200.00,  date: '2024-12-10', time: '13:17:33', status: 'completed' },
  { id: 'tx007', coin: 'ADA', type: 'BUY',  quantity: 3000.0, price: 0.510,    total: 1530.00,  date: '2024-12-12', time: '09:58:10', status: 'completed' },
  { id: 'tx008', coin: 'SOL', type: 'BUY',  quantity: 8.0000, price: 162.00,   total: 1296.00,  date: '2024-12-14', time: '15:30:27', status: 'completed' },
  { id: 'tx009', coin: 'BNB', type: 'SELL', quantity: 0.5000, price: 395.00,   total: 197.50,   date: '2024-12-16', time: '11:09:42', status: 'completed' },
  { id: 'tx010', coin: 'BTC', type: 'BUY',  quantity: 0.1500, price: 65200.00, total: 9780.00,  date: '2024-12-18', time: '08:22:19', status: 'completed' },
  { id: 'tx011', coin: 'ETH', type: 'SELL', quantity: 0.5000, price: 3480.00,  total: 1740.00,  date: '2024-12-20', time: '14:11:05', status: 'completed' },
  { id: 'tx012', coin: 'ADA', type: 'BUY',  quantity: 2000.0, price: 0.530,    total: 1060.00,  date: '2024-12-22', time: '10:44:38', status: 'completed' },
  { id: 'tx013', coin: 'BTC', type: 'BUY',  quantity: 0.1923, price: 58100.00, total: 11174.63, date: '2024-12-24', time: '09:00:00', status: 'completed' },
  { id: 'tx014', coin: 'BNB', type: 'BUY',  quantity: 2.3000, price: 388.00,   total: 892.40,   date: '2024-12-26', time: '16:45:12', status: 'completed' },
  { id: 'tx015', coin: 'SOL', type: 'SELL', quantity: 4.5000, price: 175.00,   total: 787.50,   date: '2024-12-28', time: '12:30:00', status: 'completed' },
  { id: 'tx016', coin: 'ETH', type: 'BUY',  quantity: 1.7100, price: 3180.00,  total: 5437.80,  date: '2024-12-30', time: '08:15:55', status: 'completed' },
  { id: 'tx017', coin: 'BTC', type: 'SELL', quantity: 0.0300, price: 67100.00, total: 2013.00,  date: '2025-01-02', time: '11:22:44', status: 'completed' },
  { id: 'tx018', coin: 'SOL', type: 'BUY',  quantity: 8.5000, price: 178.00,   total: 1513.00,  date: '2025-01-05', time: '14:00:00', status: 'completed' },
];

// --- Portfolio Growth Chart Data (30 days) ---
export const portfolioGrowthData = [
  { date: 'Dec 1',  value: 42000, profit: 2000 },
  { date: 'Dec 3',  value: 44500, profit: 4500 },
  { date: 'Dec 5',  value: 43200, profit: 3200 },
  { date: 'Dec 7',  value: 46800, profit: 6800 },
  { date: 'Dec 9',  value: 48200, profit: 8200 },
  { date: 'Dec 11', value: 47100, profit: 7100 },
  { date: 'Dec 13', value: 50400, profit: 10400 },
  { date: 'Dec 15', value: 52800, profit: 12800 },
  { date: 'Dec 17', value: 51200, profit: 11200 },
  { date: 'Dec 19', value: 54600, profit: 14600 },
  { date: 'Dec 21', value: 56900, profit: 16900 },
  { date: 'Dec 23', value: 55400, profit: 15400 },
  { date: 'Dec 25', value: 58200, profit: 18200 },
  { date: 'Dec 27', value: 61400, profit: 21400 },
  { date: 'Dec 29', value: 59800, profit: 19800 },
  { date: 'Dec 31', value: 63200, profit: 23200 },
  { date: 'Jan 2',  value: 65800, profit: 25800 },
  { date: 'Jan 4',  value: 64200, profit: 24200 },
  { date: 'Jan 6',  value: 67500, profit: 27500 },
  { date: 'Jan 8',  value: 70100, profit: 30100 },
];

// --- Profit/Loss Monthly Breakdown ---
export const monthlyPnL = [
  { month: 'Jul', profit: 1200, loss: -400 },
  { month: 'Aug', profit: 2800, loss: -900 },
  { month: 'Sep', profit: 1500, loss: -1200 },
  { month: 'Oct', profit: 4200, loss: -600 },
  { month: 'Nov', profit: 3800, loss: -1500 },
  { month: 'Dec', profit: 8600, loss: -2100 },
  { month: 'Jan', profit: 5400, loss: -800 },
];

// --- Trading Activity Data ---
export const tradingActivity = [
  { week: 'W1 Nov', buys: 4, sells: 1, volume: 8200 },
  { week: 'W2 Nov', buys: 3, sells: 2, volume: 6400 },
  { week: 'W3 Nov', buys: 5, sells: 1, volume: 11200 },
  { week: 'W4 Nov', buys: 2, sells: 3, volume: 7800 },
  { week: 'W1 Dec', buys: 6, sells: 2, volume: 14500 },
  { week: 'W2 Dec', buys: 4, sells: 1, volume: 9200 },
  { week: 'W3 Dec', buys: 5, sells: 2, volume: 12800 },
  { week: 'W4 Dec', buys: 3, sells: 4, volume: 10100 },
];

// --- Candlestick-like OHLC Data for BTC ---
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

// --- Portfolio Allocation (for pie chart) ---
export const portfolioAllocation = [
  { name: 'BTC', value: 36.8, color: '#F7931A' },
  { name: 'ETH', value: 29.1, color: '#627EEA' },
  { name: 'SOL', value: 16.5, color: '#9945FF' },
  { name: 'BNB', value: 12.2, color: '#F3BA2F' },
  { name: 'ADA', value: 5.4, color: '#0033AD' },
];

// --- User Profile ---
export const userProfile = {
  id: 'user_001',
  username: 'CryptoTrader_FYP',
  email: 'trader@cryptosim.io',
  joinDate: '2024-09-01',
  balance: 25842.30,     // Available USDT balance
  totalInvested: 40000,
  notifications: 3,
  avatar: null,
  tier: 'Pro Trader',
  rank: 42,
};

// --- Summary Stats ---
export const portfolioStats = {
  totalValue: 70182.45,
  totalInvested: 40000,
  totalPnL: 30182.45,
  pnlPercent: 75.46,
  availableBalance: 25842.30,
  dayChange: 1284.32,
  dayChangePercent: 1.86,
  bestPerformer: 'SOL',
  worstPerformer: 'XRP',
  totalTrades: 18,
  winRate: 72.2,
};

// --- Market Fear & Greed Index ---
export const marketSentiment = {
  value: 68,
  label: 'Greed',
  trend: 'up',
};

// --- Top Movers ---
export const topMovers = [
  { symbol: 'AVAX', change: 4.12, price: 38.92 },
  { symbol: 'ADA',  change: 3.45, price: 0.5821 },
  { symbol: 'BTC',  change: 2.34, price: 67842 },
  { symbol: 'XRP',  change: -2.10, price: 0.6234 },
  { symbol: 'SOL',  change: -1.23, price: 182.45 },
];
