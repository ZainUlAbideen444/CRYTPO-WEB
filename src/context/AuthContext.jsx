// context/AuthContext.jsx — Global auth state
import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount, try restoring session from token
  useEffect(() => {
    const token = localStorage.getItem('cw_token');
    if (token) {
      authAPI.me()
        .then(res => setUser(res.data))
        .catch(() => localStorage.removeItem('cw_token'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const res = await authAPI.login({ email, password });
    localStorage.setItem('cw_token', res.token);
    setUser(res.data);
    return res;
  };

  const register = async (name, email, password) => {
    const res = await authAPI.register({ name, email, password });
    localStorage.setItem('cw_token', res.token);
    setUser(res.data);
    return res;
  };

  const logout = () => {
    localStorage.removeItem('cw_token');
    setUser(null);
  };

  // Call this after a trade to update balance without full re-login
  const updateBalance = (newBalance) => {
    setUser(prev => prev ? { ...prev, virtualBalance: newBalance } : prev);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateBalance }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
