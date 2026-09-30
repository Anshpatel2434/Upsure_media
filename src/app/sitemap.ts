import type { MetadataRoute } from "next";

import { getAllRoutes } from "@/lib/queries";
import { getSiteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  let routes: { path: string; updatedAt: string }[] = [];
  try {
    routes = await getAllRoutes();
  } catch {
    routes = [{ path: "/", updatedAt: new Date().toISOString() }];
  }
  return routes.map(({ path, updatedAt }) => ({
    url: `${base}${path === "/" ? "" : path}`,
    lastModified: updatedAt,
    changeFrequency: path.startsWith("/blog") ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.split("/").length <= 2 ? 0.8 : 0.6,
  }));
}
