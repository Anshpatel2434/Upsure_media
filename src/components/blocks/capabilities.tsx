import type { BlockProps } from "@/components/blocks/render-blocks";
import { SectionHeader } from "@/components/blocks/section-header";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Tag } from "@/components/ui/tag";

export function CapabilitiesBlock({ block, index }: BlockProps<"capabilities">) {
  const tone = block.tone ?? "paper";
  const dark = tone === "teal-ink" || tone === "teal";
  return (
    <Section tone={tone} padding="tight">
      <Container className="grid gap-8 lg:grid-cols-[1fr_2fr]">
        <SectionHeader
          index={index}
          eyebrow={block.eyebrow}
          heading={block.heading}
          tone={dark ? "paper" : "ink"}
          size="h3"
        />
        <ul className="flex flex-wrap gap-2.5">
          {(block.items ?? []).map((i) => (
            <li key={i.id ?? i.label}>
              <Tag tone={dark ? "paper" : "line"} className="h-9 px-4 text-body">
                {i.label}
              </Tag>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
