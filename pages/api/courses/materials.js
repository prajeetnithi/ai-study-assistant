import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/authOptions";
import { listCourseMaterials } from "../../../lib/googleClassroom";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { courseId } = req.query;

  if (!courseId) {
    return res.status(400).json({ error: "courseId is required" });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session || !session.user || !session.user.accessToken) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const materials = await listCourseMaterials(
      courseId,
      session.user.accessToken,
    );
    return res.status(200).json({ materials });
  } catch (error) {
    console.error("Error fetching course materials", error);
    return res.status(500).json({ error: "Failed to fetch materials" });
  }
}

