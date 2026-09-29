import type { BlockProps } from "@/components/blocks/render-blocks";
import { SectionHeader } from "@/components/blocks/section-header";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/cn";

/** Short process (e.g. "Start a collaboration"): three stepped columns, each lower than the last. */
export function ProcessStepsBlock({ block, index }: BlockProps<"processSteps">) {
  const tone = block.tone ?? "white";
  const dark = tone === "teal-ink" || tone === "teal";
  const steps = block.steps ?? [];
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
          <ol className="grid gap-8 md:grid-cols-3">
            {steps.map((step, i) => (
              <RevealItem
                as="li"
                key={step.id ?? step.title}
                index={i + 2}
                className={cn(
                  "flex flex-col gap-4 border-t-2 pt-6",
                  dark ? "border-paper/20" : "border-ink",
                  i === 1 && "md:mt-10",
                  i === 2 && "md:mt-20",
                )}
              >
                <span
                  className={cn(
                    "text-h1 font-semibold tabular-nums",
                    dark ? "text-sun" : "text-teal",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-h3">{step.title}</h3>
                <p className={cn("flex-1", dark ? "text-paper/75" : "text-ink-2")}>{step.body}</p>
                {step.link?.href && step.link.label && (
                  <Button
                    href={step.link.href}
                    variant="link"
                    tone={dark ? "paper" : "ink"}
                    withArrow
                    className="w-fit"
                  >
                    {step.link.label}
                  </Button>
                )}
              </RevealItem>
            ))}
          </ol>
        </Reveal>
      </Container>
    </Section>
  );
}
