import { google } from "googleapis";

function createAuthorizedClient(accessToken) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Google OAuth environment variables are not set");
  }

  if (!accessToken) {
    throw new Error("Missing access token for Google Classroom");
  }

  const auth = new google.auth.OAuth2(clientId, clientSecret);
  auth.setCredentials({ access_token: accessToken });
  return auth;
}

export async function listCourses(accessToken) {
  const auth = createAuthorizedClient(accessToken);
  const classroom = google.classroom({ version: "v1", auth });
  const res = await classroom.courses.list({
    courseStates: ["ACTIVE"],
    pageSize: 50,
  });
  return res.data.courses || [];
}

export async function listAssignments(courseId, accessToken) {
  const auth = createAuthorizedClient(accessToken);
  const classroom = google.classroom({ version: "v1", auth });
  const res = await classroom.courses.courseWork.list({
    courseId,
    pageSize: 50,
  });
  return res.data.courseWork || [];
}

export async function listCourseMaterials(courseId, accessToken) {
  const auth = createAuthorizedClient(accessToken);
  const classroom = google.classroom({ version: "v1", auth });
  const res = await classroom.courses.courseWorkMaterials.list({
    courseId,
    pageSize: 50,
  });
  return res.data.courseWorkMaterial || [];
}

