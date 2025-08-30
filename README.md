# 🌌 Advanced Animated Portfolio (React + Tailwind + Node)

A sleek and **next-level developer portfolio** with stunning animations, smooth scrolling, responsive design, and a smart backend that can auto-ingest your GitHub README into structured sections.  

⚡ Built with performance and mobile experience in mind!  

---

## ✨ Features

- **React + Vite + Tailwind CSS** → Modern, blazing-fast frontend setup  
- **Framer Motion** → Micro-interactions & fluid page transitions  
- **Lenis Smooth Scroll** → Optimized, buttery-smooth scrolling across devices  
- **Particles + Gradient Backgrounds** → Lightweight animated layers for extra flair  
- **3D Tilt (Optional)** → Parallax hover effect for cards with graceful fallback on mobile  
- **Lucide Icons** → Clean iconography for UI consistency  
- **Responsive & Mobile Optimized** → Refined profile photo animation + hover optimized for mobile  
- **Social Buttons in Contact Section** → Cleaner Hero design with socials moved to Contact  
- **Node/Express Backend** → Fetches your GitHub README, converts it into structured JSON sections (About, Experience, Highlights)  
- **Fallback System** → If the backend or GitHub API is unavailable, the client falls back to `src/config/profile.json`  

---

## 🚀 Quick Start

### 1) Set your GitHub username
Create a `.env` inside `server` (based on `.env.example`):

```bash
GITHUB_USERNAME=your-username-here
# Optional for higher API limits
GITHUB_TOKEN=ghp_xxx
PORT=5050
```
### 2) Install dependencies
From the repository root:

```bash
Copy code
cd server && npm install && cd ../client && npm install
```
### 3) Run in development
In two terminals:

```bash
Copy code
# Terminal 1 → Run server
cd server
npm run dev

# Terminal 2 → Run client
cd client
npm run dev
Open the URL it prints (usually http://localhost:5173).
The client will proxy API requests to the server during development.
```
### 4) Build for production
```bash
Copy code
# Build client
cd client
npm run build
# Serve dist/ with any static server or integrate into Node server.
```
## 📝 Notes
‣ Social buttons have been moved from Hero to Contact Section for a cleaner layout.

‣ Profile image hover & animations are optimized for mobile performance.

‣ 3D Tilt (TiltCard.jsx) is now optional — you can remove it safely if you prefer a simpler design.

‣ Backend auto-fetches your GitHub README to auto-populate About, Experience, Highlights sections.

‣ Gracefully falls back to local JSON config if GitHub API is rate-limited or server is offline.

🔥 This portfolio is not just a showcase — it’s a performance-optimized playground for modern frontend tools.

vbnet
Copy code

Would you like me to also **append a "📸 Demo / Screenshots" section** at the end so your LinkedIn post
