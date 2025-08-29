import { motion } from "framer-motion";
import { Github, Facebook, Instagram, Linkedin } from "lucide-react";
import { useState } from "react";

const socials = [
  {
    name: "GitHub",
    icon: <Github className="w-6 h-6" />,
    url: "https://github.com/deepxCodes",
    gradient: "from-gray-800 via-gray-700 to-gray-900",
  },
  {
    name: "Facebook",
    icon: <Facebook className="w-6 h-6" />,
    url: "https://www.facebook.com/share/1G4UFYkeWn/",
    gradient: "from-blue-500 via-blue-600 to-blue-700",
  },
  {
    name: "Instagram",
    icon: <Instagram className="w-6 h-6" />,
    url: "https://instagram.com/rawly.deep",
    gradient: "from-pink-500 via-purple-500 to-yellow-500",
  },
  {
    name: "LinkedIn",
    icon: <Linkedin className="w-6 h-6" />,
    url: "https://linkedin.com/in/joydeep-ghosh-626667323",
    gradient: "from-sky-600 via-blue-600 to-blue-800",
  },
];

export default function SocialButtons() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  return (
    <div className="flex gap-6 justify-center mt-10 flex-wrap perspective-[1200px]">
      {socials.map((social, index) => (
        <motion.a
          key={index}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`relative group overflow-hidden p-5 rounded-2xl shadow-lg bg-gradient-to-br ${social.gradient} 
                      text-white flex items-center gap-3 font-semibold transition-all duration-500`}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            setCoords({ x, y });
          }}
          onMouseLeave={() => setCoords({ x: 0, y: 0 })}
          style={{
            transform: `perspective(600px) rotateX(${coords.y / -20}deg) rotateY(${coords.x / 20}deg)`,
          }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* ✨ Shine sweep */}
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent 
                           group-hover:translate-x-full transition-transform duration-700 ease-in-out" />

          {/* 🔮 Ripple effect */}
          <span className="pointer-events-none absolute inset-0 opacity-0 group-active:opacity-100 
                           animate-ripple bg-white/20 rounded-full" />

          {social.icon}
          <span className="z-10">{social.name}</span>
        </motion.a>
      ))}
    </div>
  );
}

// Extra ripple animation via Tailwind plugin or custom CSS
// Add this to your global.css if using Tailwind
/*
@keyframes ripple {
  0% { transform: scale(0); opacity: 0.6; }
  100% { transform: scale(4); opacity: 0; }
}
.animate-ripple {
  animation: ripple 0.6s linear;
}
*/
