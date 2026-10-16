import "server-only";
import { createHash } from "node:crypto";
import { env } from "./env";

export function clientIp(req: Request) {
  const fwd = req.headers.get("x-forwarded-for");
  return (fwd?.split(",")[0] ?? req.headers.get("x-real-ip") ?? "0.0.0.0").trim();
}

/** Salted hash so we can rate-limit without storing raw IPs. */
export const ipHash = (req: Request) =>
  createHash("sha256").update(`${env.ipSalt}:${clientIp(req)}`).digest("hex").slice(0, 40);
