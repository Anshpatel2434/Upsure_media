import { revalidatePath, revalidateTag } from "next/cache";
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from "payload";

/**
 * Public pages are statically rendered. These hooks make an admin "Publish"
 * show up on the site immediately by expiring the affected paths.
 *
 * Content that appears in many places (services, case studies, posts,
 * testimonials, globals) revalidates the whole layout tree, which is cheap for
 * a site of this size and guarantees nothing stale is left behind.
 */

type Doc = { id: number | string; _status?: string | null; slug?: string | null };

const status = (doc: Doc | undefined | null) => doc?._status ?? "published";

export function revalidateEverything(reason: string, logger?: { info: (msg: string) => void }) {
  logger?.info(`[revalidate] ${reason} → all routes`);
  revalidatePath("/", "layout");
  revalidateTag("sitemap", "max");
}

/** Path-scoped revalidation for a collection whose docs map to `${prefix}/${slug}`. */
export function revalidateCollection(prefix: string): {
  afterChange: CollectionAfterChangeHook<Doc>;
  afterDelete: CollectionAfterDeleteHook<Doc>;
} {
  const pathFor = (slug: string | null | undefined) =>
    slug === "home" ? "/" : `${prefix}/${slug ?? ""}`.replace(/\/+$/, "") || "/";

  return {
    afterChange: ({ doc, previousDoc, req: { payload, context } }) => {
      if (context.disableRevalidate) return doc;
      const changedPublished = status(doc) === "published" || status(previousDoc) === "published";
      if (!changedPublished) return doc;

      payload.logger.info(`[revalidate] ${prefix} "${doc.slug}"`);
      revalidatePath(pathFor(doc.slug));
      if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
        revalidatePath(pathFor(previousDoc.slug));
      }
      // Listings, carousels and related items live on other routes.
      revalidateEverything(`${prefix} listings`);
      return doc;
    },
    afterDelete: ({ doc, req: { payload, context } }) => {
      if (context.disableRevalidate) return doc;
      payload.logger.info(`[revalidate] deleted ${prefix} "${doc?.slug}"`);
      revalidatePath(pathFor(doc?.slug));
      revalidateEverything(`${prefix} delete`);
      return doc;
    },
  };
}

/** Globals (header, footer, settings) affect every page. */
export const revalidateGlobal: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) revalidateEverything("global changed", payload.logger);
  return doc;
};

/** Collections without their own route but shown across the site (testimonials, clients, FAQs…). */
const sharedAfterChange: CollectionAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) revalidateEverything("shared content changed", payload.logger);
  return doc;
};
const sharedAfterDelete: CollectionAfterDeleteHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) revalidateEverything("shared content deleted", payload.logger);
  return doc;
};
export const revalidateShared = {
  afterChange: [sharedAfterChange],
  afterDelete: [sharedAfterDelete],
};
