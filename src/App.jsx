// App.jsx — Root component with routing
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layout
import Sidebar from './components/Sidebar/Sidebar';
import Navbar from './components/Navbar/Navbar';

// Pages
import Landing from './pages/Landing/Landing';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import Market from './pages/Market/Market';
import Trade from './pages/Trade/Trade';
import Portfolio from './pages/Portfolio/Portfolio';
import Transactions from './pages/Transactions/Transactions';
import Analytics from './pages/Analytics/Analytics';

// Authenticated layout wrapper
function AppLayout({ children, onLogout }) {
  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#0a0a0a' }}>
      <Sidebar onLogout={onLogout} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar onLogout={onLogout} />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register onLogin={handleLogin} />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={
          isLoggedIn
            ? <AppLayout onLogout={handleLogout}><Dashboard /></AppLayout>
            : <Navigate to="/login" />
        } />
        <Route path="/market" element={
          isLoggedIn
            ? <AppLayout onLogout={handleLogout}><Market /></AppLayout>
            : <Navigate to="/login" />
        } />
        <Route path="/trade" element={
          isLoggedIn
            ? <AppLayout onLogout={handleLogout}><Trade /></AppLayout>
            : <Navigate to="/login" />
        } />
        <Route path="/portfolio" element={
          isLoggedIn
            ? <AppLayout onLogout={handleLogout}><Portfolio /></AppLayout>
            : <Navigate to="/login" />
        } />
        <Route path="/transactions" element={
          isLoggedIn
            ? <AppLayout onLogout={handleLogout}><Transactions /></AppLayout>
            : <Navigate to="/login" />
        } />
        <Route path="/analytics" element={
          isLoggedIn
            ? <AppLayout onLogout={handleLogout}><Analytics /></AppLayout>
            : <Navigate to="/login" />
        } />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
