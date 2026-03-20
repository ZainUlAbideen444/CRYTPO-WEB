import { useState, useEffect, useCallback } from "react";
import { Clock, RefreshCw, ArrowUpRight, ArrowDownRight, Package } from "lucide-react";
import { portfolioAPI } from "../../api";

export default function Transactions() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const load = useCallback(async (p = 1) => {
    setLoading(true);
    try {
      const res = await portfolioAPI.getTransactions(p);
      setData(res.data || []);
      setTotal(res.total || 0);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(page); }, [load, page]);

  return (
    <div className="p-6 animate-fade-in-up">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Transactions</h1>
          <p className="text-white/40 text-sm mt-0.5">Your complete trade history — {total} trades total</p>
        </div>
        <button onClick={() => load(page)} className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs text-white/50 hover:text-white transition-all"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <RefreshCw size={12} /> Refresh
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-red-500/30 border-t-red-500 rounded-full animate-spin" />
        </div>
      ) : data.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <Package size={40} className="text-white/10 mx-auto mb-4" />
          <h2 className="text-white font-semibold mb-2">No transactions yet</h2>
          <p className="text-white/40 text-sm">Your trades will appear here after you buy or sell.</p>
        </div>
      ) : (
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-white/5">
                {["Type", "Coin", "Quantity", "Price", "Total", "Balance After", "Date & Time"].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs text-white/30 font-semibold tracking-wider">{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {data.map(tx => (
                  <tr key={tx._id} className="border-b table-row-hover" style={{ borderColor: "rgba(255,255,255,0.03)" }}>
                    <td className="px-5 py-4">
                      <span className={`flex items-center gap-1 w-fit text-xs font-bold px-2 py-0.5 rounded-full ${tx.type === "buy" ? "badge-buy" : "badge-sell"}`}>
                        {tx.type === "buy" ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                        {tx.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="font-mono text-sm font-bold text-white">{tx.coinSymbol}</div>
                      <div className="text-xs text-white/30">{tx.coinName}</div>
                    </td>
                    <td className="px-5 py-4 font-mono text-sm text-white/70">{Number(tx.quantity).toFixed(8)}</td>
                    <td className="px-5 py-4 font-mono text-sm text-white/50">
                      ${Number(tx.price).toLocaleString(undefined, { maximumFractionDigits: 4 })}
                    </td>
                    <td className="px-5 py-4 font-mono text-sm font-bold text-white">${Number(tx.total).toFixed(4)}</td>
                    <td className="px-5 py-4 font-mono text-sm text-white/50">${Number(tx.balanceAfter).toFixed(2)}</td>
                    <td className="px-5 py-4 font-mono text-xs text-white/40">
                      {new Date(tx.createdAt).toLocaleDateString()}{" "}
                      <span className="text-white/20">{new Date(tx.createdAt).toLocaleTimeString()}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}