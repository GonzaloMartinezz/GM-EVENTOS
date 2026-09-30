import React, { useState, useEffect } from 'react';


export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cookieConsent, setCookieConsent] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    // Check local storage for cookie consent on mount
    const consent = localStorage.getItem('gm_events_cookie_consent');
    if (!consent) {
      setCookieConsent(false);
    }
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem('gm_events_cookie_consent', 'true');
    setCookieConsent(true);
  };

  useEffect(() => {
    let scrollTimeout: any;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 100) {
        setIsScrolled(true);
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          setIsScrolled(false);
        }, 1500); // Hides 1.5s after scroll stops
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <div className="bg-[#0b0b0b] text-on-surface font-mono antialiased selection:bg-accent selection:text-white">
      

{/* ================= MINIMALIST ABSOLUTE NAVBAR (ONLY AT TOP) ================= */}
<div className="absolute top-0 left-0 w-full z-40 flex items-center justify-between px-6 lg:px-12 h-24">
  <a href="#" className="flex items-center gap-2 group">
    <span className="bg-[#ff3c00] text-white font-display text-2xl lg:text-3xl uppercase px-2.5 py-1 tracking-tighter leading-none group-hover:bg-white group-hover:text-black transition-colors">GM</span>
    <span className="font-display text-xl lg:text-2xl uppercase tracking-widest text-white group-hover:text-[#ff3c00] transition-colors leading-none">EVENTS</span>
  </a>
  <button onClick={() => setIsMenuOpen(true)} className="text-white hover:text-[#ff3c00] transition-colors">
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
  </button>
</div>

{/* ================= SCROLL NAVBAR (EXPANDED) ================= */}
<header className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500 h-24 bg-[#f5f1e8] shadow-[0_4px_0_#000] border-b-4 border-black ${isScrolled ? 'translate-y-0' : '-translate-y-full'}`}>
  <div className="absolute inset-0 flex items-center justify-between px-6 lg:px-12">
    
    {/* Left Links with Dropdowns */}
    <nav className="hidden xl:flex items-center gap-10">
      {[
        { name: 'AGENDA', sub: ['HOY', 'ESTE FINDE', 'ESTE MES'] },
        { name: 'SALAS', sub: ['MÚSICA EN VIVO', 'TEATROS', 'CENTROS CULTURALES'] },
        { name: 'CIRCUITOS', sub: ['CENTRO', 'YERBA BUENA', 'TAFÍ VIEJO'] },
        { name: 'NOSOTROS', sub: ['QUIÉNES SOMOS', 'MANIFIESTO'] }
      ].map((item) => (
        <div 
          key={item.name} 
          className="relative group"
          onMouseEnter={() => setActiveDropdown(item.name)}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          <a href={`#${item.name.toLowerCase()}`} className="font-display text-lg lg:text-xl uppercase tracking-widest text-black hover:text-[#ff3c00] transition-colors py-8 flex items-center gap-1">
            {item.name}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={`transition-transform duration-300 ${activeDropdown === item.name ? 'rotate-180' : ''}`}><polyline points="6 9 12 15 18 9"></polyline></svg>
          </a>
          
          {/* Dropdown Menu */}
          <div className={`absolute top-full left-0 bg-black border-4 border-black shadow-[4px_4px_0_#ff3c00] flex flex-col min-w-[220px] transition-all duration-300 origin-top ${activeDropdown === item.name ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}`}>
            {item.sub.map((subItem) => (
              <a key={subItem} href="#" className="font-display text-sm uppercase tracking-widest text-white hover:text-black hover:bg-[#ff3c00] px-4 py-3 transition-colors border-b border-white/20 last:border-0">
                {subItem}
              </a>
            ))}
          </div>
        </div>
      ))}
    </nav>

    {/* Center Logo */}
    <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
      <a href="#" className="inline-block transform -rotate-2 hover:rotate-0 transition-transform duration-300 group">
        <div className="bg-[#ff3c00] text-white border-4 border-black px-5 py-2 shadow-[4px_4px_0px_#000] group-hover:bg-white group-hover:text-black transition-colors">
          <h1 className="font-display text-2xl md:text-3xl lg:text-4xl uppercase tracking-tighter leading-none m-0">
            TUCUMÁN CULTURA
          </h1>
          <span className="block bg-black text-white group-hover:text-[#ff3c00] font-mono text-[8px] md:text-[10px] text-center uppercase tracking-widest mt-1 py-0.5 transition-colors">
            CLUB ABIERTO
          </span>
        </div>
      </a>
    </div>

    {/* Right Section: Search & Contact */}
    <div className="hidden xl:flex items-center gap-6">
      <div className="relative group w-64">
        <input 
          type="text" 
          placeholder="BUSCAR EVENTO..." 
          className="w-full bg-white border-4 border-black font-display uppercase tracking-widest text-sm px-4 py-2 text-black focus:outline-none focus:border-[#ff3c00] focus:shadow-[4px_4px_0_#ff3c00] transition-all"
        />
        <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
      </div>
      
      <a href="#contacto" className="font-display text-lg lg:text-xl uppercase tracking-widest text-black hover:text-[#ff3c00] transition-colors">
        CONTACTO
      </a>
    </div>

    {/* Mobile Hamburger (Only visible on small screens when scrolled) */}
    <button onClick={() => setIsMenuOpen(true)} className="xl:hidden text-black hover:text-[#ff3c00] transition-colors ml-auto relative z-10">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
    </button>
  </div>
</header>

{/* SIDE PANEL MENU HAMBURGUESA */}
<div className={`fixed inset-0 z-[100] transition-all duration-500 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
  {/* Fondo semitransparente */}
  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
  
  {/* Panel lateral */}
  <div className={`absolute top-0 right-0 h-full w-full md:w-[650px] bg-[#f5f1e8] shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-center px-8 md:px-12 md:rounded-l-3xl overflow-hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
    
    <button onClick={() => setIsMenuOpen(false)} className="absolute top-8 right-8 text-black hover:text-[#ff3c00] transition-colors z-10">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </button>

    <nav className="flex flex-col justify-center h-full gap-0 py-10 relative z-0">
      {['AGENDA', 'SALAS', 'CIRCUITOS', 'NOSOTROS', 'CONTACTO', 'PUBLICAR FECHA'].map((item) => (
        <a 
          key={item} 
          href={`#${item.toLowerCase().replace(' ', '-')}`} 
          onClick={() => setIsMenuOpen(false)} 
          style={{ fontFamily: "'Anton', sans-serif" }}
          className={`text-[15vw] sm:text-[12vw] md:text-[5rem] lg:text-[5.5rem] leading-[0.8] uppercase tracking-normal transition-colors py-1 whitespace-nowrap text-left ${item === 'CONTACTO' ? 'text-[#ff3c00]' : 'text-black hover:text-[#ff3c00]'}`}
        >
          {item}
        </a>
      ))}
    </nav>
  </div>
</div>


{/* ================= HERO EDITORIAL BANNER ================= */}
<section className="relative w-full h-screen min-h-[600px] lg:min-h-[800px] flex items-center justify-center overflow-hidden border-b-4 border-white bg-black">
  <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-100 pointer-events-none">
    <source src="/hero-bg.mp4" type="video/mp4" />
  </video>
  
  <div className="absolute inset-0 bg-black/20"></div>
  
  <div className="relative z-10 w-full h-full flex flex-col items-center justify-end px-2 sm:px-4 pb-0">
    
    <div className="flex flex-wrap items-center justify-center gap-x-[2vw] gap-y-2 w-full text-white uppercase tracking-tighter text-[10vw] sm:text-[8vw] md:text-[6vw] leading-[0.9]" style={{ fontFamily: "'Anton', sans-serif" }}>
      <span>BUSCA TU</span>
      <span className="relative inline-block whitespace-nowrap">
        EVENTO
        <svg className="absolute -inset-[1vw] w-[calc(100%+2vw)] h-[calc(100%+2vw)] text-white/80 pointer-events-none" viewBox="0 0 200 100" preserveAspectRatio="none">
          <ellipse cx="100" cy="50" rx="90" ry="40" fill="none" stroke="currentColor" strokeWidth="4" className="drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
        </svg>
      </span>
    </div>
    
    <h1 
      style={{ fontFamily: "'Anton', sans-serif" }}
      className="text-[#ff3c00] text-[26vw] leading-[0.75] uppercase tracking-normal w-full text-center mt-0 sm:mt-2 drop-shadow-[0_10px_30px_rgba(255,60,0,0.4)] select-none transition-transform duration-500 hover:scale-[1.02] cursor-crosshair m-0 p-0"
    >
      FAVORITO
    </h1>
    
  </div>
</section>
{/* ================= NEW COMPONENT: VIVÍ LA CULTURA (ORIGINAL DESIGN) ================= */}
<section className="w-full bg-[#f4f2f0] relative pt-20 pb-10 overflow-hidden border-b-2 border-black">
  <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
    {/* Giant Title */}
    <h2 className="font-display text-[15vw] md:text-[12vw] leading-[0.8] uppercase tracking-tighter text-black text-center relative z-0 md:translate-y-12">
      VIVÍ LA<br/>
      <span className="text-[#ff3c00] relative z-20">CULTURA</span>
    </h2>

    {/* Big Rounded Image Overlapping the Title */}
    <div className="group relative w-full aspect-[16/9] md:aspect-[21/9] rounded-[2rem] overflow-hidden mt-[-10vw] md:mt-[-8vw] z-10 border-4 border-black shadow-2xl bg-black transition-transform duration-700 hover:scale-[1.02] hover:shadow-[12px_12px_0px_#ff3c00] cursor-pointer">
      <img src="/screen.png" alt="Crowd at a concert" className="w-full h-full object-cover opacity-80" />
      
      {/* Top Left Pill */}
      <div className="absolute top-6 left-6 bg-white rounded-full px-4 py-2 flex items-center gap-2 border-2 border-black shadow-[4px_4px_0px_#000]">
        <div className="w-2.5 h-2.5 rounded-full bg-[#ff3c00]"></div>
        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-black">MÚSICA EN VIVO • TEATRO • FERIAS</span>
      </div>

      {/* Bottom Left Text */}
      <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 max-w-xl">
        <span className="font-mono text-xs md:text-sm text-[#ff3c00] font-bold uppercase tracking-widest bg-black px-2 py-1">AGENDA AUTOGESTIVA 2025</span>
        <h3 className="font-display text-4xl md:text-5xl lg:text-6xl text-white uppercase tracking-tighter leading-[0.9] mt-3 drop-shadow-md">
          ESPECTÁCULOS, BANDAS EN VIVO Y<br/>
          ESPACIOS INDEPENDIENTES.
        </h3>
      </div>

      {/* Bottom Right Button */}
      <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12">
        <a href="#lineup" className="group/btn inline-flex items-center gap-2 bg-[#ff3c00] text-white font-display text-xl md:text-2xl uppercase tracking-widest px-8 py-4 rounded-full border-2 border-black hover:bg-white hover:text-black transition-all shadow-[4px_4px_0px_#000] hover:shadow-[8px_8px_0px_#000] active:translate-y-1 active:shadow-[2px_2px_0px_#000]">
          EXPLORAR CARTELERA
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover/btn:translate-x-2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </a>
      </div>
    </div>
  </div>

  {/* Scrolling Marquee */}
  <div className="w-full border-y-2 border-black bg-[#f4f2f0] mt-16 py-4 overflow-hidden relative flex">
    <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="flex items-center gap-8">
          {[
            'TEATRO SAN MARTÍN', 'CASA MANAGUA', 'CENTRO CULTURAL VIRLA', 
            'PATIO LORCA', 'MAGIC MUSIC BOX', 'PANGEA AUTOGESTIÓN'
          ].map((venue, j) => (
            <span key={`${i}-${j}`} className="flex items-center gap-3 font-display text-2xl uppercase tracking-widest text-black">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#ff3c00" stroke="#ff3c00" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              {venue}
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
</section>

{/* ================= COMPONENTE 1: TRÍPTICO RETICULAR "WE MAKE CROWDS FEEL" (REF: IMAGE_3) ================= */}
{/* ================= NUEVO COMPONENTE: FESTIVAL SCHEDULE // GRID CROMÁTICA DE HORARIOS (REF: IMAGE_27) ================= */}<section className="w-full py-16 lg:py-24 border-b border-surface-border bg-accent text-black relative" id="festival-schedule"><div className="max-w-[1440px] mx-auto px-6 lg:px-12"><div className="flex flex-col md:flex-row md:items-baseline justify-between mb-8 pb-3 border-b-2 border-black gap-4"><div className="flex items-center gap-3"><span className="text-black font-display text-xl">01 //</span><h2 className="font-display text-2xl lg:text-3xl uppercase tracking-tight text-black">FESTIVAL SCHEDULE // GRID CROMÁTICA DE HORARIOS</h2></div><span className="text-black/80 text-[11px] font-mono tracking-widest font-bold hidden sm:inline-block">INSPIRADO EN GROOVE WAVE FESTIVAL POSTER</span></div>{/* Contenedor Maestro Festival Schedule */}<div className="bg-accent border-4 border-black p-6 sm:p-10 lg:p-14 shadow-2xl relative">{/* Header Festival con branding GROOVE WAVE */}<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b-2 border-black pb-6"><div className="inline-block bg-black text-white px-6 py-4 shadow-lg"><h3 className="font-display text-5xl sm:text-7xl lg:text-8xl tracking-tight uppercase leading-[0.88]">FESTIVAL<br /><span className="text-accent">SCHEDULE</span></h3></div><div className="flex flex-col items-start md:items-end gap-2"><div className="bg-black text-white font-display text-base uppercase px-3 py-1 tracking-widest shadow">GROOVE WAVE // TUC</div><div className="bg-white text-black font-mono text-xs font-bold uppercase px-3 py-1 tracking-wider border border-black">HORARIOS POR ESCENARIOS</div></div></div>{/* Sub-cabeceras de Meta: Fecha y Locación */}<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10"><div className="bg-white text-black p-4 border-2 border-black shadow-[4px_4px_0px_#000]"><span className="font-mono text-[10px] uppercase font-bold text-neutral-600 block mb-0.5">FECHA &amp; RANGO HORARIO</span><p className="font-display text-2xl sm:text-3xl uppercase tracking-tight">15 MARZO 2025 // 12:00 A 24:00 HS</p></div><div className="bg-white text-black p-4 border-2 border-black shadow-[4px_4px_0px_#000]"><span className="font-mono text-[10px] uppercase font-bold text-neutral-600 block mb-0.5">SEDE CENTRAL</span><p className="font-display text-2xl sm:text-3xl uppercase tracking-tight">ESTADIO CENTRAL CÓRDOBA // METRÓPOLIS</p></div></div>{/* Grilla de Horarios 2 Columnas con Tarjetas Blancas y Bloques Negros */}<div className="grid grid-cols-1 md:grid-cols-2 gap-6">{/* Item 1 */}<div className="bg-white border-2 border-black p-6 shadow-[6px_6px_0px_#000] flex flex-col justify-between min-h-[170px] hover:translate-x-0.5 hover:translate-y-0.5 transition-transform"><div className="inline-block bg-black text-white font-display text-xl sm:text-2xl px-4 py-1 self-start mb-3">12:00 PM</div><div><h4 className="font-display text-3xl uppercase tracking-tight text-black leading-tight">OPENING CEREMONY</h4><p className="font-mono text-xs font-bold text-neutral-700 mt-1 uppercase">APERTURA DE PUERTAS, FERIA DE SELLOS Y BIENVENIDA ESPECTACULAR</p></div><div className="mt-4 pt-3 border-t border-black/20 flex justify-between items-center text-[10px] font-mono font-bold"><span className="">ESCENARIO CENTRAL</span><span className="text-accent font-black uppercase">ACCESO LIBRE CON TICKET</span></div></div>{/* Item 2 */}<div className="bg-white border-2 border-black p-6 shadow-[6px_6px_0px_#000] flex flex-col justify-between min-h-[170px] hover:translate-x-0.5 hover:translate-y-0.5 transition-transform"><div className="inline-block bg-black text-white font-display text-xl sm:text-2xl px-4 py-1 self-start mb-3">01:00 PM</div><div><h4 className="font-display text-3xl uppercase tracking-tight text-black leading-tight">LIVE MUSIC PERFORMANCES</h4><p className="font-mono text-xs font-bold text-neutral-700 mt-1 uppercase">PRESENTACIONES EN VIVO DE ARTISTAS DESTACADOS LOCALES E INTERNACIONALES</p></div><div className="mt-4 pt-3 border-t border-black/20 flex justify-between items-center text-[10px] font-mono font-bold"><span className="">ESCENARIO B</span><span className="text-black font-black uppercase">LIVE BAND NOA</span></div></div>{/* Item 3 */}<div className="bg-white border-2 border-black p-6 shadow-[6px_6px_0px_#000] flex flex-col justify-between min-h-[170px] hover:translate-x-0.5 hover:translate-y-0.5 transition-transform"><div className="inline-block bg-black text-white font-display text-xl sm:text-2xl px-4 py-1 self-start mb-3">03:00 PM</div><div><h4 className="font-display text-3xl uppercase tracking-tight text-black leading-tight">CULTURAL SHOWCASES</h4><p className="font-mono text-xs font-bold text-neutral-700 mt-1 uppercase">INTERVENCIONES AUDIOVISUALES, DANZA CONTEMPORÁNEA Y RELATOS EN VIVO</p></div><div className="mt-4 pt-3 border-t border-black/20 flex justify-between items-center text-[10px] font-mono font-bold"><span className="">DOMO MULTIDISCIPLINAR</span><span className="text-black font-black uppercase">PERFORMANCE NOA</span></div></div>{/* Item 4 */}<div className="bg-white border-2 border-black p-6 shadow-[6px_6px_0px_#000] flex flex-col justify-between min-h-[170px] hover:translate-x-0.5 hover:translate-y-0.5 transition-transform"><div className="inline-block bg-black text-white font-display text-xl sm:text-2xl px-4 py-1 self-start mb-3">05:00 PM</div><div><h4 className="font-display text-3xl uppercase tracking-tight text-black leading-tight">FOOD &amp; CRAFT MARKET</h4><p className="font-mono text-xs font-bold text-neutral-700 mt-1 uppercase">FERIA GASTRONÓMICA AUTÓCTONA, VINILOS INDEPENDIENTES Y MERCADO DE ARTE</p></div><div className="mt-4 pt-3 border-t border-black/20 flex justify-between items-center text-[10px] font-mono font-bold"><span className="">PLAZA DE SABORES</span><span className="text-black font-black uppercase">FERIA NOA</span></div></div>{/* Item 5 */}<div className="bg-white border-2 border-black p-6 shadow-[6px_6px_0px_#000] flex flex-col justify-between min-h-[170px] hover:translate-x-0.5 hover:translate-y-0.5 transition-transform"><div className="inline-block bg-black text-white font-display text-xl sm:text-2xl px-4 py-1 self-start mb-3">07:00 PM</div><div><h4 className="font-display text-3xl uppercase tracking-tight text-black leading-tight">HEADLINER PERFORMANCE</h4><p className="font-mono text-xs font-bold text-neutral-700 mt-1 uppercase">DIVIDIDOS // SHOW PRINCIPAL CON SONIDO ENVOLVENTE Y PUESTA MONUMENTAL</p></div><div className="mt-4 pt-3 border-t border-black/20 flex justify-between items-center text-[10px] font-mono font-bold"><span className="">MAIN STAGE CENTRAL</span><span className="text-accent font-black uppercase">IMPERDIBLE DE LA NOCHE</span></div></div>{/* Item 6 */}<div className="bg-white border-2 border-black p-6 shadow-[6px_6px_0px_#000] flex flex-col justify-between min-h-[170px] hover:translate-x-0.5 hover:translate-y-0.5 transition-transform"><div className="inline-block bg-black text-white font-display text-xl sm:text-2xl px-4 py-1 self-start mb-3">09:30 PM</div><div><h4 className="font-display text-3xl uppercase tracking-tight text-black leading-tight">GRAND FINALE &amp; CLOSING</h4><p className="font-mono text-xs font-bold text-neutral-700 mt-1 uppercase">CIERRE CON DJ VÓRTEX, SHOW DE LÁSERES, PIROTECNIA FRÍA Y CELEBRACIÓN</p></div><div className="mt-4 pt-3 border-t border-black/20 flex justify-between items-center text-[10px] font-mono font-bold"><span className="">ESCENARIO 360°</span><span className="text-black font-black uppercase">FIESTA HASTA 02:00 AM</span></div></div></div>{/* Footer de la sección Festival Schedule */}<div className="mt-10 pt-4 border-t-2 border-black flex flex-wrap justify-between items-center text-xs font-mono font-bold uppercase gap-4"><span className="">SEGUINOS EN @MADE.WITHKITTL // @TUCUMANCULTURA</span><a className="bg-black text-white px-6 py-2 font-display text-sm tracking-wider hover:bg-white hover:text-black transition-colors" href="https://www.passline.com" rel="noreferrer" target="_blank">COMPRAR ENTRADAS // WWW.PASSLINE.COM ↗</a></div></div></div></section>{/* ================= NUEVO COMPONENTE: SCHEDULE OF ACTIVITIES // BLOQUES TIPOGRÁFICOS APILADOS CON CORTE VERTICAL (REF: IMAGE_25) ================= */}<section className="w-full py-16 lg:py-24 border-b border-surface-border bg-[#0e0e0e]" id="activities-schedule"><div className="max-w-[1440px] mx-auto px-6 lg:px-12"><div className="flex flex-col md:flex-row md:items-baseline justify-between mb-8 pb-3 border-b border-surface-border gap-4"><div className="flex items-center gap-3"><span className="text-accent font-display text-xl">02 //</span><h2 className="font-display text-2xl lg:text-3xl uppercase tracking-tight text-white">SCHEDULE OF ACTIVITIES // BLOQUES TIPOGRÁFICOS APILADOS</h2></div><span className="text-on-surface-subtle text-[11px] font-mono tracking-widest hidden sm:inline-block">INSPIRADO EN FORMATO POSTER KNOT / KITTL</span></div>{/* Estructura Poster Dividida: Cabecera Monumental Vertical + Bloques de Color */}<div className="border-2 border-surface-border bg-white text-black p-6 sm:p-10 lg:p-14 shadow-2xl">{/* Top Header Poster con Bloques Azul/Naranja de Fecha y Lugar */}<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6"><div className="text-[11px] font-mono font-bold uppercase tracking-wider text-black">GROWTH // CREATIVE<br />TUCUMÁN LABS</div><div className="flex items-center gap-2"><span className="bg-black text-white font-mono text-xs font-bold uppercase px-3 py-1.5 rounded">15 MARZO 2025</span><span className="bg-accent text-white font-mono text-xs font-bold uppercase px-3 py-1.5 rounded">STARFALL CENTER // TUC</span></div></div>{/* Título Monumental SCHEDULE OF ACTIVITIES */}<div className="border-b-4 border-black pb-8 mb-8"><h3 className="font-display text-6xl sm:text-8xl md:text-9xl uppercase tracking-tighter leading-[0.85] text-black select-none">SCHEDULE<br /><span className="text-accent">OF ACTIVITIES</span></h3></div>{/* Bloques Modulares Apilados con Formato de Tarjeta y Flecha ↘ */}<div className="space-y-4">{/* Bloque 1: 09:00 AM (Negro con acentos blancos) */}<div className="bg-black text-white p-6 sm:p-8 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-[#181818] transition-colors border-2 border-black"><div className="flex items-start gap-4 md:w-1/3"><span className="text-2xl text-accent font-bold select-none">↘</span><div><span className="font-display text-4xl sm:text-5xl uppercase tracking-tight block leading-none text-white">09:00 AM</span><span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 mt-1 block">RECEPCIÓN &amp; ACREDITACIÓN</span></div></div><div className="md:w-2/3 border-t md:border-t-0 md:border-l border-white/20 pt-4 md:pt-0 md:pl-8"><h4 className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-accent">Registration &amp; Welcome Session</h4><p className="font-mono text-xs text-neutral-300 mt-2 leading-relaxed">Los participantes realizan su acreditación y reciben el kit de materiales analógicos. Breve introducción al cronograma de talleres del día y bienvenida institucional.</p></div></div>{/* Bloque 2: 10:00 AM (Naranja Eléctrico #ff3c00 / Accent) */}<div className="bg-accent text-black p-6 sm:p-8 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-accent-soft transition-colors border-2 border-black"><div className="flex items-start gap-4 md:w-1/3"><span className="text-2xl text-black font-bold select-none">↘</span><div><span className="font-display text-4xl sm:text-5xl uppercase tracking-tight block leading-none text-black">10:00 AM</span><span className="text-[10px] font-mono uppercase tracking-widest text-black/80 mt-1 block font-bold">TALLER PRÁCTICO</span></div></div><div className="md:w-2/3 border-t md:border-t-0 md:border-l border-black/30 pt-4 md:pt-0 md:pl-8"><h4 className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-white">Hands-On Creative Activities</h4><p className="font-mono text-xs text-black font-bold mt-2 leading-relaxed">Exploración de artes gráficas, fanzine brutalista y modulares analógicos. Experimentación con texturas, tipografía física y paletas guiada por especialistas de la región.</p></div></div>{/* Bloque 3: 01:00 PM (Negro y Blanco con acentos tiza) */}<div className="bg-black text-white p-6 sm:p-8 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-[#181818] transition-colors border-2 border-black"><div className="flex items-start gap-4 md:w-1/3"><span className="text-2xl text-accent font-bold select-none">↘</span><div><span className="font-display text-4xl sm:text-5xl uppercase tracking-tight block leading-none text-white">01:00 PM</span><span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 mt-1 block">LABORATORIO COLECTIVO</span></div></div><div className="md:w-2/3 border-t md:border-t-0 md:border-l border-white/20 pt-4 md:pt-0 md:pl-8"><h4 className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-white">Advanced Techniques &amp; Collaboration</h4><p className="font-mono text-xs text-neutral-300 mt-2 leading-relaxed">Arte de técnica mixta: combina audio modular, grabado y diseño editorial para producir obras y afiches de edición limitada para el archivo cultural.</p></div></div></div>{/* Footer de las actividades */}<div className="mt-8 pt-4 border-t-2 border-black flex flex-wrap justify-between items-center text-xs font-mono font-bold uppercase gap-4"><span className="bg-black text-white px-3 py-1">FOLLOW US @MADE.WITHKITTL // @TUCUMANCULTURA</span><a className="bg-accent text-white px-6 py-2 font-display text-xs uppercase tracking-wider hover:bg-black transition-colors" href="https://www.passline.com" rel="noreferrer" target="_blank">INSCRIBIRSE ONLINE // WWW.MADEWITHKITTL.COM ↗</a></div></div></div></section>{/* ================= NUEVO COMPONENTE: CALENDARIO MATRIX // BUTACAS & PANTALLA (REF: IMAGE_26) ================= */}<section className="w-full py-16 lg:py-24 border-b border-surface-border bg-black relative" id="calendario-matrix"><div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10"><div className="flex flex-col md:flex-row md:items-baseline justify-between mb-8 pb-3 border-b border-surface-border gap-4"><div className="flex items-center gap-3"><span className="text-accent font-display text-xl">03 //</span><h2 className="font-display text-2xl lg:text-3xl uppercase tracking-tight text-white">CALENDARIO MATRIX // BUTACAS &amp; PANTALLA</h2></div><span className="text-on-surface-subtle text-[11px] font-mono tracking-widest hidden sm:inline-block">INSPIRADO EN CARTELERA RETICULAR START 21 • 4X5 GRID</span></div><div className="border-2 border-surface-border/80 bg-[#070908] max-w-4xl mx-auto p-6 sm:p-10 lg:p-14 shadow-2xl relative overflow-hidden rounded-3xl"><div className="absolute inset-0 pointer-events-none opacity-40"><svg className="w-full h-full object-cover" preserveAspectRatio="none" viewBox="0 0 800 650" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="cinemaGlow" cx="50%" cy="15%" r="65%"><stop offset="0%" stopColor="#84cc16" stopOpacity="0.22"></stop><stop offset="40%" stopColor="#10b981" stopOpacity="0.08"></stop><stop offset="100%" stopColor="#050505" stopOpacity="0"></stop></radialGradient></defs><rect width="800" height="650" fill="url(#cinemaGlow)" /><g stroke="rgba(255,255,255,0.06)" strokeWidth="1.5"><ellipse cx="400" cy="620" rx="540" ry="140" fill="none" /><ellipse cx="400" cy="560" rx="480" ry="120" fill="none" /><ellipse cx="400" cy="500" rx="420" ry="100" fill="none" /><ellipse cx="400" cy="440" rx="360" ry="80" fill="none" /></g><g fill="rgba(0,0,0,0.65)" stroke="rgba(255,255,255,0.07)" strokeWidth="1"><rect x="110" y="460" width="46" height="34" rx="8" /><rect x="175" y="460" width="46" height="34" rx="8" /><rect x="240" y="460" width="46" height="34" rx="8" /><rect x="305" y="460" width="46" height="34" rx="8" /><rect x="370" y="460" width="46" height="34" rx="8" /><rect x="435" y="460" width="46" height="34" rx="8" /><rect x="500" y="460" width="46" height="34" rx="8" /><rect x="565" y="460" width="46" height="34" rx="8" /><rect x="630" y="460" width="46" height="34" rx="8" /><rect x="75" y="515" width="52" height="38" rx="10" /><rect x="145" y="515" width="52" height="38" rx="10" /><rect x="215" y="515" width="52" height="38" rx="10" /><rect x="285" y="515" width="52" height="38" rx="10" /><rect x="355" y="515" width="52" height="38" rx="10" /><rect x="425" y="515" width="52" height="38" rx="10" /><rect x="495" y="515" width="52" height="38" rx="10" /><rect x="565" y="515" width="52" height="38" rx="10" /><rect x="635" y="515" width="52" height="38" rx="10" /><rect x="705" y="515" width="52" height="38" rx="10" /></g></svg></div><div className="relative z-10 text-center mb-8"><div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#e5e2e1] text-[11px] font-mono tracking-widest lowercase mb-2"><span className="">august</span><span className="text-accent">//</span><span className="">abril tucumán</span></div><h3 className="text-white font-display text-6xl sm:text-8xl lg:text-[90px] lowercase tracking-tight leading-none drop-shadow-md">events</h3><p className="font-mono text-neutral-400 text-xs mt-2 tracking-wider uppercase">CARTELERA RETICULAR DE PROYECCIONES &amp; CINE EXPERIMENTAL</p></div><div className="relative z-10 grid grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto"><div className="aspect-square bg-white/[0.04] border-2 border-white/20 rounded-2xl sm:rounded-3xl p-3 flex flex-col justify-between items-center text-center backdrop-blur-sm hover:border-white/40 transition-colors"><span className="font-mono text-[10px] text-neutral-500 font-bold self-start">01</span><span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest">LIBRE</span></div><div className="aspect-square bg-white/[0.04] border-2 border-white/20 rounded-2xl sm:rounded-3xl p-3 flex flex-col justify-between items-center text-center backdrop-blur-sm hover:border-white/40 transition-colors"><span className="font-mono text-[10px] text-neutral-500 font-bold self-start">02</span><span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest">LIBRE</span></div><div className="aspect-square bg-white/[0.04] border-2 border-white/20 rounded-2xl sm:rounded-3xl p-3 flex flex-col justify-between items-center text-center backdrop-blur-sm hover:border-white/40 transition-colors"><span className="font-mono text-[10px] text-neutral-500 font-bold self-start">03</span><span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest">LIBRE</span></div><div className="aspect-square bg-white/[0.04] border-2 border-white/20 rounded-2xl sm:rounded-3xl p-3 flex flex-col justify-between items-center text-center backdrop-blur-sm hover:border-white/40 transition-colors"><span className="font-mono text-[10px] text-neutral-500 font-bold self-start">04</span><span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest">LIBRE</span></div><div className="aspect-square bg-white/[0.04] border-2 border-white/20 rounded-2xl sm:rounded-3xl p-3 flex flex-col justify-between items-center text-center backdrop-blur-sm hover:border-white/40 transition-colors"><span className="font-mono text-[10px] text-neutral-500 font-bold self-start">07</span><span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest">LIBRE</span></div><div className="aspect-square bg-white text-black border-2 border-white rounded-2xl sm:rounded-3xl p-2.5 sm:p-3 flex flex-col justify-between items-center text-center shadow-2xl hover:scale-105 transition-transform"><span className="font-display text-3xl sm:text-4xl leading-none text-black">8</span><div className="font-mono text-[9px] sm:text-[10px] uppercase font-bold leading-tight text-black">Cartoon Time<br /><span className="text-neutral-600 font-bold">10:00</span></div></div><div className="aspect-square bg-[#e2f952] text-black border-2 border-black rounded-2xl sm:rounded-3xl p-2.5 sm:p-3 flex flex-col justify-between items-center text-center shadow-2xl hover:scale-105 transition-transform"><span className="font-display text-3xl sm:text-4xl leading-none text-black font-black">10</span><div className="font-mono text-[9px] sm:text-[10px] uppercase font-black leading-tight text-black">CDI Mock<br /><span className="text-black/80 font-black">09:00/14:00</span></div></div><div className="aspect-square bg-white/[0.04] border-2 border-white/20 rounded-2xl sm:rounded-3xl p-3 flex flex-col justify-between items-center text-center backdrop-blur-sm hover:border-white/40 transition-colors"><span className="font-mono text-[10px] text-neutral-500 font-bold self-start">11</span><span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest">LIBRE</span></div><div className="aspect-square bg-white/[0.04] border-2 border-white/20 rounded-2xl sm:rounded-3xl p-3 flex flex-col justify-between items-center text-center backdrop-blur-sm hover:border-white/40 transition-colors"><span className="font-mono text-[10px] text-neutral-500 font-bold self-start">14</span><span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest">LIBRE</span></div><div className="aspect-square bg-white text-black border-2 border-white rounded-2xl sm:rounded-3xl p-2.5 sm:p-3 flex flex-col justify-between items-center text-center shadow-2xl hover:scale-105 transition-transform"><span className="font-display text-3xl sm:text-4xl leading-none text-black">15</span><div className="font-mono text-[9px] sm:text-[10px] uppercase font-bold leading-tight text-black">Spelling Bee<br /><span className="text-neutral-600 font-bold">10:00</span></div></div><div className="aspect-square bg-white/[0.04] border-2 border-[#e2f952]/60 rounded-2xl sm:rounded-3xl p-3 flex flex-col justify-between items-center text-center backdrop-blur-sm shadow-[0_0_12px_rgba(226,249,82,0.25)]"><span className="font-mono text-[10px] text-[#e2f952] font-bold self-start">16</span><div className="text-center"><span className="w-2 h-2 rounded-full bg-[#e2f952] inline-block animate-pulse mb-1"></span><span className="font-mono text-[8px] text-[#e2f952] uppercase tracking-wider block font-bold">RESERVA ON</span></div></div><div className="aspect-square bg-white/[0.04] border-2 border-white/20 rounded-2xl sm:rounded-3xl p-3 flex flex-col justify-between items-center text-center backdrop-blur-sm hover:border-white/40 transition-colors"><span className="font-mono text-[10px] text-neutral-500 font-bold self-start">18</span><span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest">LIBRE</span></div><div className="aspect-square bg-white/[0.04] border-2 border-white/20 rounded-2xl sm:rounded-3xl p-3 flex flex-col justify-between items-center text-center backdrop-blur-sm hover:border-white/40 transition-colors"><span className="font-mono text-[10px] text-neutral-500 font-bold self-start">21</span><span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest">LIBRE</span></div><div className="aspect-square bg-white text-black border-2 border-white rounded-2xl sm:rounded-3xl p-2.5 sm:p-3 flex flex-col justify-between items-center text-center shadow-2xl hover:scale-105 transition-transform"><span className="font-display text-3xl sm:text-4xl leading-none text-black">22</span><div className="font-mono text-[9px] sm:text-[10px] uppercase font-bold leading-tight text-black">Kids Brain<br /><span className="text-neutral-600 font-bold">10:00</span></div></div><div className="aspect-square bg-white/[0.04] border-2 border-white/20 rounded-2xl sm:rounded-3xl p-3 flex flex-col justify-between items-center text-center backdrop-blur-sm hover:border-white/40 transition-colors"><span className="font-mono text-[10px] text-neutral-500 font-bold self-start">23</span><span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest">LIBRE</span></div><div className="aspect-square bg-accent text-black border-2 border-black rounded-2xl sm:rounded-3xl p-2.5 sm:p-3 flex flex-col justify-between items-center text-center shadow-2xl hover:scale-105 transition-transform"><span className="font-display text-3xl sm:text-4xl leading-none text-black font-black">24</span><div className="font-mono text-[9px] sm:text-[10px] uppercase font-black leading-tight text-black">Live Set<br /><span className="text-black/80 font-black">09:00/14:00</span></div></div><div className="aspect-square bg-white/[0.04] border-2 border-white/20 rounded-2xl sm:rounded-3xl p-3 flex flex-col justify-between items-center text-center backdrop-blur-sm hover:border-white/40 transition-colors"><span className="font-mono text-[10px] text-neutral-500 font-bold self-start">25</span><span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest">LIBRE</span></div><div className="aspect-square bg-white text-black border-2 border-white rounded-2xl sm:rounded-3xl p-2.5 sm:p-3 flex flex-col justify-between items-center text-center shadow-2xl hover:scale-105 transition-transform"><span className="font-display text-3xl sm:text-4xl leading-none text-black">26</span><div className="font-mono text-[9px] sm:text-[10px] uppercase font-bold leading-tight text-black">Brain Train<br /><span className="text-neutral-600 font-bold">13:30</span></div></div><div className="aspect-square bg-white/[0.04] border-2 border-white/20 rounded-2xl sm:rounded-3xl p-3 flex flex-col justify-between items-center text-center backdrop-blur-sm hover:border-white/40 transition-colors"><span className="font-mono text-[10px] text-neutral-500 font-bold self-start">28</span><span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest">LIBRE</span></div><div className="aspect-square bg-white/[0.04] border-2 border-white/20 rounded-2xl sm:rounded-3xl p-3 flex flex-col justify-between items-center text-center backdrop-blur-sm hover:border-white/40 transition-colors"><span className="font-mono text-[10px] text-neutral-500 font-bold self-start">30</span><span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest">LIBRE</span></div></div><div className="relative z-10 mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"><div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#111613] border-2 border-[#e2f952]/40 shadow-lg"><span className="font-mono text-white text-xs font-bold tracking-widest">START</span><span className="bg-[#e2f952] text-black font-display text-sm sm:text-base px-2.5 py-0.5 rounded-full font-black">21</span><span className="font-mono text-neutral-300 text-[10px] ml-1 uppercase font-bold">CINECLUB BUTACAS // TUC</span></div><div className="inline-flex items-center gap-2 text-[10px] font-mono text-neutral-400"><span className="w-2.5 h-2.5 rounded-full bg-[#e2f952] inline-block"></span><span className="">SALA BUTACAS CLIMATIZADA • PANTALLA 4K</span></div></div></div></div></section>{/* ================= NUEVO COMPONENTE: TITULARES MONUMENTALES APILADOS // HERO COLLECTIVE STYLE (REF: IMAGE_2) ================= */}<section className="w-full py-16 lg:py-24 border-b border-surface-border bg-black text-white relative" id="hero-collective"><div className="max-w-[1440px] mx-auto px-6 lg:px-12"><div className="flex flex-col md:flex-row md:items-baseline justify-between mb-8 pb-3 border-b border-surface-border gap-4"><div className="flex items-center gap-3"><span className="text-accent font-display text-xl">04 //</span><h2 className="font-display text-2xl lg:text-3xl uppercase tracking-tight text-white">LINEUP MONUMENTAL // ESTILO HERO COLLECTIVE</h2></div><span className="text-on-surface-subtle text-[11px] font-mono tracking-widest hidden sm:inline-block">INSPIRADO EN TIPOGRAFÍA MONUMENTAL APILADA</span></div>{/* Bloque Banner Rojo LATEST */}<div className="bg-accent text-black p-6 sm:p-8 text-center border-2 border-black mb-8"><span className="font-mono text-xs uppercase tracking-widest font-black block mb-1">WORK • TRENDSSS • NEWS</span><h3 className="font-display text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tighter leading-none text-white">LATEST HEADLINERS</h3></div>{/* Titulares Monumentales Apilados a Ancho Completo con Cintas de Metadata */}<div className="divide-y divide-surface-border border-y border-surface-border">{/* Banda 1: TIAA */}<div className="py-8 sm:py-12 group hover:bg-[#0c0c0c] transition-colors"><div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4"><h4 className="font-display text-7xl sm:text-9xl md:text-[140px] lg:text-[180px] leading-none uppercase tracking-tighter text-[#e5e2e1] group-hover:text-accent transition-colors select-none">TIAA</h4><div className="max-w-md font-mono text-xs text-neutral-400 leading-relaxed uppercase border-l-2 border-accent pl-4"><div className="">CICLO RETRO-SÍNTESIS // SMT</div><p className="mt-1 text-neutral-300">EXPLORACIÓN DE HIP HOP ANALÓGICO, SAMPLEO Y MENSAJES CULTURALES EN VIVO.</p><span className="inline-block mt-2 font-bold text-accent">28 MARZO // TEATRO SAN MARTÍN</span></div></div></div>{/* Banda 2: LENOVO YOGA */}<div className="py-8 sm:py-12 group hover:bg-[#0c0c0c] transition-colors"><div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4"><h4 className="font-display text-6xl sm:text-8xl md:text-[120px] lg:text-[150px] leading-none uppercase tracking-tighter text-[#e5e2e1] group-hover:text-accent transition-colors select-none">VORTEX NOA</h4><div className="max-w-md font-mono text-xs text-neutral-400 leading-relaxed uppercase border-l-2 border-accent pl-4"><div className="">VISUALES GENERATIVAS // INTERACTIVAS</div><p className="mt-1 text-neutral-300">PUESTA INMERSIVA EN 360° CON DISPOSITIVOS TÁCTILES Y MODULARES SONOROS.</p><span className="inline-block mt-2 font-bold text-accent">05 ABRIL // CLUB CENTRAL CÓRDOBA</span></div></div></div>{/* Banda 3: HERO COLLECTIVE */}<div className="py-8 sm:py-12 group hover:bg-[#0c0c0c] transition-colors"><div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4"><h4 className="font-display text-7xl sm:text-9xl md:text-[140px] lg:text-[180px] leading-none uppercase tracking-tighter text-[#e5e2e1] group-hover:text-accent transition-colors select-none">HERO</h4><div className="max-w-md font-mono text-xs text-neutral-400 leading-relaxed uppercase border-l-2 border-accent pl-4"><div className="">COLECTIVO CREATIVO TUCUMANO</div><p className="mt-1 text-neutral-300">PLATAFORMA CREADA PARA CONECTAR BANDAS EMERGENTES CON ESCENARIOS MAYORES DEL NOA.</p><span className="inline-block mt-2 font-bold text-accent">18 ABRIL // ROBERT NESTA</span></div></div></div>{/* Banda 4: DIVIDIDOS */}<div className="py-8 sm:py-12 group hover:bg-[#0c0c0c] transition-colors"><div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4"><h4 className="font-display text-6xl sm:text-8xl md:text-[120px] lg:text-[150px] leading-none uppercase tracking-tighter text-accent group-hover:text-white transition-colors select-none">DIVIDIDOS</h4><div className="max-w-md font-mono text-xs text-neutral-400 leading-relaxed uppercase border-l-2 border-white pl-4"><div className="">35 AÑOS DE ROCK NACIONAL</div><p className="mt-1 text-white">EL REGRESO MÁS ESPERADO A TUCUMÁN CON SONIDO DE PRECISIÓN Y GRAN PUESTA EN ESCENA.</p><span className="inline-block mt-2 font-bold text-white">11 ABRIL // ESTADIO CENTRAL CÓRDOBA</span></div></div></div></div>{/* Barra de Botón Rojo Full Width CHECK ALL NEWS */}<div className="mt-8"><a className="block w-full py-5 bg-accent text-white font-display text-2xl uppercase tracking-widest text-center hover:bg-white hover:text-black transition-colors border-2 border-black" href="https://www.passline.com" rel="noreferrer" target="_blank">VER TODAS LAS FECHAS DISPONIBLES // TICKETS ↗</a></div></div></section><section className="w-full py-16 border-b border-surface-border bg-black" id="triptico">
<div className="max-w-[1440px] mx-auto px-6 lg:px-12">
{/* Header Tríptico */}
<div className="flex items-baseline justify-between mb-8 pb-3 border-b border-surface-border">
<div className="flex items-center gap-3">
<span className="text-accent font-display text-xl">05 //</span>
<h2 className="font-display text-2xl lg:text-3xl uppercase tracking-tight text-white">TRÍPTICO RETÍCULA SUIZA // CICLO SONORO</h2>
</div>
<span className="text-on-surface-subtle text-[11px] font-mono tracking-widest hidden sm:inline-block">INSPIRADO EN AFICHES "WE MAKE CROWDS FEEL"</span>
</div>
{/* 3 Paneles Contiguos Generados Puramente en HTML/CSS */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/20">
{/* Panel 1: Wireframe Grid + Bold Swiss Poster */}
<article className="relative bg-black text-white p-8 lg:p-10 flex flex-col justify-between min-h-[580px] border-b md:border-b-0 md:border-r border-white/20 group hover:bg-[#0c0c0c] transition-colors">
{/* Visible 6-cell Wireframe Grid overlay */}
<div className="absolute inset-0 grid grid-cols-2 grid-rows-3 pointer-events-none border border-white/10">
<div className="border-r border-b border-white/10"></div>
<div className="border-b border-white/10"></div>
<div className="border-r border-b border-white/10"></div>
<div className="border-b border-white/10"></div>
<div className="border-r border-white/10"></div>
<div></div>
</div>
<div className="relative z-10">
{/* Top meta block */}
<div className="flex justify-between items-start text-[9px] uppercase tracking-wider text-neutral-400 font-mono mb-12">
<span className="leading-tight">VOL. 01<br />CICLO SONORO NOA</span>
<span className="max-w-[140px] text-right text-[8px] leading-tight">PRODUCCIÓN ESTRATÉGICA DE EXPERIENCIAS CULTURALES EN ESPACIOS HISTÓRICOS.</span>
</div>
{/* Massive typography */}
<h3 className="font-display text-5xl lg:text-6xl uppercase leading-[0.9] tracking-tight text-white mb-6">
            WE<br />MAKE<br />CROWDS<br />FEEL
          </h3>
</div>
<div className="relative z-10 pt-8 border-t border-white/10">
<div className="flex justify-between items-end">
<div>
<span className="text-accent text-[11px] uppercase font-bold tracking-widest block">15 MARZO 2025</span>
<p className="font-display text-xl uppercase tracking-tight text-white">ERUCA SATIVA + PECES</p>
<span className="text-neutral-400 text-[10px] block mt-1">CLUB CENTRAL CÓRDOBA • $18.000</span>
</div>
<a className="px-3 py-1 bg-white text-black font-display text-xs uppercase tracking-wider hover:bg-accent hover:text-white transition-colors" href="https://www.passline.com" rel="noreferrer" target="_blank">
              PASSLINE ↗
            </a>
</div>
<div className="mt-4 flex justify-between text-[8px] text-neutral-500 font-mono uppercase tracking-widest border-t border-white/5 pt-2">
<span className="">REF: TLA-01</span>
<span className="">TUCUMÁN • SMT</span>
</div>
</div>
</article>
{/* Panel 2: Full Red/Orange Solid Color Poster */}
<article className="relative bg-accent text-black p-8 lg:p-10 flex flex-col justify-between min-h-[580px] border-b md:border-b-0 md:border-r border-white/20 group hover:bg-accent-soft transition-colors">
<div className="relative z-10">
<div className="flex justify-between items-start text-[9px] uppercase tracking-wider text-black font-mono font-bold mb-12">
<span className="leading-tight">VOL. 02<br />NOCHE ELÉCTRICA</span>
<span className="max-w-[140px] text-right text-[8px] leading-tight">DISPOSITIVO DE SONIDO INDEPENDIENTE. AMPLIFICACIÓN ANALÓGICA TUCUMANA.</span>
</div>
<h3 className="font-display text-5xl lg:text-6xl uppercase leading-[0.9] tracking-tight text-black mb-6">
            WE<br />MAKE<br />CROWDS<br />FEEL
          </h3>
</div>
<div className="relative z-10 pt-8 border-t border-black/30">
<div className="flex justify-between items-end">
<div>
<span className="text-black text-[11px] uppercase font-black tracking-widest block">21 MARZO 2025</span>
<p className="font-display text-xl uppercase tracking-tight text-black">BABASÓNICOS // VORTEX</p>
<span className="text-black/80 text-[10px] block font-bold mt-1">TEATRO MERCEDES SOSA • $24.000</span>
</div>
<a className="px-3 py-1 bg-black text-white font-display text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-colors" href="https://www.ticketek.com.ar" rel="noreferrer" target="_blank">
              TICKETEK ↗
            </a>
</div>
<div className="mt-4 flex justify-between text-[8px] text-black/70 font-mono font-bold uppercase tracking-widest border-t border-black/20 pt-2">
<span className="">REF: TLA-02</span>
<span className="">CAPACIDAD: 1.600</span>
</div>
</div>
</article>
{/* Panel 3: Halftone Pure Vector Wave + Dark Contrast */}
<article className="relative bg-black text-white p-8 lg:p-10 flex flex-col justify-between min-h-[580px] overflow-hidden group hover:bg-[#0d0d0d] transition-colors">
{/* CSS & SVG Pure Halftone Kinetic Waves (Built in code, NOT an image) */}
<div className="absolute inset-0 pointer-events-none opacity-45 group-hover:opacity-75 transition-opacity">
<svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 600" xmlns="http://www.w3.org/2000/svg">
<defs>
<pattern height="10" id="dotPattern" patternUnits="userSpaceOnUse" width="10" x="0" y="0">
<circle cx="2" cy="2" fill="#ff3c00" r="1.5" />
</pattern>
</defs>
<path d="M0,200 Q150,150 200,320 T400,360 L400,600 L0,600 Z" fill="url(#dotPattern)" opacity="0.8" />
<path d="M0,350 Q120,250 240,430 T400,480 L400,600 L0,600 Z" fill="#ff3c00" opacity="0.3" />
<path d="M0,280 C130,220 180,390 400,410 L400,600 L0,600 Z" fill="none" stroke="#ff3c00" strokeDasharray="3 3" strokeWidth="1.5" />
</svg>
</div>
<div className="relative z-10">
<div className="flex justify-between items-start text-[9px] uppercase tracking-wider text-neutral-400 font-mono mb-12">
<span className="leading-tight">VOL. 03<br />SÍNTESIS ANALÓGICA</span>
<span className="max-w-[140px] text-right text-[8px] leading-tight">INTERSECCIÓN DE ARTE GENERATIVO, MÚSICA DE RAÍZ Y PAISAJISMO TUCUMANO.</span>
</div>
<h3 className="font-display text-5xl lg:text-6xl uppercase leading-[0.9] tracking-tight text-white mb-6">
            WE<br />MAKE<br />CROWDS<br />FEEL
          </h3>
</div>
<div className="relative z-10 pt-8 border-t border-white/10">
<div className="flex justify-between items-end">
<div>
<span className="text-accent text-[11px] uppercase font-bold tracking-widest block">20 MARZO 2025</span>
<p className="font-display text-xl uppercase tracking-tight text-white">HERMANOS DEL NOA</p>
<span className="text-neutral-400 text-[10px] block mt-1">CASA MANAGUA • ENTRADA LIBRE</span>
</div>
<a className="px-3 py-1 bg-white text-black font-display text-xs uppercase tracking-wider hover:bg-accent hover:text-white transition-colors" href="https://www.alpogo.com" rel="noreferrer" target="_blank">
              RESERVA ↗
            </a>
</div>
<div className="mt-4 flex justify-between text-[8px] text-neutral-500 font-mono uppercase tracking-widest border-t border-white/5 pt-2">
<span className="">REF: TLA-03</span>
<span className="">BARRIO NORTE</span>
</div>
</div>
</article>
</div>
</div>
</section>
{/* ================= COMPONENTE 2: HERO POSTER EDITORIAL "ESTILO FUJI" (REF: IMAGE_4) ================= */}
<section className="w-full py-16 border-b border-surface-border" id="destacado-fuji">
<div className="max-w-[1440px] mx-auto px-6 lg:px-12">
<div className="flex items-baseline justify-between mb-8 pb-3 border-b border-surface-border">
<div className="flex items-center gap-3">
<span className="text-accent font-display text-xl">06 //</span>
<h2 className="font-display text-2xl lg:text-3xl uppercase tracking-tight text-white">POSTER MONUMENTAL CONTEXTUAL // COMPONENTE "FUJI"</h2>
</div>
<span className="text-on-surface-subtle text-[11px] font-mono tracking-widest hidden sm:inline-block">INSPIRADO EN AFICHE FUJI / STUDIO EDITORIAL</span>
</div>
{/* EL COMPONENTE FUJI EN PURO HTML/CSS */}
<div className="border-2 border-surface-border overflow-hidden bg-black shadow-2xl">
{/* MITAD SUPERIOR: NARANJA INTENSO CON 4 FLECHAS EN ESQUINAS Y TIPOGRAFÍA ULTRA-CONDENSADA */}
<div className="relative bg-accent text-black p-8 sm:p-12 lg:p-16 flex flex-col justify-between min-h-[380px] lg:min-h-[460px]">
{/* 4 Corner Arrows (↖ ↗ ↙ ↘) */}
<div className="absolute top-6 left-6 text-3xl font-bold select-none text-black">↖</div>
<div className="absolute top-6 right-6 text-3xl font-bold select-none text-black">↗</div>
<div className="absolute bottom-6 left-6 text-3xl font-bold select-none text-black">↙</div>
<div className="absolute bottom-6 right-6 text-3xl font-bold select-none text-black">↘</div>
{/* Micro-texto superior técnico suizo */}
<div className="w-full text-center px-12">
<p className="font-mono text-[9px] sm:text-[10px] tracking-widest text-black/90 uppercase font-bold max-w-3xl mx-auto leading-relaxed">
            PROVINCIA DE TUCUMÁN • VALLES CALCHAQUÍES • SISTEMA RADAR DE CONVOCATORIA MUSICAL Y TEATRAL INDEPENDIENTE • SERIE NOA VOL. XXIV // REF. COORD: 26°49'S 65°13'W
          </p>
</div>
{/* Tipografía Monumental Ultra Condensada "TUCUMÁN" */}
<div className="my-auto text-center py-6">
<h2 className="font-display text-[90px] sm:text-[160px] md:text-[210px] lg:text-[260px] leading-[0.8] tracking-tighter uppercase text-black select-none">
            TUCUMÁN
          </h2>
</div>
{/* Micro-texto inferior técnico suizo */}
<div className="w-full text-center px-12">
<p className="font-mono text-[8px] sm:text-[9.5px] tracking-widest text-black/85 uppercase font-bold max-w-4xl mx-auto leading-relaxed">
            EL JARDÍN DE LA REPÚBLICA PRESENTA SU CARTELERA CENTRAL CON ARTISTAS CONSAGRADOS Y VANGUARDIA EXPERIMENTAL. COMPRA DE TICKETS CON TARIFA TRANSPARENTE EN RED FEDERAL.
          </p>
</div>
</div>
{/* MITAD INFERIOR: MONOCROMÁTICA OSCURA CON GRADIENTES, TRAMAS TÉCNICAS Y METADATA */}
<div className="relative bg-[#0d0d0d] text-white p-8 sm:p-12 border-t border-black">
<div className="halftone-dots-white absolute inset-0 opacity-15 pointer-events-none"></div>
<div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
<div className="lg:col-span-8 space-y-3">
<div className="flex items-center gap-3">
<span className="px-2.5 py-0.5 bg-accent text-white font-mono text-[10px] font-bold tracking-widest uppercase">FECHA ESTELAR</span>
<span className="text-neutral-400 font-mono text-xs uppercase tracking-widest">11 ABRIL 2025 // 21:00 HS</span>
</div>
<h3 className="font-display text-4xl sm:text-6xl uppercase tracking-tight text-white leading-none">
              DIVIDIDOS // ESTADIO CENTRAL CÓRDOBA
            </h3>
<p className="text-neutral-400 font-mono text-xs max-w-2xl leading-relaxed">
              La aplanadora del rock regresa a San Miguel de Tucumán repasando 35 años de historia con sonido de alta definición y puesta escenográfica de gran porte.
            </p>
</div>
<div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col justify-end items-start lg:items-end gap-4">
<div className="text-left lg:text-right">
<span className="block text-accent font-display text-3xl">$22.000</span>
<span className="text-neutral-500 font-mono text-[10px] uppercase tracking-wider">SECTOR GENERAL / CAMPO</span>
</div>
<a className="px-8 py-4 bg-white text-black hover:bg-accent hover:text-white font-display text-base uppercase tracking-widest transition-all" href="https://www.passline.com" rel="noreferrer" target="_blank">
              ADQUIRIR TICKET ↗
            </a>
</div>
</div>
{/* Barra inferior tipo pie de imprenta técnica */}
<div className="relative z-10 mt-8 pt-4 border-t border-neutral-800 flex flex-wrap justify-between items-center text-[9px] font-mono text-neutral-500 uppercase tracking-widest">
<span className="">* MONTE CALCHAQUÍ ELEVACIÓN 4.500M</span>
<span className="">CAPACIDAD HABILITADA: 7.500 ESPECTADORES</span>
<span className="">SOPORTE: GIRA FEDERAL NOA</span>
<span className="">COD: SMT-2025-FUJI</span>
</div>
</div>
</div>
</div>
</section>
{/* ================= COMPONENTE 3: CARTELERA BRUTALISTA VIVA (REF: IMAGE_2 & IMAGE_5) ================= */}
<main className="w-full py-16 lg:py-24" id="cartelera">
<div className="max-w-[1440px] mx-auto px-6 lg:px-12">
{/* Section Title & Meta */}
<div className="flex items-baseline justify-between mb-12 border-b border-surface-border pb-4">
<div className="flex items-baseline gap-4">
<span className="text-accent font-display text-xl">07 //</span>
<h2 className="font-display text-4xl lg:text-5xl uppercase tracking-tight text-white">CARTELERA EXPERIMENTAL</h2>
<span className="text-accent text-[12px] font-bold tracking-widest uppercase hidden md:inline-block">07 //</span>
</div>
<span className="text-on-surface-subtle text-[12px] font-mono hidden sm:inline-block">SIN FOTOS PREFIJADAS // 100% RETÍCULA BRUTALISTA</span>
</div>
{/* GRID MODULAR 4 CARDS COMPLEJAS DE DISEÑO GRÁFICO EDITORIAL */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
{/* CARD A: ESTILO B.ORION MODULAR CON NÚMEROS DESCOMUNALES 618 / 345 (REF: IMAGE_2) */}
<article className="bg-surface-card border border-surface-border hover:border-accent transition-colors flex flex-col justify-between group">
{/* Top modular bar B.ORION header */}
<div className="bg-black border-b border-surface-border px-5 py-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-widest">
<div className="flex items-center gap-2">
<span className="w-2.5 h-2.5 bg-accent inline-block"></span>
<span className="text-white font-bold">B.ORION // EDICIÓN NOA</span>
</div>
<span className="text-neutral-500">SH. - 06</span>
</div>
{/* Poster Graphic Area (Puro HTML/CSS Modular) */}
<div className="p-6 bg-[#0e0e0e] grid grid-cols-12 gap-4">
{/* Columna izquierda: Nombres en tipografía brutalista expandida (Juno, Zyrah, Amara, Selene) */}
<div className="col-span-5 border-r border-surface-border/80 pr-4 flex flex-col justify-between space-y-2">
<div>
<span className="text-[9px] font-mono text-neutral-500 uppercase block mb-1">LINEUP TUC</span>
<p className="font-display text-2xl uppercase tracking-tighter text-white hover:text-accent cursor-default">JUNO</p>
<p className="font-display text-2xl uppercase tracking-tighter text-white hover:text-accent cursor-default">ZYRAH</p>
<p className="font-display text-2xl uppercase tracking-tighter text-white hover:text-accent cursor-default">AMARA</p>
<p className="font-display text-2xl uppercase tracking-tighter text-white hover:text-accent cursor-default">INES</p>
<p className="font-display text-2xl uppercase tracking-tighter text-white hover:text-accent cursor-default">SELENE</p>
</div>
<div className="pt-4 border-t border-surface-border/60">
<span className="text-[9px] font-mono text-accent uppercase font-bold block">FORMATO</span>
<span className="text-[11px] font-mono text-neutral-300">LIVE SET ANALÓGICO</span>
</div>
</div>
{/* Columna central / derecha: Grandes números 618 y 345 + Fecha Monumental */}
<div className="col-span-7 flex flex-col justify-between pl-2">
<div className="bg-surface-dark border border-surface-border p-4 mb-3">
<span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest block">FECHA CENTRAL</span>
<h4 className="font-display text-3xl uppercase leading-none text-white mt-1">ECHOES UNBOUND</h4>
<p className="font-mono text-accent text-sm font-bold mt-1">29 MARZO 2025</p>
</div>
{/* Bloque de números descomunales tipo poster suizo */}
<div className="grid grid-cols-2 gap-2 text-center bg-black border border-surface-border py-4 px-2">
<div className="border-r border-surface-border">
<span className="font-display text-5xl sm:text-6xl text-white leading-none block">618</span>
<span className="text-[8px] font-mono text-neutral-500 uppercase tracking-widest">SERIE EXP.</span>
</div>
<div>
<span className="font-display text-5xl sm:text-6xl text-accent leading-none block">345</span>
<span className="text-[8px] font-mono text-neutral-500 uppercase tracking-widest">LOTE TUC</span>
</div>
</div>
{/* Franja SUN RUN roja en degradé editorial */}
<div className="mt-3 bg-gradient-to-r from-accent to-[#b52700] py-2 px-3 text-center">
<span className="font-display text-2xl uppercase tracking-widest text-black font-black">SUN • RUN • FEST</span>
</div>
</div>
</div>
{/* Bottom Action Strip */}
<div className="p-6 bg-surface-card border-t border-surface-border flex items-center justify-between">
<div>
<span className="text-[10px] text-accent font-mono uppercase tracking-widest block">TEATRO SAN MARTÍN • SMT</span>
<span className="text-white font-bold text-lg">$16.500</span>
</div>
<a className="px-5 py-2.5 bg-white text-black font-display text-xs uppercase tracking-wider hover:bg-accent hover:text-white transition-colors flex items-center gap-1.5" href="https://www.passline.com" rel="noreferrer" target="_blank">
<span className="">PASSLINE</span>
<span className="material-symbols-outlined text-[14px]">arrow_outward</span>
</a>
</div>
</article>
{/* CARD B: ESTILO "PROCESSOS / DEMANDAS DEMANDAS DEMANDAS" CON KEYBOARD KEYS 3D (REF: IMAGE_5) */}
<article className="bg-surface-card border border-surface-border hover:border-accent transition-colors flex flex-col justify-between group">
{/* Top Header con badge estilo Free Font / Concluídos */}
<div className="bg-black border-b border-surface-border px-5 py-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-widest">
<div className="flex items-center gap-2">
<span className="px-1.5 py-0.5 bg-accent text-white text-[9px] font-bold">DZP</span>
<span className="text-white font-bold">PROCESSOS // VOL. 04</span>
</div>
<span className="text-neutral-400">#CONCLUÍDOS</span>
</div>
{/* Poster Graphic Area (Teclas de teclado 3D + Texto Masivo Repetido DEMANDAS) */}
<div className="p-6 bg-[#111111] flex flex-col justify-between space-y-6">
{/* TECLAS DE TECLADO 3D (P-R-O-C-E-S-S-O-S) recreadas puramente en CSS */}
<div>
<div className="flex items-center justify-between mb-2 text-[9px] font-mono text-neutral-500 uppercase tracking-widest">
<span className="">INPUT HARDWARE</span>
<span className="">EXPERIMENTAL KEYSET</span>
</div>
<div className="flex items-center justify-center gap-1 sm:gap-2 py-3 bg-[#181818] border border-surface-border rounded">
<span className="key-cap w-7 h-9 sm:w-8 sm:h-10 bg-neutral-900 border border-neutral-700 text-white font-mono font-bold text-xs sm:text-sm flex items-center justify-center rounded">P</span>
<span className="key-cap w-7 h-9 sm:w-8 sm:h-10 bg-neutral-900 border border-neutral-700 text-white font-mono font-bold text-xs sm:text-sm flex items-center justify-center rounded">R</span>
<span className="key-cap w-7 h-9 sm:w-8 sm:h-10 bg-neutral-900 border border-neutral-700 text-white font-mono font-bold text-xs sm:text-sm flex items-center justify-center rounded">O</span>
<span className="key-cap w-7 h-9 sm:w-8 sm:h-10 bg-neutral-900 border border-neutral-700 text-white font-mono font-bold text-xs sm:text-sm flex items-center justify-center rounded">C</span>
<span className="key-cap w-7 h-9 sm:w-8 sm:h-10 bg-neutral-900 border border-neutral-700 text-white font-mono font-bold text-xs sm:text-sm flex items-center justify-center rounded">E</span>
<span className="key-cap w-7 h-9 sm:w-8 sm:h-10 bg-neutral-900 border border-neutral-700 text-white font-mono font-bold text-xs sm:text-sm flex items-center justify-center rounded">S</span>
<span className="key-cap w-7 h-9 sm:w-8 sm:h-10 bg-neutral-900 border border-neutral-700 text-white font-mono font-bold text-xs sm:text-sm flex items-center justify-center rounded">S</span>
<span className="key-cap w-7 h-9 sm:w-8 sm:h-10 bg-neutral-900 border border-neutral-700 text-white font-mono font-bold text-xs sm:text-sm flex items-center justify-center rounded">O</span>
<span className="key-cap w-7 h-9 sm:w-8 sm:h-10 bg-neutral-900 border border-neutral-700 text-white font-mono font-bold text-xs sm:text-sm flex items-center justify-center rounded">S</span>
</div>
</div>
{/* TIPOGRAFÍA MASIVA REPETIDA "DEMANDAS DEMANDAS DEMANDAS" CON RECORTE Y ACCENT */}
<div className="relative overflow-hidden py-2 select-none">
<p className="font-display text-4xl sm:text-6xl text-neutral-600 uppercase tracking-tighter leading-none opacity-40">DEMANDAS</p>
<p className="font-display text-5xl sm:text-7xl text-white uppercase tracking-tighter leading-none -my-1">DEMANDAS</p>
<p className="font-display text-5xl sm:text-7xl text-accent uppercase tracking-tighter leading-none">DEMANDAS</p>
{/* Badge flotante FREE FONT / SOBRESSALENTES */}
<div className="absolute bottom-1 right-2 bg-white text-black px-2 py-0.5 font-display text-xs uppercase tracking-wider">
              FREE FONT // TUC
            </div>
</div>
{/* Fila inferior: QR vectorial simulado en código CSS + Subtexto editorial */}
<div className="flex items-center justify-between pt-4 border-t border-surface-border/60">
<div className="flex items-center gap-3">
{/* QR Block hecho en CSS Grid puro */}
<div className="w-12 h-12 bg-white p-1 grid grid-cols-4 gap-0.5 shrink-0">
<div className="bg-black"></div><div className="bg-black"></div><div className="bg-white"></div><div className="bg-black"></div>
<div className="bg-black"></div><div className="bg-white"></div><div className="bg-black"></div><div className="bg-white"></div>
<div className="bg-white"></div><div className="bg-black"></div><div className="bg-black"></div><div className="bg-black"></div>
<div className="bg-black"></div><div className="bg-white"></div><div className="bg-black"></div><div className="bg-black"></div>
</div>
<div>
<span className="font-display text-lg text-white uppercase leading-none block">SOBRESSALENTES</span>
<span className="text-[9px] font-mono text-neutral-400 uppercase tracking-wider">STAND UP EXPERIMENTAL</span>
</div>
</div>
<span className="font-mono text-accent text-xs font-bold">21 MARZO</span>
</div>
</div>
{/* Bottom Action Strip */}
<div className="p-6 bg-surface-card border-t border-surface-border flex items-center justify-between">
<div>
<span className="text-[10px] text-accent font-mono uppercase tracking-widest block">ROBERT NESTA CLUB • SMT</span>
<span className="text-white font-bold text-lg">$14.000</span>
</div>
<a className="px-5 py-2.5 bg-white text-black font-display text-xs uppercase tracking-wider hover:bg-accent hover:text-white transition-colors flex items-center gap-1.5" href="https://www.ticketek.com.ar" rel="noreferrer" target="_blank">
<span className="">TICKETEK</span>
<span className="material-symbols-outlined text-[14px]">arrow_outward</span>
</a>
</div>
</article>
{/* CARD C: AFICHE TIPOGRÁFICO DE CONTRASTE ALTO "MONOBLOC FESTIVAL" */}
<article className="bg-surface-card border border-surface-border hover:border-accent transition-colors flex flex-col justify-between group">
<div className="bg-black border-b border-surface-border px-5 py-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-widest">
<div className="flex items-center gap-2">
<span className="w-2.5 h-2.5 bg-white inline-block"></span>
<span className="text-white font-bold">FESTIVAL // CIRCUITO CÉNTRICO</span>
</div>
<span className="text-accent font-bold">3 DÍAS</span>
</div>
<div className="p-8 bg-[#0c0c0c] flex flex-col justify-between space-y-6">
<div className="flex justify-between items-start">
<div className="border-l-2 border-accent pl-3">
<span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">SELECCIÓN OFICIAL</span>
<span className="font-mono text-xs text-white uppercase font-bold">EDICIÓN OTOÑO NOA</span>
</div>
<div className="text-right">
<span className="font-display text-4xl text-accent block leading-none">16</span>
<span className="text-[10px] font-mono text-neutral-400 uppercase">ABRIL</span>
</div>
</div>
{/* Gran bloque tipográfico compuesto */}
<div className="py-4">
<h3 className="font-display text-4xl sm:text-5xl uppercase leading-[0.88] text-white">
              MONOBLOC<br />
<span className="text-stroke-accent">INDEPENDIENTE</span><br />
              TUCUMÁN
            </h3>
<div className="mt-4 flex flex-wrap gap-2 text-[10px] font-mono uppercase">
<span className="px-2 py-1 bg-surface-dark border border-surface-border text-neutral-300">SINTETIZADORES</span>
<span className="px-2 py-1 bg-surface-dark border border-surface-border text-neutral-300">ARTE VISUAL</span>
<span className="px-2 py-1 bg-surface-dark border border-surface-border text-neutral-300">FERIA EDITORIAL</span>
</div>
</div>
<div className="p-3 bg-surface-dark border border-surface-border/70 flex items-center justify-between text-xs font-mono">
<span className="text-neutral-400">LOCACIÓN:</span>
<span className="text-white font-bold">MAGIC MUSIC BOX (J. COLOMBRES 427)</span>
</div>
</div>
<div className="p-6 bg-surface-card border-t border-surface-border flex items-center justify-between">
<div>
<span className="text-[10px] text-accent font-mono uppercase tracking-widest block">ACCESO COMPLETO</span>
<span className="text-white font-bold text-lg">$12.000</span>
</div>
<a className="px-5 py-2.5 bg-white text-black font-display text-xs uppercase tracking-wider hover:bg-accent hover:text-white transition-colors flex items-center gap-1.5" href="https://www.passline.com" rel="noreferrer" target="_blank">
<span className="">PASSLINE</span>
<span className="material-symbols-outlined text-[14px]">arrow_outward</span>
</a>
</div>
</article>
{/* CARD D: AFICHE EXPERIMENTAL FOLKLORE & VANGUARDIA (ZINE LAYOUT) */}
<article className="bg-surface-card border border-surface-border hover:border-accent transition-colors flex flex-col justify-between group">
<div className="bg-black border-b border-surface-border px-5 py-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-widest">
<div className="flex items-center gap-2">
<span className="w-2.5 h-2.5 bg-accent inline-block"></span>
<span className="text-white font-bold">PEÑA // EXPERIMENTAL</span>
</div>
<span className="text-neutral-400">VOL. 09</span>
</div>
<div className="p-8 bg-[#0c0c0c] flex flex-col justify-between space-y-6">
<div className="flex justify-between items-start">
<div>
<span className="text-[10px] font-mono text-accent uppercase tracking-widest block font-bold">CRUCE REGIONAL</span>
<h4 className="font-display text-2xl uppercase tracking-tight text-white mt-1">CULTURA DE RAÍZ</h4>
</div>
<span className="px-2 py-1 bg-white text-black font-mono text-[10px] font-bold uppercase">ENTRADA LIBRE</span>
</div>
{/* Bloque gráfico con texto masivo invertido */}
<div className="bg-white text-black p-6 space-y-2">
<div className="flex justify-between items-center text-[10px] font-mono font-bold uppercase">
<span className="">TAFÍ DEL VALLE / SMT</span>
<span className="">20:00 HS</span>
</div>
<h3 className="font-display text-4xl sm:text-5xl uppercase leading-[0.88] tracking-tight">
              HERMANOS<br />DEL NOA
            </h3>
<p className="font-mono text-[11px] text-black/80 font-bold uppercase tracking-wider pt-2 border-t border-black/20">
              BAGUALAS ELÉCTRICAS + VIOLÍN CRIOLLO PROCESADO
            </p>
</div>
<div className="flex justify-between items-center text-[11px] font-mono text-neutral-400">
<span className="">ESPACIO: CASA MANAGUA</span>
<span className="text-accent font-bold">CAPACIDAD LIMITADA</span>
</div>
</div>
<div className="p-6 bg-surface-card border-t border-surface-border flex items-center justify-between">
<div>
<span className="text-[10px] text-accent font-mono uppercase tracking-widest block">TARIFA SOLIDARIA</span>
<span className="text-accent font-bold text-lg tracking-widest uppercase">GRATIS</span>
</div>
<a className="px-5 py-2.5 bg-accent text-white font-display text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-colors flex items-center gap-1.5" href="https://www.alpogo.com" rel="noreferrer" target="_blank">
<span className="">RESERVAR</span>
<span className="material-symbols-outlined text-[14px]">arrow_outward</span>
</a>
</div>
</article>
</div>
</div>
</main>{/* ================= COMPONENTE 4: CALENDARIO SEMANAL EDITORIAL EN FRANJAS ALTERNADAS (REF: IMAGE_17) ================= */}
<section className="w-full py-16 lg:py-24 border-b border-surface-border bg-[#0e0e0e]" id="agenda-semanal">
<div className="max-w-[1440px] mx-auto px-6 lg:px-12">
{/* Section Header */}
<div className="flex flex-col md:flex-row md:items-baseline justify-between mb-10 pb-4 border-b border-surface-border gap-4">
<div className="flex items-center gap-3">
<span className="text-accent font-display text-xl">08 //</span>
<h2 className="font-display text-3xl lg:text-4xl uppercase tracking-tight text-white">CRONOGRAMA SEMANAL // FRANJAS MODULARES</h2>
</div>
<div className="flex items-center gap-4 text-on-surface-subtle text-[11px] font-mono tracking-widest uppercase">
<span className="">#WEEKLY CALENDAR</span>
<span className="text-surface-border">|</span>
<span className="text-accent font-bold">CICLO 08 — 14 ABRIL 2025</span>
</div>
</div>
{/* Main Calendar Container with Paper/Poster Texture Aesthetic */}
<div className="border-2 border-surface-border overflow-hidden bg-black shadow-2xl relative">
{/* Top Accent Banner Header inspired by kawaii / #WEEKLY CALENDAR */}
<div className="bg-[#141414] border-b border-surface-border px-6 py-6 lg:px-10 flex flex-wrap items-center justify-between gap-4">
<div className="flex items-center gap-4">
<span className="font-mono text-accent text-xl italic tracking-wider">tucumán.live</span>
<span className="text-surface-border">/</span>
<span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">REGISTRO DE SESIONES VIVAS // SMT NOA</span>
</div>
<div className="flex items-center gap-2">
<h3 className="font-display text-4xl sm:text-5xl uppercase tracking-tighter text-accent leading-none">#WEEKLY</h3>
<h3 className="font-display text-4xl sm:text-5xl uppercase tracking-tighter text-white leading-none">CALENDAR</h3>
</div>
</div>
{/* FRANJAS MODULARES ALTERNADAS CON NÚMEROS DIAGONALES */}
<div className="divide-y divide-black/30">
{/* Lunes 08: Franja Naranja con número gigante a la derecha */}
<article className="relative bg-accent text-black p-5 sm:p-6 lg:px-10 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:bg-accent-soft transition-colors overflow-hidden">
<div className="relative z-10 flex-1">
<div className="flex items-center gap-3">
<h4 className="font-display text-2xl sm:text-3xl lg:text-4xl uppercase leading-none tracking-tight text-white">UNPLUGGED SMT</h4>
<span className="px-2 py-0.5 bg-black text-white font-mono text-[9px] font-bold uppercase tracking-wider">LUNES</span>
</div>
<div className="flex flex-wrap items-center gap-4 mt-2 font-mono text-xs text-black/90 font-bold uppercase">
<span className="">FEATURING: AKASH TOMER &amp; INVITADOS</span>
<span className="">•</span>
<span className="">21:00 HS</span>
<span className="">•</span>
<span className="text-black/75">CASA MANAGUA</span>
</div>
</div>
<div className="relative z-10 flex items-center gap-4 self-end md:self-auto">
<a className="hidden sm:inline-block px-4 py-1.5 bg-black text-white font-display text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-colors" href="https://www.passline.com" rel="noreferrer" target="_blank">ACCESO ↗</a>
<div className="flex items-center gap-1.5 select-none">
<span className="font-display text-6xl sm:text-7xl lg:text-8xl leading-none text-white tracking-tighter">08</span>
<span className="font-mono text-[10px] font-black uppercase text-black tracking-widest [writing-mode:vertical-lr] rotate-180">ABRIL</span>
</div>
</div>
</article>
{/* Martes 09: Franja Hueso / Claro con número a la derecha */}
<article className="relative bg-[#e5e2e1] text-black p-5 sm:p-6 lg:px-10 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:bg-white transition-colors overflow-hidden">
<div className="relative z-10 flex-1">
<div className="flex items-center gap-3">
<h4 className="font-display text-2xl sm:text-3xl lg:text-4xl uppercase leading-none tracking-tight text-black">TUESDAY AFTER HOURS</h4>
<span className="px-2 py-0.5 bg-accent text-white font-mono text-[9px] font-bold uppercase tracking-wider">MARTES</span>
</div>
<div className="flex flex-wrap items-center gap-4 mt-2 font-mono text-xs text-neutral-800 font-bold uppercase">
<span className="">FEATURING: ANKIT DIMRI // VORTEX ELECTRONIC</span>
<span className="">•</span>
<span className="">21:30 HS</span>
<span className="">•</span>
<span className="text-neutral-600">MAGIC MUSIC BOX</span>
</div>
</div>
<div className="relative z-10 flex items-center gap-4 self-end md:self-auto">
<a className="hidden sm:inline-block px-4 py-1.5 bg-accent text-white font-display text-xs uppercase tracking-wider hover:bg-black hover:text-white transition-colors" href="https://www.ticketek.com.ar" rel="noreferrer" target="_blank">TICKETS ↗</a>
<div className="flex items-center gap-1.5 select-none">
<span className="font-display text-6xl sm:text-7xl lg:text-8xl leading-none text-accent tracking-tighter">09</span>
<span className="font-mono text-[10px] font-black uppercase text-neutral-700 tracking-widest [writing-mode:vertical-lr] rotate-180">ABRIL</span>
</div>
</div>
</article>
{/* Miércoles 10: Invertido con número a la izquierda */}
<article className="relative bg-accent text-black p-5 sm:p-6 lg:px-10 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:bg-accent-soft transition-colors overflow-hidden">
<div className="relative z-10 flex items-center gap-4 order-2 md:order-1">
<div className="flex items-center gap-1.5 select-none">
<span className="font-display text-6xl sm:text-7xl lg:text-8xl leading-none text-white tracking-tighter">10</span>
<span className="font-mono text-[10px] font-black uppercase text-black tracking-widest [writing-mode:vertical-lr] rotate-180">ABRIL</span>
</div>
<div className="hidden lg:block border-l border-black/30 pl-4 font-mono text-[10px] text-black/90 uppercase font-bold">
              FEATURING: SRIYANSH PANDEY<br />+ ENSAMBLE DE CUERDAS
            </div>
</div>
<div className="relative z-10 flex-1 md:text-right order-1 md:order-2">
<div className="flex items-center md:justify-end gap-3">
<span className="px-2 py-0.5 bg-black text-white font-mono text-[9px] font-bold uppercase tracking-wider">MIÉRCOLES</span>
<h4 className="font-display text-2xl sm:text-3xl lg:text-4xl uppercase leading-none tracking-tight text-white">MIDWEEK MADNESS</h4>
</div>
<div className="flex flex-wrap items-center md:justify-end gap-4 mt-2 font-mono text-xs text-black/90 font-bold uppercase">
<span className="">ROBERT NESTA CLUB</span>
<span className="">•</span>
<span className="">21:00 HS</span>
<span className="">•</span>
<a className="underline hover:text-white" href="https://www.passline.com" rel="noreferrer" target="_blank">LISTA FREE</a>
</div>
</div>
</article>
{/* Jueves 11: Invertido con número a la izquierda en Hueso */}
<article className="relative bg-[#e5e2e1] text-black p-5 sm:p-6 lg:px-10 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:bg-white transition-colors overflow-hidden">
<div className="relative z-10 flex items-center gap-4 order-2 md:order-1">
<div className="flex items-center gap-1.5 select-none">
<span className="font-display text-6xl sm:text-7xl lg:text-8xl leading-none text-accent tracking-tighter">11</span>
<span className="font-mono text-[10px] font-black uppercase text-neutral-700 tracking-widest [writing-mode:vertical-lr] rotate-180">ABRIL</span>
</div>
<div className="hidden lg:block border-l border-black/20 pl-4 font-mono text-[10px] text-neutral-800 uppercase font-bold">
              FEATURING: ANKIT DIMRI<br />ACÚSTICO &amp; VINILOS
            </div>
</div>
<div className="relative z-10 flex-1 md:text-right order-1 md:order-2">
<div className="flex items-center md:justify-end gap-3">
<span className="px-2 py-0.5 bg-accent text-white font-mono text-[9px] font-bold uppercase tracking-wider">JUEVES</span>
<h4 className="font-display text-2xl sm:text-3xl lg:text-4xl uppercase leading-none tracking-tight text-black">THURSDAY TUNES</h4>
</div>
<div className="flex flex-wrap items-center md:justify-end gap-4 mt-2 font-mono text-xs text-neutral-800 font-bold uppercase">
<span className="">TEATRO MERCEDES SOSA</span>
<span className="">•</span>
<span className="">21:00 HS</span>
<span className="">•</span>
<a className="text-accent font-bold underline" href="https://www.alpogo.com" rel="noreferrer" target="_blank">RESERVA ONW</a>
</div>
</div>
</article>
{/* Viernes 12: Invertido con número a la izquierda en Naranja */}
<article className="relative bg-accent text-black p-5 sm:p-6 lg:px-10 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:bg-accent-soft transition-colors overflow-hidden">
<div className="relative z-10 flex items-center gap-4 order-2 md:order-1">
<div className="flex items-center gap-1.5 select-none">
<span className="font-display text-6xl sm:text-7xl lg:text-8xl leading-none text-white tracking-tighter">12</span>
<span className="font-mono text-[10px] font-black uppercase text-black tracking-widest [writing-mode:vertical-lr] rotate-180">ABRIL</span>
</div>
<div className="hidden lg:block border-l border-black/30 pl-4 font-mono text-[10px] text-black/90 uppercase font-bold">
              FEATURING: MAHI LIVE<br />SESIÓN ANALÓGICA
            </div>
</div>
<div className="relative z-10 flex-1 md:text-right order-1 md:order-2">
<div className="flex items-center md:justify-end gap-3">
<span className="px-2 py-0.5 bg-black text-white font-mono text-[9px] font-bold uppercase tracking-wider">VIERNES</span>
<h4 className="font-display text-2xl sm:text-3xl lg:text-4xl uppercase leading-none tracking-tight text-white">FUSION FRIDAY</h4>
</div>
<div className="flex flex-wrap items-center md:justify-end gap-4 mt-2 font-mono text-xs text-black/90 font-bold uppercase">
<span className="">CLUB CENTRAL CÓRDOBA</span>
<span className="">•</span>
<span className="">22:00 HS</span>
<span className="">•</span>
<span className="font-bold text-black">TICKETS $12.000</span>
</div>
</div>
</article>
{/* Sábado 13: Número al medio con layout dinámico */}
<article className="relative bg-[#e5e2e1] text-black p-5 sm:p-6 lg:px-10 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:bg-white transition-colors overflow-hidden">
<div className="relative z-10 flex-1">
<div className="flex items-center gap-3">
<h4 className="font-display text-2xl sm:text-3xl lg:text-4xl uppercase leading-none tracking-tight text-black">AFTERDARK SATURDAY</h4>
<span className="px-2 py-0.5 bg-accent text-white font-mono text-[9px] font-bold uppercase tracking-wider">SÁBADO</span>
</div>
<div className="flex flex-wrap items-center gap-4 mt-2 font-mono text-xs text-neutral-800 font-bold uppercase">
<span className="">FEATURING: PRASHANT // NOA VORTEX</span>
<span className="">•</span>
<span className="">23:30 ONW</span>
</div>
</div>
<div className="relative z-10 flex items-center gap-4 self-end md:self-auto">
<a className="hidden sm:inline-block px-4 py-1.5 bg-black text-white font-display text-xs uppercase tracking-wider hover:bg-accent transition-colors" href="https://www.passline.com" rel="noreferrer" target="_blank">PASSLINE ↗</a>
<div className="flex items-center gap-1.5 select-none">
<span className="font-display text-6xl sm:text-7xl lg:text-8xl leading-none text-accent tracking-tighter">13</span>
<span className="font-mono text-[10px] font-black uppercase text-neutral-700 tracking-widest [writing-mode:vertical-lr] rotate-180">ABRIL</span>
</div>
</div>
</article>
{/* Domingo 14: Gran cierre en franja Naranja */}
<article className="relative bg-accent text-black p-5 sm:p-6 lg:px-10 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:bg-accent-soft transition-colors overflow-hidden">
<div className="relative z-10 flex-1">
<div className="flex items-center gap-3">
<h4 className="font-display text-2xl sm:text-3xl lg:text-4xl uppercase leading-none tracking-tight text-white">SUNDAY SERENADE</h4>
<span className="px-2 py-0.5 bg-black text-white font-mono text-[9px] font-bold uppercase tracking-wider">DOMINGO</span>
</div>
<div className="flex flex-wrap items-center gap-4 mt-2 font-mono text-xs text-black/90 font-bold uppercase">
<span className="">FEATURING: ABHISHEK &amp; ABHI // FOLKLORE EXPERIMENTAL</span>
<span className="">•</span>
<span className="">20:00 HS</span>
<span className="">•</span>
<span className="">CASA MANAGUA</span>
</div>
</div>
<div className="relative z-10 flex items-center gap-4 self-end md:self-auto">
<a className="hidden sm:inline-block px-4 py-1.5 bg-white text-black font-display text-xs uppercase tracking-wider hover:bg-black hover:text-white transition-colors" href="https://www.alpogo.com" rel="noreferrer" target="_blank">ENTRADA LIBRE</a>
<div className="flex items-center gap-1.5 select-none">
<span className="font-display text-6xl sm:text-7xl lg:text-8xl leading-none text-white tracking-tighter">14</span>
<span className="font-mono text-[10px] font-black uppercase text-black tracking-widest [writing-mode:vertical-lr] rotate-180">ABRIL</span>
</div>
</div>
</article>
</div>
{/* Footer de Reservas y Ubicación estilo Kawaii poster */}
<div className="bg-[#0c0c0c] border-t border-surface-border p-6 text-center font-mono text-xs text-neutral-400 uppercase tracking-widest">
<p className="font-bold text-white mb-1">LÍNEA DIRECTA DE RESERVAS: +54 381 424 5555 / +54 381 625 2555</p>
<p className="text-neutral-500 text-[10px]">SAN MARTÍN &amp; 25 DE MAYO, CIRCUITO CULTURAL CENTRO HISTÓRICO, TUCUMÁN</p>
</div>
</div>
</div>
</section>
{/* ================= COMPONENTE 5: TABLA BRUTALISTA DE GIRA / FECHAS CON TIPOGRAFÍA CURVA Y HALFTONE DJS (REF: IMAGE_18) ================= */}
<section className="w-full py-16 lg:py-24 border-b border-surface-border bg-black relative overflow-hidden" id="circuito-ruteo">
{/* Background Halftone Overlay */}
<div className="absolute inset-0 halftone-dots opacity-15 pointer-events-none"></div>
<div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
{/* Header Section */}
<div className="flex items-baseline justify-between mb-10 pb-4 border-b border-surface-border">
<div className="flex items-center gap-3">
<span className="text-accent font-display text-xl">09 //</span>
<h2 className="font-display text-3xl lg:text-4xl uppercase tracking-tight text-white">CIRCUITO &amp; RUTEO REGIONAL // DATES ARCHIVE</h2>
</div>
<span className="text-on-surface-subtle text-[11px] font-mono tracking-widest hidden sm:inline-block">INSPIRADO EN CARTELERA AGENDA SEMANAL</span>
</div>
{/* Main Poster Layout with Screenprint/Halftone & Tour Grid */}
<div className="border-2 border-surface-border bg-[#0e0e0e] max-w-4xl mx-auto shadow-2xl overflow-hidden">
{/* Top Poster Banner: Massive Double Headline "AGENDA / AGENDA" with Incline Sticker */}
<div className="p-8 sm:p-12 border-b border-surface-border bg-[#141414] relative text-center select-none overflow-hidden">
{/* Vintage Corner Crosses ✦ */}
<div className="absolute top-4 left-4 text-accent text-2xl">✦</div>
<div className="absolute top-4 right-4 text-accent text-2xl">✦</div>
{/* Layered Typography */}
<div className="relative inline-block my-2">
<h3 className="font-display text-5xl sm:text-7xl lg:text-8xl tracking-tight uppercase text-white/20 leading-none">AGENDA</h3>
{/* Floating Yellow/Accent Capsule Sticker 'SEMANAL / EN VIVO' */}
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-6 bg-accent border-2 border-black text-black font-display text-lg sm:text-2xl px-6 py-1 rounded-full uppercase tracking-wider shadow-lg whitespace-nowrap z-20">
            CIRCUITO EN VIVO
          </div>
<h3 className="font-display text-5xl sm:text-7xl lg:text-8xl tracking-tight uppercase text-white leading-none -mt-4 sm:-mt-6 relative z-10">AGENDA</h3>
</div>
<p className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 mt-2">GIRA FEDERAL NOA // ENCUENTROS DE MÚSICA &amp; CLUBBING</p>
</div>
{/* TABLA BRUTALISTA DE FECHAS (Celdas Marcadas en Amarillo/Naranja con Bordes Negros y Cruces) */}
<div className="p-6 sm:p-10 bg-[#121212] border-b border-surface-border relative">
{/* Corner Crosses around Table */}
<div className="flex justify-between items-center text-accent text-lg mb-4 px-2">
<span className="">✦</span>
<span className="font-mono text-xs uppercase tracking-widest text-neutral-400">CRONOGRAMA DE ESCENARIOS CONFIRMADOS</span>
<span className="">✦</span>
</div>
<div className="space-y-2.5">
{/* Tour Row 1 */}
<div className="grid grid-cols-12 bg-accent border-2 border-black font-mono text-black font-bold uppercase text-xs sm:text-sm divide-x-2 divide-black shadow-[3px_3px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-transform">
<div className="col-span-5 p-3 sm:p-4 font-display text-base sm:text-xl tracking-tight text-black flex items-center">CLUB CENTRAL CÓRDOBA</div>
<div className="col-span-3 p-3 sm:p-4 text-center font-black flex items-center justify-center bg-[#ff5a26]">01 ABR</div>
<div className="col-span-4 p-3 sm:p-4 text-right sm:text-left flex items-center justify-between">
<span className="">SAN MIGUEL DE TUCUMÁN</span>
<span className="text-xs hidden sm:inline-block">↗</span>
</div>
</div>
{/* Tour Row 2 */}
<div className="grid grid-cols-12 bg-accent border-2 border-black font-mono text-black font-bold uppercase text-xs sm:text-sm divide-x-2 divide-black shadow-[3px_3px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-transform">
<div className="col-span-5 p-3 sm:p-4 font-display text-base sm:text-xl tracking-tight text-black flex items-center">ROBERT NESTA CLUB</div>
<div className="col-span-3 p-3 sm:p-4 text-center font-black flex items-center justify-center bg-[#ff5a26]">04 ABR</div>
<div className="col-span-4 p-3 sm:p-4 text-right sm:text-left flex items-center justify-between">
<span className="">TAFÍ VIEJO // TUC</span>
<span className="text-xs hidden sm:inline-block">↗</span>
</div>
</div>
{/* Tour Row 3 */}
<div className="grid grid-cols-12 bg-accent border-2 border-black font-mono text-black font-bold uppercase text-xs sm:text-sm divide-x-2 divide-black shadow-[3px_3px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-transform">
<div className="col-span-5 p-3 sm:p-4 font-display text-base sm:text-xl tracking-tight text-black flex items-center">TEATRO MERCEDES SOSA</div>
<div className="col-span-3 p-3 sm:p-4 text-center font-black flex items-center justify-center bg-[#ff5a26]">05 ABR</div>
<div className="col-span-4 p-3 sm:p-4 text-right sm:text-left flex items-center justify-between">
<span className="">S.M. DE TUCUMÁN</span>
<span className="text-xs hidden sm:inline-block">↗</span>
</div>
</div>
{/* Tour Row 4 */}
<div className="grid grid-cols-12 bg-accent border-2 border-black font-mono text-black font-bold uppercase text-xs sm:text-sm divide-x-2 divide-black shadow-[3px_3px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-transform">
<div className="col-span-5 p-3 sm:p-4 font-display text-base sm:text-xl tracking-tight text-black flex items-center">AFTERPARTY // MANAGUA</div>
<div className="col-span-3 p-3 sm:p-4 text-center font-black flex items-center justify-center bg-[#ff5a26]">06 ABR</div>
<div className="col-span-4 p-3 sm:p-4 text-right sm:text-left flex items-center justify-between">
<span className="">YERBA BUENA</span>
<span className="text-xs hidden sm:inline-block">↗</span>
</div>
</div>
</div>
{/* Bottom Table Crosses ✦ */}
<div className="flex justify-between items-center text-accent text-lg mt-4 px-2">
<span className="">✦</span>
<span className="font-mono text-[10px] uppercase text-neutral-500">RED DE SALAS ASOCIADAS AL CIRCUITO AUTOGESTIONADO</span>
<span className="">✦</span>
</div>
</div>
{/* SECCIÓN INFERIOR: ARTE DE CABINA/DJ HALFTONE CON STICKERS ELÍPTICOS */}
<div className="relative bg-[#090909] p-8 sm:p-12 overflow-hidden">
{/* Native SVG Vector DJ Booth + Halftone Wave Artwork */}
<div className="relative min-h-[300px] flex flex-col justify-end items-center">
{/* Kinetic Halftone DJ Deck Illustration (Pure SVG) */}
<div className="w-full max-w-xl mx-auto text-center">
<svg className="w-full h-44 mx-auto" fill="none" viewBox="0 0 600 220" xmlns="http://www.w3.org/2000/svg">
{/* Turntable Deck Base */}
<rect fill="#1a1a1a" height="95" rx="6" stroke="#ff3c00" strokeWidth="2" width="440" x="80" y="110" />
{/* Left Platter Vinyl with Halftone Rings */}
<circle cx="200" cy="155" fill="#0d0d0d" r="42" stroke="#fff" strokeDasharray="3 3" strokeWidth="1.5" />
<circle cx="200" cy="155" fill="#1c1c1c" r="26" stroke="#ff3c00" strokeWidth="2" />
<circle cx="200" cy="155" fill="#ff3c00" r="10" />
{/* Right Platter Vinyl */}
<circle cx="400" cy="155" fill="#0d0d0d" r="42" stroke="#fff" strokeDasharray="3 3" strokeWidth="1.5" />
<circle cx="400" cy="155" fill="#1c1c1c" r="26" stroke="#ff3c00" strokeWidth="2" />
<circle cx="400" cy="155" fill="#ff3c00" r="10" />
{/* Mixer Section */}
<rect fill="#111" height="65" stroke="#333" width="60" x="270" y="125" />
<line stroke="#ff3c00" strokeWidth="3" x1="285" x2="285" y1="140" y2="175" />
<line stroke="#fff" strokeWidth="3" x1="315" x2="315" y1="140" y2="175" />
{/* Stylized DJ Silhouettes with Headphone Graphic in Accent Halftone */}
<path d="M230,110 Q300,30 370,110" fill="none" stroke="#ff3c00" strokeDasharray="6 4" strokeWidth="4" />
<circle cx="300" cy="70" fill="#ff3c00" opacity="0.9" r="32" />
<circle cx="270" cy="70" fill="#fff" r="14" />
<circle cx="330" cy="70" fill="#fff" r="14" />
</svg>
</div>
{/* Floating Elliptical Stickers inspired by UMIRANDA / AGENDA / SEMANAL from Image 18 */}
<div className="absolute top-4 left-6 sm:left-12 -rotate-12 border-2 border-white bg-black/80 text-white font-mono text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-md">
            RADAR NOA
          </div>
<div className="absolute top-2 right-8 sm:right-20 rotate-12 border-2 border-accent bg-black/90 text-accent font-mono text-[10px] sm:text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest shadow-md">
            LIVE SET
          </div>
<div className="absolute bottom-8 left-4 sm:left-16 rotate-6 border border-white/60 bg-[#151515] text-white font-mono text-[9px] px-3 py-0.5 rounded-full uppercase tracking-wider">
            VINILOS &amp; SINTES
          </div>
<div className="absolute bottom-10 right-6 sm:right-16 -rotate-6 border border-accent bg-accent text-black font-display text-xs px-3 py-1 rounded-full uppercase tracking-wider font-black">
            ENTRADA ANTICIPADA
          </div>
</div>
{/* Bottom Card Strip */}
<div className="mt-8 pt-6 border-t border-surface-border flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
<span className="text-neutral-400">SET EN VIVO: TRANSMISIÓN RADIOFÓNICA FEDERAL</span>
<a className="px-5 py-2 bg-white text-black font-display uppercase tracking-wider text-xs hover:bg-accent hover:text-white transition-colors" href="https://www.passline.com" rel="noreferrer" target="_blank">
            VER FECHAS COMPLETAS ↗
          </a>
</div>
</div>
</div>
</div>
</section>
{/* ================= EDITORIAL SPLIT CALLOUT BANNER (B.ORION STYLE) ================= */}
<section className="w-full py-16 lg:py-24 border-b border-surface-border bg-black relative" id="calendario-reticular"><div className="max-w-[1440px] mx-auto px-6 lg:px-12"><div className="flex flex-col md:flex-row md:items-baseline justify-between mb-10 pb-4 border-b border-surface-border gap-4"><div className="flex items-center gap-3"><span className="text-accent font-display text-xl">10 //</span><h2 className="font-display text-3xl lg:text-4xl uppercase tracking-tight text-white">PRÓXIMOS EVENTOS // GRILLA RETICULAR &amp; FANZINE</h2></div><div className="flex items-center gap-3 font-mono text-[11px] tracking-widest uppercase text-on-surface-subtle"><span className="">INSPIRADO EN CALENDARIO FANZINE</span><span className="text-surface-border">|</span><span className="text-accent font-bold">10 //</span></div></div><div className="border-2 border-surface-border bg-[#0e0e0e] max-w-4xl mx-auto shadow-2xl overflow-hidden"><div className="bg-black border-b-2 border-surface-border p-6 sm:p-10"><div className="flex justify-between items-center text-xs font-mono text-neutral-400 mb-6 border-b border-surface-border pb-3"><span className="">TUC // NOA CULTURA</span><span className="text-accent font-bold tracking-widest">CIRCUITO ALTERNATIVO 2025</span></div><div className="flex flex-col md:flex-row md:items-end justify-between gap-6"><div><h3 className="font-display text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tight text-white leading-[0.88]">ABRIL / MAYO<br /><span className="text-[#e5e2e1]">CALENDARIO</span></h3></div><div className="text-left md:text-right font-mono text-[11px] text-neutral-400 uppercase tracking-wider space-y-1"><div className=""><span className="text-accent font-bold">DIRECCIÓN:</span> SAN MARTÍN 1129, SMT</div><div className=""><span className="text-white">HOTLINE:</span> +54 381 424 9898</div><div className="">@TUCUMANCULTURA • #NOAUNDER</div></div></div></div><div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-b-2 border-surface-border divide-y md:divide-y-0 md:divide-x border-white/20"><article className="bg-[#e5e2e1] text-black p-5 sm:p-6 flex flex-col justify-between min-h-[220px] relative border-b border-white/20"><div className="flex justify-between items-start text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-700"><span className="">(CICLO INDIE)</span><span className="">CADA JUEVES</span></div><div className="my-4 flex items-center justify-between gap-4"><div><h4 className="font-display text-4xl sm:text-5xl uppercase tracking-tighter leading-none text-black">WE ART<br />THE WORLD</h4><p className="font-mono text-[10px] font-bold text-neutral-700 mt-2 uppercase">MÚSICA EN VIVO + EXPO GRÁFICA</p></div><svg className="w-16 h-20 shrink-0 text-black" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 60 75"><circle cx="30" cy="26" r="20" /><path d="M10,26 h40" /><path d="M30,6 c8,10 8,30 0,40" /><path d="M30,6 c-8,10 -8,30 0,40" /><path d="M16,42 l14,28 l14,-28" /><path d="M22,46 h16" /><path d="M25,54 h10" /></svg></div><div className="flex justify-between items-center text-[10px] font-mono pt-3 border-t border-black/20"><span className="">ENTRADA LIBRE HASTA 23:30 HS</span><span className="font-black uppercase">SMT</span></div></article><article className="bg-[#0c0c0c] text-white p-5 sm:p-6 flex flex-col justify-between min-h-[220px] relative border-b border-white/20"><div className="flex justify-between items-start text-[10px] font-mono font-bold uppercase tracking-wider text-accent"><span className="">(NOCHE DE ARTE)</span><span className="text-neutral-400">CADA MIÉRCOLES</span></div><div className="my-4 flex items-center justify-between gap-4"><div><h4 className="font-display text-4xl sm:text-5xl uppercase tracking-tighter leading-none text-white">MOAN LISA<br /><span className="text-neutral-400">LOUNGE</span></h4><p className="font-mono text-[10px] text-accent mt-2 font-bold uppercase">FREE DRINK PARA ARTISTAS</p></div><svg className="w-16 h-20 shrink-0 text-white" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 60 75"><rect height="68" rx="2" strokeDasharray="3 2" width="52" x="4" y="4" /><circle cx="30" cy="24" r="12" /><path d="M22,36 C22,48 18,62 38,62 C46,62 46,48 40,36" /><path d="M25,23 Q30,26 35,23" /><path d="M26,20 h2" /><path d="M32,20 h2" /><path d="M20,18 C20,10 40,10 40,18" /></svg></div><div className="flex justify-between items-center text-[10px] font-mono pt-3 border-t border-white/10 text-neutral-400"><span className="">ESPACIO: CASA MANAGUA</span><span className="text-white font-bold">21:00 HS</span></div></article></div><div className="bg-accent text-white p-6 sm:p-8 relative border-b-2 border-surface-border overflow-hidden"><div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10"><div className="md:col-span-6"><span className="font-mono text-xs font-black uppercase text-black bg-white px-2 py-0.5 inline-block mb-3">(PROMO 2X1 BUBBLEGUM COMBO)</span><h4 className="font-display text-4xl sm:text-6xl uppercase tracking-tighter leading-none text-white">MELTED IN<br />TUCUMÁN</h4><p className="font-mono text-xs font-bold text-black mt-3 uppercase tracking-wider">CADA LUNES &amp; MARTES // NOCHE DE SINTES</p></div><div className="md:col-span-3 flex justify-center py-2"><svg className="w-32 h-36 text-white drop-shadow-md" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 100 120"><circle cx="50" cy="45" r="38" /><ellipse cx="50" cy="45" rx="22" ry="38" /><line x1="12" x2="88" y1="45" y2="45" /><line x1="20" x2="80" y1="26" y2="26" /><line x1="20" x2="80" y1="64" y2="64" /><path d="M12,45 C12,75 22,86 28,100 C30,104 34,104 36,96 C39,88 44,92 46,112 C47,117 51,117 52,108 C55,95 60,102 63,118 C65,122 68,122 70,110 C74,92 84,86 88,45 Z" fill="#ff3c00" /><path d="M30,90 Q34,106 36,96 Q40,84 46,112 Q50,118 52,108 Q57,90 63,118 Q67,122 70,110" stroke="#fff" strokeWidth="2.5" /></svg></div><div className="md:col-span-3 font-mono text-xs text-black font-bold uppercase space-y-2 md:text-right"><div className="">CLUB CENTRAL CÓRDOBA</div><div className="text-white text-base font-display">TICKETS $5.000</div><a className="inline-block px-4 py-1.5 bg-black text-white font-display text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-colors" href="https://www.passline.com" rel="noreferrer" target="_blank">COMPRAR 2X1 ↗</a></div></div></div><div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-b-2 border-surface-border divide-y md:divide-y-0 md:divide-x border-white/20"><article className="bg-[#0c0c0c] text-white p-5 sm:p-6 flex flex-col justify-between min-h-[220px] relative border-b border-white/20"><div className="flex justify-between items-start text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400"><span className="">(NOA LUCKY CARD)</span><span className="text-accent">CADA DOMINGO</span></div><div className="my-4 flex items-center justify-between gap-4"><div><h4 className="font-display text-4xl sm:text-5xl uppercase tracking-tighter leading-none text-white">SIP &amp; HEAL</h4><p className="font-mono text-[10px] text-neutral-400 mt-2 uppercase">VERMÚ, DISCOS &amp; POESÍA VANGUARDISTA</p></div><svg className="w-20 h-20 shrink-0 text-accent" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 70 70"><path d="M15,15 L35,40 L55,15 Z" /><path d="M35,40 L35,62" /><path d="M22,62 L48,62" /><circle cx="24" cy="22" fill="currentColor" r="3" /><circle cx="42" cy="20" fill="currentColor" r="2" /><path d="M48,22 Q58,26 62,35" /><path d="M8,22 Q2,30 6,42" /></svg></div><div className="flex justify-between items-center text-[10px] font-mono pt-3 border-t border-white/10 text-neutral-400"><span className="">HORARIO: 18:00 A 01:00 HS</span><span className="text-white font-bold">ENTRADA LIBRE</span></div></article><article className="bg-[#e5e2e1] text-black p-5 sm:p-6 flex flex-col justify-between min-h-[220px] relative border-b border-white/20"><div className="flex justify-between items-start text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-700"><span className="">(VARIETÉ UNDERGROUND)</span><span className="">CADA SÁBADO</span></div><div className="my-4 flex items-center justify-between gap-4"><div><h4 className="font-display text-4xl sm:text-5xl uppercase tracking-tighter leading-none text-black">CIRQUE<br />DEL NOA</h4><p className="font-mono text-[10px] font-bold text-neutral-700 mt-2 uppercase">TEATRO ACROBÁTICO &amp; CLUB DE BAILE</p></div><svg className="w-20 h-20 shrink-0 text-black" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 70 70"><ellipse cx="35" cy="56" rx="28" ry="10" /><circle cx="24" cy="20" r="6" /><path d="M24,26 L22,40 L16,50" /><path d="M22,40 L28,52" /><path d="M24,30 L16,34" /><circle cx="46" cy="18" r="6" /><path d="M46,24 L48,38 L44,52" /><path d="M48,38 L54,50" /><path d="M24,30 L46,28" /></svg></div><div className="flex justify-between items-center text-[10px] font-mono pt-3 border-t border-black/20 font-bold"><span className="">ESPACIO: MAGIC MUSIC BOX</span><span className="text-accent">23:00 HS</span></div></article></div><div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-b-2 border-surface-border divide-y md:divide-y-0 md:divide-x border-white/20"><article className="bg-[#e5e2e1] text-black p-5 sm:p-6 flex flex-col justify-between min-h-[220px] relative border-b border-white/20"><div className="flex justify-between items-start text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-700"><span className="">RECITAL EN VIVO</span><span className="text-accent font-black">19.04.2025</span></div><div className="my-4 flex items-center justify-between gap-4"><div><span className="font-display text-5xl sm:text-6xl uppercase tracking-tighter text-black leading-none block">POPART</span><span className="font-display text-3xl uppercase tracking-tight text-accent leading-none">#10 EDITION</span><p className="font-mono text-xs font-bold text-neutral-800 mt-2 uppercase">FEAT. RHYDER &amp; BANDA INVITADA</p></div><div className="w-16 h-16 bg-black text-white p-2 flex flex-col justify-center items-center text-center"><span className="font-mono text-[9px] uppercase tracking-wider">PUERTA</span><span className="font-display text-xl text-accent">21HS</span></div></div><div className="flex justify-between items-center text-[10px] font-mono pt-3 border-t border-black/20"><span className="">TEATRO SAN MARTÍN • SMT</span><a className="font-bold underline text-black hover:text-accent" href="https://www.passline.com" rel="noreferrer" target="_blank">TICKETS ↗</a></div></article><article className="bg-accent text-white p-5 sm:p-6 flex flex-col justify-between min-h-[220px] relative border-b border-white/20"><div className="flex justify-between items-start text-[10px] font-mono font-bold uppercase tracking-wider text-black"><span className="">HOMENAJE ELECTRÓNICO</span><span className="bg-black text-white px-2 py-0.5">SÁBADO 20.04</span></div><div className="my-4"><h4 className="font-display text-4xl sm:text-6xl uppercase tracking-tighter leading-none text-white">AVICII<br /><span className="text-black">TRIBUTE NOA</span></h4><p className="font-mono text-xs font-bold text-black/90 mt-2 uppercase">SINFÓNICA DE SINTETIZADORES &amp; DJ VÓRTEX</p></div><div className="flex justify-between items-center text-[10px] font-mono pt-3 border-t border-black/20 text-black font-bold"><span className="">ROBERT NESTA CLUB</span><span className="text-white bg-black px-2 py-0.5 uppercase">TICKETS $9.000</span></div></article></div><div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x border-white/20"><article className="bg-accent text-black p-5 sm:p-6 flex flex-col justify-between min-h-[220px] relative"><div className="flex justify-between items-start text-[10px] font-mono font-bold uppercase tracking-wider text-black"><span className="">BEATS &amp; FREESTYLE</span><span className="bg-black text-white px-2 py-0.5 font-bold">VIERNES 26.04</span></div><div className="my-4"><h4 className="font-display text-4xl sm:text-5xl uppercase tracking-tighter leading-none text-white">WORDS<br />&amp; RHYTHMS</h4><div className="mt-3 inline-block px-2.5 py-1 bg-black text-accent font-mono text-xs font-bold uppercase">FEAT. DJ KRUISE</div></div><div className="flex justify-between items-center text-[10px] font-mono pt-3 border-t border-black/20 font-bold"><span className="">CASA MANAGUA // 22:00 HS</span><span className="text-white">ENTRADAS EN PUERTA</span></div></article><article className="bg-[#e5e2e1] text-black p-5 sm:p-6 flex flex-col justify-between min-h-[220px] relative"><div className="flex justify-between items-start text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-700"><span className="">FERIA GRÁFICA &amp; VINILOS</span><span className="text-accent font-black">30/04 — 01/05</span></div><div className="my-4 flex items-center justify-between gap-4"><div><h4 className="font-display text-4xl sm:text-5xl uppercase tracking-tighter leading-none text-black">REUNIFI-<br />CATION DAY</h4><p className="font-mono text-xs font-bold text-neutral-800 mt-2 uppercase">MERCADO DE FANZINES, CASSETTES Y AFICHES</p></div><svg className="w-16 h-16 shrink-0 text-black" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 60 60"><circle cx="30" cy="30" r="26" /><circle cx="30" cy="30" r="10" /><circle cx="30" cy="30" fill="currentColor" r="3" /><path d="M30,4 A26,26 0 0,1 56,30" strokeDasharray="3 3" /><path d="M4,30 A26,26 0 0,1 30,56" strokeDasharray="3 3" /></svg></div><div className="flex justify-between items-center text-[10px] font-mono pt-3 border-t border-black/20 font-bold"><span className="">ESPACIO CULTURAL TUCUMÁN</span><span className="text-accent uppercase">ACCESO GRATUITO</span></div></article></div></div></div></section><section className="w-full bg-accent text-white py-14 lg:py-20 overflow-hidden" id="publicar">
<div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
<div>
<span className="text-black font-mono text-[11px] font-bold tracking-widest uppercase block mb-2">[ CIRCUITO AUTOGESTIONADO ]</span>
<h3 className="font-display text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tighter leading-none text-white">
        ¿PRODUCÍS O TOCÁS EN TUCUMÁN?
      </h3>
</div>
<a className="inline-flex items-center justify-center gap-3 px-8 py-5 bg-black text-white hover:bg-white hover:text-black font-display text-xl uppercase tracking-wider transition-all self-start lg:self-auto shrink-0" href="#">
<span className="">PUBLICAR EN AGENDA</span>
<span className="material-symbols-outlined">arrow_forward</span>
</a>
</div>
</section>
{/* ================= SALAS & ESPACIOS ACTIVOS ================= */}
<section className="w-full py-16 lg:py-24 border-b border-surface-border" id="salas">
<div className="max-w-[1440px] mx-auto px-6 lg:px-12">
<div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 border-b border-surface-border pb-4">
<div>
<span className="text-[11px] text-accent tracking-widest uppercase block font-bold mb-1">// MAPEO CULTURAL</span>
<h2 className="font-display text-3xl lg:text-4xl uppercase tracking-tight text-white">SALAS &amp; ESPACIOS ACTIVOS</h2>
</div>
<span className="text-on-surface-subtle text-[12px] uppercase">SAN MIGUEL DE TUCUMÁN</span>
</div>
{/* Directorio suizo de salas */}
<div className="divide-y divide-surface-border">
<div className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:bg-surface-dark px-4 transition-colors">
<div className="flex items-baseline gap-6">
<span className="font-mono text-xs text-on-surface-subtle">01</span>
<h4 className="font-display text-2xl lg:text-3xl uppercase tracking-tight text-white group-hover:text-accent transition-colors">
            TEATRO MERCEDES SOSA
          </h4>
</div>
<div className="flex items-center gap-8 text-[12px] text-on-surface-subtle font-mono">
<span className="">San Martín 479</span>
<span className="text-white">Cap: 1.600</span>
<a className="text-accent hover:underline flex items-center gap-1 font-bold" href="https://maps.google.com/?q=Teatro+Mercedes+Sosa+Tucuman" rel="noreferrer" target="_blank">
            MAPA <span className="material-symbols-outlined text-[14px]">north_east</span>
</a>
</div>
</div>
<div className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:bg-surface-dark px-4 transition-colors">
<div className="flex items-baseline gap-6">
<span className="font-mono text-xs text-on-surface-subtle">02</span>
<h4 className="font-display text-2xl lg:text-3xl uppercase tracking-tight text-white group-hover:text-accent transition-colors">
            CLUB CENTRAL CÓRDOBA
          </h4>
</div>
<div className="flex items-center gap-8 text-[12px] text-on-surface-subtle font-mono">
<span className="">Av. Alem 790</span>
<span className="text-white">Cap: 5.000</span>
<a className="text-accent hover:underline flex items-center gap-1 font-bold" href="https://maps.google.com/?q=Club+Central+Cordoba+Tucuman" rel="noreferrer" target="_blank">
            MAPA <span className="material-symbols-outlined text-[14px]">north_east</span>
</a>
</div>
</div>
<div className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:bg-surface-dark px-4 transition-colors">
<div className="flex items-baseline gap-6">
<span className="font-mono text-xs text-on-surface-subtle">03</span>
<h4 className="font-display text-2xl lg:text-3xl uppercase tracking-tight text-white group-hover:text-accent transition-colors">
            CASA MANAGUA CULTURAL
          </h4>
</div>
<div className="flex items-center gap-8 text-[12px] text-on-surface-subtle font-mono">
<span className="">San Juan 1015</span>
<span className="text-white">Cap: 250</span>
<a className="text-accent hover:underline flex items-center gap-1 font-bold" href="https://maps.google.com/?q=Casa+Managua+Tucuman" rel="noreferrer" target="_blank">
            MAPA <span className="material-symbols-outlined text-[14px]">north_east</span>
</a>
</div>
</div>
<div className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:bg-surface-dark px-4 transition-colors">
<div className="flex items-baseline gap-6">
<span className="font-mono text-xs text-on-surface-subtle">04</span>
<h4 className="font-display text-2xl lg:text-3xl uppercase tracking-tight text-white group-hover:text-accent transition-colors">
            MAGIC MUSIC BOX
          </h4>
</div>
<div className="flex items-center gap-8 text-[12px] text-on-surface-subtle font-mono">
<span className="">José Colombres 427</span>
<span className="text-white">Cap: 350</span>
<a className="text-accent hover:underline flex items-center gap-1 font-bold" href="https://maps.google.com/?q=Magic+Music+Box+Tucuman" rel="noreferrer" target="_blank">
            MAPA <span className="material-symbols-outlined text-[14px]">north_east</span>
</a>
</div>
</div>
<div className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:bg-surface-dark px-4 transition-colors">
<div className="flex items-baseline gap-6">
<span className="font-mono text-xs text-on-surface-subtle">05</span>
<h4 className="font-display text-2xl lg:text-3xl uppercase tracking-tight text-white group-hover:text-accent transition-colors">
            ROBERT NESTA CLUB
          </h4>
</div>
<div className="flex items-center gap-8 text-[12px] text-on-surface-subtle font-mono">
<span className="">San Martín 1129</span>
<span className="text-white">Cap: 800</span>
<a className="text-accent hover:underline flex items-center gap-1 font-bold" href="https://maps.google.com/?q=Robert+Nesta+Club+Tucuman" rel="noreferrer" target="_blank">
            MAPA <span className="material-symbols-outlined text-[14px]">north_east</span>
</a>
</div>
</div>
</div>
</div>
</section>
{/* ================= FOOTER ================= */}
<footer className="w-full bg-[#0b0b0b] pt-16 pb-12 text-on-surface-subtle font-mono text-[12px]">
<div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col gap-14">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
<div className="lg:col-span-6 flex flex-col gap-4">
<div className="flex items-center gap-3">
<span className="w-3 h-3 bg-accent inline-block"></span>
<span className="font-display text-2xl tracking-tight uppercase text-white">AGENDA CULTURAL TUCUMÁN</span>
</div>
<p className="max-w-md leading-relaxed text-[13px]">
          Archivo vivo y plataforma independiente de difusión cultural para la provincia de Tucumán y la región del NOA.
        </p>
</div>
<div className="lg:col-span-6 flex flex-col gap-3">
<span className="text-white uppercase font-bold tracking-wider text-[11px]">RECIBÍ LA CARTELERA CADA JUEVES</span>
<form className="flex items-stretch gap-2 max-w-md" onSubmit={(e) => e.preventDefault()}>
<input className="bg-surface-card border border-surface-border text-white text-xs px-4 py-3 flex-1 focus:outline-none focus:border-accent" placeholder="tu email..." type="email" />
<button className="bg-white text-black font-display uppercase tracking-wider px-6 text-sm hover:bg-accent hover:text-white transition-colors" type="submit">
            UNIRSE
          </button>
</form>
</div>
</div>
<div className="pt-8 border-t border-surface-border flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] uppercase tracking-widest">
<span className="">© 2025 AGENDA CULTURAL TUC // TODOS LOS DERECHOS RESERVADOS</span>
<div className="flex items-center gap-6">
<a className="hover:text-white transition-colors" href="https://www.passline.com" rel="noreferrer" target="_blank">PASSLINE</a>
<a className="hover:text-white transition-colors" href="https://www.ticketek.com.ar" rel="noreferrer" target="_blank">TICKETEK</a>
<a className="hover:text-white transition-colors" href="https://www.alpogo.com" rel="noreferrer" target="_blank">ALPOGO</a>
</div>
</div>
</div>
</footer>

      {/* ================= COOKIE BANNER ================= */}
      {!cookieConsent && (
        <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-[450px] bg-[#f5f1e8] border-4 border-black p-6 shadow-[8px_8px_0_#ff3c00] z-[9999] flex flex-col gap-4 animate-[slideUp_0.5s_ease-out]">
          <div>
            <h3 className="font-display text-2xl uppercase tracking-tighter text-black mb-2">TÉRMINOS Y COOKIES</h3>
            <p className="font-sans text-sm font-medium text-black/80 leading-relaxed">
              Utilizamos cookies para mantener estadísticas anónimas de visitas y mejorar tu experiencia en nuestra plataforma. Al continuar navegando, aceptas nuestros términos y condiciones.
            </p>
          </div>
          <div className="flex justify-end gap-4 mt-2">
            <button 
              onClick={handleAcceptCookies}
              className="bg-[#ff3c00] text-white font-display uppercase tracking-widest px-6 py-2 border-2 border-black hover:bg-white hover:text-black transition-colors shadow-[4px_4px_0_#000] active:translate-y-1 active:shadow-[0_0_0_#000]"
            >
              ACEPTAR
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
