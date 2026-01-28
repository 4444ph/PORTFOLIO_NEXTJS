'use client';

import { useEffect, useState } from 'react';
import Notification from '@/components/admin/Notification';

interface Experience {
  _id?: string;
  title: string;
  company: string;
  period: string;
  description?: string;
  borderColor: string;
  order: number;
}

export default function ExperienceAdmin() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [formData, setFormData] = useState<Experience>({
    title: '',
    company: '',
    period: '',
    description: '',
    borderColor: 'primary',
    order: 0,
  });
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const response = await fetch('/api/admin/experience');
      const data = await response.json();
      setExperiences(data);
    } catch (error) {
      console.error('Error fetching experiences:', error);
      setNotification({ message: 'Failed to load experiences', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const method = editingExperience ? 'PUT' : 'POST';
      const response = await fetch('/api/admin/experience', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setNotification({ message: `Experience ${editingExperience ? 'updated' : 'created'} successfully!`, type: 'success' });
        fetchExperiences();
        resetForm();
      } else {
        setNotification({ message: 'Failed to save experience', type: 'error' });
      }
    } catch (error) {
      console.error('Error saving experience:', error);
      setNotification({ message: 'An error occurred while saving', type: 'error' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this experience?')) return;

    try {
      const response = await fetch(`/api/admin/experience?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setNotification({ message: 'Experience deleted successfully!', type: 'success' });
        fetchExperiences();
      } else {
        setNotification({ message: 'Failed to delete experience', type: 'error' });
      }
    } catch (error) {
      console.error('Error deleting experience:', error);
      setNotification({ message: 'An error occurred while deleting', type: 'error' });
    }
  };

  const handleEdit = (experience: Experience) => {
    setEditingExperience(experience);
    setFormData(experience);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      company: '',
      period: '',
      description: '',
      borderColor: 'primary',
      order: 0,
    });
    setEditingExperience(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className='max-w-6xl mx-auto'>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      {/* --- HEADER SECTION --- */}
      <div className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-white mb-1 tracking-tight">
            EXPERIENCE_<span className="text-neon-pink">LOGS</span>
          </h1>
          <p className="text-slate-400 font-mono text-xs md:text-sm">
            cat /var/log/career/history.log
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className={`
            w-full sm:w-auto px-6 py-2.5 
            text-sm font-display font-bold tracking-widest
            relative overflow-hidden rounded-md border-2 
            transition-all duration-300
            ${showForm 
              ? 'border-gray-500 text-gray-400 hover:bg-gray-800' 
              : 'border-neon-pink text-white shadow-[0_0_15px_rgba(255,0,255,0.2)] hover:shadow-[0_0_25px_rgba(255,0,255,0.4)]'}`}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {showForm ? 'TERMINATE_INPUT' : 'ADD_NEW_ENTRY'}
            <span className="material-symbols-outlined text-sm">
              {showForm ? 'close' : 'history_edu'}
            </span>
          </span>
        </button>
      </div>

     {/* --- FORM SECTION --- */}
    {showForm && (
    <div className="bg-slate-900/50 backdrop-blur-md rounded-xl p-5 md:p-8 border border-slate-700 mb-10 shadow-2xl">
      <h2 className="text-lg font-display font-bold text-white mb-6 flex items-center gap-2">
        <span className="w-2 h-2 bg-neon-pink animate-pulse"></span>
        {editingExperience ? 'EDIT_LOG_STAMP' : 'INITIALIZE_LOG_ENTRY'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-2 ml-1">Job Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all"
              placeholder="e.g., Senior Systems Architect"
            />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-2 ml-1">Company / Organization</label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              required
              className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all"
              placeholder="e.g., Cyberdyne Systems"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-2 ml-1">Time Period</label>
            <input
              type="text"
              value={formData.period}
              onChange={(e) => setFormData({ ...formData, period: e.target.value })}
              required
              className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 outline-none"
              placeholder="e.g., 2024 - PRESENT"
            />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-2 ml-1">UI Accent Color</label>
            <select
              value={formData.borderColor}
              onChange={(e) => setFormData({ ...formData, borderColor: e.target.value })}
              required
              className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 outline-none appearance-none"
            >
              <option value="primary">Primary (Purple)</option>
              <option value="neon-pink">Neon Pink</option>
              <option value="electric-orange">Electric Orange</option>
              <option value="cyan">Cyan</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-slate-400 mb-2 ml-1">Role Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 outline-none resize-none"
            placeholder="Describe the objectives and achievements..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          <div className="md:col-span-1">
            <label className="block text-xs font-mono uppercase text-slate-400 mb-2 ml-1">Sort Order</label>
            <input
              type="number"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
              required
              className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>
          <div className="md:col-span-2 flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-display font-bold py-3.5 rounded-lg hover:from-purple-700 hover:to-pink-700 transition tracking-widest shadow-lg shadow-purple-500/20"
            >
              {editingExperience ? 'UPDATE_ENTRY' : 'SAVE_TO_LOG'}
            </button>
            {editingExperience && (
              <button
                type="button"
                onClick={resetForm}
                className="px-8 py-3.5 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition font-display font-bold tracking-widest uppercase text-sm"
              >
                Abort
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
    )}

    {/* --- LIST SECTION --- */}
    <div className="grid grid-cols-1 gap-6">
      {experiences.map((exp) => (
        <div 
          key={exp._id} 
          className="group relative bg-slate-900/40 backdrop-blur-sm rounded-xl p-6 border border-slate-800 hover:border-slate-700 transition-all duration-300 overflow-hidden">
          {/* Dynamic Glowing Accent Bar */}
          <div className={`absolute left-0 top-0 bottom-0 w-1.5 shadow-[0_0_10px_rgba(0,0,0,0.5)] 
            ${exp.borderColor === 'neon-pink' ? 'bg-neon-pink shadow-neon-pink/50' : 
              exp.borderColor === 'electric-orange' ? 'bg-electric-orange shadow-electric-orange/50' :
              exp.borderColor === 'cyan' ? 'bg-cyan-500 shadow-cyan-500/50' : 'bg-purple-600 shadow-purple-600/50'}`}/>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 ml-2">
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                <h3 className="text-xl font-display font-bold text-white tracking-wide">{exp.title}</h3>
                <span className="hidden sm:block text-slate-600">|</span>
                <p className="text-purple-400 font-mono text-sm uppercase tracking-wider">{exp.company}</p>
              </div>
              <p className="text-xs font-mono text-slate-500 mb-4">{exp.period}</p>
              {exp.description && (
                <p className="text-slate-400 text-sm leading-relaxed max-w-3xl border-l border-slate-800 pl-4 py-1">
                  {exp.description}
                </p>
              )}
              <div className="mt-4 flex items-center gap-4 text-[10px] font-mono uppercase tracking-tighter text-slate-600">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
                  Order: {exp.order}
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
                  Theme: {exp.borderColor}
                </span>
              </div>
            </div>
            <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto border-t md:border-t-0 border-slate-800/50 pt-4 md:pt-0">
              <button
                onClick={() => handleEdit(exp)}
                className="flex-1 md:w-28 px-4 py-2.5 bg-blue-600/10 text-blue-400 border border-blue-600/20 rounded hover:bg-blue-600 hover:text-white transition text-xs font-bold tracking-widest">
                EDIT
              </button>
              <button
                onClick={() => handleDelete(exp._id!)}
                className="flex-1 md:w-28 px-4 py-2.5 bg-red-600/10 text-red-400 border border-red-600/20 rounded hover:bg-red-600 hover:text-white transition text-xs font-bold tracking-widest">
                DELETE
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* --- EMPTY STATE --- */}
    {experiences.length === 0 && (
      <div className="text-center py-20 bg-slate-900/30 rounded-xl border-2 border-dashed border-slate-800">
        <span className="material-symbols-outlined text-5xl text-slate-700 mb-4">folder_open</span>
        <p className="text-slate-500 font-mono uppercase tracking-widest">Error 404: No_Career_Data_Found</p>
      </div>
    )}
  </div>
);
}
