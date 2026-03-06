// Dashboard.jsx — Main dashboard page
import { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Activity, ArrowUpRight, ArrowDownRight, Zap, RefreshCw } from 'lucide-react';
import { portfolioStats, portfolioGrowthData, portfolioHoldings, topMovers, cryptoMarket, userProfile } from '../../data/mockData';
import { PortfolioAreaChart } from '../../components/ChartComponent/ChartComponent';
import { useNavigate } from 'react-router-dom';

// Stat Card
const StatCard = ({ icon: Icon, label, value, sub, subPositive, iconColor }) => (
  <div className="stat-card">
    <div className="flex items-start justify-between mb-3">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center"
        style={{ background: `${iconColor}15`, border: `1px solid ${iconColor}25` }}>
        <Icon size={16} style={{ color: iconColor }} />
      </div>
      {sub !== undefined && (
        <div className={`flex items-center gap-0.5 text-xs font-bold ${subPositive ? 'price-up' : 'price-down'}`}>
          {subPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {sub}
        </div>
      )}
    </div>
    <div className="font-mono text-xl font-bold text-white mb-0.5">{value}</div>
    <div className="text-xs text-white/40">{label}</div>
  </div>
);

export default function Dashboard() {
  const navigate = useNavigate();
  const [timeframe, setTimeframe] = useState('1M');
  const timeframes = ['1W', '1M', '3M', 'ALL'];

  return (
    <div className="p-6 space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-white/40 text-sm mt-0.5">Welcome back, {userProfile.username}</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs text-white/50 hover:text-white transition-all"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <RefreshCw size={12} /> Refresh
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon={DollarSign} label="Portfolio Value" value={`$${(portfolioStats.totalValue).toLocaleString()}`}
          sub={`+${portfolioStats.dayChangePercent}%`} subPositive iconColor="#ef4444" />
        <StatCard icon={TrendingUp} label="Total P&L" value={`+$${portfolioStats.totalPnL.toLocaleString()}`}
          sub={`+${portfolioStats.pnlPercent}%`} subPositive iconColor="#4ade80" />
        <StatCard icon={Activity} label="Day Change" value={`+$${portfolioStats.dayChange.toLocaleString()}`}
          sub={`+${portfolioStats.dayChangePercent}%`} subPositive iconColor="#60a5fa" />
        <StatCard icon={Zap} label="Available Balance" value={`$${portfolioStats.availableBalance.toLocaleString()}`}
          sub={`${portfolioStats.winRate}% win rate`} subPositive iconColor="#f59e0b" />
      </div>

      {/* Chart + Top Movers */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Portfolio Chart */}
        <div className="xl:col-span-2 glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold text-white text-sm">Portfolio Growth</h2>
              <p className="text-xs text-white/30 mt-0.5 font-mono">+${portfolioStats.totalPnL.toLocaleString()} total return</p>
            </div>
            <div className="flex gap-1">
              {timeframes.map(t => (
                <button key={t} onClick={() => setTimeframe(t)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${timeframe === t ? 'text-white' : 'text-white/30 hover:text-white/60'}`}
                  style={timeframe === t ? { background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444' }
                    : { background: 'transparent' }}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="h-52">
            <PortfolioAreaChart data={portfolioGrowthData} />
          </div>
        </div>

        {/* Top Movers */}
        <div className="glass-card p-5">
          <h2 className="font-semibold text-white text-sm mb-4">Top Movers</h2>
          <div className="space-y-2">
            {topMovers.map(m => (
              <div key={m.symbol} className="flex items-center justify-between py-2 px-3 rounded-lg table-row-hover cursor-pointer transition-all"
                onClick={() => navigate('/trade')}>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>
                    {m.symbol.slice(0, 1)}
                  </div>
                  <span className="font-mono text-sm font-bold text-white">{m.symbol}</span>
                </div>
                <div className="text-right">
                  <div className="font-mono text-xs text-white">${typeof m.price === 'number' && m.price > 1 ? m.price.toLocaleString() : m.price}</div>
                  <div className={`text-xs font-bold ${m.change >= 0 ? 'price-up' : 'price-down'}`}>
                    {m.change >= 0 ? '+' : ''}{m.change}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Holdings preview + Market Overview */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Holdings */}
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-white text-sm">My Holdings</h2>
            <button onClick={() => navigate('/portfolio')} className="text-xs text-red-500 hover:text-red-400">View All →</button>
          </div>
          <div className="space-y-2">
            {portfolioHoldings.slice(0, 4).map(h => {
              const val = h.quantity * h.currentPrice;
              const pnl = val - h.quantity * h.avgBuyPrice;
              const isPos = pnl >= 0;
              return (
                <div key={h.symbol} className="flex items-center justify-between py-2 px-3 rounded-lg table-row-hover">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ background: `${h.color}22`, color: h.color }}>
                      {h.symbol.slice(0, 1)}
                    </div>
                    <div>
                      <div className="font-mono text-xs font-bold text-white">{h.symbol}</div>
                      <div className="text-xs text-white/30 font-mono">{h.quantity} {h.symbol}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-xs font-bold text-white">${val.toFixed(2)}</div>
                    <div className={`text-xs ${isPos ? 'price-up' : 'price-down'}`}>{isPos ? '+' : ''}${pnl.toFixed(2)}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Market Overview */}
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-white text-sm">Market Overview</h2>
            <button onClick={() => navigate('/market')} className="text-xs text-red-500 hover:text-red-400">Full Market →</button>
          </div>
          <div className="space-y-2">
            {cryptoMarket.slice(0, 5).map(c => {
              const isPos = c.change24h >= 0;
              return (
                <div key={c.symbol} className="flex items-center justify-between py-2 px-3 rounded-lg table-row-hover cursor-pointer"
                  onClick={() => navigate('/trade')}>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ background: `${c.color}22`, color: c.color }}>
                      {c.symbol.slice(0, 1)}
                    </div>
                    <span className="font-mono text-xs font-bold text-white">{c.symbol}</span>
                  </div>
                  <span className="font-mono text-xs text-white/60">${c.price > 1 ? c.price.toLocaleString() : c.price}</span>
                  <div className={`text-xs font-bold px-2 py-0.5 rounded-full ${isPos ? 'badge-buy' : 'badge-sell'}`}>
                    {isPos ? '+' : ''}{c.change24h}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
