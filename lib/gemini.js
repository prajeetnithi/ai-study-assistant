const GEMINI_MODEL = "gemini-2.5-flash";

async function callGemini(prompt) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set");
  }

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(
      `Gemini API error: ${res.status} ${res.statusText} - ${errorText}`
    );
  }

  const data = await res.json();
  const text =
    data.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || "")
      .join("") ?? "";

  return text.trim();
}

export async function askGemini(question) {
  const prompt = `You are a friendly study assistant for students.\n\nQuestion: ${question}\n\nAnswer in clear, simple sentences and short paragraphs.\nDo NOT use markdown formatting, bullet points (*, -) or numbered lists.`;
  return await callGemini(prompt);
}

export async function summarizeNotes(text) {
  const prompt = `You are a study assistant. Given the notes below, extract:\n- 5 key bullet points\n- A 3-4 sentence short summary\n- 5 most important concepts (as short phrases)\n\nNotes:\n${text}\n\nRespond in strict JSON with the shape:\n{\n  "keyPoints": string[],\n  "shortSummary": string,\n  "concepts": string[]\n}`;

  const raw = await callGemini(prompt);

  try {
    const jsonStart = raw.indexOf("{");
    const jsonEnd = raw.lastIndexOf("}");
    const jsonString =
      jsonStart !== -1 && jsonEnd !== -1
        ? raw.slice(jsonStart, jsonEnd + 1)
        : raw;
    const parsed = JSON.parse(jsonString);
    return {
      keyPoints: parsed.keyPoints || [],
      shortSummary: parsed.shortSummary || "",
      concepts: parsed.concepts || [],
    };
  } catch (e) {
    return {
      keyPoints: [],
      shortSummary: raw,
      concepts: [],
    };
  }
}

export async function generateQuiz(topic) {
  const prompt = `You are a study assistant. Create 5 quiz questions (MCQ or short answer) about this topic or material:\n\n${topic}\n\nRespond in strict JSON with the shape:\n{\n  "questions": [\n    {\n      "question": string,\n      "options": string[],\n      "answer": string\n    }\n  ]\n}`;

  const raw = await callGemini(prompt);

  try {
    const jsonStart = raw.indexOf("{");
    const jsonEnd = raw.lastIndexOf("}");
    const jsonString =
      jsonStart !== -1 && jsonEnd !== -1
        ? raw.slice(jsonStart, jsonEnd + 1)
        : raw;
    const parsed = JSON.parse(jsonString);
    return {
      questions: parsed.questions || [],
    };
  } catch (e) {
    return {
      questions: [],
    };
  }
}

