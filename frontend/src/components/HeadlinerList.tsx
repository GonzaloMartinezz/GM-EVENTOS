import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { EventItem } from '../types/event';

function formatShortDate(iso: string): string {
  return new Date(iso).toLocaleDateString('es-AR', { day: '2-digit', month: 'short' });
}

/** Listado tipo "line-up" de los artistas/bandas más destacados */
export default function HeadlinerList({ events }: { events: EventItem[] }) {
  return (
    <div className="headliners-list">
      {events.map((event, idx) => (
        <motion.div
          key={event._id}
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: idx * 0.06 }}
        >
          <Link to={`/eventos/${event.slug}`} className="headliner-row">
            <span className="headliner-name">{event.artistName}</span>
            <span className="headliner-meta">
              <span>{event.venueName}</span>
              <span>{formatShortDate(event.startDate)}</span>
              <span className="headliner-arrow">↗</span>
            </span>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
