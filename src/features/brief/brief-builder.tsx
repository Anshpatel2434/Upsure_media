import { Suspense } from "react";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { BriefBuilderForm } from "@/features/brief/brief-builder-form";
import { getForm, getServices } from "@/lib/queries";

/**
 * "Start a project": a guided 3-step brief. Needs come from the services
 * list; the submission is emailed to the team like every other lead.
 */
export async function BriefBuilder() {
  const [services, form] = await Promise.all([getServices(), getForm("brief")]);

  const needs = [
    ...services.map((s) => ({
      label: s.title,
      slug: s.slug,
      tags: (s.tags ?? []).map((t) => t.label),
    })),
    { label: "Not sure yet, help me decide", slug: "not-sure", tags: [] },
  ];

  return (
    <Section tone="white" padding="tight">
      <Container size="narrow">
        <Suspense fallback={null}>
          <BriefBuilderForm form={form} needs={needs} />
        </Suspense>
      </Container>
    </Section>
  );
}
