import type { Post } from "@/payload-types";

import { BlockImage } from "@/components/blocks/block-image";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { ArrowRightIcon } from "@/components/ui/icons";
import { Tag } from "@/components/ui/tag";
import { formatDate } from "@/lib/text";

export function PostCard({
  post,
  tone = "white",
  featured = false,
  priority = false,
}: {
  post: Post;
  tone?: "white" | "teal-ink";
  featured?: boolean;
  priority?: boolean;
}) {
  const dark = tone === "teal-ink";
  const category = typeof post.category === "object" ? post.category : null;
  const author = typeof post.author === "object" ? post.author : null;
  return (
    <Card
      href={`/blog/${post.slug}`}
      tone={tone}
      padding="none"
      className={`group/card flex h-full flex-col ${featured ? "lg:grid lg:grid-cols-2" : ""}`}
    >
      <BlockImage
        media={post.cover}
        size="card"
        sizes={
          featured
            ? "(min-width: 1024px) 50vw, 100vw"
            : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        }
        aspect={featured ? "aspect-[4/3] lg:aspect-auto lg:h-full" : "aspect-[16/10]"}
        rounded={false}
        priority={priority}
      />
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex flex-wrap items-center gap-3 text-small">
          {category && <Tag tone={dark ? "paper" : "teal"}>{category.title}</Tag>}
          {featured && <Tag tone="sun">Latest</Tag>}
          <span className={dark ? "text-paper/60" : "text-muted"}>
            {formatDate(post.publishedAt)}
          </span>
        </div>
        <Heading as="h3" size={featured ? "h2" : "h3"}>
          {post.title}
        </Heading>
        <p className={`flex-1 ${dark ? "text-paper/75" : "text-ink-2"}`}>{post.excerpt}</p>
        <div className="flex items-center justify-between gap-4 pt-2">
          {author && (
            <span className={`text-small ${dark ? "text-paper/60" : "text-muted"}`}>
              {author.name}
            </span>
          )}
          <span
            className={`inline-flex items-center gap-2 font-medium ${dark ? "text-sun" : "text-teal"}`}
          >
            Read
            <ArrowRightIcon
              size={18}
              className="transition-transform group-hover/card:translate-x-0.5"
            />
          </span>
        </div>
      </div>
    </Card>
  );
}
