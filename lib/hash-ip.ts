import { createHash } from "crypto";

export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip")?.trim() || "0.0.0.0";
}

export function hashIp(ip: string): string {
  const salt = process.env.IP_HASH_SALT || "cerity-people-ip-hash";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}
