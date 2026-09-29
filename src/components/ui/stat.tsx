"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";

/**
 * Big editorial number with label. The number counts up once when it enters
 * the viewport; under reduced motion it renders the final value immediately.
 */
export function Stat({
  value,
  suffix = "",
  label,
  tone = "ink",
  className,
}: {
  value: number;
  suffix?: string;
  label: string;
  tone?: "ink" | "paper";
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.documentElement.dataset.motion === "off";
    if (reduce) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const duration = 900;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(Math.round(value * eased));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        setDisplay(0);
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <span
        ref={ref}
        className={cn(
          "text-display font-semibold tabular-nums",
          tone === "ink" ? "text-ink" : "text-paper",
        )}
      >
        {display.toLocaleString("en-IN")}
        <span className={tone === "ink" ? "text-teal" : "text-sun"}>{suffix}</span>
      </span>
      <span
        className={cn("max-w-[16rem] text-body", tone === "ink" ? "text-muted" : "text-paper/70")}
      >
        {label}
      </span>
    </div>
  );
}
