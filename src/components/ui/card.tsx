import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type CardProps = {
  href?: string;
  tone?: "white" | "paper" | "teal-ink";
  padding?: "none" | "md" | "lg";
  className?: string;
  children: ReactNode;
};

const toneClass = {
  white: "bg-white border-line",
  paper: "bg-paper border-line",
  "teal-ink": "bg-teal-ink text-paper border-paper/15",
};

const paddingClass = { none: "", md: "p-6", lg: "p-8 md:p-10" };

/**
 * Bordered card with hover lift. When `href` is given the whole card is a link;
 * inner content should then avoid nested interactive elements.
 */
export function Card({ href, tone = "white", padding = "md", className, children }: CardProps) {
  const classes = cn(
    "relative block overflow-hidden rounded-lg border transition-[transform,box-shadow,border-color] duration-(--duration-base) ease-(--ease-out)",
    toneClass[tone],
    paddingClass[padding],
    href && "hover:-translate-y-1 hover:border-teal hover:shadow-lift focus-visible:-translate-y-1",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return <div className={classes}>{children}</div>;
}
