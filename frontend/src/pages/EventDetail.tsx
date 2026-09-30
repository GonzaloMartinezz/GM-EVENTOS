import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchEventBySlug } from '../services/eventService';
import { resolveImageUrl } from '../services/api';
import { EventItem, CATEGORY_LABELS } from '../types/event';

function formatFullDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString('es-AR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
}

export default function EventDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [event, setEvent] = useState<EventItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetchEventBySlug(slug)
      .then(setEvent)
      .catch(() => setError('No encontramos este evento. Puede que ya no esté disponible.'))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div>
        <Header />
        <p className="empty-state">Cargando...</p>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div>
        <Header />
        <div className="container empty-state">
          <p>{error || 'Evento no encontrado'}</p>
          <Link to="/" className="btn btn-outline">
            Volver a la agenda
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const coverImage = resolveImageUrl(event.coverImage || event.images[0]);

  return (
    <div>
      <Header />

      <div className="container">
        <div className="event-detail-hero">
          {coverImage ? (
            <img src={coverImage} alt={event.title} />
          ) : (
            <div
              style={{
                display: 'flex',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-text-muted)',
              }}
            >
              Sin imagen
            </div>
          )}
        </div>

        <span className="badge">{CATEGORY_LABELS[event.category]}</span>
        <h1 style={{ margin: '10px 0 4px' }}>{event.title}</h1>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: 24 }}>
          {event.artistName} · {formatFullDate(event.startDate)} · {formatTime(event.startDate)} hs
        </p>

        <div className="event-detail-grid">
          <div>
            <div className="info-card">
              <h3>Sobre el evento</h3>
              <p>{event.description}</p>
            </div>

            <div className="info-card">
              <h3>{event.category === 'concierto' || event.category === 'festival' ? 'Sobre la banda' : 'Sobre el elenco / artista'}</h3>
              <p style={{ fontWeight: 700, marginBottom: 6 }}>{event.artistName}</p>
              {event.artistBio && <p style={{ marginBottom: 12 }}>{event.artistBio}</p>}
              {event.bandMembers.length > 0 && (
                <div className="band-members">
                  {event.bandMembers.map((member, idx) => (
                    <span key={idx} className="band-member-chip">
                      {member.name}
                      {member.role ? ` · ${member.role}` : ''}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="info-card">
              <h3>Cómo llegar</h3>
              <div className="detail-row">
                <strong>Lugar</strong> <span>{event.venueName}</span>
              </div>
              <div className="detail-row">
                <strong>Dirección</strong> <span>{event.address}</span>
              </div>
              <div className="detail-row">
                <strong>Ciudad</strong> <span>{event.city}, {event.province}</span>
              </div>
              {event.mapsUrl && (
                <a href={event.mapsUrl} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">
                  Ver en el mapa
                </a>
              )}
            </div>
          </div>

          <div>
            <div className="info-card">
              <h3>Fecha y hora</h3>
              <div className="detail-row">
                <strong>Día</strong> <span>{formatFullDate(event.startDate)}</span>
              </div>
              <div className="detail-row">
                <strong>Hora</strong> <span>{formatTime(event.startDate)} hs</span>
              </div>
            </div>

            <div className="info-card">
              <h3>Entradas</h3>

              {event.isFree ? (
                <p className="success-text">Este evento es gratuito 🎉</p>
              ) : event.tickets.length > 0 ? (
                <div className="ticket-list">
                  {event.tickets.map((ticket, idx) => (
                    <div key={idx} className="ticket-item">
                      <span>{ticket.label}</span>
                      <strong>${ticket.price.toLocaleString('es-AR')}</strong>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: 'var(--color-text-muted)' }}>Precio a confirmar.</p>
              )}

              {event.soldOut ? (
                <button className="btn btn-outline btn-block" disabled>
                  Entradas agotadas
                </button>
              ) : event.ticketUrl ? (
                <a
                  href={event.ticketUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary btn-block"
                >
                  Comprar entradas
                </a>
              ) : (
                <p style={{ color: 'var(--color-text-muted)' }}>
                  Todavía no hay link de venta disponible.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
