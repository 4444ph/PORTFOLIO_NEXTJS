'use client';

import { useEffect, useState } from 'react';

interface Skill {
  category: string;
  name: string;
  items: string[];
  icon: string;
  order: number;
}

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch('/api/skills');
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setSkills(data);
        } else {
          // Use default data if no skills in database
          setSkills(defaultSkills);
        }
      } catch (error) {
        console.error('Error fetching skills:', error);
        setSkills(defaultSkills);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const defaultSkills: Skill[] = [
    {
      category: "FRONTEND",
      name: "Frontend Development",
      icon: "code_blocks",
      items: ["React.js // Vue", "Tailwind // CSS3", "Three.js // WebGL", "TypeScript"],
      order: 0
    },
    {
      category: "MAINFRAME",
      name: "Backend Development",
      icon: "dns",
      items: ["Node.js // Express", "Python // Django", "PostgreSQL", "Redis Cache"],
      order: 1
    },
    {
      category: "NETWORK",
      name: "DevOps & Cloud",
      icon: "cloud_sync",
      items: ["Docker // K8s", "AWS // Azure", "CI/CD Pipelines", "Linux Admin"],
      order: 2
    },
    {
      category: "VISUALS",
      name: "Design & Creative",
      icon: "palette",
      items: ["Figma // UI/UX", "Adobe Suite", "Blender 3D", "Motion Design"],
      order: 3
    }
  ];

  const getHoverColor = (index: number) => {
    const colors = ["neon-pink", "electric-orange", "cyan-400", "purple-400"];
    return colors[index % colors.length];
  };

  const getStatusText = (index: number) => {
    const statuses = ["SYS.VER.2.0", "CORE.SYS.READY", "NET.LINK.OK", "RENDER.ON"];
    return statuses[index % statuses.length];
  };

  return (
    <section className="py-24 px-4 bg-[#12081f] relative overflow-hidden" id="skills">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-[120px]"></div>
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex items-center gap-2 md:gap-4 mb-8 md:mb-16">
          <span className="material-symbols-outlined text-neon-pink text-2xl md:text-4xl">memory</span>
          <h2 className="font-display text-lg sm:text-2xl md:text-4xl font-bold text-white md:tracking-widest whitespace-nowrap">
            ACTIVE_<span className="text-neon-pink">MODULES</span>
          </h2>
          <div className="h-[2px] flex-grow bg-gradient-to-r from-neon-pink/50 to-transparent"></div>
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => {
              const hoverColor = getHoverColor(index);
              return (
                <div 
                  key={skill.category}
                  className={`group relative bg-primary/10 backdrop-blur-sm border border-primary/40 rounded-lg p-6 hover:border-${hoverColor} hover:shadow-[0_0_15px_rgba(255,0,255,0.4)] transition-all duration-300 overflow-hidden`}
                >
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`font-display text-lg text-white group-hover:text-${hoverColor} transition-colors`}>
                      {skill.category}
                    </h3>
                    <span className={`material-symbols-outlined text-primary group-hover:text-${hoverColor}`}>
                      {skill.icon}
                    </span>
                  </div>
                  <div className="font-mono text-sm text-gray-400 space-y-2">
                    {skill.items.map((item, i) => (
                      <p 
                        key={i}
                        className={`border-l-2 border-primary/30 pl-3 group-hover:border-${hoverColor}/50 transition-colors`}
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                  <div className="absolute bottom-2 right-2 text-[10px] text-primary/40 font-display">
                    {getStatusText(index)}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
