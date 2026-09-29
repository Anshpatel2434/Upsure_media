import type { BlockProps } from "@/components/blocks/render-blocks";
import { SectionHeader } from "@/components/blocks/section-header";
import { Container } from "@/components/ui/container";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Stat } from "@/components/ui/stat";
import { cn } from "@/lib/cn";

/** Oversized numbers in one rule-separated row, labels beside them. */
export function StatsBlock({ block, index }: BlockProps<"stats">) {
  const tone = block.tone ?? "paper";
  const dark = tone === "teal-ink" || tone === "teal";
  const items = block.items ?? [];
  return (
    <Section tone={tone} padding="tight">
      <Container>
        <Reveal self={false} className="flex flex-col gap-10">
          <SectionHeader
            index={index}
            eyebrow={block.eyebrow}
            heading={block.heading}
            tone={dark ? "paper" : "ink"}
            align="right"
          />
          <div
            className={cn(
              "grid divide-y rounded-xl md:grid-cols-3 md:divide-x md:divide-y-0",
              dark ? "divide-paper/15 bg-paper/5" : "divide-line bg-white shadow-card",
            )}
          >
            {items.map((item, i) => (
              <RevealItem key={item.id ?? item.label} index={i + 2} className="p-8 md:p-10">
                <Stat
                  value={item.value}
                  suffix={item.suffix ?? ""}
                  label={item.label}
                  tone={dark ? "paper" : "ink"}
                />
              </RevealItem>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
