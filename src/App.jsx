// App.jsx — Root with real auth-protected routing
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Sidebar from './components/Sidebar/Sidebar';
import Navbar  from './components/Navbar/Navbar';
import Landing      from './pages/Landing/Landing';
import Login        from './pages/Login/Login';
import Register     from './pages/Register/Register';
import Dashboard    from './pages/Dashboard/Dashboard';
import Market       from './pages/Market/Market';
import Trade        from './pages/Trade/Trade';
import Portfolio    from './pages/Portfolio/Portfolio';
import Transactions from './pages/Transactions/Transactions';
import Analytics    from './pages/Analytics/Analytics';
import Settings     from './pages/Settings/Settings';

function Protected({ children }) {
  const { user, loading } = useAuth();
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#0a0a0a' }}>
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-red-500/30 border-t-red-500 animate-spin" />
        <span className="text-white/30 text-sm font-mono">Loading CryptoWeb...</span>
      </div>
    </div>
  );
  return user ? children : <Navigate to="/login" replace />;
}

function AppLayout({ children }) {
  const { logout } = useAuth();
  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#0a0a0a' }}>
      <Sidebar onLogout={logout} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar onLogout={logout} />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

const protectedPage = (Page) => (
  <Protected><AppLayout><Page /></AppLayout></Protected>
);

export default function App() {
  const { user } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"            element={user ? <Navigate to="/dashboard" /> : <Landing />} />
        <Route path="/login"       element={user ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register"    element={user ? <Navigate to="/dashboard" /> : <Register />} />
        <Route path="/dashboard"   element={protectedPage(Dashboard)} />
        <Route path="/market"      element={protectedPage(Market)} />
        <Route path="/trade"       element={protectedPage(Trade)} />
        <Route path="/portfolio"   element={protectedPage(Portfolio)} />
        <Route path="/transactions"element={protectedPage(Transactions)} />
        <Route path="/analytics"   element={protectedPage(Analytics)} />
        <Route path="/settings"    element={protectedPage(Settings)} />
        <Route path="*"            element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
