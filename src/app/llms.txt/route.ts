import { ONE_LINER, services } from "@/content/data";
import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-static";

/**
 * /llms.txt: a plain-text summary AI tools read to understand the company
 * (copy update, section 9.3). Built from the same data as the site.
 */
export function GET() {
  const base = "https://www.upsuremedia.com";
  const site = getSiteUrl().includes("localhost") ? base : getSiteUrl();
  const body = [
    "# Upsure Media",
    "",
    `> ${ONE_LINER}`,
    "",
    "- Location: Ahmedabad, Gujarat, India",
    "- Clients: 100+ brands, from D2C startups to companies such as Lenskart, Hyundai, Samsung and Decathlon",
    "- Contact: upsureai@gmail.com",
    "",
    "## Services",
    "",
    ...services.map((s) => `- [${s.title}](${site}/services/${s.slug})`),
    "",
    "## Industries",
    "",
    `- [D2C brands](${site}/industries/d2c)`,
    `- [B2B companies](${site}/industries/b2b)`,
    "",
  ].join("\n");
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
