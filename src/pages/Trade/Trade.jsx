// Trade.jsx — Trading interface
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react';
import { cryptoMarket, userProfile, btcPriceHistory, transactionHistory } from '../../data/mockData';
import TradeForm from '../../components/TradeForm/TradeForm';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Trade() {
  const location = useLocation();
  const [selectedCoin, setSelectedCoin] = useState(
    location.state?.coin || cryptoMarket[0]
  );
  const [balance, setBalance] = useState(userProfile.balance);
  const [recentTrades, setRecentTrades] = useState(transactionHistory.slice(0, 5));

  const handleTrade = (trade) => {
    if (trade.side === 'BUY') setBalance(prev => Math.max(0, prev - trade.total));
    const newTx = {
      id: `tx${Date.now()}`,
      coin: trade.coin,
      type: trade.side,
      quantity: trade.amount,
      price: trade.price,
      total: trade.total,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().split(' ')[0],
      status: 'completed',
    };
    setRecentTrades(prev => [newTx, ...prev.slice(0, 4)]);
  };

  const isPositive = selectedCoin.change24h >= 0;

  return (
    <div className="p-6 animate-fade-in-up">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Trade</h1>
          <p className="text-white/40 text-sm mt-0.5">Execute buy and sell orders</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
        {/* Coin Selector */}
        <div className="glass-card p-4">
          <h3 className="text-xs text-white/40 mb-3 tracking-wider">SELECT MARKET</h3>
          <div className="space-y-1">
            {cryptoMarket.map(coin => (
              <button key={coin.id}
                onClick={() => setSelectedCoin(coin)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all text-left ${selectedCoin.id === coin.id ? 'active' : 'sidebar-link'}`}
                style={selectedCoin.id === coin.id ? {
                  background: 'rgba(239,68,68,0.1)',
                  border: '1px solid rgba(239,68,68,0.2)',
                  color: '#ef4444',
                } : {}}>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: `${coin.color}22`, color: coin.color }}>
                    {coin.symbol.slice(0, 1)}
                  </div>
                  <span className="font-mono text-xs font-bold">{coin.symbol}</span>
                </div>
                <span className={`text-xs font-bold font-mono ${coin.change24h >= 0 ? 'price-up' : 'price-down'}`}>
                  {coin.change24h >= 0 ? '+' : ''}{coin.change24h}%
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Chart + Info */}
        <div className="xl:col-span-2 space-y-4">
          {/* Price Header */}
          <div className="glass-card p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                  style={{ background: `${selectedCoin.color}22`, border: `2px solid ${selectedCoin.color}44`, color: selectedCoin.color }}>
                  {selectedCoin.symbol.slice(0, 1)}
                </div>
                <div>
                  <div className="font-mono text-lg font-black text-white">
                    ${selectedCoin.price > 1 ? selectedCoin.price.toLocaleString() : selectedCoin.price.toFixed(4)}
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-bold ${isPositive ? 'price-up' : 'price-down'}`}>
                    {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    {isPositive ? '+' : ''}{selectedCoin.change24h}% (24h)
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-white/30 mb-0.5">Market Cap</div>
                <div className="font-mono text-xs font-bold text-white">${(selectedCoin.marketCap / 1e9).toFixed(1)}B</div>
              </div>
            </div>

            {/* OHLC */}
            <div className="grid grid-cols-4 gap-3">
              {[
                ['OPEN', selectedCoin.price * 0.985],
                ['HIGH', selectedCoin.high24h],
                ['LOW', selectedCoin.low24h],
                ['VOL', null],
              ].map(([label, val]) => (
                <div key={label} className="text-center px-2 py-1.5 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <div className="text-xs text-white/30">{label}</div>
                  <div className="font-mono text-xs font-bold text-white mt-0.5">
                    {label === 'VOL' ? `$${(selectedCoin.volume24h / 1e9).toFixed(1)}B` : `$${val.toLocaleString()}`}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Price Chart */}
          <div className="glass-card p-5">
            <h3 className="text-sm font-semibold text-white mb-4">Price Chart (24h)</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={btcPriceHistory}>
                  <defs>
                    <linearGradient id="tradeGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={isPositive ? '#4ade80' : '#ef4444'} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={isPositive ? '#4ade80' : '#ef4444'} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="time" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false}
                    tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} domain={['auto', 'auto']} />
                  <Tooltip contentStyle={{ background: '#111', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 8, fontFamily: 'JetBrains Mono', fontSize: 11 }} />
                  <Area type="monotone" dataKey="close" name="Price" stroke={isPositive ? '#4ade80' : '#ef4444'}
                    strokeWidth={2} fill="url(#tradeGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Trades */}
          <div className="glass-card p-5">
            <div className="flex items-center gap-2 mb-3">
              <Clock size={14} className="text-white/40" />
              <h3 className="text-sm font-semibold text-white">Recent Trades</h3>
            </div>
            <div className="space-y-1.5">
              {recentTrades.map(tx => (
                <div key={tx.id} className="flex items-center justify-between py-1.5 px-2 rounded-lg table-row-hover">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${tx.type === 'BUY' ? 'badge-buy' : 'badge-sell'}`}>{tx.type}</span>
                    <span className="font-mono text-xs text-white/70">{tx.coin}</span>
                  </div>
                  <span className="font-mono text-xs text-white/50">{tx.quantity} @ ${tx.price.toLocaleString()}</span>
                  <span className="font-mono text-xs text-white">${tx.total.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trade Form */}
        <div className="glass-card p-5">
          <h3 className="text-xs text-white/40 mb-4 tracking-wider">PLACE ORDER</h3>
          <TradeForm coin={selectedCoin} balance={balance} onTrade={handleTrade} />

          {/* Order book style mini display */}
          <div className="mt-5 pt-4 border-t border-white/5">
            <div className="text-xs text-white/30 mb-3 tracking-wider">ORDER BOOK</div>
            <div className="space-y-1">
              {[0.2, 0.15, 0.1, 0.05].map((pct, i) => {
                const askPrice = (selectedCoin.price * (1 + pct * 0.01)).toFixed(2);
                const qty = (Math.random() * 2).toFixed(4);
                return (
                  <div key={i} className="flex justify-between text-xs font-mono relative overflow-hidden rounded px-2 py-0.5">
                    <div className="absolute inset-0 opacity-10 rounded" style={{ background: '#ef4444', width: `${20 + i * 15}%` }} />
                    <span className="price-down z-10">{askPrice}</span>
                    <span className="text-white/30 z-10">{qty}</span>
                  </div>
                );
              })}
              <div className="flex justify-center py-1">
                <span className="font-mono text-xs font-bold" style={{ color: isPositive ? '#4ade80' : '#ef4444' }}>
                  ${selectedCoin.price > 1 ? selectedCoin.price.toLocaleString() : selectedCoin.price.toFixed(4)}
                </span>
              </div>
              {[0.05, 0.1, 0.15, 0.2].map((pct, i) => {
                const bidPrice = (selectedCoin.price * (1 - pct * 0.01)).toFixed(2);
                const qty = (Math.random() * 2).toFixed(4);
                return (
                  <div key={i} className="flex justify-between text-xs font-mono relative overflow-hidden rounded px-2 py-0.5">
                    <div className="absolute inset-0 opacity-10 rounded" style={{ background: '#4ade80', width: `${15 + i * 10}%` }} />
                    <span className="price-up z-10">{bidPrice}</span>
                    <span className="text-white/30 z-10">{qty}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
