import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import EventCard from '../components/EventCard';
import Reveal from '../components/Reveal';
import SectionLabel from '../components/SectionLabel';
import { fetchEvents } from '../services/eventService';
import { EventItem, EventCategory } from '../types/event';

/** Catálogo completo de eventos, con búsqueda, filtros y paginación. */
export default function Agenda() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [q, setQ] = useState('');
  const [category, setCategory] = useState<EventCategory | ''>('');
  const [city, setCity] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  async function load(currentPage = 1) {
    setLoading(true);
    setError('');
    try {
      const res = await fetchEvents({ q, category, city, page: currentPage, limit: 9 });
      setEvents(res.data);
      setTotalPages(res.pagination.totalPages);
      setPage(res.pagination.page);
    } catch {
      setError('No pudimos cargar la agenda. Probá de nuevo en unos minutos.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header />

      <section className="mkt-section mkt-section--dark">
        <div className="container" style={{ padding: '110px 20px 30px' }}>
          <Reveal>
            <SectionLabel number="01" eyebrow="Todo lo que hay cargado" title="Agenda completa" />
          </Reveal>
          <div style={{ marginTop: 30 }}>
            <SearchBar
              q={q}
              category={category}
              city={city}
              onChangeQ={setQ}
              onChangeCategory={setCategory}
              onChangeCity={setCity}
              onSubmit={() => load(1)}
            />
          </div>
        </div>

        <div className="container">
          {loading && <p className="empty-state">Cargando eventos...</p>}
          {!loading && error && <p className="empty-state">{error}</p>}
          {!loading && !error && events.length === 0 && (
            <p className="empty-state">No encontramos eventos con esos filtros. Probá con otra búsqueda.</p>
          )}

          {!loading && !error && events.length > 0 && (
            <div className="events-grid">
              {events.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="pagination">
              <button className="btn btn-outline btn-sm" disabled={page <= 1} onClick={() => load(page - 1)}>
                Anterior
              </button>
              <span style={{ alignSelf: 'center', color: 'var(--color-text-muted)' }}>
                Página {page} de {totalPages}
              </span>
              <button
                className="btn btn-outline btn-sm"
                disabled={page >= totalPages}
                onClick={() => load(page + 1)}
              >
                Siguiente
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
