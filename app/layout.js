import "./globals.css";

export const metadata = {
  title: "AI Study Assistant",
  description:
    "AI-powered study assistant that integrates Google Classroom and Gemini",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-zinc-950 text-zinc-100 antialiased">
        {children}
      </body>
    </html>
  );
}

