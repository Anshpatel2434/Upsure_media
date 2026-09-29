import { Suspense } from "react";

import type { Form } from "@/payload-types";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { BriefBuilderForm } from "@/features/brief/brief-builder-form";
import { getCms } from "@/lib/cms/client";
import { getServices } from "@/lib/cms/queries";

/**
 * "Start a project": a guided 3-step brief. Needs come from the services
 * list; the submission goes to the "Project brief" Form Builder form so it
 * shows up in the admin inbox like every other lead.
 */
export async function BriefBuilder() {
  const cms = await getCms();
  const [services, formResult] = await Promise.all([
    getServices(),
    cms.find({
      collection: "forms",
      where: { title: { equals: "Project brief" } },
      limit: 1,
      depth: 0,
    }),
  ]);
  const form = (formResult.docs[0] as Form | undefined) ?? null;
  if (!form) return null;

  const needs = services.map((s) => ({
    label: s.title,
    slug: s.slug,
    tags: (s.tags ?? []).map((t) => t.label),
  }));

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
