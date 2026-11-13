import { ADDRESS, FOUNDER, HAS_FULL_ADDRESS, ONE_LINER } from "@/content/data";
import { getGlobals } from "@/lib/queries";
import { getSiteUrl } from "@/lib/site";

const KNOWS_ABOUT = [
  "Brand consulting",
  "Branding",
  "Personal branding",
  "Public relations",
  "Social media marketing",
  "Influencer marketing",
  "Performance marketing",
  "E-commerce",
  "Quick commerce",
  "SEO",
  "Answer engine optimisation",
  "Generative engine optimisation",
  "AI solutions",
  "D2C marketing",
  "B2B marketing",
];

/**
 * Organisation schema on every page. It upgrades itself as the details in
 * src/content/data.ts are filled in: with a street address and postcode it
 * also declares LocalBusiness, which is what lets Google tie the site to the
 * Business Profile; with a phone number it publishes that too; with a founder
 * name it names the founder.
 */
export async function SiteSchema() {
  const { settings } = await getGlobals();
  const url = getSiteUrl();
  const types = ["Organization", "MarketingAgency"];
  if (HAS_FULL_ADDRESS) types.push("LocalBusiness");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": types,
    "@id": `${url}/#organization`,
    name: settings.name,
    url,
    logo: `${url}/logo.svg`,
    description: ONE_LINER,
    email: settings.email,
    ...(settings.phone ? { telephone: settings.phone } : {}),
    address: {
      "@type": "PostalAddress",
      ...(ADDRESS.street
        ? { streetAddress: [ADDRESS.building, ADDRESS.street].filter(Boolean).join(", ") }
        : {}),
      addressLocality: ADDRESS.locality,
      addressRegion: ADDRESS.region,
      ...(ADDRESS.postalCode ? { postalCode: ADDRESS.postalCode } : {}),
      addressCountry: ADDRESS.country,
    },
    ...(FOUNDER.name ? { founder: { "@type": "Person", name: FOUNDER.name } } : {}),
    areaServed: { "@type": "Country", name: "India" },
    knowsAbout: KNOWS_ABOUT,
    sameAs: (settings.socials ?? []).map((s) => s.url),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
