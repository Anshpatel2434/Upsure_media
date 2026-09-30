import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

import type { CaseStudy, Service } from "@/payload-types";

import { LongArrowIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { imageProps } from "@/lib/media";
import { isDoc } from "@/lib/relations";

/** Accent colours the tile floods to on hover, cycled by position. */
export const WORK_TILE_COLOURS = [
  "var(--color-mint)",
  "var(--color-sun)",
  "var(--color-peach)",
  "var(--color-mint)",
];

/**
 * Work tile. Idle: full-bleed photo, bottom-up black gradient, title, "View
 * work" and service pills in white. Hover: the tile floods with an accent
 * colour, the photo fades to 15 % and slowly zooms (5 s), text turns ink and
 * the summary unfolds beneath the title. The whole tile is one link; service
 * pills stay individually clickable above it.
 */
export function WorkTile({
  study,
  colour = WORK_TILE_COLOURS[0]!,
  priority = false,
  className,
}: {
  study: CaseStudy;
  colour?: string;
  priority?: boolean;
  className?: string;
}) {
  const img = imageProps(study.cover, "large");
  const services = (study.services ?? []).filter((s): s is Service => isDoc(s));

  return (
    <article
      className={cn(
        "group relative isolate min-h-[300px] overflow-hidden rounded-[22px] bg-[#15302f] text-paper md:min-h-[400px] xl:min-h-[450px]",
        "transition-[background-color,color] duration-500 ease-(--ease-smooth) md:hover:bg-(--tile-colour) md:hover:text-ink",
        className,
      )}
      style={{ "--tile-colour": colour } as CSSProperties}
    >
      {img && (
        <Image
          src={img.src}
          alt=""
          fill
          priority={priority}
          sizes="(min-width: 768px) 45vw, 100vw"
          placeholder={img.blurDataURL ? "blur" : "empty"}
          blurDataURL={img.blurDataURL}
          className={cn(
            "z-[1] object-cover",
            "[transition:transform_0.5s_cubic-bezier(0.4,0,0.2,1),opacity_0.5s_cubic-bezier(0.4,0,0.2,1)]",
            "md:group-hover:scale-[1.2] md:group-hover:opacity-[0.15] md:group-hover:[transition:transform_5s_cubic-bezier(0.25,0.7,0.2,1),opacity_0.5s_cubic-bezier(0.4,0,0.2,1)]",
          )}
        />
      )}
      <div
        aria-hidden
        className="absolute inset-0 z-[2] bg-linear-to-t from-black via-black/30 via-60% to-transparent transition-opacity duration-500 ease-(--ease-smooth) md:group-hover:opacity-0"
      />
      <Link
        href={`/work/${study.slug}`}
        aria-label={`View ${study.title} case study`}
        className="absolute inset-0 z-[3] rounded-[22px]"
      />

      <div className="pointer-events-none relative z-[4] flex h-full min-h-[inherit] flex-col justify-end gap-[25px] p-[25px] md:gap-5 md:p-[30px] xl:p-10">
        <div className="flex flex-col items-start gap-2">
          <h3 className="text-[22px] leading-tight font-medium md:text-[26px] xl:text-[28px]">
            {study.title}
          </h3>
          <span className="inline-flex items-center gap-2 text-xs md:text-sm">
            View work
            <LongArrowIcon
              width={34}
              className="transition-transform duration-(--duration-base) group-hover:translate-x-2"
            />
          </span>
          <div
            className={cn(
              "hidden w-full grid-rows-[0fr] opacity-0 lg:grid",
              "[transition:grid-template-rows_0.5s_cubic-bezier(0.4,0,0.2,1),opacity_0.2s_cubic-bezier(0.4,0,0.2,1)]",
              "group-hover:grid-rows-[1fr] group-hover:opacity-100 group-hover:[transition:grid-template-rows_0.5s_cubic-bezier(0.4,0,0.2,1),opacity_0.5s_cubic-bezier(0.4,0,0.2,1)_0.5s]",
            )}
          >
            <p className="min-h-0 translate-y-2 overflow-hidden pt-[5px] text-[15px] leading-[1.55] text-ink transition-transform duration-500 ease-(--ease-smooth) group-hover:translate-y-0 xl:text-base">
              {study.summary}
            </p>
          </div>
        </div>

        {services.length > 0 && (
          <ul
            className="pointer-events-auto relative z-[5] flex flex-wrap gap-1.5"
            aria-label="Services"
          >
            {services.map((s) => (
              <li key={s.id}>
                <Link
                  href={`/services/${s.slug}`}
                  className="inline-flex min-w-[60px] items-center justify-center rounded-pill border border-paper px-3 py-1.5 text-[8px] leading-[10px] font-medium text-paper transition-colors duration-(--duration-base) hover:border-paper hover:bg-paper hover:text-ink md:group-hover:border-ink md:group-hover:text-ink md:group-hover:hover:border-paper md:group-hover:hover:bg-paper xl:min-w-[70px] xl:px-[15px] xl:py-2 xl:text-[10px] xl:leading-3"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
