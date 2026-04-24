import {
  createAdminSessionToken,
  buildSessionCookie,
} from "@/lib/auth/adminSession";

const MOCK_EMAIL = "admin@sahulat-qurbani.com";
const MOCK_PASSWORD = "admin123";

export default function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body || "{}");
    } catch {
      body = {};
    }
  }

  const email = (body.email || "").trim().toLowerCase();
  const password = body.password || "";

  if (email !== MOCK_EMAIL.toLowerCase() || password !== MOCK_PASSWORD) {
    return res.status(401).json({ ok: false, error: "Invalid email or password" });
  }

  const token = createAdminSessionToken({ email: MOCK_EMAIL, name: "Admin" });
  const maxAge = 7 * 24 * 60 * 60;
  res.setHeader("Set-Cookie", buildSessionCookie(token, maxAge));

  return res.status(200).json({
    ok: true,
    user: { email: MOCK_EMAIL, name: "Admin" },
  });
}
