import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { EventItem, CATEGORY_LABELS } from '../types/event';
import { resolveImageUrl } from '../services/api';

const MotionLink = motion(Link);

function formatDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString('es-AR', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  });
}

function formatTime(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
}

function lowestPrice(event: EventItem): string {
  if (event.isFree) return 'Gratis';
  if (!event.tickets.length) return 'Consultar';
  const min = Math.min(...event.tickets.map((t) => t.price));
  return `Desde $${min.toLocaleString('es-AR')}`;
}

export default function EventCard({ event }: { event: EventItem }) {
  const image = resolveImageUrl(event.coverImage || event.images[0]);

  return (
    <MotionLink
      to={`/eventos/${event.slug}`}
      className="event-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="event-card-image">
        {image ? <img src={image} alt={event.title} /> : <span>Sin imagen</span>}
      </div>
      <div className="event-card-body">
        <span className="badge">{CATEGORY_LABELS[event.category]}</span>
        <div className="event-card-date">
          {formatDate(event.startDate)} · {formatTime(event.startDate)} hs
        </div>
        <div className="event-card-title">{event.title}</div>
        <div className="event-card-venue">
          {event.artistName} · {event.venueName}, {event.city}
        </div>
        <div className="event-card-footer">
          <span className="price-tag">{lowestPrice(event)}</span>
          {event.soldOut && <span className="badge">Agotado</span>}
        </div>
      </div>
    </MotionLink>
  );
}
