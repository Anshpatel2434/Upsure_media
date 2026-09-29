import Image from "next/image";
import Link from "next/link";

import type { Service } from "@/payload-types";

import { ArrowRightIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { imageProps } from "@/lib/media";

/** Image tile for services (used where a grid is explicitly chosen). */
export function ServiceCard({
  service,
  priority = false,
  className,
}: {
  service: Service;
  priority?: boolean;
  className?: string;
}) {
  const img = imageProps(service.cardImage, "large");
  return (
    <Link
      href={`/services/${service.slug}`}
      className={cn(
        "group relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-lg bg-teal-ink p-6 text-paper shadow-card transition-[transform,box-shadow] duration-(--duration-slow) ease-(--ease-smooth) hover:-translate-y-1.5 hover:shadow-lift md:p-7",
        className,
      )}
    >
      {img && (
        <Image
          src={img.src}
          alt={img.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          priority={priority}
          placeholder={img.blurDataURL ? "blur" : "empty"}
          blurDataURL={img.blurDataURL}
          className="-z-10 zoom-slow object-cover"
        />
      )}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent"
      />
      <ul className="mb-3 flex flex-wrap gap-2" aria-label="Focus areas">
        {(service.tags ?? []).map((t) => (
          <li
            key={t.id ?? t.label}
            className="rounded-pill border border-paper/30 px-3 py-1 text-small text-paper/90"
          >
            {t.label}
          </li>
        ))}
      </ul>
      <h3 className="text-h3 font-semibold">{service.title}</h3>
      <p className="mt-2 text-paper/80">{service.blurb}</p>
      <span className="mt-4 inline-flex items-center gap-2 font-medium text-sun">
        Know more
        <ArrowRightIcon size={18} className="transition-transform group-hover:translate-x-1.5" />
      </span>
    </Link>
  );
}
