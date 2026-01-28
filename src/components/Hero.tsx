'use client';

import { useEffect, useState } from 'react';

interface HeroData {
  title: string;
  subtitle: string;
  description: string;
  imageUrl?: string;
  ctaText: string;
  ctaLink: string;
}

export default function Hero() {
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await fetch('/api/hero');
        const data = await response.json();
        if (data._id) {
          setHeroData(data);
        }
      } catch (error) {
        console.error('Error fetching hero data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  // Default fallback data
  const defaultData: HeroData = {
    title: 'ALEX RAIDER',
    subtitle: 'Full Stack Architect',
    description: 'Constructing digital futures on retro foundations. High-performance code with a nostalgic soul. System status: Optimized.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAq9HSWuGU4Q6_bUzjWco62L5vgG8jKVbynB7lgAJDdxej9NEFD5ks91BtmSPcIRiYXwRNTye_zWo9XShdGCqG_w8GvCNVJ3GfLdywmm3etlFw42Pi7mBIx-n_w2XiCIp_WqYS2DXl_ElVug9z8WA7qu-9g3MoSskjN4qka1bG8mpcGunUV_9352oLvPjTsN8--6aSQ0pBx4GzRDN3gjxgLCtmIgKB0BsvpmAroly5JOFR886jJJAhluJ1elyQPQIL4qrdLaiUi3g',
    ctaText: 'INITIATE_PROTOCOL',
    ctaLink: '#projects',
  };

  const data = heroData || defaultData;

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20" id="hero">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f0518] via-[#1a0b2e] to-[#2d1246] -z-20"></div>
      
      {/* Retro Sun */}
      <div className="absolute bottom-[20%] w-64 h-60 md:w-96 md:h-96 rounded-full retro-sun -z-10 opacity-90">
        <div className="w-full h-full bg-transparent bg-[linear-gradient(transparent_50%,#0f0518_50%)] bg-[length:100%_20px] opacity-20"></div>
      </div>
      
      {/* Mountains */}
      <div className="absolute bottom-[20%] w-full h-24 bg-repeat-x -z-10 opacity-80" style={{backgroundImage: 'linear-gradient(to top right, transparent 50%, #05010a 50%), linear-gradient(to top left, transparent 50%, #05010a 50%)', backgroundSize: '80px 100%'}}></div>
      
      {/* Perspective Grid */}
      <div className="absolute bottom-0 w-full h-[35vh] bg-[#140024] overflow-hidden -z-10 border-t border-neon-pink/50 shadow-[0_0_20px_#ff00ff]">
        <div className="perspective-grid w-full h-full bg-[linear-gradient(rgba(127,19,236,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(127,19,236,0.2)_1px,transparent_1px)] bg-[length:40px_40px]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0518] to-transparent pointer-events-none"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-20 pb-12 lg:py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center lg:mt-[-5vh]">        
        <div className="lg:col-span-7 flex flex-col items-start text-left order-2 lg:order-1">
          <h2 className="text-neon-pink font-display text-xl md:text-2xl mb-4 tracking-[0.2em] uppercase opacity-90 border-l-4 border-neon-pink pl-4">
            {data.subtitle}
          </h2>
          <h1 className="text-6xl md:text-8xl font-display font-black text-white mb-6 tracking-tighter shadow-black drop-shadow-2xl leading-none" style={{textShadow: '4px 4px 0px #7f13ec'}}>
            {data.title.split(' ')[0]} <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">{data.title.split(' ').slice(1).join(' ')}</span>
          </h1>
          <p className="text-gray-300 font-body text-lg md:text-xl max-w-xl leading-relaxed mb-10 border-l-2 border-electric-orange pl-6">
            {data.description}
          </p>
          <div className="flex flex-col md:flex-row gap-6">
            <a className="group relative px-6 md:px-10 py-4 bg-transparent overflow-hidden rounded-md border-2 border-electric-orange text-white font-display font-bold tracking-wider hover:text-black transition-colors duration-300 shadow-[0_0_15px_rgba(255,153,0,0.3)]" href={data.ctaLink}>
              <span className="absolute inset-0 w-full h-full bg-electric-orange transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
              <span className="relative flex items-center gap-2">
                {data.ctaText} <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </span>
            </a>
          </div>
        </div>
        
        {/* Portrait */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2">
          <div className="relative group">
            <div className="relative p-2 rounded-2xl bg-gradient-to-br from-neon-pink via-deep-violet to-primary shadow-[0_0_30px_rgba(255,0,255,0.4),inset_0_0_20px_rgba(127,19,236,0.6)]">
              <div className="relative overflow-hidden rounded-xl border-2 border-neon-pink/50 portrait-scanlines vhs-glitch">
                <img 
                  alt="Professional portrait" 
                  className="w-64 h-80 md:w-80 md:h-[450px] object-cover contrast-110 saturate-125" 
                  src={data.imageUrl || 'https://via.placeholder.com/400x500/1a0b2e/ffffff?text=No+Image'}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-deep-violet/40 to-transparent mix-blend-overlay"></div>
              </div>
              <div className="absolute -top-2 -left-2 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-lg z-10 shadow-[0_0_10px_white]"></div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-lg z-10 shadow-[0_0_10px_white]"></div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-background-dark/80 backdrop-blur-md border border-neon-pink/50 p-3 rounded font-mono text-[10px] text-neon-pink tracking-tighter uppercase z-20">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neon-pink animate-pulse"></span>
                <span>IDENT_CONFIRMED: {data.title.split(' ').pop()?.charAt(0)}</span>
              </div>
              <div className="text-gray-500 mt-1">LOC: VALENZUELA_1440</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
