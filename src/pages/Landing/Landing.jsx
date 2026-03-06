// Landing.jsx — Hero landing page
import { useNavigate } from 'react-router-dom';
import { ArrowRight, TrendingUp, Shield, Zap, BarChart2, Globe, ChevronRight } from 'lucide-react';

const features = [
  { icon: TrendingUp, title: 'Real-Time Simulation', desc: 'Trade with realistic market dynamics and live-style price feeds' },
  { icon: Shield,    title: 'Risk-Free Learning',   desc: 'Practice strategies without risking real capital' },
  { icon: BarChart2, title: 'Advanced Analytics',   desc: 'Deep portfolio insights, P&L tracking and performance metrics' },
  { icon: Globe,     title: 'Multi-Coin Support',   desc: 'Trade BTC, ETH, SOL, BNB, XRP and more major cryptocurrencies' },
];

const stats = [
  { label: 'Simulated Trades', value: '2.4M+' },
  { label: 'Active Users', value: '18,000+' },
  { label: 'Coins Available', value: '50+' },
  { label: 'Uptime', value: '99.9%' },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen grid-bg noise-bg relative overflow-hidden" style={{ background: '#0a0a0a' }}>
      {/* Glow orbs */}
      <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #ef4444, transparent 70%)' }} />
      <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full opacity-8 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #ef4444, transparent 70%)' }} />

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center red-glow"
            style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}>
            <Zap size={18} className="text-white" />
          </div>
          <div>
            <span className="font-display font-bold text-white text-lg">CRYPTO</span>
            <span className="font-display font-bold text-red-500 text-lg">SIM</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/login')} className="btn-secondary px-5 py-2 rounded-xl text-sm">Login</button>
          <button onClick={() => navigate('/register')} className="btn-primary px-5 py-2 rounded-xl text-sm">Get Started</button>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative z-10 max-w-5xl mx-auto px-8 pt-24 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-8"
          style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444' }}>
          <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          Final Year Project — Crypto Trading Simulator
        </div>

        <h1 className="font-display font-black text-5xl md:text-7xl text-white mb-6 leading-none">
          MASTER
          <br />
          <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>CRYPTO</span>
          <br />
          <span style={{ background: 'linear-gradient(135deg, #ef4444, #ff8080)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            TRADING
          </span>
        </h1>

        <p className="text-lg text-white/50 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
          A professional-grade cryptocurrency trading simulator. Practice real strategies,
          analyze performance, and build expertise — completely risk-free.
        </p>

        <div className="flex items-center justify-center gap-4">
          <button onClick={() => navigate('/register')}
            className="btn-primary flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-bold">
            Start Trading
            <ArrowRight size={18} />
          </button>
          <button onClick={() => navigate('/login')}
            className="btn-secondary flex items-center gap-2 px-8 py-4 rounded-2xl text-base">
            Sign In
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="relative z-10 max-w-4xl mx-auto px-8 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(s => (
            <div key={s.label} className="stat-card text-center">
              <div className="font-display text-2xl font-bold text-white mb-1">{s.value}</div>
              <div className="text-xs text-white/40">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="relative z-10 max-w-5xl mx-auto px-8 pb-20">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold text-white mb-3">Why CryptoSim?</h2>
          <p className="text-white/40 text-sm">Everything you need to become a better trader</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="glass-card-hover p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.15)' }}>
                <Icon size={18} className="text-red-500" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">{title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Footer */}
      <div className="relative z-10 border-t border-white/5 py-12 text-center">
        <p className="text-white/30 text-sm font-mono">
          CryptoSim v1.0 · Final Year Project · Built with React + Tailwind
        </p>
      </div>
    </div>
  );
}
