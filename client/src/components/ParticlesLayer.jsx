import { useCallback } from 'react';
import Particles from 'react-tsparticles';

export default function ParticlesLayer() {
  const options = {
    fullScreen: { enable: false },
    background: { color: 'transparent' },
    particles: {
      number: { value: 30 },
      size: { value: { min: 1, max: 3 } },
      move: { enable: true, speed: 0.6 },
      opacity: { value: 0.4 },
      links: { enable: true, opacity: 0.2, distance: 120 }
    }
  };
  return (
    <div className="absolute inset-0 -z-10">
      <Particles id="tsparticles" options={options} />
    </div>
  );
}
