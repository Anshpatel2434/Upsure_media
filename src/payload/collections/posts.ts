import type { CollectionConfig } from "payload";

import { authenticated, authenticatedOrPublished } from "@/payload/access";
import { placeholderField } from "@/payload/fields/placeholder";
import { seoTab } from "@/payload/fields/seo";
import { slugField } from "@/payload/fields/slug";
import { revalidateCollection } from "@/payload/hooks/revalidate";
import { previewUrl } from "@/payload/preview";

const revalidate = revalidateCollection("/blog");

export const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
    group: "Blog",
    defaultColumns: ["title", "category", "publishedAt", "_status"],
    livePreview: { url: ({ data }) => previewUrl(`/blog/${data?.slug ?? ""}`) },
    preview: (data) => previewUrl(`/blog/${(data as { slug?: string })?.slug ?? ""}`),
  },
  access: {
    read: authenticatedOrPublished,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  hooks: {
    afterChange: [revalidate.afterChange],
    afterDelete: [revalidate.afterDelete],
    beforeChange: [
      ({ data }) => {
        if (data && !data.publishedAt) data.publishedAt = new Date().toISOString();
        return data;
      },
    ],
  },
  versions: { drafts: { autosave: { interval: 300 }, schedulePublish: true }, maxPerDoc: 30 },
  defaultSort: "-publishedAt",
  fields: [
    { name: "title", type: "text", required: true },
    {
      type: "tabs",
      tabs: [
        {
          label: "Content",
          fields: [
            {
              name: "excerpt",
              type: "textarea",
              required: true,
              admin: { description: "Shown on cards and as the dek under the title." },
            },
            { name: "cover", type: "upload", relationTo: "media" },
            { name: "content", type: "richText", required: true },
          ],
        },
        seoTab,
      ],
    },
    slugField(),
    placeholderField,
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      required: true,
      admin: { position: "sidebar" },
    },
    {
      name: "tags",
      type: "array",
      admin: { position: "sidebar" },
      fields: [{ name: "tag", type: "text", required: true }],
    },
    { name: "author", type: "relationship", relationTo: "authors", admin: { position: "sidebar" } },
    {
      name: "publishedAt",
      type: "date",
      admin: { position: "sidebar", date: { pickerAppearance: "dayOnly" } },
    },
    {
      name: "related",
      type: "relationship",
      relationTo: "posts",
      hasMany: true,
      admin: { position: "sidebar", description: "Leave empty to pick by category." },
      filterOptions: ({ id }) => (id ? { id: { not_equals: id } } : true),
    },
  ],
};
