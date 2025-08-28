import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { Github, Play } from "lucide-react";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  // Fetch repos directly from GitHub API
  useEffect(() => {
    fetch("https://api.github.com/users/deepxCodes/repos") // 👈 replace with your GitHub username
      .then((res) => res.json())
      .then((data) => {
        // Filter or map repos you want to show
        const formatted = data.map((repo) => ({
          title: repo.name,
          description: repo.description || "No description available",
          link: repo.html_url,
          demo: repo.homepage || null, // GitHub repo has a "homepage" field if you added one
        }));
        setProjects(formatted);
      })
      .catch((err) => console.error("Error fetching projects:", err));
  }, []);

  return (
    <section id="projects" className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-soft">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 hover:border-white/20 transition shadow-soft">
        <h2 className="text-4xl font-bold text-center mb-12">
          🌟 Featured Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {projects.length === 0 ? (
            <p className="text-center text-gray-400">Loading projects...</p>
          ) : (
            projects.map((project, index) => (
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
                    <h3 className="text-2xl font-semibold mb-3">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 mb-6">{project.description}</p>

                    {/* Buttons */}
                    <div className="flex gap-4">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 px-5 py-2 rounded-xl font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-600 hover:to-purple-600 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-pink-500/40"
                      >
                        <Github
                          className="group-hover:rotate-12 transition-transform"
                          size={18}
                        />
                        GitHub
                      </a>

                      {project.demo ? (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-2 px-5 py-2 rounded-xl font-medium text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-emerald-600 hover:to-green-500 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-green-500/40"
                        >
                          <Play size={18} /> Live Demo
                        </a>
                      ) : (
                        <button
                          disabled
                          className="group inline-flex items-center gap-2 px-5 py-2 rounded-xl font-medium text-gray-300 bg-gradient-to-r from-neutral-700 to-neutral-800 cursor-not-allowed opacity-60"
                        >
                          <Play size={18} /> Live Demo
                        </button>
                      )}
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
