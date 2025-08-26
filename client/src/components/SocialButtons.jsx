import { motion } from "framer-motion";
import { Github, Facebook, Instagram, Linkedin } from "lucide-react";

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
  return (
    <div className="flex gap-4 justify-center mt-8 flex-wrap">
      {socials.map((social, index) => (
        <motion.a
          key={index}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.15, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          className={`p-4 rounded-2xl shadow-lg bg-gradient-to-br ${social.gradient} 
                      text-white flex items-center gap-2 
                      transition-all duration-300 hover:shadow-2xl`}
        >
          {social.icon}
          <span className="font-medium">{social.name}</span>
        </motion.a>
      ))}
    </div>
  );
}
