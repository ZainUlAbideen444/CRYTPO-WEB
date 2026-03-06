// Login.jsx — Login page
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Zap, Lock, Mail, ArrowRight } from 'lucide-react';

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) { setError('Please fill in all fields'); return; }
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      if (onLogin) onLogin();
      navigate('/dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-screen grid-bg flex items-center justify-center px-4 relative" style={{ background: '#0a0a0a' }}>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #ef4444, transparent)' }} />

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-4 red-glow"
            style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}>
            <Zap size={22} className="text-white" />
          </div>
          <h1 className="font-display text-2xl font-bold text-white">Welcome Back</h1>
          <p className="text-white/40 text-sm mt-1">Sign in to your trading account</p>
        </div>

        {/* Card */}
        <div className="glass-card p-8" style={{ border: '1px solid rgba(239,68,68,0.1)' }}>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="text-xs text-white/40 block mb-2 tracking-wider">EMAIL ADDRESS</label>
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="trader@example.com"
                  className="input-dark w-full pl-9 pr-4 py-3 rounded-xl text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-xs text-white/40 block mb-2 tracking-wider">PASSWORD</label>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="input-dark w-full pl-9 pr-10 py-3 rounded-xl text-sm"
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                  {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {/* Forgot */}
            <div className="text-right">
              <button type="button" className="text-xs text-red-500 hover:text-red-400">Forgot password?</button>
            </div>

            {/* Error */}
            {error && (
              <div className="px-3 py-2 rounded-lg text-xs text-red-400"
                style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
                {error}
              </div>
            )}

            {/* Submit */}
            <button type="submit" disabled={loading}
              className="btn-primary w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2">
              {loading ? (
                <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              ) : (
                <>Sign In <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          {/* Demo access */}
          <div className="mt-4 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <p className="text-xs text-white/30 text-center mb-2">Demo Credentials</p>
            <div className="flex gap-4 justify-center">
              <span className="font-mono text-xs text-white/40">demo@cryptosim.io</span>
              <span className="font-mono text-xs text-white/40">demo1234</span>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-white/30 mt-6">
          Don't have an account?{' '}
          <button onClick={() => navigate('/register')} className="text-red-500 hover:text-red-400 font-semibold">
            Create one
          </button>
        </p>
      </div>
    </div>
  );
}
