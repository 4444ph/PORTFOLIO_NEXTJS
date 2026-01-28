export default function Footer() {
  return (
    <footer className="bg-[#05010a] border-t border-primary/20 pt-16 pb-8 px-4 relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <h2 className="font-display text-2xl font-bold text-white tracking-widest">WILLOW_JOSHUA</h2>
          <p className="text-gray-500 font-mono text-sm">Building the future, pixel by pixel.</p>
        </div>
        
        <div className="flex items-center gap-6">
          <a 
            className="w-15 h-15 flex items-center justify-center rounded bg-[#1a0b2e] text-neon-pink hover:bg-neon-pink hover:text-white transition-all duration-300 shadow-[0_0_5px_rgba(255,0,255,0.3)]"
            href="https://github.com/4444ph"
          >
            <span className="font-display font-bold text-base">GH</span>
          </a>
          <a 
            className="w-15 h-15 flex items-center justify-center rounded bg-[#1a0b2e] text-electric-orange hover:bg-electric-orange hover:text-white transition-all duration-300 shadow-[0_0_5px_rgba(255,153,0,0.3)]"
            href="https://www.linkedin.com/in/willow-navarez/"
          >
            <span className="font-display font-bold text-base">LN</span>
          </a>
          <a 
            className="w-15 h-15 flex items-center justify-center rounded bg-[#1a0b2e] text-cyan-400 hover:bg-cyan-400 hover:text-white transition-all duration-300 shadow-[0_0_5px_rgba(34,211,238,0.3)]"
            href="mailto:jnavarez20@gmail.com"
          >
            <span className="material-symbols-outlined text-base">mail</span>
          </a>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 font-mono">
        <p>© 2026 WILLOW JOSHUA. ALL RIGHTS RESERVED.</p>
        <p>TERMINAL_SESSION_ID: #8392-A1</p>
      </div>
    </footer>
  );
}
