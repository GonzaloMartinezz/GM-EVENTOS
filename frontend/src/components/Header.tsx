import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Navbar Pre-Scroll (Transparente, solo GM EVENTS y Hamburguesa) */}
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 flex items-center justify-between px-6 lg:px-12 h-24 ${isScrolled ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100 bg-transparent'}`}
      >
        <Link to="/" className="font-display text-3xl lg:text-5xl uppercase tracking-tighter text-white hover:text-[#ff3c00] transition-colors mix-blend-difference">
          GM EVENTS
        </Link>
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white hover:text-[#ff3c00] transition-colors mix-blend-difference"
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </header>

      {/* Navbar Al Scrollear (Flotante, Dropdowns) */}
      <header 
        className={`fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-7xl z-[60] transition-all duration-500 rounded-2xl ${isScrolled ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}
      >
        <div className="bg-[#f5f1e8] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] border border-black/10 rounded-2xl flex items-center justify-between px-6 lg:px-8 h-20">
          
          <Link to="/" className="font-display text-2xl lg:text-3xl uppercase tracking-tighter text-black hover:text-[#ff3c00] transition-colors">
            GM EVENTS
          </Link>

          <nav className="hidden lg:flex items-center gap-12">
            
            {/* Dropdown 1: Connect */}
            <div 
              className="relative group"
              onMouseEnter={() => setActiveDropdown('connect')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-2 font-mono text-sm uppercase font-bold tracking-widest text-black hover:text-[#ff3c00] transition-colors">
                Conectar
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-400 group-hover:bg-[#ff3c00] animate-pulse"></div>
              </button>

              <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 w-48 bg-[#1f242e] border-t-4 border-[#ff3c00] p-2 transition-all duration-300 ${activeDropdown === 'connect' ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-2 invisible'}`}>
                <div className="flex flex-col">
                  <a href="#" className="font-mono text-xs uppercase tracking-widest text-[#f5f1e8] hover:text-[#ff3c00] p-3 transition-colors">Artistas</a>
                  <a href="#" className="font-mono text-xs uppercase tracking-widest text-[#f5f1e8] hover:text-[#ff3c00] p-3 transition-colors">Productores</a>
                  <a href="#" className="font-mono text-xs uppercase tracking-widest text-[#f5f1e8] hover:text-[#ff3c00] p-3 transition-colors">Prensa</a>
                </div>
              </div>
            </div>

            {/* Dropdown 2: Cultivate */}
            <div 
              className="relative group"
              onMouseEnter={() => setActiveDropdown('cultivate')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-2 font-mono text-sm uppercase font-bold tracking-widest text-black hover:text-[#ff3c00] transition-colors">
                Cultivar
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-400 group-hover:bg-[#ff3c00] animate-pulse"></div>
              </button>

              <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 w-48 bg-[#1f242e] border-t-4 border-[#ff3c00] p-2 transition-all duration-300 ${activeDropdown === 'cultivate' ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-2 invisible'}`}>
                <div className="flex flex-col">
                  <a href="#" className="font-mono text-xs uppercase tracking-widest text-[#f5f1e8] hover:text-[#ff3c00] p-3 transition-colors">Talleres</a>
                  <a href="#" className="font-mono text-xs uppercase tracking-widest text-[#f5f1e8] hover:text-[#ff3c00] p-3 transition-colors">Conferencias</a>
                  <a href="#" className="font-mono text-xs uppercase tracking-widest text-[#f5f1e8] hover:text-[#ff3c00] p-3 transition-colors">Networking</a>
                </div>
              </div>
            </div>

            {/* Link simple */}
            <Link to="/about" className="font-mono text-sm uppercase font-bold tracking-widest text-black hover:text-[#ff3c00] transition-colors">
              Nosotros
            </Link>

            <Link to="/admin/login" className="font-mono text-sm uppercase font-bold tracking-widest text-neutral-500 hover:text-[#ff3c00] transition-colors">
              [Panel Admin]
            </Link>

          </nav>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-black hover:text-[#ff3c00] transition-colors"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </header>

      {/* Menu Overlay Movil */}
      <div className={`fixed inset-0 z-50 bg-black transition-all duration-500 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <div className="absolute top-6 right-6 lg:top-12 lg:right-12">
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="text-white hover:text-[#ff3c00] transition-colors"
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div className="h-full flex flex-col items-center justify-center gap-8">
          <Link to="/agenda" onClick={() => setIsMenuOpen(false)} className="font-display text-5xl lg:text-7xl uppercase tracking-tighter text-white hover:text-[#ff3c00] transition-colors">Agenda</Link>
          <Link to="/artistas" onClick={() => setIsMenuOpen(false)} className="font-display text-5xl lg:text-7xl uppercase tracking-tighter text-white hover:text-[#ff3c00] transition-colors">Artistas</Link>
          <Link to="/talleres" onClick={() => setIsMenuOpen(false)} className="font-display text-5xl lg:text-7xl uppercase tracking-tighter text-white hover:text-[#ff3c00] transition-colors">Talleres</Link>
          <Link to="/about" onClick={() => setIsMenuOpen(false)} className="font-display text-5xl lg:text-7xl uppercase tracking-tighter text-white hover:text-[#ff3c00] transition-colors">Nosotros</Link>
        </div>
      </div>
    </>
  );
}
