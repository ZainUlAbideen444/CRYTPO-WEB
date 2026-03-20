import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { RefreshCw, Search, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { marketAPI } from "../../api";

const COLORS = { BTC:"#F7931A", ETH:"#627EEA", SOL:"#9945FF", BNB:"#F3BA2F", XRP:"#00AAE4", ADA:"#0033AD", AVAX:"#E84142", DOT:"#E6007A", DOGE:"#C2A633", LINK:"#2A5ADA" };

export default function Market() {
  const navigate = useNavigate();
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await marketAPI.getAll();
      setCoins(res.data || []);
      setLastUpdated(new Date());
    } catch (e) {
      console.error(e);
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); const iv = setInterval(load, 60000); return () => clearInterval(iv); }, [load]);

  const filtered = coins.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 animate-fade-in-up">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Live Market</h1>
          <p className="text-white/40 text-sm mt-0.5">
            {lastUpdated ? `Updated ${lastUpdated.toLocaleTimeString()}` : "Loading..."}
          </p>
        </div>
        <button onClick={load} disabled={loading} className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs text-white/50 hover:text-white transition-all"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <RefreshCw size={12} className={loading ? "animate-spin" : ""} /> Refresh
        </button>
      </div>

      <div className="relative mb-5">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search coins..."
          className="input-dark w-full pl-9 pr-4 py-2.5 rounded-xl text-sm max-w-sm" />
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-white/5">
              {["#", "Coin", "Price", "24h Change", "Market Cap", "Volume 24h", "Action"].map(h => (
                <th key={h} className="px-5 py-3 text-left text-xs text-white/30 font-semibold tracking-wider">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {filtered.map((c, i) => {
                const pos = c.change24h >= 0;
                const color = COLORS[c.symbol] || "#ef4444";
                return (
                  <tr key={c.id} className="border-b table-row-hover" style={{ borderColor: "rgba(255,255,255,0.03)" }}>
                    <td className="px-5 py-4 text-xs text-white/30 font-mono">{i + 1}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                          style={{ background: `${color}22`, color }}>
                          {c.symbol.slice(0, 1)}
                        </div>
                        <div>
                          <div className="font-mono text-sm font-bold text-white">{c.symbol}</div>
                          <div className="text-xs text-white/30">{c.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 font-mono text-sm font-bold text-white">
                      ${c.price > 1 ? Number(c.price).toLocaleString(undefined, { maximumFractionDigits: 2 }) : Number(c.price).toFixed(5)}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`flex items-center gap-1 text-sm font-bold ${pos ? "price-up" : "price-down"}`}>
                        {pos ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                        {pos ? "+" : ""}{Number(c.change24h).toFixed(2)}%
                      </span>
                    </td>
                    <td className="px-5 py-4 font-mono text-sm text-white/50">
                      ${(c.marketCap / 1e9).toFixed(1)}B
                    </td>
                    <td className="px-5 py-4 font-mono text-sm text-white/50">
                      ${(c.volume24h / 1e9).toFixed(2)}B
                    </td>
                    <td className="px-5 py-4">
                      <button onClick={() => navigate("/trade", { state: { coin: c } })}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold text-white transition-all hover:opacity-80"
                        style={{ background: "linear-gradient(135deg,#ef4444,#dc2626)" }}>
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
    </div>
  );
}