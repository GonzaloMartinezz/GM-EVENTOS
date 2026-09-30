interface Props {
  items: string[];
}

/** Tira de texto en movimiento continuo (ticker), como los carteles de un festival */
export default function Marquee({ items }: Props) {
  const loop = [...items, ...items];

  return (
    <div className="marquee-strip">
      <div
        className="marquee-track"
        style={{ animation: 'marquee-scroll 22s linear infinite' }}
      >
        {loop.map((item, idx) => (
          <span key={idx}>{item}</span>
        ))}
      </div>
      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
