"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/cn";

export type TocItem = { id: string; text: string; level: 2 | 3 };

/**
 * Sticky contents list for long-form pages. Highlights the section the reader
 * is in by watching the headings in the document, so the list follows the
 * scroll without the page needing a scroll handler.
 *
 * Progressive: the links are plain anchors, so they work before this hydrates
 * and with JavaScript off. Hidden from assistive tech duplication by being a
 * real <nav> with a label.
 */
export function ArticleToc({ items, className }: { items: TocItem[]; className?: string }) {
  const [active, setActive] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    const headings = items
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!headings.length) return;

    // The last heading to have passed the reading line near the top of the
    // viewport is the one the reader is in. Read on scroll rather than through
    // an IntersectionObserver, because nothing fires between two headings that
    // are far apart, and coalesced observer callbacks make the highlight lag.
    let frame = 0;
    const pick = () => {
      frame = 0;
      const line = 140;
      let current = headings[0]!;
      for (const h of headings) {
        if (h.getBoundingClientRect().top <= line) current = h;
        else break;
      }
      // At the very bottom the last heading is always the one in view, even if
      // it never reaches the line.
      const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 2;
      setActive(atBottom ? headings[headings.length - 1]!.id : current.id);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(pick);
    };

    pick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

  if (items.length < 2) return null;

  return (
    <nav aria-label="On this page" className={className}>
      <p className="mb-4 text-[11px] font-semibold tracking-[0.12em] text-muted uppercase">
        On this page
      </p>
      <ul className="flex flex-col gap-0.5 border-l border-line">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? "true" : undefined}
              className={cn(
                "-ml-px block border-l py-1.5 text-small leading-snug transition-colors duration-(--duration-base) ease-(--ease-smooth)",
                item.level === 3 ? "pl-7" : "pl-4",
                active === item.id
                  ? "border-teal font-medium text-teal"
                  : "border-transparent text-muted hover:border-line-strong hover:text-ink",
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
