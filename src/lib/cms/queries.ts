import { cache } from "react";
import type { Where } from "payload";

import type {
  CaseStudy,
  Category,
  Client,
  CtaBand,
  Faq,
  Footer,
  Header,
  Page,
  Post,
  Service,
  SiteSetting,
  TeamMember,
  Testimonial,
} from "@/payload-types";

import { getCms } from "@/lib/cms/client";

/**
 * All reads go through here. `draft` is only true inside the /preview route
 * space (Next draft mode + admin session); public routes always read published
 * content. `cache()` dedupes identical reads within one render.
 */
type Opts = { draft?: boolean };

const DEPTH = 2;

export const getPage = cache(async (slug: string, { draft = false }: Opts = {}) => {
  const cms = await getCms();
  const { docs } = await cms.find({
    collection: "pages",
    where: { slug: { equals: slug } },
    limit: 1,
    pagination: false,
    depth: DEPTH,
    draft,
    overrideAccess: draft,
  });
  return (docs[0] as Page | undefined) ?? null;
});

export const getGlobals = cache(async () => {
  const cms = await getCms();
  const [settings, header, footer, ctaBand] = await Promise.all([
    cms.findGlobal({ slug: "site-settings", depth: 1 }),
    cms.findGlobal({ slug: "header", depth: 0 }),
    cms.findGlobal({ slug: "footer", depth: 0 }),
    cms.findGlobal({ slug: "cta-band", depth: 0 }),
  ]);
  return {
    settings: settings as SiteSetting,
    header: header as Header,
    footer: footer as Footer,
    ctaBand: ctaBand as CtaBand,
  };
});

export const getServices = cache(async (ids?: (number | Service)[] | null) => {
  const cms = await getCms();
  const idList = ids?.map((s) => (typeof s === "object" ? s.id : s)).filter(Boolean);
  const { docs } = await cms.find({
    collection: "services",
    where: idList?.length ? { id: { in: idList } } : {},
    sort: "order",
    limit: 20,
    pagination: false,
    depth: 1,
  });
  const list = docs as Service[];
  return idList?.length
    ? (idList.map((id) => list.find((s) => s.id === id)).filter(Boolean) as Service[])
    : list;
});

export const getService = cache(async (slug: string, { draft = false }: Opts = {}) => {
  const cms = await getCms();
  const { docs } = await cms.find({
    collection: "services",
    where: { slug: { equals: slug } },
    limit: 1,
    pagination: false,
    depth: DEPTH,
    draft,
    overrideAccess: draft,
  });
  return (docs[0] as Service | undefined) ?? null;
});

export const getCaseStudies = cache(
  async (
    opts: {
      limit?: number;
      ids?: (number | CaseStudy)[] | null;
      service?: number;
      exclude?: number;
    } = {},
  ) => {
    const cms = await getCms();
    const idList = opts.ids?.map((c) => (typeof c === "object" ? c.id : c)).filter(Boolean);
    const where: Where[] = [];
    if (idList?.length) where.push({ id: { in: idList } });
    if (opts.service) where.push({ services: { contains: opts.service } });
    if (opts.exclude) where.push({ id: { not_equals: opts.exclude } });
    const { docs } = await cms.find({
      collection: "case-studies",
      where: where.length ? { and: where } : {},
      sort: "-publishedAt",
      limit: opts.limit && opts.limit > 0 ? opts.limit : 100,
      pagination: false,
      depth: 1,
    });
    return docs as CaseStudy[];
  },
);

export const getCaseStudy = cache(async (slug: string, { draft = false }: Opts = {}) => {
  const cms = await getCms();
  const { docs } = await cms.find({
    collection: "case-studies",
    where: { slug: { equals: slug } },
    limit: 1,
    pagination: false,
    depth: DEPTH,
    draft,
    overrideAccess: draft,
  });
  return (docs[0] as CaseStudy | undefined) ?? null;
});

export const getPosts = cache(
  async (opts: { limit?: number; page?: number; category?: string; exclude?: number } = {}) => {
    const cms = await getCms();
    const where: Where[] = [];
    if (opts.category) where.push({ "category.slug": { equals: opts.category } });
    if (opts.exclude) where.push({ id: { not_equals: opts.exclude } });
    const result = await cms.find({
      collection: "posts",
      where: where.length ? { and: where } : {},
      sort: "-publishedAt",
      limit: opts.limit ?? 12,
      page: opts.page ?? 1,
      depth: 1,
    });
    return { ...result, docs: result.docs as Post[] };
  },
);

export const getPost = cache(async (slug: string, { draft = false }: Opts = {}) => {
  const cms = await getCms();
  const { docs } = await cms.find({
    collection: "posts",
    where: { slug: { equals: slug } },
    limit: 1,
    pagination: false,
    depth: DEPTH,
    draft,
    overrideAccess: draft,
  });
  return (docs[0] as Post | undefined) ?? null;
});

export const getCategories = cache(async () => {
  const cms = await getCms();
  const { docs } = await cms.find({
    collection: "categories",
    limit: 50,
    pagination: false,
    sort: "title",
    depth: 0,
  });
  return docs as Category[];
});

export const getTestimonials = cache(
  async (
    opts: { ids?: (number | Testimonial)[] | null; featuredOnly?: boolean; service?: number } = {},
  ) => {
    const cms = await getCms();
    const idList = opts.ids?.map((t) => (typeof t === "object" ? t.id : t)).filter(Boolean);
    const where: Where[] = [];
    if (idList?.length) where.push({ id: { in: idList } });
    else if (opts.service) where.push({ service: { equals: opts.service } });
    else if (opts.featuredOnly) where.push({ featured: { equals: true } });
    const { docs } = await cms.find({
      collection: "testimonials",
      where: where.length ? { and: where } : {},
      sort: "order",
      limit: 50,
      pagination: false,
      depth: 1,
    });
    return docs as Testimonial[];
  },
);

export const getClients = cache(async () => {
  const cms = await getCms();
  const { docs } = await cms.find({
    collection: "clients",
    where: { featured: { equals: true } },
    sort: "order",
    limit: 50,
    pagination: false,
    depth: 1,
  });
  return docs as Client[];
});

export const getFaqs = cache(
  async (opts: { scope?: string; ids?: (number | Faq)[] | null; service?: number } = {}) => {
    const cms = await getCms();
    const idList = opts.ids?.map((f) => (typeof f === "object" ? f.id : f)).filter(Boolean);
    const where: Where = idList?.length
      ? { id: { in: idList } }
      : opts.service
        ? { service: { equals: opts.service } }
        : opts.scope
          ? { scope: { contains: opts.scope } }
          : {};
    const { docs } = await cms.find({
      collection: "faqs",
      where,
      sort: "order",
      limit: 50,
      pagination: false,
      depth: 0,
    });
    return docs as Faq[];
  },
);

export const getTeam = cache(async (ids?: (number | TeamMember)[] | null) => {
  const cms = await getCms();
  const idList = ids?.map((m) => (typeof m === "object" ? m.id : m)).filter(Boolean);
  const { docs } = await cms.find({
    collection: "team-members",
    where: idList?.length ? { id: { in: idList } } : {},
    sort: "order",
    limit: 50,
    pagination: false,
    depth: 1,
  });
  return docs as TeamMember[];
});

/** Every public path, for the sitemap and static params. */
export const getAllRoutes = cache(async () => {
  const cms = await getCms();
  const [pages, services, work, posts, categories] = await Promise.all([
    cms.find({
      collection: "pages",
      limit: 100,
      pagination: false,
      depth: 0,
      select: { slug: true, updatedAt: true },
    }),
    cms.find({
      collection: "services",
      limit: 100,
      pagination: false,
      depth: 0,
      select: { slug: true, updatedAt: true },
    }),
    cms.find({
      collection: "case-studies",
      limit: 500,
      pagination: false,
      depth: 0,
      select: { slug: true, updatedAt: true },
    }),
    cms.find({
      collection: "posts",
      limit: 1000,
      pagination: false,
      depth: 0,
      select: { slug: true, updatedAt: true },
    }),
    cms.find({
      collection: "categories",
      limit: 100,
      pagination: false,
      depth: 0,
      select: { slug: true, updatedAt: true },
    }),
  ]);
  const stamp = (d: { updatedAt?: string }) => d.updatedAt ?? new Date().toISOString();
  return [
    ...pages.docs.map((d) => ({
      path: d.slug === "home" ? "/" : `/${d.slug}`,
      updatedAt: stamp(d),
    })),
    ...services.docs.map((d) => ({ path: `/services/${d.slug}`, updatedAt: stamp(d) })),
    ...work.docs.map((d) => ({ path: `/work/${d.slug}`, updatedAt: stamp(d) })),
    ...posts.docs.map((d) => ({ path: `/blog/${d.slug}`, updatedAt: stamp(d) })),
    ...categories.docs.map((d) => ({ path: `/blog/category/${d.slug}`, updatedAt: stamp(d) })),
  ];
});
