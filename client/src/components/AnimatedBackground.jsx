import { useEffect } from 'react';
import Lenis from 'lenis';

export default function AnimatedBackground() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.07, smoothWheel: true });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-brand-700/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>
    </>
  );
}
