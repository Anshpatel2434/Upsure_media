import Image from "next/image";
import Link from "next/link";

import type { Post } from "@/payload-types";

import { ArrowRightIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { imageProps } from "@/lib/media";
import { isDoc } from "@/lib/relations";
import { formatDate } from "@/lib/text";

/**
 * Image tile with a date stamp. `featured` gives the tall editorial version
 * used for the newest post on the blog index.
 */
export function PostCard({
  post,
  featured = false,
  priority = false,
  className,
}: {
  post: Post;
  featured?: boolean;
  priority?: boolean;
  className?: string;
}) {
  const category = isDoc(post.category) ? post.category : null;
  const author = isDoc(post.author) ? post.author : null;
  const img = imageProps(post.cover, featured ? "hero" : "large");
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group relative isolate flex flex-col overflow-hidden rounded-lg bg-white text-ink shadow-card transition-[transform,box-shadow] duration-(--duration-slow) ease-(--ease-smooth) hover:-translate-y-1.5 hover:shadow-lift",
        featured && "md:grid md:grid-cols-[1.2fr_1fr]",
        className,
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden bg-paper-2",
          featured ? "aspect-[4/3] md:aspect-auto md:min-h-[26rem]" : "aspect-[16/10]",
        )}
      >
        {img && (
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes={
              featured
                ? "(min-width: 1024px) 55vw, 100vw"
                : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            }
            priority={priority}
            placeholder={img.blurDataURL ? "blur" : "empty"}
            blurDataURL={img.blurDataURL}
            className="zoom-slow object-cover"
          />
        )}
        <span className="absolute top-4 left-4 rounded-pill bg-paper/90 px-3 py-1.5 text-small font-medium text-ink shadow-chip backdrop-blur">
          {formatDate(post.publishedAt)}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6 md:p-7">
        <div className="flex flex-wrap items-center gap-2 text-small">
          {category && (
            <span className="rounded-pill bg-teal-soft px-3 py-1 font-medium text-teal">
              {category.title}
            </span>
          )}
          {featured && (
            <span className="rounded-pill bg-sun px-3 py-1 font-medium text-ink">Latest</span>
          )}
        </div>
        <h3 className={cn("font-semibold", featured ? "text-h2" : "text-h3")}>{post.title}</h3>
        <p className="flex-1 text-ink-2">{post.excerpt}</p>
        <div className="flex items-center justify-between gap-4 pt-2">
          {author && <span className="text-small text-muted">{author.name}</span>}
          <span className="inline-flex items-center gap-2 font-medium text-teal">
            Read article
            <ArrowRightIcon
              size={18}
              className="transition-transform group-hover:translate-x-1.5"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}
