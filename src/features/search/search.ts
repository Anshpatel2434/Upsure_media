import { store } from "@/content/store";

export type SearchHit = {
  type: "Service" | "Case study" | "Article" | "FAQ";
  title: string;
  href: string;
  excerpt: string;
};

/**
 * Site search across services, case studies, posts and FAQs. The content set
 * is small and static, so a case-insensitive substring match is enough.
 */
export async function searchSite(query: string): Promise<SearchHit[]> {
  const q = query.trim().slice(0, 100).toLowerCase();
  if (q.length < 2) return [];
  const hit = (...fields: (string | null | undefined)[]) =>
    fields.some((f) => f?.toLowerCase().includes(q));

  return [
    ...store.services
      .filter((d) => hit(d.title, d.blurb, d.lead))
      .slice(0, 5)
      .map((d) => ({
        type: "Service" as const,
        title: d.title,
        href: `/services/${d.slug}`,
        excerpt: d.blurb,
      })),
    ...store.caseStudies
      .filter((d) => hit(d.title, d.client, d.summary, d.industry))
      .slice(0, 5)
      .map((d) => ({
        type: "Case study" as const,
        title: d.title,
        href: `/work/${d.slug}`,
        excerpt: d.summary ?? "",
      })),
    ...store.posts
      .filter((d) => hit(d.title, d.excerpt))
      .slice(0, 8)
      .map((d) => ({
        type: "Article" as const,
        title: d.title,
        href: `/blog/${d.slug}`,
        excerpt: d.excerpt ?? "",
      })),
    ...store.faqs
      .filter((d) => hit(d.question, d.answer))
      .slice(0, 5)
      .map((d) => ({
        type: "FAQ" as const,
        title: d.question,
        href: "/services#faq",
        excerpt: d.answer,
      })),
  ];
}
