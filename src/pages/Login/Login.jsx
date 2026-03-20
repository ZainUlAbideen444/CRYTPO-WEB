import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Zap, Lock, Mail, ArrowRight, TrendingUp, Shield } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password) { setError("Please fill in all fields"); return; }
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0a0a0a" }}>
      <header className="h-14 flex items-center justify-between px-6 border-b flex-shrink-0"
        style={{ background: "rgba(10,10,10,0.98)", borderColor: "rgba(255,255,255,0.06)", position: "sticky", top: 0, zIndex: 50 }}>
        <button onClick={() => navigate("/")} className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center red-glow"
            style={{ background: "linear-gradient(135deg,#ef4444,#dc2626)" }}>
            <Zap size={16} className="text-white" />
          </div>
          <div className="flex items-baseline gap-0.5">
            <span className="font-display text-sm font-bold text-white">CRYPTO</span>
            <span className="font-display text-sm font-bold text-red-500">WEB</span>
          </div>
        </button>
        <nav className="hidden md:flex items-center gap-6">
          {[{ label: "Markets", icon: TrendingUp }, { label: "Secure", icon: Shield }].map(({ label, icon: Icon }) => (
            <span key={label} className="flex items-center gap-1.5 text-xs text-white/40"><Icon size={12} />{label}</span>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-red-500 px-3 py-1.5 rounded-lg"
            style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>Sign In</span>
          <button onClick={() => navigate("/register")}
            className="text-xs font-semibold text-white/60 hover:text-white px-3 py-1.5 rounded-lg transition-all"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>Register</button>
        </div>
      </header>

      <div className="flex-1 grid-bg flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-4 red-glow"
              style={{ background: "linear-gradient(135deg,#ef4444,#dc2626)" }}>
              <Zap size={22} className="text-white" />
            </div>
            <h1 className="font-display text-2xl font-bold text-white">Welcome Back</h1>
            <p className="text-white/40 text-sm mt-1">Sign in to your CryptoWeb account</p>
          </div>

          <div className="glass-card p-8" style={{ border: "1px solid rgba(239,68,68,0.1)" }}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-xs text-white/40 block mb-2 tracking-wider">EMAIL ADDRESS</label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                  <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="your@email.com" className="input-dark w-full pl-9 pr-4 py-3 rounded-xl text-sm" />
                </div>
              </div>
              <div>
                <label className="text-xs text-white/40 block mb-2 tracking-wider">PASSWORD</label>
                <div className="relative">
                  <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                  <input type={showPass ? "text" : "password"} value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    placeholder="••••••••" className="input-dark w-full pl-9 pr-10 py-3 rounded-xl text-sm" />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                    {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
              {error && (
                <div className="px-3 py-2 rounded-lg text-xs text-red-400"
                  style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>{error}</div>
              )}
              <button type="submit" disabled={loading}
                className="btn-primary w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2">
                {loading ? <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  : <>Sign In <ArrowRight size={16} /></>}
              </button>
            </form>
          </div>

          <p className="text-center text-sm text-white/30 mt-6">
            No account?{" "}
            <button onClick={() => navigate("/register")} className="text-red-500 hover:text-red-400 font-semibold">Create one</button>
          </p>
        </div>
      </div>
    </div>
  );
}