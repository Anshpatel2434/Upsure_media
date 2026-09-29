import type { BlockProps } from "@/components/blocks/render-blocks";
import { SectionHeader } from "@/components/blocks/section-header";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { CheckIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import { Sticker } from "@/components/ui/sticker";
import { cn } from "@/lib/cn";

/** How-to-buy cards: fixed scope / retainer / fractional. Something Marino doesn't explain. */
export function EngagementModelsBlock({ block, index }: BlockProps<"engagementModels">) {
  const tone = block.tone ?? "paper";
  const dark = tone === "teal-ink" || tone === "teal";
  const items = block.items ?? [];
  return (
    <Section tone={tone}>
      <Container className="flex flex-col gap-12">
        <SectionHeader
          index={index}
          eyebrow={block.eyebrow}
          heading={block.heading}
          intro={block.intro}
          tone={dark ? "paper" : "ink"}
        />
        <ul className="grid gap-5 md:grid-cols-3">
          {items.map((item) => (
            <li key={item.id ?? item.name} className="relative">
              <Card
                tone={dark ? "teal-ink" : item.highlight ? "white" : "paper"}
                padding="lg"
                className={cn(
                  "flex h-full flex-col gap-5",
                  item.highlight && "border-teal shadow-lift",
                )}
              >
                {item.highlight && (
                  <Sticker tone="sun" rotate={-3} className="absolute -top-3 right-5">
                    Most popular
                  </Sticker>
                )}
                <h3 className="text-h3">{item.name}</h3>
                <p
                  className={cn(
                    "text-small font-semibold tracking-(--text-eyebrow--letter-spacing) uppercase",
                    dark ? "text-sun" : "text-teal",
                  )}
                >
                  Best for
                </p>
                <p className={dark ? "text-paper/80" : "text-ink-2"}>{item.bestFor}</p>
                {item.length && (
                  <p className={cn("text-small", dark ? "text-paper/60" : "text-muted")}>
                    Typical length: {item.length}
                  </p>
                )}
                <ul className="mt-auto flex flex-col gap-2 border-t border-line pt-5">
                  {(item.includes ?? []).map((inc) => (
                    <li key={inc.id ?? inc.item} className="flex items-start gap-2">
                      <CheckIcon
                        size={18}
                        className={cn("mt-0.5 shrink-0", dark ? "text-sun" : "text-teal")}
                      />
                      <span>{inc.item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
