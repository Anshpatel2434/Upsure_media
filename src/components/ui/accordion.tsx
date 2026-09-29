import type { ReactNode } from "react";

import { PlusIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

export type AccordionItem = {
  id: string;
  title: ReactNode;
  content: ReactNode;
};

/**
 * Native <details>/<summary> accordion. Zero JavaScript, keyboard accessible by
 * default. Passing `name` makes items exclusive (browser closes the others).
 */
export function Accordion({
  items,
  name,
  tone = "ink",
  defaultOpenId,
  className,
}: {
  items: AccordionItem[];
  name?: string;
  tone?: "ink" | "paper";
  defaultOpenId?: string;
  className?: string;
}) {
  const border = tone === "ink" ? "border-line divide-line" : "border-paper/20 divide-paper/20";
  return (
    <div className={cn("divide-y border-y", border, className)}>
      {items.map((item) => (
        <details
          key={item.id}
          name={name}
          open={item.id === defaultOpenId || undefined}
          className="group"
        >
          <summary
            className={cn(
              "flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-h3 font-medium select-none",
              tone === "ink" ? "hover:text-teal" : "hover:text-sun",
            )}
          >
            <span>{item.title}</span>
            <span
              aria-hidden
              className={cn(
                "inline-flex size-10 shrink-0 items-center justify-center rounded-pill border transition-[background-color,border-color,color,transform] duration-(--duration-base) ease-(--ease-smooth)",
                "group-open:rotate-45 group-hover:scale-110",
                tone === "ink"
                  ? "border-line-strong text-ink group-open:border-ink group-open:bg-ink group-open:text-paper group-hover:border-teal group-hover:bg-teal group-hover:text-white"
                  : "border-paper/30 text-paper group-open:border-sun group-open:bg-sun group-open:text-ink group-hover:border-sun group-hover:bg-sun group-hover:text-ink",
              )}
            >
              <PlusIcon size={20} />
            </span>
          </summary>
          <div
            className={cn(
              "max-w-prose pb-6 text-body",
              tone === "ink" ? "text-ink-2" : "text-paper/80",
            )}
          >
            {item.content}
          </div>
        </details>
      ))}
    </div>
  );
}
