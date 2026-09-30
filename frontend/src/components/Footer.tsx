import { useState } from 'react';
import { SiteSettings } from '../types/settings';

interface Props {
  settings?: Pick<SiteSettings, 'ctaEyebrow' | 'ctaTitle' | 'ctaButtonLabel' | 'footerText'>;
}

const DEFAULTS = {
  ctaEyebrow: 'No te pierdas nada',
  ctaTitle: 'Aprovechá todo lo que pasa en Tucumán',
  ctaButtonLabel: 'Quiero enterarme',
  footerText: 'Agenda Cultural · Conciertos, teatro, stand up y más — en Tucumán y Buenos Aires',
};

export default function Footer({ settings }: Props) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const ctaEyebrow = settings?.ctaEyebrow || DEFAULTS.ctaEyebrow;
  const ctaTitle = settings?.ctaTitle || DEFAULTS.ctaTitle;
  const ctaButtonLabel = settings?.ctaButtonLabel || DEFAULTS.ctaButtonLabel;
  const footerText = settings?.footerText || DEFAULTS.footerText;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // MVP: todavía no hay backend de newsletter, solo confirmamos visualmente
    setSent(true);
  }

  return (
    <>
      <section className="mkt-section mkt-section--orange cta-strip">
        <div className="container">
          <span className="mkt-eyebrow">{ctaEyebrow}</span>
          <h2>{ctaTitle}</h2>
          <form className="cta-form" onSubmit={handleSubmit}>
            <input
              type="email"
              required
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">
              {sent ? '¡Listo!' : ctaButtonLabel}
            </button>
          </form>
        </div>
      </section>

      <footer className="footer">
        <div className="container">{footerText}</div>
      </footer>
    </>
  );
}
