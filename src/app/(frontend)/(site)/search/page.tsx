import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Tag } from "@/components/ui/tag";
import { searchSite } from "@/features/search/search";

export const metadata: Metadata = { title: "Search", robots: { index: false } };

/** Server-rendered search: a plain GET form, so it works without JavaScript. */
export default async function SearchPage({ searchParams }: PageProps<"/search">) {
  const { q } = await searchParams;
  const query = typeof q === "string" ? q : "";
  const hits = query ? await searchSite(query) : [];

  return (
    <Section grid className="flex-1">
      <Container size="narrow" className="flex flex-col gap-8">
        <Eyebrow>Search</Eyebrow>
        <Heading as="h1" size="h1">
          {query ? (
            <>
              Results for <span className="highlight">{query}</span>
            </>
          ) : (
            "What are you looking for?"
          )}
        </Heading>
        <form
          action="/search"
          method="get"
          role="search"
          className="flex flex-col gap-2 sm:flex-row"
        >
          <label htmlFor="q" className="sr-only">
            Search the site
          </label>
          <input
            id="q"
            name="q"
            type="search"
            defaultValue={query}
            placeholder="Services, work, articles…"
            autoFocus={!query}
            className="h-12 flex-1 rounded-md border border-line-strong bg-white px-4 text-body focus:border-teal focus:ring-2 focus:ring-teal/40 focus:outline-none"
          />
          <Button type="submit" size="lg" withArrow>
            Search
          </Button>
        </form>

        {query && hits.length === 0 && (
          <p className="text-lead text-muted">Nothing matched. Try a different word.</p>
        )}

        {hits.length > 0 && (
          <ul className="divide-y divide-line border-y border-line">
            {hits.map((h) => (
              <li key={`${h.type}-${h.href}-${h.title}`}>
                <Link href={h.href} className="group flex flex-col gap-2 py-5">
                  <span className="flex items-center gap-3">
                    <Tag tone="teal">{h.type}</Tag>
                    <span className="text-h3 font-medium group-hover:text-teal">{h.title}</span>
                  </span>
                  <span className="line-clamp-2 text-ink-2">{h.excerpt}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </Section>
  );
}
