import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 px-6">
      <div className="max-w-3xl rounded-3xl border border-zinc-800 bg-zinc-900/60 p-10 shadow-2xl shadow-black/40 backdrop-blur">
        <h1 className="bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-center text-4xl font-semibold tracking-tight text-transparent sm:text-5xl">
          AI Study Assistant
        </h1>
        <p className="mt-4 text-center text-zinc-300">
          Connect your Google Classroom and use AI to summarize notes, answer
          questions, and generate quizzes.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-full bg-sky-500 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-sky-500/30 transition hover:bg-sky-400"
          >
            Open Dashboard
          </Link>
          <p className="text-xs text-zinc-500">
            You&apos;ll be asked to sign in with Google.
          </p>
        </div>
      </div>
    </main>
  );
}

