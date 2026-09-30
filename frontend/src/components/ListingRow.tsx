import { Link } from 'react-router-dom';
import { EventItem, CATEGORY_LABELS } from '../types/event';
import { resolveImageUrl } from '../services/api';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function ListingRow({ event }: { event: EventItem }) {
  const image = resolveImageUrl(event.coverImage || event.images[0]);

  return (
    <Link to={`/eventos/${event.slug}`} className="listing-row">
      <div className="listing-thumb">
        {image ? <img src={image} alt={event.title} /> : null}
      </div>
      <div className="listing-info">
        <div className="listing-title">{event.title}</div>
        <div className="listing-meta">
          {CATEGORY_LABELS[event.category]} · {event.artistName} · {event.venueName}
        </div>
      </div>
      <div className="listing-date">{formatDate(event.startDate)}</div>
      <span className="btn btn-outline btn-sm">Ver más</span>
    </Link>
  );
}
