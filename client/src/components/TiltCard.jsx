import Tilt from "react-parallax-tilt";

export default function TiltCard({ children }) {
  // Detect if the device is mobile
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <Tilt
      tiltMaxAngleX={isMobile ? 5 : 15}     
      tiltMaxAngleY={isMobile ? 5 : 15}
      perspective={1000}
      transitionSpeed={isMobile ? 250 : 400}
      scale={isMobile ? 1 : 1.05}           
      gyroscope={!isMobile}                 
      glareEnable={false}                   
      className="bg-neutral-800/40 rounded-2xl p-6 shadow-lg"
    >
      {children}
    </Tilt>
  );
}
