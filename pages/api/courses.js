import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/authOptions";
import { listCourses } from "../../lib/googleClassroom";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session || !session.user || !session.user.accessToken) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const courses = await listCourses(session.user.accessToken);
    return res.status(200).json({ courses });
  } catch (error) {
    console.error("Error fetching courses", error);
    return res.status(500).json({ error: "Failed to fetch courses" });
  }
}

