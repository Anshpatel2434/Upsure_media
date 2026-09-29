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
  white: "bg-white",
  paper: "bg-paper-2",
  "teal-ink": "bg-teal-ink text-paper ring-1 ring-paper/10",
};

const paddingClass = { none: "", md: "p-6", lg: "p-8 md:p-10" };

/**
 * Soft-elevation surface (no hard border). When `href` is given the whole card
 * is a link and lifts on hover.
 */
export function Card({ href, tone = "white", padding = "md", className, children }: CardProps) {
  const classes = cn(
    "relative block overflow-hidden rounded-lg shadow-card transition-[transform,box-shadow] duration-(--duration-slow) ease-(--ease-smooth)",
    toneClass[tone],
    paddingClass[padding],
    href && "hover:-translate-y-1.5 hover:shadow-lift focus-visible:-translate-y-1.5",
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
