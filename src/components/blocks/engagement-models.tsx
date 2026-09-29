import type { BlockProps } from "@/components/blocks/render-blocks";
import { SectionHeader } from "@/components/blocks/section-header";
import { Container } from "@/components/ui/container";
import { CheckIcon } from "@/components/ui/icons";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Sticker } from "@/components/ui/sticker";
import { cn } from "@/lib/cn";

/**
 * How-to-buy: three columns; the highlighted model is a dark teal-ink panel
 * that stands proud of the other two.
 */
export function EngagementModelsBlock({ block, index }: BlockProps<"engagementModels">) {
  const tone = block.tone ?? "paper";
  const dark = tone === "teal-ink" || tone === "teal";
  const items = block.items ?? [];
  return (
    <Section tone={tone}>
      <Container>
        <Reveal self={false} className="flex flex-col gap-12">
          <SectionHeader
            index={index}
            eyebrow={block.eyebrow}
            heading={block.heading}
            intro={block.intro}
            tone={dark ? "paper" : "ink"}
          />
          <ul className="grid gap-5 md:grid-cols-3 md:items-end">
            {items.map((item, i) => {
              const hi = Boolean(item.highlight);
              return (
                <RevealItem as="li" key={item.id ?? item.name} index={i + 3} className="relative">
                  <div
                    className={cn(
                      "flex h-full flex-col gap-5 rounded-xl p-8 transition-[transform,box-shadow] duration-(--duration-slow) ease-(--ease-smooth) hover:-translate-y-1.5",
                      hi
                        ? "bg-teal-ink text-paper shadow-lift md:-translate-y-4 md:pb-12"
                        : dark
                          ? "bg-paper/5 text-paper ring-1 ring-paper/10"
                          : "bg-white shadow-card",
                    )}
                  >
                    {hi && (
                      <Sticker tone="sun" rotate={-3} className="absolute -top-3 right-6">
                        Most popular
                      </Sticker>
                    )}
                    <h3 className="text-h3">{item.name}</h3>
                    <p
                      className={cn(
                        "text-eyebrow font-semibold tracking-(--text-eyebrow--letter-spacing) uppercase",
                        hi || dark ? "text-sun" : "text-teal",
                      )}
                    >
                      Best for
                    </p>
                    <p className={hi || dark ? "text-paper/80" : "text-ink-2"}>{item.bestFor}</p>
                    {item.length && (
                      <p className={cn("text-small", hi || dark ? "text-paper/60" : "text-muted")}>
                        Typical length: {item.length}
                      </p>
                    )}
                    <ul
                      className={cn(
                        "mt-auto flex flex-col gap-2 border-t pt-5",
                        hi || dark ? "border-paper/15" : "border-line",
                      )}
                    >
                      {(item.includes ?? []).map((inc) => (
                        <li key={inc.id ?? inc.item} className="flex items-start gap-2">
                          <CheckIcon
                            size={18}
                            className={cn("mt-0.5 shrink-0", hi || dark ? "text-sun" : "text-teal")}
                          />
                          <span>{inc.item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </RevealItem>
              );
            })}
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}
