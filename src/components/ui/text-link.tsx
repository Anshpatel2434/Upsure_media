import Link from "next/link";
import type { ReactNode } from "react";

import { LongArrowIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

/**
 * Bold text link with a long arrow that slides 10 px on hover. `accent` is the
 * colour on dark bands (sun), `ink` on light sections.
 */
export function TextLink({
  href,
  tone = "ink",
  arrowWidth = 60,
  external = false,
  className,
  children,
}: {
  href: string;
  tone?: "ink" | "accent" | "teal";
  arrowWidth?: number;
  external?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const classes = cn(
    "group/tl inline-flex w-fit items-center gap-2.5 text-[17px] font-bold",
    "transition-colors duration-(--duration-base) ease-[cubic-bezier(.65,0,.35,1)]",
    tone === "ink" && "text-ink hover:text-teal",
    tone === "teal" && "text-teal hover:text-ink",
    tone === "accent" && "text-sun hover:text-mint",
    className,
  );
  const content = (
    <>
      <span>{children}</span>
      <LongArrowIcon
        width={arrowWidth}
        className="shrink-0 transition-transform duration-(--duration-base) ease-[cubic-bezier(.65,0,.35,1)] group-hover/tl:translate-x-2.5"
      />
    </>
  );
  if (external || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a
        href={href}
        className={classes}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
