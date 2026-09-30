import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface Props {
  city: string;
  caption: string;
}

/** Sección con el nombre de la ciudad en tipografía gigante que se mueve en parallax al scrollear */
export default function ParallaxCity({ city, caption }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    restDelta: 0.001,
  });

  const y = useTransform(smoothProgress, [0, 1], [120, -120]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.88, 1, 0.88]);
  const opacity = useTransform(smoothProgress, [0, 0.15, 0.85, 1], [0.4, 1, 1, 0.4]);
  const captionY = useTransform(smoothProgress, [0, 1], [40, -40]);

  return (
    <div ref={ref} className="parallax-city">
      <motion.div style={{ y, scale, opacity }}>
        <div className="parallax-city-text">{city}</div>
      </motion.div>
      <motion.div className="parallax-city-caption" style={{ y: captionY }}>
        {caption}
      </motion.div>
    </div>
  );
}
