import crypto from "node:crypto";
import { cookies } from "next/headers";

// ---------------------------------------------------------------------------
// Minimal single-user admin auth.
//
// There's exactly one admin (Hale). She logs in with a single password stored
// in the ADMIN_PASSWORD env var. On success we set an httpOnly cookie holding
// an HMAC of a fixed payload, keyed by the password itself — so no separate
// secret is needed, and changing the password invalidates old sessions.
//
// All of this runs in the Node.js runtime (server components / server actions),
// never in the edge proxy, so node:crypto is available.
// ---------------------------------------------------------------------------

const COOKIE_NAME = "sh_admin";
const PAYLOAD = "sh-admin-v1";
const MAX_AGE = 60 * 60 * 24 * 14; // 14 days

function getPassword(): string | null {
  const pw = process.env.ADMIN_PASSWORD;
  return pw && pw.length > 0 ? pw : null;
}

/** True if an ADMIN_PASSWORD is configured at all. */
export function isAdminConfigured(): boolean {
  return getPassword() !== null;
}

function sessionToken(password: string): string {
  return crypto.createHmac("sha256", password).update(PAYLOAD).digest("hex");
}

/** Constant-time string comparison that tolerates length mismatches. */
function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a, "utf8");
  const bb = Buffer.from(b, "utf8");
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

/** Verify a submitted login password against ADMIN_PASSWORD. */
export function checkPassword(input: string): boolean {
  const pw = getPassword();
  if (!pw) return false;
  return safeEqual(input, pw);
}

/** Whether the current request carries a valid admin session cookie. */
export async function isAuthenticated(): Promise<boolean> {
  const pw = getPassword();
  if (!pw) return false;
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token) return false;
  return safeEqual(token, sessionToken(pw));
}

/** Set the admin session cookie. Call only after a verified login. */
export async function startSession(): Promise<void> {
  const pw = getPassword();
  if (!pw) return;
  (await cookies()).set(COOKIE_NAME, sessionToken(pw), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

/** Clear the admin session cookie. */
export async function endSession(): Promise<void> {
  (await cookies()).delete(COOKIE_NAME);
}
