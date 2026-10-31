import { Suspense } from "react";

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { BriefBuilderForm } from "@/features/brief/brief-builder-form";
import { getForm, getGlobals, getServices } from "@/lib/queries";

/** What a visitor gets for filling the brief in, in the order it happens. */
const STEPS = [
  {
    title: "You send the brief",
    body: "Three steps, about two minutes. Tell us what you need, roughly when and how much.",
  },
  {
    title: "A senior person reads it",
    body: "The people who plan the work are the people who do it. No account manager in between.",
  },
  {
    title: "You hear back within one business day",
    body: "A free 30-minute strategy call, and a plan scoped to what you actually need.",
  },
];

/**
 * "Start a project": a guided 3-step brief. Needs come from the services
 * list; the submission is emailed to the team like every other lead.
 *
 * Two columns from `lg`, matching the lead-form block: the form sits on the
 * right and "what happens next" holds the left, so the highest-intent page on
 * the site answers "what am I signing up for?" instead of leaving the gutters
 * empty either side of a lone form.
 */
export async function BriefBuilder() {
  const [services, form, { settings }] = await Promise.all([
    getServices(),
    getForm("brief"),
    getGlobals(),
  ]);

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
      <Container className="grid gap-12 lg:grid-cols-[2fr_3fr] lg:gap-16">
        <Reveal self={false} as="aside" className="lg:sticky lg:top-28 lg:self-start">
          <RevealItem index={0}>
            <Eyebrow>What happens next</Eyebrow>
          </RevealItem>
          <ol className="mt-6 flex flex-col gap-6">
            {STEPS.map((step, i) => (
              <RevealItem key={step.title} index={i + 1} as="li" className="flex gap-4">
                <span
                  aria-hidden
                  className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-teal-soft text-small font-semibold text-teal"
                >
                  {i + 1}
                </span>
                <span className="flex flex-col gap-1">
                  <span className="font-medium text-ink">{step.title}</span>
                  <span className="text-small text-ink-2">{step.body}</span>
                </span>
              </RevealItem>
            ))}
          </ol>
          <RevealItem index={STEPS.length + 1}>
            <p className="mt-8 border-t border-line pt-6 text-small text-muted">
              Would rather just send an email?{" "}
              <a
                href={`mailto:${settings.email}`}
                className="font-medium text-ink underline underline-offset-4 hover:text-teal"
              >
                {settings.email}
              </a>
            </p>
          </RevealItem>
        </Reveal>

        <div>
          <Suspense fallback={null}>
            <BriefBuilderForm form={form} needs={needs} />
          </Suspense>
        </div>
      </Container>
    </Section>
  );
}
