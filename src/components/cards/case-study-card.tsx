import type { CaseStudy, Service } from "@/payload-types";

import { BlockImage } from "@/components/blocks/block-image";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { ArrowRightIcon } from "@/components/ui/icons";
import { Tag } from "@/components/ui/tag";
import { isDoc } from "@/lib/relations";

const serviceTitles = (services: CaseStudy["services"]) =>
  (services ?? []).filter((s): s is Service => isDoc(s)).map((s) => s.title);

export function CaseStudyCard({
  study,
  tone = "white",
  priority = false,
}: {
  study: CaseStudy;
  tone?: "white" | "teal-ink";
  priority?: boolean;
}) {
  const dark = tone === "teal-ink";
  const stat = study.stats?.[0];
  return (
    <Card
      href={`/work/${study.slug}`}
      tone={tone}
      padding="none"
      className="group/card flex h-full flex-col"
    >
      <div className="relative">
        <BlockImage
          media={study.cover}
          size="card"
          sizes="(min-width: 1024px) 50vw, 100vw"
          aspect="aspect-[16/10]"
          rounded={false}
          priority={priority}
        />
        {stat && (
          <span className="absolute top-4 left-4 rounded-md bg-sun px-3 py-1.5 text-small font-semibold text-ink shadow-card">
            {stat.value} {stat.label}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <Heading as="h3" size="h3">
          {study.title}
        </Heading>
        <p className={dark ? "text-paper/75" : "text-ink-2"}>{study.summary}</p>
        <ul className="mt-auto flex flex-wrap gap-2 pt-2" aria-label="Services">
          {serviceTitles(study.services).map((t) => (
            <li key={t}>
              <Tag tone={dark ? "paper" : "line"}>{t}</Tag>
            </li>
          ))}
        </ul>
        <span
          className={`inline-flex items-center gap-2 font-medium ${dark ? "text-sun" : "text-teal"}`}
        >
          View work
          <ArrowRightIcon
            size={18}
            className="transition-transform group-hover/card:translate-x-0.5"
          />
        </span>
      </div>
    </Card>
  );
}
