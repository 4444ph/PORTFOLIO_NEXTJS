import Link from 'next/link';

export default function Dashboard() {
  const stats = [
    { name: 'Projects', value: 'Manage', icon: 'rocket_launch', link: '/admin/projects', color: 'text-blue-500', bg: 'bg-blue-500/10 border-blue-500/30' },
    { name: 'Skills', value: 'Configure', icon: 'code', link: '/admin/skills', color: 'text-purple-500', bg: 'bg-purple-500/10 border-purple-500/30' },
    { name: 'Experience', value: 'Update', icon: 'work_history', link: '/admin/experience', color: 'text-green-500', bg: 'bg-green-500/10 border-green-500/30' },
    { name: 'Hero Content', value: 'Edit', icon: 'home', link: '/admin/hero', color: 'text-pink-500', bg: 'bg-pink-500/10 border-pink-500/30' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
        <p className="text-slate-400">Welcome to your portfolio content management system.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Link 
            key={stat.name} 
            href={stat.link}
            className={`block p-6 rounded-xl border transition-transform transform hover:-translate-y-1 hover:shadow-lg ${stat.bg}`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-slate-900/50 ${stat.color}`}>
                <span className="material-symbols-outlined text-2xl">{stat.icon}</span>
              </div>
              <span className="material-symbols-outlined text-slate-500">arrow_forward</span>
            </div>
            <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider">{stat.name}</h3>
            <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
          </Link>
        ))}
      </div>

      <div className="mt-12 bg-slate-800 rounded-xl p-8 border border-slate-700">
        <h2 className="text-xl font-bold text-white mb-4">Quick Tips</h2>
        <ul className="space-y-3 text-slate-400">
          <li className="flex items-start gap-3">
            <span className="material-symbols-outlined text-yellow-500 mt-0.5">lightbulb</span>
            <span>Update your **Hero Section** first to set the main landing message.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="material-symbols-outlined text-blue-500 mt-0.5">info</span>
            <span>Projects with high **Order** numbers appear later in the list.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="material-symbols-outlined text-green-500 mt-0.5">check_circle</span>
            <span>Use consistent image dimensions for project thumbnails for best results.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
