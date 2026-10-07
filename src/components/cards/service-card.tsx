import Image from "next/image";
import Link from "next/link";

import type { Service } from "@/content/types";

import { ArrowRightIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { imageProps } from "@/lib/media";

/**
 * Service card: artwork on top, then title, one-line description and the
 * service's bullets (copy update, section 3.6), linking to the service page.
 */
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
  const bullets = (service.subServices ?? []).map((s) => s.label);
  return (
    <Link
      href={`/services/${service.slug}`}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-[22px] bg-white text-ink shadow-card transition-[transform,box-shadow] duration-(--duration-slow) ease-(--ease-smooth) hover:-translate-y-1 hover:shadow-lift",
        className,
      )}
    >
      {img && (
        <div className="relative aspect-[4/3] overflow-hidden bg-paper-2">
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
            priority={priority}
            placeholder={img.blurDataURL ? "blur" : "empty"}
            blurDataURL={img.blurDataURL}
            className="zoom-slow object-cover"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3 p-6 md:p-7">
        <h3 className="text-[22px] leading-tight font-semibold tracking-[-0.01em] md:text-[24px]">
          {service.title}
        </h3>
        <p className="text-ink-2">{service.blurb}</p>
        {bullets.length > 0 && (
          <ul className="mt-1 flex flex-col gap-1.5 text-small text-ink-2" aria-label="Includes">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-2">
                <span aria-hidden className="mt-[0.55em] size-1.5 shrink-0 rounded-pill bg-teal" />
                {b}
              </li>
            ))}
          </ul>
        )}
        <span className="mt-auto inline-flex items-center gap-2 pt-3 font-semibold text-teal">
          Explore {service.title}
          <ArrowRightIcon size={18} className="transition-transform group-hover:translate-x-1.5" />
        </span>
      </div>
    </Link>
  );
}
