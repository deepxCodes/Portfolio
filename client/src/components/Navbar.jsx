import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const links = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#highlights', label: 'Highlights' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 rounded-full border px-4 py-2 backdrop-blur ${
        scrolled ? 'bg-black/60 border-white/15' : 'bg-black/30 border-white/10'
      }`}
    >
      <ul className="flex items-center gap-4">
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href} className="text-sm text-neutral-200 hover:text-white transition">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}
