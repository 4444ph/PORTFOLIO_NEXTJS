'use client';

import { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
  BarChart, Bar,
} from 'recharts';

interface DashboardStats {
  projects: number;
  skills: number;
  experience: number;
  totalVisitors: number;
}

interface VisitorStats {
  totalVisitors: number;
  visitorsToday: number;
  last7Days: { date: string; count: number }[];
}

const PIE_COLORS = ['#818cf8', '#34d399', '#f472b6'];

function SkeletonBox({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-xl bg-slate-700/40 ${className}`} />
  );
}

// Custom tooltip for charts
function CustomTooltip({ active, payload, label }: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 shadow-xl text-sm">
        <p className="text-slate-400 mb-1">{label}</p>
        <p className="text-white font-bold">{payload[0].value} visitors</p>
      </div>
    );
  }
  return null;
}

export default function DashboardCharts() {
  const [dashStats, setDashStats] = useState<DashboardStats | null>(null);
  const [visitorStats, setVisitorStats] = useState<VisitorStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/dashboard/stats').then(r => r.json()),
      fetch('/api/visitors/stats').then(r => r.json()),
    ])
      .then(([dash, visitors]) => {
        setDashStats(dash);
        setVisitorStats(visitors);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Content breakdown data for Pie + Bar charts
  const contentData = dashStats ? [
    { name: 'Projects',   value: dashStats.projects,   color: PIE_COLORS[0] },
    { name: 'Skills',     value: dashStats.skills,     color: PIE_COLORS[1] },
    { name: 'Experience', value: dashStats.experience, color: PIE_COLORS[2] },
  ] : [];

  // KPI Cards
  const kpiCards = [
    {
      label: 'Total Visitors',
      value: loading ? '—' : (dashStats?.totalVisitors ?? 0).toLocaleString(),
      icon: 'groups',
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10 border-indigo-500/30',
      glow: 'shadow-indigo-500/10',
    },
    {
      label: 'Today\'s Visitors',
      value: loading ? '—' : (visitorStats?.visitorsToday ?? 0).toLocaleString(),
      icon: 'today',
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10 border-cyan-500/30',
      glow: 'shadow-cyan-500/10',
    },
    {
      label: 'Projects',
      value: loading ? '—' : (dashStats?.projects ?? 0).toString(),
      icon: 'rocket_launch',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/30',
      glow: 'shadow-blue-500/10',
    },
    {
      label: 'Skills',
      value: loading ? '—' : (dashStats?.skills ?? 0).toString(),
      icon: 'code',
      color: 'text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/30',
      glow: 'shadow-purple-500/10',
    },
    {
      label: 'Experience',
      value: loading ? '—' : (dashStats?.experience ?? 0).toString(),
      icon: 'work_history',
      color: 'text-green-400',
      bg: 'bg-green-500/10 border-green-500/30',
      glow: 'shadow-green-500/10',
    },
  ];

  return (
    <div className="space-y-8">

      {/* ── KPI STAT CARDS ───────────────────────────────────────── */}
      <div>
        <h2 className="text-lg font-semibold text-slate-300 mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-indigo-400 text-xl">analytics</span>
          Live Stats
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {kpiCards.map((card) => (
            <div
              key={card.label}
              className={`rounded-xl border p-4 shadow-lg ${card.bg} ${card.glow} transition-transform hover:-translate-y-0.5`}
            >
              <div className={`material-symbols-outlined text-2xl mb-2 ${card.color}`}>{card.icon}</div>
              <p className="text-slate-400 text-xs uppercase tracking-wider font-medium">{card.label}</p>
              {loading ? (
                <SkeletonBox className="h-7 w-16 mt-1" />
              ) : (
                <p className="text-2xl font-bold text-white mt-1">{card.value}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── LINE CHART: Daily Visitors ────────────────────────────── */}
      <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-white mb-1 flex items-center gap-2">
          <span className="material-symbols-outlined text-cyan-400 text-xl">show_chart</span>
          Unique Visitors — Last 7 Days
        </h2>
        <p className="text-slate-500 text-xs mb-5">One unique visit per IP address per day</p>
        {loading ? (
          <SkeletonBox className="h-52 w-full" />
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={visitorStats?.last7Days ?? []} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#22d3ee" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="date" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis allowDecimals={false} tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#475569', strokeWidth: 1, strokeDasharray: '4 4' }} />
              <Line
                type="monotone"
                dataKey="count"
                stroke="url(#lineGrad)"
                strokeWidth={2.5}
                dot={{ fill: '#818cf8', r: 4, strokeWidth: 0 }}
                activeDot={{ r: 6, fill: '#22d3ee', strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* ── PIE + BAR CHARTS side by side ────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Donut / Pie Chart */}
        <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-1 flex items-center gap-2">
            <span className="material-symbols-outlined text-pink-400 text-xl">donut_large</span>
            Content Distribution
          </h2>
          <p className="text-slate-500 text-xs mb-4">Breakdown of portfolio content types</p>
          {loading ? (
            <SkeletonBox className="h-52 w-full" />
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={contentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                  stroke="none"
                >
                  {contentData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Legend
                  iconType="circle"
                  iconSize={8}
                  formatter={(value) => <span style={{ color: '#94a3b8', fontSize: 12 }}>{value}</span>}
                />
                <Tooltip
                  formatter={(value, name) => [value, name]}
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: 8, fontSize: 12 }}
                  labelStyle={{ color: '#94a3b8' }}
                  itemStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Bar Chart */}
        <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-1 flex items-center gap-2">
            <span className="material-symbols-outlined text-green-400 text-xl">bar_chart</span>
            Content Overview
          </h2>
          <p className="text-slate-500 text-xs mb-4">Total items per content category</p>
          {loading ? (
            <SkeletonBox className="h-52 w-full" />
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={contentData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={true} vertical={false} />
                <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis allowDecimals={false} tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip
                  formatter={(value, name) => [value, name]}
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: 8, fontSize: 12 }}
                  labelStyle={{ color: '#94a3b8' }}
                  itemStyle={{ color: '#fff' }}
                  cursor={{ fill: 'rgba(255,255,255,0.04)' }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={56}>
                  {contentData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}
