import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * Infinite horizontal ticker. Pure CSS: the children are rendered twice and the
 * track translates by half its width. Pauses on hover; disabled under reduced motion.
 */
export function Marquee({
  children,
  duration = 40,
  gap = "3rem",
  className,
  label,
}: {
  children: ReactNode;
  /** Seconds for one full loop. */
  duration?: number;
  gap?: string;
  className?: string;
  /** Accessible name for the region, e.g. "Client logos". */
  label: string;
}) {
  return (
    <div
      role="region"
      aria-label={label}
      className={cn("group/marquee overflow-hidden", className)}
      style={
        {
          "--marquee-duration": `${duration}s`,
          "--marquee-gap": gap,
          maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        } as React.CSSProperties
      }
    >
      <div className="marquee-track group-hover/marquee:[animation-play-state:paused]">
        <div className="flex shrink-0 items-center" style={{ gap }}>
          {children}
        </div>
        <div className="flex shrink-0 items-center" style={{ gap }} aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
