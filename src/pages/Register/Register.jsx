// Register.jsx — Registration page
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Zap, Lock, Mail, User, ArrowRight, CheckCircle } from 'lucide-react';

export default function Register({ onLogin }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '', confirm: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.username) e.username = 'Username required';
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (form.password.length < 6) e.password = 'Minimum 6 characters';
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (onLogin) onLogin();
      navigate('/dashboard');
    }, 1400);
  };

  const strengthChecks = [
    { label: 'At least 6 characters', pass: form.password.length >= 6 },
    { label: 'Contains a number', pass: /\d/.test(form.password) },
    { label: 'Contains uppercase', pass: /[A-Z]/.test(form.password) },
  ];

  const fields = [
    { key: 'username', label: 'USERNAME', placeholder: 'cryptotrader99', type: 'text', icon: User },
    { key: 'email', label: 'EMAIL ADDRESS', placeholder: 'you@example.com', type: 'email', icon: Mail },
  ];

  return (
    <div className="min-h-screen grid-bg flex items-center justify-center px-4 py-8" style={{ background: '#0a0a0a' }}>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-4 red-glow"
            style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}>
            <Zap size={22} className="text-white" />
          </div>
          <h1 className="font-display text-2xl font-bold text-white">Create Account</h1>
          <p className="text-white/40 text-sm mt-1">Start your trading journey today</p>
        </div>

        <div className="glass-card p-8" style={{ border: '1px solid rgba(239,68,68,0.1)' }}>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Text / Email Fields */}
            {fields.map(({ key, label, placeholder, type, icon: Icon }) => (
              <div key={key}>
                <label className="text-xs text-white/40 block mb-2 tracking-wider">{label}</label>
                <div className="relative">
                  <Icon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                  <input
                    type={type}
                    value={form[key]}
                    onChange={e => { setForm({ ...form, [key]: e.target.value }); setErrors({ ...errors, [key]: '' }); }}
                    placeholder={placeholder}
                    className="input-dark w-full pl-9 pr-4 py-3 rounded-xl text-sm"
                  />
                </div>
                {errors[key] && <p className="text-xs text-red-500 mt-1">{errors[key]}</p>}
              </div>
            ))}

            {/* Password */}
            <div>
              <label className="text-xs text-white/40 block mb-2 tracking-wider">PASSWORD</label>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => { setForm({ ...form, password: e.target.value }); setErrors({ ...errors, password: '' }); }}
                  placeholder="••••••••"
                  className="input-dark w-full pl-9 pr-10 py-3 rounded-xl text-sm"
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                  {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}

              {/* Password strength */}
              {form.password && (
                <div className="mt-2 space-y-1">
                  {strengthChecks.map(c => (
                    <div key={c.label} className="flex items-center gap-2">
                      <CheckCircle size={10} className={c.pass ? 'text-green-400' : 'text-white/20'} />
                      <span className={`text-xs ${c.pass ? 'text-green-400' : 'text-white/30'}`}>{c.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-xs text-white/40 block mb-2 tracking-wider">CONFIRM PASSWORD</label>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="password"
                  value={form.confirm}
                  onChange={e => { setForm({ ...form, confirm: e.target.value }); setErrors({ ...errors, confirm: '' }); }}
                  placeholder="••••••••"
                  className="input-dark w-full pl-9 pr-4 py-3 rounded-xl text-sm"
                />
              </div>
              {errors.confirm && <p className="text-xs text-red-500 mt-1">{errors.confirm}</p>}
            </div>

            {/* Starting balance notice */}
            <div className="px-3 py-2 rounded-xl text-xs"
              style={{ background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.12)' }}>
              <span className="text-green-400 font-semibold">🎁 $50,000 USDT</span>
              <span className="text-white/40"> will be credited to your simulator wallet</span>
            </div>

            <button type="submit" disabled={loading}
              className="btn-primary w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2">
              {loading
                ? <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                : <><ArrowRight size={16} /> Create Account</>}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-white/30 mt-6">
          Already have an account?{' '}
          <button onClick={() => navigate('/login')} className="text-red-500 hover:text-red-400 font-semibold">
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}
