import {
  getSessionTokenFromRequest,
  verifyAdminSessionToken,
} from "@/lib/auth/adminSession";

export default function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const token = getSessionTokenFromRequest(req);
  const session = verifyAdminSessionToken(token);
  if (!session) {
    return res.status(401).json({ ok: false, error: "Unauthorized" });
  }

  return res.status(200).json({
    ok: true,
    user: { email: session.email, name: session.name },
  });
}
