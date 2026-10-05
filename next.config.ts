import type { NextConfig } from "next";

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
  // Old service URLs (copy update, section 1).
  async redirects() {
    return [
      ["/services/consulting", "/services/brand-consulting"],
      ["/services/design", "/services/branding"],
      ["/services/growth", "/services/performance-marketing"],
      ["/services/ai-automation", "/services/ai-solutions"],
      ["/work/service/consulting", "/work/service/brand-consulting"],
      ["/work/service/design", "/work/service/branding"],
      ["/work/service/growth", "/work/service/performance-marketing"],
      ["/work/service/ai-automation", "/work/service/ai-solutions"],
    ].map(([source, destination]) => ({
      source: source!,
      destination: destination!,
      statusCode: 301 as const,
    }));
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
