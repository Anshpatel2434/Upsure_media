import type { CaseStudy, Service } from "@/payload-types";

import { MediaTile, TILE_COLOURS } from "@/components/cards/media-tile";
import { isDoc } from "@/lib/relations";

export { TILE_COLOURS as WORK_TILE_COLOURS };

/** Case-study tile: cover photo, title, "View work" and its service pills. */
export function WorkTile({
  study,
  colour,
  priority = false,
  className,
}: {
  study: CaseStudy;
  colour?: string;
  priority?: boolean;
  className?: string;
}) {
  const services = (study.services ?? []).filter((s): s is Service => isDoc(s));
  return (
    <MediaTile
      href={`/work/${study.slug}`}
      label={`View ${study.title} case study`}
      title={study.title}
      image={study.cover}
      action="View work"
      excerpt={study.summary}
      pills={services.map((s) => ({ href: `/services/${s.slug}`, label: s.title }))}
      colour={colour}
      priority={priority}
      className={className}
    />
  );
}
