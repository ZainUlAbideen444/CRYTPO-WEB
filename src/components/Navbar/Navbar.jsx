// Navbar.jsx — Top Navigation Bar
import { useState } from 'react';
import { Bell, User, ChevronDown, Search, Settings, LogOut, TrendingUp } from 'lucide-react';
import { userProfile, marketSentiment, topMovers } from '../../data/mockData';

export default function Navbar({ onLogout }) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const notifications = [
    { id: 1, msg: 'BTC surged 2.34% in the last hour', time: '2m ago', type: 'up' },
    { id: 2, msg: 'Trade executed: Bought 0.15 BTC', time: '1h ago', type: 'trade' },
    { id: 3, msg: 'Portfolio value reached $70,000', time: '3h ago', type: 'milestone' },
  ];

  return (
    <header className="h-14 flex items-center justify-between px-5 border-b"
      style={{ background: 'rgba(10,10,10,0.98)', borderColor: 'rgba(255,255,255,0.05)', flexShrink: 0 }}>

      {/* Ticker Tape */}
      <div className="flex-1 overflow-hidden mr-4">
        <div className="flex items-center gap-1 text-xs overflow-hidden">
          <TrendingUp size={12} className="text-red-500 flex-shrink-0 mr-1" />
          <div className="overflow-hidden">
            <div className="flex gap-6 ticker-tape whitespace-nowrap">
              {[...topMovers, ...topMovers].map((m, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  <span className="font-mono font-semibold text-white/60">{m.symbol}</span>
                  <span className="font-mono font-bold" style={{ color: m.change >= 0 ? '#4ade80' : '#ef4444' }}>
                    {m.change >= 0 ? '+' : ''}{m.change}%
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {/* Fear & Greed */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-lg mr-2"
          style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
          <div className="text-xs text-white/50">Sentiment</div>
          <div className="text-xs font-bold font-mono text-yellow-400">{marketSentiment.label} {marketSentiment.value}</div>
        </div>

        {/* Balance Badge */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-lg"
          style={{ background: 'rgba(74,222,128,0.07)', border: '1px solid rgba(74,222,128,0.15)' }}>
          <span className="text-xs text-white/40">Balance</span>
          <span className="text-xs font-mono font-bold text-green-400">
            ${userProfile.balance.toLocaleString()}
          </span>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
            className="relative w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:bg-white/5">
            <Bell size={16} className="text-white/60" />
            {userProfile.notifications > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-10 w-72 z-50 animate-fade-in-up"
              style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, boxShadow: '0 20px 40px rgba(0,0,0,0.6)' }}>
              <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
                <span className="text-sm font-semibold text-white">Notifications</span>
                <span className="text-xs text-red-500 badge-sell px-2 py-0.5 rounded-full">{notifications.length} new</span>
              </div>
              {notifications.map(n => (
                <div key={n.id} className="px-4 py-3 border-b border-white/5 hover:bg-white/3 cursor-pointer">
                  <p className="text-xs text-white/80">{n.msg}</p>
                  <p className="text-xs text-white/30 mt-1 font-mono">{n.time}</p>
                </div>
              ))}
              <div className="px-4 py-2">
                <button className="text-xs text-red-500 hover:text-red-400 w-full text-center">Clear all</button>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
            className="flex items-center gap-2 px-2 py-1 rounded-lg transition-all hover:bg-white/5">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}>
              {userProfile.username.slice(0, 1).toUpperCase()}
            </div>
            <span className="hidden md:block text-xs font-semibold text-white/70">{userProfile.username}</span>
            <ChevronDown size={12} className="text-white/30" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-10 w-48 z-50 animate-fade-in-up"
              style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, boxShadow: '0 20px 40px rgba(0,0,0,0.6)' }}>
              <div className="px-4 py-3 border-b border-white/5">
                <div className="text-xs font-bold text-white">{userProfile.username}</div>
                <div className="text-xs text-white/40 font-mono">{userProfile.email}</div>
                <div className="text-xs text-red-400 mt-1">{userProfile.tier}</div>
              </div>
              <div className="py-1">
                <button className="w-full px-4 py-2 text-left text-xs text-white/60 hover:bg-white/5 flex items-center gap-2">
                  <User size={12} /> Profile
                </button>
                <button className="w-full px-4 py-2 text-left text-xs text-white/60 hover:bg-white/5 flex items-center gap-2">
                  <Settings size={12} /> Settings
                </button>
                <button onClick={onLogout}
                  className="w-full px-4 py-2 text-left text-xs text-red-400 hover:bg-red-500/10 flex items-center gap-2">
                  <LogOut size={12} /> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
