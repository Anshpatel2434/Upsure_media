import { getCms } from "@/lib/cms/client";

export type SearchHit = {
  type: "Service" | "Case study" | "Article" | "FAQ";
  title: string;
  href: string;
  excerpt: string;
};

/**
 * Site search across services, case studies, posts and FAQs using Postgres
 * `like` queries via the Local API. Small content set → no search index needed.
 */
export async function searchSite(query: string): Promise<SearchHit[]> {
  const q = query.trim().slice(0, 100);
  if (q.length < 2) return [];
  const cms = await getCms();
  const like = (fields: string[]) => ({ or: fields.map((f) => ({ [f]: { like: q } })) });

  const [services, work, posts, faqs] = await Promise.all([
    cms.find({
      collection: "services",
      where: like(["title", "blurb", "lead"]),
      limit: 5,
      depth: 0,
    }),
    cms.find({
      collection: "case-studies",
      where: like(["title", "client", "summary", "industry"]),
      limit: 5,
      depth: 0,
    }),
    cms.find({ collection: "posts", where: like(["title", "excerpt"]), limit: 8, depth: 0 }),
    cms.find({ collection: "faqs", where: like(["question", "answer"]), limit: 5, depth: 0 }),
  ]);

  return [
    ...services.docs.map((d) => ({
      type: "Service" as const,
      title: d.title,
      href: `/services/${d.slug}`,
      excerpt: d.blurb,
    })),
    ...work.docs.map((d) => ({
      type: "Case study" as const,
      title: d.title,
      href: `/work/${d.slug}`,
      excerpt: d.summary,
    })),
    ...posts.docs.map((d) => ({
      type: "Article" as const,
      title: d.title,
      href: `/blog/${d.slug}`,
      excerpt: d.excerpt,
    })),
    ...faqs.docs.map((d) => ({
      type: "FAQ" as const,
      title: d.question,
      href: "/services#faq",
      excerpt: d.answer,
    })),
  ];
}
