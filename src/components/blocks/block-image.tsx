import Image from "next/image";

import type { Media } from "@/content/types";

import { cn } from "@/lib/cn";
import { imageProps } from "@/lib/media";

type Props = {
  media: Media | number | string | null | undefined;
  size?: "thumbnail" | "card" | "medium" | "large" | "hero" | "og";
  /** `sizes` attribute; defaults suit a full-width column. */
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** Tailwind aspect class, e.g. "aspect-[4/3]". Image fills it with object-cover. */
  aspect?: string;
  rounded?: boolean;
};

/**
 * CMS image → next/image with responsive sizes, blur placeholder and a fixed
 * aspect box so nothing shifts while it loads. Renders nothing for missing media.
 */
export function BlockImage({
  media,
  size = "large",
  sizes = "(min-width: 1280px) 1200px, 100vw",
  priority = false,
  className,
  aspect = "aspect-[3/2]",
  rounded = true,
}: Props) {
  const img = imageProps(media, size);
  if (!img) return null;
  const svg = img.src.endsWith(".svg");
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-paper-2",
        aspect,
        rounded && "rounded-lg",
        className,
      )}
    >
      <Image
        src={img.src}
        alt={img.alt}
        fill
        sizes={sizes}
        priority={priority}
        fetchPriority={priority ? "high" : undefined}
        placeholder={img.blurDataURL ? "blur" : "empty"}
        blurDataURL={img.blurDataURL}
        unoptimized={svg}
        className="object-cover"
      />
    </div>
  );
}
