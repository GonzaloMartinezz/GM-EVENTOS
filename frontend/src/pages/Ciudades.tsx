import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchEvents } from '../services/eventService';

interface CityInfo {
  name: string;
  slug: string;
  province: string;
  filterCity: string;
  tag: string;
}

const CITIES: CityInfo[] = [
  {
    name: 'Tucumán',
    slug: 'tucuman',
    province: 'San Miguel de Tucumán',
    filterCity: 'San Miguel de Tucumán',
    tag: 'NOA',
  },
  {
    name: 'Buenos Aires',
    slug: 'buenos-aires',
    province: 'Buenos Aires',
    filterCity: 'Buenos Aires',
    tag: 'AMBA',
  },
  {
    name: 'Córdoba',
    slug: 'cordoba',
    province: 'Córdoba',
    filterCity: 'Córdoba',
    tag: 'CENTRO',
  },
];

/**
 * /ciudades — las ciudades donde ya tenemos eventos cargados. Sigue el
 * mismo lenguaje visual brutalista de la home (tipografía display en
 * mayúsculas, bloques negro/crema con acento naranja) pero con datos
 * reales: la cantidad de eventos activos de cada ciudad, traída en vivo
 * desde la agenda.
 */
export default function Ciudades() {
  const [counts, setCounts] = useState<Record<string, number | null>>({});

  useEffect(() => {
    CITIES.forEach((city) => {
      fetchEvents({ city: city.filterCity, limit: 1 })
        .then((res) => setCounts((prev) => ({ ...prev, [city.slug]: res.pagination.total })))
        .catch(() => setCounts((prev) => ({ ...prev, [city.slug]: null })));
    });
  }, []);

  return (
    <div className="bg-[#0b0b0b] text-on-surface font-mono antialiased min-h-screen selection:bg-accent selection:text-white">
      <Header />

      <section className="pt-40 pb-16 lg:pt-52 lg:pb-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#ff3c00]">
          Dónde pasan las cosas
        </span>
        <h1 className="font-display text-5xl sm:text-6xl lg:text-8xl uppercase tracking-tighter text-[#f5f1e8] leading-[0.9] mt-4">
          Ciudades
        </h1>
        <p className="text-neutral-400 text-lg max-w-2xl mt-6">
          Agenda Cultural ya sigue de cerca la movida en estas tres ciudades. Elegí una y vas directo
          a la agenda filtrada con todo lo que tenemos cargado ahí.
        </p>
      </section>

      <section className="px-6 lg:px-12 max-w-7xl mx-auto pb-24 lg:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {CITIES.map((city) => {
            const count = counts[city.slug];
            return (
              <Link
                key={city.slug}
                to={`/agenda?city=${encodeURIComponent(city.filterCity)}`}
                className="group relative flex flex-col justify-between bg-[#f5f1e8] border-4 border-black p-6 lg:p-8 min-h-[280px] lg:min-h-[340px] shadow-[6px_6px_0_#000] hover:shadow-[10px_10px_0_#ff3c00] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-widest font-bold text-black/60">
                    {city.tag}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-widest font-bold text-black/60">
                    ↗
                  </span>
                </div>

                <h2 className="font-display text-4xl lg:text-5xl uppercase tracking-tighter text-black leading-[0.95] group-hover:text-[#ff3c00] transition-colors">
                  {city.name}
                </h2>

                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest font-bold text-black">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#ff3c00] animate-pulse" />
                  {count === null
                    ? 'Sin datos por ahora'
                    : count === undefined
                      ? 'Cargando...'
                      : `${count} evento${count === 1 ? '' : 's'} cargado${count === 1 ? '' : 's'}`}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
}
