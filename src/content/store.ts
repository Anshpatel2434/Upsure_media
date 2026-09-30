/**
 * Builds typed, fully resolved documents from `data.ts` once per server
 * process. Everything is static: pages render at build time and nothing is
 * read from a database. Relations in the data are written as keys (media keys,
 * service slugs, form keys); this module turns them into the documents the
 * components expect.
 */

import * as data from "./data";
import logoManifest from "./logo-manifest.json";
import manifest from "./media-manifest.json";
import type {
  Author,
  CaseStudy,
  Category,
  Client,
  CtaBand,
  Faq,
  Footer,
  Form,
  Header,
  Media,
  Page,
  Post,
  Service,
  SiteSetting,
  TeamMember,
  Testimonial,
} from "./types";

type ManifestEntry = { file: string; width: number; height: number; blur?: string };

let seq = 0;
const nextId = () => ++seq;

/* Media ---------------------------------------------------------------------- */
const media: Record<string, Media> = {};
for (const [key, alt] of Object.entries(data.media)) {
  const entry = (manifest as Record<string, ManifestEntry>)[key];
  if (!entry) throw new Error(`Missing image for media key "${key}" in media-manifest.json`);
  media[key] = {
    id: nextId(),
    alt,
    url: entry.file,
    filename: entry.file.split("/").pop() ?? null,
    mimeType: "image/webp",
    width: entry.width,
    height: entry.height,
    blurDataURL: entry.blur ?? null,
  };
}

const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-");

/* Forms ---------------------------------------------------------------------- */
const forms = Object.fromEntries(
  Object.entries(data.forms).map(([key, form]) => [key, { id: nextId(), ...form } as Form]),
) as Record<keyof typeof data.forms, Form>;

/* Clients, categories, author, team --------------------------------------------- */
const clients: Client[] = data.clients.map((name, i) => {
  const slug = slugify(name);
  return {
    id: nextId(),
    name,
    featured: true,
    order: i + 1,
    logo: {
      id: nextId(),
      alt: `${name} logo`,
      url: `/images/logos/${slug}.svg`,
      filename: `${slug}.svg`,
      mimeType: "image/svg+xml",
      width: (logoManifest as Record<string, { width: number }>)[slug]?.width ?? 240,
      height: 80,
    },
  };
});

const categories: Category[] = data.categories.map((c) => ({ id: nextId(), ...c }));
const categoryBySlug = Object.fromEntries(categories.map((c) => [c.slug, c]));

const author: Author = { id: nextId(), name: "Team Upsure", role: "Strategy, creative & growth" };

const team: TeamMember[] = data.team.map(({ key: _key, photo, ...rest }) => ({
  id: nextId(),
  ...rest,
  photo: media[photo],
}));

/* Services --------------------------------------------------------------------- */
const services: Service[] = data.services.map(
  ({ tags, subServices, checklist, cardImage, heroImage, ...rest }) => ({
    id: nextId(),
    ...rest,
    tags: tags.map((label) => ({ label })),
    subServices: subServices.map((label) => ({ label })),
    checklist: checklist.map((item) => ({ item })),
    cardImage: media[cardImage],
    heroImage: media[heroImage],
    form: forms.consultation,
  }),
) as Service[];
const serviceBySlug = Object.fromEntries(services.map((s) => [s.slug, s]));

/* FAQs and testimonials ---------------------------------------------------------- */
const faqs: Faq[] = data.faqs.map(({ key: _key, ...rest }) => {
  const service = "service" in rest ? (rest.service as string | undefined) : undefined;
  return {
    id: nextId(),
    ...rest,
    service: service ? serviceBySlug[service] : undefined,
  } as Faq;
});

const testimonials: Testimonial[] = data.testimonials.map(({ key: _key, ...rest }) => {
  const avatar = "avatar" in rest ? (rest.avatar as string | undefined) : undefined;
  const service = "service" in rest ? (rest.service as string | undefined) : undefined;
  return {
    id: nextId(),
    ...rest,
    avatar: avatar ? media[avatar] : undefined,
    service: service ? serviceBySlug[service] : undefined,
  } as Testimonial;
});

/* Case studies --------------------------------------------------------------------- */
const caseStudies: CaseStudy[] = data.caseStudies.map(
  ({ services: slugs, cover, stats, ...rest }, i) =>
    ({
      id: nextId(),
      ...rest,
      services: slugs.map((slug) => serviceBySlug[slug]).filter(Boolean),
      cover: media[cover],
      stats: stats.map(([value, label]) => ({ value, label })),
      beforeAfter: {
        before: media.before,
        after: media.after,
        caption: "Homepage, before and after the relaunch",
      },
      testimonial: testimonials[(i + 1) % testimonials.length],
    }) as CaseStudy,
);

/* Posts --------------------------------------------------------------------------- */
const posts: Post[] = data.posts.map(
  ({ category, cover, tags, ...rest }) =>
    ({
      id: nextId(),
      ...rest,
      category: categoryBySlug[category]!,
      cover: media[cover],
      tags: tags.map((tag) => ({ tag })),
      author,
    }) as Post,
);
// "More from the blog" on the flagship post.
const flagship = posts.find((p) => p.slug === "ai-in-the-growth-engine-2026");
if (flagship) flagship.related = posts.filter((p) => p !== flagship).slice(0, 3);

/* Globals and pages ------------------------------------------------------------------ */
const settings = { ...data.siteSettings, defaultImage: media["og-default"] } as SiteSetting;
const header = data.header as Header;
const footer = data.footer as Footer;
const ctaBand = data.ctaBand as CtaBand;

const pages: Page[] = data
  .pages({ media, services: serviceBySlug, forms })
  .map((page) => ({ id: nextId(), ...page }) as Page);

export const store = {
  media,
  forms,
  clients,
  categories,
  team,
  services,
  faqs,
  testimonials,
  caseStudies,
  posts,
  pages,
  settings,
  header,
  footer,
  ctaBand,
};
