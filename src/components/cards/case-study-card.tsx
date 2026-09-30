import Image from "next/image";
import Link from "next/link";

import type { CaseStudy, Service } from "@/content/types";

import { ArrowRightIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { imageProps } from "@/lib/media";
import { isDoc } from "@/lib/relations";

const serviceTitles = (services: CaseStudy["services"]) =>
  (services ?? []).filter((s): s is Service => isDoc(s)).map((s) => s.title);

/**
 * Image-first tile: cover fills the card, dark gradient at the bottom, title
 * and tags sit on the image, the summary unfolds on hover, and the image zooms
 * very slowly (5 s) while hovered.
 */
export function CaseStudyCard({
  study,
  size = "small",
  priority = false,
  className,
}: {
  study: CaseStudy;
  size?: "large" | "small" | "wide";
  priority?: boolean;
  className?: string;
}) {
  const img = imageProps(study.cover, size === "large" ? "hero" : "large");
  const stat = study.stats?.[0];
  return (
    <Link
      href={`/work/${study.slug}`}
      className={cn(
        "group relative isolate block overflow-hidden rounded-lg bg-teal-ink text-paper shadow-card transition-[box-shadow,transform] duration-(--duration-slow) ease-(--ease-smooth) hover:shadow-lift",
        size === "large"
          ? "aspect-[4/5] md:aspect-auto md:h-full md:min-h-[36rem]"
          : size === "wide"
            ? "aspect-[16/10]"
            : "aspect-[4/3] md:aspect-[16/11]",
        className,
      )}
    >
      {img && (
        <Image
          src={img.src}
          alt={img.alt}
          fill
          sizes={
            size === "large" ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 40vw, 100vw"
          }
          priority={priority}
          placeholder={img.blurDataURL ? "blur" : "empty"}
          blurDataURL={img.blurDataURL}
          className="-z-10 zoom-slow object-cover"
        />
      )}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent transition-opacity duration-(--duration-slow) group-hover:opacity-90"
      />
      {stat && (
        <span className="absolute top-5 left-5 rounded-pill bg-sun px-3 py-1.5 text-small font-semibold text-ink shadow-chip">
          {stat.value} {stat.label}
        </span>
      )}
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6 md:p-8">
        <h3 className={cn("font-semibold", size === "large" ? "text-h1" : "text-h3")}>
          {study.title}
        </h3>
        <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-(--duration-slow) ease-(--ease-smooth) group-hover:grid-rows-[1fr]">
          <p className="min-h-0 overflow-hidden text-paper/80 opacity-0 transition-opacity delay-100 duration-(--duration-slow) group-hover:opacity-100">
            {study.summary}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {serviceTitles(study.services).map((t) => (
            <span
              key={t}
              className="rounded-pill border border-paper/30 px-3 py-1 text-small text-paper/90"
            >
              {t}
            </span>
          ))}
          <span className="ml-auto inline-flex items-center gap-2 font-medium text-sun">
            View work
            <ArrowRightIcon
              size={18}
              className="transition-transform group-hover:translate-x-1.5"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}
