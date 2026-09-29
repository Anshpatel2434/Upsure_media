"use client";

import { Children, useCallback, useEffect, useId, useRef, useState, type ReactNode } from "react";

import { CircleButton } from "@/components/ui/circle-button";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

/**
 * Scroll-snap carousel. The track is a plain overflow-x container, so it works
 * with touch, trackpad, keyboard (Tab into a slide) and without JS; the buttons
 * and counter are progressive enhancement.
 */
export function Carousel({
  children,
  label,
  tone = "ink",
  slideClassName,
  className,
  controls = "bottom",
}: {
  children: ReactNode;
  label: string;
  tone?: "ink" | "paper";
  /** Width classes for each slide, e.g. "w-[85%] md:w-[48%]". */
  slideClassName?: string;
  className?: string;
  /** Where the arrows + counter sit. */
  controls?: "bottom" | "top-right";
}) {
  const slides = Children.toArray(children);
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const id = useId();

  const scrollTo = useCallback((next: number) => {
    const track = trackRef.current;
    if (!track) return;
    const target = track.children[next] as HTMLElement | undefined;
    if (!target) return;
    track.scrollTo({ left: target.offsetLeft - track.offsetLeft, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const items = Array.from(track.children) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setIndex(items.indexOf(visible.target as HTMLElement));
      },
      { root: track, threshold: 0.6 },
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [slides.length]);

  const paper = tone === "paper";
  const controlsNode = (
    <div className={cn("flex items-center gap-4", controls === "top-right" && "justify-end")}>
      <CircleButton
        tone={tone}
        onClick={() => scrollTo(Math.max(0, index - 1))}
        disabled={index === 0}
        aria-controls={id}
        aria-label="Previous slide"
      >
        <ChevronLeftIcon />
      </CircleButton>
      <span
        className={cn("text-small tabular-nums", paper ? "text-paper/70" : "text-muted")}
        aria-live="polite"
      >
        {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
      </span>
      <CircleButton
        tone={tone}
        onClick={() => scrollTo(Math.min(slides.length - 1, index + 1))}
        disabled={index >= slides.length - 1}
        aria-controls={id}
        aria-label="Next slide"
      >
        <ChevronRightIcon />
      </CircleButton>
    </div>
  );

  return (
    <div
      className={cn("relative flex flex-col gap-6", className)}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
    >
      {controls === "top-right" && controlsNode}
      <div
        ref={trackRef}
        id={id}
        className="-mx-gutter no-scrollbar flex snap-x snap-mandatory [scroll-padding-inline:var(--spacing-gutter)] gap-5 overflow-x-auto scroll-smooth px-gutter"
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
            className={cn("shrink-0 snap-start", slideClassName ?? "w-[85%] md:w-[48%] lg:w-[32%]")}
          >
            {slide}
          </div>
        ))}
      </div>
      {controls === "bottom" && controlsNode}
    </div>
  );
}
