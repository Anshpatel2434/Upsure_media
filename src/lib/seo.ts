import type { Metadata } from "next";

import type { Media } from "@/payload-types";

import { getSiteUrl, SITE_NAME } from "@/lib/site";
import { stripHighlights } from "@/lib/text";
import { isDoc } from "@/lib/relations";

type MetaInput = {
  title?: string | null;
  description?: string | null;
  image?: Media | number | string | null;
  path: string;
  type?: "website" | "article";
  publishedTime?: string | null;
  noIndex?: boolean;
  /** Use the title as-is instead of the "%s – Upsure" template (home page). */
  absolute?: boolean;
};

/** Builds Next metadata from a document's SEO tab with sensible fallbacks. */
export function buildMetadata(
  meta: MetaInput,
  defaults?: { description?: string | null; image?: Media | number | string | null },
): Metadata {
  const title = stripHighlights(meta.title) || SITE_NAME;
  const description = meta.description ?? defaults?.description ?? undefined;
  const imageDoc = meta.image ?? defaults?.image;
  const image =
    imageDoc && isDoc(imageDoc)
      ? (imageDoc.sizes?.og?.url ?? imageDoc.url ?? undefined)
      : undefined;
  const url = `${getSiteUrl()}${meta.path === "/" ? "" : meta.path}`;

  return {
    title: meta.absolute ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    robots: meta.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: meta.type ?? "website",
      ...(meta.publishedTime ? { publishedTime: meta.publishedTime } : {}),
      images: image ? [{ url: image, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}
