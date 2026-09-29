/**
 * Minimal builders for Payload's Lexical rich-text JSON so seed content can be
 * written as plain strings. Supports paragraphs, h2/h3 headings and **bold**.
 */

type TextNode = {
  type: "text";
  text: string;
  format: number;
  detail: 0;
  mode: "normal";
  style: "";
  version: 1;
};

type BlockNode = {
  type: "paragraph" | "heading";
  tag?: "h2" | "h3";
  children: TextNode[];
  direction: "ltr";
  format: "";
  indent: 0;
  version: 1;
  textFormat?: 0;
};

const text = (value: string, format = 0): TextNode => ({
  type: "text",
  text: value,
  format,
  detail: 0,
  mode: "normal",
  style: "",
  version: 1,
});

/** Splits `**bold**` runs into text nodes. */
const inline = (value: string): TextNode[] =>
  value
    .split(/(\*\*[^*]+\*\*)/g)
    .filter(Boolean)
    .map((part) =>
      part.startsWith("**") && part.endsWith("**") ? text(part.slice(2, -2), 1) : text(part),
    );

const paragraph = (value: string): BlockNode => ({
  type: "paragraph",
  children: inline(value),
  direction: "ltr",
  format: "",
  indent: 0,
  version: 1,
  textFormat: 0,
});

const heading = (value: string, tag: "h2" | "h3"): BlockNode => ({
  type: "heading",
  tag,
  children: inline(value),
  direction: "ltr",
  format: "",
  indent: 0,
  version: 1,
});

/**
 * Converts a block of text into Lexical JSON. Blank lines separate blocks;
 * lines starting with `## ` / `### ` become headings.
 */
export function richText(source: string) {
  const blocks = source
    .trim()
    .split(/\n\s*\n/)
    .map((raw) => raw.replace(/\s*\n\s*/g, " ").trim())
    .filter(Boolean)
    .map((line) => {
      if (line.startsWith("### ")) return heading(line.slice(4), "h3");
      if (line.startsWith("## ")) return heading(line.slice(3), "h2");
      return paragraph(line);
    });

  return {
    root: {
      type: "root",
      children: blocks,
      direction: "ltr",
      format: "",
      indent: 0,
      version: 1,
    },
  };
}
