import Image from "next/image";
import Link from "next/link";

import type { Testimonial } from "@/content/types";

import { cn } from "@/lib/cn";
import { imageProps } from "@/lib/media";
import { isDoc } from "@/lib/relations";

/**
 * Quote with an accent bar on the left (teal on light, sun on dark). Boxed
 * variant sits on a soft white surface for carousels. A service outcome (a
 * testimonial slot without a client quote yet) renders without quotation
 * marks or a person, captioned with the service name.
 */
export function TestimonialCard({
  testimonial,
  tone = "ink",
  size = "md",
  boxed = true,
  className,
}: {
  testimonial: Testimonial;
  tone?: "ink" | "paper";
  size?: "md" | "lg";
  boxed?: boolean;
  className?: string;
}) {
  const dark = tone === "paper";
  const outcome = Boolean(testimonial.outcome);
  const avatar = imageProps(testimonial.avatar, "thumbnail");
  const meta = [testimonial.role, testimonial.company].filter(Boolean).join(", ");
  return (
    <figure
      className={cn(
        "flex h-full flex-col gap-8 border-l-4 pl-6",
        dark ? "border-sun" : "border-teal",
        boxed &&
          (dark
            ? "rounded-r-lg bg-paper/5 py-7 pr-7"
            : "rounded-r-lg bg-white py-7 pr-7 shadow-card"),
        className,
      )}
    >
      <blockquote
        className={cn("text-balance", size === "lg" ? "text-h3 font-medium" : "text-lead")}
      >
        {outcome ? testimonial.quote : `“${testimonial.quote}”`}
      </blockquote>
      <figcaption className="mt-auto flex items-center gap-3">
        {outcome ? (
          <span
            aria-hidden
            className={cn("size-2.5 shrink-0 rounded-pill", dark ? "bg-sun" : "bg-teal")}
          />
        ) : avatar ? (
          <Image
            src={avatar.src}
            alt=""
            width={44}
            height={44}
            className="size-11 rounded-pill object-cover"
            placeholder={avatar.blurDataURL ? "blur" : "empty"}
            blurDataURL={avatar.blurDataURL}
          />
        ) : (
          <span
            aria-hidden
            className={cn(
              "inline-flex size-11 items-center justify-center rounded-pill text-small font-semibold",
              dark ? "bg-sun text-ink" : "bg-teal-soft text-teal",
            )}
          >
            {testimonial.name.slice(0, 1)}
          </span>
        )}
        <span className="flex flex-col">
          {outcome && isDoc(testimonial.service) ? (
            <Link
              href={`/services/${testimonial.service.slug}`}
              className="font-semibold underline-offset-4 hover:underline"
            >
              {testimonial.name}
            </Link>
          ) : (
            <span className="font-semibold">{testimonial.name}</span>
          )}
          {meta && (
            <span className={cn("text-small", dark ? "text-paper/60" : "text-muted")}>{meta}</span>
          )}
        </span>
      </figcaption>
    </figure>
  );
}
