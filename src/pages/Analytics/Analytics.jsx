import { useState, useEffect, useCallback } from "react";
import { TrendingUp, TrendingDown, Activity, Target, CheckCircle, XCircle, Package, RefreshCw } from "lucide-react";
import { portfolioAPI } from "../../api";
import { useAuth } from "../../context/AuthContext";

export default function Analytics() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [portfolio, setPortfolio] = useState(null);
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("overview");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [tx, port, dash] = await Promise.all([
        portfolioAPI.getTransactions(),
        portfolioAPI.getHoldings(),
        portfolioAPI.getDashboard(),
      ]);
      setTransactions(tx.data || []);
      setPortfolio(port);
      setDashboard(dash.data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  if (loading) return (
    <div className="flex-1 flex items-center justify-center p-12">
      <div className="w-8 h-8 border-2 border-red-500/30 border-t-red-500 rounded-full animate-spin" />
    </div>
  );

  // Compute win/loss from sell transactions
  const sells = transactions.filter(t => t.type === "sell");
  const tradeResults = sells.map(sell => {
    const matchBuy = transactions.find(t => t.type === "buy" && t.coinSymbol === sell.coinSymbol && new Date(t.createdAt) < new Date(sell.createdAt));
    const buyPrice = matchBuy ? matchBuy.price : sell.price * 0.97;
    const pnl = (sell.price - buyPrice) * sell.quantity;
    return { ...sell, pnl: parseFloat(pnl.toFixed(4)), isWin: pnl > 0 };
  });

  const wins = tradeResults.filter(t => t.isWin);
  const losses = tradeResults.filter(t => !t.isWin);
  const winRate = tradeResults.length > 0 ? ((wins.length / tradeResults.length) * 100).toFixed(1) : 0;
  const totalPnL = dashboard?.totalPnL || 0;
  const pnlPositive = totalPnL >= 0;

  const summary = portfolio?.summary || {};
  const startBalance = 1000;
  const currentTotal = (summary.totalValue || 0) + (user?.virtualBalance || 0);
  const totalReturn = currentTotal - startBalance;

  if (transactions.length === 0) return (
    <div className="p-6">
      <h1 className="font-display text-2xl font-bold text-white mb-6">Performance</h1>
      <div className="glass-card p-12 text-center">
        <Package size={40} className="text-white/10 mx-auto mb-4" />
        <h2 className="text-white font-semibold mb-2">No data yet</h2>
        <p className="text-white/40 text-sm">Make some trades to see your performance analytics here.</p>
      </div>
    </div>
  );

  return (
    <div className="p-6 animate-fade-in-up">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Performance</h1>
          <p className="text-white/40 text-sm mt-0.5">Based on your real trades</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={load} className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-white/50 hover:text-white transition-all"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <RefreshCw size={12} /> Refresh
          </button>
          <div className="flex rounded-lg overflow-hidden" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
            {["overview", "win/loss"].map(t => (
              <button key={t} onClick={() => setTab(t)}
                className="px-4 py-2 text-xs font-semibold capitalize transition-all"
                style={tab === t ? { background: "linear-gradient(135deg,#ef4444,#dc2626)", color: "white" } : { color: "rgba(255,255,255,0.4)" }}>
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 mb-6">
        {[
          { icon: pnlPositive ? TrendingUp : TrendingDown, label: "Total Return",   value: `${pnlPositive ? "+" : ""}$${Math.abs(totalReturn).toFixed(2)}`, color: pnlPositive ? "#4ade80" : "#ef4444" },
          { icon: Target,    label: "Win Rate",         value: `${winRate}%`,                 color: "#ef4444" },
          { icon: Activity,  label: "Total Trades",     value: transactions.length,            color: "#60a5fa" },
          { icon: Activity,  label: "Buys",             value: transactions.filter(t => t.type === "buy").length, color: "#4ade80" },
          { icon: Activity,  label: "Sells",            value: sells.length,                   color: "#f87171" },
          { icon: TrendingUp,label: "P&L %",            value: `${pnlPositive ? "+" : ""}${Number(summary.pnlPercent || 0).toFixed(2)}%`, color: "#a78bfa" },
        ].map(k => (
          <div key={k.label} className="glass-card p-4 text-center">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center mx-auto mb-2"
              style={{ background: `${k.color}15`, border: `1px solid ${k.color}25` }}>
              <k.icon size={14} style={{ color: k.color }} />
            </div>
            <div className="font-mono text-lg font-bold text-white">{k.value}</div>
            <div className="text-xs text-white/40 mt-0.5">{k.label}</div>
          </div>
        ))}
      </div>

      {tab === "overview" ? (
        <>
          {/* Performance Summary */}
          <div className="glass-card overflow-hidden mb-4">
            <div className="px-5 py-4 border-b border-white/5">
              <h2 className="font-semibold text-white text-sm">Account Breakdown</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
              {[
                { label: "Starting Balance",  value: "$1,000.00",  note: "Virtual funds", color: "text-white" },
                { label: "Current Value",     value: `$${currentTotal.toFixed(2)}`, note: "Holdings + cash", color: pnlPositive ? "price-up" : "price-down" },
                { label: "Holdings Value",    value: `$${Number(summary.totalValue || 0).toFixed(2)}`, note: "Open positions", color: "text-white" },
                { label: "Cash Remaining",    value: `$${Number(user?.virtualBalance || 0).toFixed(2)}`, note: "Available to trade", color: "price-up" },
              ].map(m => (
                <div key={m.label} className="px-5 py-4 text-center">
                  <div className={`font-mono text-lg font-bold mb-1 ${m.color}`}>{m.value}</div>
                  <div className="text-xs text-white/40">{m.label}</div>
                  <div className="text-xs text-white/20 mt-0.5">{m.note}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Trade Volume */}
          <div className="glass-card p-5">
            <h2 className="font-semibold text-white text-sm mb-4">Trade Summary by Coin</h2>
            <div className="space-y-2">
              {[...new Set(transactions.map(t => t.coinSymbol))].map(symbol => {
                const coinTxs = transactions.filter(t => t.coinSymbol === symbol);
                const bought = coinTxs.filter(t => t.type === "buy").reduce((s, t) => s + t.total, 0);
                const sold = coinTxs.filter(t => t.type === "sell").reduce((s, t) => s + t.total, 0);
                return (
                  <div key={symbol} className="flex items-center justify-between px-4 py-3 rounded-xl"
                    style={{ background: "rgba(255,255,255,0.03)" }}>
                    <span className="font-mono text-sm font-bold text-white">{symbol}</span>
                    <div className="flex items-center gap-4 text-xs font-mono">
                      <span className="text-green-400">Bought: ${bought.toFixed(2)}</span>
                      <span className="text-red-400">Sold: ${sold.toFixed(2)}</span>
                      <span className="text-white/40">{coinTxs.length} trades</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        /* Win/Loss Tab */
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              { icon: CheckCircle, label: "Winning Trades", count: wins.length, sub: `+$${wins.reduce((s,t)=>s+t.pnl,0).toFixed(2)} profit`, color: "#4ade80", bg: "rgba(74,222,128,0.04)", border: "rgba(74,222,128,0.15)", cls: "text-green-400" },
              { icon: XCircle,     label: "Losing Trades",  count: losses.length, sub: `$${losses.reduce((s,t)=>s+t.pnl,0).toFixed(2)} loss`, color: "#ef4444", bg: "rgba(239,68,68,0.04)", border: "rgba(239,68,68,0.15)", cls: "text-red-400" },
              { icon: Target,      label: "Win Rate",        count: `${winRate}%`, sub: `${wins.length} of ${tradeResults.length} closed`, color: "#60a5fa", bg: "rgba(96,165,250,0.04)", border: "rgba(96,165,250,0.15)", cls: "text-blue-400" },
            ].map(c => (
              <div key={c.label} className="glass-card p-5 text-center"
                style={{ border: `1px solid ${c.border}`, background: c.bg }}>
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center mx-auto mb-3"
                  style={{ background: `${c.color}12` }}>
                  <c.icon size={20} style={{ color: c.color }} />
                </div>
                <div className={`font-mono text-3xl font-black mb-1 ${c.cls}`}>{c.count}</div>
                <div className="text-sm font-semibold text-white/60">{c.label}</div>
                <div className={`text-xs mt-1 ${c.cls} opacity-70`}>{c.sub}</div>
              </div>
            ))}
          </div>

          {tradeResults.length > 0 && (
            <>
              <div className="glass-card p-5 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-semibold text-white text-sm">Win / Loss Ratio</h2>
                  <span className="text-xs font-mono text-white/40">{wins.length}W · {losses.length}L</span>
                </div>
                <div className="h-3 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <div className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${winRate}%`, background: "linear-gradient(90deg,#4ade80,#16a34a)", boxShadow: "0 0 12px rgba(74,222,128,0.4)" }} />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-green-400 font-mono">{winRate}% wins</span>
                  <span className="text-xs text-red-400 font-mono">{(100 - parseFloat(winRate)).toFixed(1)}% losses</span>
                </div>
              </div>

              <div className="glass-card overflow-hidden">
                <div className="px-5 py-4 border-b border-white/5">
                  <h2 className="font-semibold text-white text-sm">Closed Trade Results ({tradeResults.length})</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead><tr className="border-b border-white/5">
                      {["Result", "Coin", "Qty Sold", "Sell Price", "P&L", "Date"].map(h => (
                        <th key={h} className="px-5 py-3 text-left text-xs text-white/30 font-semibold tracking-wider">{h}</th>
                      ))}
                    </tr></thead>
                    <tbody>
                      {tradeResults.map(t => (
                        <tr key={t._id} className="border-b table-row-hover" style={{ borderColor: "rgba(255,255,255,0.03)" }}>
                          <td className="px-5 py-3">
                            <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${t.isWin ? "badge-buy" : "badge-sell"}`}>
                              {t.isWin ? <CheckCircle size={10} /> : <XCircle size={10} />}
                              {t.isWin ? "WIN" : "LOSS"}
                            </span>
                          </td>
                          <td className="px-5 py-3 font-mono text-sm font-bold text-white">{t.coinSymbol}</td>
                          <td className="px-5 py-3 font-mono text-sm text-white/70">{Number(t.quantity).toFixed(6)}</td>
                          <td className="px-5 py-3 font-mono text-sm text-white/70">${Number(t.price).toLocaleString()}</td>
                          <td className={`px-5 py-3 font-mono text-sm font-bold ${t.isWin ? "price-up" : "price-down"}`}>
                            {t.isWin ? "+" : ""}${t.pnl.toFixed(4)}
                          </td>
                          <td className="px-5 py-3 font-mono text-xs text-white/40">{new Date(t.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}