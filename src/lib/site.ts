/** Absolute origin of the site, no trailing slash. */
export function getSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/+$/, "");
}

export const SITE_NAME = "Upsure";
export const SITE_TITLE = "Upsure – Creative & growth agency in Ahmedabad";
