import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export type SectionTone = "paper" | "paper-2" | "white" | "teal-ink" | "teal";

const toneClass: Record<SectionTone, string> = {
  paper: "bg-paper text-ink",
  "paper-2": "bg-paper-2 text-ink",
  white: "bg-white text-ink",
  "teal-ink": "bg-teal-ink text-paper",
  teal: "bg-teal text-white",
};

/** Full-width page band with consistent vertical rhythm. Content is placed by the caller in a Container. */
export function Section({
  id,
  tone = "paper",
  grid = false,
  padding = "default",
  className,
  children,
}: {
  id?: string;
  tone?: SectionTone;
  /** Draw the faint hairline grid behind the content. */
  grid?: boolean;
  padding?: "default" | "tight" | "none";
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      data-tone={tone}
      className={cn(
        "relative isolate",
        toneClass[tone],
        padding === "default" && "py-section",
        padding === "tight" && "py-[calc(var(--spacing-section)/2)]",
        className,
      )}
    >
      {grid && <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid" />}
      {children}
    </section>
  );
}
