import type { Field } from "payload";

/**
 * Marks seeded content that must be replaced with real material before launch.
 * Filter any list view by this field to see what is left.
 */
export const placeholderField: Field = {
  name: "placeholder",
  type: "checkbox",
  label: "Placeholder content",
  defaultValue: false,
  admin: {
    position: "sidebar",
    description: "Tick while this is placeholder copy or imagery. Untick once real content is in.",
  },
};
