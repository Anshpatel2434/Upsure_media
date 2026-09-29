import type { Field } from "payload";

/**
 * A CTA/nav link: either an internal path or an external URL, with a label.
 * Kept as a plain path (not a relationship) so editors can link anywhere,
 * including anchors like `/services#faq`.
 */
export const linkField = (name = "link", overrides: Partial<Field> = {}): Field =>
  ({
    name,
    type: "group",
    fields: [
      { name: "label", type: "text", required: true },
      {
        name: "href",
        type: "text",
        required: true,
        admin: { description: "Internal path (e.g. /contact) or full URL (https://…)." },
      },
      {
        name: "newTab",
        type: "checkbox",
        defaultValue: false,
        admin: { description: "Open in a new tab (external links)." },
      },
    ],
    ...overrides,
  }) as Field;

export const linkArrayField = (name: string, label: string, maxRows = 8): Field => ({
  name,
  type: "array",
  label,
  maxRows,
  admin: { initCollapsed: true },
  fields: [
    { name: "label", type: "text", required: true },
    { name: "href", type: "text", required: true },
    { name: "newTab", type: "checkbox", defaultValue: false },
  ],
});
