import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Settings, LogOut, User, TrendingUp, Wifi, WifiOff } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { marketAPI } from "../../api";

export default function Navbar({ onLogout }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [ticker, setTicker] = useState([]);
  const [online, setOnline] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await marketAPI.getAll();
        setTicker(res.data?.slice(0, 8) || []);
        setOnline(true);
      } catch { setOnline(false); }
    };
    load();
    const iv = setInterval(load, 30000);
    return () => clearInterval(iv);
  }, []);

  return (
    <header className="h-14 flex items-center justify-between px-5 border-b flex-shrink-0"
      style={{ background: "rgba(10,10,10,0.98)", borderColor: "rgba(255,255,255,0.05)" }}>
      <div className="flex-1 overflow-hidden mr-4">
        {ticker.length > 0 ? (
          <div className="flex items-center gap-1 text-xs overflow-hidden">
            <TrendingUp size={12} className="text-red-500 flex-shrink-0 mr-1" />
            <div className="overflow-hidden">
              <div className="flex gap-6 ticker-tape whitespace-nowrap">
                {[...ticker, ...ticker].map((c, i) => (
                  <span key={i} className="flex items-center gap-1">
                    <span className="font-mono font-semibold text-white/50">{c.symbol}</span>
                    <span className="font-mono font-bold" style={{ color: c.change24h >= 0 ? "#4ade80" : "#ef4444" }}>
                      ${c.price > 1 ? Number(c.price).toLocaleString(undefined, { maximumFractionDigits: 2 }) : Number(c.price).toFixed(4)}
                    </span>
                    <span className="font-mono text-white/30 text-xs">
                      {c.change24h >= 0 ? "+" : ""}{c.change24h}%
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <span className="text-xs text-white/20 font-mono">Loading live prices...</span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden md:flex items-center gap-1.5 px-2 py-1 rounded-lg"
          style={{ background: online ? "rgba(74,222,128,0.07)" : "rgba(239,68,68,0.07)" }}>
          {online ? <Wifi size={10} className="text-green-400" /> : <WifiOff size={10} className="text-red-400" />}
          <span className="text-xs font-mono" style={{ color: online ? "#4ade80" : "#ef4444" }}>
            {online ? "LIVE" : "OFFLINE"}
          </span>
        </div>

        {user && (
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-lg"
            style={{ background: "rgba(74,222,128,0.07)", border: "1px solid rgba(74,222,128,0.15)" }}>
            <span className="text-xs text-white/40">Cash</span>
            <span className="text-xs font-mono font-bold text-green-400">
              ${Number(user.virtualBalance || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        )}

        <div className="relative">
          <button onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 px-2 py-1 rounded-lg transition-all hover:bg-white/5">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ background: "linear-gradient(135deg,#ef4444,#dc2626)" }}>
              {user?.name?.slice(0, 1).toUpperCase() || "U"}
            </div>
            <span className="hidden md:block text-xs font-semibold text-white/70 max-w-24 truncate">{user?.name || "User"}</span>
            <ChevronDown size={12} className="text-white/30" />
          </button>
          {profileOpen && (
            <div className="absolute right-0 top-10 w-52 z-50"
              style={{ background: "#111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, boxShadow: "0 20px 40px rgba(0,0,0,0.6)" }}>
              <div className="px-4 py-3 border-b border-white/5">
                <div className="text-xs font-bold text-white truncate">{user?.name}</div>
                <div className="text-xs text-white/40 font-mono truncate">{user?.email}</div>
                <div className="text-xs text-green-400 font-mono mt-1">
                  Cash: ${Number(user?.virtualBalance || 0).toFixed(2)}
                </div>
              </div>
              <div className="py-1">
                <button onClick={() => { navigate("/settings"); setProfileOpen(false); }}
                  className="w-full px-4 py-2 text-left text-xs text-white/60 hover:bg-white/5 flex items-center gap-2">
                  <Settings size={12} /> Account Settings
                </button>
                <button onClick={() => { navigate("/portfolio"); setProfileOpen(false); }}
                  className="w-full px-4 py-2 text-left text-xs text-white/60 hover:bg-white/5 flex items-center gap-2">
                  <User size={12} /> My Portfolio
                </button>
                <div className="border-t border-white/5 mt-1 pt-1">
                  <button onClick={() => { onLogout(); setProfileOpen(false); }}
                    className="w-full px-4 py-2 text-left text-xs text-red-400 hover:bg-red-500/10 flex items-center gap-2">
                    <LogOut size={12} /> Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}