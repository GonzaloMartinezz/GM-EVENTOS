import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Props {
  eyebrow: string;
  titleLine1: string;
  titleAccent: string;
  sub: string;
  primaryCta: string;
  secondaryCta: string;
  bgWord: string;
}

/**
 * Hero principal con parallax en capas: el título se desplaza un poco más
 * lento que la palabra gigante de fondo, y todo se desvanece suavemente
 * a medida que el usuario baja. Todo el texto viene del contenido editable
 * del sitio (panel admin), con defaults si todavía no se cargó.
 */
export default function HeroMkt({
  eyebrow,
  titleLine1,
  titleAccent,
  sub,
  primaryCta,
  secondaryCta,
  bgWord,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const bgWordY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const bgWordOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.15]);

  return (
    <section ref={ref} className="mkt-section mkt-section--dark hero-mkt">
      <motion.div
        className="container"
        style={{ position: 'relative', zIndex: 1, y: contentY, opacity: contentOpacity }}
      >
        <motion.span
          className="mkt-eyebrow"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {eyebrow}
        </motion.span>

        <motion.h1
          className="mkt-display hero-mkt-title"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {titleLine1} <span className="accent">{titleAccent}</span>
        </motion.h1>

        <motion.p
          className="hero-mkt-sub"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          {sub}
        </motion.p>

        <motion.div
          className="hero-mkt-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <a href="#lineup" className="btn btn-primary">
            {primaryCta}
          </a>
          <a href="#calendario" className="btn btn-outline">
            {secondaryCta}
          </a>
        </motion.div>
      </motion.div>

      <motion.span
        className="hero-bg-word"
        style={{ y: bgWordY, opacity: bgWordOpacity }}
      >
        {bgWord}
      </motion.span>
    </section>
  );
}
