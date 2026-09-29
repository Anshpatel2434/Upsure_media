import Image from "next/image";
import Link from "next/link";

import type { BlockProps } from "@/components/blocks/render-blocks";
import { SectionHeader } from "@/components/blocks/section-header";
import { ServiceCard } from "@/components/cards/service-card";
import { Container } from "@/components/ui/container";
import { ArrowRightIcon } from "@/components/ui/icons";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { getServices } from "@/lib/cms/queries";
import { cn } from "@/lib/cn";
import { imageProps } from "@/lib/media";

/**
 * Services as an editorial ledger: numbered rows, a big title with an accent
 * dot, one-line promise, bullet-separated sub-services and an arrow link. On
 * desktop a thumbnail slides in on the right while the row is hovered.
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

  return (
    <Section tone={tone}>
      <Container>
        <Reveal self={false} className="grid gap-12 lg:grid-cols-12">
          <SectionHeader
            index={index}
            eyebrow={block.eyebrow}
            heading={block.heading}
            intro={block.intro}
            tone={dark ? "paper" : "ink"}
            className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start"
          />
          <ol className={cn("lg:col-span-8", dark ? "divide-paper/15" : "divide-line", "divide-y")}>
            {services.map((s, i) => {
              const thumb = imageProps(s.cardImage, "card");
              return (
                <RevealItem as="li" key={s.id} index={i + 2} className="relative">
                  <Link
                    href={`/services/${s.slug}`}
                    className="group grid gap-4 py-9 md:grid-cols-[3.5rem_1fr_auto] md:items-start md:gap-8"
                  >
                    <span
                      className={cn(
                        "text-small font-semibold tabular-nums",
                        dark ? "text-sun" : "text-teal",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex flex-col gap-3">
                      <span className="flex items-center gap-3 text-h2 font-semibold">
                        {s.title}
                        <span
                          aria-hidden
                          className={cn(
                            "inline-block size-3 rounded-pill transition-transform duration-(--duration-base) group-hover:scale-150",
                            dark ? "bg-sun" : "bg-teal-soft group-hover:bg-teal",
                          )}
                        />
                      </span>
                      <span
                        className={cn(
                          "max-w-[56ch] text-lead",
                          dark ? "text-paper/80" : "text-ink-2",
                        )}
                      >
                        {s.blurb}
                      </span>
                      <span className={cn("text-body", dark ? "text-paper/60" : "text-muted")}>
                        {(s.subServices?.length
                          ? s.subServices.map((x) => x.label)
                          : (s.tags ?? []).map((t) => t.label)
                        ).join(" • ")}
                      </span>
                      <span
                        className={cn(
                          "mt-1 inline-flex items-center gap-2 font-medium",
                          dark ? "text-sun" : "text-teal",
                        )}
                      >
                        More info
                        <ArrowRightIcon
                          size={18}
                          className="transition-transform duration-(--duration-base) group-hover:translate-x-2"
                        />
                      </span>
                    </span>
                    {thumb && (
                      <span
                        aria-hidden
                        className="hidden w-40 overflow-hidden rounded-lg opacity-0 shadow-lift transition-[opacity,transform] duration-(--duration-slow) ease-(--ease-smooth) group-hover:translate-x-0 group-hover:opacity-100 md:block md:translate-x-4 md:-rotate-2"
                      >
                        <Image
                          src={thumb.src}
                          alt=""
                          width={thumb.width}
                          height={thumb.height}
                          className="aspect-[4/3] object-cover"
                        />
                      </span>
                    )}
                  </Link>
                </RevealItem>
              );
            })}
          </ol>
        </Reveal>
      </Container>
    </Section>
  );
}
