import type { CollectionConfig } from "payload";

import { authenticated, authenticatedOrPublished } from "@/payload/access";
import { pageBlocks } from "@/payload/blocks";
import { placeholderField } from "@/payload/fields/placeholder";
import { seoTab } from "@/payload/fields/seo";
import { slugField } from "@/payload/fields/slug";
import { revalidateCollection } from "@/payload/hooks/revalidate";
import { previewUrl } from "@/payload/preview";

const revalidate = revalidateCollection("");

const pathFor = (slug?: string | null) => (slug === "home" ? "/" : `/${slug ?? ""}`);

/**
 * Page-builder pages: Home, Services overview, About, Culture, Contact, legal…
 * Each page is an ordered list of blocks the editor can add, remove and reorder.
 * Slugs are fixed for pages the code links to (home, services, work, about,
 * culture, testimonials, blog, contact, terms, privacy).
 */
export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
    group: "Site",
    defaultColumns: ["title", "slug", "_status", "updatedAt"],
    livePreview: { url: ({ data }) => previewUrl(pathFor(data?.slug)) },
    preview: (data) => previewUrl(pathFor((data as { slug?: string })?.slug)),
  },
  access: {
    read: authenticatedOrPublished,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  hooks: { afterChange: [revalidate.afterChange], afterDelete: [revalidate.afterDelete] },
  versions: { drafts: { autosave: { interval: 300 }, schedulePublish: true }, maxPerDoc: 30 },
  fields: [
    { name: "title", type: "text", required: true },
    {
      type: "tabs",
      tabs: [
        {
          label: "Layout",
          fields: [
            {
              name: "layout",
              type: "blocks",
              blocks: pageBlocks,
              required: true,
              admin: { initCollapsed: true },
            },
          ],
        },
        seoTab,
      ],
    },
    slugField(),
    placeholderField,
    {
      name: "showCtaBand",
      type: "checkbox",
      defaultValue: true,
      admin: {
        position: "sidebar",
        description: "Show the global “Ready to move forward?” band above the footer.",
      },
    },
  ],
};
