import { BlockImage } from "@/components/blocks/block-image";
import type { BlockProps } from "@/components/blocks/render-blocks";
import { SectionHeader } from "@/components/blocks/section-header";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/cn";

/** "Why us" / values: numbered items beside a tall image. */
export function FeatureListBlock({ block, index }: BlockProps<"featureList">) {
  const tone = block.tone ?? "white";
  const dark = tone === "teal-ink" || tone === "teal";
  const items = block.items ?? [];
  return (
    <Section tone={tone}>
      <Container className="flex flex-col gap-12">
        <SectionHeader
          index={index}
          eyebrow={block.eyebrow}
          heading={block.heading}
          tone={dark ? "paper" : "ink"}
        />
        <div className={cn("grid gap-10", block.image && "lg:grid-cols-[2fr_3fr]")}>
          {block.image && (
            <BlockImage
              media={block.image}
              size="large"
              sizes="(min-width: 1024px) 40vw, 100vw"
              aspect="aspect-[4/5]"
              className="rounded-xl lg:sticky lg:top-24"
            />
          )}
          <ol className={cn("divide-y", dark ? "divide-paper/15" : "divide-line")}>
            {items.map((item, i) => (
              <li key={item.id ?? item.title} className="grid gap-3 py-8 md:grid-cols-[4rem_1fr]">
                <span
                  className={cn(
                    "text-small font-semibold tabular-nums",
                    dark ? "text-sun" : "text-teal",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="text-h3">{item.title}</h3>
                  <p className={cn("max-w-prose", dark ? "text-paper/75" : "text-ink-2")}>
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
