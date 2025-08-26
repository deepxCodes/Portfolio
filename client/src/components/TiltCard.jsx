import Tilt from "react-parallax-tilt";

export default function TiltCard({ children }) {
  return (
    <Tilt
      tiltMaxAngleX={15}
      tiltMaxAngleY={15}
      perspective={1000}
      transitionSpeed={400}
      scale={1.05}
      gyroscope={true}
      className="bg-neutral-800/40 rounded-2xl p-6 shadow-lg"
    >
      {children}
    </Tilt>
  );
}
