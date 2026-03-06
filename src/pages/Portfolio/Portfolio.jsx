// Portfolio.jsx — Portfolio holdings page
import { portfolioHoldings, portfolioStats, portfolioAllocation, portfolioGrowthData } from '../../data/mockData';
import PortfolioCard from '../../components/PortfolioCard/PortfolioCard';
import { AllocationPieChart, PortfolioAreaChart } from '../../components/ChartComponent/ChartComponent';
import { TrendingUp, DollarSign, Target, Award } from 'lucide-react';

export default function Portfolio() {
  const totalValue = portfolioHoldings.reduce((sum, h) => sum + h.quantity * h.currentPrice, 0);

  return (
    <div className="p-6 animate-fade-in-up">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-white">Portfolio</h1>
        <p className="text-white/40 text-sm mt-0.5">Your holdings and performance overview</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { icon: DollarSign,  label: 'Total Value',     value: `$${totalValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}`, color: '#ef4444' },
          { icon: TrendingUp,  label: 'Total P&L',       value: `+$${portfolioStats.totalPnL.toLocaleString()}`, color: '#4ade80' },
          { icon: Target,      label: 'Return %',        value: `+${portfolioStats.pnlPercent}%`, color: '#60a5fa' },
          { icon: Award,       label: 'Win Rate',        value: `${portfolioStats.winRate}%`, color: '#f59e0b' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-3"
              style={{ background: `${s.color}15`, border: `1px solid ${s.color}25` }}>
              <s.icon size={14} style={{ color: s.color }} />
            </div>
            <div className="font-mono text-lg font-bold text-white">{s.value}</div>
            <div className="text-xs text-white/40 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
        {/* Growth Chart */}
        <div className="xl:col-span-2 glass-card p-5">
          <h2 className="font-semibold text-white text-sm mb-4">Portfolio Growth</h2>
          <div className="h-52">
            <PortfolioAreaChart data={portfolioGrowthData} />
          </div>
        </div>

        {/* Allocation */}
        <div className="glass-card p-5">
          <h2 className="font-semibold text-white text-sm mb-2">Asset Allocation</h2>
          <div className="h-52">
            <AllocationPieChart data={portfolioAllocation} />
          </div>
          <div className="space-y-1.5 mt-2">
            {portfolioAllocation.map(a => (
              <div key={a.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: a.color }} />
                  <span className="text-xs text-white/60 font-mono">{a.name}</span>
                </div>
                <span className="text-xs font-mono font-bold text-white">{a.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Holdings Grid */}
      <div>
        <h2 className="font-semibold text-white text-sm mb-4">Holdings ({portfolioHoldings.length} assets)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {portfolioHoldings.map(h => (
            <PortfolioCard key={h.symbol} holding={h} />
          ))}
        </div>
      </div>

      {/* Performance Table */}
      <div className="glass-card mt-6 overflow-hidden">
        <div className="px-5 py-4 border-b border-white/5">
          <h2 className="font-semibold text-white text-sm">Detailed Holdings</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                {['Asset', 'Quantity', 'Avg Buy', 'Current Price', 'Value', 'P&L', 'P&L %'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs text-white/30 font-semibold tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {portfolioHoldings.map(h => {
                const val = h.quantity * h.currentPrice;
                const cost = h.quantity * h.avgBuyPrice;
                const pnl = val - cost;
                const pnlPct = ((pnl / cost) * 100).toFixed(2);
                const isPos = pnl >= 0;
                return (
                  <tr key={h.symbol} className="border-b table-row-hover" style={{ borderColor: 'rgba(255,255,255,0.03)' }}>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                          style={{ background: `${h.color}22`, color: h.color }}>
                          {h.symbol.slice(0, 1)}
                        </div>
                        <div>
                          <div className="font-mono text-sm font-bold text-white">{h.symbol}</div>
                          <div className="text-xs text-white/30">{h.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 font-mono text-sm text-white/70">
                      {h.quantity.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                    </td>
                    <td className="px-5 py-3 font-mono text-sm text-white/50">
                      ${h.avgBuyPrice.toLocaleString()}
                    </td>
                    <td className="px-5 py-3 font-mono text-sm text-white">
                      ${h.currentPrice.toLocaleString()}
                    </td>
                    <td className="px-5 py-3 font-mono text-sm font-bold text-white">
                      ${val.toFixed(2)}
                    </td>
                    <td className={`px-5 py-3 font-mono text-sm font-bold ${isPos ? 'price-up' : 'price-down'}`}>
                      {isPos ? '+' : ''}${pnl.toFixed(2)}
                    </td>
                    <td className={`px-5 py-3`}>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isPos ? 'badge-buy' : 'badge-sell'}`}>
                        {isPos ? '+' : ''}{pnlPct}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
