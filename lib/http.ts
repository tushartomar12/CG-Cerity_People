import { clientIp, hashIp } from "./hash-ip";
import { rateLimit } from "./rate-limit";

export function jsonOk(extra: Record<string, unknown> = {}) {
  return Response.json({ ok: true, ...extra });
}

export function jsonError(status: number, body: Record<string, unknown>) {
  return Response.json({ ok: false, ...body }, { status });
}

export function enforceRateLimit(request: Request, route: string) {
  const ip = hashIp(clientIp(request));
  const limited = rateLimit(`${route}:${ip}`);
  if (!limited.ok) {
    return {
      blocked: jsonError(429, { error: "rate_limited", retryAfterSec: limited.retryAfterSec }),
      ipHash: ip,
    };
  }
  return { blocked: null, ipHash: ip };
}

export function tooLarge(request: Request, maxBytes: number): boolean {
  const len = Number(request.headers.get("content-length") || 0);
  return len > maxBytes;
}
