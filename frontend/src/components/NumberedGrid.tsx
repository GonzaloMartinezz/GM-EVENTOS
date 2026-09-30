import Reveal from './Reveal';

export interface NumberedItem {
  title: string;
  description: string;
}

export default function NumberedGrid({ items }: { items: NumberedItem[] }) {
  return (
    <div className="numbered-grid">
      {items.map((item, idx) => (
        <Reveal key={item.title} delay={idx * 0.08}>
          <div className="numbered-cell">
            <span className="num">{String(idx + 1).padStart(2, '0')}</span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
