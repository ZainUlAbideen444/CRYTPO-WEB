// Transactions.jsx — Transaction history page
import { useState } from 'react';
import { Search, Filter, Download, CheckCircle } from 'lucide-react';
import { transactionHistory } from '../../data/mockData';

export default function Transactions() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('ALL');

  const filtered = transactionHistory.filter(tx => {
    const matchSearch = tx.coin.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'ALL' || tx.type === filter;
    return matchSearch && matchFilter;
  });

  const totalBought = transactionHistory.filter(t => t.type === 'BUY').reduce((s, t) => s + t.total, 0);
  const totalSold = transactionHistory.filter(t => t.type === 'SELL').reduce((s, t) => s + t.total, 0);

  return (
    <div className="p-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Transactions</h1>
          <p className="text-white/40 text-sm mt-0.5">Complete trade history</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs btn-secondary">
          <Download size={12} /> Export CSV
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Trades', value: transactionHistory.length, color: '#ef4444' },
          { label: 'Buy Orders', value: transactionHistory.filter(t => t.type === 'BUY').length, color: '#4ade80' },
          { label: 'Sell Orders', value: transactionHistory.filter(t => t.type === 'SELL').length, color: '#f87171' },
          { label: 'Total Volume', value: `$${(totalBought + totalSold).toFixed(0)}`, color: '#60a5fa' },
        ].map(s => (
          <div key={s.label} className="stat-card text-center">
            <div className="font-display text-2xl font-bold mb-1" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs text-white/40">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by coin..."
            className="input-dark w-full pl-9 pr-4 py-2.5 rounded-xl text-sm" />
        </div>
        <div className="flex gap-2">
          {['ALL', 'BUY', 'SELL'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${filter === f
                ? f === 'SELL' ? 'badge-sell text-red-400' : f === 'BUY' ? 'badge-buy text-green-400' : 'text-white'
                : 'text-white/30 hover:text-white/60'}`}
              style={filter === f && f === 'ALL' ? { background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444' } : {}}>
              {f}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 text-xs text-white/30">
          <Filter size={12} />
          {filtered.length} results
        </div>
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                {['TX ID', 'TYPE', 'COIN', 'QUANTITY', 'PRICE', 'TOTAL', 'DATE', 'STATUS'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs text-white/30 font-semibold tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(tx => (
                <tr key={tx.id} className="table-row-hover" style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <td className="px-5 py-3 font-mono text-xs text-white/30">{tx.id}</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${tx.type === 'BUY' ? 'badge-buy' : 'badge-sell'}`}>
                      {tx.type}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>
                        {tx.coin.slice(0, 1)}
                      </div>
                      <span className="font-mono text-sm font-bold text-white">{tx.coin}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 font-mono text-sm text-white/70">{tx.quantity.toLocaleString()}</td>
                  <td className="px-5 py-3 font-mono text-sm text-white/70">${tx.price.toLocaleString()}</td>
                  <td className="px-5 py-3 font-mono text-sm font-bold text-white">${tx.total.toLocaleString()}</td>
                  <td className="px-5 py-3">
                    <div className="font-mono text-xs text-white/40">{tx.date}</div>
                    <div className="font-mono text-xs text-white/20">{tx.time}</div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle size={12} className="text-green-400" />
                      <span className="text-xs text-green-400 font-semibold">Completed</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-white/30 text-sm">
              No transactions found matching your search.
            </div>
          )}
        </div>
      </div>

      {/* Summary Footer */}
      <div className="mt-4 flex flex-wrap gap-4 text-xs text-white/30">
        <span>Total Bought: <span className="text-green-400 font-mono font-bold">${totalBought.toFixed(2)}</span></span>
        <span>Total Sold: <span className="text-red-400 font-mono font-bold">${totalSold.toFixed(2)}</span></span>
        <span>Net Flow: <span className="text-white font-mono font-bold">${(totalBought - totalSold).toFixed(2)}</span></span>
      </div>
    </div>
  );
}
