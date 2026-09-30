import Header from '../components/Header';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';
import SectionLabel from '../components/SectionLabel';
import NumberedGrid from '../components/NumberedGrid';

const STEPS = [
  { title: 'Buscá o navegá', description: 'Usá el buscador por nombre, o filtrá por categoría, ciudad o fecha.' },
  { title: 'Elegí el evento', description: 'Mirá el detalle: día, hora, lugar, cómo llegar y quién se presenta.' },
  { title: 'Comprá la entrada', description: 'Te lleva directo a la entradera oficial (Ticketek, Passline, etc.).' },
  { title: 'Guardá la fecha', description: 'Anotá el día y disfrutá — nosotros seguimos sumando eventos nuevos.' },
];

const FAQS = [
  {
    title: '¿Esto vende las entradas?',
    description: 'No directamente: te conectamos con la entradera oficial de cada evento para que compres ahí, de forma segura.',
  },
  {
    title: '¿Puedo publicar mi evento?',
    description: 'Sí. Escribinos y lo cargamos en la agenda con toda la info: fecha, lugar, banda y dónde comprar.',
  },
  {
    title: '¿Cada cuánto se actualiza?',
    description: 'La agenda se actualiza a medida que se van confirmando nuevas fechas, no hay un día fijo.',
  },
  {
    title: '¿Hay eventos gratuitos?',
    description: 'Sí, los vas a ver marcados como "Gratis" tanto en las tarjetas como en el detalle del evento.',
  },
];

/** Página informativa: cómo se usa el sitio y preguntas frecuentes. */
export default function ComoFunciona() {
  return (
    <div>
      <Header />

      <section className="mkt-section mkt-section--dark">
        <div className="container" style={{ padding: '110px 20px 70px' }}>
          <Reveal>
            <SectionLabel
              number="01"
              eyebrow="Guía rápida"
              title="Cómo funciona Agenda Cultural"
              align="center"
            />
          </Reveal>
          <NumberedGrid items={STEPS} />
        </div>
      </section>

      <section className="mkt-section mkt-section--orange">
        <div className="container" style={{ padding: '70px 20px' }}>
          <Reveal>
            <SectionLabel number="02" eyebrow="Antes de que preguntes" title="Preguntas frecuentes" />
          </Reveal>
          <NumberedGrid items={FAQS} />
        </div>
      </section>

      <Footer />
    </div>
  );
}
