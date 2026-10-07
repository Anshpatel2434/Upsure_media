import type { Metadata } from "next";
import type { ReactNode } from "react";

import { CtaBand } from "@/components/layout/cta-band";
import { RenderBlocks } from "@/components/blocks/render-blocks";
import { BlogListing } from "@/features/blog/blog-listing";
import { PostView } from "@/features/blog/post-view";
import { BriefBuilder } from "@/features/brief/brief-builder";
import { ServiceView } from "@/features/services/service-view";
import { CaseStudyView } from "@/features/work/case-study-view";
import { WorkListing } from "@/features/work/work-listing";
import { getCaseStudy, getGlobals, getPage, getPost, getService } from "@/lib/queries";
import { buildMetadata } from "@/lib/seo";

export type RouteResult = { node: ReactNode; metadata: Metadata } | null;

/** Single source of truth for URL → content, used by the catch-all route. */
export async function resolveRoute(segments: string[]): Promise<RouteResult> {
  const [head, second, third] = segments;
  const path = `/${segments.join("/")}`;

  // ---- Services --------------------------------------------------------
  if (head === "services" && second && !third) {
    const service = await getService(second);
    if (!service) return null;
    return {
      node: (
        <>
          <ServiceView service={service} />
          <CtaBand />
        </>
      ),
      metadata: buildMetadata({
        title: service.meta?.title ?? service.title,
        description: service.meta?.description ?? service.blurb,
        path,
      }),
    };
  }

  // ---- Industries (page-builder pages at /industries/<slug>) ----------------
  if (head === "industries" && second && !third) {
    return withPage(`industries/${second}`, path, (page) => <RenderBlocks blocks={page.layout} />);
  }

  // ---- Work --------------------------------------------------------------
  if (head === "work" && second === "industry" && (third === "d2c" || third === "b2b")) {
    return withPage("work", path, (page) => (
      <>
        <RenderBlocks blocks={page.layout} />
        <WorkListing segment={third === "d2c" ? "D2C" : "B2B"} />
      </>
    ));
  }
  if (head === "work" && second === "service" && third) {
    return withPage("work", path, (page) => (
      <>
        <RenderBlocks blocks={page.layout} />
        <WorkListing serviceSlug={third} />
      </>
    ));
  }
  if (head === "work" && second && !third) {
    const study = await getCaseStudy(second);
    if (!study) return null;
    return {
      node: (
        <>
          <CaseStudyView study={study} />
          <CtaBand />
        </>
      ),
      metadata: buildMetadata({
        title: study.meta?.title ?? `${study.title} case study`,
        description: study.meta?.description ?? study.summary,
        path,
        type: "article",
        publishedTime: study.publishedAt,
      }),
    };
  }
  if (head === "work" && !second) {
    return withPage("work", path, (page) => (
      <>
        <RenderBlocks blocks={page.layout} />
        <WorkListing />
      </>
    ));
  }

  // ---- Blog --------------------------------------------------------------
  if (head === "blog" && second === "page" && third) {
    const pageNumber = Number(third);
    if (!Number.isInteger(pageNumber) || pageNumber < 1) return null;
    return withPage("blog", path, (page) => (
      <>
        <RenderBlocks blocks={page.layout} />
        <BlogListing page={pageNumber} />
      </>
    ));
  }
  if (head === "blog" && second === "category" && third) {
    return withPage("blog", path, (page) => (
      <>
        <RenderBlocks blocks={page.layout} />
        <BlogListing category={third} />
      </>
    ));
  }
  if (head === "blog" && second && !third) {
    const post = await getPost(second);
    if (!post) return null;
    return {
      node: (
        <>
          <PostView post={post} />
          <CtaBand />
        </>
      ),
      metadata: buildMetadata({
        title: post.meta?.title ?? post.title,
        description: post.meta?.description ?? post.excerpt,
        path,
        type: "article",
        publishedTime: post.publishedAt,
      }),
    };
  }
  if (head === "blog" && !second) {
    return withPage("blog", path, (page) => (
      <>
        <RenderBlocks blocks={page.layout} />
        <BlogListing page={1} />
      </>
    ));
  }

  // ---- Brief builder -------------------------------------------------------
  if (head === "start-a-project" && !second) {
    return withPage("start-a-project", path, (page) => (
      <>
        <RenderBlocks blocks={page.layout} />
        <BriefBuilder />
      </>
    ));
  }

  // ---- Any other page-builder page (home, services, about, culture, …) ------
  if (segments.length <= 1) {
    const slug = head ?? "home";
    return withPage(slug, path, (page) => <RenderBlocks blocks={page.layout} />);
  }

  return null;
}

type PageDoc = NonNullable<Awaited<ReturnType<typeof getPage>>>;

async function withPage(
  slug: string,
  path: string,
  render: (page: PageDoc) => ReactNode,
): Promise<RouteResult> {
  const [page, { settings }] = await Promise.all([getPage(slug), getGlobals()]);
  if (!page) return null;
  return {
    node: (
      <>
        {render(page)}
        {page.showCtaBand !== false && <CtaBand />}
      </>
    ),
    metadata: buildMetadata(
      {
        title: page.meta?.title ?? (slug === "home" ? settings.defaultTitle : page.title),
        description: page.meta?.description,
        path: slug === "home" ? "/" : path,
        cardPath: slug === "home" ? "/" : `/${slug}`,
        absolute: slug === "home",
      },
      { description: settings.defaultDescription },
    ),
  };
}
