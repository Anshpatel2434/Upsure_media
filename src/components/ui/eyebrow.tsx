import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * Section label. Either a numbered index (`01 — Services`) or a pulsing dot
 * for page-level eyebrows.
 */
export function Eyebrow({
  index,
  tone = "ink",
  dot = false,
  className,
  children,
}: {
  index?: string;
  tone?: "ink" | "paper";
  /** Show a pulsing accent dot instead of an index. */
  dot?: boolean;
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
      {dot && (
        <span
          aria-hidden
          className={cn(
            "inline-block size-2 dot-pulse rounded-pill",
            tone === "ink" ? "bg-teal" : "bg-sun",
          )}
        />
      )}
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
