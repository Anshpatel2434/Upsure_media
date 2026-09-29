import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type Tone = "line" | "teal" | "coral" | "sun" | "paper";

const toneClass: Record<Tone, string> = {
  line: "border border-line text-ink-2 bg-white/60",
  teal: "bg-teal-soft text-teal",
  coral: "bg-coral-soft text-coral",
  sun: "bg-sun-soft text-ink",
  paper: "border border-paper/30 text-paper",
};

export function Tag({
  tone = "line",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-7 items-center rounded-pill px-3 text-small font-medium whitespace-nowrap",
        toneClass[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
