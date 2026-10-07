import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { resolveRoute } from "@/features/site/resolve";
import { getAllRoutes } from "@/lib/queries";
import { getSiteUrl } from "@/lib/site";

/**
 * Every public content route, pre-rendered at build time from the static
 * content in src/content. Unknown paths 404.
 */
export const dynamicParams = false;

export async function generateStaticParams() {
  const routes = await getAllRoutes();
  return routes.map(({ path }) => ({ segments: path.split("/").filter(Boolean) }));
}

type Props = { params: Promise<{ segments?: string[] }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { segments = [] } = await params;
  const result = await resolveRoute(segments);
  return result?.metadata ?? {};
}

export default async function ContentPage({ params }: Props) {
  const { segments = [] } = await params;
  const result = await resolveRoute(segments);
  if (!result) notFound();
  return (
    <>
      {segments.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbs(segments, result.metadata)),
          }}
        />
      )}
      {result.node}
    </>
  );
}

const SECTION_NAMES: Record<string, string> = {
  services: "Services",
  industries: "Industries",
  work: "Work",
  blog: "Insights",
  category: "Topics",
  service: "By service",
  industry: "By industry",
};

/** BreadcrumbList for inner pages: Home › section › … › this page. */
function breadcrumbs(segments: string[], metadata: Metadata) {
  const base = getSiteUrl();
  const title =
    typeof metadata.title === "string"
      ? metadata.title
      : metadata.title && "absolute" in metadata.title
        ? metadata.title.absolute
        : segments.at(-1);
  const pageName = String(title ?? "").split(" | ")[0];
  const items = [{ name: "Home", url: base }];
  segments.forEach((seg, i) => {
    const last = i === segments.length - 1;
    items.push({
      name: (last ? pageName : SECTION_NAMES[seg]) || seg,
      url: `${base}/${segments.slice(0, i + 1).join("/")}`,
    });
  });
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
