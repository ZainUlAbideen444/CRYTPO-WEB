// Analytics.jsx — Performance analytics with multiple charts
import { portfolioGrowthData, monthlyPnL, tradingActivity, portfolioAllocation, portfolioStats } from '../../data/mockData';
import { PortfolioAreaChart, PnLBarChart, TradingActivityChart, AllocationPieChart, ProfitLineChart } from '../../components/ChartComponent/ChartComponent';
import { TrendingUp, BarChart2, Activity, Target, Award, Zap } from 'lucide-react';

export default function Analytics() {
  const kpiCards = [
    { icon: TrendingUp, label: 'Total Return',    value: `+${portfolioStats.pnlPercent}%`,     sub: 'All time',           color: '#4ade80' },
    { icon: Target,     label: 'Win Rate',         value: `${portfolioStats.winRate}%`,          sub: 'Profitable trades',  color: '#ef4444' },
    { icon: Activity,   label: 'Total Trades',     value: portfolioStats.totalTrades,             sub: 'All executed',       color: '#60a5fa' },
    { icon: Award,      label: 'Best Performer',   value: portfolioStats.bestPerformer,           sub: 'vs. buy price',      color: '#f59e0b' },
    { icon: Zap,        label: 'Worst Performer',  value: portfolioStats.worstPerformer,          sub: 'vs. buy price',      color: '#f87171' },
    { icon: BarChart2,  label: 'Avg Trade Size',   value: `$${(53000 / portfolioStats.totalTrades).toFixed(0)}`, sub: 'Per trade', color: '#a78bfa' },
  ];

  return (
    <div className="p-6 animate-fade-in-up">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-white">Analytics</h1>
        <p className="text-white/40 text-sm mt-0.5">Detailed performance metrics and insights</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 mb-6">
        {kpiCards.map(k => (
          <div key={k.label} className="glass-card p-4 text-center">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center mx-auto mb-2"
              style={{ background: `${k.color}15`, border: `1px solid ${k.color}25` }}>
              <k.icon size={14} style={{ color: k.color }} />
            </div>
            <div className="font-mono text-lg font-bold text-white">{k.value}</div>
            <div className="text-xs text-white/40 mt-0.5">{k.label}</div>
            <div className="text-xs text-white/20 mt-0.5">{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-4">
        {/* Portfolio Growth */}
        <div className="glass-card p-5">
          <div className="mb-4">
            <h2 className="font-semibold text-white text-sm">Portfolio Growth</h2>
            <p className="text-xs text-white/30 mt-0.5">Total portfolio value over time</p>
          </div>
          <div className="h-52">
            <PortfolioAreaChart data={portfolioGrowthData} />
          </div>
        </div>

        {/* Cumulative P&L */}
        <div className="glass-card p-5">
          <div className="mb-4">
            <h2 className="font-semibold text-white text-sm">Cumulative P&L</h2>
            <p className="text-xs text-white/30 mt-0.5">Running profit & loss</p>
          </div>
          <div className="h-52">
            <ProfitLineChart data={portfolioGrowthData} />
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-4">
        {/* Monthly PnL */}
        <div className="xl:col-span-2 glass-card p-5">
          <div className="mb-4">
            <h2 className="font-semibold text-white text-sm">Monthly Profit / Loss</h2>
            <p className="text-xs text-white/30 mt-0.5">Green = profit, Red = loss</p>
          </div>
          <div className="h-52">
            <PnLBarChart data={monthlyPnL} />
          </div>
        </div>

        {/* Allocation */}
        <div className="glass-card p-5">
          <div className="mb-2">
            <h2 className="font-semibold text-white text-sm">Allocation</h2>
            <p className="text-xs text-white/30 mt-0.5">By asset class</p>
          </div>
          <div className="h-52">
            <AllocationPieChart data={portfolioAllocation} />
          </div>
        </div>
      </div>

      {/* Trading Activity */}
      <div className="glass-card p-5 mb-4">
        <div className="mb-4">
          <h2 className="font-semibold text-white text-sm">Trading Activity</h2>
          <p className="text-xs text-white/30 mt-0.5">Weekly buy vs. sell count</p>
        </div>
        <div className="h-48">
          <TradingActivityChart data={tradingActivity} />
        </div>
      </div>

      {/* Performance Metrics Table */}
      <div className="glass-card overflow-hidden">
        <div className="px-5 py-4 border-b border-white/5">
          <h2 className="font-semibold text-white text-sm">Performance Breakdown</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
          {[
            { label: 'Total Invested',    value: '$40,000.00',  note: 'Initial capital', color: 'text-white' },
            { label: 'Current Value',     value: '$70,182.45',  note: 'Portfolio + cash', color: 'price-up' },
            { label: 'Realized P&L',      value: '+$8,230.50',  note: 'From closed trades', color: 'price-up' },
            { label: 'Unrealized P&L',    value: '+$21,951.95', note: 'Open positions', color: 'price-up' },
          ].map(m => (
            <div key={m.label} className="px-5 py-4 text-center">
              <div className={`font-mono text-lg font-bold mb-1 ${m.color}`}>{m.value}</div>
              <div className="text-xs text-white/40">{m.label}</div>
              <div className="text-xs text-white/20 mt-0.5">{m.note}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
