interface Props {
  number: string;
  eyebrow: string;
  title: string;
  align?: 'left' | 'center';
}

/** Encabezado estándar de sección: número + texto pequeño + título grande. */
export default function SectionLabel({ number, eyebrow, title, align = 'left' }: Props) {
  return (
    <div className={`section-label${align === 'center' ? ' section-label--center' : ''}`}>
      <span className="section-label-num">{number}</span>
      <div>
        <span className="mkt-eyebrow">{eyebrow}</span>
        <h2 className="mkt-display section-label-title">{title}</h2>
      </div>
    </div>
  );
}
