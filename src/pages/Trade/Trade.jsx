import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { ArrowUpRight, ArrowDownRight, Clock, AlertTriangle, CheckCircle, X, AlertCircle, RefreshCw } from "lucide-react";
import { marketAPI, tradeAPI, portfolioAPI } from "../../api";
import { useAuth } from "../../context/AuthContext";

const COLORS = { BTC:"#F7931A", ETH:"#627EEA", SOL:"#9945FF", BNB:"#F3BA2F", XRP:"#00AAE4", ADA:"#0033AD", AVAX:"#E84142", DOT:"#E6007A", DOGE:"#C2A633", LINK:"#2A5ADA" };

export default function Trade() {
  const location = useLocation();
  const { user, updateBalance } = useAuth();
  const [coins, setCoins] = useState([]);
  const [selected, setSelected] = useState(location.state?.coin || null);
  const [side, setSide] = useState("BUY");
  const [amount, setAmount] = useState("");
  const [total, setTotal] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState("");
  const [tradeError, setTradeError] = useState("");
  const [valError, setValError] = useState("");
  const [recentTrades, setRecentTrades] = useState([]);
  const [tradeLoading, setTradeLoading] = useState(false);

  const loadMarket = useCallback(async () => {
    try {
      const res = await marketAPI.getAll();
      const data = res.data || [];
      setCoins(data);
      if (!selected && data.length > 0) setSelected(data[0]);
    } catch (e) { console.error(e); }
  }, [selected]);

  const loadTrades = useCallback(async () => {
    try {
      const res = await portfolioAPI.getTransactions();
      setRecentTrades((res.data || []).slice(0, 6));
    } catch (e) {}
  }, []);

  useEffect(() => { loadMarket(); loadTrades(); const iv = setInterval(loadMarket, 30000); return () => clearInterval(iv); }, []);

  const currentPrice = selected?.price || 0;
  const balance = user?.virtualBalance || 0;

  const handleAmountChange = (v) => {
    setValError(""); setAmount(v);
    if (v && currentPrice) setTotal((parseFloat(v) * currentPrice).toFixed(4));
    else setTotal("");
  };
  const handleTotalChange = (v) => {
    setValError(""); setTotal(v);
    if (v && currentPrice) setAmount((parseFloat(v) / currentPrice).toFixed(8));
    else setAmount("");
  };

  const validate = () => {
    if (!amount || !total || parseFloat(amount) <= 0) { setValError("Enter a valid amount"); return false; }
    if (side === "BUY" && parseFloat(total) > balance) { setValError(`Insufficient cash. Available: $${balance.toFixed(2)}`); return false; }
    return true;
  };

  const confirmTrade = async () => {
    setShowModal(false);
    setTradeLoading(true);
    setTradeError("");
    try {
      const payload = { coinId: selected.id, coinSymbol: selected.symbol, coinName: selected.name, quantity: parseFloat(amount) };
      const res = side === "BUY" ? await tradeAPI.buy(payload) : await tradeAPI.sell(payload);
      updateBalance(res.data.newBalance);
      setSuccess(`${side} executed! ${amount} ${selected.symbol} @ $${Number(currentPrice).toLocaleString()}`);
      setAmount(""); setTotal("");
      loadTrades();
      setTimeout(() => setSuccess(""), 5000);
    } catch (e) {
      setTradeError(e.message || "Trade failed");
    } finally { setTradeLoading(false); }
  };

  const isOverBudget = side === "BUY" && parseFloat(total) > balance;
  const totalNum = parseFloat(total) || 0;

  return (
    <div className="p-6 animate-fade-in-up">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Trade</h1>
          <p className="text-white/40 text-sm mt-0.5">Execute real virtual buy/sell orders</p>
        </div>
        <button onClick={() => { loadMarket(); loadTrades(); }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs text-white/50 hover:text-white transition-all"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <RefreshCw size={12} /> Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
        {/* Coin Selector */}
        <div className="glass-card p-4">
          <h3 className="text-xs text-white/40 mb-3 tracking-wider">SELECT MARKET</h3>
          <div className="space-y-1">
            {coins.map(coin => {
              const active = selected?.id === coin.id;
              const color = COLORS[coin.symbol] || "#ef4444";
              return (
                <button key={coin.id} onClick={() => { setSelected(coin); setAmount(""); setTotal(""); setValError(""); }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all text-left ${active ? "active" : "sidebar-link"}`}
                  style={active ? { background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" } : {}}>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ background: `${color}22`, color }}>
                      {coin.symbol.slice(0, 1)}
                    </div>
                    <span className="font-mono text-xs font-bold">{coin.symbol}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-xs font-bold text-white">
                      ${coin.price > 1 ? Number(coin.price).toLocaleString(undefined,{maximumFractionDigits:2}) : Number(coin.price).toFixed(4)}
                    </div>
                    <div className={`text-xs font-bold ${coin.change24h >= 0 ? "price-up" : "price-down"}`}>
                      {coin.change24h >= 0 ? "+" : ""}{coin.change24h}%
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Price Info + Recent Trades */}
        <div className="xl:col-span-2 space-y-4">
          {selected && (
            <div className="glass-card p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                    style={{ background: `${COLORS[selected.symbol] || "#ef4444"}22`, border: `2px solid ${COLORS[selected.symbol] || "#ef4444"}44`, color: COLORS[selected.symbol] || "#ef4444" }}>
                    {selected.symbol?.slice(0, 1)}
                  </div>
                  <div>
                    <div className="font-mono text-2xl font-black text-white">
                      ${selected.price > 1 ? Number(selected.price).toLocaleString(undefined,{maximumFractionDigits:2}) : Number(selected.price).toFixed(5)}
                    </div>
                    <div className={`flex items-center gap-1 text-sm font-bold ${selected.change24h >= 0 ? "price-up" : "price-down"}`}>
                      {selected.change24h >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                      {selected.change24h >= 0 ? "+" : ""}{selected.change24h}% (24h)
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-white/30">Market Cap</div>
                  <div className="font-mono text-xs font-bold text-white">${(selected.marketCap / 1e9).toFixed(1)}B</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[["HIGH 24H", selected.high24h || selected.price * 1.02], ["LOW 24H", selected.low24h || selected.price * 0.98]].map(([l, v]) => (
                  <div key={l} className="text-center px-2 py-1.5 rounded-lg" style={{ background: "rgba(255,255,255,0.03)" }}>
                    <div className="text-xs text-white/30">{l}</div>
                    <div className="font-mono text-xs font-bold text-white mt-0.5">
                      ${v > 1 ? Number(v).toLocaleString(undefined,{maximumFractionDigits:2}) : Number(v).toFixed(4)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="glass-card p-5">
            <div className="flex items-center gap-2 mb-3">
              <Clock size={14} className="text-white/40" />
              <h3 className="text-sm font-semibold text-white">Your Recent Trades</h3>
            </div>
            {recentTrades.length === 0 ? (
              <p className="text-xs text-white/30 text-center py-4">No trades yet. Place your first order!</p>
            ) : (
              <div className="space-y-1.5">
                {recentTrades.map(tx => (
                  <div key={tx._id} className="flex items-center justify-between py-1.5 px-2 rounded-lg table-row-hover">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${tx.type === "buy" ? "badge-buy" : "badge-sell"}`}>
                        {tx.type.toUpperCase()}
                      </span>
                      <span className="font-mono text-xs text-white/70">{tx.coinSymbol}</span>
                    </div>
                    <span className="font-mono text-xs text-white/50">{Number(tx.quantity).toFixed(6)} @ ${Number(tx.price).toLocaleString()}</span>
                    <span className="font-mono text-xs text-white">${Number(tx.total).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Order Form */}
        <div className="glass-card p-5">
          <h3 className="text-xs text-white/40 mb-4 tracking-wider">PLACE ORDER</h3>

          <div className="flex rounded-lg overflow-hidden mb-4"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
            {["BUY", "SELL"].map(s => (
              <button key={s} onClick={() => { setSide(s); setValError(""); setTradeError(""); }}
                className={`flex-1 py-2.5 text-sm font-bold tracking-wider transition-all ${side === s ? "text-white" : "text-white/30"}`}
                style={side === s ? { background: s === "BUY" ? "linear-gradient(135deg,#16a34a,#15803d)" : "linear-gradient(135deg,#ef4444,#dc2626)", boxShadow: `0 0 20px ${s === "BUY" ? "rgba(22,163,74,0.3)" : "rgba(239,68,68,0.3)"}` } : {}}>
                {s}
              </button>
            ))}
          </div>

          {selected && (
            <div className="flex justify-between items-center mb-4 px-3 py-2 rounded-lg" style={{ background: "rgba(255,255,255,0.03)" }}>
              <span className="text-xs text-white/40">Live Price</span>
              <span className="text-sm font-mono font-bold text-white">
                ${selected.price > 1 ? Number(currentPrice).toLocaleString(undefined,{maximumFractionDigits:2}) : Number(currentPrice).toFixed(5)}
              </span>
            </div>
          )}

          <div className="mb-3">
            <label className="text-xs text-white/40 mb-1.5 block tracking-wider">AMOUNT ({selected?.symbol || "—"})</label>
            <input type="number" value={amount} onChange={e => handleAmountChange(e.target.value)}
              placeholder="0.00000000" min="0" className="input-dark w-full px-3 py-2.5 rounded-lg text-sm font-mono" />
          </div>

          <div className="flex gap-2 mb-3">
            {[25, 50, 75, 100].map(p => (
              <button key={p} onClick={() => { if (balance && currentPrice) handleTotalChange((balance * p / 100).toFixed(4)); }}
                className="flex-1 py-1 text-xs font-semibold rounded-md transition-all hover:bg-red-500/10 hover:text-red-400 text-white/40"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                {p}%
              </button>
            ))}
          </div>

          <div className="mb-2">
            <label className="text-xs text-white/40 mb-1.5 block tracking-wider">TOTAL (USDT)</label>
            <input type="number" value={total} onChange={e => handleTotalChange(e.target.value)}
              placeholder="0.0000" min="0" className="input-dark w-full px-3 py-2.5 rounded-lg text-sm font-mono" />
          </div>

          {side === "BUY" && totalNum > 0 && (
            <div className="mb-3">
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                <div className="h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((totalNum / balance) * 100, 100)}%`, background: isOverBudget ? "#ef4444" : "linear-gradient(90deg,#4ade80,#16a34a)" }} />
              </div>
              <div className="flex justify-between mt-1">
                <span className={`text-xs font-mono ${isOverBudget ? "text-red-400" : "text-white/30"}`}>
                  {((totalNum / balance) * 100).toFixed(1)}% of cash
                </span>
                {isOverBudget && <span className="text-xs text-red-400 font-semibold">Over budget!</span>}
              </div>
            </div>
          )}

          <div className="flex justify-between text-xs mb-4">
            <span className="text-white/30">Cash Available</span>
            <span className={`font-mono font-bold ${isOverBudget ? "text-red-400" : "text-white/60"}`}>
              ${balance.toFixed(2)} USDT
            </span>
          </div>

          {valError && (
            <div className="mb-3 flex items-center gap-2 px-3 py-2 rounded-lg"
              style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
              <AlertTriangle size={12} className="text-red-400 flex-shrink-0" />
              <span className="text-xs text-red-400">{valError}</span>
            </div>
          )}
          {tradeError && (
            <div className="mb-3 flex items-center gap-2 px-3 py-2 rounded-lg"
              style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
              <AlertCircle size={12} className="text-red-400 flex-shrink-0" />
              <span className="text-xs text-red-400">{tradeError}</span>
            </div>
          )}
          {success && (
            <div className="mb-3 flex items-center gap-2 px-3 py-2 rounded-lg"
              style={{ background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)" }}>
              <CheckCircle size={12} className="text-green-400 flex-shrink-0" />
              <span className="text-xs text-green-400">{success}</span>
            </div>
          )}

          <button onClick={() => { if (validate()) setShowModal(true); }} disabled={!selected || tradeLoading}
            className={`w-full py-3 rounded-xl font-bold text-sm tracking-wider transition-all ${!amount || !total || isOverBudget ? "opacity-50 cursor-not-allowed" : ""}`}
            style={side === "BUY"
              ? { background: "linear-gradient(135deg,#16a34a,#15803d)", color: "white" }
              : { background: "linear-gradient(135deg,#ef4444,#dc2626)", color: "white" }}>
            {tradeLoading ? "Processing..." : `${side} ${selected?.symbol || ""}`}
          </button>
        </div>
      </div>

      {/* Confirm Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center modal-overlay" onClick={() => setShowModal(false)}>
          <div className="glass-card p-6 w-80" onClick={e => e.stopPropagation()}
            style={{ border: "1px solid rgba(239,68,68,0.2)", boxShadow: "0 0 40px rgba(239,68,68,0.15)" }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-sm font-bold text-white">Confirm Trade</h3>
              <button onClick={() => setShowModal(false)} className="text-white/40 hover:text-white"><X size={16} /></button>
            </div>
            <div className="space-y-3 mb-5">
              {[
                ["Action",    side,                                    side === "BUY" ? "text-green-400" : "text-red-400"],
                ["Coin",      `${selected?.name} (${selected?.symbol})`, "text-white"],
                ["Amount",    `${parseFloat(amount).toFixed(8)} ${selected?.symbol}`, "text-white font-mono"],
                ["Price",     `$${Number(currentPrice).toLocaleString()}`, "text-white font-mono"],
                ["Total",     `$${parseFloat(total).toFixed(4)} USDT`, "text-yellow-400 font-mono font-bold"],
                ["Remaining", `$${Math.max(0, balance - parseFloat(total)).toFixed(2)} USDT`, "text-white/50 font-mono"],
              ].map(([label, val, cls]) => (
                <div key={label} className="flex justify-between">
                  <span className="text-xs text-white/40">{label}</span>
                  <span className={`text-xs font-semibold ${cls}`}>{val}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 mb-5 px-3 py-2 rounded-lg"
              style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)" }}>
              <AlertCircle size={12} className="text-red-400 flex-shrink-0" />
              <p className="text-xs text-white/50">This is stored in your database. Trade cannot be undone.</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowModal(false)} className="btn-secondary flex-1 py-2.5 rounded-xl text-sm">Cancel</button>
              <button onClick={confirmTrade}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white"
                style={side === "BUY" ? { background: "linear-gradient(135deg,#16a34a,#15803d)" } : { background: "linear-gradient(135deg,#ef4444,#dc2626)" }}>
                Confirm {side}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}