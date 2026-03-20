import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { TrendingUp, DollarSign, Package, RefreshCw, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { portfolioAPI } from "../../api";
import { useAuth } from "../../context/AuthContext";

const COLORS = { BTC:"#F7931A", ETH:"#627EEA", SOL:"#9945FF", BNB:"#F3BA2F", XRP:"#00AAE4", ADA:"#0033AD", AVAX:"#E84142", DOT:"#E6007A", DOGE:"#C2A633", LINK:"#2A5ADA" };

export default function Portfolio() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await portfolioAPI.getHoldings();
      setData(res);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); const iv = setInterval(load, 60000); return () => clearInterval(iv); }, [load]);

  if (loading) return (
    <div className="flex-1 flex items-center justify-center p-12">
      <div className="w-8 h-8 border-2 border-red-500/30 border-t-red-500 rounded-full animate-spin" />
    </div>
  );

  const holdings = data?.data || [];
  const summary = data?.summary || {};
  const totalValue = (summary.totalValue || 0) + (user?.virtualBalance || 0);

  return (
    <div className="p-6 animate-fade-in-up">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Portfolio</h1>
          <p className="text-white/40 text-sm mt-0.5">Your real holdings — updated live</p>
        </div>
        <button onClick={load} className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs text-white/50 hover:text-white transition-all"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <RefreshCw size={12} /> Refresh
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { icon: DollarSign, label: "Total Account Value", value: `$${Number(totalValue).toFixed(2)}`, color: "#ef4444" },
          { icon: TrendingUp, label: "Holdings Value",      value: `$${Number(summary.totalValue || 0).toFixed(2)}`, color: "#4ade80" },
          { icon: DollarSign, label: "Cash Available",      value: `$${Number(user?.virtualBalance || 0).toFixed(2)}`, color: "#60a5fa" },
          { icon: TrendingUp, label: "Total P&L",           value: `${summary.totalPnL >= 0 ? "+" : ""}$${Number(summary.totalPnL || 0).toFixed(2)}`, color: summary.totalPnL >= 0 ? "#4ade80" : "#ef4444" },
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

      {holdings.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <Package size={40} className="text-white/10 mx-auto mb-4" />
          <h2 className="text-white font-semibold mb-2">No holdings yet</h2>
          <p className="text-white/40 text-sm mb-6">Your portfolio is empty. Start trading to see your assets here.</p>
          <button onClick={() => navigate("/trade")} className="btn-primary px-8 py-3 rounded-xl text-sm font-bold">Start Trading</button>
        </div>
      ) : (
        <div className="glass-card overflow-hidden">
          <div className="px-5 py-4 border-b border-white/5">
            <h2 className="font-semibold text-white text-sm">Holdings ({holdings.length} assets)</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-white/5">
                {["Asset", "Quantity", "Avg Buy Price", "Current Price", "Value", "P&L", "P&L %", ""].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs text-white/30 font-semibold tracking-wider">{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {holdings.map(h => {
                  const isPos = h.pnl >= 0;
                  const color = COLORS[h.coinSymbol] || "#ef4444";
                  return (
                    <tr key={h._id} className="border-b table-row-hover" style={{ borderColor: "rgba(255,255,255,0.03)" }}>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                            style={{ background: `${color}22`, color }}>
                            {h.coinSymbol.slice(0, 1)}
                          </div>
                          <div>
                            <div className="font-mono text-sm font-bold text-white">{h.coinSymbol}</div>
                            <div className="text-xs text-white/30">{h.coinName}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 font-mono text-sm text-white/70">{Number(h.quantity).toFixed(6)}</td>
                      <td className="px-5 py-4 font-mono text-sm text-white/50">${Number(h.averageBuyPrice).toLocaleString(undefined, { maximumFractionDigits: 4 })}</td>
                      <td className="px-5 py-4 font-mono text-sm text-white">${Number(h.currentPrice).toLocaleString(undefined, { maximumFractionDigits: 4 })}</td>
                      <td className="px-5 py-4 font-mono text-sm font-bold text-white">${Number(h.currentValue).toFixed(2)}</td>
                      <td className={`px-5 py-4 font-mono text-sm font-bold ${isPos ? "price-up" : "price-down"}`}>
                        {isPos ? "+" : ""}${Number(h.pnl).toFixed(2)}
                      </td>
                      <td className="px-5 py-4">
                        <span className={`flex items-center gap-0.5 text-xs font-bold px-2 py-0.5 rounded-full ${isPos ? "badge-buy" : "badge-sell"}`}>
                          {isPos ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                          {isPos ? "+" : ""}{h.pnlPercent}%
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <button onClick={() => navigate("/trade", { state: { coin: { id: h.coinId, symbol: h.coinSymbol, name: h.coinName } } })}
                          className="text-xs px-3 py-1 rounded-lg text-red-400 hover:text-red-300 transition-all"
                          style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)" }}>
                          Trade
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}