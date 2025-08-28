// api/github.js
export default async function handler(req, res) {
  try {
    const response = await fetch("https://api.github.com/users/deepxCodes/repos");
    if (!response.ok) {
      throw new Error("GitHub API error");
    }

    const repos = await response.json();

    // Filter & clean data
    const filtered = repos.map(repo => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      stars: repo.stargazers_count,
      language: repo.language,
    }));

    res.status(200).json(filtered);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
