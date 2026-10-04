import React from 'react';

export default function Component10() {
  return (
    <>
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
            NOA ABRIL 2025
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
                    20.04.2025
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
    </>
  );
}
