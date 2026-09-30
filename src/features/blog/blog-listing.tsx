import Link from "next/link";

import { PostCard } from "@/components/cards/post-card";
import { Container } from "@/components/ui/container";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import { getCategories, getPosts } from "@/lib/queries";
import { cn } from "@/lib/cn";

const PAGE_SIZE = 9;

/**
 * Blog index. Page 1 features the latest post full-width. Pagination and
 * category filters are plain links (/blog/page/2, /blog/category/ai) so every
 * listing page is static.
 */
export async function BlogListing({ page = 1, category }: { page?: number; category?: string }) {
  const [categories, result] = await Promise.all([
    getCategories(),
    getPosts({ limit: PAGE_SIZE, page, category }),
  ]);
  const active = categories.find((c) => c.slug === category);
  const [first, ...rest] = result.docs;
  const showFeatured = page === 1 && !category && first;

  return (
    <Section tone="white" padding="tight">
      <Container className="flex flex-col gap-10">
        <nav aria-label="Filter by category">
          <ul className="flex flex-wrap gap-2">
            <li>
              <Link
                href="/blog"
                className={pill(!active)}
                aria-current={!active ? "page" : undefined}
              >
                All
              </Link>
            </li>
            {categories.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/blog/category/${c.slug}`}
                  className={pill(active?.id === c.id)}
                  aria-current={active?.id === c.id ? "page" : undefined}
                >
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {result.docs.length === 0 && <p className="text-lead text-muted">Nothing here yet.</p>}

        {showFeatured && <PostCard post={first} featured priority />}

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {(showFeatured ? rest : result.docs).map((p) => (
            <li key={p.id}>
              <PostCard post={p} />
            </li>
          ))}
        </ul>

        {result.totalPages > 1 && (
          <nav
            aria-label="Pagination"
            className="flex items-center justify-between border-t border-line pt-6"
          >
            {result.hasPrevPage ? (
              <Link
                href={pageHref(page - 1, category)}
                className="inline-flex items-center gap-2 font-medium hover:text-teal"
              >
                <ChevronLeftIcon /> Newer
              </Link>
            ) : (
              <span />
            )}
            <span className="text-small text-muted tabular-nums">
              Page {page} of {result.totalPages}
            </span>
            {result.hasNextPage ? (
              <Link
                href={pageHref(page + 1, category)}
                className="inline-flex items-center gap-2 font-medium hover:text-teal"
              >
                Older <ChevronRightIcon />
              </Link>
            ) : (
              <span />
            )}
          </nav>
        )}
      </Container>
    </Section>
  );
}

const pageHref = (n: number, category?: string) =>
  category
    ? `/blog/category/${category}${n > 1 ? `?page=${n}` : ""}`
    : n > 1
      ? `/blog/page/${n}`
      : "/blog";

const pill = (active: boolean) =>
  cn(
    "inline-flex h-10 items-center rounded-pill border px-4 text-body font-medium transition-colors",
    active
      ? "border-ink bg-ink text-paper"
      : "border-line-strong text-ink hover:border-teal hover:text-teal",
  );
