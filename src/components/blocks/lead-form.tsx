import type { Form } from "@/content/types";

import type { BlockProps } from "@/components/blocks/render-blocks";
import { SectionHeader } from "@/components/blocks/section-header";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { LeadForm } from "@/features/forms/lead-form";
import { cn } from "@/lib/cn";
import { isDoc } from "@/lib/relations";

export function LeadFormBlock({ block, index }: BlockProps<"leadForm">) {
  const form = isDoc(block.form) ? (block.form as Form) : null;
  if (!form) return null;
  const tone = block.tone ?? "paper";
  const dark = tone === "teal-ink" || tone === "teal";
  const split = block.layout !== "stacked";

  return (
    <Section id="lead-form" tone={tone}>
      <Container className={cn("grid gap-10", split && "lg:grid-cols-[2fr_3fr]")}>
        <SectionHeader
          index={index}
          eyebrow={block.eyebrow}
          heading={block.heading}
          intro={block.intro}
          tone={dark ? "paper" : "ink"}
        />
        <div
          className={cn(
            "rounded-xl border p-6 md:p-8",
            dark ? "border-paper/15 bg-paper/5" : "border-line bg-white",
          )}
        >
          <LeadForm form={form} tone={dark ? "paper" : "ink"} />
        </div>
      </Container>
    </Section>
  );
}
