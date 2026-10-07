import Link from "next/link";

import { WORK_TILE_COLOURS, WorkTile } from "@/components/cards/work-tile";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { getCaseStudies, getServices } from "@/lib/queries";
import { cn } from "@/lib/cn";

type Segment = "D2C" | "B2B";

/**
 * All case studies with filters for industry (D2C / B2B) and service. Filters
 * are plain links to /work/industry/[d2c|b2b] and /work/service/[slug], so the
 * page stays static and works without JS.
 */
export async function WorkListing({
  serviceSlug,
  segment,
}: { serviceSlug?: string; segment?: Segment } = {}) {
  const services = await getServices();
  const active = serviceSlug ? services.find((s) => s.slug === serviceSlug) : undefined;
  const studies = await getCaseStudies({ service: active?.id, segment, limit: 100 });
  const all = !active && !segment;

  const filters = [
    { label: "All", href: "/work", on: all },
    { label: "D2C", href: "/work/industry/d2c", on: segment === "D2C" },
    { label: "B2B", href: "/work/industry/b2b", on: segment === "B2B" },
    ...services.map((s) => ({
      label: s.title,
      href: `/work/service/${s.slug}`,
      on: active?.id === s.id,
    })),
  ];

  return (
    <Section tone="white" padding="tight">
      <Container className="flex flex-col gap-10">
        <nav aria-label="Filter by industry or service">
          <ul className="flex flex-wrap gap-2">
            {filters.map((f, i) => (
              <li key={f.href} className={cn(i === 2 && "mr-3 md:mr-5")}>
                <Link href={f.href} className={pill(f.on)} aria-current={f.on ? "page" : undefined}>
                  {f.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {studies.length ? (
          <ul className="grid gap-5 md:grid-cols-2">
            {studies.map((s, i) => (
              <li key={s.id}>
                <WorkTile
                  study={s}
                  colour={WORK_TILE_COLOURS[i % WORK_TILE_COLOURS.length]}
                  priority={i < 2}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-lead text-muted">
            {segment === "B2B"
              ? "B2B case studies are on their way. Ask us for examples on a call."
              : "Case studies for this service are on their way. Ask us for examples on a call."}
          </p>
        )}
      </Container>
    </Section>
  );
}

const pill = (active: boolean) =>
  cn(
    "inline-flex h-10 items-center rounded-pill border px-4 text-body font-medium transition-colors",
    active
      ? "border-ink bg-ink text-paper"
      : "border-line-strong text-ink hover:border-teal hover:text-teal",
  );
