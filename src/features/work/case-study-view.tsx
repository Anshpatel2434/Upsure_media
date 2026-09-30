import Link from "next/link";

import type { CaseStudy, Service, Testimonial } from "@/content/types";

import { BlockImage } from "@/components/blocks/block-image";
import { RenderBlocks, type LayoutBlock } from "@/components/blocks/render-blocks";
import { SectionHeader } from "@/components/blocks/section-header";
import { CaseStudyCard } from "@/components/cards/case-study-card";
import { TestimonialCard } from "@/components/cards/testimonial-card";
import { BeforeAfter } from "@/components/ui/before-after";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { LazyVideo } from "@/components/ui/lazy-video";
import { Section } from "@/components/ui/section";
import { Tag } from "@/components/ui/tag";
import { LeadForm } from "@/features/forms/lead-form";
import { getCaseStudies, getForm } from "@/lib/queries";
import { imageProps, isVideo, mediaUrl } from "@/lib/media";
import { renderHighlights } from "@/lib/text";
import { isDoc } from "@/lib/relations";

export async function CaseStudyView({ study }: { study: CaseStudy }) {
  const services = (study.services ?? []).filter((s): s is Service => isDoc(s));
  const [similar, callbackForm] = await Promise.all([
    getCaseStudies({ service: services[0]?.id, exclude: study.id, limit: 4 }),
    getForm("callback"),
  ]);
  const testimonial = isDoc(study.testimonial) ? (study.testimonial as Testimonial) : null;
  const before = imageProps(study.beforeAfter?.before, "large");
  const after = imageProps(study.beforeAfter?.after, "large");
  const videoFile = isVideo(study.video?.file) ? mediaUrl(study.video?.file) : null;
  const poster = imageProps(study.video?.poster, "large");
  const embed = study.video?.url ? toEmbedUrl(study.video.url) : null;

  return (
    <article>
      {/* Hero */}
      <Section grid>
        <Container className="flex flex-col gap-6">
          <Eyebrow>
            <Link href="/work" className="hover:text-teal">
              Work
            </Link>
          </Eyebrow>
          <Heading as="h1" size="display">
            {study.title}
          </Heading>
          <ul className="flex flex-wrap gap-2" aria-label="Services">
            {services.map((s) => (
              <li key={s.id}>
                <Link href={`/services/${s.slug}`}>
                  <Tag tone="teal">{s.title}</Tag>
                </Link>
              </li>
            ))}
            {study.industry && (
              <li>
                <Tag>{study.industry}</Tag>
              </li>
            )}
          </ul>
          {study.intro && <p className="max-w-3xl text-lead text-ink-2">{study.intro}</p>}
          <BlockImage
            media={study.cover}
            size="hero"
            sizes="(min-width: 1280px) 1200px, 100vw"
            aspect="aspect-[16/9]"
            priority
            className="mt-4 rounded-xl"
          />
        </Container>
      </Section>

      {/* Objective + stats */}
      <Section tone="white">
        <Container className="flex flex-col gap-12">
          {study.objective && (
            <p className="max-w-4xl text-h3 font-medium text-balance">
              {renderHighlights(study.objective)}
            </p>
          )}
          {(study.stats?.length ?? 0) > 0 && (
            <dl className="grid gap-8 border-t border-line pt-10 sm:grid-cols-3">
              {study.stats!.map((s) => (
                <div key={s.id ?? s.label} className="flex flex-col gap-2">
                  <dd className="order-first text-display font-semibold text-teal">{s.value}</dd>
                  <dt className="text-muted">{s.label}</dt>
                </div>
              ))}
            </dl>
          )}
        </Container>
      </Section>

      {/* Story sections */}
      {(study.sections?.length ?? 0) > 0 && (
        <Section>
          <Container className="flex flex-col gap-16">
            {study.sections!.map((s, i) => (
              <div
                key={s.id ?? s.heading}
                className={`grid gap-8 lg:grid-cols-2 lg:items-center ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}
              >
                <div className="flex flex-col gap-4">
                  {s.eyebrow && (
                    <Eyebrow index={String(i + 1).padStart(2, "0")}>{s.eyebrow}</Eyebrow>
                  )}
                  <Heading as="h2" size="h2">
                    {s.heading}
                  </Heading>
                  <p className="max-w-prose text-lead text-ink-2">{s.body}</p>
                </div>
                {s.image && (
                  <BlockImage
                    media={s.image}
                    size="large"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    aspect="aspect-[4/3]"
                    className="rounded-xl"
                  />
                )}
              </div>
            ))}
          </Container>
        </Section>
      )}

      {/* Before / after + timeline */}
      {(before && after) || (study.timeline?.length ?? 0) > 0 ? (
        <Section tone="white">
          <Container className="grid gap-12 lg:grid-cols-[3fr_2fr]">
            {before && after ? (
              <BeforeAfter before={before} after={after} caption={study.beforeAfter?.caption} />
            ) : (
              <div />
            )}
            {(study.timeline?.length ?? 0) > 0 && (
              <div className="flex flex-col gap-6">
                <SectionHeader eyebrow="Timeline" heading="How it unfolded" size="h3" />
                <ol className="relative flex flex-col gap-6 border-l-2 border-line pl-6">
                  {study.timeline!.map((t) => (
                    <li key={t.id ?? t.when} className="relative">
                      <span
                        aria-hidden
                        className="absolute top-1.5 -left-[1.9rem] size-3 rounded-pill bg-teal ring-4 ring-white"
                      />
                      <p className="text-small font-semibold tracking-(--text-eyebrow--letter-spacing) text-teal uppercase">
                        {t.when}
                      </p>
                      <p className="text-body">{t.what}</p>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </Container>
        </Section>
      ) : null}

      {/* Video */}
      {(videoFile || embed) && (
        <Section padding="tight">
          <Container>
            {videoFile ? (
              <LazyVideo
                src={videoFile}
                poster={poster?.src}
                className="aspect-video w-full rounded-xl"
                label={`${study.title} video`}
              />
            ) : (
              <div className="aspect-video overflow-hidden rounded-xl bg-paper-2">
                <iframe
                  src={embed!}
                  title={`${study.title} video`}
                  loading="lazy"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="size-full"
                />
              </div>
            )}
          </Container>
        </Section>
      )}

      {/* Extra blocks */}
      <RenderBlocks blocks={study.body as LayoutBlock[] | null} />

      {/* Testimonial + call back */}
      {(testimonial || callbackForm) && (
        <Section tone="paper">
          <Container className="grid gap-10 lg:grid-cols-2">
            {testimonial ? (
              <TestimonialCard testimonial={testimonial} tone="paper" size="lg" />
            ) : (
              <div />
            )}
            {callbackForm && (
              <div className="rounded-xl border border-paper/15 bg-paper/5 p-6 md:p-8">
                <h2 className="text-h3">Want results like these?</h2>
                <p className="mt-2 mb-6 text-paper/70">
                  Leave your number and a senior team member will call you back.
                </p>
                <LeadForm form={callbackForm} tone="paper" />
              </div>
            )}
          </Container>
        </Section>
      )}

      {/* Similar work */}
      {similar.length > 0 && (
        <Section>
          <Container className="flex flex-col gap-12">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <SectionHeader eyebrow="More work" heading="Similar projects" />
              <Button href="/work" variant="ghost" withArrow>
                View all work
              </Button>
            </div>
            <ul className="grid gap-5 md:grid-cols-2">
              {similar.slice(0, 2).map((s) => (
                <li key={s.id}>
                  <CaseStudyCard study={s} />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}
    </article>
  );
}

function toEmbedUrl(url: string): string | null {
  const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{6,})/);
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}`;
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}?dnt=1`;
  return null;
}
