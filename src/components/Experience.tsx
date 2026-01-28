'use client';

import { useEffect, useState } from 'react';

interface Experience {
  title: string;
  company: string;
  period: string;
  description?: string;
  borderColor: string;
  order: number;
}

export default function Experience() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await fetch('/api/experience');
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setExperiences(data);
        } else {
          // Use default data if no experiences in database
          setExperiences(defaultExperiences);
        }
      } catch (error) {
        console.error('Error fetching experiences:', error);
        setExperiences(defaultExperiences);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  const defaultExperiences: Experience[] = [
    {
      period: "2023 - PRESENT",
      title: "SENIOR_DEV",
      company: "NEURAL_CORP",
      borderColor: "neon-pink",
      order: 0
    },
    {
      period: "2021 - 2023",
      title: "FULL_STACK",
      company: "CYBER_SYSTEMS",
      borderColor: "primary",
      order: 1
    },
    {
      period: "2019 - 2021",
      title: "JUNIOR_ENG",
      company: "RETRO_INC",
      borderColor: "electric-orange",
      order: 2
    }
  ];

  const getStatus = (index: number) => {
    const statuses = ["REC ● 02:45:12", "PLY ▶ 01:20:00", "STOP ■ 00:00:00"];
    return statuses[index % statuses.length];
  };

  return (
    <section className="py-24 px-4 bg-[#0d0415] relative" id="experience">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-end gap-2 md:gap-4 mb-8 md:mb-16">
          <div className="h-[2px] flex-grow bg-gradient-to-l from-electric-orange/50 to-transparent min-w-[20px]"></div>
          <h2 className="font-display text-lg sm:text-2xl md:text-4xl font-bold text-white md:tracking-widest text-right whitespace-nowrap">
            EXPERIENCE_<span className="text-electric-orange">LOGS</span>
          </h2>
          <span className="material-symbols-outlined text-electric-orange text-4xl">video_library</span>
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {experiences.map((exp, index) => (
              <div 
                key={index}
                className={`group relative min-h-[5rem] py-4 md:py-0 w-full bg-[#1a1a1a] rounded-r-md border-l-8 border-l-${exp.borderColor} flex items-center transform transition-transform duration-300 hover:translate-x-4 hover:scale-[1.02] shadow-lg cursor-pointer`}
              >
                <div className="absolute inset-0 bg-[linear-gradient(90deg,#111_0%,#333_10%,#222_50%,#111_100%)] opacity-30 pointer-events-none rounded-r-md"></div>
                <div className="relative z-10 flex flex-1 items-center justify-between px-6 md:px-10">
                  <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-8 items-start">
                    <div className={`bg-white text-black font-display font-bold px-3 py-1 text-sm md:text-base ${index % 2 === 0 ? '-rotate-1' : 'rotate-1'} shadow-sm border border-gray-400 shrink-0`}>
                      {exp.period}
                    </div>
                    <h3 className={`font-display text-white text-base md:text-xl tracking-wide font-bold group-hover:text-${exp.borderColor} transition-colors leading-tight`}>
                      {exp.title} <span className="text-gray-400 font-normal">@</span> {exp.company}
                    </h3>
                    <h3 className={`font-display text-grey-300 text-sm md:text-lg tracking-wide font-bold group-hover:text-${exp.borderColor} transition-colors leading-snug`}>{exp.description}</h3>
                  </div>
                  <span className="hidden md:block text-gray-500 font-mono text-xs">{getStatus(index)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
