import type { Service } from "@/payload-types";

import { BlockImage } from "@/components/blocks/block-image";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { ArrowRightIcon } from "@/components/ui/icons";
import { Tag } from "@/components/ui/tag";

export function ServiceCard({
  service,
  priority = false,
}: {
  service: Service;
  priority?: boolean;
}) {
  return (
    <Card
      href={`/services/${service.slug}`}
      padding="none"
      className="group/card flex h-full flex-col"
    >
      <BlockImage
        media={service.cardImage}
        size="card"
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        aspect="aspect-[4/3]"
        rounded={false}
        priority={priority}
      />
      <div className="flex flex-1 flex-col gap-4 p-6">
        {(service.tags?.length ?? 0) > 0 && (
          <ul className="flex flex-wrap gap-2" aria-label="Focus areas">
            {service.tags!.map((t) => (
              <li key={t.id ?? t.label}>
                <Tag>{t.label}</Tag>
              </li>
            ))}
          </ul>
        )}
        <Heading as="h3" size="h3">
          {service.title}
        </Heading>
        <p className="flex-1 text-ink-2">{service.blurb}</p>
        <span className="inline-flex items-center gap-2 font-medium text-teal">
          Know more
          <ArrowRightIcon
            size={18}
            className="transition-transform group-hover/card:translate-x-0.5"
          />
        </span>
      </div>
    </Card>
  );
}
