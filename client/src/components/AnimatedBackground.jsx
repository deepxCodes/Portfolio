import { useEffect } from 'react';
import Lenis from 'lenis';

export default function AnimatedBackground() {
  useEffect(() => {
    // detect if device is mobile
    const isMobile = window.innerWidth < 768;

    const lenis = new Lenis({
      lerp: isMobile ? 0.15 : 0.07, // smoother but less frequent updates on mobile
      smoothWheel: !isMobile,       // disable smooth wheel on mobile for performance
    });

    let frame;
    function raf(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      {/* Soft gradient blobs */}
      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-brand-700/20 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
    </div>
  );
}
