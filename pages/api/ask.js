import { askGemini } from "../../lib/gemini";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { question } = req.body || {};

  if (!question || typeof question !== "string") {
    return res.status(400).json({ error: "question is required" });
  }

  try {
    const answer = await askGemini(question);
    return res.status(200).json({ answer });
  } catch (error) {
    console.error("Error asking Gemini", error);
    return res.status(500).json({ error: "Failed to get AI answer" });
  }
}

