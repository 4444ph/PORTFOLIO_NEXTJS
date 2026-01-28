'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Project {
  title: string;
  description: string;
  imageUrl?: string;
  techStack: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  order: number;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
        } else {
          // Use default data if no projects in database
          setProjects(defaultProjects);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        setProjects(defaultProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const defaultProjects: Project[] = [
    {
      title: "NEON_DASHBOARD",
      description: "Real-time analytics dashboard with stunning visualizations",
      techStack: ["Vue.js", "D3.js", "Firebase"],
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9TUBICsGuJbfHmPTdgzOiIKb8dZK8P49iBm6GX0eCncEpjZ7pscuizm0pAfFUgcuxwOqH0We6x4JRnv4cDZlP-gMlz13tU1ZTNC5eEH0oGAeNwIp0pJCXaGfP2gAuXzD-wbzFSUwfKP6DwQ55c4IG0hq_8siT8b2g9KhIVP9CmlVsxM-cturmGeY-4WEgtQj205Tm3K8Vq06eyTDWWs8E6ABc4Z5FL1w3JskLmPAX-5yjnGhLLBNPcoYdPqacpWrWxihvU7ydDw",
      featured: true,
      order: 0
    },
    {
      title: "SYNTH_PLAYER_APP",
      description: "Mobile synthesizer app with audio processing",
      techStack: ["React Native", "Audio API"],
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDVcPsgOnlUcQ9LRKFLCo8h5x7Mb6U9zYVCjv-eHR8lfUzSRFwXLARG0Dt5DNGycHijSpxQVNy-lw_02ILREXJmQEZ8oiicmnaStZIeeZX1054ezRL26qDWq0SoViTc7kqF6NGthViOWsPtAczC6DN1Zg_fIm9C017YoKFfymX8DskPi4KHZamdl2gVgfxiirBS5GYSjJV9AhOYJA37srkxNimkH0qQA5dGUkOixqoTNx_xxR1O_OX1CbkPc8aMOXr5AlSCQe0iyQ",
      featured: false,
      order: 1
    },
    {
      title: "GRID_LOCK_SECURITY",
      description: "Advanced security system with ML-powered encryption",
      techStack: ["Python", "ML", "Encryption"],
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCvVLSmMzJ9AaDsaByOQRNUiVCRpD6AH5ORxeLyM-yWbT6_z8Cm7PEK21Fh-DTuHZgDwHdvQx8KXa9NNhtrUY06xdcDAFMx2P2ShFQZDs_H70ASwxMG5hDtVz4-5mDNC5GXPiJOmVaxB-uIH4Czr-A78AFZWEB6palzLF-T8ipwBJfGYZsDMvqiDQlTgPAaYgLa807m5F6-Z2_R1MRgemrEnnVI4kwSvCzoPmKyJuOLROiIYH1-6UYrZ9X1h8yDmF6qBE0eLfK9BA",
      featured: false,
      order: 2
    }
  ];

  const getIcon = (index: number) => {
    const icons = ["fingerprint", "music_note", "lock"];
    return icons[index % icons.length];
  };

  const getHoverColor = (index: number) => {
    const colors = ["neon-pink", "electric-orange", "cyan-400"];
    return colors[index % colors.length];
  };

  const getRotation = (index: number) => {
    const rotations = [
      "hover:-translate-y-2 hover:rotate-1",
      "hover:-translate-y-2 hover:-rotate-1 mt-0 md:mt-8 lg:mt-0",
      "hover:-translate-y-2 hover:rotate-1"
    ];
    return rotations[index % rotations.length];
  };

  return (
    <section className="py-24 px-4 bg-[#140024] relative overflow-hidden" id="projects">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px] opacity-30 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-10 md:mb-16 px-2">
          <h2 className="font-display text-xl sm:text-2xl md:text-4xl font-bold text-white tracking-tight sm:tracking-wide md:tracking-widest mb-3 md:mb-4 whitespace-nowrap">
            PROJECT_<span className="text-primary-glow">REGISTRY</span>
          </h2>
          <p className="text-gray-400 font-mono">SELECT * FROM PORTFOLIO WHERE STATUS = 'DEPLOYED'</p>
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 px-4">
            {projects.map((project, index) => {
              const hoverColor = getHoverColor(index);
              return (
                <article 
                  key={index}
                  className={`group relative transform transition-all duration-300 ${getRotation(index)}`}
                >
                  <div className={`bg-white p-3 pb-12 shadow-[0_0_20px_rgba(127,19,236,0.3)] group-hover:shadow-[0_0_30px_rgba(255,0,255,0.6)] transition-shadow duration-300 rounded-sm`}>
                    <div className="bg-gray-900 h-48 md:h-64 overflow-hidden relative border border-gray-200">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                      <img 
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 contrast-125 saturate-150"
                        src={project.imageUrl || 'https://via.placeholder.com/400x300/1a0b2e/ffffff?text=No+Image'}
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-50 z-20 pointer-events-none"></div>
                    </div>
                    <div className="pt-4 px-2 flex flex-col gap-1">
                      <h3 className={`font-display text-black text-xl font-bold mb-1 group-hover:text-${hoverColor} transition-colors`}>
                        {project.title}
                      </h3>
                      <p className="font-mono text-gray-600 text-xs uppercase tracking-tight">{project.techStack.join(' / ')}</p>
                      <a href={project.demoUrl} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-gray-600 text-xs uppercase tracking-tight underline decoration-gray-400 underline-offset-2 hover:text-black transition-colors">{project.demoUrl}</a>
                      <a href={project.githubUrl} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-gray-600 text-xs uppercase tracking-tight underline decoration-gray-400 underline-offset-2 hover:text-black transition-colors">{project.githubUrl}</a>
                    </div>
                    <div className={`absolute bottom-4 right-4 text-gray-400 transform ${index % 2 === 0 ? 'rotate-[-10deg]' : 'rotate-[5deg]'}`}>
                      <span className="material-symbols-outlined text-3xl opacity-50">{getIcon(index)}</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
        
        <div className="flex justify-center mt-16">
          <button className="flex items-center gap-2 px-8 py-3 bg-transparent border border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-white transition-all duration-300 font-display text-sm tracking-widest rounded shadow-[0_0_10px_rgba(255,0,255,0.4)] hover:shadow-[0_0_20px_rgba(255,0,255,0.7)]">
            <span className="material-symbols-outlined text-sm">database</span> LOAD_MORE_DATA
          </button>
        </div>
      </div>
    </section>
  );
}
