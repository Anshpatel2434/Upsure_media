import type { Metadata, Viewport } from "next";
import { Instrument_Sans } from "next/font/google";
import Script from "next/script";

import { revealScript } from "@/components/layout/reveal-script";

import "@/styles/globals.css";

const instrument = Instrument_Sans({
  subsets: ["latin"],
  // "optional": on slow first visits the metric-matched fallback paints immediately
  // (no swap, no layout shift) and the brand font is used once cached. Flip to
  // "swap" if brand font on first paint matters more than LCP.
  display: "optional",
  variable: "--font-instrument",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Upsure Media – D2C & B2B Brand and Growth Agency in Ahmedabad, India",
    template: "%s | Upsure Media",
  },
  description:
    "Full-service agency for D2C and B2B brands: branding, social, influencer, performance, e-commerce, quick commerce, PR, SEO/AEO/GEO and AI.",
  // Fallback link preview for routes without their own (search, 404). Content
  // pages override this with their own card in lib/seo.ts.
  openGraph: {
    siteName: "Upsure Media",
    locale: "en_IN",
    images: [{ url: "/og/index.png", width: 1200, height: 630, type: "image/png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#faf8f3",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${instrument.variable} h-full`} suppressHydrationWarning>
      <body className="flex min-h-full flex-col">
        <Script id="reveal" strategy="beforeInteractive">
          {revealScript}
        </Script>
        {children}
      </body>
    </html>
  );
}
