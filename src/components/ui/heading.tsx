import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/cn";

type Level = "h1" | "h2" | "h3" | "h4";
type Size = "display" | "h1" | "h2" | "h3";

const sizeClass: Record<Size, string> = {
  display: "text-display",
  h1: "text-h1",
  h2: "text-h2",
  h3: "text-h3",
};

/** Semantic level and visual size are decoupled so the document outline stays correct. */
export function Heading({
  as: Tag = "h2",
  size = "h2",
  className,
  children,
}: {
  as?: Level;
  size?: Size;
  className?: string;
  children: ReactNode;
}) {
  return <Tag className={cn(sizeClass[size], className)}>{children}</Tag>;
}

type HighlightProps = {
  children: ReactNode;
  tone?: "teal" | "coral" | "sun";
  /** `underline` (default) or `marker` — a pill that fills behind the words once revealed. */
  variant?: "underline" | "marker";
};

/** Emphasised words inside a heading or statement. */
export function Highlight({ children, tone = "teal", variant = "underline" }: HighlightProps) {
  if (variant === "marker") {
    const color =
      tone === "sun"
        ? "var(--color-sun)"
        : tone === "coral"
          ? "var(--color-coral-soft)"
          : "var(--color-teal-soft)";
    return (
      <span className="marker" style={{ "--marker-color": color } as CSSProperties}>
        {children}
      </span>
    );
  }
  return (
    <span
      className={cn(
        "highlight",
        tone === "coral" && "decoration-coral",
        tone === "sun" && "decoration-sun",
      )}
    >
      {children}
    </span>
  );
}
