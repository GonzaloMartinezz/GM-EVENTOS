import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cookieConsent, setCookieConsent] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    // Check local storage for cookie consent on mount
    const consent = localStorage.getItem("gm_events_cookie_consent");
    if (!consent) {
      setCookieConsent(false);
    }
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem("gm_events_cookie_consent", "true");
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
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <div className="bg-[#0b0b0b] text-on-surface font-mono antialiased selection:bg-accent selection:text-white">
      {/* ================= MINIMALIST ABSOLUTE NAVBAR (ONLY AT TOP) ================= */}
      <div className="absolute top-0 left-0 w-full z-40 flex flex-wrap items-center justify-between gap-4 px-6 lg:px-12 h-24">
        <Link to="/evento" className="flex items-center gap-2 group">
          <span className="bg-[#ff3c00] text-white font-display text-2xl lg:text-3xl uppercase px-2.5 py-1 tracking-tighter leading-none group-hover:bg-white group-hover:text-black transition-colors">
            GM
          </span>
          <span className="font-display text-xl lg:text-2xl uppercase tracking-widest text-white group-hover:text-[#ff3c00] transition-colors leading-none">
            EVENTS
          </span>
        </Link>
        <button
          onClick={() => setIsMenuOpen(true)}
          className="text-white hover:text-[#ff3c00] transition-colors"
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* ================= SCROLL NAVBAR (EXPANDED) ================= */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500 h-24 bg-[#f5f1e8] shadow-[0_4px_0_#000] border-b-4 border-black ${isScrolled || isSearchFocused || isMenuOpen ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="absolute inset-0 flex flex-wrap items-center justify-between gap-4 px-6 lg:px-12">
          {/* Left Links with Dropdowns */}
          <nav className="hidden xl:flex items-center gap-10">
            {[
              { name: "AGENDA", sub: ["HOY", "ESTE FINDE", "ESTE MES"] },
              {
                name: "CIUDADES",
                sub: ["TUCUMÁN", "BUENOS AIRES", "CÓRDOBA"],
              },
              {
                name: "EVENTOS",
                sub: ["MÚSICA EN VIVO", "TEATROS", "FESTIVALES"],
              },
            ].map((item) => (
              <div
                key={item.name}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link to={`/${item.name.toLowerCase()}`}
                  className="font-display text-sm lg:text-base uppercase tracking-widest text-black hover:text-[#ff3c00] transition-colors py-8 flex items-center gap-1"
                >
                  {item.name}
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    className={`transition-transform duration-300 ${activeDropdown === item.name ? "rotate-180" : ""}`}
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </Link>

                {/* Dropdown Menu */}
                <div
                  className={`absolute top-full left-0 bg-black border-4 border-black shadow-[4px_4px_0_#ff3c00] flex flex-col min-w-[220px] transition-all duration-300 origin-top ${activeDropdown === item.name ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 pointer-events-none"}`}
                >
                  {item.sub.map((subItem) => (
                    <Link key={subItem}
                      to={`/${subItem.toLowerCase().replace(/\s+/g, '-')}`}
                      className="font-display text-sm uppercase tracking-widest text-white hover:text-black hover:bg-[#ff3c00] px-4 py-3 transition-colors border-b border-white/20 last:border-0"
                    >
                      {subItem}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {/* Center Logo */}
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
            <Link to="/evento"
              className="inline-block transform -rotate-2 hover:rotate-0 transition-transform duration-300 group"
            >
              <div className="bg-[#ff3c00] text-white border-4 border-black px-5 py-2 shadow-[4px_4px_0px_#000] group-hover:bg-white group-hover:text-black transition-colors">
                <h1 className="font-display text-2xl md:text-3xl lg:text-4xl uppercase tracking-tighter leading-none m-0">
                  CULTURA ARGENTINA
                </h1>
                <span className="block bg-black text-white group-hover:text-[#ff3c00] font-mono text-[8px] md:text-[10px] text-center uppercase tracking-widest mt-1 py-0.5 transition-colors">
                  CLUB ABIERTO
                </span>
              </div>
            </Link>
          </div>

          {/* Right Section: Search & Contact */}
          <div className="hidden xl:flex items-center gap-6">
            <div className="relative group w-64">
              <input
                type="text"
                placeholder="BUSCAR EVENTO..."
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full bg-white border-4 border-black font-display uppercase tracking-widest text-sm px-4 py-2 text-black focus:outline-none focus:border-[#ff3c00] focus:shadow-[4px_4px_0_#ff3c00] transition-all"
              />
              <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-black"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>

            <Link to="/contacto"
              className="font-display text-sm lg:text-base uppercase tracking-widest text-black hover:text-[#ff3c00] transition-colors"
            >
              CONTACTO
            </Link>
          </div>

          {/* Mobile Hamburger (Only visible on small screens when scrolled) */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="xl:hidden text-black hover:text-[#ff3c00] transition-colors ml-auto relative z-10"
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </header>

      {/* SIDE PANEL MENU HAMBURGUESA */}
      <div
        className={`fixed inset-0 z-[100] transition-all duration-500 ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
      >
        {/* Fondo semitransparente */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        ></div>

        {/* Panel lateral */}
        <div
          className={`absolute top-0 right-0 h-full w-full md:w-[650px] bg-[#f5f1e8] shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-center px-8 md:px-12 md:rounded-l-3xl overflow-hidden ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-8 right-8 text-black hover:text-[#ff3c00] transition-colors z-10"
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <nav className="flex flex-col justify-center h-full gap-0 py-10 relative z-0">
            {["AGENDA", "CIUDADES", "EVENTOS", "CONTACTO"].map(
              (item) => (
                <Link key={item}
                  to={`/${item.toLowerCase().replace(" ", "-")}`}
                  onClick={() => setIsMenuOpen(false)}
                  style={{ fontFamily: "'Anton', sans-serif" }}
                  className={`text-[15vw] sm:text-[12vw] md:text-[5rem] lg:text-[5.5rem] leading-[0.8] uppercase tracking-normal transition-colors py-1 whitespace-nowrap text-left ${item === "CONTACTO" ? "text-[#ff3c00]" : "text-black hover:text-[#ff3c00]"}`}
                >
                  {item}
                </Link>
              ),
            )}
          </nav>
        </div>
      </div>

      {/* ================= HERO EDITORIAL BANNER ================= */}
      <section className="relative w-full h-screen min-h-[600px] lg:min-h-[800px] flex items-center justify-center overflow-hidden bg-black">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-100 pointer-events-none"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/20"></div>

        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-2 sm:px-4 pb-0 -mt-[15vh] md:-mt-[10vh]">
          <div
            className="flex flex-wrap items-center justify-center gap-x-[2vw] gap-y-2 w-full text-white uppercase tracking-tighter text-[14vw] sm:text-[12vw] md:text-[9vw] leading-[0.9]"
            style={{ fontFamily: "'Anton', sans-serif" }}
          >
            <span>BUSCA TU</span>
            <span className="relative inline-block whitespace-nowrap">
              EVENTO
              <svg
                className="absolute -inset-[1vw] w-[calc(100%+2vw)] h-[calc(100%+2vw)] text-white/80 pointer-events-none"
                viewBox="0 0 200 100"
                preserveAspectRatio="none"
              >
                <ellipse
                  cx="100"
                  cy="50"
                  rx="90"
                  ry="40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  className="drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                />
              </svg>
            </span>
          </div>

          <h1
            style={{ fontFamily: "'Anton', sans-serif" }}
            className="text-[#ff3c00] text-[28vw] leading-[0.75] uppercase tracking-normal w-full text-center mt-0 sm:mt-2 drop-shadow-[0_10px_30px_rgba(255,60,0,0.4)] select-none transition-transform duration-500 hover:scale-[1.02] cursor-crosshair m-0 p-0"
          >
            FAVORITO
          </h1>
        </div>
      </section>
      {/* ================= NEW COMPONENT: VIVÍ LA CULTURA (ORIGINAL DESIGN) ================= */}

      <section className="w-full bg-[#f4f2f0] relative pt-0 pb-0 border-b-2 border-black z-20 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10 flex flex-col items-center">
          {/* Giant Title */}
          <div className="relative w-full flex justify-center items-end mt-4 md:mt-8 mb-[-4vw] md:mb-[-6vw] py-4 md:py-8 z-30">
            {/* Background Black Stripe (edge to edge) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] h-full bg-black z-0"></div>

            <h2 className="font-display text-[10vw] md:text-[12vw] lg:text-[140px] leading-[0.8] uppercase tracking-tighter text-white text-center relative z-0 whitespace-nowrap">
              VIVÍ LA CULTURA
            </h2>
          </div>

          {/* Big Rounded Image */}
          <div className="group relative w-full aspect-auto rounded-[2rem] overflow-hidden z-10 border-4 border-black shadow-2xl bg-black transition-transform duration-700 hover:scale-[1.01] hover:shadow-[12px_12px_0px_#ff3c00] cursor-pointer">
            <img
              src="/screen.png"
              alt="Crowd at a concert"
              className="w-full h-auto object-cover opacity-60"
            />

            {/* Top Left Pill */}
            <div className="absolute top-6 left-6 lg:top-8 lg:left-8 bg-white rounded-full px-4 py-2 flex items-center gap-2 border-2 border-black shadow-[4px_4px_0px_#000]">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff3c00]"></div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-black">
                MÚSICA EN VIVO • TEATRO • FERIAS
              </span>
            </div>

            {/* Bottom Left Text */}
            <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 max-w-xl pr-6">
              <span className="font-mono text-xs md:text-sm text-[#ff3c00] font-bold uppercase tracking-widest bg-black px-2 py-1">
                AGENDA AUTOGESTIVA 2026-2027
              </span>
              <h3 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white uppercase tracking-tighter leading-[0.9] mt-3 drop-shadow-md">
                ESPECTÁCULOS, BANDAS EN VIVO Y<br />
                ESPACIOS INDEPENDIENTES.
              </h3>
            </div>

            {/* Bottom Right Button */}
            <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12">
              <a href="#lineup"
                className="group/btn inline-flex items-center gap-2 bg-[#ff3c00] text-white font-display text-xl md:text-2xl uppercase tracking-widest px-8 py-4 rounded-full border-2 border-black hover:bg-white hover:text-black transition-all shadow-[4px_4px_0px_#000] hover:shadow-[8px_8px_0px_#000] active:translate-y-1 active:shadow-[2px_2px_0px_#000]"
              >
                EXPLORAR CARTELERA
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-300 group-hover/btn:translate-x-2"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Scrolling Marquee */}
        <div className="w-full border-y-2 border-black bg-[#f4f2f0] mt-12 py-4 overflow-hidden relative flex">
          <div
            className="animate-marquee whitespace-nowrap flex items-center gap-8"
            style={{ animationDuration: "12s" }}
          >
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-8">
                {[
                  "TEATRO SAN MARTÍN",
                  "CASA MANAGUA",
                  "CENTRO CULTURAL VIRLA",
                  "PATIO LORCA",
                  "MAGIC MUSIC BOX",
                  "PANGEA AUTOGESTIÓN",
                ].map((venue, j) => (
                  <span
                    key={`${i}-${j}`}
                    className="flex items-center gap-3 font-display text-2xl uppercase tracking-widest text-black"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="#ff3c00"
                      stroke="#ff3c00"
                      strokeWidth="2"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    {venue}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="w-full py-16 border-b border-surface-border bg-black"
        id="circuitos"
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          {/* Header Tríptico */}
          <div className="flex items-baseline justify-between mb-8 pb-3 border-b border-surface-border">
            <div className="flex items-center gap-3">
              <span className="text-accent font-display text-xl">01 //</span>
              <h2 className="font-display text-2xl lg:text-3xl uppercase tracking-tight text-white">
                TRÍPTICO RETÍCULA SUIZA // CICLO SONORO
              </h2>
            </div>
            <span className="text-on-surface-subtle text-[11px] font-mono tracking-widest hidden sm:inline-block">
              INSPIRADO EN AFICHES "HACEMOS SENTIR A LAS MULTITUDES"
            </span>
          </div>

          {/* 6 Paneles: 3 arriba, 3 abajo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 gap-x-0">
            {/* ROW 1 */}
            <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 border border-white/20">
              {/* Panel 1 */}
              <article className="relative bg-[#0b0b0b] text-white p-6 sm:p-8 lg:p-10 flex flex-col justify-between min-h-[580px] border-b md:border-b-0 md:border-r border-white/20 group transition-colors overflow-hidden">
                <div className="absolute inset-0 grid grid-cols-2 grid-rows-3 pointer-events-none border border-white/10">
                  <div className="border-r border-b border-white/10"></div>
                  <div className="border-b border-white/10"></div>
                  <div className="border-r border-b border-white/10"></div>
                  <div className="border-b border-white/10"></div>
                  <div className="border-r border-white/10"></div>
                  <div></div>
                </div>
                
                <div className="relative z-10 flex flex-col h-full">
                  {/* Top */}
                  <div className="flex justify-between items-start text-[9px] uppercase tracking-wider font-mono mb-12">
                    <span className="leading-tight">
                      <span className="text-[#ff3c00] font-bold">VOL. 01</span>
                      <br />
                      <span className="text-white/70">CICLO SONORO NOA</span>
                    </span>
                    <span className="text-right max-w-[160px] text-white/70 leading-tight text-[8px]">
                      PRODUCCIÓN ESTRATÉGICA DE<br/>EXPERIENCIAS CULTURALES EN<br/>ESPACIOS HISTÓRICOS.
                    </span>
                  </div>
                  
                  {/* Center */}
                  <h3 className="font-display text-3xl sm:text-5xl lg:text-6xl xl:text-7xl break-words break-all uppercase leading-[0.9] tracking-tight mt-8 mb-auto flex-1">
                    VIVÍ<br />LA<br />MÚSICA<br />HOY
                  </h3>
                  
                  {/* Bottom */}
                  <div className="pt-8 border-t border-white/10 mt-8">
                    <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-end gap-4 sm:gap-2">
                      <div>
                        <span className="text-[#ff3c00] text-[11px] uppercase font-bold tracking-widest block">
                          15 OCTUBRE 2026
                        </span>
                        <p className="font-display text-xl uppercase tracking-tight mt-1">
                          ERUCA SATIVA + PECES
                        </p>
                        <span className="text-white/70 text-[10px] block mt-1 font-bold">
                          CLUB CENTRAL CÓRDOBA • $18.000
                        </span>
                      </div>
                      <Link to="/evento" className="flex-shrink-0 px-4 py-2 bg-white text-black font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-[#ff3c00] hover:text-white transition-colors flex items-center gap-1">
                        PASSLINE <span className="text-[14px] leading-none">↗</span>
                      </Link>
                    </div>
                    <div className="mt-6 flex flex-col sm:flex-row sm:justify-between gap-2 text-[8px] text-white/50 font-mono uppercase tracking-widest pt-2">
                      <span>REF: TLA-01</span>
                      <span>TUCUMÁN • CBA</span>
                    </div>
                  </div>
                </div>
              </article>

              {/* Panel 2 */}
              <article className="relative bg-[#ff3c00] text-black p-6 sm:p-8 lg:p-10 flex flex-col justify-between min-h-[580px] border-b md:border-b-0 md:border-r border-black/20 group transition-colors overflow-hidden">
                <div className="relative z-10 flex flex-col h-full">
                  {/* Top */}
                  <div className="flex justify-between items-start text-[9px] uppercase tracking-wider font-mono mb-12">
                    <span className="leading-tight font-black">
                      VOL. 02
                      <br />
                      <span className="font-medium">NOCHE ELÉCTRICA</span>
                    </span>
                    <span className="text-right max-w-[160px] font-bold leading-tight text-[8px]">
                      DISPOSITIVO DE SONIDO<br/>INDEPENDIENTE. AMPLIFICACIÓN<br/>ANALÓGICA TUCUMANA.
                    </span>
                  </div>
                  
                  {/* Center */}
                  <h3 className="font-display text-3xl sm:text-5xl lg:text-6xl xl:text-7xl break-words break-all uppercase leading-[0.9] tracking-tight mt-8 mb-auto flex-1">
                    VIVÍ<br />LA<br />MÚSICA<br />HOY
                  </h3>
                  
                  {/* Bottom */}
                  <div className="pt-8 border-t border-black/20 mt-8">
                    <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-end gap-4 sm:gap-2">
                      <div>
                        <span className="text-black text-[11px] uppercase font-black tracking-widest block">
                          21 OCTUBRE 2026
                        </span>
                        <p className="font-display text-xl uppercase tracking-tight mt-1">
                          BABASÓNICOS // VORTEX
                        </p>
                        <span className="text-black/80 text-[10px] block mt-1 font-bold">
                          TEATRO MERCEDES SOSA • $24.000
                        </span>
                      </div>
                      <Link to="/evento" className="flex-shrink-0 px-4 py-2 bg-black text-white font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors flex items-center gap-1">
                        TICKETEK <span className="text-[14px] leading-none">↗</span>
                      </Link>
                    </div>
                    <div className="mt-6 flex flex-col sm:flex-row sm:justify-between gap-2 text-[8px] text-black/60 font-mono uppercase tracking-widest pt-2">
                      <span>REF: TLA-02</span>
                      <span>CAPACIDAD: 1.600</span>
                    </div>
                  </div>
                </div>
              </article>

              {/* Panel 3 */}
              <article className="relative bg-[#0b0b0b] text-white p-6 sm:p-8 lg:p-10 flex flex-col justify-between min-h-[580px] group transition-colors overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
                  <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full text-[#ff3c00] fill-current">
                    <path d="M0,100 C30,60 70,80 100,20 L100,100 Z" opacity="0.3" />
                    <path d="M0,100 C40,40 60,90 100,40 L100,100 Z" opacity="0.2" />
                  </svg>
                  <div className="halftone-dots-white absolute inset-0 opacity-20"></div>
                </div>
                
                <div className="relative z-10 flex flex-col h-full">
                  {/* Top */}
                  <div className="flex justify-between items-start text-[9px] uppercase tracking-wider font-mono mb-12">
                    <span className="leading-tight">
                      <span className="text-[#ff3c00] font-bold">VOL. 03</span>
                      <br />
                      <span className="text-white/70">SÍNTESIS ANALÓGICA</span>
                    </span>
                    <span className="text-right max-w-[160px] text-white/70 leading-tight text-[8px]">
                      INTERSECCIÓN DE ARTE<br/>GENERATIVO, MÚSICA DE RAÍZ Y<br/>PAISAJISMO TUCUMANO.
                    </span>
                  </div>
                  
                  {/* Center */}
                  <h3 className="font-display text-3xl sm:text-5xl lg:text-6xl xl:text-7xl break-words break-all uppercase leading-[0.9] tracking-tight mt-8 mb-auto flex-1">
                    VIVÍ<br />LA<br />MÚSICA<br />HOY
                  </h3>
                  
                  {/* Bottom */}
                  <div className="pt-8 border-t border-white/10 mt-8">
                    <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-end gap-4 sm:gap-2">
                      <div>
                        <span className="text-[#ff3c00] text-[11px] uppercase font-bold tracking-widest block">
                          20 NOVIEMBRE 2026
                        </span>
                        <p className="font-display text-xl uppercase tracking-tight mt-1">
                          HERMANOS DEL NOA
                        </p>
                        <span className="text-white/70 text-[10px] block mt-1 font-bold">
                          CASA MANAGUA • ENTRADA LIBRE
                        </span>
                      </div>
                      <Link to="/evento" className="flex-shrink-0 px-4 py-2 bg-white text-black font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-[#ff3c00] hover:text-white transition-colors flex items-center gap-1">
                        RESERVA <span className="text-[14px] leading-none">↗</span>
                      </Link>
                    </div>
                    <div className="mt-6 flex flex-col sm:flex-row sm:justify-between gap-2 text-[8px] text-white/50 font-mono uppercase tracking-widest pt-2">
                      <span>REF: TLA-03</span>
                      <span>BARRIO NORTE</span>
                    </div>
                  </div>
                </div>
              </article>
            </div>

            {/* ROW 2 */}
            <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 border border-white/20 mt-4 md:mt-8">
              {/* Panel 4: Pink */}
              <article className="relative bg-[#f39cbb] text-black p-6 sm:p-8 lg:p-10 flex flex-col justify-between min-h-[580px] border-b md:border-b-0 md:border-r border-black/20 group transition-colors overflow-hidden">
                <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-10">
                  <div className="border-r border-b border-black"></div>
                  <div className="border-r border-b border-black"></div>
                  <div className="border-b border-black"></div>
                  <div className="border-r border-b border-black"></div>
                  <div className="border-r border-b border-black"></div>
                  <div className="border-b border-black"></div>
                </div>
                <div className="relative z-10 flex flex-col h-full">
                  {/* Top */}
                  <div className="flex justify-between items-start text-[9px] uppercase tracking-wider font-mono mb-12">
                    <span className="leading-tight font-black">
                      VOL. 04
                      <br />
                      <span className="font-medium">CICLO URBANO</span>
                    </span>
                    <span className="text-right max-w-[160px] font-bold leading-tight text-[8px]">
                      CULTURA HIP HOP Y EXPRESIÓN<br/>URBANA EN EL CORAZÓN DE LA CIUDAD.
                    </span>
                  </div>
                  
                  {/* Center */}
                  <h3 className="font-display text-3xl sm:text-5xl lg:text-6xl xl:text-7xl break-words break-all uppercase leading-[0.9] tracking-tight mt-8 mb-auto flex-1">
                    VIVÍ<br />LA<br />MÚSICA<br />HOY
                  </h3>
                  
                  {/* Bottom */}
                  <div className="pt-8 border-t border-black/20 mt-8">
                    <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-end gap-4 sm:gap-2">
                      <div>
                        <span className="text-black text-[11px] uppercase font-black tracking-widest block">
                          05 DICIEMBRE 2026
                        </span>
                        <p className="font-display text-xl uppercase tracking-tight mt-1">
                          TRUENO // BIEN O MAL
                        </p>
                        <span className="text-black/80 text-[10px] block mt-1 font-bold">
                          CLUB FLORESTA • $20.000
                        </span>
                      </div>
                      <Link to="/evento" className="flex-shrink-0 px-4 py-2 bg-black text-[#f39cbb] font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors flex items-center gap-1">
                        PASSLINE <span className="text-[14px] leading-none">↗</span>
                      </Link>
                    </div>
                    <div className="mt-6 flex flex-col sm:flex-row sm:justify-between gap-2 text-[8px] text-black/60 font-mono uppercase tracking-widest pt-2">
                      <span>REF: TLA-04</span>
                      <span>TUCUMÁN • SMT</span>
                    </div>
                  </div>
                </div>
              </article>

              {/* Panel 5: Yellow */}
              <article className="relative bg-[#e2f952] text-black p-6 sm:p-8 lg:p-10 flex flex-col justify-between min-h-[580px] border-b md:border-b-0 md:border-r border-black/20 group transition-colors overflow-hidden">
                <div className="relative z-10 flex flex-col h-full">
                  {/* Top */}
                  <div className="flex justify-between items-start text-[9px] uppercase tracking-wider font-mono mb-12">
                    <span className="leading-tight font-black">
                      VOL. 05
                      <br />
                      <span className="font-medium">EXPERIMENTAL NOA</span>
                    </span>
                    <span className="text-right max-w-[160px] font-bold leading-tight text-[8px]">
                      NUEVOS SONIDOS. EXPERIMENTACIÓN<br/>Y VANGUARDIA EN ESPACIOS REDUCIDOS.
                    </span>
                  </div>
                  
                  {/* Center */}
                  <h3 className="font-display text-3xl sm:text-5xl lg:text-6xl xl:text-7xl break-words break-all uppercase leading-[0.9] tracking-tight mt-8 mb-auto flex-1">
                    VIVÍ<br />LA<br />MÚSICA<br />HOY
                  </h3>
                  
                  {/* Bottom */}
                  <div className="pt-8 border-t border-black/20 mt-8">
                    <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-end gap-4 sm:gap-2">
                      <div>
                        <span className="text-black text-[11px] uppercase font-black tracking-widest block">
                          12 ENERO 2027
                        </span>
                        <p className="font-display text-xl uppercase tracking-tight mt-1">
                          PECERA + LOS RUSOS
                        </p>
                        <span className="text-black/80 text-[10px] block mt-1 font-bold">
                          CASA BABYLON • $15.000
                        </span>
                      </div>
                      <Link to="/evento" className="flex-shrink-0 px-4 py-2 bg-black text-[#e2f952] font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors flex items-center gap-1">
                        TICKETEK <span className="text-[14px] leading-none">↗</span>
                      </Link>
                    </div>
                    <div className="mt-6 flex flex-col sm:flex-row sm:justify-between gap-2 text-[8px] text-black/60 font-mono uppercase tracking-widest pt-2">
                      <span>REF: TLA-05</span>
                      <span>CÓRDOBA • CBA</span>
                    </div>
                  </div>
                </div>
              </article>

              {/* Panel 6: Black */}
              <article className="relative bg-[#111111] text-white p-6 sm:p-8 lg:p-10 flex flex-col justify-between min-h-[580px] group transition-colors overflow-hidden">
                <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 pointer-events-none border border-white/5 opacity-50">
                  <div className="border-r border-b border-white/10"></div>
                  <div className="border-b border-white/10"></div>
                  <div className="border-r border-white/10"></div>
                  <div></div>
                </div>
                
                <div className="relative z-10 flex flex-col h-full">
                  {/* Top */}
                  <div className="flex justify-between items-start text-[9px] uppercase tracking-wider font-mono mb-12">
                    <span className="leading-tight">
                      <span className="text-[#e2f952] font-bold">VOL. 06</span>
                      <br />
                      <span className="text-white/70">INDIE FEDERAL</span>
                    </span>
                    <span className="text-right max-w-[160px] text-white/70 leading-tight text-[8px]">
                      LA ESCENA INDEPENDIENTE A NIVEL<br/>NACIONAL CONGREGADA EN UN SOLO LUGAR.
                    </span>
                  </div>
                  
                  {/* Center */}
                  <h3 className="font-display text-3xl sm:text-5xl lg:text-6xl xl:text-7xl break-words break-all uppercase leading-[0.9] tracking-tight mt-8 mb-auto flex-1">
                    VIVÍ<br />LA<br />MÚSICA<br />HOY
                  </h3>
                  
                  {/* Bottom */}
                  <div className="pt-8 border-t border-white/10 mt-8">
                    <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-end gap-4 sm:gap-2">
                      <div>
                        <span className="text-[#e2f952] text-[11px] uppercase font-bold tracking-widest block">
                          20 FEBRERO 2027
                        </span>
                        <p className="font-display text-xl uppercase tracking-tight mt-1">
                          EL MATÓ A UN POLICÍA...
                        </p>
                        <span className="text-white/70 text-[10px] block mt-1 font-bold">
                          NICETO CLUB • $25.000
                        </span>
                      </div>
                      <Link to="/evento" className="flex-shrink-0 px-4 py-2 bg-[#e2f952] text-black font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors flex items-center gap-1">
                        RESERVA <span className="text-[14px] leading-none">↗</span>
                      </Link>
                    </div>
                    <div className="mt-6 flex flex-col sm:flex-row sm:justify-between gap-2 text-[8px] text-white/50 font-mono uppercase tracking-widest pt-2">
                      <span>REF: TLA-06</span>
                      <span>BUENOS AIRES • CABA</span>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* ================= COMPONENTE 2: HERO POSTER EDITORIAL "ESTILO FUJI" ================= */}
      <section
        className="w-full py-16 border-b border-surface-border"
        id="destacado-fuji"
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-baseline justify-between mb-8 pb-3 border-b border-surface-border">
            <div className="flex items-center gap-3">
              <span className="text-accent font-display text-xl">02 //</span>
              <h2 className="font-display text-2xl lg:text-3xl uppercase tracking-tight text-white">
                POSTER MONUMENTAL CONTEXTUAL // COMPONENTE "FUJI"
              </h2>
            </div>
            <span className="text-on-surface-subtle text-[11px] font-mono tracking-widest hidden sm:inline-block">
              INSPIRADO EN AFICHE FUJI / STUDIO EDITORIAL
            </span>
          </div>

          <div className="flex flex-col gap-16 lg:gap-24 pb-12">
            {[
              {
                title: "TUCUMÁN",
                subtitle:
                  "PROVINCIA DE TUCUMÁN • VALLES CALCHAQUÍES • SISTEMA RADAR DE CONVOCATORIA MUSICAL Y TEATRAL INDEPENDIENTE",
                color: "bg-[#ff3c00]",
                customSize:
                  "text-[13vw] sm:text-[10vw] md:text-[140px] md:text-[180px] lg:text-[220px]", // Centrado y sin cortar!
                meta: {
                  p1: "* MONTE CALCHAQUÍ ELEVACIÓN 4.500M",
                  p2: "CAPACIDAD HABILITADA: 7.500",
                  p3: "SOPORTE: GIRA FEDERAL NOA",
                  p4: "COD: SMT-2026",
                },
                events: [
                  {
                    title: "DIVIDIDOS // ESTADIO CENTRAL CÓRDOBA",
                    date: "11 MARZO 2027 // 21:00 HS",
                    desc: "La aplanadora del rock regresa repasando 35 años de historia.",
                    price: "$22.000",
                  },
                  {
                    title: "LAS PELOTAS // FLORESTA",
                    date: "18 MARZO 2027 // 22:00 HS",
                    desc: "Presentación exclusiva de su nuevo disco en el mítico club.",
                    price: "$18.000",
                  },
                  {
                    title: "NO TE VA GUSTAR // CENTRAL CÓRDOBA",
                    date: "02 ABRIL 2027 // 20:30 HS",
                    desc: "El rock charrúa vuelve a Tucumán con un show de más de 2 horas.",
                    price: "$25.000",
                  },
                ],
              },
              {
                title: "BUENOS<br/>AIRES",
                subtitle:
                  "CABA Y GBA • ZONA METROPOLITANA • SISTEMA RADAR DE CONVOCATORIA MUSICAL",
                color: "bg-[#e2f952]",
                customSize:
                  "text-[13vw] sm:text-[9vw] md:text-[120px] md:text-[160px] lg:text-[200px]",
                meta: {
                  p1: "* RÍO DE LA PLATA ELEVACIÓN 25M",
                  p2: "CAPACIDAD HABILITADA: 65.000",
                  p3: "SOPORTE: GIRA NACIONAL",
                  p4: "COD: BUE-2026",
                },
                events: [
                  {
                    title: "WOS // ESTADIO RIVER PLATE",
                    date: "25 ABRIL 2027 // 20:00 HS",
                    desc: "El cierre definitivo de la gira Descartes en el Monumental.",
                    price: "$45.000",
                  },
                  {
                    title: "YSY A // ESTADIO HURACÁN",
                    date: "08 MAYO 2027 // 19:30 HS",
                    desc: "El hombre sismo hace temblar Parque Patricios.",
                    price: "$35.000",
                  },
                  {
                    title: "DILLOM // MOVISTAR ARENA",
                    date: "15 MAYO 2027 // 21:00 HS",
                    desc: "Presentación oficial de Por Cesárea.",
                    price: "$40.000",
                  },
                ],
              },
              {
                title: "CÓRDOBA",
                subtitle:
                  "PROVINCIA DE CÓRDOBA • SIERRAS CENTRALES • SISTEMA RADAR DE CONVOCATORIA MUSICAL",
                color: "bg-[#f39cbb]",
                customSize:
                  "text-[13vw] sm:text-[10vw] md:text-[140px] md:text-[180px] lg:text-[220px]",
                meta: {
                  p1: "* SIERRAS CHICAS ELEVACIÓN 1.200M",
                  p2: "CAPACIDAD HABILITADA: 40.000",
                  p3: "SOPORTE: GIRA FEDERAL CENTRO",
                  p4: "COD: COR-2026",
                },
                events: [
                  {
                    title: "LA RENGA // ESTADIO KEMPES",
                    date: "14 MAYO 2027 // 21:30 HS",
                    desc: "El banquete más grande del centro del país. Noche histórica.",
                    price: "$30.000",
                  },
                  {
                    title: "MON LAFERTE // PLAZA DE LA MÚSICA",
                    date: "22 MAYO 2027 // 20:00 HS",
                    desc: "Tour Autopoiética, una noche íntima y potente.",
                    price: "$35.000",
                  },
                  {
                    title: "CUARTETO DE NOS // QUALITY ARENA",
                    date: "29 MAYO 2027 // 21:00 HS",
                    desc: "Lámina Once llega a Córdoba con todos sus hits.",
                    price: "$28.000",
                  },
                ],
              },
            ].map((poster, i) => (
              <div
                key={i}
                className="border-2 border-surface-border overflow-hidden bg-black shadow-2xl transition-transform duration-500 hover:scale-[1.01]"
              >
                {/* MITAD SUPERIOR */}
                <div
                  className={`relative ${poster.color} text-black p-8 sm:p-12 lg:p-16 flex flex-col justify-between min-h-[380px] lg:min-h-[460px]`}
                >
                  <div className="absolute top-6 left-6 text-3xl font-bold select-none text-black">
                    ↖
                  </div>
                  <div className="absolute top-6 right-6 text-3xl font-bold select-none text-black">
                    ↗
                  </div>
                  <div className="absolute bottom-6 left-6 text-3xl font-bold select-none text-black">
                    ↙
                  </div>
                  <div className="absolute bottom-6 right-6 text-3xl font-bold select-none text-black">
                    ↘
                  </div>

                  <div className="w-full text-center px-12">
                    <p className="font-mono text-[9px] sm:text-[10px] tracking-widest text-black/90 uppercase font-bold max-w-3xl mx-auto leading-relaxed">
                      {poster.subtitle}
                    </p>
                  </div>

                  <div className="my-auto w-full flex justify-center py-6">
                    <h2
                      className={`font-display ${poster.customSize} leading-[0.8] tracking-tighter uppercase text-black select-none text-center`}
                      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(poster.title) }}
                    />
                  </div>

                  <div className="w-full text-center px-12">
                    <p className="font-mono text-[8px] sm:text-[9.5px] tracking-widest text-black/85 uppercase font-bold max-w-4xl mx-auto leading-relaxed">
                      EL JARDÍN DE LA REPÚBLICA PRESENTA SU CARTELERA CENTRAL
                      CON ARTISTAS CONSAGRADOS Y VANGUARDIA EXPERIMENTAL.
                    </p>
                  </div>
                </div>

                {/* MITAD INFERIOR (3 EVENTS) */}
                <div className="relative bg-[#0d0d0d] text-white p-8 sm:p-12 border-t border-black flex flex-col gap-10">
                  <div className="halftone-dots-white absolute inset-0 opacity-15 pointer-events-none"></div>

                  {poster.events.map((ev, j) => (
                    <div
                      key={j}
                      className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center border-b border-white/10 pb-10 last:border-0 last:pb-0"
                    >
                      <div className="lg:col-span-8 space-y-3">
                        <div className="flex items-center gap-3">
                          <span
                            className={`px-2.5 py-0.5 ${poster.color} text-black font-mono text-[10px] font-bold tracking-widest uppercase`}
                          >
                            FECHA ESTELAR
                          </span>
                          <span className="text-black/70 font-mono text-xs uppercase tracking-widest">
                            {ev.date}
                          </span>
                        </div>
                        <h3 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase break-words break-all hyphens-auto tracking-tight text-white leading-none">
                          {ev.title}
                        </h3>
                        <p className="text-black/70 font-mono text-xs max-w-2xl leading-relaxed">
                          {ev.desc}
                        </p>
                      </div>
                      <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col justify-end items-start lg:items-end gap-4">
                        <div className="text-left lg:text-right">
                          <span
                            className={`block ${poster.color.replace("bg-", "text-")} font-display text-3xl`}
                          >
                            {ev.price}
                          </span>
                          <span className="text-neutral-500 font-mono text-[10px] uppercase tracking-wider">
                            SECTOR GENERAL / CAMPO
                          </span>
                        </div>
                        <a className="px-8 py-4 bg-white text-black hover:bg-black hover:text-white font-display text-sm uppercase tracking-widest transition-all border-2 border-transparent hover:border-white"
                          href="https://www.passline.com"
                          rel="noreferrer"
                          target="_blank"
                        >
                          ADQUIRIR TICKET ↗
                        </a>
                      </div>
                    </div>
                  ))}

                  {/* Barra inferior tipo pie de imprenta */}
                  <div className="relative z-10 mt-2 pt-4 border-t border-neutral-800 flex flex-wrap justify-between items-center text-[9px] font-mono text-neutral-500 uppercase tracking-widest gap-2">
                    <span>{poster.meta.p1}</span>
                    <span>{poster.meta.p2}</span>
                    <span>{poster.meta.p3}</span>
                    <span>{poster.meta.p4}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ================= NUEVO COMPONENTE: FESTIVAL SCHEDULE // GRID CROMÁTICA DE HORARIOS (REF: IMAGE_27) ================= */}
      <section
        className="w-full py-16 lg:py-24 border-b border-surface-border bg-accent text-black relative"
        id="festival-schedule"
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-8 pb-3 border-b-2 border-black gap-4">
            <div className="flex items-center gap-3">
              <span className="text-black font-display text-xl">04 //</span>
              <h2 className="font-display text-2xl lg:text-3xl uppercase tracking-tight text-black">
                FESTIVAL SCHEDULE // GRID CROMÁTICA DE HORARIOS
              </h2>
            </div>
            <span className="text-black/80 text-[11px] font-mono tracking-widest font-bold hidden sm:inline-block">
              INSPIRADO EN GROOVE WAVE FESTIVAL POSTER
            </span>
          </div>
          {/* Contenedor Maestro Festival Schedule */}
          <div className="bg-accent border-4 border-black p-6 sm:p-10 lg:p-14 shadow-2xl relative">
            {/* Header Festival con branding GROOVE WAVE */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b-2 border-black pb-6">
              <div className="inline-block bg-black text-white px-6 py-4 shadow-lg">
                <h3 className="font-display text-3xl sm:text- lg:text-8xl tracking-tight uppercase leading-[0.88]">
                  FESTIVAL
                  <br />
                  <span className="text-accent">SCHEDULE</span>
                </h3>
              </div>
              <div className="flex flex-col items-start md:items-end gap-2">
                <div className="bg-black text-white font-display text-base uppercase px-3 py-1 tracking-widest shadow">
                  GROOVE WAVE // TUC
                </div>
                <div className="bg-white text-black font-mono text-xs font-bold uppercase px-3 py-1 tracking-wider border border-black">
                  HORARIOS POR ESCENARIOS
                </div>
              </div>
            </div>
            {/* Sub-cabeceras de Meta: Fecha y Locación */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              <div className="bg-white text-black p-4 border-2 border-black shadow-[4px_4px_0px_#000]">
                <span className="font-mono text-[10px] uppercase font-bold text-neutral-600 block mb-0.5">
                  FECHA &amp; RANGO HORARIO
                </span>
                <p className="font-display text-2xl sm:text-3xl uppercase tracking-tight">
                  15 OCTUBRE 2026 // 12:00 A 24:00 HS
                </p>
              </div>
              <div className="bg-white text-black p-4 border-2 border-black shadow-[4px_4px_0px_#000]">
                <span className="font-mono text-[10px] uppercase font-bold text-neutral-600 block mb-0.5">
                  SEDE CENTRAL
                </span>
                <p className="font-display text-2xl sm:text-3xl uppercase tracking-tight">
                  ESTADIO CENTRAL CÓRDOBA // METRÓPOLIS
                </p>
              </div>
            </div>
            {/* Grilla de Horarios 2 Columnas con Tarjetas Blancas y Bloques Negros */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
              {[
                {
                  time: "18:00 PM",
                  artist: "APERTURA / PREVIA",
                  desc: "INGRESO GENERAL Y DJ SET DE BIENVENIDA AL ATARDECER",
                  stage: "ESCENARIO TUCUMÁN",
                  tag: "ACCESO LIBRE CON TICKET",
                  color: "bg-white text-black",
                },
                {
                  time: "19:30 PM",
                  artist: "ERUCA SATIVA",
                  desc: "EL POWER TRÍO ABRE LA NOCHE CON TODA SU FUERZA",
                  stage: "ESCENARIO ALTERNATIVO",
                  tag: "SHOW COMPLETO",
                  color: "bg-[#e2f952] text-black",
                },
                {
                  time: "21:00 PM",
                  artist: "DIVIDIDOS",
                  desc: "LA APLANADORA DEL ROCK REPASANDO SUS CLÁSICOS",
                  stage: "ESCENARIO CENTRAL",
                  tag: "PRINCIPAL / SHOW 2 HS",
                  color: "bg-[#f39cbb] text-black",
                },
                {
                  time: "23:00 PM",
                  artist: "TRUENO",
                  desc: "BIEN O MAL TOUR - EL HIP HOP SE TOMA EL ESCENARIO",
                  stage: "ESCENARIO URBANO",
                  tag: "DESTACADO URBANO",
                  color: "bg-[#ff3c00] text-black",
                },
                {
                  time: "00:30 AM",
                  artist: "NO TE VA GUSTAR",
                  desc: "UN REPASO INOLVIDABLE POR MÁS DE 25 AÑOS DE HISTORIA",
                  stage: "ESCENARIO CENTRAL",
                  tag: "ARTISTA INVITADO",
                  color: "bg-[#ffd3b6] text-black",
                },
                {
                  time: "02:00 AM",
                  artist: "LAS PELOTAS",
                  desc: "MÁS DE UNA HORA DE PURO ROCK NACIONAL EN LA MADRUGADA",
                  stage: "ESCENARIO ALTERNATIVO",
                  tag: "SHOW COMPLETO",
                  color: "bg-[#a8e6cf] text-black",
                },
                {
                  time: "03:30 AM",
                  artist: "BABASÓNICOS",
                  desc: "EL TOQUE SOFISTICADO Y BILABLE DE LA NOCHE",
                  stage: "ESCENARIO TUCUMÁN",
                  tag: "SET ESPECIAL NOCTURNO",
                  color: "bg-[#e2f952] text-black",
                },
                {
                  time: "05:00 AM",
                  artist: "PECES RAROS",
                  desc: "EL CIERRE ELECTRÓNICO QUE NADIE SE QUIERE PERDER",
                  stage: "ESCENARIO ELECTRÓNICO",
                  tag: "FIESTA DE CIERRE",
                  color: "bg-black text-white",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`${item.color} border-2 border-black p-6 shadow-[6px_6px_0px_#000] flex flex-col justify-between min-h-[170px] hover:translate-x-0.5 hover:translate-y-0.5 transition-transform`}
                >
                  <div
                    className={`inline-block font-display text-xl sm:text-2xl px-4 py-1 self-start mb-3 ${item.color === "bg-black text-white" ? "bg-white text-black" : "bg-black text-white"}`}
                  >
                    {item.time}
                  </div>
                  <div>
                    <h4 className="font-display text-3xl uppercase tracking-tight leading-tight">
                      {item.artist}
                    </h4>
                    <p
                      className={`font-mono text-xs font-bold mt-1 uppercase ${item.color === "bg-black text-white" ? "text-neutral-300" : "text-neutral-700"}`}
                    >
                      {item.desc}
                    </p>
                  </div>
                  <div
                    className={`mt-4 pt-3 flex justify-between items-center text-[10px] font-mono font-bold ${item.color === "bg-black text-white" ? "border-t border-white/20" : "border-t border-black/20"}`}
                  >
                    <span className="">{item.stage}</span>
                    <span
                      className={`font-black uppercase ${item.color === "bg-black text-white" ? "text-accent" : item.color === "bg-[#ff3c00] text-black" ? "text-white" : "text-accent"}`}
                    >
                      {item.tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* ================= COMPONENTE 3: CARTELERA BRUTALISTA VIVA (REF: IMAGE_2 & IMAGE_5) ================= */}
      <main className="w-full py-16 lg:py-24" id="salas">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          {/* Section Title & Meta */}
          <div className="flex items-baseline justify-between mb-12 border-b border-surface-border pb-4">
            <div className="flex items-baseline gap-4">
              <span className="text-accent font-display text-xl">07 //</span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-white">
                CARTELERA EXPERIMENTAL
              </h2>
              <span className="text-accent text-[12px] font-bold tracking-widest uppercase hidden md:inline-block">
                07 //
              </span>
            </div>
            <span className="text-on-surface-subtle text-[12px] font-mono hidden sm:inline-block">
              SIN FOTOS PREFIJADAS // 100% RETÍCULA BRUTALISTA
            </span>
          </div>
          {/* GRID MODULAR 4 CARDS COMPLEJAS DE DISEÑO GRÁFICO EDITORIAL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {/* CARD A: ESTILO B.ORION MODULAR CON NÚMEROS DESCOMUNALES 618 / 345 (REF: IMAGE_2) */}
            <article className="bg-surface-card border border-surface-border hover:border-accent transition-colors flex flex-col justify-between group">
              {/* Top modular bar B.ORION header */}
              <div className="bg-black border-b border-surface-border px-5 py-3 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-accent inline-block"></span>
                  <span className="text-white font-bold">
                    B.ORION // EDICIÓN NOA
                  </span>
                </div>
                <span className="text-neutral-500">SH. - 06</span>
              </div>
              {/* Poster Graphic Area (Puro HTML/CSS Modular) */}
              <div className="p-6 bg-[#0e0e0e] grid grid-cols-12 gap-4">
                {/* Columna izquierda: Nombres en tipografía brutalista expandida (Juno, Zyrah, Amara, Selene) */}
                <div className="col-span-5 border-r border-surface-border/80 pr-4 flex flex-col justify-between space-y-2">
                  <div>
                    <span className="text-[9px] font-mono text-neutral-500 uppercase block mb-1">
                      LINEUP TUC
                    </span>
                    <p className="font-display text-2xl uppercase tracking-tighter text-white hover:text-accent cursor-default">
                      JUNO
                    </p>
                    <p className="font-display text-2xl uppercase tracking-tighter text-white hover:text-accent cursor-default">
                      ZYRAH
                    </p>
                    <p className="font-display text-2xl uppercase tracking-tighter text-white hover:text-accent cursor-default">
                      AMARA
                    </p>
                    <p className="font-display text-2xl uppercase tracking-tighter text-white hover:text-accent cursor-default">
                      INES
                    </p>
                    <p className="font-display text-2xl uppercase tracking-tighter text-white hover:text-accent cursor-default">
                      SELENE
                    </p>
                  </div>
                  <div className="pt-4 border-t border-surface-border/60">
                    <span className="text-[9px] font-mono text-accent uppercase font-bold block">
                      FORMATO
                    </span>
                    <span className="text-[11px] font-mono text-neutral-300">
                      SET EN VIVO ANALÓGICO
                    </span>
                  </div>
                </div>
                {/* Columna central / derecha: Grandes números 618 y 345 + Fecha Monumental */}
                <div className="col-span-7 flex flex-col justify-between pl-2">
                  <div className="bg-surface-dark border border-surface-border p-4 mb-3">
                    <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest block">
                      FECHA CENTRAL
                    </span>
                    <h4 className="font-display text-3xl uppercase leading-none text-white mt-1">
                      ECHOES UNBOUND
                    </h4>
                    <p className="font-mono text-accent text-sm font-bold mt-1">
                      29 NOVIEMBRE 2026
                    </p>
                  </div>
                  {/* Bloque de números descomunales tipo poster suizo */}
                  <div className="grid grid-cols-2 gap-2 text-center bg-black border border-surface-border py-4 px-2">
                    <div className="border-r border-surface-border">
                      <span className="font-display text-3xl sm:text- text-white leading-none block">
                        618
                      </span>
                      <span className="text-[8px] font-mono text-neutral-500 uppercase tracking-widest">
                        SERIE EXP.
                      </span>
                    </div>
                    <div>
                      <span className="font-display text-3xl sm:text- text-accent leading-none block">
                        345
                      </span>
                      <span className="text-[8px] font-mono text-neutral-500 uppercase tracking-widest">
                        LOTE TUC
                      </span>
                    </div>
                  </div>
                  {/* Franja SUN RUN roja en degradé editorial */}
                  <div className="mt-3 bg-gradient-to-r from-accent to-[#b52700] py-2 px-3 text-center">
                    <span className="font-display text-2xl uppercase tracking-widest text-black font-black">
                      SUN • RUN • FEST
                    </span>
                  </div>
                </div>
              </div>
              {/* Bottom Action Strip */}
              <div className="p-6 bg-surface-card border-t border-surface-border flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] text-accent font-mono uppercase tracking-widest block">
                    TEATRO SAN MARTÍN • SMT
                  </span>
                  <span className="text-white font-bold text-lg">$16.500</span>
                </div>
                <a className="px-5 py-2.5 bg-white text-black font-display text-xs uppercase tracking-wider hover:bg-accent hover:text-white transition-colors flex items-center gap-1.5"
                  href="https://www.passline.com"
                  rel="noreferrer"
                  target="_blank"
                >
                  <span className="">PASSLINE</span>
                  <span className="material-symbols-outlined text-[14px]">
                    arrow_outward
                  </span>
                </a>
              </div>
            </article>
            {/* CARD B: ESTILO "PROCESSOS / DEMANDAS DEMANDAS DEMANDAS" CON KEYBOARD KEYS 3D (REF: IMAGE_5) */}
            <article className="bg-surface-card border border-surface-border hover:border-accent transition-colors flex flex-col justify-between group">
              {/* Top Header con badge estilo Free Font / Concluídos */}
              <div className="bg-black border-b border-surface-border px-5 py-3 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 bg-accent text-white text-[9px] font-bold">
                    DZP
                  </span>
                  <span className="text-white font-bold">
                    PROCESSOS // VOL. 04
                  </span>
                </div>
                <span className="text-neutral-400">#CONCLUÍDOS</span>
              </div>
              {/* Poster Graphic Area (Teclas de teclado 3D + Texto Masivo Repetido DEMANDAS) */}
              <div className="p-6 bg-[#111111] flex flex-col justify-between space-y-6">
                {/* TECLAS DE TECLADO 3D (P-R-O-C-E-S-S-O-S) recreadas puramente en CSS */}
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-2 text-[9px] font-mono text-neutral-500 uppercase tracking-widest">
                    <span className="">INPUT HARDWARE</span>
                    <span className="">EXPERIMENTAL KEYSET</span>
                  </div>
                  <div className="flex items-center justify-center gap-1 sm:gap-2 py-3 bg-[#181818] border border-surface-border rounded">
                    <span className="key-cap w-7 h-9 sm:w-8 sm:h-10 bg-neutral-900 border border-neutral-700 text-white font-mono font-bold text-xs sm:text-sm flex items-center justify-center rounded">
                      P
                    </span>
                    <span className="key-cap w-7 h-9 sm:w-8 sm:h-10 bg-neutral-900 border border-neutral-700 text-white font-mono font-bold text-xs sm:text-sm flex items-center justify-center rounded">
                      R
                    </span>
                    <span className="key-cap w-7 h-9 sm:w-8 sm:h-10 bg-neutral-900 border border-neutral-700 text-white font-mono font-bold text-xs sm:text-sm flex items-center justify-center rounded">
                      O
                    </span>
                    <span className="key-cap w-7 h-9 sm:w-8 sm:h-10 bg-neutral-900 border border-neutral-700 text-white font-mono font-bold text-xs sm:text-sm flex items-center justify-center rounded">
                      C
                    </span>
                    <span className="key-cap w-7 h-9 sm:w-8 sm:h-10 bg-neutral-900 border border-neutral-700 text-white font-mono font-bold text-xs sm:text-sm flex items-center justify-center rounded">
                      E
                    </span>
                    <span className="key-cap w-7 h-9 sm:w-8 sm:h-10 bg-neutral-900 border border-neutral-700 text-white font-mono font-bold text-xs sm:text-sm flex items-center justify-center rounded">
                      S
                    </span>
                    <span className="key-cap w-7 h-9 sm:w-8 sm:h-10 bg-neutral-900 border border-neutral-700 text-white font-mono font-bold text-xs sm:text-sm flex items-center justify-center rounded">
                      S
                    </span>
                    <span className="key-cap w-7 h-9 sm:w-8 sm:h-10 bg-neutral-900 border border-neutral-700 text-white font-mono font-bold text-xs sm:text-sm flex items-center justify-center rounded">
                      O
                    </span>
                    <span className="key-cap w-7 h-9 sm:w-8 sm:h-10 bg-neutral-900 border border-neutral-700 text-white font-mono font-bold text-xs sm:text-sm flex items-center justify-center rounded">
                      S
                    </span>
                  </div>
                </div>
                {/* TIPOGRAFÍA MASIVA REPETIDA "DEMANDAS DEMANDAS DEMANDAS" CON RECORTE Y ACCENT */}
                <div className="relative overflow-hidden py-2 select-none">
                  <p className="font-display text-3xl sm:text-6xl text-neutral-600 uppercase tracking-tighter leading-none opacity-40">
                    DEMANDAS
                  </p>
                  <p className="font-display text-3xl sm:text- text-white uppercase tracking-tighter leading-none -my-1">
                    DEMANDAS
                  </p>
                  <p className="font-display text-3xl sm:text- text-accent uppercase tracking-tighter leading-none">
                    DEMANDAS
                  </p>
                  {/* Badge flotante FREE FONT / SOBRESSALENTES */}
                  <div className="absolute bottom-1 right-2 bg-white text-black px-2 py-0.5 font-display text-xs uppercase tracking-wider">
                    FREE FONT // TUC
                  </div>
                </div>
                {/* Fila inferior: QR vectorial simulado en código CSS + Subtexto editorial */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-surface-border/60">
                  <div className="flex items-center gap-3">
                    {/* QR Block hecho en CSS Grid puro */}
                    <div className="w-12 h-12 bg-white p-1 grid grid-cols-4 gap-0.5 shrink-0">
                      <div className="bg-black"></div>
                      <div className="bg-black"></div>
                      <div className="bg-white"></div>
                      <div className="bg-black"></div>
                      <div className="bg-black"></div>
                      <div className="bg-white"></div>
                      <div className="bg-black"></div>
                      <div className="bg-white"></div>
                      <div className="bg-white"></div>
                      <div className="bg-black"></div>
                      <div className="bg-black"></div>
                      <div className="bg-black"></div>
                      <div className="bg-black"></div>
                      <div className="bg-white"></div>
                      <div className="bg-black"></div>
                      <div className="bg-black"></div>
                    </div>
                    <div>
                      <span className="font-display text-lg text-white uppercase leading-none block">
                        SOBRESSALENTES
                      </span>
                      <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-wider">
                        STAND UP EXPERIMENTAL
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-accent text-xs font-bold">
                    21 MARZO
                  </span>
                </div>
              </div>
              {/* Bottom Action Strip */}
              <div className="p-6 bg-surface-card border-t border-surface-border flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] text-accent font-mono uppercase tracking-widest block">
                    CASA MANAGUA • SMT
                  </span>
                  <span className="text-white font-bold text-lg">$14.000</span>
                </div>
                <a className="px-5 py-2.5 bg-white text-black font-display text-xs uppercase tracking-wider hover:bg-accent hover:text-white transition-colors flex items-center gap-1.5"
                  href="https://www.passline.com"
                  rel="noreferrer"
                  target="_blank"
                >
                  <span className="">TICKETEK</span>
                  <span className="material-symbols-outlined text-[14px]">
                    arrow_outward
                  </span>
                </a>
              </div>
            </article>
            {/* CARD C: AFICHE TIPOGRÁFICO DE CONTRASTE ALTO "MONOBLOC FESTIVAL" */}
            <article className="bg-surface-card border border-surface-border hover:border-accent transition-colors flex flex-col justify-between group">
              <div className="bg-black border-b border-surface-border px-5 py-3 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-white inline-block"></span>
                  <span className="text-white font-bold">
                    FESTIVAL // CIRCUITO CÉNTRICO
                  </span>
                </div>
                <span className="text-accent font-bold">3 DÍAS</span>
              </div>
              <div className="p-8 bg-[#0c0c0c] flex flex-col justify-between space-y-6">
                <div className="flex justify-between items-start">
                  <div className="border-l-2 border-accent pl-3">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">
                      SELECCIÓN OFICIAL
                    </span>
                    <span className="font-mono text-xs text-white uppercase font-bold">
                      EDICIÓN OTOÑO NOA
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-display text-3xl sm:text-4xl text-accent block leading-none">
                      16
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase">
                      ABRIL
                    </span>
                  </div>
                </div>
                {/* Gran bloque tipográfico compuesto */}
                <div className="py-4">
                  <h3 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase break-words break-all hyphens-auto leading-[0.88] text-white">
                    MONOBLOC
                    <br />
                    <span className="text-stroke-accent">INDEPENDIENTE</span>
                    <br />
                    TUCUMÁN
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-2 text-[10px] font-mono uppercase">
                    <span className="px-2 py-1 bg-surface-dark border border-surface-border text-neutral-300">
                      SINTETIZADORES
                    </span>
                    <span className="px-2 py-1 bg-surface-dark border border-surface-border text-neutral-300">
                      ARTE VISUAL
                    </span>
                    <span className="px-2 py-1 bg-surface-dark border border-surface-border text-neutral-300">
                      FERIA EDITORIAL
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-surface-dark border border-surface-border/70 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
                  <span className="text-neutral-400">LOCACIÓN:</span>
                  <span className="text-white font-bold">
                    MAGIC MUSIC BOX (J. COLOMBRES 427)
                  </span>
                </div>
              </div>
              <div className="p-6 bg-surface-card border-t border-surface-border flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] text-accent font-mono uppercase tracking-widest block">
                    ACCESO COMPLETO
                  </span>
                  <span className="text-white font-bold text-lg">$12.000</span>
                </div>
                <a className="px-5 py-2.5 bg-white text-black font-display text-xs uppercase tracking-wider hover:bg-accent hover:text-white transition-colors flex items-center gap-1.5"
                  href="https://www.passline.com"
                  rel="noreferrer"
                  target="_blank"
                >
                  <span className="">PASSLINE</span>
                  <span className="material-symbols-outlined text-[14px]">
                    arrow_outward
                  </span>
                </a>
              </div>
            </article>
            {/* CARD D: AFICHE EXPERIMENTAL FOLKLORE & VANGUARDIA (ZINE LAYOUT) */}
            <article className="bg-surface-card border border-surface-border hover:border-accent transition-colors flex flex-col justify-between group">
              <div className="bg-black border-b border-surface-border px-5 py-3 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-accent inline-block"></span>
                  <span className="text-white font-bold">
                    PEÑA // EXPERIMENTAL
                  </span>
                </div>
                <span className="text-neutral-400">VOL. 09</span>
              </div>
              <div className="p-8 bg-[#0c0c0c] flex flex-col justify-between space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono text-accent uppercase tracking-widest block font-bold">
                      CRUCE REGIONAL
                    </span>
                    <h4 className="font-display text-2xl uppercase tracking-tight text-white mt-1">
                      CULTURA DE RAÍZ
                    </h4>
                  </div>
                  <span className="px-2 py-1 bg-white text-black font-mono text-[10px] font-bold uppercase">
                    ENTRADA LIBRE
                  </span>
                </div>
                {/* Bloque gráfico con texto masivo invertido */}
                <div className="bg-white text-black p-6 space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold uppercase">
                    <span className="">TAFÍ DEL VALLE / SMT</span>
                    <span className="">20:00 HS</span>
                  </div>
                  <h3 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase break-words break-all hyphens-auto leading-[0.88] tracking-tight">
                    HERMANOS
                    <br />
                    DEL NOA
                  </h3>
                  <p className="font-mono text-[11px] text-black/80 font-bold uppercase tracking-wider pt-2 border-t border-black/20">
                    BAGUALAS ELÉCTRICAS + VIOLÍN CRIOLLO PROCESADO
                  </p>
                </div>
                <div className="flex justify-between items-center text-[11px] font-mono text-neutral-400">
                  <span className="">ESPACIO: NICETO CLUB</span>
                  <span className="text-accent font-bold">
                    CAPACIDAD LIMITADA
                  </span>
                </div>
              </div>
              <div className="p-6 bg-surface-card border-t border-surface-border flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] text-accent font-mono uppercase tracking-widest block">
                    TARIFA SOLIDARIA
                  </span>
                  <span className="text-accent font-bold text-lg tracking-widest uppercase">
                    GRATIS
                  </span>
                </div>
                <a className="px-5 py-2.5 bg-accent text-white font-display text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-colors flex items-center gap-1.5"
                  href="https://www.passline.com"
                  rel="noreferrer"
                  target="_blank"
                >
                  <span className="">RESERVAR</span>
                  <span className="material-symbols-outlined text-[14px]">
                    arrow_outward
                  </span>
                </a>
              </div>
            </article>
          </div>
        </div>
      </main>
      {/* ================= COMPONENTE 4: CALENDARIO SEMANAL EDITORIAL EN FRANJAS ALTERNADAS (REF: IMAGE_17) ================= */}
      <section
        className="w-full py-16 lg:py-24 border-b border-surface-border bg-[#0e0e0e]"
        id="agenda-semanal"
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-10 pb-4 border-b border-surface-border gap-4">
            <div className="flex items-center gap-3">
              <span className="text-accent font-display text-xl">08 //</span>
              <h2 className="font-display text-3xl lg:text-4xl uppercase tracking-tight text-white">
                CRONOGRAMA SEMANAL // FRANJAS MODULARES
              </h2>
            </div>
            <div className="flex items-center gap-4 text-on-surface-subtle text-[11px] font-mono tracking-widest uppercase">
              <span className="">#WEEKLY CALENDAR</span>
              <span className="text-surface-border">|</span>
              <span className="text-accent font-bold">
                CICLO 08 — 14 DICIEMBRE 2026
              </span>
            </div>
          </div>
          {/* Main Calendar Container with Paper/Poster Texture Aesthetic */}
          <div className="border-2 border-surface-border overflow-hidden bg-black shadow-2xl relative">
            {/* Top Accent Banner Header inspired by kawaii / #WEEKLY CALENDAR */}
            <div className="bg-[#141414] border-b border-surface-border px-6 py-6 lg:px-10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="font-mono text-accent text-xl italic tracking-wider">
                  tucumán.live
                </span>
                <span className="text-surface-border">/</span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                  REGISTRO DE SESIONES VIVAS // SMT NOA
                </span>
              </div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase break-words break-all hyphens-auto tracking-tighter text-accent leading-none">
                  #WEEKLY
                </h3>
                <h3 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase break-words break-all hyphens-auto tracking-tighter text-white leading-none">
                  CALENDAR
                </h3>
              </div>
            </div>
            {/* FRANJAS MODULARES ALTERNADAS CON NÚMEROS DIAGONALES */}
            <div className="divide-y divide-black/30">
              {/* Lunes 08: Franja Naranja con número gigante a la derecha */}
              <article className="relative bg-accent text-black p-5 sm:p-6 lg:px-10 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:bg-accent-soft transition-colors overflow-hidden">
                <div className="relative z-10 flex-1">
                  <div className="flex items-center gap-3">
                    <h4 className="font-display text-2xl sm:text-3xl lg:text-4xl uppercase leading-none tracking-tight text-white">
                      UNPLUGGED SMT
                    </h4>
                    <span className="px-2 py-0.5 bg-black text-white font-mono text-[9px] font-bold uppercase tracking-wider">
                      LUNES
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 mt-2 font-mono text-xs text-black/90 font-bold uppercase">
                    <span className="">
                      FEATURING: AKASH TOMER &amp; INVITADOS
                    </span>
                    <span className="">•</span>
                    <span className="">21:00 HS</span>
                    <span className="">•</span>
                    <span className="text-black/75">CASA MANAGUA</span>
                  </div>
                </div>
                <div className="relative z-10 flex items-center gap-4 self-end md:self-auto">
                  <a className="hidden sm:inline-block px-4 py-1.5 bg-black text-white font-display text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-colors"
                    href="https://www.passline.com"
                    rel="noreferrer"
                    target="_blank"
                  >
                    ACCESO ↗
                  </a>
                  <div className="flex items-center gap-1.5 select-none">
                    <span className="font-display text-3xl sm:text- lg:text-8xl leading-none text-white tracking-tighter">
                      08
                    </span>
                    <span className="font-mono text-[10px] font-black uppercase text-black tracking-widest [writing-mode:vertical-lr] rotate-180">
                      ABRIL
                    </span>
                  </div>
                </div>
              </article>
              {/* Martes 09: Franja Hueso / Claro con número a la derecha */}
              <article className="relative bg-[#e5e2e1] text-black p-5 sm:p-6 lg:px-10 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:bg-white transition-colors overflow-hidden">
                <div className="relative z-10 flex-1">
                  <div className="flex items-center gap-3">
                    <h4 className="font-display text-2xl sm:text-3xl lg:text-4xl uppercase leading-none tracking-tight text-black">
                      TUESDAY AFTER HOURS
                    </h4>
                    <span className="px-2 py-0.5 bg-accent text-white font-mono text-[9px] font-bold uppercase tracking-wider">
                      MARTES
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 mt-2 font-mono text-xs text-neutral-800 font-bold uppercase">
                    <span className="">
                      FEATURING: ANKIT DIMRI // VORTEX ELECTRONIC
                    </span>
                    <span className="">•</span>
                    <span className="">21:30 HS</span>
                    <span className="">•</span>
                    <span className="text-neutral-600">MAGIC MUSIC BOX</span>
                  </div>
                </div>
                <div className="relative z-10 flex items-center gap-4 self-end md:self-auto">
                  <a className="hidden sm:inline-block px-4 py-1.5 bg-accent text-white font-display text-xs uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
                    href="https://www.passline.com"
                    rel="noreferrer"
                    target="_blank"
                  >
                    ENTRADAS ↗
                  </a>
                  <div className="flex items-center gap-1.5 select-none">
                    <span className="font-display text-3xl sm:text- lg:text-8xl leading-none text-accent tracking-tighter">
                      09
                    </span>
                    <span className="font-mono text-[10px] font-black uppercase text-neutral-700 tracking-widest [writing-mode:vertical-lr] rotate-180">
                      ABRIL
                    </span>
                  </div>
                </div>
              </article>
              {/* Miércoles 10: Invertido con número a la izquierda */}
              <article className="relative bg-accent text-black p-5 sm:p-6 lg:px-10 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:bg-accent-soft transition-colors overflow-hidden">
                <div className="relative z-10 flex items-center gap-4 order-2 md:order-1">
                  <div className="flex items-center gap-1.5 select-none">
                    <span className="font-display text-3xl sm:text- lg:text-8xl leading-none text-white tracking-tighter">
                      10
                    </span>
                    <span className="font-mono text-[10px] font-black uppercase text-black tracking-widest [writing-mode:vertical-lr] rotate-180">
                      ABRIL
                    </span>
                  </div>
                  <div className="hidden lg:block border-l border-black/30 pl-4 font-mono text-[10px] text-black/90 uppercase font-bold">
                    FEATURING: SRIYANSH PANDEY
                    <br />+ ENSAMBLE DE CUERDAS
                  </div>
                </div>
                <div className="relative z-10 flex-1 md:text-right order-1 md:order-2">
                  <div className="flex items-center md:justify-end gap-3">
                    <span className="px-2 py-0.5 bg-black text-white font-mono text-[9px] font-bold uppercase tracking-wider">
                      MIÉRCOLES
                    </span>
                    <h4 className="font-display text-2xl sm:text-3xl lg:text-4xl uppercase leading-none tracking-tight text-white">
                      MIDWEEK MADNESS
                    </h4>
                  </div>
                  <div className="flex flex-wrap items-center md:justify-end gap-4 mt-2 font-mono text-xs text-black/90 font-bold uppercase">
                    <span className="">ROBERT NESTA CLUB</span>
                    <span className="">•</span>
                    <span className="">21:00 HS</span>
                    <span className="">•</span>
                    <a className="underline hover:text-white"
                      href="https://www.passline.com"
                      rel="noreferrer"
                      target="_blank"
                    >
                      LISTA FREE
                    </a>
                  </div>
                </div>
              </article>
              {/* Jueves 11: Invertido con número a la izquierda en Hueso */}
              <article className="relative bg-[#e5e2e1] text-black p-5 sm:p-6 lg:px-10 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:bg-white transition-colors overflow-hidden">
                <div className="relative z-10 flex items-center gap-4 order-2 md:order-1">
                  <div className="flex items-center gap-1.5 select-none">
                    <span className="font-display text-3xl sm:text- lg:text-8xl leading-none text-accent tracking-tighter">
                      11
                    </span>
                    <span className="font-mono text-[10px] font-black uppercase text-neutral-700 tracking-widest [writing-mode:vertical-lr] rotate-180">
                      ABRIL
                    </span>
                  </div>
                  <div className="hidden lg:block border-l border-black/20 pl-4 font-mono text-[10px] text-neutral-800 uppercase font-bold">
                    FEATURING: ANKIT DIMRI
                    <br />
                    ACÚSTICO &amp; VINILOS
                  </div>
                </div>
                <div className="relative z-10 flex-1 md:text-right order-1 md:order-2">
                  <div className="flex items-center md:justify-end gap-3">
                    <span className="px-2 py-0.5 bg-accent text-white font-mono text-[9px] font-bold uppercase tracking-wider">
                      JUEVES
                    </span>
                    <h4 className="font-display text-2xl sm:text-3xl lg:text-4xl uppercase leading-none tracking-tight text-black">
                      THURSDAY TUNES
                    </h4>
                  </div>
                  <div className="flex flex-wrap items-center md:justify-end gap-4 mt-2 font-mono text-xs text-neutral-800 font-bold uppercase">
                    <span className="">TEATRO MERCEDES SOSA</span>
                    <span className="">•</span>
                    <span className="">21:00 HS</span>
                    <span className="">•</span>
                    <a className="text-accent font-bold underline"
                      href="https://www.passline.com"
                      rel="noreferrer"
                      target="_blank"
                    >
                      RESERVA ONW
                    </a>
                  </div>
                </div>
              </article>
              {/* Viernes 12: Invertido con número a la izquierda en Naranja */}
              <article className="relative bg-accent text-black p-5 sm:p-6 lg:px-10 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:bg-accent-soft transition-colors overflow-hidden">
                <div className="relative z-10 flex items-center gap-4 order-2 md:order-1">
                  <div className="flex items-center gap-1.5 select-none">
                    <span className="font-display text-3xl sm:text- lg:text-8xl leading-none text-white tracking-tighter">
                      12
                    </span>
                    <span className="font-mono text-[10px] font-black uppercase text-black tracking-widest [writing-mode:vertical-lr] rotate-180">
                      ABRIL
                    </span>
                  </div>
                  <div className="hidden lg:block border-l border-black/30 pl-4 font-mono text-[10px] text-black/90 uppercase font-bold">
                    FEATURING: MAHI LIVE
                    <br />
                    SESIÓN ANALÓGICA
                  </div>
                </div>
                <div className="relative z-10 flex-1 md:text-right order-1 md:order-2">
                  <div className="flex items-center md:justify-end gap-3">
                    <span className="px-2 py-0.5 bg-black text-white font-mono text-[9px] font-bold uppercase tracking-wider">
                      VIERNES
                    </span>
                    <h4 className="font-display text-2xl sm:text-3xl lg:text-4xl uppercase leading-none tracking-tight text-white">
                      FUSION FRIDAY
                    </h4>
                  </div>
                  <div className="flex flex-wrap items-center md:justify-end gap-4 mt-2 font-mono text-xs text-black/90 font-bold uppercase">
                    <span className="">CLUB CENTRAL CÓRDOBA</span>
                    <span className="">•</span>
                    <span className="">22:00 HS</span>
                    <span className="">•</span>
                    <span className="font-bold text-black">
                      ENTRADAS $12.000
                    </span>
                  </div>
                </div>
              </article>
              {/* Sábado 13: Número al medio con layout dinámico */}
              <article className="relative bg-[#e5e2e1] text-black p-5 sm:p-6 lg:px-10 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:bg-white transition-colors overflow-hidden">
                <div className="relative z-10 flex-1">
                  <div className="flex items-center gap-3">
                    <h4 className="font-display text-2xl sm:text-3xl lg:text-4xl uppercase leading-none tracking-tight text-black">
                      AFTERDARK SATURDAY
                    </h4>
                    <span className="px-2 py-0.5 bg-accent text-white font-mono text-[9px] font-bold uppercase tracking-wider">
                      SÁBADO
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 mt-2 font-mono text-xs text-neutral-800 font-bold uppercase">
                    <span className="">FEATURING: PRASHANT // NOA VORTEX</span>
                    <span className="">•</span>
                    <span className="">23:30 ONW</span>
                  </div>
                </div>
                <div className="relative z-10 flex items-center gap-4 self-end md:self-auto">
                  <a className="hidden sm:inline-block px-4 py-1.5 bg-black text-white font-display text-xs uppercase tracking-wider hover:bg-accent transition-colors"
                    href="https://www.passline.com"
                    rel="noreferrer"
                    target="_blank"
                  >
                    PASSLINE ↗
                  </a>
                  <div className="flex items-center gap-1.5 select-none">
                    <span className="font-display text-3xl sm:text- lg:text-8xl leading-none text-accent tracking-tighter">
                      13
                    </span>
                    <span className="font-mono text-[10px] font-black uppercase text-neutral-700 tracking-widest [writing-mode:vertical-lr] rotate-180">
                      ABRIL
                    </span>
                  </div>
                </div>
              </article>
              {/* Domingo 14: Gran cierre en franja Naranja */}
              <article className="relative bg-accent text-black p-5 sm:p-6 lg:px-10 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:bg-accent-soft transition-colors overflow-hidden">
                <div className="relative z-10 flex-1">
                  <div className="flex items-center gap-3">
                    <h4 className="font-display text-2xl sm:text-3xl lg:text-4xl uppercase leading-none tracking-tight text-white">
                      SUNDAY SERENADE
                    </h4>
                    <span className="px-2 py-0.5 bg-black text-white font-mono text-[9px] font-bold uppercase tracking-wider">
                      DOMINGO
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 mt-2 font-mono text-xs text-black/90 font-bold uppercase">
                    <span className="">
                      FEATURING: ABHISHEK &amp; ABHI // FOLKLORE EXPERIMENTAL
                    </span>
                    <span className="">•</span>
                    <span className="">20:00 HS</span>
                    <span className="">•</span>
                    <span className="">CASA MANAGUA</span>
                  </div>
                </div>
                <div className="relative z-10 flex items-center gap-4 self-end md:self-auto">
                  <a className="hidden sm:inline-block px-4 py-1.5 bg-white text-black font-display text-xs uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
                    href="https://www.passline.com"
                    rel="noreferrer"
                    target="_blank"
                  >
                    ENTRADA LIBRE
                  </a>
                  <div className="flex items-center gap-1.5 select-none">
                    <span className="font-display text-3xl sm:text- lg:text-8xl leading-none text-white tracking-tighter">
                      14
                    </span>
                    <span className="font-mono text-[10px] font-black uppercase text-black tracking-widest [writing-mode:vertical-lr] rotate-180">
                      ABRIL
                    </span>
                  </div>
                </div>
              </article>
            </div>
            {/* Footer de Reservas y Ubicación estilo Kawaii poster */}
            <div className="bg-[#0c0c0c] border-t border-surface-border p-6 text-center font-mono text-xs text-neutral-400 uppercase tracking-widest">
              <p className="font-bold text-white mb-1">
                LÍNEA DIRECTA DE RESERVAS: +54 381 424 5555 / +54 381 625 2555
              </p>
              <p className="text-neutral-500 text-[10px]">
                SAN MARTÍN &amp; 25 DE MAYO, CIRCUITO CULTURAL CENTRO HISTÓRICO,
                TUCUMÁN
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* ================= COMPONENTE 5: TABLA BRUTALISTA DE GIRA / FECHAS CON TIPOGRAFÍA CURVA Y HALFTONE DJS (REF: IMAGE_18) ================= */}
      <section
        className="w-full py-16 lg:py-24 border-b border-surface-border bg-black relative overflow-hidden"
        id="circuito-ruteo"
      >
        {/* Background Halftone Overlay */}
        <div className="absolute inset-0 halftone-dots opacity-15 pointer-events-none"></div>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
          {/* Header Section */}
          <div className="flex items-baseline justify-between mb-10 pb-4 border-b border-surface-border">
            <div className="flex items-center gap-3">
              <span className="text-accent font-display text-xl">09 //</span>
              <h2 className="font-display text-3xl lg:text-4xl uppercase tracking-tight text-white">
                CIRCUITO &amp; RUTEO REGIONAL // ARCHIVO DE FECHAS
              </h2>
            </div>
            <span className="text-on-surface-subtle text-[11px] font-mono tracking-widest hidden sm:inline-block">
              INSPIRADO EN CARTELERA AGENDA SEMANAL
            </span>
          </div>
          {/* Main Poster Layout with Screenprint/Halftone & Tour Grid */}
          <div className="border-2 border-surface-border bg-[#0e0e0e] max-w-4xl mx-auto shadow-2xl overflow-hidden">
            {/* Top Poster Banner: Massive Double Headline "AGENDA / AGENDA" with Incline Sticker */}
            <div className="p-8 sm:p-12 border-b border-surface-border bg-[#141414] relative text-center select-none overflow-hidden">
              {/* Vintage Corner Crosses ✦ */}
              <div className="absolute top-4 left-4 text-accent text-2xl">
                ✦
              </div>
              <div className="absolute top-4 right-4 text-accent text-2xl">
                ✦
              </div>
              {/* Layered Typography */}
              <div className="relative inline-block my-2">
                <h3 className="font-display text-3xl sm:text- lg:text-8xl tracking-tight uppercase text-white/20 leading-none">
                  AGENDA
                </h3>
                {/* Floating Yellow/Accent Capsule Sticker 'SEMANAL / EN VIVO' */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-6 bg-accent border-2 border-black text-black font-display text-lg sm:text-2xl px-6 py-1 rounded-full uppercase tracking-wider shadow-lg whitespace-nowrap z-20">
                  CIRCUITO EN VIVO
                </div>
                <h3 className="font-display text-3xl sm:text- lg:text-8xl tracking-tight uppercase text-white leading-none -mt-4 sm:-mt-6 relative z-10">
                  AGENDA
                </h3>
              </div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 mt-2">
                GIRA FEDERAL NOA // ENCUENTROS DE MÚSICA &amp; CLUBBING
              </p>
            </div>
            {/* TABLA BRUTALISTA DE FECHAS (Celdas Marcadas en Amarillo/Naranja con Bordes Negros y Cruces) */}
            <div className="p-6 sm:p-10 bg-[#121212] border-b border-surface-border relative">
              {/* Corner Crosses around Table */}
              <div className="flex justify-between items-center text-accent text-lg mb-4 px-2">
                <span className="">✦</span>
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                  CRONOGRAMA DE ESCENARIOS CONFIRMADOS
                </span>
                <span className="">✦</span>
              </div>
              <div className="space-y-2.5">
                {/* Tour Row 1 */}
                <div className="grid grid-cols-12 bg-accent border-2 border-black font-mono text-black font-bold uppercase text-xs sm:text-sm divide-x-2 divide-black shadow-[3px_3px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-transform">
                  <div className="col-span-5 p-3 sm:p-4 font-display text-base sm:text-xl tracking-tight text-black flex items-center">
                    CLUB CENTRAL CÓRDOBA
                  </div>
                  <div className="col-span-3 p-3 sm:p-4 text-center font-black flex items-center justify-center bg-[#ff5a26]">
                    01 ABR
                  </div>
                  <div className="col-span-4 p-3 sm:p-4 text-right sm:text-left flex flex-wrap items-center justify-between gap-4">
                    <span className="">SAN MIGUEL DE TUCUMÁN</span>
                    <span className="text-xs hidden sm:inline-block">↗</span>
                  </div>
                </div>
                {/* Tour Row 2 */}
                <div className="grid grid-cols-12 bg-accent border-2 border-black font-mono text-black font-bold uppercase text-xs sm:text-sm divide-x-2 divide-black shadow-[3px_3px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-transform">
                  <div className="col-span-5 p-3 sm:p-4 font-display text-base sm:text-xl tracking-tight text-black flex items-center">
                    ROBERT NESTA CLUB
                  </div>
                  <div className="col-span-3 p-3 sm:p-4 text-center font-black flex items-center justify-center bg-[#ff5a26]">
                    04 ABR
                  </div>
                  <div className="col-span-4 p-3 sm:p-4 text-right sm:text-left flex flex-wrap items-center justify-between gap-4">
                    <span className="">TAFÍ VIEJO // TUC</span>
                    <span className="text-xs hidden sm:inline-block">↗</span>
                  </div>
                </div>
                {/* Tour Row 3 */}
                <div className="grid grid-cols-12 bg-accent border-2 border-black font-mono text-black font-bold uppercase text-xs sm:text-sm divide-x-2 divide-black shadow-[3px_3px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-transform">
                  <div className="col-span-5 p-3 sm:p-4 font-display text-base sm:text-xl tracking-tight text-black flex items-center">
                    TEATRO MERCEDES SOSA
                  </div>
                  <div className="col-span-3 p-3 sm:p-4 text-center font-black flex items-center justify-center bg-[#ff5a26]">
                    05 ABR
                  </div>
                  <div className="col-span-4 p-3 sm:p-4 text-right sm:text-left flex flex-wrap items-center justify-between gap-4">
                    <span className="">S.M. DE TUCUMÁN</span>
                    <span className="text-xs hidden sm:inline-block">↗</span>
                  </div>
                </div>
                {/* Tour Row 4 */}
                <div className="grid grid-cols-12 bg-accent border-2 border-black font-mono text-black font-bold uppercase text-xs sm:text-sm divide-x-2 divide-black shadow-[3px_3px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-transform">
                  <div className="col-span-5 p-3 sm:p-4 font-display text-base sm:text-xl tracking-tight text-black flex items-center">
                    POST FIESTA // MANAGUA
                  </div>
                  <div className="col-span-3 p-3 sm:p-4 text-center font-black flex items-center justify-center bg-[#ff5a26]">
                    06 ABR
                  </div>
                  <div className="col-span-4 p-3 sm:p-4 text-right sm:text-left flex flex-wrap items-center justify-between gap-4">
                    <span className="">YERBA BUENA</span>
                    <span className="text-xs hidden sm:inline-block">↗</span>
                  </div>
                </div>
              </div>
              {/* Bottom Table Crosses ✦ */}
              <div className="flex justify-between items-center text-accent text-lg mt-4 px-2">
                <span className="">✦</span>
                <span className="font-mono text-[10px] uppercase text-neutral-500">
                  RED DE SALAS ASOCIADAS AL CIRCUITO AUTOGESTIONADO
                </span>
                <span className="">✦</span>
              </div>
            </div>
            {/* SECCIÓN INFERIOR: ARTE DE CABINA/DJ HALFTONE CON STICKERS ELÍPTICOS */}
            <div className="relative bg-[#090909] p-8 sm:p-12 overflow-hidden">
              {/* Native SVG Vector DJ Booth + Halftone Wave Artwork */}
              <div className="relative min-h-[300px] flex flex-col justify-end items-center">
                {/* Kinetic Halftone DJ Deck Illustration (Pure SVG) */}
                <div className="w-full max-w-xl mx-auto text-center">
                  <svg
                    className="w-full h-44 mx-auto"
                    fill="none"
                    viewBox="0 0 600 220"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Turntable Deck Base */}
                    <rect
                      fill="#1a1a1a"
                      height="95"
                      rx="6"
                      stroke="#ff3c00"
                      strokeWidth="2"
                      width="440"
                      x="80"
                      y="110"
                    />
                    {/* Left Platter Vinyl with Halftone Rings */}
                    <circle
                      cx="200"
                      cy="155"
                      fill="#0d0d0d"
                      r="42"
                      stroke="#fff"
                      strokeDasharray="3 3"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx="200"
                      cy="155"
                      fill="#1c1c1c"
                      r="26"
                      stroke="#ff3c00"
                      strokeWidth="2"
                    />
                    <circle cx="200" cy="155" fill="#ff3c00" r="10" />
                    {/* Right Platter Vinyl */}
                    <circle
                      cx="400"
                      cy="155"
                      fill="#0d0d0d"
                      r="42"
                      stroke="#fff"
                      strokeDasharray="3 3"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx="400"
                      cy="155"
                      fill="#1c1c1c"
                      r="26"
                      stroke="#ff3c00"
                      strokeWidth="2"
                    />
                    <circle cx="400" cy="155" fill="#ff3c00" r="10" />
                    {/* Mixer Section */}
                    <rect
                      fill="#111"
                      height="65"
                      stroke="#333"
                      width="60"
                      x="270"
                      y="125"
                    />
                    <line
                      stroke="#ff3c00"
                      strokeWidth="3"
                      x1="285"
                      x2="285"
                      y1="140"
                      y2="175"
                    />
                    <line
                      stroke="#fff"
                      strokeWidth="3"
                      x1="315"
                      x2="315"
                      y1="140"
                      y2="175"
                    />
                    {/* Stylized DJ Silhouettes with Headphone Graphic in Accent Halftone */}
                    <path
                      d="M230,110 Q300,30 370,110"
                      fill="none"
                      stroke="#ff3c00"
                      strokeDasharray="6 4"
                      strokeWidth="4"
                    />
                    <circle
                      cx="300"
                      cy="70"
                      fill="#ff3c00"
                      opacity="0.9"
                      r="32"
                    />
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
                  VINILOS Y SINTES
                </div>
                <div className="absolute bottom-10 right-6 sm:right-16 -rotate-6 border border-accent bg-accent text-black font-display text-xs px-3 py-1 rounded-full uppercase tracking-wider font-black">
                  ENTRADA ANTICIPADA
                </div>
              </div>
              {/* Bottom Card Strip */}
              <div className="mt-8 pt-6 border-t border-surface-border flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
                <span className="text-neutral-400">
                  SET EN VIVO: TRANSMISIÓN RADIOFÓNICA FEDERAL
                </span>
                <a className="px-5 py-2 bg-white text-black font-display uppercase tracking-wider text-xs hover:bg-accent hover:text-white transition-colors"
                  href="https://www.passline.com"
                  rel="noreferrer"
                  target="_blank"
                >
                  VER FECHAS COMPLETAS ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ================= EDITORIAL SPLIT CALLOUT BANNER (FANZINE CALENDAR STYLE) ================= */}
      <section
        className="w-full py-16 lg:py-24 bg-[#161513] relative overflow-hidden"
        id="calendario-reticular"
      >
        <div className="max-w-[1000px] mx-auto px-4 lg:px-8 relative z-10">
          
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-1">
              <div className="flex gap-1">
                <span className="w-2 h-6 bg-[#e3ddcf] transform -skew-x-12 inline-block"></span>
                <span className="w-2 h-6 bg-[#e3ddcf] transform -skew-x-12 inline-block"></span>
                <span className="w-2 h-6 bg-[#e3ddcf] transform -skew-x-12 inline-block"></span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 border-2 border-[#e3ddcf] flex items-center justify-center font-display text-xs text-[#e3ddcf]">Z</span>
              <span className="font-display text-sm tracking-widest text-[#e3ddcf]">ZEIT<br/><span className="text-[8px] leading-none block">MEDIA</span></span>
            </div>
          </div>

          <h2 className="font-display text-6xl sm:text-7xl lg:text-9xl uppercase tracking-tighter text-[#e3ddcf] leading-[0.85] text-center mb-8 drop-shadow-lg scale-y-110 transform">
            NOA DICIEMBRE 2026
            <br />
            CALENDARIO
          </h2>

          <div className="absolute top-16 right-4 lg:right-12 text-right font-mono text-[8px] sm:text-[10px] text-[#e3ddcf]/80 tracking-widest uppercase">
            ADDRESS 1129 SAN MARTIN, SMT<br/>
            HOTLINE 079 799 9898<br/>
            @EVENTOSTUCUMAN #NOAUNDER
          </div>

          {/* GRID CALENDAR */}
          <div className="flex flex-col gap-3 font-display">
            
            {/* ROW 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Left */}
              <article className="bg-[#f4f1eb] text-[#1a1a1a] p-4 sm:p-6 flex flex-col justify-between border-2 border-transparent relative overflow-hidden group hover:scale-[1.01] transition-transform">
                <div className="flex justify-between items-start text-[10px] font-mono font-bold uppercase tracking-wider mb-2">
                  <span className="">(NOCHE DE ARTE)</span>
                  <span className="">CADA JUEVES</span>
                </div>
                <h3 className="text-5xl sm:text-6xl uppercase tracking-tighter leading-[0.9] mt-2">
                  WE ART
                  <br />
                  THE NOA
                </h3>
                {/* Graphics */}
                <div className="absolute bottom-0 right-0 w-24 sm:w-32 opacity-90 transform translate-x-4 translate-y-4">
                  <img src="https://api.dicebear.com/7.x/shapes/svg?seed=art&backgroundColor=transparent" alt="Graphic" className="w-full h-full object-contain grayscale contrast-150 mix-blend-multiply" />
                </div>
              </article>

              {/* Right */}
              <article className="bg-[#1a1a1a] text-[#f4f1eb] border-2 border-[#f4f1eb] p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden group hover:scale-[1.01] transition-transform">
                <h3 className="text-5xl sm:text-6xl uppercase tracking-tighter leading-[0.9] mb-4 relative z-10 text-right">
                  MONDAY
                  <br />
                  LISA
                </h3>
                <div className="flex justify-between items-end relative z-10">
                  <span className="text-[10px] font-mono uppercase font-bold text-[#f4f1eb]/70">(TRAGO GRATIS ARTISTAS)</span>
                  <span className="text-[10px] font-mono uppercase font-bold text-[#f4f1eb]">CADA MIÉRCOLES</span>
                </div>
                {/* Graphics */}
                <div className="absolute bottom-[-10%] left-4 w-28 sm:w-36 opacity-80 mix-blend-screen invert">
                  <img src="https://api.dicebear.com/7.x/micah/svg?seed=lisa&backgroundColor=transparent" alt="Lisa" className="w-full h-full object-contain grayscale contrast-200" />
                </div>
              </article>
            </div>

            {/* ROW 2 - RED SPAN */}
            <article className="bg-[#e31e13] text-[#f4f1eb] border-2 border-[#f4f1eb] p-4 sm:p-6 flex flex-col md:flex-row justify-between items-center relative overflow-hidden group hover:scale-[1.01] transition-transform">
              <h3 className="text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tighter leading-[0.85] text-left">
                MELTED IN
                <br />
                TUCUMÁN
              </h3>
              
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 sm:w-56 z-10 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                <svg viewBox="0 0 100 100" className="w-full h-full text-[#f4f1eb] animate-[spin_20s_linear_infinite]" fill="none" stroke="currentColor" strokeWidth="2">
                   <circle cx="50" cy="50" r="45" />
                   <ellipse cx="50" cy="50" rx="20" ry="45" />
                   <ellipse cx="50" cy="50" rx="45" ry="20" />
                   <path d="M50 5 L50 95 M5 50 L95 50" />
                </svg>
              </div>

              <div className="text-center md:text-right mt-4 md:mt-0 relative z-20">
                <span className="text-[10px] sm:text-xs font-mono uppercase font-bold block mb-1">
                  (PROMO 2X1 BUBBLEGUM)
                </span>
                <span className="text-sm sm:text-base font-bold font-mono uppercase block bg-[#1a1a1a] text-white px-3 py-1">
                  CADA LUNES & MARTES
                </span>
              </div>
            </article>

            {/* ROW 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Left */}
              <article className="bg-[#f4f1eb] text-[#1a1a1a] p-4 sm:p-6 flex flex-col justify-between border-2 border-transparent relative overflow-hidden group hover:scale-[1.01] transition-transform min-h-[160px]">
                <div className="flex justify-between items-start text-[10px] font-mono font-bold uppercase tracking-wider mb-2">
                  <span className="">(NOA LUCKY CARD)</span>
                  <span className="">CADA DOMINGO</span>
                </div>
                <h3 className="text-6xl sm:text-7xl uppercase tracking-tighter leading-[0.85] mt-2 relative z-10">
                  SIP &
                  <br />
                  HEAL
                </h3>
                <div className="absolute bottom-0 right-4 w-32 sm:w-40 opacity-90">
                  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full text-[#1a1a1a]">
                    <rect x="20" y="20" width="60" height="80" rx="4" />
                    <circle cx="50" cy="40" r="10" />
                    <path d="M40 70 L60 70 M40 80 L60 80" />
                  </svg>
                </div>
              </article>

              {/* Right */}
              <article className="bg-[#f4f1eb] text-[#1a1a1a] p-4 sm:p-6 flex flex-col justify-between border-2 border-transparent relative overflow-hidden group hover:scale-[1.01] transition-transform min-h-[160px]">
                <h3 className="text-6xl sm:text-7xl uppercase tracking-tighter leading-[0.85] mb-2 relative z-10">
                  CIRQUE
                  <br />
                  DEL NOA
                </h3>
                <span className="text-[10px] font-mono uppercase font-bold tracking-wider relative z-10">CADA SÁBADO</span>
                <div className="absolute bottom-0 right-4 w-32 sm:w-40 opacity-90 transform translate-x-4">
                  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full text-[#1a1a1a]">
                    <circle cx="50" cy="50" r="40" strokeDasharray="5 5" />
                    <path d="M50 10 L50 90 M10 50 L90 50" />
                    <circle cx="50" cy="50" r="20" />
                  </svg>
                </div>
              </article>
            </div>

            {/* ROW 4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Left */}
              <article className="bg-[#1a1a1a] text-[#f4f1eb] border-2 border-[#f4f1eb] p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden group hover:scale-[1.01] transition-transform min-h-[220px]">
                <h3 className="text-6xl sm:text-7xl uppercase tracking-tighter leading-[0.85] relative z-10 flex items-baseline gap-2">
                  POPART 
                  <span className="text-3xl sm:text-4xl text-[#e31e13]">#10</span>
                </h3>
                <div className="mt-auto relative z-10">
                  <span className="text-sm font-bold font-mono uppercase block bg-[#e31e13] text-[#f4f1eb] px-2 py-0.5 w-max mb-1">
                    19.04.25
                  </span>
                  <span className="text-lg font-bold font-display uppercase tracking-tight text-[#f4f1eb]">
                    RHYDER
                  </span>
                </div>
                <div className="absolute bottom-0 right-[-10%] w-48 sm:w-56 opacity-90 invert grayscale contrast-150 mix-blend-screen">
                  <img src="https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=rhyder&backgroundColor=transparent" alt="Rhyder" className="w-full h-full object-contain" />
                </div>
              </article>

              {/* Right - RED */}
              <article className="bg-[#e31e13] text-[#f4f1eb] border-2 border-[#f4f1eb] p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden group hover:scale-[1.01] transition-transform min-h-[220px]">
                <h3 className="text-6xl sm:text-7xl uppercase tracking-tighter leading-[0.85] relative z-10 flex items-center gap-2">
                  AVICII <span className="text-3xl sm:text-4xl text-[#1a1a1a]">TRIBUTE</span>
                </h3>
                <div className="mt-auto flex justify-between items-end relative z-10">
                  <span className="text-xs font-bold font-mono uppercase block bg-[#f4f1eb] text-[#e31e13] px-2 py-1 border border-[#1a1a1a]">
                    SÁBADO
                  </span>
                  <span className="text-lg font-bold font-display uppercase tracking-tight text-[#f4f1eb]">
                    20.02.2027
                  </span>
                </div>
                <div className="absolute bottom-[-10%] right-[10%] w-44 sm:w-52 opacity-90 grayscale contrast-150 drop-shadow-[0_10px_10px_rgba(0,0,0,0.3)]">
                  <img src="https://api.dicebear.com/7.x/notionists/svg?seed=avicii&backgroundColor=transparent" alt="Avicii" className="w-full h-full object-contain" />
                </div>
              </article>
            </div>

            {/* ROW 5 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Left - RED */}
              <article className="bg-[#e31e13] text-[#1a1a1a] p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden group hover:scale-[1.01] transition-transform min-h-[200px]">
                <h3 className="text-6xl sm:text-7xl uppercase tracking-tighter leading-[0.85] relative z-10 text-[#f4f1eb]">
                  WORDS
                  <br />
                  & RHYTHMS
                </h3>
                <div className="mt-auto relative z-10">
                  <span className="text-xs font-bold font-mono uppercase block bg-[#f4f1eb] text-[#e31e13] px-2 py-0.5 w-max mb-2">
                    DJ KRUISE
                  </span>
                  <span className="text-sm font-bold font-mono uppercase block text-[#f4f1eb] border-t border-[#f4f1eb]/30 pt-1">
                    VIERNES — 26.04.25
                  </span>
                </div>
                <div className="absolute bottom-[-5%] right-0 w-36 sm:w-44 opacity-95 grayscale contrast-125 mix-blend-multiply">
                  <img src="https://api.dicebear.com/7.x/miniavs/svg?seed=kruise&backgroundColor=transparent" alt="DJ Kruise" className="w-full h-full object-contain" />
                </div>
              </article>

              {/* Right */}
              <article className="bg-[#f4f1eb] text-[#1a1a1a] p-4 sm:p-6 flex flex-col justify-between border-2 border-transparent relative overflow-hidden group hover:scale-[1.01] transition-transform min-h-[200px]">
                <h3 className="text-6xl sm:text-7xl uppercase tracking-tighter leading-[0.85] relative z-10 text-right">
                  REUNIFI—
                  <br />
                  CAT—DAY
                </h3>
                <div className="mt-auto flex justify-between items-end relative z-10 text-3xl sm:text-4xl font-display uppercase tracking-tighter border-t-2 border-[#1a1a1a] pt-2">
                  <span>30/04</span>
                  <span>01/05</span>
                </div>
                <div className="absolute bottom-[20%] left-1/2 transform -translate-x-1/2 w-28 sm:w-32 opacity-90 mix-blend-multiply grayscale">
                  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full text-[#1a1a1a]">
                    <rect x="20" y="40" width="60" height="40" />
                    <path d="M20 40 L50 20 L80 40" />
                    <circle cx="50" cy="60" r="5" />
                  </svg>
                </div>
              </article>
            </div>

          </div>
        </div>
      </section>

      <section
        className="w-full bg-accent text-white py-14 lg:py-20 overflow-hidden"
        id="publicar"
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div>
            <span className="text-black font-mono text-[11px] font-bold tracking-widest uppercase block mb-2">
              [ CIRCUITO AUTOGESTIONADO ]
            </span>
            <h3 className="font-display text-3xl sm:text-6xl lg:text-7xl uppercase tracking-tighter leading-none text-white">
              ¿PRODUCÍS O TOCÁS EN TUCUMÁN?
            </h3>
          </div>
          <a className="inline-flex items-center justify-center gap-3 px-8 py-5 bg-black text-white hover:bg-white hover:text-black font-display text-xl uppercase tracking-wider transition-all self-start lg:self-auto shrink-0"
            href="#"
          >
            <span className="">PUBLICAR EN AGENDA</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </a>
        </div>
      </section>
      {/* ================= SALAS & ESPACIOS ACTIVOS ================= */}
      <section
        className="w-full py-16 lg:py-24 border-b border-surface-border"
        id="salas"
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 border-b border-surface-border pb-4">
            <div>
              <span className="text-[11px] text-accent tracking-widest uppercase block font-bold mb-1">
                // MAPEO CULTURAL
              </span>
              <h2 className="font-display text-3xl lg:text-4xl uppercase tracking-tight text-white">
                SALAS &amp; ESPACIOS ACTIVOS
              </h2>
            </div>
            <span className="text-on-surface-subtle text-[12px] uppercase">
              SAN MIGUEL DE TUCUMÁN
            </span>
          </div>
          {/* Directorio suizo de salas */}
          <div className="divide-y divide-surface-border">
            <div className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:bg-surface-dark px-4 transition-colors">
              <div className="flex items-baseline gap-6">
                <span className="font-mono text-xs text-on-surface-subtle">
                  01
                </span>
                <h4 className="font-display text-2xl lg:text-3xl uppercase tracking-tight text-white group-hover:text-accent transition-colors">
                  TEATRO MERCEDES SOSA
                </h4>
              </div>
              <div className="flex items-center gap-8 text-[12px] text-on-surface-subtle font-mono">
                <span className="">San Martín 479</span>
                <span className="text-white">Cap: 1.600</span>
                <a className="text-accent hover:underline flex items-center gap-1 font-bold"
                  href="https://maps.google.com/?q=Tucuman"
                  rel="noreferrer"
                  target="_blank"
                >
                  MAPA{" "}
                  <span className="material-symbols-outlined text-[14px]">
                    north_east
                  </span>
                </a>
              </div>
            </div>
            <div className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:bg-surface-dark px-4 transition-colors">
              <div className="flex items-baseline gap-6">
                <span className="font-mono text-xs text-on-surface-subtle">
                  02
                </span>
                <h4 className="font-display text-2xl lg:text-3xl uppercase tracking-tight text-white group-hover:text-accent transition-colors">
                  CLUB CENTRAL CÓRDOBA
                </h4>
              </div>
              <div className="flex items-center gap-8 text-[12px] text-on-surface-subtle font-mono">
                <span className="">Av. Alem 790</span>
                <span className="text-white">Cap: 5.000</span>
                <a className="text-accent hover:underline flex items-center gap-1 font-bold"
                  href="https://maps.google.com/?q=Tucuman"
                  rel="noreferrer"
                  target="_blank"
                >
                  MAPA{" "}
                  <span className="material-symbols-outlined text-[14px]">
                    north_east
                  </span>
                </a>
              </div>
            </div>
            <div className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:bg-surface-dark px-4 transition-colors">
              <div className="flex items-baseline gap-6">
                <span className="font-mono text-xs text-on-surface-subtle">
                  03
                </span>
                <h4 className="font-display text-2xl lg:text-3xl uppercase tracking-tight text-white group-hover:text-accent transition-colors">
                  CASA MANAGUA CULTURAL
                </h4>
              </div>
              <div className="flex items-center gap-8 text-[12px] text-on-surface-subtle font-mono">
                <span className="">San Juan 1015</span>
                <span className="text-white">Cap: 250</span>
                <a className="text-accent hover:underline flex items-center gap-1 font-bold"
                  href="https://maps.google.com/?q=Tucuman"
                  rel="noreferrer"
                  target="_blank"
                >
                  MAPA{" "}
                  <span className="material-symbols-outlined text-[14px]">
                    north_east
                  </span>
                </a>
              </div>
            </div>
            <div className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:bg-surface-dark px-4 transition-colors">
              <div className="flex items-baseline gap-6">
                <span className="font-mono text-xs text-on-surface-subtle">
                  04
                </span>
                <h4 className="font-display text-2xl lg:text-3xl uppercase tracking-tight text-white group-hover:text-accent transition-colors">
                  MAGIC MUSIC BOX
                </h4>
              </div>
              <div className="flex items-center gap-8 text-[12px] text-on-surface-subtle font-mono">
                <span className="">José Colombres 427</span>
                <span className="text-white">Cap: 350</span>
                <a className="text-accent hover:underline flex items-center gap-1 font-bold"
                  href="https://maps.google.com/?q=Tucuman"
                  rel="noreferrer"
                  target="_blank"
                >
                  MAPA{" "}
                  <span className="material-symbols-outlined text-[14px]">
                    north_east
                  </span>
                </a>
              </div>
            </div>
            <div className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:bg-surface-dark px-4 transition-colors">
              <div className="flex items-baseline gap-6">
                <span className="font-mono text-xs text-on-surface-subtle">
                  05
                </span>
                <h4 className="font-display text-2xl lg:text-3xl uppercase tracking-tight text-white group-hover:text-accent transition-colors">
                  ROBERT NESTA CLUB
                </h4>
              </div>
              <div className="flex items-center gap-8 text-[12px] text-on-surface-subtle font-mono">
                <span className="">San Martín 1129</span>
                <span className="text-white">Cap: 800</span>
                <a className="text-accent hover:underline flex items-center gap-1 font-bold"
                  href="https://maps.google.com/?q=Tucuman"
                  rel="noreferrer"
                  target="_blank"
                >
                  MAPA{" "}
                  <span className="material-symbols-outlined text-[14px]">
                    north_east
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ================= FOOTER ================= */}
      <footer id="contacto" className="w-full bg-[#0b0b0b] pt-16 pb-12 text-on-surface-subtle font-mono text-[12px]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col gap-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-6 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 bg-accent inline-block"></span>
                <span className="font-display text-2xl tracking-tight uppercase text-white">
                  AGENDA CULTURAL TUCUMÁN
                </span>
              </div>
              <p className="max-w-md leading-relaxed text-[13px]">
                Archivo vivo y plataforma independiente de difusión cultural
                para la provincia de Tucumán y la región del NOA.
              </p>
            </div>
            <div className="lg:col-span-6 flex flex-col gap-3">
              <span className="text-white uppercase font-bold tracking-wider text-[11px]">
                RECIBÍ LA CARTELERA CADA JUEVES
              </span>
              <form
                className="flex items-stretch gap-2 max-w-md"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  className="bg-surface-card border border-surface-border text-white text-xs px-4 py-3 flex-1 focus:outline-none focus:border-accent"
                  placeholder="tu email..."
                  type="email"
                />
                <button
                  className="bg-white text-black font-display uppercase tracking-wider px-6 text-sm hover:bg-accent hover:text-white transition-colors"
                  type="submit"
                >
                  UNIRSE
                </button>
              </form>
            </div>
          </div>
          <div className="pt-8 border-t border-surface-border flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] uppercase tracking-widest">
            <span className="">
              © 2026-2027 AGENDA CULTURAL TUC // TODOS LOS DERECHOS RESERVADOS
            </span>
            <div className="flex items-center gap-6">
              <a className="hover:text-white transition-colors"
                href="https://www.passline.com"
                rel="noreferrer"
                target="_blank"
              >
                PASSLINE
              </a>
              <a className="hover:text-white transition-colors"
                href="https://www.passline.com"
                rel="noreferrer"
                target="_blank"
              >
                TICKETEK
              </a>
              <a className="hover:text-white transition-colors"
                href="https://www.passline.com"
                rel="noreferrer"
                target="_blank"
              >
                ALPOGO
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* ================= COOKIE BANNER ================= */}
      {!cookieConsent && (
        <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-[450px] bg-[#f5f1e8] border-4 border-black p-6 shadow-[8px_8px_0_#ff3c00] z-[9999] flex flex-col gap-4 animate-[slideUp_0.5s_ease-out]">
          <div>
            <h3 className="font-display text-2xl uppercase tracking-tighter text-black mb-2">
              TÉRMINOS Y COOKIES
            </h3>
            <p className="font-sans text-sm font-medium text-black/80 leading-relaxed">
              Utilizamos cookies para mantener estadísticas anónimas de visitas
              y mejorar tu experiencia en nuestra plataforma. Al continuar
              navegando, aceptas nuestros términos y condiciones.
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
