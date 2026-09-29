import type { BlockProps } from "@/components/blocks/render-blocks";
import { SectionHeader } from "@/components/blocks/section-header";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Stat } from "@/components/ui/stat";

export function StatsBlock({ block, index }: BlockProps<"stats">) {
  const tone = block.tone ?? "paper";
  const dark = tone === "teal-ink" || tone === "teal";
  const items = block.items ?? [];
  return (
    <Section tone={tone} padding="tight">
      <Container className="flex flex-col gap-10">
        <SectionHeader
          index={index}
          eyebrow={block.eyebrow}
          heading={block.heading}
          tone={dark ? "paper" : "ink"}
        />
        <div className="grid gap-10 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Stat
              key={item.id ?? item.label}
              value={item.value}
              suffix={item.suffix ?? ""}
              label={item.label}
              tone={dark ? "paper" : "ink"}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
