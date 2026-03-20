import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, TrendingUp, ArrowLeftRight, Briefcase, Clock, BarChart2, ChevronLeft, ChevronRight, Zap, LogOut, Settings } from "lucide-react";

const navItems = [
  { label: "Dashboard",    icon: LayoutDashboard, path: "/dashboard"    },
  { label: "Market",       icon: TrendingUp,       path: "/market"       },
  { label: "Trade",        icon: ArrowLeftRight,   path: "/trade"        },
  { label: "Portfolio",    icon: Briefcase,        path: "/portfolio"    },
  { label: "Transactions", icon: Clock,            path: "/transactions" },
  { label: "Performance",  icon: BarChart2,        path: "/analytics"    },
  { label: "Settings",     icon: Settings,         path: "/settings"     },
];

export default function Sidebar({ onLogout }) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="relative flex flex-col h-screen transition-all duration-300"
      style={{ width: collapsed ? "72px" : "220px", background: "rgba(10,10,10,0.98)", borderRight: "1px solid rgba(255,255,255,0.05)", flexShrink: 0 }}>
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/5">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 red-glow"
          style={{ background: "linear-gradient(135deg,#ef4444,#dc2626)" }}>
          <Zap size={16} className="text-white" />
        </div>
        {!collapsed && (
          <div>
            <div className="font-display text-sm font-bold text-white leading-none">CRYPTO</div>
            <div className="font-display text-xs font-bold text-red-500 leading-none mt-0.5">WEB</div>
          </div>
        )}
      </div>

      <nav className="flex-1 flex flex-col gap-1 px-2 py-4">
        {navItems.map(({ label, icon: Icon, path }) => {
          const active = location.pathname === path;
          return (
            <button key={path} onClick={() => navigate(path)}
              className={`sidebar-link ${active ? "active" : ""} ${collapsed ? "justify-center" : ""}`}
              title={collapsed ? label : ""}>
              <Icon size={18} className="flex-shrink-0" />
              {!collapsed && <span>{label}</span>}
              {active && !collapsed && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-red-500" />}
            </button>
          );
        })}
      </nav>

      <div className="px-2 pb-4 border-t border-white/5 pt-4">
        <button onClick={onLogout} className={`sidebar-link hover:text-red-400 ${collapsed ? "justify-center" : ""}`}>
          <LogOut size={16} className="flex-shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>

      <button onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-16 w-6 h-6 rounded-full flex items-center justify-center z-10 transition-all hover:scale-110"
        style={{ background: "#1a1a1a", border: "1px solid rgba(239,68,68,0.3)", color: "#ef4444" }}>
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </aside>
  );
}