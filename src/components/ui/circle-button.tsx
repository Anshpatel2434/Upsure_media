import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

/** Round icon control (carousel arrows, pagination): fills and scales on hover. */
export function CircleButton({
  tone = "ink",
  className,
  children,
  ...rest
}: { tone?: "ink" | "paper"; className?: string; children: ReactNode } & Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "className" | "children"
>) {
  return (
    <button
      type="button"
      {...rest}
      className={cn(
        "inline-flex size-11 shrink-0 items-center justify-center rounded-pill border",
        "transition-[background-color,color,border-color,transform] duration-(--duration-base) ease-(--ease-smooth)",
        "hover:scale-110 active:scale-95 disabled:pointer-events-none disabled:opacity-30",
        tone === "ink"
          ? "border-line-strong bg-white text-ink hover:border-teal hover:bg-teal hover:text-white"
          : "border-paper/30 text-paper hover:border-sun hover:bg-sun hover:text-ink",
        className,
      )}
    >
      {children}
    </button>
  );
}
