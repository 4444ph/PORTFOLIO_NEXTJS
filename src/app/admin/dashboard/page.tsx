import Link from 'next/link';
import DashboardCharts from '@/components/admin/DashboardCharts';

const quickLinks = [
  { name: 'Projects',     icon: 'rocket_launch', link: '/admin/projects',   color: 'text-blue-500',   bg: 'bg-blue-500/10 border-blue-500/30' },
  { name: 'Skills',       icon: 'code',          link: '/admin/skills',     color: 'text-purple-500', bg: 'bg-purple-500/10 border-purple-500/30' },
  { name: 'Experience',   icon: 'work_history',  link: '/admin/experience', color: 'text-green-500',  bg: 'bg-green-500/10 border-green-500/30' },
  { name: 'Hero Content', icon: 'home',          link: '/admin/hero',       color: 'text-pink-500',   bg: 'bg-pink-500/10 border-pink-500/30' },
];

export default function Dashboard() {
  return (
    <div>
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
        <p className="text-slate-400">Welcome to your portfolio content management system.</p>
      </div>

      {/* ── Quick Navigation Cards ─────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {quickLinks.map((item) => (
          <Link
            key={item.name}
            href={item.link}
            className={`block p-6 rounded-xl border transition-transform transform hover:-translate-y-1 hover:shadow-lg ${item.bg}`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-slate-900/50 ${item.color}`}>
                <span className="material-symbols-outlined text-2xl">{item.icon}</span>
              </div>
              <span className="material-symbols-outlined text-slate-500">arrow_forward</span>
            </div>
            <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider">{item.name}</h3>
            <p className="text-2xl font-bold text-white mt-1">Manage</p>
          </Link>
        ))}
      </div>

      {/* ── Analytics Charts ───────────────────────────────────────── */}
      <DashboardCharts />
    </div>
  );
}
