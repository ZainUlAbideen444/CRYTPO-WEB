import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { TrendingUp, TrendingDown, DollarSign, Activity, ArrowUpRight, ArrowDownRight, Zap, RefreshCw, Package } from "lucide-react";
import { portfolioAPI } from "../../api";
import { useAuth } from "../../context/AuthContext";

function StatCard({ icon: Icon, label, value, sub, subPositive, iconColor }) {
  return (
    <div className="stat-card">
      <div className="flex items-start justify-between mb-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: `${iconColor}15`, border: `1px solid ${iconColor}25` }}>
          <Icon size={16} style={{ color: iconColor }} />
        </div>
        {sub && (
          <div className={`flex items-center gap-0.5 text-xs font-bold ${subPositive ? "price-up" : "price-down"}`}>
            {subPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            {sub}
          </div>
        )}
      </div>
      <div className="font-mono text-xl font-bold text-white mb-0.5">{value}</div>
      <div className="text-xs text-white/40">{label}</div>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await portfolioAPI.getDashboard();
      setStats(res.data);
    } catch (e) {
      setError("Could not load dashboard. Is the server running?");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  if (loading) return (
    <div className="flex-1 flex items-center justify-center p-12">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-red-500/30 border-t-red-500 rounded-full animate-spin" />
        <span className="text-white/30 text-sm">Loading your dashboard...</span>
      </div>
    </div>
  );

  if (error) return (
    <div className="p-6">
      <div className="glass-card p-8 text-center" style={{ border: "1px solid rgba(239,68,68,0.2)" }}>
        <p className="text-red-400 mb-3">{error}</p>
        <button onClick={load} className="btn-primary px-6 py-2 rounded-xl text-sm">Retry</button>
      </div>
    </div>
  );

  const pnlPositive = (stats?.totalPnL || 0) >= 0;
  const hasHoldings = (stats?.holdingsCount || 0) > 0;

  return (
    <div className="p-6 space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-white/40 text-sm mt-0.5">Welcome back, {user?.name}</p>
        </div>
        <button onClick={load} className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs text-white/50 hover:text-white transition-all"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <RefreshCw size={12} /> Refresh
        </button>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon={DollarSign} label="Total Account Value"
          value={`$${Number(stats?.totalAccountValue || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          sub={`${pnlPositive ? "+" : ""}${Number(stats?.pnlPercent || 0).toFixed(2)}%`}
          subPositive={pnlPositive} iconColor="#ef4444" />
        <StatCard icon={pnlPositive ? TrendingUp : TrendingDown} label="Total P&L"
          value={`${pnlPositive ? "+" : ""}$${Number(Math.abs(stats?.totalPnL || 0)).toFixed(2)}`}
          sub={`${pnlPositive ? "+" : ""}${Number(stats?.pnlPercent || 0).toFixed(2)}%`}
          subPositive={pnlPositive} iconColor={pnlPositive ? "#4ade80" : "#ef4444"} />
        <StatCard icon={Activity} label="Total Trades"
          value={stats?.totalTrades || 0}
          sub={`${stats?.buyCount || 0}B / ${stats?.sellCount || 0}S`}
          subPositive iconColor="#60a5fa" />
        <StatCard icon={Zap} label="Cash Available"
          value={`$${Number(user?.virtualBalance || 0).toFixed(2)}`}
          sub={`${stats?.holdingsCount || 0} assets held`}
          subPositive iconColor="#f59e0b" />
      </div>

      {!hasHoldings ? (
        <div className="glass-card p-12 text-center">
          <Package size={40} className="text-white/10 mx-auto mb-4" />
          <h2 className="text-white font-semibold mb-2">No holdings yet</h2>
          <p className="text-white/40 text-sm mb-6">You have ${Number(user?.virtualBalance || 0).toFixed(2)} ready to invest.</p>
          <button onClick={() => navigate("/trade")} className="btn-primary px-8 py-3 rounded-xl text-sm font-bold">
            Start Trading
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            <div className="xl:col-span-2 glass-card p-5">
              <h2 className="font-semibold text-white text-sm mb-1">Portfolio Value</h2>
              <p className="text-xs text-white/30 mb-4">${Number(stats?.portfolioValue || 0).toFixed(2)} in holdings + ${Number(user?.virtualBalance || 0).toFixed(2)} cash</p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Invested", value: `$${Number(stats?.totalInvested || 0).toFixed(2)}`, color: "#60a5fa" },
                  { label: "Current", value: `$${Number(stats?.portfolioValue || 0).toFixed(2)}`, color: "#4ade80" },
                  { label: "P&L", value: `${pnlPositive ? "+" : ""}$${Number(stats?.totalPnL || 0).toFixed(2)}`, color: pnlPositive ? "#4ade80" : "#ef4444" },
                ].map(m => (
                  <div key={m.label} className="glass-card p-4 text-center">
                    <div className="font-mono text-lg font-bold" style={{ color: m.color }}>{m.value}</div>
                    <div className="text-xs text-white/40 mt-1">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-card p-5">
              <h2 className="font-semibold text-white text-sm mb-4">Top Performers</h2>
              <div className="space-y-3">
                {stats?.bestPerformer && (
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-white/40">Best</div>
                      <div className="font-mono text-sm font-bold text-white">{stats.bestPerformer.symbol}</div>
                    </div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full badge-buy">
                      +{stats.bestPerformer.pnlPct}%
                    </span>
                  </div>
                )}
                {stats?.worstPerformer && stats.worstPerformer.symbol !== stats.bestPerformer?.symbol && (
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-white/40">Worst</div>
                      <div className="font-mono text-sm font-bold text-white">{stats.worstPerformer.symbol}</div>
                    </div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full badge-sell">
                      {stats.worstPerformer.pnlPct}%
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {stats?.recentTransactions?.length > 0 && (
            <div className="glass-card overflow-hidden">
              <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
                <h2 className="font-semibold text-white text-sm">Recent Trades</h2>
                <button onClick={() => navigate("/transactions")} className="text-xs text-red-500 hover:text-red-400">View all</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead><tr className="border-b border-white/5">
                    {["Type", "Coin", "Amount", "Price", "Total", "Date"].map(h => (
                      <th key={h} className="px-5 py-3 text-left text-xs text-white/30 font-semibold tracking-wider">{h}</th>
                    ))}
                  </tr></thead>
                  <tbody>
                    {stats.recentTransactions.map(tx => (
                      <tr key={tx._id} className="border-b table-row-hover" style={{ borderColor: "rgba(255,255,255,0.03)" }}>
                        <td className="px-5 py-3">
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${tx.type === "buy" ? "badge-buy" : "badge-sell"}`}>
                            {tx.type.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-5 py-3 font-mono text-sm font-bold text-white">{tx.coinSymbol}</td>
                        <td className="px-5 py-3 font-mono text-sm text-white/70">{Number(tx.quantity).toFixed(6)}</td>
                        <td className="px-5 py-3 font-mono text-sm text-white/50">${Number(tx.price).toLocaleString()}</td>
                        <td className="px-5 py-3 font-mono text-sm font-bold text-white">${Number(tx.total).toFixed(2)}</td>
                        <td className="px-5 py-3 font-mono text-xs text-white/40">{new Date(tx.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      <div className="glass-card p-5">
        <div className="flex flex-wrap gap-3">
          <button onClick={() => navigate("/trade")} className="btn-primary px-6 py-2.5 rounded-xl text-sm font-bold">Buy / Sell</button>
          <button onClick={() => navigate("/portfolio")} className="btn-secondary px-6 py-2.5 rounded-xl text-sm">View Portfolio</button>
          <button onClick={() => navigate("/analytics")} className="btn-secondary px-6 py-2.5 rounded-xl text-sm">Performance</button>
        </div>
      </div>
    </div>
  );
}