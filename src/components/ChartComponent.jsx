// ChartComponent.jsx — Reusable chart wrapper with multiple chart types
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

// Custom Tooltip
const CustomTooltip = ({ active, payload, label, prefix = '$', formatter }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="px-3 py-2 rounded-lg text-xs font-mono"
      style={{ background: '#0f0f0f', border: '1px solid rgba(239,68,68,0.2)', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
      <p className="text-white/50 mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color || '#ef4444' }}>
          {p.name}: {formatter ? formatter(p.value) : `${prefix}${p.value?.toLocaleString()}`}
        </p>
      ))}
    </div>
  );
};

// Portfolio Area Chart
export function PortfolioAreaChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="portfolioGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
        <XAxis dataKey="date" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false}
          tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
        <Tooltip content={<CustomTooltip />} />
        <Area type="monotone" dataKey="value" name="Portfolio Value"
          stroke="#ef4444" strokeWidth={2} fill="url(#portfolioGrad)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

// PnL Bar Chart
export function PnLBarChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
        <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="profit" name="Profit" fill="#4ade80" radius={[3, 3, 0, 0]} />
        <Bar dataKey="loss" name="Loss" fill="#ef4444" radius={[3, 3, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

// Trading Activity Chart
export function TradingActivityChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
        <XAxis dataKey="week" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 9, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip prefix="" formatter={v => v} />} />
        <Bar dataKey="buys" name="Buys" fill="#4ade80" radius={[2, 2, 0, 0]} />
        <Bar dataKey="sells" name="Sells" fill="#ef4444" radius={[2, 2, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

// Portfolio Allocation Pie
export function AllocationPieChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius="55%" outerRadius="80%"
          dataKey="value" paddingAngle={3}>
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.color} stroke="transparent" />
          ))}
        </Pie>
        <Tooltip formatter={(v) => `${v}%`}
          contentStyle={{ background: '#0f0f0f', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 8, fontFamily: 'JetBrains Mono', fontSize: 11 }} />
        <Legend iconType="circle" iconSize={8}
          formatter={(v) => <span style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'JetBrains Mono', fontSize: 11 }}>{v}</span>} />
      </PieChart>
    </ResponsiveContainer>
  );
}

// Profit Line Chart
export function ProfitLineChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#4ade80" stopOpacity={0.2} />
            <stop offset="95%" stopColor="#4ade80" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
        <XAxis dataKey="date" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
        <Tooltip content={<CustomTooltip />} />
        <Area type="monotone" dataKey="profit" name="Cumulative P&L"
          stroke="#4ade80" strokeWidth={2} fill="url(#profitGrad)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
