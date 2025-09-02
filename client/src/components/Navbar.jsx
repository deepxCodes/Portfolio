import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

function scrollToSection(id) {
  const el = document.getElementById(id.replace("#", ""));
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#highlights", label: "Highlights" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, type: "spring" }}
      className={`fixed top-4 left-4 z-50 
        w-[90%] md:w-auto px-6 py-3 rounded-2xl border backdrop-blur-lg shadow-xl
        ${scrolled ? "bg-black/70 border-white/20" : "bg-black/40 border-white/10"}
      `}
    >
      <div className="flex items-center justify-between md:gap-8">
        {/* Logo / Brand */}
        <div className="text-lg font-bold tracking-wide text-white" 
     style={{ fontFamily: "'Michroma', sans-serif" }}>
  Deep<span className="text-blue-400">Verse!</span>
</div>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-6 relative">
          {links.map((l) => (
            <li key={l.href} className="relative">
              <button
                onClick={() => {
                  setActive(l.href);
                  scrollToSection(l.href);
                }}
                className={`relative text-sm transition ${
                  active === l.href
                    ? "text-blue-400"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {l.label}
                {active === l.href && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 -bottom-1 h-[2px] w-full bg-blue-400 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <motion.ul
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mt-4 flex flex-col gap-4 md:hidden"
        >
          {links.map((l) => (
            <li key={l.href}>
              <button
                onClick={() => {
                  setActive(l.href);
                  scrollToSection(l.href);
                  setOpen(false);
                }}
                className={`block w-full text-left text-base transition ${
                  active === l.href
                    ? "text-blue-400"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {l.label}
              </button>
            </li>
          ))}
        </motion.ul>
      )}
    </motion.nav>
  );
}
