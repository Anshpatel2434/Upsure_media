import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { resolveRoute } from "@/features/site/resolve";
import { getAllRoutes } from "@/lib/queries";

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
  return result.node;
}
