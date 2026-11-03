import { fileURLToPath } from "node:url";

import type { NextConfig } from "next";

import { SHOW_CASE_STUDIES } from "./src/content/flags";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Pin the workspace root so a lockfile in a parent folder is never picked up.
  turbopack: { root: fileURLToPath(new URL(".", import.meta.url)) },
  experimental: {
    // Tailwind CSS is ~10 KB; inlining removes a render-blocking round trip on slow networks.
    inlineCss: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 414, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [48, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  // Old service URLs (copy update, section 1). With case studies switched off
  // the /work/… ones point at the matching service page, so an old link lands
  // on a real page rather than on a redirect to one that is not built.
  async redirects() {
    const workOrService = (slug: string) =>
      SHOW_CASE_STUDIES ? `/work/service/${slug}` : `/services/${slug}`;
    const permanent = [
      ["/services/consulting", "/services/brand-consulting"],
      ["/services/design", "/services/branding"],
      ["/services/growth", "/services/performance-marketing"],
      ["/services/ai-automation", "/services/ai-solutions"],
      ["/work/service/consulting", workOrService("brand-consulting")],
      ["/work/service/design", workOrService("branding")],
      ["/work/service/growth", workOrService("performance-marketing")],
      ["/work/service/ai-automation", workOrService("ai-solutions")],
    ].map(([source, destination]) => ({
      source: source!,
      destination: destination!,
      permanent: true,
    }));

    // Testimonials, and the whole work section, are off until real client
    // quotes and figures exist. Temporary, so browsers do not cache these if
    // the pages come back.
    const temporary = (
      SHOW_CASE_STUDIES
        ? [["/testimonials", "/work"]]
        : [
            ["/testimonials", "/services"],
            ["/work", "/services"],
            ["/work/:path*", "/services"],
          ]
    ).map(([source, destination]) => ({
      source: source!,
      destination: destination!,
      permanent: false,
    }));

    return [...permanent, ...temporary];
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
