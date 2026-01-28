'use client';

import { useEffect, useState } from 'react';
import Notification from '@/components/admin/Notification';

interface Skill {
  _id?: string;
  category: string;
  name: string;
  items: string[];
  icon: string;
  order: number;
}

export default function SkillsAdmin() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [formData, setFormData] = useState<Skill>({
    category: '',
    name: '',
    items: [],
    icon: '',
    order: 0,
  });
  const [itemInput, setItemInput] = useState('');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await fetch('/api/admin/skills');
      const data = await response.json();
      setSkills(data);
    } catch (error) {
      console.error('Error fetching skills:', error);
      setNotification({ message: 'Failed to load skills', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const method = editingSkill ? 'PUT' : 'POST';
      const response = await fetch('/api/admin/skills', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setNotification({ message: `Skill ${editingSkill ? 'updated' : 'created'} successfully!`, type: 'success' });
        fetchSkills();
        resetForm();
      } else {
        setNotification({ message: 'Failed to save skill', type: 'error' });
      }
    } catch (error) {
      console.error('Error saving skill:', error);
      setNotification({ message: 'An error occurred while saving', type: 'error' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;

    try {
      const response = await fetch(`/api/admin/skills?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setNotification({ message: 'Skill deleted successfully!', type: 'success' });
        fetchSkills();
      } else {
        setNotification({ message: 'Failed to delete skill', type: 'error' });
      }
    } catch (error) {
      console.error('Error deleting skill:', error);
      setNotification({ message: 'An error occurred while deleting', type: 'error' });
    }
  };

  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill);
    setFormData(skill);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      category: '',
      name: '',
      items: [],
      icon: '',
      order: 0,
    });
    setItemInput('');
    setEditingSkill(null);
    setShowForm(false);
  };

  const addItem = () => {
    if (itemInput.trim()) {
      setFormData({
        ...formData,
        items: [...formData.items, itemInput.trim()],
      });
      setItemInput('');
    }
  };

  const removeItem = (index: number) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index),
    });
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

      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-white  tracking-tight">Skills</h1>
          <p className="text-neon-pink">Manage your skills and expertise</p>
          <p className="text-slate-400 font-mono text-xs md:text-sm">
            SELECT * FROM EXPERTISE WHERE STATUS = 'MASTERY'
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
              : 'border-neon-pink text-white shadow-[0_0_15px_rgba(255,0,255,0.2)] hover:shadow-[0_0_25px_rgba(255,0,255,0.4)]'
            }
          `}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {showForm ? 'CANCEL_PHASE' : 'ADD_NEW_SKILL'}
            <span className="material-symbols-outlined text-sm">
              {showForm ? 'close' : 'add'}
            </span>
          </span>
        </button>
      </div>

      {/* --- FORM SECTION --- */}
      {showForm && (
        <div className="bg-slate-900/50 backdrop-blur-md rounded-xl p-5 md:p-8 border border-slate-700 mb-10 shadow-2xl">
          <h2 className="text-lg font-display font-bold text-white mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-neon-pink animate-pulse"></span>
            {editingSkill ? 'EDIT_SKILL_MODULE' : 'INITIALIZE_NEW_SKILL'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-2 ml-1">Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 transition-all outline-none"
                  placeholder="e.g., FRONTEND"
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-2 ml-1">Skill Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 transition-all outline-none"
                  placeholder="e.g., UI Frameworks"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-2 ml-1">Icon (Material Name)</label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 outline-none"
                  placeholder="e.g., terminal"
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-2 ml-1">Sequence Order</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                  required
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
            </div>

            <div className="border-t border-slate-800 pt-6">
              <label className="block text-xs font-mono uppercase text-slate-400 mb-2 ml-1">Sub-Skills (Items)</label>
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <input
                  type="text"
                  value={itemInput}
                  onChange={(e) => setItemInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem())}
                  className="flex-1 px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 outline-none"
                  placeholder="Add item (e.g. Tailwind CSS)"
                />
                <button
                  type="button"
                  onClick={addItem}
                  className="px-6 py-3 bg-blue-600/20 text-blue-400 border border-blue-600/40 rounded-lg hover:bg-blue-600 hover:text-white transition font-bold text-sm uppercase tracking-widest"
                >
                  Insert
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-md border border-slate-700 group">
                    <span className="text-sm text-slate-200">{item}</span>
                    <button type="button" onClick={() => removeItem(index)} className="text-red-500 hover:text-red-300">
                      <span className="material-symbols-outlined text-sm">close</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-display font-bold py-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition tracking-widest shadow-lg shadow-purple-500/20"
              >
                {editingSkill ? 'UPDATE_MODULE' : 'COMMIT_CHANGES'}
              </button>
              {editingSkill && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-8 py-4 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition font-display font-bold tracking-widest"
                >
                  ABORT
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* --- LIST SECTION --- */}
      <div className="grid grid-cols-1 gap-4">
        {skills.map((skill) => (
          <div key={skill._id} className="group bg-slate-900/40 backdrop-blur-sm rounded-xl p-5 border border-slate-800 hover:border-neon-pink/50 transition-all duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-neon-pink text-2xl">
                    {skill.icon}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-display font-bold text-white tracking-wide">
                      {skill.name}
                    </h3>
                    <span className="text-[10px] text-nowrap font-mono px-2 py-0.5 rounded border border-slate-700 text-slate-500 uppercase">
                      ID: {skill.order}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-purple-400 uppercase tracking-widest mt-0.5">
                    {skill.category}
                  </p>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    {skill.items.map((item, index) => (
                      <span key={index} className="px-2 py-1 bg-slate-950 border border-slate-800 text-slate-400 rounded text-[11px] font-mono">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto border-t md:border-t-0 border-slate-800 pt-4 md:pt-0">
                <button
                  onClick={() => handleEdit(skill)}
                  className="flex-1 md:w-28 px-4 py-2 bg-blue-600/10 text-blue-400 border border-blue-600/20 rounded hover:bg-blue-600 hover:text-white transition text-xs font-bold tracking-widest"
                >
                  EDIT
                </button>
                <button
                  onClick={() => handleDelete(skill._id!)}
                  className="flex-1 md:w-28 px-4 py-2 bg-red-600/10 text-red-400 border border-red-600/20 rounded hover:bg-red-600 hover:text-white transition text-xs font-bold tracking-widest"
                >
                  DELETE
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- EMPTY STATE --- */}
      {skills.length === 0 && (
        <div className="text-center py-20 bg-slate-900/30 rounded-xl border-2 border-dashed border-slate-800">
          <span className="material-symbols-outlined text-5xl text-slate-700 mb-4">database_off</span>
          <p className="text-slate-500 font-mono">NO_DATA_FOUND: REPOSITORY_IS_EMPTY</p>
        </div>
      )}
    </div>
  );
}
