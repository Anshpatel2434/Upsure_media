import { BlockImage } from "@/components/blocks/block-image";
import type { BlockProps } from "@/components/blocks/render-blocks";
import { SectionHeader } from "@/components/blocks/section-header";
import { Container } from "@/components/ui/container";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/cn";

/**
 * Process as a horizontal rail on desktop: each step is a tall panel with a
 * giant numeral, the rail scrolls sideways; stacks vertically on mobile.
 */
export function ApproachStepsBlock({ block, index }: BlockProps<"approachSteps">) {
  const tone = block.tone ?? "white";
  const dark = tone === "teal-ink" || tone === "teal";
  const steps = block.steps ?? [];
  return (
    <Section tone={tone} className="overflow-hidden">
      <Container>
        <Reveal self={false} className="flex flex-col gap-12">
          <SectionHeader
            index={index}
            eyebrow={block.eyebrow}
            heading={block.heading}
            tone={dark ? "paper" : "ink"}
            align="right"
          />
          <ol className="-mx-gutter no-scrollbar flex snap-x gap-5 overflow-x-auto px-gutter pb-4 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0">
            {steps.map((step, i) => (
              <RevealItem
                as="li"
                key={step.id ?? step.title}
                index={i + 3}
                className={cn(
                  "flex w-[82%] shrink-0 snap-start flex-col gap-5 rounded-xl p-7 md:w-[46%] lg:w-auto",
                  dark ? "bg-paper/5 ring-1 ring-paper/10" : "bg-paper-2",
                  i % 2 === 1 && "lg:mt-12",
                )}
              >
                <span
                  className={cn(
                    "text-display font-semibold tabular-nums",
                    dark ? "text-sun" : "text-teal",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {step.image && (
                  <BlockImage
                    media={step.image}
                    size="card"
                    sizes="25vw"
                    aspect="aspect-[4/3]"
                    className="rounded-lg"
                  />
                )}
                <div className="flex flex-col gap-2">
                  <h3 className="text-h3">{step.title}</h3>
                  {step.subtitle && (
                    <p
                      className={cn(
                        "text-eyebrow font-semibold tracking-(--text-eyebrow--letter-spacing) uppercase",
                        dark ? "text-paper/60" : "text-muted",
                      )}
                    >
                      {step.subtitle}
                    </p>
                  )}
                  <p className={dark ? "text-paper/75" : "text-ink-2"}>{step.body}</p>
                </div>
              </RevealItem>
            ))}
          </ol>
        </Reveal>
      </Container>
    </Section>
  );
}
