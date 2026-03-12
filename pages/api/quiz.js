import { generateQuiz } from "../../lib/gemini";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { topic } = req.body || {};

  if (!topic || typeof topic !== "string") {
    return res.status(400).json({ error: "topic is required" });
  }

  try {
    const quiz = await generateQuiz(topic);
    return res.status(200).json(quiz);
  } catch (error) {
    console.error("Error generating quiz", error);
    return res.status(500).json({ error: "Failed to generate quiz" });
  }
}

