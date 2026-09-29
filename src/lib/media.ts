import type { Media } from "@/payload-types";
import { isDoc } from "@/lib/relations";
import { getSiteUrl } from "@/lib/site";

/** Payload returns absolute URLs when serverURL is set; next/image wants same-origin paths. */
export function localiseUrl(url: string): string {
  const origin = getSiteUrl();
  return url.startsWith(origin) ? url.slice(origin.length) || "/" : url;
}

export type ImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL?: string;
};

type SizeName = "thumbnail" | "card" | "medium" | "large" | "hero" | "og";

/**
 * Turns a Media doc (or an unresolved id) into props for next/image.
 * Picks the named size when it exists, otherwise falls back to the original.
 */
export function imageProps(
  media: Media | number | string | null | undefined,
  size: SizeName = "large",
): ImageProps | null {
  if (!media || typeof media !== "object" || !media.url) return null;
  const variant = media.sizes?.[size];
  const src = localiseUrl(variant?.url ?? media.url);
  const width = variant?.width ?? media.width ?? 1600;
  const height = variant?.height ?? media.height ?? 1000;
  return {
    src,
    alt: media.alt ?? "",
    width,
    height,
    blurDataURL: media.blurDataURL ?? undefined,
  };
}

export function isVideo(media: Media | number | string | null | undefined): media is Media {
  return Boolean(media && isDoc(media) && media.mimeType?.startsWith("video/"));
}

export function mediaUrl(media: Media | number | string | null | undefined): string | null {
  return media && isDoc(media) && media.url ? localiseUrl(media.url) : null;
}
