import type { Metadata } from "next";

import { shareCard, shareCardAlt, shareImagePath } from "@/lib/share-card";
import { getSiteUrl, SITE_NAME } from "@/lib/site";
import { stripHighlights } from "@/lib/text";

type MetaInput = {
  title?: string | null;
  description?: string | null;
  path: string;
  /** Page whose link-preview card to use, when it differs from `path` (e.g. paginated listings). */
  cardPath?: string;
  type?: "website" | "article";
  publishedTime?: string | null;
  noIndex?: boolean;
  /** Use the title as-is instead of the "%s | Upsure Media" template. */
  absolute?: boolean;
};

/**
 * Builds Next metadata with sensible fallbacks. Link previews (WhatsApp,
 * LinkedIn, X…) use the generated 1200×630 PNG card for the page, and share
 * titles always carry the brand name.
 */
export function buildMetadata(
  meta: MetaInput,
  defaults?: { description?: string | null },
): Metadata {
  const title = stripHighlights(meta.title) || SITE_NAME;
  const description = meta.description ?? defaults?.description ?? undefined;
  const url = `${getSiteUrl()}${meta.path === "/" ? "" : meta.path}`;

  // Titles written in full (they already name the brand) skip the template.
  const absolute = meta.absolute || title.includes(SITE_NAME);
  const shareTitle = absolute ? title : `${title} | ${SITE_NAME}`;

  const cardPath = meta.cardPath ?? meta.path;
  const card = shareCard(cardPath) ?? shareCard("/");
  const image = {
    url: shareImagePath(shareCard(cardPath) ? cardPath : "/"),
    width: 1200,
    height: 630,
    type: "image/png",
    alt: card ? shareCardAlt(card) : SITE_NAME,
  };

  return {
    title: absolute ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    robots: meta.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: shareTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_IN",
      type: meta.type ?? "website",
      ...(meta.publishedTime ? { publishedTime: meta.publishedTime } : {}),
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: [image],
    },
  };
}
