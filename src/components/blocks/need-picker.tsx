import Link from "next/link";
import type { CSSProperties } from "react";

import type { Service } from "@/content/types";

import type { BlockProps } from "@/components/blocks/render-blocks";
import { ArrowPill } from "@/components/ui/arrow-pill";
import { Container } from "@/components/ui/container";
import { Dot } from "@/components/ui/dot";
import { LongArrowIcon } from "@/components/ui/icons";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/cn";
import { isDoc } from "@/lib/relations";

/** Hover colours for the pills, cycled so neighbours never match. */
const FILLS = ["var(--color-sun)", "var(--color-mint)", "var(--color-peach)"];

/**
 * "How can we help you?": a pulsing dot and question on one line, then large
 * pills, optionally under group labels (e.g. D2C brands / B2B companies). Each pill floods with an accent on
 * hover while its arrow slides out; it links to the matching service and
 * carries the need to the brief builder via ?need=.
 */
export function NeedPickerBlock({ block }: BlockProps<"needPicker">) {
  const items = block.items ?? [];
  // Keep the authored order; consecutive items with the same `group` form one list.
  const groups = items.reduce<{ label: string | null; items: typeof items }[]>((acc, item) => {
    const label = item.group ?? null;
    const last = acc.at(-1);
    if (last && last.label === label) last.items.push(item);
    else acc.push({ label, items: [item] });
    return acc;
  }, []);
  const tone = block.tone ?? "paper-2";
  const dark = tone === "teal-ink" || tone === "teal";

  return (
    <Section tone={tone}>
      <Container>
        <Reveal self={false} className="flex flex-col gap-8 md:gap-10">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-5">
              {block.eyebrow && (
                <RevealItem index={0} direction="left">
                  <ArrowPill tone={dark ? "dark" : "light"}>{block.eyebrow}</ArrowPill>
                </RevealItem>
              )}
              <RevealItem index={1} className="flex items-center gap-4 md:gap-5">
                <Dot tone={dark ? "sun" : "teal"} />
                <h2 className="text-[30px] leading-[1.1] font-semibold tracking-[-0.025em] md:text-[44px] xl:text-[53px]">
                  {block.heading}
                </h2>
              </RevealItem>
            </div>
            {block.subheading && (
              <RevealItem index={2}>
                <p
                  className={cn("text-base md:text-[17px]", dark ? "text-paper/70" : "text-ink-2")}
                >
                  {block.subheading}
                </p>
              </RevealItem>
            )}
          </div>

          <div className={cn("grid gap-8 md:gap-10", groups.length > 1 && "lg:grid-cols-2")}>
            {groups.map((g, gi) => (
              <div key={g.label ?? gi} className="flex flex-col gap-4">
                {g.label && (
                  <RevealItem index={3}>
                    <h3
                      className={cn(
                        "text-[15px] font-semibold md:text-[17px]",
                        dark ? "text-sun" : "text-teal",
                      )}
                    >
                      {g.label}
                    </h3>
                  </RevealItem>
                )}
                <ul className="flex flex-wrap gap-2.5 md:gap-3">
                  {g.items.map((item, i) => {
                    const service = isDoc(item.service) ? (item.service as Service) : null;
                    const href = service
                      ? `/services/${service.slug}?need=${encodeURIComponent(item.label)}`
                      : `/start-a-project?need=${encodeURIComponent(item.label)}`;
                    return (
                      <RevealItem
                        as="li"
                        key={item.id ?? item.label}
                        index={i + 4}
                        style={{ "--fill": FILLS[(i + gi) % FILLS.length] } as CSSProperties}
                      >
                        <Link
                          href={href}
                          className={cn(
                            "group inline-flex min-h-12 items-center rounded-pill px-5 py-2.5 text-sm font-medium md:min-h-[60px] md:px-7 md:text-base",
                            "transition-[background-color,color,box-shadow] duration-500 ease-(--ease-smooth) hover:bg-(--fill) hover:text-ink",
                            dark
                              ? "bg-paper/10 text-paper"
                              : "bg-white text-ink shadow-[0_1px_2px_rgb(11_13_16/0.04)] hover:shadow-card",
                          )}
                        >
                          {item.label}
                          <span className="grid w-0 overflow-hidden transition-[width,margin] duration-500 ease-(--ease-smooth) group-hover:ml-4 group-hover:w-10 group-focus-visible:ml-4 group-focus-visible:w-10">
                            <LongArrowIcon
                              width={40}
                              className="-translate-x-3 transition-transform duration-500 ease-(--ease-smooth) group-hover:translate-x-0"
                            />
                          </span>
                        </Link>
                      </RevealItem>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
