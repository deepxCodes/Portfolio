// api/contact.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // 👉 You can integrate services like Nodemailer, Resend, or EmailJS here
  // For now, just echo back
  res.status(200).json({ success: true, name, email, message });
}
