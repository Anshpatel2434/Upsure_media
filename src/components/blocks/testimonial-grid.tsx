"use client";

import { useState } from "react";

import type { Testimonial } from "@/content/types";

import { TestimonialCard } from "@/components/cards/testimonial-card";
import { cn } from "@/lib/cn";

export type GridItem = { testimonial: Testimonial; service: string | null };

/**
 * Every testimonial slot in a grid with a filter by service. Works without
 * JS too: all cards render, the filter only narrows what is shown.
 */
export function TestimonialGrid({
  items,
  services,
  tone = "ink",
}: {
  items: GridItem[];
  services: string[];
  tone?: "ink" | "paper";
}) {
  const [active, setActive] = useState<string | null>(null);
  const shown = active ? items.filter((i) => i.service === active) : items;
  const pill = (on: boolean) =>
    cn(
      "inline-flex h-10 items-center rounded-pill border px-4 text-sm font-medium transition-colors md:text-body",
      on
        ? "border-ink bg-ink text-paper"
        : "border-line-strong text-ink hover:border-teal hover:text-teal",
    );

  return (
    <div className="flex flex-col gap-8">
      <div role="group" aria-label="Filter by service" className="flex flex-wrap gap-2">
        <button
          type="button"
          className={pill(active === null)}
          aria-pressed={active === null}
          onClick={() => setActive(null)}
        >
          All
        </button>
        {services.map((s) => (
          <button
            key={s}
            type="button"
            className={pill(active === s)}
            aria-pressed={active === s}
            onClick={() => setActive(s)}
          >
            {s}
          </button>
        ))}
      </div>
      <ul className="grid gap-5 md:grid-cols-2" aria-live="polite">
        {shown.map(({ testimonial }) => (
          <li key={testimonial.id}>
            <TestimonialCard testimonial={testimonial} tone={tone} />
          </li>
        ))}
      </ul>
    </div>
  );
}
