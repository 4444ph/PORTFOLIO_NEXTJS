export default function Navigation() {
  return (
    <nav className="fixed top-0 w-full z-40 bg-background-dark/90 backdrop-blur-md border-b border-primary/30">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-neon-pink">
          <span className="material-symbols-outlined text-electric-orange animate-pulse">terminal</span>
          <span className="font-display font-bold text-lg tracking-widest">SYSTEM_ONLINE</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a className="font-display text-sm tracking-widest hover:text-electric-orange transition-colors" href="#hero">HOME</a>
          <a className="font-display text-sm tracking-widest hover:text-electric-orange transition-colors" href="#skills">SKILLS</a>
          <a className="font-display text-sm tracking-widest hover:text-electric-orange transition-colors" href="#experience">EXP_LOGS</a>
          <a className="font-display text-sm tracking-widest hover:text-electric-orange transition-colors" href="#projects">PROJECTS</a>
        </div>
        <button className="bg-primary/20 hover:bg-primary border border-primary text-white font-display text-xs px-4 md:px-6 py-2 rounded uppercase tracking-wider transition-all duration-300 shadow-[0_0_10px_rgba(127,19,236,0.5)] hover:shadow-[0_0_20px_rgba(127,19,236,0.8)]">
          <a href="https://www.linkedin.com/in/willow-navarez/">Connect</a>
        </button>
      </div>
    </nav>
  );
}
