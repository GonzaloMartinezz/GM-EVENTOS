import { motion, useScroll, useSpring } from 'framer-motion';

/** Barra fina y fija arriba de todo que muestra cuánto scrolleaste de la página */
export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{
        scaleX,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        background: 'var(--color-primary)',
        transformOrigin: '0% 50%',
        zIndex: 100,
      }}
    />
  );
}
