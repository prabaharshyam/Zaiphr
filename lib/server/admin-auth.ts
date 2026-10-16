import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { env } from "./env";

const COOKIE = "zl_admin";
const MAX_AGE = 60 * 60 * 24 * 7;

/** Session token derived from the password: changing ADMIN_PASSWORD signs everyone out. */
const token = () => createHmac("sha256", env.adminPassword).update("zaiphr-admin-v1").digest("hex");

const safeEqual = (a: string, b: string) => {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
};

export const adminEnabled = () => env.adminPassword.length >= 8;

export async function isAdmin() {
  if (!adminEnabled()) return false;
  const value = (await cookies()).get(COOKIE)?.value;
  return !!value && safeEqual(value, token());
}

export function checkPassword(input: string) {
  if (!adminEnabled()) return false;
  // Compare hashes so length differences don't leak timing.
  const h = (s: string) => createHmac("sha256", "zl-cmp").update(s).digest("hex");
  return safeEqual(h(input), h(env.adminPassword));
}

export async function startSession() {
  (await cookies()).set(COOKIE, token(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function endSession() {
  (await cookies()).delete(COOKIE);
}
