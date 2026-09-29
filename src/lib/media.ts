import type { Media } from "@/payload-types";

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
  const src = variant?.url ?? media.url;
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
  return Boolean(media && typeof media === "object" && media.mimeType?.startsWith("video/"));
}

export function mediaUrl(media: Media | number | string | null | undefined): string | null {
  return media && typeof media === "object" ? (media.url ?? null) : null;
}
