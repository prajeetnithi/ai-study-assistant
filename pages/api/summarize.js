import { summarizeNotes } from "../../lib/gemini";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { text } = req.body || {};

  if (!text || typeof text !== "string") {
    return res.status(400).json({ error: "text is required" });
  }

  try {
    const summary = await summarizeNotes(text);
    return res.status(200).json(summary);
  } catch (error) {
    console.error("Error summarizing notes", error);
    return res.status(500).json({ error: "Failed to summarize notes" });
  }
}

