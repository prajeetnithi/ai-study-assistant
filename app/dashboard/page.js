import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/authOptions";
import CourseList from "../../components/CourseList";
import ChatBot from "../../components/ChatBot";
import NotesSummarizer from "../../components/NotesSummarizer";
import QuizGenerator from "../../components/QuizGenerator";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6">
        <div className="max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/70 p-8 text-center shadow-xl">
          <h1 className="text-2xl font-semibold text-zinc-50">
            Sign in to continue
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Connect your Google account to load your Classroom courses and use
            the AI assistant.
          </p>
          <a
            href="/api/auth/signin"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-sky-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-sky-500/30 transition hover:bg-sky-400"
          >
            Sign in with Google
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen bg-zinc-950 text-zinc-100">
      <aside className="hidden w-80 border-r border-zinc-800 bg-zinc-900/70 p-5 sm:flex sm:flex-col">
        <div className="mb-4">
          <h2 className="text-xl font-semibold tracking-tight">Courses</h2>
          <p className="mt-1 text-sm text-zinc-400">
            Loaded from your Google Classroom.
          </p>
        </div>
        <CourseList />
      </aside>

      <section className="flex-1 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 p-4 sm:p-6 lg:p-8">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              AI Study Assistant
            </h1>
            <p className="text-sm text-zinc-400">
              Signed in as {session.user?.email}
            </p>
          </div>
          <a
            href="/api/auth/signout"
            className="inline-flex items-center justify-center rounded-full border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-200 hover:bg-zinc-800"
          >
            Sign out
          </a>
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)]">
          <div className="space-y-5">
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5 shadow-xl shadow-black/30">
              <h2 className="mb-2 text-base font-semibold text-zinc-100">
                AI Chat
              </h2>
              <p className="mb-3 text-sm text-zinc-400">
                Ask questions about your course topics. The AI will respond with
                clear explanations.
              </p>
              <ChatBot />
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5 shadow-xl shadow-black/30">
              <h2 className="mb-2 text-base font-semibold text-zinc-100">
                Notes Summarizer
              </h2>
              <p className="mb-3 text-sm text-zinc-400">
                Select course materials and generate key points and summaries.
              </p>
              <NotesSummarizer />
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5 shadow-xl shadow-black/30">
            <h2 className="mb-2 text-base font-semibold text-zinc-100">
              Quiz Generator
            </h2>
            <p className="mb-3 text-sm text-zinc-400">
              Generate short quizzes from your course materials or a topic.
            </p>
            <QuizGenerator />
          </div>
        </div>
      </section>
    </main>
  );
}

