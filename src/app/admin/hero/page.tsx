'use client';

import { useEffect, useState } from 'react';
import Notification from '@/components/admin/Notification';

interface HeroData {
  _id?: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  ctaText: string;
  ctaLink: string;
}

export default function HeroAdmin() {
  const [formData, setFormData] = useState<HeroData>({
    title: '',
    subtitle: '',
    description: '',
    imageUrl: '',
    ctaText: '',
    ctaLink: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  useEffect(() => {
    fetchHeroContent();
  }, []);

  const fetchHeroContent = async () => {
    try {
      const response = await fetch('/api/admin/hero');
      const data = await response.json();
      if (data._id) {
        setFormData(data);
      }
    } catch (error) {
      console.error('Error fetching hero content:', error);
      setNotification({ message: 'Failed to load hero content', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const method = formData._id ? 'PUT' : 'POST';
      const response = await fetch('/api/admin/hero', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setFormData(data);
        setNotification({ message: 'Hero content saved successfully!', type: 'success' });
      } else {
        const errorData = await response.json().catch(() => ({}));
        setNotification({ message: errorData.error || 'Failed to save hero content', type: 'error' });
      }
    } catch (error) {
      console.error('Error saving hero content:', error);
      setNotification({ message: 'An error occurred while saving', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
    <div className="max-w-5xl mx-auto">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      {/* --- HEADER --- */}
      <div className="mb-10">
        <h1 className="text-2xl md:text-3xl font-display font-bold text-white mb-1 tracking-tight">
          HERO_<span className="text-neon-pink">CONFIGURATION</span>
        </h1>
        <p className="text-slate-400 font-mono text-xs md:text-sm uppercase tracking-widest">
          Modifying_Front_End_Visual_Matrix
        </p>
      </div>

      <div className="bg-slate-900/50 backdrop-blur-md rounded-xl p-6 md:p-10 border border-slate-800 shadow-2xl relative overflow-hidden">
        {/* Decorative corner scanline effect */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-pink/20 to-transparent"></div>
        
        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          
          {/* Section: Identity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="title" className="block text-[10px] font-mono uppercase text-slate-500 tracking-[0.2em] ml-1">
                Primary_Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title || ''}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-neon-pink focus:border-transparent outline-none transition-all font-display tracking-wide"
                placeholder="e.g., NEURAL_LINK"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="subtitle" className="block text-[10px] font-mono uppercase text-slate-500 tracking-[0.2em] ml-1">
                Sub_Header_Label
              </label>
              <input
                id="subtitle"
                name="subtitle"
                type="text"
                value={formData.subtitle || ''}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-neon-pink focus:border-transparent outline-none transition-all"
                placeholder="e.g., Full Stack Architect"
              />
            </div>
          </div>

          {/* Section: Narrative */}
          <div className="space-y-2">
            <label htmlFor="description" className="block text-[10px] font-mono uppercase text-slate-500 tracking-[0.2em] ml-1">
              Core_Description_Data
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-neon-pink focus:border-transparent outline-none transition-all leading-relaxed"
              placeholder="Inject bio data here..."
            />
          </div>

          {/* Section: Media & Action */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-3 space-y-2">
              <label htmlFor="imageUrl" className="block text-[10px] font-mono uppercase text-slate-500 tracking-[0.2em] ml-1">
                Visual_Asset_URL
              </label>
              <div className="relative group">
                <input
                  id="imageUrl"
                  name="imageUrl"
                  type="url"
                  value={formData.imageUrl || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none transition-all"
                  placeholder="https://assets.network/id-01.jpg"
                />
                <span className="absolute right-4 top-3 text-slate-600 material-symbols-outlined group-focus-within:text-cyan-400 transition-colors">link</span>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="ctaText" className="block text-[10px] font-mono uppercase text-slate-500 tracking-[0.2em] ml-1">
                Action_Trigger_Text
              </label>
              <input
                id="ctaText"
                name="ctaText"
                type="text"
                value={formData.ctaText || ''}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 outline-none"
                placeholder="INITIALIZE"
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <label htmlFor="ctaLink" className="block text-[10px] font-mono uppercase text-slate-500 tracking-[0.2em] ml-1">
                Action_Destination_Path
              </label>
              <input
                id="ctaLink"
                name="ctaLink"
                type="text"
                value={formData.ctaLink || ''}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 outline-none"
                placeholder="#DIRECTORY"
              />
            </div>
          </div>

          {/* --- SUBMIT BUTTON --- */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={saving}
              className={`
                w-full relative group overflow-hidden py-4 px-6 rounded-lg
                font-display font-bold tracking-[0.3em] uppercase text-sm
                transition-all duration-300
                ${saving 
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                  : 'bg-white text-black hover:bg-neon-pink hover:text-white hover:shadow-[0_0_30px_rgba(255,0,255,0.4)]'
                }
              `}
            >
              <span className="relative z-10 flex items-center justify-center gap-3 text-xs md:text-lg">
                {saving ? (
                  <> <span className="animate-spin text-lg">sync</span> PROCESSING... </>
                ) : (
                  <> <span className="material-symbols-outlined text-lg">save</span> COMMIT_TO_DATABASE </>
                )}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}