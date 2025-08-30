import Tilt from "react-parallax-tilt";

export default function TiltCard({ children }) {
  // Detect if the device is mobile
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <Tilt
      tiltMaxAngleX={isMobile ? 5 : 15}     // gentler tilt on mobile
      tiltMaxAngleY={isMobile ? 5 : 15}
      perspective={1000}
      transitionSpeed={isMobile ? 250 : 400} // faster recovery on mobile
      scale={isMobile ? 1 : 1.05}           // disable scaling on mobile
      gyroscope={!isMobile}                 // gyroscope off on mobile (saves CPU)
      glareEnable={false}                   // glare effect disabled (heavy)
      className="bg-neutral-800/40 rounded-2xl p-6 shadow-lg"
    >
      {children}
    </Tilt>
  );
}
