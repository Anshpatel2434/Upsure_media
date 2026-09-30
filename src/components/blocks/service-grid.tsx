import Image from "next/image";
import Link from "next/link";

import type { BlockProps } from "@/components/blocks/render-blocks";
import { SectionHeader } from "@/components/blocks/section-header";
import { ServiceCard } from "@/components/cards/service-card";
import { ArrowPill } from "@/components/ui/arrow-pill";
import { Container } from "@/components/ui/container";
import { LongArrowIcon } from "@/components/ui/icons";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { getServices } from "@/lib/cms/queries";
import { cn } from "@/lib/cn";
import { imageProps } from "@/lib/media";

/**
 * Services as full-width rows: a big title with an accent dot and a one-line
 * promise. On desktop hover the row opens up: a thumbnail slides in from the
 * left and pushes the text across, the promise cross-fades into the list of
 * sub-services, and the long arrow on the right picks up a "More info" label
 * and starts to nudge. Touch screens get the sub-services and link inline.
 * `layout: "cards"` keeps the image-tile grid for pages that want it.
 */
export async function ServiceGridBlock({ block, index }: BlockProps<"serviceGrid">) {
  const services = await getServices(block.services);
  if (!services.length) return null;
  const tone = block.tone ?? "paper";
  const dark = tone === "teal-ink" || tone === "teal";

  if (block.layout === "cards") {
    return (
      <Section tone={tone}>
        <Container>
          <Reveal self={false} className="flex flex-col gap-12">
            <SectionHeader
              index={index}
              eyebrow={block.eyebrow}
              heading={block.heading}
              intro={block.intro}
              tone={dark ? "paper" : "ink"}
            />
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s, i) => (
                <RevealItem as="li" key={s.id} index={i + 2}>
                  <ServiceCard service={s} priority={i < 3 && index === 1} />
                </RevealItem>
              ))}
            </ul>
          </Reveal>
        </Container>
      </Section>
    );
  }

  const smooth = "duration-500 ease-(--ease-smooth)";

  return (
    <Section tone={tone} padding="none" className="py-[60px] md:py-[80px] xl:py-[100px]">
      <Container>
        <Reveal direction="left" className="mb-[35px] md:mb-[50px]">
          <ArrowPill as="h2" tone={dark ? "dark" : "light"}>
            {block.eyebrow ?? block.heading ?? "Our services"}
          </ArrowPill>
        </Reveal>
        {block.intro && <p className="sr-only">{block.intro}</p>}

        <ul>
          {services.map((s) => {
            const thumb = imageProps(s.cardImage, "card");
            const subs = s.subServices?.length
              ? s.subServices.map((x) => x.label)
              : (s.tags ?? []).map((t) => t.label);
            return (
              <Reveal
                as="li"
                key={s.id}
                className={cn(
                  "overflow-hidden border-b py-[35px] first:pt-0 last:border-b-0 md:py-[50px]",
                  dark ? "border-paper/15" : "border-line-soft",
                )}
              >
                <Link href={`/services/${s.slug}`} className="group relative block">
                  {thumb && (
                    <span
                      aria-hidden
                      className={cn(
                        "absolute top-0 left-0 hidden aspect-[5/4] w-[250px] -translate-x-[280px] overflow-hidden rounded-[22px] opacity-0 xl:block",
                        "transition-[transform,opacity]",
                        smooth,
                        "group-hover:translate-x-0 group-hover:opacity-100",
                      )}
                    >
                      <Image src={thumb.src} alt="" fill sizes="250px" className="object-cover" />
                    </span>
                  )}

                  <span
                    className={cn(
                      "block transition-transform xl:group-hover:translate-x-[280px]",
                      smooth,
                    )}
                  >
                    <span className="block text-[32px] leading-[1.1] font-bold tracking-[-0.025em] md:text-[42px] lg:max-w-[calc(100%-260px)] xl:max-w-[calc(100%-560px)] xl:text-[53px]">
                      {s.title}
                      <span
                        aria-hidden
                        className={cn(
                          "ml-1 inline-block size-[0.2em] rounded-pill align-baseline",
                          dark ? "bg-sun" : "bg-teal",
                        )}
                      />
                    </span>

                    <span className="mt-4 grid md:mt-5 lg:pr-[440px] xl:pr-[550px]">
                      <span
                        className={cn(
                          "text-[18px] leading-[1.5] md:text-[24px] xl:text-[33px]",
                          "transition-opacity [grid-area:1/1]",
                          smooth,
                          "lg:group-hover:opacity-0",
                          dark ? "text-paper/85" : "text-ink-2",
                        )}
                      >
                        {s.blurb}
                      </span>
                      {subs.length > 0 && (
                        <span
                          className={cn(
                            "mt-4 flex flex-wrap gap-x-5 gap-y-1 text-[15px] leading-[1.6] lg:mt-0 lg:self-center lg:text-[20px] lg:opacity-0 xl:text-[22px]",
                            "[grid-row:2] transition-opacity lg:[grid-area:1/1]",
                            smooth,
                            "lg:group-hover:opacity-100 lg:group-hover:delay-150",
                            dark ? "text-paper/70" : "text-muted lg:text-ink",
                          )}
                        >
                          {subs.map((label) => (
                            <span key={label} className="inline-flex items-center gap-2">
                              <span
                                aria-hidden
                                className={cn("size-1.5 rounded-pill", dark ? "bg-sun" : "bg-teal")}
                              />
                              {label}
                            </span>
                          ))}
                        </span>
                      )}
                    </span>
                  </span>

                  <span
                    className={cn(
                      "mt-6 flex items-center gap-4 text-[15px] font-bold lg:absolute lg:top-[0.35em] lg:right-0 lg:mt-0 xl:top-3",
                      dark ? "text-sun" : "text-teal",
                    )}
                  >
                    <span
                      className={cn(
                        "transition-[opacity,transform] lg:translate-x-3 lg:opacity-0 lg:group-hover:translate-x-0 lg:group-hover:opacity-100",
                        smooth,
                      )}
                    >
                      More info<span className="sr-only"> about {s.title}</span>
                    </span>
                    <LongArrowIcon
                      width={120}
                      strokeWidth={1.4}
                      className="shrink-0 lg:group-hover:nudge"
                    />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
