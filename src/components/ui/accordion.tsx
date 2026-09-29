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
              "transition-colors duration-(--duration-fast)",
              tone === "ink" ? "hover:text-teal" : "hover:text-sun",
            )}
          >
            <span>{item.title}</span>
            <PlusIcon
              size={22}
              className="shrink-0 transition-transform duration-(--duration-base) ease-(--ease-out) group-open:rotate-45"
            />
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
