import { ONE_LINER } from "@/content/data";
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
 * Organisation schema on every page: Upsure Media as a MarketingAgency with a
 * city-level address only (no street, phone or founder, per the copy rules).
 */
export async function SiteSchema() {
  const { settings } = await getGlobals();
  const url = getSiteUrl();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Organization", "MarketingAgency"],
    "@id": `${url}/#organization`,
    name: settings.name,
    url,
    logo: `${url}/logo.svg`,
    description: ONE_LINER,
    email: settings.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ahmedabad",
      addressRegion: "Gujarat",
      addressCountry: "IN",
    },
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
