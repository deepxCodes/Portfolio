import { useCallback, useMemo } from "react";
import { Particles } from "react-tsparticles";
import { loadStarsPreset } from "tsparticles-preset-stars";

export default function GalaxyParticles() {
  const particlesInit = useCallback(async (engine) => {
    await loadStarsPreset(engine);
  }, []);

  // detect if mobile (small screen)
  const isMobile = useMemo(() => window.innerWidth < 768, []);

  return (
    <Particles
      id="galaxy"
      init={particlesInit}
      options={{
        preset: "stars",
        background: {
          color: "#0a0a23"
        },
        fpsLimit: isMobile ? 30 : 60,   
        particles: {
          number: {
            value: isMobile ? 40 : 120, 
          },
          move: {
            speed: isMobile ? 0.7 : 1.0 
          }
        },
        detectRetina: true,
        fullScreen: false
      }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0
      }}
    />
  );
}
