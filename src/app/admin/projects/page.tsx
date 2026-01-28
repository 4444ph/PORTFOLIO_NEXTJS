'use client';

import { useEffect, useState } from 'react';
import Notification from '@/components/admin/Notification';

interface Project {
  _id?: string;
  title: string;
  description: string;
  imageUrl: string;
  techStack: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  order: number;
}

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<Project>({
    title: '',
    description: '',
    imageUrl: '',
    techStack: [],
    demoUrl: '',
    githubUrl: '',
    featured: false,
    order: 0,
  });
  const [techInput, setTechInput] = useState('');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/admin/projects');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setNotification({ message: 'Failed to load projects', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const method = editingProject ? 'PUT' : 'POST';
      const response = await fetch('/api/admin/projects', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setNotification({ message: `Project ${editingProject ? 'updated' : 'created'} successfully!`, type: 'success' });
        fetchProjects();
        resetForm();
      } else {
        const errorData = await response.json().catch(() => ({}));
        setNotification({ message: errorData.error || 'Failed to save project', type: 'error' });
      }
    } catch (error) {
      console.error('Error saving project:', error);
      setNotification({ message: 'An error occurred while saving', type: 'error' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const response = await fetch(`/api/admin/projects?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setNotification({ message: 'Project deleted successfully!', type: 'success' });
        fetchProjects();
      } else {
        setNotification({ message: 'Failed to delete project', type: 'error' });
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      setNotification({ message: 'An error occurred while deleting', type: 'error' });
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData(project);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      imageUrl: '',
      techStack: [],
      demoUrl: '',
      githubUrl: '',
      featured: false,
      order: 0,
    });
    setTechInput('');
    setEditingProject(null);
    setShowForm(false);
  };

  const addTech = () => {
    if (techInput.trim()) {
      setFormData({
        ...formData,
        techStack: [...formData.techStack, techInput.trim()],
      });
      setTechInput('');
    }
  };

  const removeTech = (index: number) => {
    setFormData({
      ...formData,
      techStack: formData.techStack.filter((_, i) => i !== index),
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
    <div>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-white mb-1">
            PROJECT_<span className="text-neon-pink">REGISTRY</span>
          </h1>
          <p className="text-slate-400 font-mono text-xs md:text-sm">Manage your portfolio modules</p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className={`
          w-full sm:w-auto px-4 py-2 md:px-6 md:py-3 
          text-sm md:text-base font-display font-bold tracking-wider
          relative overflow-hidden rounded-md border-2 
          ${showForm 
            ? 'border-gray-500 text-gray-400 hover:bg-gray-800' 
            : 'border-neon-pink text-white shadow-[0_0_15px_rgba(255,0,255,0.3)] hover:shadow-[0_0_25px_rgba(255,0,255,0.5)]'
          } transition-all duration-300`}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {showForm ? (
              <> <span className="material-symbols-outlined text-sm">close</span> CANCEL_REPLY </>
            ) : (
              <> <span className="material-symbols-outlined text-sm">add</span> ADD_NEW_PROJECT </>
            )}
          </span>
        </button>
      </div>

      {showForm && (
        <div className="bg-slate-800 rounded-xl p-4 md:p-6 border border-slate-700 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">
            {editingProject ? 'Edit Project' : 'Add New Project'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
                placeholder="e.g., E-commerce Platform"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows={3}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
                placeholder="Brief description of the project..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Image URL</label>
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
                placeholder="https://example.com/project-image.jpg (Optional)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Tech Stack</label>
              <div className="flex flex-col sm:flex-row gap-2 mb-2">
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
                  className="flex-1 px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g., React, Node.js, MongoDB"
                />
                <button
                  type="button"
                  onClick={addTech}
                  className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-bold"
                >
                  Add
                </button>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {formData.techStack.map((tech, index) => (
                  <span key={index} className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs md:text-sm flex items-center gap-2">
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeTech(index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Demo URL (Optional)</label>
                <input
                  type="url"
                  value={formData.demoUrl}
                  onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
                  placeholder="https://demo.example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">GitHub URL (Optional)</label>
                <input
                  type="url"
                  value={formData.githubUrl}
                  onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
                  placeholder="https://github.com/username/repo"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Order</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                  required
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="flex items-center">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-5 h-5 rounded border-slate-700 bg-slate-900/50 text-purple-600 focus:ring-2 focus:ring-purple-500"
                  />
                  <span className="text-slate-300 font-medium">Featured Project</span>
                </label>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition"
              >
                {editingProject ? 'Update Project' : 'Create Project'}
              </button>
              {editingProject && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        {projects.map((project) => (
          <div key={project._id} className="bg-slate-800 rounded-xl p-4 md:p-6 border border-slate-700">
            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
              <div className="w-full md:w-32 shrink-0">
              {project.imageUrl ? (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full md:w-32 h-48 md:h-32 object-cover rounded-lg shadow-lg"
                />
              ) : (
                <div className="w-full md:w-32 h-48 md:h-32 bg-slate-700/50 rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-slate-500 text-3xl">image</span>
                </div>
              )}
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                  <div className="w-full">
                    <h3 className="text-xl font-bold text-white flex flex-wrap items-center gap-2">
                      {project.title}
                      {project.featured && (
                        <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-300 rounded text-[10px] uppercase font-bold tracking-wider">Featured</span>
                      )}
                    </h3>
                    <p className="text-slate-400 mt-2 text-sm leading-relaxed">{project.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.techStack.map((tech, index) => (
                        <span key={index} className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-700/50 flex flex-wrap gap-x-6 gap-y-2 text-xs font-mono text-slate-500">
                      {project.demoUrl && <a href={project.demoUrl} target="_blank" className="text-purple-400 hover:underline flex items-center gap-1">DEMO ↗</a>}
                      {project.githubUrl && <a href={project.githubUrl} target="_blank" className="text-purple-400 hover:underline flex items-center gap-1">GITHUB ↗</a>}
                      <span className="ml-auto">ORD: {project.order}</span>
                    </div>
                  </div>
                  <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => handleEdit(project)}
                      className="flex-1 sm:flex-none px-4 
                      py-2 bg-blue-600/20 text-blue-400 
                      border border-blue-600/30 rounded-lg 
                      hover:bg-blue-600 hover:text-white 
                      transition text-sm font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(project._id!)}
                      className="flex-1 sm:flex-none px-4 py-2 bg-red-600/20 text-red-400 border border-red-600/30 rounded-lg hover:bg-red-600 hover:text-white transition text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-12 bg-slate-800 rounded-xl border border-slate-700">
          <p className="text-slate-400">No projects added yet. Click "Add Project" to get started.</p>
        </div>
      )}
    </div>
  );
}
