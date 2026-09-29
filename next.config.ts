import { withPayload } from "@payloadcms/next/withPayload";
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
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 414, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [48, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    // Media served by Payload from local disk in development.
    localPatterns: [{ pathname: "/api/media/file/**" }, { pathname: "/**" }],
    remotePatterns: [
      // Media served from an S3-compatible bucket in production (see S3_PUBLIC_URL).
      ...(process.env.S3_PUBLIC_URL
        ? [{ protocol: "https" as const, hostname: new URL(process.env.S3_PUBLIC_URL).hostname }]
        : []),
    ],
  },
  async headers() {
    // The admin panel embeds the site in an iframe for Live Preview, so the
    // frame-options header is only applied to non-preview routes.
    return [{ source: "/((?!preview).*)", headers: securityHeaders }];
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
