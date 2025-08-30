import { useCallback, useMemo } from "react";
import Particles from "react-tsparticles";

export default function ParticlesLayer() {
  // Detect if device is mobile
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  // Memoize options so they don’t recalc on every render
  const options = useMemo(
    () => ({
      fullScreen: { enable: false },
      background: { color: "transparent" },
      particles: {
        number: { value: isMobile ? 15 : 30 }, // fewer particles on mobile
        size: { value: { min: 1, max: isMobile ? 2 : 3 } },
        move: { enable: true, speed: isMobile ? 0.3 : 0.6 }, // slower on mobile
        opacity: { value: 0.4 },
        links: { enable: true, opacity: 0.15, distance: isMobile ? 80 : 120 },
      },
      detectRetina: true, // auto scales density based on device pixel ratio
    }),
    [isMobile]
  );

  return (
    <div className="absolute inset-0 -z-10">
      <Particles id="tsparticles" options={options} />
    </div>
  );
}
