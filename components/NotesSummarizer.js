"use client";

import { useState } from "react";

export default function NotesSummarizer() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSummarize(e) {
    e.preventDefault();
    if (!text.trim()) return;
    setLoading(true);
    setSummary(null);

    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) {
        throw new Error("Failed to summarize");
      }
      const data = await res.json();
      setSummary(data);
    } catch {
      setSummary({
        keyPoints: [],
        shortSummary:
          "There was an error calling the AI summarizer. Check your GEMINI_API_KEY configuration.",
        concepts: [],
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4 text-sm">
      <textarea
        className="h-32 w-full resize-none rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-950/70 via-zinc-900/70 to-zinc-950/80 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 shadow-inner focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/60"
        placeholder="Paste classroom material or notes here to generate key points and summaries..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        type="button"
        onClick={handleSummarize}
        disabled={loading}
        className="inline-flex items-center rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-emerald-500/30 hover:bg-emerald-400 disabled:opacity-60"
      >
        {loading ? "Summarizing..." : "Summarize notes"}
      </button>

      {summary && (
        <div className="mt-3 grid gap-4 rounded-3xl border border-zinc-800 bg-zinc-950/60 p-4 md:grid-cols-3">
          <div>
            <h3 className="mb-1 text-sm font-semibold text-emerald-300">
              Key points
            </h3>
            <ul className="space-y-1.5 text-sm text-zinc-200">
              {summary.keyPoints?.length
                ? summary.keyPoints.map((p, idx) => <li key={idx}>• {p}</li>)
                : "No key points extracted."}
            </ul>
          </div>
          <div>
            <h3 className="mb-1 text-sm font-semibold text-sky-300">
              Short summary
            </h3>
            <p className="text-sm text-zinc-200">
              {summary.shortSummary || "No summary generated."}
            </p>
          </div>
          <div>
            <h3 className="mb-1 text-sm font-semibold text-violet-300">
              Important concepts
            </h3>
            <ul className="space-y-1.5 text-sm text-zinc-200">
              {summary.concepts?.length
                ? summary.concepts.map((c, idx) => <li key={idx}>• {c}</li>)
                : "No concepts extracted."}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

