import { headers } from "next/headers";

/**
 * Spam protection shared by every form action: client IP, rate limiting and
 * Cloudflare Turnstile. All of it is optional in development; see .env.example.
 */

/**
 * The visitor's IP. Set TRUSTED_IP_HEADER to the header your host or proxy
 * overwrites (cf-connecting-ip on Cloudflare, x-real-ip on Vercel or nginx).
 * Otherwise the right-most X-Forwarded-For entry is used: behind a proxy it is
 * the one the proxy appended, so a client cannot choose it. With no proxy, Next
 * fills the header from the socket address only when the client sent none.
 */
export async function clientIp(): Promise<string> {
  const h = await headers();
  const trusted = process.env.TRUSTED_IP_HEADER?.trim().toLowerCase();
  if (trusted) {
    const value = h.get(trusted)?.split(",")[0]?.trim();
    if (value) return value;
  }
  const forwarded = h
    .get("x-forwarded-for")
    ?.split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return forwarded?.at(-1) ?? "unknown";
}

/* Rate limiting ---------------------------------------------------------------- */

const WINDOW_SECONDS = 10 * 60;
const memory = new Map<string, { count: number; resetAt: number }>();

function memoryHit(key: string): number {
  const now = Date.now();
  if (memory.size > 1_000) {
    for (const [k, v] of memory) if (v.resetAt <= now) memory.delete(k);
  }
  const entry = memory.get(key);
  if (!entry || entry.resetAt <= now) {
    memory.set(key, { count: 1, resetAt: now + WINDOW_SECONDS * 1000 });
    return 1;
  }
  entry.count += 1;
  return entry.count;
}

/**
 * Fixed-window counter shared across instances through Upstash Redis's REST
 * API when UPSTASH_REDIS_REST_URL / _TOKEN are set. Returns null on any error
 * so the caller falls back to the per-process counter.
 */
async function redisHit(key: string): Promise<number | null> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  try {
    const res = await fetch(`${url.replace(/\/+$/, "")}/pipeline`, {
      method: "POST",
      headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
      body: JSON.stringify([
        ["INCR", key],
        ["EXPIRE", key, WINDOW_SECONDS, "NX"],
      ]),
      cache: "no-store",
      signal: AbortSignal.timeout(2_000),
    });
    if (!res.ok) return null;
    const [incr] = (await res.json()) as { result?: number }[];
    return typeof incr?.result === "number" ? incr.result : null;
  } catch {
    return null;
  }
}

/** True when `ip` has made more than `limit` submissions to `scope` in 10 minutes. */
export async function rateLimited(scope: string, ip: string, limit: number): Promise<boolean> {
  const key = `rl:${scope}:${ip}`;
  const count = (await redisHit(key)) ?? memoryHit(key);
  return count > limit;
}

/* Turnstile ---------------------------------------------------------------------- */

export async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // not configured (dev): honeypot + rate limit only
  if (!token) return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ secret, response: token, remoteip: ip }),
      cache: "no-store",
    });
    const json = (await res.json()) as { success?: boolean };
    return Boolean(json.success);
  } catch {
    return false;
  }
}

/**
 * Runs the rate limit and Turnstile check for one submission. Returns an error
 * message to show, or null when the submission may go through.
 */
export async function checkSpam(
  formData: FormData,
  scope: string,
  limit: number,
): Promise<string | null> {
  const ip = await clientIp();
  if (await rateLimited(scope, ip, limit)) {
    return "Too many submissions. Please try again later.";
  }
  if (!(await verifyTurnstile(String(formData.get("cf-turnstile-response") ?? ""), ip))) {
    return "Spam check failed. Please try again.";
  }
  return null;
}
