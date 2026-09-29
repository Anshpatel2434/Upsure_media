import Link from "next/link";

import type { Service } from "@/payload-types";

import type { BlockProps } from "@/components/blocks/render-blocks";
import { SectionHeader } from "@/components/blocks/section-header";
import { Container } from "@/components/ui/container";
import { ArrowRightIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/cn";

/**
 * "How can we help you?" pills. Each need links to its service page and
 * carries the need text to the brief builder via ?need=… so the form is
 * pre-filled when the visitor decides to start a project.
 */
export function NeedPickerBlock({ block, index }: BlockProps<"needPicker">) {
  const items = block.items ?? [];
  const tone = block.tone ?? "paper-2";
  const dark = tone === "teal-ink" || tone === "teal";

  return (
    <Section tone={tone}>
      <Container className="flex flex-col gap-10">
        <SectionHeader
          index={index}
          eyebrow={block.eyebrow}
          heading={block.heading}
          intro={block.subheading}
          tone={dark ? "paper" : "ink"}
        />
        <ul className="flex flex-wrap gap-3">
          {items.map((item) => {
            const service = typeof item.service === "object" ? (item.service as Service) : null;
            const href = service
              ? `/services/${service.slug}?need=${encodeURIComponent(item.label)}`
              : `/start-a-project?need=${encodeURIComponent(item.label)}`;
            return (
              <li key={item.id ?? item.label}>
                <Link
                  href={href}
                  className={cn(
                    "group inline-flex items-center gap-3 rounded-pill border px-5 py-3 text-body font-medium transition-[border-color,background-color,color,transform] duration-(--duration-fast) hover:-translate-y-0.5",
                    dark
                      ? "border-paper/30 text-paper hover:border-sun hover:bg-paper hover:text-ink"
                      : "border-line-strong bg-white text-ink hover:border-teal hover:bg-teal hover:text-white",
                  )}
                >
                  {item.label}
                  <ArrowRightIcon
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
