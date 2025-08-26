import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import matter from "gray-matter";
import { marked } from "marked";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5050;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || "";

const gh = axios.create({
  baseURL: "https://api.github.com",
  headers: GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}
});

function extractSectionsFromMarkdown(md) {
  // Extract sections based on headings and bullets
  // Returns { about, experience, highlights, skills, rawHtml }
  const tokens = marked.lexer(md);
  let current = null;
  const sections = { about: "", experience: [], highlights: [], skills: [] };
  const lines = md.split("\n");

  // Quick-n-dirty detection by headings
  const joinBuffer = [];
  let currentSection = "about";

  // Map some common headings to a normalized bucket
  const mapHeading = (text) => {
    const t = text.toLowerCase();
    if (t.includes("about")) return "about";
    if (t.includes("experience") || t.includes("work")) return "experience";
    if (t.includes("projects")) return "highlights";
    if (t.includes("achievements") || t.includes("highlights")) return "highlights";
    if (t.includes("skills") || t.includes("tech stack")) return "skills";
    return "about";
  };

  // Parse with marked tokens for more structure
  let bufferText = "";
  let highlightBuffer = [];
  let experienceBuffer = [];

  tokens.forEach(tok => {
    if (tok.type === "heading") {
      // Flush previous buffer
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
      const items = tok.items?.map(i => i.text) || [];
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

  // Finalize
  if (bufferText.trim()) sections.about += bufferText.trim();

  // Normalize experience: split into entries using empty lines or " - "
  if (experienceBuffer.length) {
    experienceBuffer.forEach(line => {
      const parts = line.split(" - ");
      if (parts.length >= 2) {
        sections.experience.push({ title: parts[0], detail: parts.slice(1).join(" - ") });
      } else {
        sections.experience.push({ title: line, detail: "" });
      }
    });
  }

  // Highlights
  sections.highlights = highlightBuffer.filter(Boolean);

  // Deduplicate skills
  sections.skills = Array.from(new Set(sections.skills.flatMap(s => s.split(/[•,|]/g).map(x => x.trim()).filter(Boolean))));

  return sections;
}

app.get("/api/health", (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

app.get("/api/profile", async (req, res) => {
  // Minimal profile info from GitHub user
  const username = req.query.username || GITHUB_USERNAME;
  if (!username) return res.status(400).json({ error: "No GitHub username configured or provided." });
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
  if (!username) return res.status(400).json({ error: "No GitHub username configured or provided." });
  try {
    // Try the special profile README repo: username/username
    const { data: repo } = await gh.get(`/repos/${username}/${username}/readme`, {
      headers: { Accept: "application/vnd.github.v3.raw" }  // request raw content
    });
    const md = typeof repo === "string" ? repo : (repo.content ? Buffer.from(repo.content, "base64").toString("utf-8") : "");
    const sections = extractSectionsFromMarkdown(md);
    res.json({ ok: true, sections, raw: md });
  } catch (e) {
    res.status(404).json({ ok: false, error: "README not found for profile repo. Create a repo named exactly your username with a README.md" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
