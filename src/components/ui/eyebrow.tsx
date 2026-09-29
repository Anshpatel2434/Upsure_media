import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * Numbered section label, e.g. `01 — Services`. The index is optional so the
 * same component works for page-level eyebrows ("Blog").
 */
export function Eyebrow({
  index,
  tone = "ink",
  className,
  children,
}: {
  index?: string;
  tone?: "ink" | "paper";
  className?: string;
  children: ReactNode;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-eyebrow font-semibold tracking-(--text-eyebrow--letter-spacing) uppercase",
        tone === "ink" ? "text-muted" : "text-paper/70",
        className,
      )}
    >
      {index && (
        <span className={cn("tabular-nums", tone === "ink" ? "text-teal" : "text-sun")}>
          {index}
        </span>
      )}
      {index && (
        <span
          aria-hidden
          className={cn("h-px w-6", tone === "ink" ? "bg-line-strong" : "bg-paper/40")}
        />
      )}
      <span>{children}</span>
    </p>
  );
}
