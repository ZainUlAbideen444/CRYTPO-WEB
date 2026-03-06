// PortfolioCard.jsx — Individual holding card
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function PortfolioCard({ holding }) {
  const currentValue = holding.quantity * holding.currentPrice;
  const costBasis = holding.quantity * holding.avgBuyPrice;
  const pnl = currentValue - costBasis;
  const pnlPct = ((pnl / costBasis) * 100).toFixed(2);
  const isPositive = pnl >= 0;

  return (
    <div className="glass-card-hover p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center font-display text-xs font-bold"
            style={{ background: `${holding.color}22`, border: `1.5px solid ${holding.color}44`, color: holding.color }}>
            {holding.symbol.slice(0, 1)}
          </div>
          <div>
            <div className="font-mono font-bold text-sm text-white">{holding.symbol}</div>
            <div className="text-xs text-white/40">{holding.name}</div>
          </div>
        </div>
        <div className={`flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${isPositive ? 'badge-buy' : 'badge-sell'}`}>
          {isPositive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
          {isPositive ? '+' : ''}{pnlPct}%
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="text-xs text-white/30 mb-0.5">Holdings</div>
          <div className="font-mono text-sm font-bold text-white">
            {holding.quantity.toLocaleString(undefined, { maximumFractionDigits: 4 })} {holding.symbol}
          </div>
        </div>
        <div>
          <div className="text-xs text-white/30 mb-0.5">Current Value</div>
          <div className="font-mono text-sm font-bold text-white">${currentValue.toFixed(2)}</div>
        </div>
        <div>
          <div className="text-xs text-white/30 mb-0.5">Avg Buy Price</div>
          <div className="font-mono text-xs text-white/60">${holding.avgBuyPrice.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-xs text-white/30 mb-0.5">P&L</div>
          <div className={`font-mono text-sm font-bold ${isPositive ? 'price-up' : 'price-down'}`}>
            {isPositive ? '+' : ''}${pnl.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Progress bar (allocation within portfolio) */}
      <div className="mt-3">
        <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(Math.abs(pnlPct), 100)}%`, background: isPositive ? '#4ade80' : '#ef4444' }} />
        </div>
      </div>
    </div>
  );
}
