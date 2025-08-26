# Advanced Animated Portfolio (React + Tailwind + Node)

A dynamic, next-level portfolio with beautiful animations (Framer Motion), smooth scrolling, 3D tilt, and a Node/Express backend that can parse your GitHub README and surface its sections on the site automatically.

## Features
- **React + Vite + Tailwind CSS** for a fast, modern SPA
- **Framer Motion** micro-interactions & page transitions
- **Lenis** smooth scrolling
- **Particles + Animated Gradient** backgrounds
- **3D Tilt** hover effects on cards
- **Lucide Icons** & social link badges
- **Node/Express Backend** fetches your GitHub README and turns it into structured JSON sections
- Fallback to local config if API rate-limited / server offline

## Quick Start
### 1) Set your GitHub username
Create a `.env` file inside `server` based on `.env.example`:
```
GITHUB_USERNAME=your-username-here
# Optional, improves API rate limits
GITHUB_TOKEN=ghp_xxx   # (or leave empty)
PORT=5050
```

### 2) Install dependencies
From the repository root, run:
```bash
cd server && npm install && cd ../client && npm install
```

### 3) Run in development
In two terminals:
```bash
# Terminal 1 (server)
cd server
npm run dev

# Terminal 2 (client)
cd client
npm run dev
```
Open the client URL it prints (typically http://localhost:5173). The client proxies API to the server during dev.

### 4) Build for production
```bash
# build client
cd client
npm run build
# serve dist with any static server, or integrate with your Node server.
```

### Notes
- If the server is running and `.env` includes your `GITHUB_USERNAME`, the site will auto-ingest your README sections into **About**, **Experience**, and **Highlights** areas where applicable.
- If no README is found, the UI gracefully falls back to `src/config/profile.json` on the client.
- Customize colors, sections, and visuals in `client/src/config/profile.json` and `client/src/components/*`.

**Enjoy your new portfolio!**
