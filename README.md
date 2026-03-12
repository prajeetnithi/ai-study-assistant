## AI Study Assistant

AI Study Assistant is a full‑stack Next.js app that connects to Google Classroom and uses Google Gemini to help students summarize materials, ask questions, and generate quizzes.

### Tech Stack

- **Framework**: Next.js (App Router, `app/`)
- **UI**: React + Tailwind CSS (dark, responsive dashboard)
- **Auth**: Google OAuth 2.0 via NextAuth
- **APIs**: Google Classroom API, Google Gemini API


---

### Project Structure

- `app/layout.js` – root layout, global dark theme
- `app/page.js` – landing page with link to dashboard
- `app/dashboard/page.js` – main dashboard UI
- `components/CourseList.js` – sidebar listing Classroom courses, materials, assignments
- `components/ChatBot.js` – AI chat interface
- `components/NotesSummarizer.js` – notes summarizer UI
- `components/QuizGenerator.js` – quiz generator UI
- `lib/gemini.js` – Gemini helper functions (chat, summarize, quiz)
- `lib/googleClassroom.js` – helpers for Classroom (`listCourses`, `listAssignments`, `listCourseMaterials`)
- `lib/authOptions.js` – shared NextAuth configuration
- `app/api/auth/[...nextauth]/route.js` – Google OAuth (NextAuth)
- `pages/api/auth.js` – (optional) simple info route, can be extended
- `pages/api/courses.js` – lists Google Classroom courses
- `pages/api/courses/materials.js` – lists course materials
- `pages/api/courses/assignments.js` – lists assignments
- `pages/api/ask.js` – AI chat endpoint (Gemini)
- `pages/api/summarize.js` – notes summarizer endpoint (Gemini)
- `pages/api/quiz.js` – quiz generator endpoint (Gemini)

---

### Environment Variables

Create a `.env.local` file in the project root:

```bash
GEMINI_API_KEY=your_gemini_api_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_random_long_secret
NEXTAUTH_URL=http://localhost:3000
```


---

### Google API Setup

1. **Create a Google Cloud project**
   - Go to `https://console.cloud.google.com/`
   - Create a new project or select an existing one.

2. **Enable APIs**
   - From “APIs & Services → Library”, enable:
     - **Google Classroom API**
     - **Google People API** (for profile info, optional)

3. **Configure OAuth consent screen**
   - In “APIs & Services → OAuth consent screen”:
     - Choose “External”
     - Fill in app details
     - Add scopes:
       - `https://www.googleapis.com/auth/classroom.courses.readonly`
       - `https://www.googleapis.com/auth/classroom.coursework.me.readonly`
       - `https://www.googleapis.com/auth/classroom.courseworkmaterials.readonly`
       - `https://www.googleapis.com/auth/classroom.announcements.readonly`

4. **Create OAuth client ID**
   - Go to “APIs & Services → Credentials → Create credentials → OAuth client ID”
   - Application type: **Web application**
   - Authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google` (local)
     - `https://your-vercel-domain.vercel.app/api/auth/callback/google` (production)
   - Copy **Client ID** and **Client Secret** into `.env.local` as `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`.

---

### Installation & Local Development

1. Install dependencies:

```bash
cd ai-study-assistant
npm install
```

2. Create `.env.local` with the variables above.

3. Run the dev server:

```bash
npm run dev
```

4. Open `http://localhost:3000` in your browser.

   - Click **“Open Dashboard”** to go to `/dashboard`.
   - You’ll be redirected to **sign in with Google**.
   - After login, your **Classroom courses, materials, and assignments** load into the sidebar, and you can use:
     - **AI Chat** (`/api/ask` + Gemini)
     - **Notes Summarizer** (`/api/summarize` + Gemini)
     - **Quiz Generator** (`/api/quiz` + Gemini)

---



