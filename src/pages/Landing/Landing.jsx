import { useNavigate } from "react-router-dom";
import { Zap, TrendingUp, Shield, BarChart2, ArrowRight, Activity } from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0a0a0a" }}>
      <header className="h-14 flex items-center justify-between px-6 border-b"
        style={{ background: "rgba(10,10,10,0.98)", borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center red-glow"
            style={{ background: "linear-gradient(135deg,#ef4444,#dc2626)" }}>
            <Zap size={16} className="text-white" />
          </div>
          <div className="flex items-baseline gap-0.5">
            <span className="font-display text-sm font-bold text-white">CRYPTO</span>
            <span className="font-display text-sm font-bold text-red-500">WEB</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/login")}
            className="text-xs font-semibold text-white/60 hover:text-white px-4 py-2 rounded-lg transition-all"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
            Sign In
          </button>
          <button onClick={() => navigate("/register")}
            className="btn-primary text-xs font-bold px-4 py-2 rounded-lg">
            Get Started
          </button>
        </div>
      </header>

      <main className="flex-1 grid-bg flex flex-col items-center justify-center px-6 py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-8"
            style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#ef4444" }}>
            <Activity size={10} /> Live market data · Real database · No real money
          </div>
          <h1 className="font-display text-5xl font-black text-white mb-6 leading-tight">
            Trade Crypto.<br />
            <span className="text-red-500">Risk-Free.</span>
          </h1>
          <p className="text-white/50 text-lg mb-10 max-w-lg mx-auto">
            Practice real trading strategies with $1,000 virtual funds. Every trade is stored in your account — track your real performance.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => navigate("/register")}
              className="btn-primary px-8 py-3.5 rounded-xl text-sm font-bold flex items-center gap-2">
              Start Trading Free <ArrowRight size={16} />
            </button>
            <button onClick={() => navigate("/login")}
              className="btn-secondary px-8 py-3.5 rounded-xl text-sm font-semibold">
              Sign In
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 max-w-3xl w-full">
          {[
            { icon: TrendingUp, label: "Live Prices",  desc: "Real CoinGecko API data" },
            { icon: Shield,     label: "Real Database", desc: "MongoDB stores all trades" },
            { icon: BarChart2,  label: "Track P&L",    desc: "Win/loss analytics" },
            { icon: Zap,        label: "$1,000 Start",  desc: "Virtual funds, real charts" },
          ].map(f => (
            <div key={f.label} className="glass-card p-4 text-center">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center mx-auto mb-3 red-glow"
                style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
                <f.icon size={14} className="text-red-400" />
              </div>
              <div className="text-sm font-bold text-white">{f.label}</div>
              <div className="text-xs text-white/30 mt-1">{f.desc}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}