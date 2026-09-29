import Image from "next/image";

import type { Testimonial } from "@/payload-types";

import { Card } from "@/components/ui/card";
import { imageProps } from "@/lib/media";

export function TestimonialCard({
  testimonial,
  tone = "white",
  size = "md",
}: {
  testimonial: Testimonial;
  tone?: "white" | "paper" | "teal-ink";
  size?: "md" | "lg";
}) {
  const dark = tone === "teal-ink";
  const avatar = imageProps(testimonial.avatar, "thumbnail");
  const meta = [testimonial.role, testimonial.company].filter(Boolean).join(", ");
  return (
    <Card tone={tone} padding="lg" className="flex h-full flex-col gap-8">
      <blockquote className={size === "lg" ? "text-h3 font-medium" : "text-lead"}>
        <span aria-hidden className={dark ? "text-sun" : "text-teal"}>
          “
        </span>
        {testimonial.quote}
        <span aria-hidden className={dark ? "text-sun" : "text-teal"}>
          ”
        </span>
      </blockquote>
      <figcaption className="mt-auto flex items-center gap-3">
        {avatar ? (
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
            className={`inline-flex size-11 items-center justify-center rounded-pill text-small font-semibold ${
              dark ? "bg-sun text-ink" : "bg-teal-soft text-teal"
            }`}
          >
            {testimonial.name.slice(0, 1)}
          </span>
        )}
        <span className="flex flex-col">
          <span className="font-medium">{testimonial.name}</span>
          {meta && (
            <span className={`text-small ${dark ? "text-paper/60" : "text-muted"}`}>{meta}</span>
          )}
        </span>
      </figcaption>
    </Card>
  );
}
