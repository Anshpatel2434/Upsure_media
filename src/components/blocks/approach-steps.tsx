import { BlockImage } from "@/components/blocks/block-image";
import type { BlockProps } from "@/components/blocks/render-blocks";
import { SectionHeader } from "@/components/blocks/section-header";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/cn";

/** Numbered process steps in a vertical editorial list with an optional image per step. */
export function ApproachStepsBlock({ block, index }: BlockProps<"approachSteps">) {
  const tone = block.tone ?? "white";
  const dark = tone === "teal-ink" || tone === "teal";
  const steps = block.steps ?? [];
  return (
    <Section tone={tone}>
      <Container className="flex flex-col gap-12">
        <SectionHeader
          index={index}
          eyebrow={block.eyebrow}
          heading={block.heading}
          tone={dark ? "paper" : "ink"}
        />
        <ol
          className={cn(
            "divide-y border-t",
            dark ? "divide-paper/15 border-paper/15" : "divide-line border-line",
          )}
        >
          {steps.map((step, i) => (
            <li
              key={step.id ?? step.title}
              className="grid gap-6 py-10 md:grid-cols-[5rem_1fr_1fr] md:gap-10"
            >
              <span
                className={cn(
                  "text-display font-semibold tabular-nums",
                  dark ? "text-sun" : "text-teal",
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-3">
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
                <p className={cn("max-w-prose", dark ? "text-paper/75" : "text-ink-2")}>
                  {step.body}
                </p>
              </div>
              {step.image && (
                <BlockImage
                  media={step.image}
                  size="card"
                  sizes="(min-width: 768px) 33vw, 100vw"
                  aspect="aspect-[4/3]"
                  className="md:max-w-sm md:justify-self-end"
                />
              )}
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
