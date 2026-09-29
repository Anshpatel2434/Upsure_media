import type { Field, FieldHook } from "payload";

export const formatSlug = (value: string): string =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const formatSlugHook =
  (fallbackField: string): FieldHook =>
  ({ value, data, operation }) => {
    if (typeof value === "string" && value.trim()) return formatSlug(value);
    if (operation === "create" || !value) {
      const fallback = data?.[fallbackField];
      if (typeof fallback === "string" && fallback) return formatSlug(fallback);
    }
    return value;
  };

/** URL slug, auto-filled from `fallbackField` (default: title) and always normalised. */
export const slugField = (fallbackField = "title", overrides: Partial<Field> = {}): Field =>
  ({
    name: "slug",
    type: "text",
    index: true,
    unique: true,
    required: true,
    admin: {
      position: "sidebar",
      description: "URL path segment. Lower-case letters, numbers and dashes only.",
    },
    hooks: { beforeValidate: [formatSlugHook(fallbackField)] },
    ...overrides,
  }) as Field;
