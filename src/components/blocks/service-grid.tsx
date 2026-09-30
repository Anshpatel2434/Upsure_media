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
import { getServices } from "@/lib/queries";
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
    <Section tone={tone} padding="none" className="py-14 md:py-[70px] xl:py-20">
      <Container>
        <Reveal direction="left" className="mb-6 md:mb-10">
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
                  "overflow-hidden border-b py-6 first:pt-0 last:border-b-0 md:py-8 xl:py-[34px]",
                  dark ? "border-paper/15" : "border-line-soft",
                )}
              >
                <Link
                  href={`/services/${s.slug}`}
                  className="group relative flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-10"
                >
                  {thumb && (
                    <span
                      aria-hidden
                      className="absolute inset-y-0 left-0 hidden items-center lg:flex"
                    >
                      <span
                        className={cn(
                          "relative block aspect-[4/3] w-[130px] -translate-x-[160px] overflow-hidden rounded-[16px] opacity-0",
                          "transition-[transform,opacity]",
                          smooth,
                          "group-hover:translate-x-0 group-hover:opacity-100",
                        )}
                      >
                        <Image src={thumb.src} alt="" fill sizes="130px" className="object-cover" />
                      </span>
                    </span>
                  )}

                  <span
                    className={cn(
                      "grid min-w-0 flex-1 gap-3 lg:grid-cols-[minmax(0,5fr)_minmax(0,8fr)] lg:items-center lg:gap-10 lg:pr-[160px]",
                      "transition-transform lg:group-hover:translate-x-[160px]",
                      smooth,
                    )}
                  >
                    <span className="relative block pr-14 text-[28px] leading-[1.1] font-bold tracking-[-0.025em] md:text-[34px] lg:pr-0 xl:text-[40px]">
                      {s.title}
                      <span
                        aria-hidden
                        className={cn(
                          "ml-1 inline-block size-[0.2em] rounded-pill align-baseline",
                          dark ? "bg-sun" : "bg-teal",
                        )}
                      />
                      <LongArrowIcon
                        width={44}
                        strokeWidth={1.4}
                        className={cn(
                          "absolute top-[0.35em] right-0 lg:hidden",
                          dark ? "text-sun" : "text-teal",
                        )}
                      />
                    </span>

                    <span className="grid">
                      <span
                        className={cn(
                          "text-base leading-[1.55] md:text-[17px] xl:text-[19px]",
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
                            "hidden flex-wrap gap-x-4 gap-y-1 leading-[1.6] lg:flex lg:self-center lg:text-base lg:opacity-0",
                            "transition-opacity [grid-area:1/1]",
                            smooth,
                            "lg:group-hover:opacity-100 lg:group-hover:delay-150",
                            dark ? "text-paper/70" : "text-ink",
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
                      "hidden shrink-0 items-center gap-4 text-[15px] font-bold lg:flex",
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
                      width={90}
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
