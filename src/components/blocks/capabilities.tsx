import type { BlockProps } from "@/components/blocks/render-blocks";
import { SectionHeader } from "@/components/blocks/section-header";
import { Container } from "@/components/ui/container";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/cn";

/**
 * Capabilities as one flowing line of large text separated by dots — a
 * ledger, not a tag cloud. Each capability brightens on hover.
 */
export function CapabilitiesBlock({ block, index }: BlockProps<"capabilities">) {
  const tone = block.tone ?? "paper";
  const dark = tone === "teal-ink" || tone === "teal";
  return (
    <Section tone={tone} padding="tight">
      <Container>
        <Reveal self={false} className="grid gap-8 lg:grid-cols-12">
          <SectionHeader
            index={index}
            eyebrow={block.eyebrow}
            heading={block.heading}
            tone={dark ? "paper" : "ink"}
            size="h3"
            className="lg:col-span-3"
          />
          <RevealItem index={2} className="lg:col-span-9">
            <p
              className={cn(
                "text-h3 leading-[1.5] font-medium",
                dark ? "text-paper/50" : "text-muted",
              )}
            >
              {(block.items ?? []).map((i, n) => (
                <span key={i.id ?? i.label}>
                  <span
                    className={cn(
                      "transition-colors duration-(--duration-base)",
                      dark ? "hover:text-paper" : "hover:text-ink",
                    )}
                  >
                    {i.label}
                  </span>
                  {n < (block.items?.length ?? 0) - 1 && (
                    <span
                      aria-hidden
                      className={cn(
                        "mx-3 inline-block size-2 -translate-y-1 rounded-pill",
                        dark ? "bg-sun" : "bg-teal",
                      )}
                    />
                  )}
                </span>
              ))}
            </p>
          </RevealItem>
        </Reveal>
      </Container>
    </Section>
  );
}
