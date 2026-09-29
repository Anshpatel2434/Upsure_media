import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { resolveRoute } from "@/features/site/resolve";
import { getAllRoutes } from "@/lib/cms/queries";

/**
 * Every public content route. Rendered statically at build time and
 * regenerated on demand when the CMS publishes (see payload/hooks/revalidate).
 * New slugs that were not known at build time render on first request.
 */
export const dynamicParams = true;

export async function generateStaticParams() {
  if (!process.env.DATABASE_URI) return [];
  try {
    const routes = await getAllRoutes();
    return routes.map(({ path }) => ({ segments: path.split("/").filter(Boolean) }));
  } catch {
    return [];
  }
}

type Props = { params: Promise<{ segments?: string[] }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { segments = [] } = await params;
  const result = await resolveRoute(segments, { draft: false });
  return result?.metadata ?? {};
}

export default async function ContentPage({ params }: Props) {
  const { segments = [] } = await params;
  const result = await resolveRoute(segments, { draft: false });
  if (!result) notFound();
  return result.node;
}
