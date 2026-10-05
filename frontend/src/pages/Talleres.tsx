import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchEvents } from '../services/eventService';
import { resolveImageUrl } from '../services/api';
import { EventItem } from '../types/event';

/**
 * /talleres — todavía no existe una categoría de "taller" en el modelo de
 * eventos (las categorías son concierto, teatro, stand up, festival,
 * exposición, deportivo u "otro"), así que esta página muestra lo que
 * esté cargado como "Otro" a modo de talleres/actividades, y si no hay
 * nada todavía, un estado vacío prolijo en vez de un placeholder genérico.
 */
export default function Talleres() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents({ category: 'otro', limit: 12 })
      .then((res) => setEvents(res.data))
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-[#0b0b0b] text-on-surface font-mono antialiased min-h-screen selection:bg-accent selection:text-white">
      <Header />

      <section className="pt-40 pb-16 lg:pt-52 lg:pb-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#ff3c00]">
          Hacé, no solo mires
        </span>
        <h1 className="font-display text-5xl sm:text-6xl lg:text-8xl uppercase tracking-tighter text-[#f5f1e8] leading-[0.9] mt-4">
          Talleres
        </h1>
        <p className="text-neutral-400 text-lg max-w-2xl mt-6">
          Actividades, clínicas y talleres de producción, música, teatro y arte dictados por
          artistas y productores de la escena local.
        </p>
      </section>

      <section className="px-6 lg:px-12 max-w-7xl mx-auto pb-24 lg:pb-32">
        {loading && (
          <p className="font-mono text-sm uppercase tracking-widest text-neutral-500">
            Cargando...
          </p>
        )}

        {!loading && events.length === 0 && (
          <div className="bg-[#f5f1e8] border-4 border-black p-8 lg:p-12 shadow-[6px_6px_0_#000]">
            <h2 className="font-display text-3xl lg:text-4xl uppercase tracking-tighter text-black mb-4">
              Todavía no hay talleres cargados
            </h2>
            <p className="text-black/70 max-w-xl mb-6">
              Estamos armando la agenda de talleres y actividades. Si sos artista o productor y
              querés dictar uno, escribinos y lo sumamos.
            </p>
            <Link
              to="/agenda"
              className="inline-flex items-center gap-2 bg-black text-white font-display uppercase tracking-widest text-sm px-6 py-3 hover:bg-[#ff3c00] transition-colors"
            >
              Ver la agenda completa ↗
            </Link>
          </div>
        )}

        {!loading && events.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {events.map((event) => {
              const image = resolveImageUrl(event.coverImage || event.images[0]);
              return (
                <Link
                  key={event._id}
                  to={`/eventos/${event.slug}`}
                  className="group bg-[#f5f1e8] border-4 border-black shadow-[6px_6px_0_#000] hover:shadow-[10px_10px_0_#ff3c00] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  <div className="h-40 bg-black/80 overflow-hidden border-b-4 border-black">
                    {image ? (
                      <img src={image} alt={event.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-mono text-xs uppercase tracking-widest text-white/40">
                        Sin imagen
                      </div>
                    )}
                  </div>
                  <div className="p-5 flex-1 flex flex-col gap-2">
                    <span className="font-mono text-[11px] uppercase tracking-widest font-bold text-black/60">
                      {event.venueName} · {event.city}
                    </span>
                    <h3 className="font-display text-xl uppercase tracking-tighter text-black group-hover:text-[#ff3c00] transition-colors">
                      {event.title}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
