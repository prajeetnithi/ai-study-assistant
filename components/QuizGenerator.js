"use client";

import { useState } from "react";

export default function QuizGenerator() {
  const [topic, setTopic] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    if (!topic.trim()) return;
    setLoading(true);
    setQuestions([]);
    try {
      const res = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });
      if (!res.ok) {
        throw new Error("Failed to generate quiz");
      }
      const data = await res.json();
      setQuestions(data.questions || []);
    } catch {
      setQuestions([
        {
          question:
            "There was an error calling the AI quiz generator. Check your GEMINI_API_KEY configuration.",
          options: [],
          answer: "",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-full flex-col gap-4 text-sm">
      <input
        type="text"
        className="w-full rounded-full border border-zinc-800 bg-zinc-950/70 px-4 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 shadow-inner focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500/60"
        placeholder="Enter a topic or paste material (e.g. Neural networks basics)"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <button
        type="button"
        onClick={handleGenerate}
        disabled={loading}
        className="self-start rounded-full bg-violet-500 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-violet-500/40 hover:bg-violet-400 disabled:opacity-60"
      >
        {loading ? "Generating quiz..." : "Generate 5 questions"}
      </button>

      <div className="mt-2 flex-1 space-y-3 overflow-y-auto rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-950/70 via-zinc-900/70 to-zinc-950/80 p-4">
        {questions.length === 0 && (
          <p className="text-sm text-zinc-400">
            Your quiz questions will appear here.
          </p>
        )}
        {questions.map((q, idx) => (
          <div
            key={idx}
            className="rounded-2xl bg-zinc-900/85 p-3 text-sm text-zinc-100 shadow-sm border border-zinc-800/80"
          >
            <p className="font-medium">
              Q{idx + 1}. {q.question}
            </p>
            {q.options?.length > 0 && (
              <ul className="mt-1 list-disc space-y-0.5 pl-4 text-zinc-300/90">
                {q.options.map((opt, j) => (
                  <li key={j}>{opt}</li>
                ))}
              </ul>
            )}
            {q.answer && (
              <p className="mt-1 text-xs text-emerald-400">
                Answer: {q.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

