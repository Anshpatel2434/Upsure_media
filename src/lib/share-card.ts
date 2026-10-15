import { store } from "@/content/store";
import { SITE_NAME } from "@/lib/site";
import { stripHighlights } from "@/lib/text";

/**
 * Content for the 1200×630 link-preview image of each page (WhatsApp,
 * LinkedIn, Slack, X…). Titles keep their `[[highlight]]` markers so the card
 * can colour them; everything else is plain text.
 */
export type ShareCard = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  /** Case studies: client logo slug + brand colour for the side panel. */
  client?: { logo: string; colour: string };
};

/** Brand colours for the case-study share-card panel behind the client logo. */
const CLIENT_COLOURS: Record<string, string> = {
  lenskart: "#0B1F4B",
  hyundai: "#002C5F",
  samsung: "#1428A0",
  decathlon: "#3643BA",
};

/** Plain, emoji-free text cut at a word boundary (emoji would make the renderer fetch images). */
const clip = (text: string | null | undefined, max: number) => {
  const plain = (text ?? "")
    .replace(/\p{Extended_Pictographic}/gu, "")
    .replace(/\s+/g, " ")
    .trim();
  if (plain.length <= max) return plain;
  const cut = plain.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:—–-]+$/, "")}…`;
};

/** Every page that gets its own card, as site paths ("/" for home). */
export function shareCardPaths(): string[] {
  return [
    ...store.pages.map((p) => (p.slug === "home" ? "/" : `/${p.slug}`)),
    ...store.services.map((s) => `/services/${s.slug}`),
    ...store.caseStudies.map((c) => `/work/${c.slug}`),
    ...store.posts.map((p) => `/blog/${p.slug}`),
  ];
}

/** URL of the preview image for a site path, e.g. "/work/samsung" → "/og/work/samsung.png". */
export function shareImagePath(path: string): string {
  const card = path === "/" ? "/index" : path.replace(/\/+$/, "");
  return `/og${card}.png`;
}

export function shareCard(path: string): ShareCard | null {
  const [head, second] = path.split("/").filter(Boolean);

  if (!head) {
    return {
      eyebrow: "D2C & B2B brand and growth agency · Ahmedabad",
      title: "We grow brands people [[love.]]",
      subtitle: "Full-service brand and growth agency for D2C and B2B brands.",
    };
  }
  if (head === "services" && second) {
    const s = store.services.find((x) => x.slug === second);
    return s ? { eyebrow: "Service", title: s.title, subtitle: clip(s.blurb, 120) } : null;
  }
  if (head === "work" && second) {
    const c = store.caseStudies.find((x) => x.slug === second);
    if (!c) return null;
    return {
      eyebrow: `Case study · ${c.industry ?? "Client work"}`,
      title: c.client,
      subtitle: clip(c.summary, 110),
      client: { logo: c.slug, colour: CLIENT_COLOURS[c.slug] ?? "#0A1E21" },
    };
  }
  if (head === "blog" && second) {
    const p = store.posts.find((x) => x.slug === second);
    if (!p) return null;
    const category = typeof p.category === "object" ? p.category?.title : null;
    return { eyebrow: category ? `Blog · ${category}` : "Blog", title: clip(p.title, 90) };
  }

  // Page slugs can span segments, e.g. "industries/d2c".
  const slug = path.replace(/^\/+|\/+$/g, "");
  const page = store.pages.find((p) => p.slug === slug);
  if (!page) return null;
  const hero = page.layout?.find((b) => b.blockType === "hero");
  const heading = hero && "heading" in hero ? hero.heading.replace(/\|/g, " ") : page.title;
  return {
    eyebrow: page.title,
    title: clip(heading, 90),
    subtitle: clip(page.meta?.description, 130) || undefined,
  };
}

/** Plain-text title for `og:image:alt`. */
export function shareCardAlt(card: ShareCard): string {
  return `${stripHighlights(card.title)} | ${SITE_NAME}`;
}
