"use client";

import { useState } from "react";

import { cn } from "@/lib/cn";

export type FaderQuote = {
  id: string;
  quote: string;
  name: string;
  detail?: string | null;
};

function Arrow({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden focusable={false}>
      <path
        d={dir === "next" ? "M1.5 6h8.5M6.5 2.5 10 6l-3.5 3.5" : "M10.5 6H2M5.5 2.5 2 6l3.5 3.5"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Quote slider that cross-fades in place. All quotes share one grid cell, so
 * the block is as tall as the longest quote and never jumps. The accent bar
 * bleeds into the card padding (negative margin equal to the card gutter).
 */
export function QuoteFader({
  items,
  surface = "dark",
}: {
  items: FaderQuote[];
  surface?: "dark" | "light";
}) {
  const [index, setIndex] = useState(0);
  if (!items.length) return null;
  const dark = surface === "dark";

  const control = cn(
    "inline-flex size-[26px] items-center justify-center rounded-pill md:size-8",
    "transition-[background-color,transform,opacity] duration-(--duration-base) ease-(--ease-smooth)",
    "hover:scale-[1.2] disabled:pointer-events-none disabled:opacity-25 [&:disabled_svg]:opacity-0",
    dark ? "bg-sun text-ink hover:bg-mint" : "bg-ink text-paper hover:bg-teal",
  );

  return (
    <div>
      <div
        className={cn(
          "-ml-[25px] border-l-[5px] pl-5 md:-ml-[50px] md:pl-[45px] xl:-ml-[70px] xl:border-l-8 xl:pl-[62px]",
          dark ? "border-sun" : "border-teal",
        )}
      >
        <div className="grid" aria-live="polite">
          {items.map((t, n) => (
            <figure
              key={t.id}
              aria-hidden={n !== index}
              className={cn(
                "transition-opacity duration-500 ease-(--ease-smooth) [grid-area:1/1]",
                n === index ? "opacity-100" : "pointer-events-none opacity-0",
              )}
            >
              <blockquote
                className={cn(
                  "text-[18px] leading-[1.5] md:text-[24px] xl:text-[28px]",
                  dark ? "text-paper" : "text-ink",
                )}
              >
                “{t.quote}”
              </blockquote>
              <figcaption
                className={cn(
                  "mt-4 text-[13px] md:text-[15px] xl:text-[17px]",
                  dark ? "text-sun" : "text-teal",
                )}
              >
                {t.name}
                {t.detail && (
                  <>
                    : <strong className="font-bold">{t.detail}</strong>
                  </>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {items.length > 1 && (
        <div className="mt-[25px] flex items-center">
          <button
            type="button"
            className={control}
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            disabled={index === 0}
            aria-label="Previous testimonial"
          >
            <Arrow dir="prev" />
          </button>
          <span className="min-w-[60px] px-1.5 text-center text-lg leading-none tabular-nums">
            {index + 1} / {items.length}
          </span>
          <button
            type="button"
            className={control}
            onClick={() => setIndex((i) => Math.min(items.length - 1, i + 1))}
            disabled={index >= items.length - 1}
            aria-label="Next testimonial"
          >
            <Arrow dir="next" />
          </button>
        </div>
      )}
    </div>
  );
}
