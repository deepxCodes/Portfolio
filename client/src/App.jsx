import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

import AnimatedBackground from "./components/AnimatedBackground";
import Navbar from "./components/Navbar";
import Section from "./components/Section";
import TiltCard from "./components/TiltCard";
import ParticlesLayer from "./components/ParticlesLayer";
import SocialButtons from "./components/SocialButtons";
import Projects from "./components/Projects";
import GalaxyParticles from "./components/Galaxyparticles";

import profileFallback from "./config/profile.json";
import myPhoto from "./assets/myphoto-DHlQynZN.jpg";

export default function App() {
  const [profile, setProfile] = useState(null);
  const [readme, setReadme] = useState(null);

  const username = import.meta.env.VITE_GITHUB_USERNAME || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (username) {
          const [p, r] = await Promise.all([
            axios.get(`/api/profile?username=${username}`),
            axios.get(`/api/readme?username=${username}`),
          ]);
          setProfile(p.data);
          if (r.data?.sections) setReadme(r.data.sections);
        }
      } catch (e) {
        console.warn("Falling back to local profile config:", e?.message);
      } finally {
        setProfile((prev) => prev || profileFallback.profile);
        setReadme((prev) => prev || profileFallback.sections);
      }
    };

    fetchData();
  }, [username]);

  const socials = useMemo(
    () => profile?.socials || profileFallback.profile.socials,
    [profile]
  );

  return (
    <div className="min-h-screen relative font-body text-neutral-200 bg-black">
      {/* Background Effects */}
      <GalaxyParticles />
      <AnimatedBackground />
      <ParticlesLayer />

      <div className="relative z-10">
        <Navbar />

        {/* Hero Section */}
        <section id="home" className="relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 pt-24 pb-16 md:pt-32 md:pb-24">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Text */}
              <div>
                <motion.h1
                  className="font-heading text-4xl md:text-6xl font-extrabold tracking-tight"
                  style={{ fontFamily: "'Orbitron', sans-serif" }} // Add this line
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {profile?.name || "Your Name"}
                </motion.h1>

                <motion.p
                  className="mt-5 text-lg font-body text-neutral-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                >
                  {profile?.bio || "Engineer • Designer • Problem Solver"}
                </motion.p>

                <motion.div
                  className="mt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.15 }}
                >
                
                </motion.div>
              </div>

                            {/* Avatar */}
              <motion.div
                className="relative flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                whileHover={{ scale: window.innerWidth >= 768 ? 1.05 : 1 }} // Hover only on desktop
                whileTap={{ scale: window.innerWidth < 768 ? 0.95 : 1 }}    // Tap shrink only on mobile
              >
                {window.innerWidth >= 768 ? (
                  <TiltCard>
                    <div className="relative p-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg backdrop-blur-sm">
                      <img
                        src={myPhoto}
                        alt="Avatar"
                        className="w-56 h-56 rounded-full object-cover border-4 border-gray-900"
                        loading="lazy"
                        draggable={false}
                      />
                    </div>
                  </TiltCard>
                ) : (
                  <div className="relative p-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg backdrop-blur-sm">
                    <img
                      src={myPhoto}
                      alt="Avatar"
                      className="w-36 h-36 md:w-56 md:h-56 rounded-full object-cover border-4 border-gray-900"
                      loading="lazy"
                      draggable={false}
                    />
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <Section id="about" title="About">
          <div className="prose prose-invert max-w-none font-body text-lg leading-relaxed">
            <p>
              {readme?.about ||
                "I build delightful digital experiences with React, Node, and cloud-native tooling."}
            </p>
          </div>
        </Section>

        {/* Highlights Section */}
        <Section id="highlights" title="Highlights">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(readme?.highlights?.length
              ? readme.highlights
              : profileFallback.sections.highlights
            )
              .slice(0, 6)
              .map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.03 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 hover:border-white/20 transition shadow-soft"
                >
                  <h3 className="font-heading font-semibold text-lg">
                    {h.title || h}
                  </h3>
                  {h.detail && (
                    <p className="font-body text-sm text-neutral-300 mt-2">
                      {h.detail}
                    </p>
                  )}
                </motion.div>
              ))}
          </div>
        </Section>

        {/* Projects Section */}
        <Section id="projects" title="Projects">
          <Projects />
        </Section>

        {/* Experience Section */}
        <Section id="experience" title="Experience">
          <div className="space-y-4">
            {(readme?.experience?.length
              ? readme.experience
              : profileFallback.sections.experience
            )
              .slice(0, 6)
              .map((e, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 hover:border-white/20 transition shadow-soft"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-semibold">{e.title}</h3>
                  </div>
                  {e.detail && (
                    <p className="font-body text-sm text-neutral-300 mt-2">
                      {e.detail}
                    </p>
                  )}
                </motion.div>
              ))}
          </div>
        </Section>

        {/* Contact Section */}
        <section
          id="contact"
          className="relative py-16 md:py-24 rounded-2xl border border-white/10 bg-white/5 p-5 min-h-[200px] z-10 shadow-soft"
        >
          <h2 className="font-heading text-2xl font-bold text-center text-white">
            Contact Me
          </h2>
          <p className="font-body text-center mt-4 text-neutral-300">
            Let's get in touch!
          </p>
          <div className="mt-6 flex justify-center">
            <SocialButtons socials={socials} />
          </div>
        </section>

        {/* Footer */}
        <footer className="py-10 text-center text-sm text-white font-body">
          © {new Date().getFullYear()} — Created by{" "}
          {profile?.name || "Joydeep Ghosh"}
        </footer>
      </div>
    </div>
  );
}
