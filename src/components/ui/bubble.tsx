import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * Floating pill. Two nested wrappers drift on the x and y axes with different
 * periods and phase offsets (derived from `index`), producing the slow,
 * organic bob of the reference hero without a JavaScript animation loop.
 */
export function Bubble({
  index = 0,
  tone = "sun",
  className,
  children,
}: {
  index?: number;
  tone?: "sun" | "mint" | "white" | "ink";
  className?: string;
  children: ReactNode;
}) {
  const vars = {
    "--bx-dur": `${2.2 + (index % 3) * 0.35}s`,
    "--bx-amp": `${0.45 + (index % 3) * 0.1}vw`,
    "--bx-delay": `${-1.1 * (index + 1)}s`,
    "--by-dur": `${3.9 + (index % 4) * 0.55}s`,
    "--by-amp": `${1.2 + (index % 4) * 0.3}vw`,
    "--by-delay": `${-2.3 * (index + 1)}s`,
  } as CSSProperties;

  return (
    <span className={cn("pointer-events-none bubble-x", className)} style={vars}>
      <span className="bubble-y">
        <span
          className={cn(
            "inline-flex min-h-8 w-max items-center rounded-pill px-3.5 py-1.5 text-[11px] leading-tight font-semibold tracking-normal md:min-h-[max(36px,4.5vw)] md:px-[max(16px,2.5vw)] md:text-[max(12px,1.25vw)] 2xl:min-h-[69px] 2xl:px-[38px] 2xl:text-lg",
            tone === "sun" && "bg-sun text-ink",
            tone === "mint" && "bg-mint text-ink",
            tone === "white" && "bg-white text-ink",
            tone === "ink" && "bg-ink text-paper",
          )}
        >
          {children}
        </span>
      </span>
    </span>
  );
}
