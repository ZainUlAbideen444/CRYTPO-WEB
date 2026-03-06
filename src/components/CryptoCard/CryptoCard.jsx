// CryptoCard.jsx — Coin card with sparkline
import { TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

export default function CryptoCard({ coin, onClick }) {
  const isPositive = coin.change24h >= 0;
  const sparkData = coin.sparkline.map((v, i) => ({ v }));

  return (
    <div className="glass-card-hover p-4 cursor-pointer" onClick={() => onClick && onClick(coin)}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {/* Coin Icon (colored circle) */}
          <div className="w-9 h-9 rounded-full flex items-center justify-center font-display text-xs font-bold text-white"
            style={{ background: `${coin.color}22`, border: `1.5px solid ${coin.color}44` }}>
            <span style={{ color: coin.color }}>{coin.symbol.slice(0, 1)}</span>
          </div>
          <div>
            <div className="font-mono font-bold text-sm text-white">{coin.symbol}</div>
            <div className="text-xs text-white/40">{coin.name}</div>
          </div>
        </div>
        <div className={`flex items-center gap-0.5 text-xs font-bold px-2 py-0.5 rounded-full ${isPositive ? 'badge-buy' : 'badge-sell'}`}>
          {isPositive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
          {isPositive ? '+' : ''}{coin.change24h}%
        </div>
      </div>

      {/* Price */}
      <div className="font-mono font-bold text-lg text-white mb-1">
        ${coin.price.toLocaleString(undefined, { minimumFractionDigits: coin.price < 1 ? 4 : 2, maximumFractionDigits: coin.price < 1 ? 4 : 2 })}
      </div>

      {/* Sparkline */}
      <div className="h-10 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sparkData}>
            <Line
              type="monotone"
              dataKey="v"
              stroke={isPositive ? '#4ade80' : '#ef4444'}
              strokeWidth={1.5}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Volume */}
      <div className="mt-2 flex items-center justify-between">
        <span className="text-xs text-white/30">24h Vol</span>
        <span className="text-xs font-mono text-white/50">
          ${(coin.volume24h / 1e9).toFixed(1)}B
        </span>
      </div>
    </div>
  );
}
