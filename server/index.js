import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import matter from "gray-matter";
import { marked } from "marked";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Support __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5050;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || "";

// GitHub API client
const gh = axios.create({
  baseURL: "https://api.github.com",
  headers: GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}
});

// ---------- Helper to parse README ----------
function extractSectionsFromMarkdown(md) {
  const tokens = marked.lexer(md);
  const sections = { about: "", experience: [], highlights: [], skills: [] };

  let bufferText = "";
  let highlightBuffer = [];
  let experienceBuffer = [];
  let currentSection = "about";

  const mapHeading = (text) => {
    const t = text.toLowerCase();
    if (t.includes("about")) return "about";
    if (t.includes("experience") || t.includes("work")) return "experience";
    if (t.includes("projects")) return "highlights";
    if (t.includes("achievements") || t.includes("highlights")) return "highlights";
    if (t.includes("skills") || t.includes("tech stack")) return "skills";
    return "about";
  };

  tokens.forEach((tok) => {
    if (tok.type === "heading") {
      if (currentSection === "about" && bufferText.trim()) {
        sections.about += bufferText + "\n";
      }
      bufferText = "";
      currentSection = mapHeading(tok.text || "");
    } else if (tok.type === "paragraph") {
      if (currentSection === "about") {
        bufferText += (tok.text || "") + "\n\n";
      } else if (currentSection === "experience") {
        experienceBuffer.push(tok.text || "");
      } else if (currentSection === "highlights") {
        highlightBuffer.push(tok.text || "");
      } else if (currentSection === "skills") {
        sections.skills.push(tok.text || "");
      }
    } else if (tok.type === "list") {
      const items = tok.items?.map((i) => i.text) || [];
      if (currentSection === "experience") {
        experienceBuffer.push(...items);
      } else if (currentSection === "highlights") {
        highlightBuffer.push(...items);
      } else if (currentSection === "skills") {
        sections.skills.push(...items);
      } else {
        bufferText += items.join("\n") + "\n";
      }
    }
  });

  if (bufferText.trim()) sections.about += bufferText.trim();

  if (experienceBuffer.length) {
    experienceBuffer.forEach((line) => {
      const parts = line.split(" - ");
      if (parts.length >= 2) {
        sections.experience.push({
          title: parts[0],
          detail: parts.slice(1).join(" - ")
        });
      } else {
        sections.experience.push({ title: line, detail: "" });
      }
    });
  }

  sections.highlights = highlightBuffer.filter(Boolean);
  sections.skills = Array.from(
    new Set(
      sections.skills
        .flatMap((s) =>
          s.split(/[•,|]/g).map((x) => x.trim()).filter(Boolean)
        )
    )
  );

  return sections;
}

// ---------- API Routes ----------
app.get("/api/health", (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

app.get("/api/profile", async (req, res) => {
  const username = req.query.username || GITHUB_USERNAME;
  if (!username)
    return res
      .status(400)
      .json({ error: "No GitHub username configured or provided." });

  try {
    const { data } = await gh.get(`/users/${username}`);
    res.json({
      name: data.name || username,
      username,
      avatar_url: data.avatar_url,
      bio: data.bio,
      html_url: data.html_url,
      blog: data.blog,
      company: data.company,
      location: data.location,
      followers: data.followers,
      following: data.following,
      public_repos: data.public_repos
    });
  } catch (e) {
    res.status(500).json({ error: e?.response?.data || e.message });
  }
});

app.get("/api/readme", async (req, res) => {
  const username = req.query.username || GITHUB_USERNAME;
  if (!username)
    return res
      .status(400)
      .json({ error: "No GitHub username configured or provided." });

  try {
    const { data: repo } = await gh.get(`/repos/${username}/${username}/readme`, {
      headers: { Accept: "application/vnd.github.v3.raw" }
    });
    const md =
      typeof repo === "string"
        ? repo
        : repo.content
        ? Buffer.from(repo.content, "base64").toString("utf-8")
        : "";
    const sections = extractSectionsFromMarkdown(md);
    res.json({ ok: true, sections, raw: md });
  } catch (e) {
    res.status(404).json({
      ok: false,
      error:
        "README not found for profile repo. Create a repo named exactly your username with a README.md"
    });
  }
});

// ---------- NEW: Fetch GitHub Projects ----------
app.get("/api/projects", async (req, res) => {
  try {
    const username = req.query.username || GITHUB_USERNAME;
    if (!username) {
      return res.status(400).json({ error: "No GitHub username configured or provided." });
    }

    const { data: repos } = await gh.get(`/users/${username}/repos`, {
      params: { sort: "updated", per_page: 100 }
    });

    const projects = repos
      .filter(repo => !repo.fork && !repo.archived && repo.name !== username)
      .map(repo => ({
        title: repo.name.replace(/[-_]/g, " "),
        description: repo.description || "A cool project worth checking out!",
        link: repo.html_url,
        demo: repo.homepage || null,
        stars: repo.stargazers_count,
        language: repo.language,
        updated: repo.updated_at,
        topics: repo.topics || []
      }))
      .sort((a, b) => new Date(b.updated) - new Date(a.updated));

    res.set("Cache-Control", "public, max-age=600"); // cache 10 min
    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

// ---------- Serve React Frontend ----------
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/dist", "index.html"));
});

// ---------- Start Server ----------
app.listen(PORT, () => {
  console.log(`✅ Server listening on port ${PORT}`);
});
