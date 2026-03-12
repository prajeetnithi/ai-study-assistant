"use client";

import { useState } from "react";

export default function ChatBot() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I’m your AI study assistant. Ask me anything about your course topics.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  function cleanAssistantText(text) {
    return text
      .split("\n")
      .map((line) => line.replace(/^\s*[*-]\s+/, "").trimEnd())
      .join("\n")
      .trim();
  }

  async function handleSend(e) {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userMessage.content }),
      });

      if (!res.ok) {
        throw new Error("Failed to get AI response");
      }
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: cleanAssistantText(data.answer || "No answer."),
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I ran into a problem calling the AI service. Check your GEMINI_API_KEY config.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-96 flex-col rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-950/60 to-zinc-900/60 shadow-lg">
      <div className="flex-1 space-y-3 overflow-y-auto p-4 text-sm">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2.5 leading-relaxed ${
                m.role === "user"
                  ? "bg-sky-500 text-white shadow-sm"
                  : "bg-zinc-800/90 text-zinc-100 border border-zinc-700/70"
              }`}
            >
              {m.content}
            </div> 
          </div>
        ))}
        {loading && (
          <div className="text-[11px] italic text-zinc-500">Thinking...</div>
        )}
      </div>
      <form
        onSubmit={handleSend}
        className="flex items-center gap-2 border-t border-zinc-800 bg-zinc-950/80 p-3"
      >
        <input
          type="text"
          className="flex-1 rounded-full border border-zinc-800 bg-zinc-900/90 px-3.5 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500/60"
          placeholder="Ask a question about your course..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-sky-500 px-4 py-2 text-xs font-semibold text-white shadow hover:bg-sky-400 disabled:opacity-60"
        >
          Send
        </button>
      </form>
    </div>
  );
}

