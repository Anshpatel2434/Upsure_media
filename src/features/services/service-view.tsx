import Link from "next/link";

import type { Form, Service } from "@/content/types";

import { BlockImage } from "@/components/blocks/block-image";
import { RenderBlocks, type LayoutBlock } from "@/components/blocks/render-blocks";
import { SectionHeader } from "@/components/blocks/section-header";
import { WORK_TILE_COLOURS, WorkTile } from "@/components/cards/work-tile";
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
import { TextLink } from "@/components/ui/text-link";
import { getCaseStudies, getFaqs, getServices, getTestimonials } from "@/lib/queries";
import { renderHighlights } from "@/lib/text";
import { isDoc } from "@/lib/relations";

/**
 * Service detail: hero with inline consultation form, "What we do" list,
 * "Who it's for" (D2C / B2B), extra blocks, related work, the service's
 * testimonial slot and its FAQ (with FAQPage schema).
 */
export async function ServiceView({ service }: { service: Service }) {
  const form = isDoc(service.form) ? (service.form as Form) : null;
  const [work, testimonials, faqs, allServices] = await Promise.all([
    getCaseStudies({ ids: service.relatedWork, service: service.id, limit: 4 }),
    getTestimonials({ service: service.id }),
    getFaqs({ service: service.id }),
    getServices(),
  ]);
  // 2–3 related services: same menu group first, then the next ones in menu order.
  const others = allServices.filter((s) => s.id !== service.id);
  const related = [
    ...others.filter((s) => s.group === service.group),
    ...others.filter((s) => s.group !== service.group && (s.order ?? 0) > (service.order ?? 0)),
    ...others,
  ]
    .filter((s, i, all) => all.indexOf(s) === i)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.blurb,
    provider: { "@type": "MarketingAgency", name: "Upsure Media" },
    areaServed: { "@type": "Country", name: "India" },
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
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <Button
                href={`/start-a-project?need=${encodeURIComponent(service.title)}`}
                size="lg"
                withArrow
              >
                Book a free strategy call
              </Button>
              <TextLink href={`/work/service/${service.slug}`}>See our work</TextLink>
            </div>
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
                Request a <span className="text-teal">free consultation</span> today
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

      {/* Who it's for */}
      {service.whoFor && (
        <Section tone="paper">
          <Container className="flex flex-col gap-10">
            <SectionHeader eyebrow="Who it's for" heading={`Who ${service.title} is for`} />
            <ul className="grid gap-5 md:grid-cols-2">
              {(
                [
                  ["D2C brands", service.whoFor.d2c, "/industries/d2c"],
                  ["B2B companies", service.whoFor.b2b, "/industries/b2b"],
                ] as const
              ).map(([label, text, href]) => (
                <li
                  key={label}
                  className="flex flex-col gap-4 rounded-[22px] bg-white p-6 shadow-card md:p-8"
                >
                  <h3 className="text-h3">{label}</h3>
                  <p className="text-lead text-ink-2">{text}</p>
                  <Link
                    href={href}
                    className="mt-auto text-small font-semibold text-teal underline-offset-4 hover:underline"
                  >
                    See how we grow {label}
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      {/* Extra blocks (e.g. definitions, platform lists) */}
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
              {work.map((w, i) => (
                <li key={w.id}>
                  <WorkTile study={w} colour={WORK_TILE_COLOURS[i % WORK_TILE_COLOURS.length]} />
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
              <TestimonialCard key={t.id} testimonial={t} tone="ink" />
            ))}
          </Container>
        </Section>
      )}

      {/* Related services */}
      {related.length > 0 && (
        <Section tone="paper" padding="tight">
          <Container className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <h2 className="text-h3 font-semibold">Related services</h2>
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {related.map((r) => (
                <li key={r.id}>
                  <TextLink href={`/services/${r.slug}`} tone="teal" arrowWidth={34}>
                    {r.title}
                  </TextLink>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      {/* FAQs */}
      {faqs.length > 0 && (
        <Section tone="white">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: faqs.map((f) => ({
                  "@type": "Question",
                  name: f.question,
                  acceptedAnswer: { "@type": "Answer", text: f.answer },
                })),
              }),
            }}
          />
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
