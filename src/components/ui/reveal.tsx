import type { CSSProperties, ElementType, ReactNode } from "react";

import { cn } from "@/lib/cn";

type Direction = "up" | "left" | "right" | "fade" | "image";

/**
 * Reveal-on-scroll wrapper. Renders `data-rv-root`; the inline script in
 * `reveal-script.ts` (runs before paint, no React needed) sets `data-visible`
 * when the element enters the viewport, and CSS in globals.css eases it in.
 * Children marked with `data-rv` (see RevealItem) stagger via `--i`.
 *
 * Server component: adds zero client JavaScript per block.
 */
export function Reveal({
  as: Tag = "div",
  direction = "up",
  delay = 0,
  className,
  style,
  children,
  self = true,
}: {
  as?: ElementType;
  direction?: Direction;
  /** Extra delay in ms before this element (and its staggered children) animate. */
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  /** When false, the wrapper itself does not animate, only its `data-rv` children. */
  self?: boolean;
}) {
  return (
    <Tag
      data-rv-root=""
      data-rv={self ? direction : undefined}
      suppressHydrationWarning
      className={cn(className)}
      style={{
        ...(style ?? {}),
        ...(delay ? ({ "--rv-delay": `${delay}ms` } as CSSProperties) : {}),
      }}
    >
      {children}
    </Tag>
  );
}

/** Staggered child. Use inside a <Reveal self={false}> container. */
export function RevealItem({
  as: Tag = "div",
  index = 0,
  direction = "up",
  className,
  style,
  children,
}: {
  as?: ElementType;
  index?: number;
  direction?: Direction;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <Tag
      data-rv={direction}
      suppressHydrationWarning
      className={className}
      style={{ ...(style ?? {}), "--i": index } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
