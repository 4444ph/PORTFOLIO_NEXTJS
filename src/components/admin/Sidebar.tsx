'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const menuItems = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: 'dashboard' },
  { name: 'Hero Section', path: '/admin/hero', icon: 'home' },
  { name: 'Projects', path: '/admin/projects', icon: 'rocket_launch' },
  { name: 'Skills', path: '/admin/skills', icon: 'code' },
  { name: 'Experience', path: '/admin/experience', icon: 'work_history' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        className="md:hidden fixed top-2.5 left-6 z-50 pt-2 px-2 bg-slate-800 text-white rounded-xl border border-slate-700"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        <span className="material-symbols-outlined">{isMobileOpen ? 'close' : 'menu'}</span>
      </button>

      {/* Sidebar Container */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-[#0a0510] border-r border-[#2a1b3d] transform transition-transform duration-300 ease-in-out md:translate-x-0
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-[#2a1b3d]">
            <h1 className="text-xl font-bold text-white tracking-widest font-display">
              ADMIN_<span className="text-[#d53f8c]">PANEL</span>
            </h1>
            <p className="text-xs text-slate-500 font-mono mt-1">SYSTEM CONTROLS v1.0</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsMobileOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group relative overflow-hidden
                    ${isActive 
                      ? 'bg-[#2a1b3d]/50 text-white border border-[#d53f8c]/30 shadow-[0_0_15px_rgba(213,63,140,0.2)]' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'}
                  `}
                >
                  <span className={`material-symbols-outlined text-xl ${isActive ? 'text-[#d53f8c]' : 'text-slate-500 group-hover:text-white'}`}>
                    {item.icon}
                  </span>
                  <span className="font-medium tracking-wide">{item.name}</span>
                  
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#d53f8c]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Footer / Logout */}
          <div className="p-4 border-t border-[#2a1b3d]">
            <button 
              onClick={async () => {
                await fetch('/api/auth/logout', { method: 'POST' });
                window.location.href = '/admin/login';
              }}
              className="flex items-center gap-3 w-full px-4 py-3 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
            >
              <span className="material-symbols-outlined">logout</span>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
}
