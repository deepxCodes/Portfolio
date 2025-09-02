// Import icons directly
import githubIcon from "../assets/github.png";
import facebookIcon from "../assets/facebook.png";
import instagramIcon from "../assets/instagram.png";
import linkedinIcon from "../assets/linkedin.png";
import { useState } from "react";

// Social data
const socials = [
  {
    name: "GitHub‎ ‎ ",
    url: "https://github.com/deepxCodes",
    color: "rgba(200,200,200,0.8)",
    icon: githubIcon,
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/share/1G4UFYkeWn/",
    color: "rgba(25,100,230,0.8)",
    icon: facebookIcon,
  },
  {
    name: "Instagram",
    url: "https://instagram.com/rawly.deep",
    color: "rgba(230,50,150,0.8)",
    icon: instagramIcon,
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/joydeep-ghosh-626667323",
    color: "rgba(0,120,210,0.8)",
    icon: linkedinIcon,
  },
];

function SocialIcon({ social }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center cursor-pointer mb-3"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ perspective: "600px" }}
    >
      <div
        className="relative rounded-full flex items-center justify-center"
        style={{
          // Make icons smaller on mobile devices
          width: window.innerWidth < 480 ? "45px" : "60px", 
          height: window.innerWidth < 480 ? "45px" : "60px",
          transform: isHovered
            ? "rotateX(15deg) rotateY(15deg) scale(1.15)"
            : "rotateX(0) rotateY(0) scale(1)",
          boxShadow: isHovered
            ? `0 0 12px ${social.color}, 0 0 24px ${social.color}, 0 0 48px ${social.color}`
            : `0 0 6px ${social.color}, 0 0 12px ${social.color}`,
          transition: "all 0.35s ease",
        }}
      >
        <img
          src={social.icon}
          alt={social.name}
          className="w-full h-full p-2 object-contain" 
          style={{
            filter: isHovered
              ? `drop-shadow(0 0 6px ${social.color}) drop-shadow(0 0 10px ${social.color})`
              : `drop-shadow(0 0 3px ${social.color})`,
            transition: "filter 0.3s ease",
          }}
        />
      </div>
      <span
        className="text-sm font-medium mt-2 text-white font-space-grotesk tracking-wide"
        style={{
          fontFamily: "'Michroma', sans-serif",
          letterSpacing: "0.02em", // Slightly increased letter spacing
          textShadow: isHovered ? `0 0 8px ${social.color}` : "none",
          transition: "text-shadow 0.3s ease",
          paddingBottom: "4px"
        }}
      >
        {social.name}
      </span>
    </a>
  );
}

export default function SocialButtons() {
  return (
    <div className="flex flex-wrap justify-center gap-3 md:gap-6 mt-10 pb-3">
      {socials.map((social, i) => (
        <SocialIcon key={i} social={social} />
      ))}
    </div>
  );
}