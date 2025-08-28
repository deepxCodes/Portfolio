// api/featured.js
const featuredProjects = [
  {
    id: 1,
    name: "Tic Tac Toe",
    description: "A simple React-based Tic Tac Toe game",
    url: "https://github.com/deepxCodes/tic-tac-toe",
    language: "JavaScript",
  },
  {
    id: 2,
    name: "Portfolio",
    description: "My personal portfolio built with React + Tailwind",
    url: "https://github.com/deepxCodes/portfolio",
    language: "JavaScript",
  }
];

export default function handler(req, res) {
  res.status(200).json(featuredProjects);
}
