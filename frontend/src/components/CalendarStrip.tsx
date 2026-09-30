import { EventItem } from '../types/event';

interface Props {
  events: EventItem[];
  days?: number;
}

/** Tira horizontal de los próximos N días, marcando los que tienen algún evento */
export default function CalendarStrip({ events, days = 14 }: Props) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const eventDatesSet = new Set(
    events.map((e) => new Date(e.startDate).toDateString())
  );

  const cells = Array.from({ length: days }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d;
  });

  return (
    <div className="calendar-strip">
      {cells.map((date, idx) => {
        const hasEvent = eventDatesSet.has(date.toDateString());
        return (
          <div key={idx} className={`calendar-day${hasEvent ? ' has-event' : ''}`}>
            <span className="day-num">{String(date.getDate()).padStart(2, '0')}</span>
            <span className="day-name">
              {date.toLocaleDateString('es-AR', { month: 'short' })}
            </span>
            {hasEvent && <span className="dot" />}
          </div>
        );
      })}
    </div>
  );
}
