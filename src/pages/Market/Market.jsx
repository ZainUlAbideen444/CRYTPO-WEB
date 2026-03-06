// Market.jsx — Full market listing page
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, TrendingUp, TrendingDown, ArrowUpDown } from 'lucide-react';
import { cryptoMarket } from '../../data/mockData';

export default function Market() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('marketCap');
  const [sortDir, setSortDir] = useState('desc');

  const handleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('desc'); }
  };

  const filtered = [...cryptoMarket]
    .filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.symbol.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const v = sortDir === 'asc' ? 1 : -1;
      return (a[sortKey] > b[sortKey] ? 1 : -1) * v;
    });

  const SortBtn = ({ k, label }) => (
    <button onClick={() => handleSort(k)}
      className={`flex items-center gap-1 text-xs font-semibold tracking-wider transition-all hover:text-white ${sortKey === k ? 'text-red-500' : 'text-white/30'}`}>
      {label}
      <ArrowUpDown size={10} />
    </button>
  );

  return (
    <div className="p-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Market</h1>
          <p className="text-white/40 text-sm mt-0.5">Live cryptocurrency prices and market data</p>
        </div>
        {/* Search */}
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search coins..."
            className="input-dark pl-9 pr-4 py-2.5 rounded-xl text-sm w-52"
          />
        </div>
      </div>

      {/* Market Stats Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Total Market Cap', value: '$2.54T', change: '+1.8%', pos: true },
          { label: '24h Volume', value: '$98.2B', change: '+5.3%', pos: true },
          { label: 'BTC Dominance', value: '52.4%', change: '-0.3%', pos: false },
          { label: 'Coins Tracked', value: '50+', change: '', pos: true },
        ].map(s => (
          <div key={s.label} className="glass-card p-3">
            <div className="text-xs text-white/30 mb-1">{s.label}</div>
            <div className="font-mono font-bold text-white text-sm">{s.value}</div>
            {s.change && <div className={`text-xs ${s.pos ? 'price-up' : 'price-down'}`}>{s.change}</div>}
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-7 gap-4 px-5 py-3 border-b border-white/5">
          <div className="text-xs text-white/30 col-span-2">#  COIN</div>
          <div className="text-right"><SortBtn k="price" label="PRICE" /></div>
          <div className="text-right"><SortBtn k="change24h" label="24H %" /></div>
          <div className="text-right hidden md:block"><SortBtn k="change7d" label="7D %" /></div>
          <div className="text-right hidden lg:block"><SortBtn k="marketCap" label="MARKET CAP" /></div>
          <div className="text-right">ACTION</div>
        </div>

        {/* Rows */}
        <div className="divide-y" style={{ divideColor: 'rgba(255,255,255,0.03)' }}>
          {filtered.map((coin, i) => {
            const is24Pos = coin.change24h >= 0;
            const is7dPos = coin.change7d >= 0;
            return (
              <div key={coin.id}
                className="grid grid-cols-7 gap-4 px-5 py-3.5 items-center table-row-hover cursor-pointer transition-all"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                {/* Rank + Name */}
                <div className="col-span-2 flex items-center gap-3">
                  <span className="text-xs text-white/20 font-mono w-4">{i + 1}</span>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: `${coin.color}22`, border: `1px solid ${coin.color}33`, color: coin.color }}>
                    {coin.symbol.slice(0, 1)}
                  </div>
                  <div>
                    <div className="font-mono text-sm font-bold text-white">{coin.symbol}</div>
                    <div className="text-xs text-white/30">{coin.name}</div>
                  </div>
                </div>

                {/* Price */}
                <div className="text-right font-mono text-sm font-bold text-white">
                  ${coin.price > 1 ? coin.price.toLocaleString(undefined, { maximumFractionDigits: 2 }) : coin.price.toFixed(4)}
                </div>

                {/* 24h */}
                <div className={`text-right text-sm font-bold font-mono flex items-center justify-end gap-1 ${is24Pos ? 'price-up' : 'price-down'}`}>
                  {is24Pos ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                  {is24Pos ? '+' : ''}{coin.change24h}%
                </div>

                {/* 7d */}
                <div className={`text-right text-sm font-bold font-mono hidden md:block ${is7dPos ? 'price-up' : 'price-down'}`}>
                  {is7dPos ? '+' : ''}{coin.change7d}%
                </div>

                {/* Market Cap */}
                <div className="text-right font-mono text-xs text-white/50 hidden lg:block">
                  ${(coin.marketCap / 1e9).toFixed(1)}B
                </div>

                {/* Trade Button */}
                <div className="text-right">
                  <button onClick={() => navigate('/trade', { state: { coin } })}
                    className="btn-primary px-3 py-1.5 rounded-lg text-xs font-bold">
                    Trade
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
