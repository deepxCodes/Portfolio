import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { Github, Play } from "lucide-react";

const projects = [
  {
    title: "Tic Tac Toe UI Game",
    description: "A fun and interactive Tic Tac Toe game built with modern UI.",
    link: "https://github.com/deepxCodes/tic-tac-toe-ui",
  },
  {
    title: "Student Records Management",
    description: "C-program project for managing student records with file handling.",
    link: "https://github.com/deepxCodes/student-records",
  },
  {
    title: "Prime Number Checker",
    description: "Simple prime number checking app in C++.",
    link: "https://github.com/deepxCodes/prime-checker",
  },
  {
    title: "Portfolio Website",
    description: "This portfolio built with React + Tailwind + Framer Motion.",
    link: "https://github.com/deepxCodes/portfolio",
  },
];

export default function Projects() {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white">
      <h2 className="text-4xl font-bold text-center mb-12">
        🌟 Featured Projects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <Tilt
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              scale={1.05}
              transitionSpeed={400}
            >
              <div className="bg-neutral-800/70 backdrop-blur-lg rounded-2xl shadow-lg border border-neutral-700 p-6 hover:shadow-purple-700/40 hover:border-purple-400 transition-all duration-300">
                <h3 className="text-2xl font-semibold mb-3">{project.title}</h3>
                <p className="text-gray-400 mb-6">{project.description}</p>

                {/* Animated Buttons */}
                <div className="flex gap-4">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 px-5 py-2 rounded-xl font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-600 hover:to-purple-600 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-pink-500/40"
                  >
                    <Github className="group-hover:rotate-12 transition-transform" size={18} />
                    GitHub
                  </a>

                  {/* Demo Button (future use, e.g. Netlify/Vercel link) */}
                  <button
                    disabled
                    className="group inline-flex items-center gap-2 px-5 py-2 rounded-xl font-medium text-gray-300 bg-gradient-to-r from-neutral-700 to-neutral-800 cursor-not-allowed opacity-60"
                  >
                    <Play size={18} /> Live Demo
                  </button>
                </div>
              </div>
            </Tilt>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
