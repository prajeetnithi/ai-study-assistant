export default function handler(_req, res) {
  // This route is informational; actual authentication is handled by
  // NextAuth at /api/auth/[...nextauth].
  return res.status(200).json({
    message:
      "Google authentication is handled by NextAuth at /api/auth/[...nextauth].",
  });
}

