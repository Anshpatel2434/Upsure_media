import Link from "next/link";

import type { Service } from "@/content/types";

import type { BlockProps } from "@/components/blocks/render-blocks";
import { SectionHeader } from "@/components/blocks/section-header";
import { Container } from "@/components/ui/container";
import { ArrowRightIcon } from "@/components/ui/icons";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/cn";
import { isDoc } from "@/lib/relations";

/**
 * "How can we help you?" pills. Heading sits on the right; the pills wrap in a
 * wide ragged block on the left. Each need links to its service page and
 * carries the need text to the brief builder via ?need=.
 */
export function NeedPickerBlock({ block, index }: BlockProps<"needPicker">) {
  const items = block.items ?? [];
  const tone = block.tone ?? "paper-2";
  const dark = tone === "teal-ink" || tone === "teal";

  return (
    <Section tone={tone}>
      <Container>
        <Reveal self={false} className="grid gap-10 lg:grid-cols-12">
          <SectionHeader
            index={index}
            eyebrow={block.eyebrow}
            heading={block.heading}
            intro={block.subheading}
            tone={dark ? "paper" : "ink"}
            className="lg:order-2 lg:col-span-4"
            align="right"
          />
          <ul className="flex flex-wrap gap-3 lg:order-1 lg:col-span-8">
            {items.map((item, i) => {
              const service = isDoc(item.service) ? (item.service as Service) : null;
              const href = service
                ? `/services/${service.slug}?need=${encodeURIComponent(item.label)}`
                : `/start-a-project?need=${encodeURIComponent(item.label)}`;
              return (
                <RevealItem as="li" key={item.id ?? item.label} index={i + 3}>
                  <Link
                    href={href}
                    className={cn(
                      "group inline-flex items-center gap-3 rounded-pill border px-5 py-3 text-lead font-medium transition-[border-color,background-color,color,transform,box-shadow] duration-(--duration-base) ease-(--ease-smooth) hover:-translate-y-0.5 hover:shadow-card",
                      dark
                        ? "border-paper/30 text-paper hover:border-sun hover:bg-sun hover:text-ink"
                        : "border-line-strong bg-white text-ink hover:border-teal hover:bg-teal hover:text-white",
                    )}
                  >
                    {item.label}
                    <ArrowRightIcon
                      size={18}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </RevealItem>
              );
            })}
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}
