import { useState } from "react";
import { User, Mail, Lock, Shield, Trash2, CheckCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { authAPI } from "../../api";

export default function Settings() {
  const { user, logout } = useAuth();
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-6 animate-fade-in-up max-w-2xl">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-white">Account Settings</h1>
        <p className="text-white/40 text-sm mt-0.5">Manage your CryptoWeb account</p>
      </div>

      {/* Profile Card */}
      <div className="glass-card p-6 mb-4">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black red-glow"
            style={{ background: "linear-gradient(135deg,#ef4444,#dc2626)" }}>
            {user?.name?.slice(0, 1).toUpperCase()}
          </div>
          <div>
            <div className="text-lg font-bold text-white">{user?.name}</div>
            <div className="text-sm text-white/40 font-mono">{user?.email}</div>
            <div className="text-xs text-green-400 mt-1 font-mono">
              Virtual Balance: ${Number(user?.virtualBalance || 0).toFixed(2)} USDT
            </div>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="text-xs text-white/40 block mb-2 tracking-wider">FULL NAME</label>
            <div className="relative">
              <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input defaultValue={user?.name} className="input-dark w-full pl-9 pr-4 py-3 rounded-xl text-sm" />
            </div>
          </div>
          <div>
            <label className="text-xs text-white/40 block mb-2 tracking-wider">EMAIL ADDRESS</label>
            <div className="relative">
              <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input defaultValue={user?.email} type="email" className="input-dark w-full pl-9 pr-4 py-3 rounded-xl text-sm" readOnly
                style={{ opacity: 0.5, cursor: "not-allowed" }} />
            </div>
            <p className="text-xs text-white/20 mt-1">Email cannot be changed</p>
          </div>

          {saved && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg"
              style={{ background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)" }}>
              <CheckCircle size={14} className="text-green-400" />
              <span className="text-xs text-green-400">Settings saved</span>
            </div>
          )}

          <button type="submit" className="btn-primary px-6 py-2.5 rounded-xl text-sm font-bold">
            Save Changes
          </button>
        </form>
      </div>

      {/* Account Info */}
      <div className="glass-card p-6 mb-4">
        <h2 className="font-semibold text-white text-sm mb-4 flex items-center gap-2">
          <Shield size={14} className="text-red-500" /> Account Info
        </h2>
        <div className="space-y-3">
          {[
            { label: "Account ID",      value: user?.id || "—" },
            { label: "Member Since",    value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—" },
            { label: "Starting Balance", value: "$1,000.00 USDT" },
            { label: "Current Balance", value: `$${Number(user?.virtualBalance || 0).toFixed(2)} USDT` },
          ].map(item => (
            <div key={item.label} className="flex items-center justify-between py-2 border-b border-white/5">
              <span className="text-xs text-white/40">{item.label}</span>
              <span className="text-xs font-mono text-white/70">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="glass-card p-6" style={{ border: "1px solid rgba(239,68,68,0.15)" }}>
        <h2 className="font-semibold text-red-400 text-sm mb-4 flex items-center gap-2">
          <Trash2 size={14} /> Danger Zone
        </h2>
        <p className="text-xs text-white/40 mb-4">Logging out will clear your session. Your account data is safely stored in the database.</p>
        <button onClick={logout}
          className="px-6 py-2.5 rounded-xl text-sm font-bold text-red-400 transition-all hover:bg-red-500/20"
          style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
          Logout
        </button>
      </div>
    </div>
  );
}