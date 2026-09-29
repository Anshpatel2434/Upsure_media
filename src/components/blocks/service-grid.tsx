import Link from "next/link";

import type { BlockProps } from "@/components/blocks/render-blocks";
import { SectionHeader } from "@/components/blocks/section-header";
import { ServiceCard } from "@/components/cards/service-card";
import { Container } from "@/components/ui/container";
import { ArrowRightIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import { Tag } from "@/components/ui/tag";
import { getServices } from "@/lib/cms/queries";
import { cn } from "@/lib/cn";

export async function ServiceGridBlock({ block, index }: BlockProps<"serviceGrid">) {
  const services = await getServices(block.services);
  if (!services.length) return null;
  const tone = block.tone ?? "paper";
  const dark = tone === "teal-ink" || tone === "teal";

  return (
    <Section tone={tone}>
      <Container className="flex flex-col gap-12">
        <SectionHeader
          index={index}
          eyebrow={block.eyebrow}
          heading={block.heading}
          intro={block.intro}
          tone={dark ? "paper" : "ink"}
        />

        {block.layout === "accordion" ? (
          <ol
            className={cn(
              "divide-y border-y",
              dark ? "divide-paper/15 border-paper/15" : "divide-line border-line",
            )}
          >
            {services.map((s, i) => (
              <li key={s.id}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group grid gap-4 py-8 transition-colors md:grid-cols-[4rem_1fr_1fr_3rem] md:items-start"
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
                    <span className="text-h3 font-medium group-hover:underline group-hover:decoration-teal group-hover:underline-offset-4">
                      {s.title}
                    </span>
                    <span className="flex flex-wrap gap-2">
                      {(s.tags ?? []).map((t) => (
                        <Tag key={t.id ?? t.label} tone={dark ? "paper" : "line"}>
                          {t.label}
                        </Tag>
                      ))}
                    </span>
                  </span>
                  <span className={dark ? "text-paper/75" : "text-ink-2"}>{s.blurb}</span>
                  <ArrowRightIcon className="hidden justify-self-end transition-transform group-hover:translate-x-1 md:block" />
                </Link>
              </li>
            ))}
          </ol>
        ) : (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <li key={s.id}>
                <ServiceCard service={s} priority={i < 3 && index === 1} />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </Section>
  );
}
