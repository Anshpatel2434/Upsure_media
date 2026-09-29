import Link from "next/link";

import type { Category, Post } from "@/payload-types";

import { BlockImage } from "@/components/blocks/block-image";
import { SectionHeader } from "@/components/blocks/section-header";
import { PostCard } from "@/components/cards/post-card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Prose } from "@/components/ui/prose";
import { Section } from "@/components/ui/section";
import { Tag } from "@/components/ui/tag";
import { NewsletterForm } from "@/features/newsletter/newsletter-form";
import { getPosts } from "@/lib/cms/queries";
import { getSiteUrl } from "@/lib/site";
import { formatDate, readingTime } from "@/lib/text";
import { isDoc } from "@/lib/relations";

export async function PostView({ post }: { post: Post }) {
  const category = isDoc(post.category) ? (post.category as Category) : null;
  const author = isDoc(post.author) ? post.author : null;
  const explicitRelated = (post.related ?? []).filter((p): p is Post => isDoc(p));
  const related = explicitRelated.length
    ? explicitRelated
    : (await getPosts({ limit: 3, category: category?.slug, exclude: post.id })).docs;
  const bodyText = extractText(post.content);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: author
      ? { "@type": "Person", name: author.name }
      : { "@type": "Organization", name: "Upsure" },
    publisher: { "@type": "Organization", name: "Upsure" },
    mainEntityOfPage: `${getSiteUrl()}/blog/${post.slug}`,
    image: isDoc(post.cover) ? post.cover?.url : undefined,
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Section grid padding="tight" className="pt-10">
        <Container size="narrow" className="flex flex-col gap-6">
          <Eyebrow>
            <Link href="/blog" className="hover:text-teal">
              Blog
            </Link>
          </Eyebrow>
          <div className="flex flex-wrap gap-2">
            {category && (
              <Link href={`/blog/category/${category.slug}`}>
                <Tag tone="teal">{category.title}</Tag>
              </Link>
            )}
            {(post.tags ?? []).map((t) => (
              <Tag key={t.id ?? t.tag}>{t.tag}</Tag>
            ))}
          </div>
          <Heading as="h1" size="h1">
            {post.title}
          </Heading>
          <p className="text-lead text-ink-2">{post.excerpt}</p>
          <p className="flex flex-wrap gap-x-3 text-small text-muted">
            {author && <span className="font-medium text-ink">{author.name}</span>}
            <span>·</span>
            <time dateTime={post.publishedAt ?? undefined}>{formatDate(post.publishedAt)}</time>
            <span>·</span>
            <span>{readingTime(bodyText)}</span>
          </p>
        </Container>
        <Container className="mt-10">
          <BlockImage
            media={post.cover}
            size="hero"
            sizes="(min-width: 1280px) 1200px, 100vw"
            aspect="aspect-[16/8]"
            priority
            className="rounded-xl"
          />
        </Container>
      </Section>

      <Section tone="white" padding="tight">
        <Container size="narrow">
          <Prose data={post.content} />
        </Container>
      </Section>

      <Section tone="teal-ink" padding="tight">
        <Container className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <div className="flex flex-col gap-3">
            <Eyebrow tone="paper">The Upshot</Eyebrow>
            <Heading as="h2" size="h2">
              Sharp takes on brand, content, and growth — sent monthly.
            </Heading>
          </div>
          <NewsletterForm source={`blog/${post.slug}`} tone="paper" />
        </Container>
      </Section>

      {related.length > 0 && (
        <Section>
          <Container className="flex flex-col gap-12">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <SectionHeader eyebrow="More from the blog" heading="Keep reading" />
              <Button href="/blog" variant="ghost" withArrow>
                All articles
              </Button>
            </div>
            <ul className="grid gap-5 md:grid-cols-3">
              {related.slice(0, 3).map((p) => (
                <li key={p.id}>
                  <PostCard post={p} />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}
    </article>
  );
}

function extractText(node: unknown): string {
  if (!node || typeof node !== "object") return "";
  const n = node as { text?: string; children?: unknown[]; root?: unknown };
  if (n.root) return extractText(n.root);
  if (typeof n.text === "string") return n.text;
  return (n.children ?? []).map(extractText).join(" ");
}
