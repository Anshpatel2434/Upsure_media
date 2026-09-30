import type { BlockProps } from "@/components/blocks/render-blocks";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Dot } from "@/components/ui/dot";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/cn";
import { renderEmphasis } from "@/lib/markers";

/**
 * "About" statement in the text-reveal style: one large right-aligned
 * paragraph capped to 85 % of the row, a pulsing dot on its right edge, and
 * pastel markers that fill behind each `[[phrase]]` one after another each
 * time the section scrolls into view. A pill button closes the paragraph.
 */
export function StatementBlock({ block }: BlockProps<"statement">) {
  const tone = block.tone ?? "paper";
  const dark = tone === "teal-ink" || tone === "teal";
  return (
    <Section tone={tone} padding="none" className="py-12 md:py-[50px] xl:py-[70px]">
      <Container>
        <Reveal self={false}>
          <div className="relative ml-auto text-right md:max-w-[85%] md:pr-[50px]">
            <Dot
              tone={dark ? "paper" : "ink"}
              className="absolute top-[6px] -right-0.5 hidden md:top-[13px] md:block"
            />
            {block.eyebrow && <p className="sr-only">{block.eyebrow}</p>}
            <p
              className={cn(
                "text-[20px] leading-[1.55] font-medium tracking-[-0.01em] md:text-[24px] lg:text-[30px] xl:text-[33px]",
                dark ? "text-paper" : "text-ink",
              )}
            >
              {renderEmphasis(block.text, { variant: "marker", tone: dark ? "sun" : "teal" })}
            </p>
            {block.cta?.href && block.cta.label && (
              <div className="mt-6 md:mt-[25px]">
                <Button href={block.cta.href} tone={dark ? "paper" : "ink"} withArrow>
                  {block.cta.label}
                </Button>
              </div>
            )}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
