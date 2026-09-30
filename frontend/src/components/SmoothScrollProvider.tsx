import { ReactNode, useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Envuelve toda la app y activa un scroll con inercia (tipo "smooth scroll"),
 * el mismo efecto que usan la mayoría de los sitios con animaciones de scroll
 * pulidas. Lenis sigue actualizando el scroll nativo del navegador, así que
 * useScroll/whileInView de Framer Motion siguen funcionando sin cambios.
 */
export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Respeta a quienes pidieron menos movimiento en su sistema operativo
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Si alguien navega a un #hash (ej: /#lineup), que Lenis lo scrollee suave
    function handleHashClick(e: MouseEvent) {
      const target = (e.target as HTMLElement)?.closest('a[href^="#"], a[href*="/#"]');
      if (!target) return;
      const href = target.getAttribute('href') || '';
      const hashIndex = href.indexOf('#');
      if (hashIndex === -1) return;
      const id = href.slice(hashIndex + 1);
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el, { offset: -80, duration: 1.2 });
      }
    }
    document.addEventListener('click', handleHashClick);

    return () => {
      document.removeEventListener('click', handleHashClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
