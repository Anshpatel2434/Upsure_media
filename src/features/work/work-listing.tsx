import Link from "next/link";

import { WORK_TILE_COLOURS, WorkTile } from "@/components/cards/work-tile";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { getCaseStudies, getServices } from "@/lib/queries";
import { cn } from "@/lib/cn";

/**
 * All case studies with a service filter. Filters are plain links to
 * /work/service/[slug], so the page stays static and works without JS.
 */
export async function WorkListing({ serviceSlug }: { serviceSlug?: string } = {}) {
  const services = await getServices();
  const active = serviceSlug ? services.find((s) => s.slug === serviceSlug) : undefined;
  const studies = await getCaseStudies({ service: active?.id, limit: 100 });

  return (
    <Section tone="white" padding="tight">
      <Container className="flex flex-col gap-10">
        <nav aria-label="Filter by service">
          <ul className="flex flex-wrap gap-2">
            <li>
              <Link
                href="/work"
                className={pill(!active)}
                aria-current={!active ? "page" : undefined}
              >
                All work
              </Link>
            </li>
            {services.map((s) => (
              <li key={s.id}>
                <Link
                  href={`/work/service/${s.slug}`}
                  className={pill(active?.id === s.id)}
                  aria-current={active?.id === s.id ? "page" : undefined}
                >
                  {s.title}
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
          <p className="text-lead text-muted">No case studies for this service yet.</p>
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
