import { useCallback } from "react";
import { Particles } from "react-tsparticles";
import { loadStarsPreset } from "tsparticles-preset-stars";

export default function GalaxyParticles() {
  const particlesInit = useCallback(async (engine) => {
    await loadStarsPreset(engine);
  }, []);

  return (
    <Particles
      id="galaxy"
      init={particlesInit}
      options={{
        preset: "stars",
        background: {
          color: "#0a0a23"
        }
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