/** Absolute origin of the site, no trailing slash. */
export function getSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/+$/, "");
}

export const SITE_NAME = "Upsure Media";
export const SITE_TITLE = "Upsure Media – D2C & B2B Brand and Growth Agency in Ahmedabad, India";
