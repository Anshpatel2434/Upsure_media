import type { BlockProps } from "@/components/blocks/render-blocks";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Marquee } from "@/components/ui/marquee";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/cn";

/**
 * Giant typographic band. The first three proof points are set as display
 * lines that step left/right, with pill badges tucked between; every point
 * then runs in a slow ticker underneath.
 */
export function ProofTickerBlock({ block }: BlockProps<"proofTicker">) {
  const items = block.items ?? [];
  const lines = items.slice(0, 3);
  const pills = items.slice(3, 6);
  return (
    <Section tone="paper-2" className="overflow-hidden">
      <Container>
        <Reveal self={false} className="flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            {lines.map((l, i) => (
              <RevealItem
                key={l.id ?? l.text}
                index={i}
                direction={i % 2 ? "right" : "left"}
                className={cn(
                  "flex flex-wrap items-center gap-x-6 gap-y-2",
                  i === 1 && "lg:ml-[18%]",
                  i === 2 && "lg:ml-[8%]",
                )}
              >
                <span className="text-display font-semibold">{l.text}</span>
                {pills[i] && (
                  <span
                    className={cn(
                      "rounded-pill px-4 py-2 text-body font-medium shadow-chip",
                      i % 2 ? "bg-sun text-ink" : "bg-teal text-white",
                    )}
                  >
                    {pills[i]!.text}
                  </span>
                )}
              </RevealItem>
            ))}
          </div>
        </Reveal>
      </Container>
      {items.length > 3 && (
        <div className="mt-10 border-y border-line py-4">
          <Marquee label="Proof points" duration={Math.max(28, items.length * 6)} gap="2.5rem">
            {items.map((i) => (
              <span
                key={i.id ?? i.text}
                className="flex items-center gap-10 text-lead font-medium whitespace-nowrap text-muted"
              >
                {i.text}
                <span aria-hidden className="size-2 rounded-pill bg-teal" />
              </span>
            ))}
          </Marquee>
        </div>
      )}
      {(block.heading || block.cta?.href) && (
        <Container className="mt-12 flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          {block.heading && <p className="text-h3 font-medium">{block.heading}</p>}
          {block.cta?.href && block.cta.label && (
            <Button href={block.cta.href} size="lg" withArrow>
              {block.cta.label}
            </Button>
          )}
        </Container>
      )}
    </Section>
  );
}
