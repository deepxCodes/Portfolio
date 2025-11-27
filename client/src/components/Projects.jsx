import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { Github, Play } from "lucide-react";

// 🎯 Custom description for specific projects
const customDescriptions = {
  portfolio:
    "⚡ A modern, interactive portfolio showcasing my work — built with React, Vite, TailwindCSS, and Framer Motion.",
  "tic-tac-toe_ui":
    "🎮 A fun and interactive Tic Tac Toe game built with React, featuring smooth animations and a responsive design.",
};

// Add a manual project fallback (ensures Tic Tac Toe shows even if homepage is missing)
const manualProjects = [
  {
    id: "manual-tictactoe",
    title: "Tic Tac Toe UI",
    description:
      "🎮 A fun and interactive Tic Tac Toe game built with React, featuring smooth animations and a responsive design.",
    link: "https://github.com/deepxCodes/tic-tac-toe_ui",
    demo: "https://deepxcodes.github.io/tic-tac-toe_ui", // update if different
  },
];

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ REPLACED FETCH LOGIC
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const username = import.meta.env.VITE_GITHUB_USERNAME || "deepxCodes";
        const API_URL = import.meta.env.DEV ? "http://localhost:5050" : "";

        const response = await fetch(
          `${API_URL}/api/projects?username=${username}`
        );
        if (!response.ok) throw new Error("Failed to fetch projects");

        const data = await response.json();

        // ➤ Only include repos that have a live demo, then force-include Tic Tac Toe
        const formatted = data
          .filter((p) => !!p.demo)
          .map((project) => {
            const originalName = project.link.split("/").pop().toLowerCase();

            return {
              ...project,
              description:
                customDescriptions[originalName] || project.description,
              title: project.title.replace(/-/g, " ").replace(/_/g, " "),
            };
          });

        // Ensure Tic Tac Toe is present (avoid duplicates)
        const hasTicTacToe = formatted.some((p) =>
          p.link.toLowerCase().includes("tic-tac-toe_ui")
        );
        const finalList = hasTicTacToe
          ? formatted
          : [...formatted, manualProjects[0]];

        setProjects(finalList);
      } catch (err) {
        console.error("❌ Error fetching projects:", err);

        // ➤ Fallback to direct GitHub API but only include repos with homepage
        try {
          const username = import.meta.env.VITE_GITHUB_USERNAME || "deepxCodes";
          const res = await fetch(
            `https://api.github.com/users/${username}/repos`
          );
          const data = await res.json();

          const formatted = data
            .filter((repo) => !!repo.homepage)
            .map((repo) => {
              const description =
                customDescriptions[repo.name.toLowerCase()] ||
                repo.description ||
                "✨ Live demo available.";

              return {
                id: repo.id,
                title: repo.name.replace(/-/g, " ").replace(/_/g, " "),
                description,
                link: repo.html_url,
                demo: repo.homepage,
              };
            });

          // Ensure Tic Tac Toe is present in fallback too
          const hasTicTacToe = formatted.some((p) =>
            p.link.toLowerCase().includes("tic-tac-toe_ui")
          );
          const finalList = hasTicTacToe
            ? formatted
            : [...formatted, manualProjects[0]];

          setProjects(finalList);
        } catch (fallbackError) {
          console.error("❌ Fallback also failed:", fallbackError);
          // As a last resort, show manual project
          setProjects(manualProjects);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section
      id="projects"
      className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-soft"
    >
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 hover:border-white/20 transition shadow-soft">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 tracking-tight font-[Poppins]">
          🌟 Featured Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {projects.length === 0 ? (
            <p className="text-center text-gray-400 font-[Inter]">
              Loading projects...
            </p>
          ) : (
            projects.map((project, index) => (
              <motion.div
                key={project.id || index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <Tilt
                  tiltMaxAngleX={10}
                  tiltMaxAngleY={10}
                  scale={1.05}
                  transitionSpeed={400}
                >
                  <div className="bg-neutral-800/70 backdrop-blur-lg rounded-2xl shadow-lg border border-neutral-700 p-6 hover:shadow-purple-700/40 hover:border-purple-400 transition-all duration-300">
                    <h3 className="text-2xl font-semibold mb-3 font-[Sora] tracking-wide text-white">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 mb-6 leading-relaxed font-[Inter]">
                      {project.description}
                    </p>

                    {/* ✅ REPLACED BUTTON SECTION */}
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

                      {(!project.demo || project.link.toLowerCase().includes("tic-tac-toe_ui")) ? (
                        // Tic Tac Toe (no live demo): grey transparent button
                        <button
                          disabled
                          className="group inline-flex items-center gap-2 px-5 py-2 rounded-xl font-medium text-gray-300/80 bg-transparent border border-white/20 hover:border-white/30 hover:bg-white/5 transition-all duration-300 cursor-not-allowed"
                          title="No live demo available"
                        >
                          <Play size={18} /> Live Demo
                        </button>
                      ) : (
                        // Other projects: normal green demo button
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-2 px-5 py-2 rounded-xl font-medium text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-emerald-600 hover:to-green-500 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-green-500/40"
                        >
                          <Play size={18} /> Live Demo
                        </a>
                      )}
                    </div>
                    {/* END OF REPLACED BUTTON SECTION */}
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
