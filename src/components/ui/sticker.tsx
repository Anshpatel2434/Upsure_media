import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type Tone = "sun" | "coral" | "teal" | "ink";

const toneClass: Record<Tone, string> = {
  sun: "bg-sun text-ink",
  coral: "bg-coral text-white",
  teal: "bg-teal text-white",
  ink: "bg-ink text-paper",
};

/** Rotated label used in heroes and on cards — part of Upsure's sticker language. */
export function Sticker({
  tone = "sun",
  rotate = -4,
  className,
  children,
}: {
  tone?: Tone;
  /** Degrees, typically between -8 and 8. */
  rotate?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      style={{ transform: `rotate(${rotate}deg)` }}
      className={cn(
        "inline-flex items-center rounded-sm px-3 py-1.5 text-small font-semibold tracking-tight shadow-card",
        toneClass[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
