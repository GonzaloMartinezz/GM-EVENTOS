import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PILLARS = [
  {
    title: 'Una sola agenda',
    description: 'Conciertos, teatro, stand up, festivales y exposiciones de Tucumán, Buenos Aires y Córdoba, en un solo lugar.',
  },
  {
    title: 'Sin vueltas para comprar',
    description: 'No vendemos entradas nosotros: te mandamos directo a la entradera oficial de cada evento.',
  },
  {
    title: 'Para quien labura en cultura',
    description: 'Productores y artistas pueden sumar su evento y llegar a más gente sin pagar por eso.',
  },
];

/** /about — "Nosotros": quiénes somos y qué hace Agenda Cultural / GM Events. */
export default function About() {
  return (
    <div className="bg-[#0b0b0b] text-on-surface font-mono antialiased min-h-screen selection:bg-accent selection:text-white">
      <Header />

      <section className="pt-40 pb-16 lg:pt-52 lg:pb-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#ff3c00]">
          Quiénes somos
        </span>
        <h1 className="font-display text-5xl sm:text-6xl lg:text-8xl uppercase tracking-tighter text-[#f5f1e8] leading-[0.9] mt-4">
          GM Events
        </h1>
        <p className="text-neutral-400 text-lg max-w-2xl mt-6">
          Nacimos para resolver algo simple: saber qué pasa esta semana en tu ciudad sin tener que
          revisar diez cuentas de Instagram distintas. Agenda Cultural junta todo lo que pasa en
          Tucumán, Buenos Aires y Córdoba, y lo mantiene actualizado.
        </p>
      </section>

      <section className="px-6 lg:px-12 max-w-7xl mx-auto pb-16 lg:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {PILLARS.map((pillar, idx) => (
            <div
              key={pillar.title}
              className="bg-[#f5f1e8] border-4 border-black p-6 lg:p-8 shadow-[6px_6px_0_#000]"
            >
              <span className="font-display text-5xl text-[#ff3c00] leading-none">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <h2 className="font-display text-2xl uppercase tracking-tighter text-black mt-4 mb-3">
                {pillar.title}
              </h2>
              <p className="text-black/70 text-sm leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 lg:px-12 max-w-7xl mx-auto pb-24 lg:pb-32">
        <div className="bg-[#ff3c00] border-4 border-black p-8 lg:p-12 shadow-[6px_6px_0_#000] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h2 className="font-display text-3xl lg:text-4xl uppercase tracking-tighter text-black leading-tight">
              ¿Producís o tocás en alguna de estas ciudades?
            </h2>
            <p className="text-black/80 mt-2 max-w-xl">
              Sumá tu evento a la agenda y llegá a más gente. Es gratis.
            </p>
          </div>
          <Link
            to="/agenda"
            className="inline-flex items-center justify-center gap-2 bg-black text-white font-display uppercase tracking-widest text-sm px-6 py-4 hover:bg-[#f5f1e8] hover:text-black transition-colors whitespace-nowrap"
          >
            Ver la agenda ↗
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
