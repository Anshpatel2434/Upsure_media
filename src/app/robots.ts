import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/site";

/** Search and AI crawlers are welcome (copy update, section 9.3). */
const CRAWLERS = [
  "Googlebot",
  "Bingbot",
  "GPTBot",
  "OAI-SearchBot",
  "Google-Extended",
  "PerplexityBot",
  "ClaudeBot",
];

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();
  return {
    rules: [
      ...CRAWLERS.map((userAgent) => ({ userAgent, allow: "/", disallow: ["/dev/"] })),
      { userAgent: "*", allow: "/", disallow: ["/dev/"] },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
