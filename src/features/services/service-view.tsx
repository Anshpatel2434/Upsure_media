import type { Form, Service } from "@/payload-types";

import { BlockImage } from "@/components/blocks/block-image";
import { RenderBlocks, type LayoutBlock } from "@/components/blocks/render-blocks";
import { SectionHeader } from "@/components/blocks/section-header";
import { CaseStudyCard } from "@/components/cards/case-study-card";
import { TestimonialCard } from "@/components/cards/testimonial-card";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { CheckIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import { Tag } from "@/components/ui/tag";
import { LeadForm } from "@/features/forms/lead-form";
import { getCms } from "@/lib/cms/client";
import { getCaseStudies, getFaqs, getTestimonials } from "@/lib/cms/queries";
import { renderHighlights } from "@/lib/text";

/**
 * Service detail: hero with inline consultation form, checklist, related work,
 * service testimonials, service FAQs, plus any extra CMS blocks.
 */
export async function ServiceView({ service }: { service: Service }) {
  const cms = await getCms();
  const [form, work, testimonials, faqs] = await Promise.all([
    typeof service.form === "object"
      ? Promise.resolve(service.form as Form)
      : service.form
        ? (cms
            .findByID({ collection: "forms", id: service.form, depth: 0 })
            .catch(() => null) as Promise<Form | null>)
        : Promise.resolve(null),
    getCaseStudies({ ids: service.relatedWork, service: service.id, limit: 4 }),
    getTestimonials({ service: service.id }),
    getFaqs({ service: service.id }),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.blurb,
    provider: { "@type": "Organization", name: "Upsure" },
    areaServed: "Worldwide",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero + inline form */}
      <Section grid>
        <Container className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <div className="flex flex-col gap-6">
            <Eyebrow>{service.eyebrow ?? service.title}</Eyebrow>
            <Heading as="h1" size="h1">
              {renderHighlights(service.heading)}
            </Heading>
            {(service.subServices?.length ?? 0) > 0 && (
              <ul className="flex flex-wrap gap-2" aria-label="What's included">
                {service.subServices!.map((s) => (
                  <li key={s.id ?? s.label}>
                    <Tag>{s.label}</Tag>
                  </li>
                ))}
              </ul>
            )}
            {service.lead && <p className="max-w-2xl text-lead text-ink-2">{service.lead}</p>}
            {service.heroImage && (
              <BlockImage
                media={service.heroImage}
                size="large"
                sizes="(min-width: 1024px) 50vw, 100vw"
                aspect="aspect-[4/3]"
                priority
                className="rounded-xl"
              />
            )}
          </div>
          {form && (
            <div
              id="lead-form"
              className="rounded-xl border border-line bg-white p-6 shadow-card md:p-8 lg:sticky lg:top-24"
            >
              <h2 className="text-h3">
                Request a <span className="highlight">free consultation</span> today
              </h2>
              <p className="mt-2 mb-6 text-small text-muted">We reply within one business day.</p>
              <LeadForm form={form} />
            </div>
          )}
        </Container>
      </Section>

      {/* Checklist */}
      {(service.checklist?.length ?? 0) > 0 && (
        <Section tone="white">
          <Container className="grid gap-10 lg:grid-cols-2">
            <SectionHeader
              index={1}
              eyebrow="What we do"
              heading={service.checklistHeading ?? `What ${service.title.toLowerCase()} includes`}
              intro={service.checklistIntro}
            />
            <ul className="grid gap-3 sm:grid-cols-2">
              {service.checklist!.map((c) => (
                <li
                  key={c.id ?? c.item}
                  className="flex items-start gap-3 rounded-lg border border-line bg-paper p-4"
                >
                  <CheckIcon className="mt-0.5 shrink-0 text-teal" />
                  <span className="font-medium">{c.item}</span>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      {/* Extra CMS blocks */}
      <RenderBlocks blocks={service.body as LayoutBlock[] | null} />

      {/* Related work */}
      {work.length > 0 && (
        <Section tone="teal-ink">
          <Container className="flex flex-col gap-12">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <SectionHeader
                index={2}
                eyebrow="Work"
                heading={`${service.title} in practice`}
                tone="paper"
              />
              <Button href="/work" variant="ghost" tone="paper" withArrow>
                View all work
              </Button>
            </div>
            <ul className="grid gap-5 md:grid-cols-2">
              {work.map((w) => (
                <li key={w.id}>
                  <CaseStudyCard study={w} tone="teal-ink" />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <Section>
          <Container className="grid gap-5 md:grid-cols-2">
            {testimonials.slice(0, 2).map((t) => (
              <TestimonialCard key={t.id} testimonial={t} tone="white" />
            ))}
          </Container>
        </Section>
      )}

      {/* FAQs */}
      {faqs.length > 0 && (
        <Section tone="white">
          <Container className="grid gap-10 lg:grid-cols-[1fr_2fr]">
            <SectionHeader index={3} eyebrow="FAQ" heading="Good questions" />
            <Accordion
              name="service-faq"
              items={faqs.map((f) => ({
                id: String(f.id),
                title: f.question,
                content: <p>{f.answer}</p>,
              }))}
            />
          </Container>
        </Section>
      )}
    </>
  );
}
