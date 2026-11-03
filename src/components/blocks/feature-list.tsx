import type { BlockProps } from "@/components/blocks/render-blocks";
import { SectionHeader } from "@/components/blocks/section-header";
import { Container } from "@/components/ui/container";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/cn";

/** "Why us" / values: numbered items beside a sticky tall image. */
export function FeatureListBlock({ block, index }: BlockProps<"featureList">) {
  const tone = block.tone ?? "white";
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
            tone={dark ? "paper" : "ink"}
          />
          {/* No artwork beside the list: a tall sticky image next to three
              short reasons made the section read as clutter. */}
          <div className="grid gap-12">
            <ol className={cn("divide-y", dark ? "divide-paper/15" : "divide-line")}>
              {items.map((item, i) => (
                <RevealItem
                  as="li"
                  key={item.id ?? item.title}
                  index={i + 3}
                  className="grid gap-3 py-9 md:grid-cols-[4rem_1fr]"
                >
                  <span
                    className={cn(
                      "text-h2 font-semibold tabular-nums",
                      dark ? "text-sun" : "text-teal",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-h3">{item.title}</h3>
                    <p
                      className={cn("max-w-prose text-lead", dark ? "text-paper/75" : "text-ink-2")}
                    >
                      {item.body}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </ol>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
