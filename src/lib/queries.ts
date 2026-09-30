import type { CaseStudy, Faq, Service, TeamMember, Testimonial } from "@/content/types";

import { store } from "@/content/store";
import { isDoc } from "@/lib/relations";

/**
 * Read helpers over the static content store. They stay async so pages and
 * components do not care where content comes from; everything resolves at
 * build time.
 */

type Ref<T> = number | T;
const idOf = <T extends { id: number }>(ref: Ref<T>) => (isDoc(ref) ? ref.id : ref);
const byOrder = (a: { order?: number | null }, b: { order?: number | null }) =>
  (a.order ?? 0) - (b.order ?? 0);
const newestFirst = (a: { publishedAt?: string | null }, b: { publishedAt?: string | null }) =>
  (b.publishedAt ?? "").localeCompare(a.publishedAt ?? "");

/** Keeps the caller's order when explicit ids are given, else returns `fallback`. */
function pick<T extends { id: number }>(
  all: T[],
  refs: Ref<T>[] | null | undefined,
  fallback: T[],
) {
  const ids = refs?.map(idOf).filter(Boolean);
  if (!ids?.length) return fallback;
  return ids.map((id) => all.find((doc) => doc.id === id)).filter((doc): doc is T => Boolean(doc));
}

export async function getPage(slug: string) {
  return store.pages.find((p) => p.slug === slug) ?? null;
}

export async function getGlobals() {
  const { settings, header, footer, ctaBand } = store;
  return { settings, header, footer, ctaBand };
}

export async function getServices(refs?: Ref<Service>[] | null) {
  const sorted = [...store.services].sort(byOrder);
  return pick(store.services, refs, sorted);
}

export async function getService(slug: string) {
  return store.services.find((s) => s.slug === slug) ?? null;
}

export async function getCaseStudies(
  opts: { limit?: number; ids?: Ref<CaseStudy>[] | null; service?: number; exclude?: number } = {},
) {
  let list = [...store.caseStudies].sort(newestFirst);
  list = pick(store.caseStudies, opts.ids, list);
  if (opts.service) {
    list = list.filter((c) => c.services.some((s) => idOf(s) === opts.service));
  }
  if (opts.exclude) list = list.filter((c) => c.id !== opts.exclude);
  return opts.limit && opts.limit > 0 ? list.slice(0, opts.limit) : list;
}

export async function getCaseStudy(slug: string) {
  return store.caseStudies.find((c) => c.slug === slug) ?? null;
}

export async function getPosts(
  opts: { limit?: number; page?: number; category?: string; exclude?: number } = {},
) {
  let list = [...store.posts].sort(newestFirst);
  if (opts.category) {
    list = list.filter((p) => isDoc(p.category) && p.category.slug === opts.category);
  }
  if (opts.exclude) list = list.filter((p) => p.id !== opts.exclude);
  const limit = opts.limit ?? 12;
  const page = opts.page ?? 1;
  const totalDocs = list.length;
  const totalPages = Math.max(1, Math.ceil(totalDocs / limit));
  return {
    docs: list.slice((page - 1) * limit, page * limit),
    page,
    totalDocs,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
}

export async function getPost(slug: string) {
  return store.posts.find((p) => p.slug === slug) ?? null;
}

export async function getCategories() {
  return [...store.categories].sort((a, b) => a.title.localeCompare(b.title));
}

export async function getTestimonials(
  opts: { ids?: Ref<Testimonial>[] | null; featuredOnly?: boolean; service?: number } = {},
) {
  const sorted = [...store.testimonials].sort(byOrder);
  if (opts.ids?.length) return pick(store.testimonials, opts.ids, sorted);
  if (opts.service) return sorted.filter((t) => t.service && idOf(t.service) === opts.service);
  if (opts.featuredOnly) return sorted.filter((t) => t.featured);
  return sorted;
}

export async function getClients() {
  return store.clients.filter((c) => c.featured).sort(byOrder);
}

export async function getFaqs(
  opts: { scope?: string; ids?: Ref<Faq>[] | null; service?: number } = {},
) {
  const sorted = [...store.faqs].sort(byOrder);
  if (opts.ids?.length) return pick(store.faqs, opts.ids, sorted);
  if (opts.service) return sorted.filter((f) => f.service && idOf(f.service) === opts.service);
  if (opts.scope) return sorted.filter((f) => f.scope?.includes(opts.scope as never));
  return sorted;
}

export async function getTeam(refs?: Ref<TeamMember>[] | null) {
  const sorted = [...store.team].sort(byOrder);
  return pick(store.team, refs, sorted);
}

/** Every public path, for the sitemap and static params. */
export async function getAllRoutes() {
  const stamp = new Date().toISOString();
  return [
    ...store.pages.map((p) => ({ path: p.slug === "home" ? "/" : `/${p.slug}`, updatedAt: stamp })),
    ...store.services.map((s) => ({ path: `/services/${s.slug}`, updatedAt: stamp })),
    ...store.caseStudies.map((c) => ({ path: `/work/${c.slug}`, updatedAt: stamp })),
    ...store.posts.map((p) => ({ path: `/blog/${p.slug}`, updatedAt: p.publishedAt ?? stamp })),
    ...store.categories.map((c) => ({ path: `/blog/category/${c.slug}`, updatedAt: stamp })),
  ];
}

/** Form definitions by key (contact, consultation, callback, brief). */
export async function getForm(key: keyof typeof store.forms) {
  return store.forms[key];
}
