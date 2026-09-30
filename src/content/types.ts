/**
 * Content types for the static site content in `src/content`. Originally
 * generated from the CMS schema; now maintained by hand alongside the data.
 *
 * Rich text is a light Markdown string: "## " / "### " headings, blank-line
 * paragraphs, "- " lists, "> " quotes and **bold**. See components/ui/prose.
 */

export type RichText = string;

export interface Page {
  id: number;
  title: string;
  layout: (
    | {
        variant?: ("collage" | "editorial" | "photo-cards" | "dark") | null;
        /**
         * Small label above the heading, e.g. “Services”. The number is added automatically.
         */
        eyebrow?: string | null;
        /**
         * Wrap words in [[double brackets]] to highlight them. On the Home hero, “|” starts a new display line, e.g. “We design|brands people|[[love.]]”.
         */
        heading: string;
        lead?: string | null;
        /**
         * Rotated labels next to the heading, e.g. “Est. 20XX”.
         */
        stickers?:
          | {
              text: string;
              tone?: ("sun" | "coral" | "teal" | "ink") | null;
              id?: string | null;
            }[]
          | null;
        ctas?:
          | {
              label: string;
              href: string;
              newTab?: boolean | null;
              id?: string | null;
            }[]
          | null;
        /**
         * Collage / photo-card images. The first one is the main image on editorial heroes.
         */
        images?:
          | {
              image: number | Media;
              id?: string | null;
            }[]
          | null;
        /**
         * Show email and phone from Site Settings under the lead text.
         */
        showContact?: boolean | null;
        id?: string | null;
        blockName?: string | null;
        blockType: "hero";
      }
    | {
        /**
         * Small label above the heading, e.g. “Services”. The number is added automatically.
         */
        eyebrow?: string | null;
        /**
         * One big paragraph. Wrap phrases in [[double brackets]] to emphasise.
         */
        text: string;
        cta?: {
          label?: string | null;
          /**
           * Leave empty to hide the link.
           */
          href?: string | null;
          newTab?: boolean | null;
        };
        /**
         * Background band colour.
         */
        tone?: ("paper" | "paper-2" | "white" | "teal-ink" | "teal") | null;
        id?: string | null;
        blockName?: string | null;
        blockType: "statement";
      }
    | {
        /**
         * Small label above the heading, e.g. “Services”. The number is added automatically.
         */
        eyebrow?: string | null;
        heading?: string | null;
        items?:
          | {
              value: number;
              /**
               * e.g. + or %
               */
              suffix?: string | null;
              label: string;
              id?: string | null;
            }[]
          | null;
        /**
         * Background band colour.
         */
        tone?: ("paper" | "paper-2" | "white" | "teal-ink" | "teal") | null;
        id?: string | null;
        blockName?: string | null;
        blockType: "stats";
      }
    | {
        heading?: string | null;
        statement?: string | null;
        cta?: {
          label?: string | null;
          /**
           * Leave empty to hide the link.
           */
          href?: string | null;
          newTab?: boolean | null;
        };
        /**
         * Background band colour.
         */
        tone?: ("paper" | "paper-2" | "white" | "teal-ink" | "teal") | null;
        id?: string | null;
        blockName?: string | null;
        blockType: "logoTicker";
      }
    | {
        items?:
          | {
              text: string;
              id?: string | null;
            }[]
          | null;
        heading?: string | null;
        cta?: {
          label?: string | null;
          /**
           * Leave empty to hide the link.
           */
          href?: string | null;
          newTab?: boolean | null;
        };
        id?: string | null;
        blockName?: string | null;
        blockType: "proofTicker";
      }
    | {
        /**
         * Small label above the heading, e.g. “Services”. The number is added automatically.
         */
        eyebrow?: string | null;
        heading: string;
        intro?: string | null;
        /**
         * Leave empty to show all services in their order.
         */
        services?: (number | Service)[] | null;
        layout?: ("cards" | "accordion") | null;
        /**
         * Background band colour.
         */
        tone?: ("paper" | "paper-2" | "white" | "teal-ink" | "teal") | null;
        id?: string | null;
        blockName?: string | null;
        blockType: "serviceGrid";
      }
    | {
        /**
         * Small label above the heading, e.g. “Services”. The number is added automatically.
         */
        eyebrow?: string | null;
        heading: string;
        intro?: string | null;
        /**
         * Leave empty to show the latest.
         */
        items?: (number | CaseStudy)[] | null;
        limit?: number | null;
        layout?: ("grid" | "carousel") | null;
        cta?: {
          label?: string | null;
          /**
           * Leave empty to hide the link.
           */
          href?: string | null;
          newTab?: boolean | null;
        };
        /**
         * Background band colour.
         */
        tone?: ("paper" | "paper-2" | "white" | "teal-ink" | "teal") | null;
        id?: string | null;
        blockName?: string | null;
        blockType: "workGrid";
      }
    | {
        /**
         * Small label above the heading, e.g. “Services”. The number is added automatically.
         */
        eyebrow?: string | null;
        heading?: string | null;
        /**
         * Leave empty to show featured testimonials.
         */
        items?: (number | Testimonial)[] | null;
        /**
         * Background band colour.
         */
        tone?: ("paper" | "paper-2" | "white" | "teal-ink" | "teal") | null;
        id?: string | null;
        blockName?: string | null;
        blockType: "testimonialCarousel";
      }
    | {
        /**
         * Small label above the heading, e.g. “Services”. The number is added automatically.
         */
        eyebrow?: string | null;
        heading?: string | null;
        subheading?: string | null;
        items?:
          | {
              label: string;
              /**
               * Where this need leads. Also pre-fills the brief builder.
               */
              service?: (number | null) | Service;
              id?: string | null;
            }[]
          | null;
        /**
         * Background band colour.
         */
        tone?: ("paper" | "paper-2" | "white" | "teal-ink" | "teal") | null;
        id?: string | null;
        blockName?: string | null;
        blockType: "needPicker";
      }
    | {
        /**
         * Small label above the heading, e.g. “Services”. The number is added automatically.
         */
        eyebrow?: string | null;
        heading?: string | null;
        items?:
          | {
              label: string;
              id?: string | null;
            }[]
          | null;
        /**
         * Background band colour.
         */
        tone?: ("paper" | "paper-2" | "white" | "teal-ink" | "teal") | null;
        id?: string | null;
        blockName?: string | null;
        blockType: "capabilities";
      }
    | {
        /**
         * Small label above the heading, e.g. “Services”. The number is added automatically.
         */
        eyebrow?: string | null;
        heading?: string | null;
        steps?:
          | {
              title: string;
              subtitle?: string | null;
              body: string;
              image?: (number | null) | Media;
              id?: string | null;
            }[]
          | null;
        /**
         * Background band colour.
         */
        tone?: ("paper" | "paper-2" | "white" | "teal-ink" | "teal") | null;
        id?: string | null;
        blockName?: string | null;
        blockType: "approachSteps";
      }
    | {
        /**
         * Small label above the heading, e.g. “Services”. The number is added automatically.
         */
        eyebrow?: string | null;
        heading?: string | null;
        image?: (number | null) | Media;
        items?:
          | {
              title: string;
              body: string;
              id?: string | null;
            }[]
          | null;
        /**
         * Background band colour.
         */
        tone?: ("paper" | "paper-2" | "white" | "teal-ink" | "teal") | null;
        id?: string | null;
        blockName?: string | null;
        blockType: "featureList";
      }
    | {
        /**
         * Small label above the heading, e.g. “Services”. The number is added automatically.
         */
        eyebrow?: string | null;
        heading?: string | null;
        scope?: ("home" | "services" | "contact" | "custom") | null;
        items?: (number | Faq)[] | null;
        image?: (number | null) | Media;
        /**
         * Background band colour.
         */
        tone?: ("paper" | "paper-2" | "white" | "teal-ink" | "teal") | null;
        id?: string | null;
        blockName?: string | null;
        blockType: "faq";
      }
    | {
        /**
         * Small label above the heading, e.g. “Services”. The number is added automatically.
         */
        eyebrow?: string | null;
        heading?: string | null;
        intro?: string | null;
        /**
         * Leave empty to show everyone.
         */
        members?: (number | TeamMember)[] | null;
        /**
         * Background band colour.
         */
        tone?: ("paper" | "paper-2" | "white" | "teal-ink" | "teal") | null;
        id?: string | null;
        blockName?: string | null;
        blockType: "teamGrid";
      }
    | {
        /**
         * Small label above the heading, e.g. “Services”. The number is added automatically.
         */
        eyebrow?: string | null;
        heading?: string | null;
        limit?: number | null;
        category?: (number | null) | Category;
        /**
         * Background band colour.
         */
        tone?: ("paper" | "paper-2" | "white" | "teal-ink" | "teal") | null;
        id?: string | null;
        blockName?: string | null;
        blockType: "blogCarousel";
      }
    | {
        /**
         * Small label above the heading, e.g. “Services”. The number is added automatically.
         */
        eyebrow?: string | null;
        heading: string;
        intro?: string | null;
        /**
         * Forms are managed under Inbox → Forms.
         */
        form: number | Form;
        layout?: ("split" | "stacked") | null;
        /**
         * Background band colour.
         */
        tone?: ("paper" | "paper-2" | "white" | "teal-ink" | "teal") | null;
        id?: string | null;
        blockName?: string | null;
        blockType: "leadForm";
      }
    | {
        /**
         * Small label above the heading, e.g. “Services”. The number is added automatically.
         */
        eyebrow?: string | null;
        heading?: string | null;
        intro?: string | null;
        items?:
          | {
              name: string;
              bestFor: string;
              length?: string | null;
              includes?:
                | {
                    item: string;
                    id?: string | null;
                  }[]
                | null;
              highlight?: boolean | null;
              id?: string | null;
            }[]
          | null;
        /**
         * Background band colour.
         */
        tone?: ("paper" | "paper-2" | "white" | "teal-ink" | "teal") | null;
        id?: string | null;
        blockName?: string | null;
        blockType: "engagementModels";
      }
    | {
        /**
         * Small label above the heading, e.g. “Services”. The number is added automatically.
         */
        eyebrow?: string | null;
        heading?: string | null;
        usLabel?: string | null;
        themLabel?: string | null;
        rows?:
          | {
              label: string;
              us: string;
              them: string;
              id?: string | null;
            }[]
          | null;
        /**
         * Background band colour.
         */
        tone?: ("paper" | "paper-2" | "white" | "teal-ink" | "teal") | null;
        id?: string | null;
        blockName?: string | null;
        blockType: "comparison";
      }
    | {
        /**
         * Small label above the heading, e.g. “Services”. The number is added automatically.
         */
        eyebrow?: string | null;
        heading: string;
        steps?:
          | {
              title: string;
              body: string;
              link?: {
                label?: string | null;
                /**
                 * Leave empty to hide the link.
                 */
                href?: string | null;
                newTab?: boolean | null;
              };
              id?: string | null;
            }[]
          | null;
        /**
         * Background band colour.
         */
        tone?: ("paper" | "paper-2" | "white" | "teal-ink" | "teal") | null;
        id?: string | null;
        blockName?: string | null;
        blockType: "processSteps";
      }
    | {
        eyebrow?: string | null;
        heading: string;
        buttonLabel?: string | null;
        /**
         * Background band colour.
         */
        tone?: ("paper" | "paper-2" | "white" | "teal-ink" | "teal") | null;
        id?: string | null;
        blockName?: string | null;
        blockType: "newsletter";
      }
    | {
        /**
         * Small label above the heading, e.g. “Services”. The number is added automatically.
         */
        eyebrow?: string | null;
        columns?:
          | {
              heading: string;
              body: string;
              link?: {
                label?: string | null;
                /**
                 * Leave empty to hide the link.
                 */
                href?: string | null;
                newTab?: boolean | null;
              };
              id?: string | null;
            }[]
          | null;
        images?:
          | {
              image: number | Media;
              id?: string | null;
            }[]
          | null;
        /**
         * Background band colour.
         */
        tone?: ("paper" | "paper-2" | "white" | "teal-ink" | "teal") | null;
        id?: string | null;
        blockName?: string | null;
        blockType: "textColumns";
      }
    | {
        media: number | Media;
        /**
         * For videos.
         */
        poster?: (number | null) | Media;
        caption?: string | null;
        aspect?: ("16/9" | "4/3" | "1/1" | "21/9") | null;
        /**
         * Background band colour.
         */
        tone?: ("paper" | "paper-2" | "white" | "teal-ink" | "teal") | null;
        id?: string | null;
        blockName?: string | null;
        blockType: "media";
      }
    | {
        content: RichText;
        width?: ("narrow" | "default") | null;
        /**
         * Background band colour.
         */
        tone?: ("paper" | "paper-2" | "white" | "teal-ink" | "teal") | null;
        id?: string | null;
        blockName?: string | null;
        blockType: "richText";
      }
    | {
        heading: string;
        text?: string | null;
        link: {
          label: string;
          /**
           * Internal path (e.g. /contact) or full URL (https://…).
           */
          href: string;
          /**
           * Open in a new tab (external links).
           */
          newTab?: boolean | null;
        };
        /**
         * Background band colour.
         */
        tone?: ("paper" | "paper-2" | "white" | "teal-ink" | "teal") | null;
        id?: string | null;
        blockName?: string | null;
        blockType: "cta";
      }
  )[];
  meta?: {
    title?: string | null;
    description?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
  };
  /**
   * URL path segment. Lower-case letters, numbers and dashes only.
   */
  slug: string;
  /**
   * Tick while this is placeholder copy or imagery. Untick once real content is in.
   */
  placeholder?: boolean | null;
  /**
   * Show the global “Ready to move forward?” band above the footer.
   */
  showCtaBand?: boolean | null;
  updatedAt?: string;
  createdAt?: string;
  _status?: ("draft" | "published") | null;
}

/**
 * Images, logos and videos used across the site.
 *
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: number;
  /**
   * Describe the image for screen readers and SEO. Use a short empty description like “decorative” only for purely decorative images.
   */
  alt: string;
  /**
   * Generated on upload; used for blur-up placeholders.
   */
  blurDataURL?: string | null;
  updatedAt?: string;
  createdAt?: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
  sizes?: {
    thumbnail?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    card?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    medium?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    large?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    hero?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    og?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
  };
}

export interface Service {
  id: number;
  title: string;
  tags?:
    | {
        label: string;
        id?: string | null;
      }[]
    | null;
  blurb: string;
  cardImage?: (number | null) | Media;
  /**
   * e.g. “Branding agency in Ahmedabad”.
   */
  eyebrow?: string | null;
  /**
   * Page H1. Wrap words in [[double brackets]] to highlight.
   */
  heading: string;
  lead?: string | null;
  /**
   * Pills under the heading, e.g. Brand strategy · Identity.
   */
  subServices?:
    | {
        label: string;
        id?: string | null;
      }[]
    | null;
  heroImage?: (number | null) | Media;
  /**
   * e.g. “We build brands to perform”.
   */
  checklistHeading?: string | null;
  checklistIntro?: string | null;
  checklist?:
    | {
        item: string;
        id?: string | null;
      }[]
    | null;
  /**
   * Inline consultation form shown in the hero.
   */
  form?: (number | null) | Form;
  /**
   * Extra sections below the checklist.
   */
  body?:
    | (
        | {
            content: RichText;
            width?: ("narrow" | "default") | null;
            /**
             * Background band colour.
             */
            tone?: ("paper" | "paper-2" | "white" | "teal-ink" | "teal") | null;
            id?: string | null;
            blockName?: string | null;
            blockType: "richText";
          }
        | {
            media: number | Media;
            /**
             * For videos.
             */
            poster?: (number | null) | Media;
            caption?: string | null;
            aspect?: ("16/9" | "4/3" | "1/1" | "21/9") | null;
            /**
             * Background band colour.
             */
            tone?: ("paper" | "paper-2" | "white" | "teal-ink" | "teal") | null;
            id?: string | null;
            blockName?: string | null;
            blockType: "media";
          }
        | {
            /**
             * Small label above the heading, e.g. “Services”. The number is added automatically.
             */
            eyebrow?: string | null;
            heading?: string | null;
            items?:
              | {
                  value: number;
                  /**
                   * e.g. + or %
                   */
                  suffix?: string | null;
                  label: string;
                  id?: string | null;
                }[]
              | null;
            /**
             * Background band colour.
             */
            tone?: ("paper" | "paper-2" | "white" | "teal-ink" | "teal") | null;
            id?: string | null;
            blockName?: string | null;
            blockType: "stats";
          }
        | {
            /**
             * Small label above the heading, e.g. “Services”. The number is added automatically.
             */
            eyebrow?: string | null;
            heading?: string | null;
            image?: (number | null) | Media;
            items?:
              | {
                  title: string;
                  body: string;
                  id?: string | null;
                }[]
              | null;
            /**
             * Background band colour.
             */
            tone?: ("paper" | "paper-2" | "white" | "teal-ink" | "teal") | null;
            id?: string | null;
            blockName?: string | null;
            blockType: "featureList";
          }
        | {
            /**
             * Small label above the heading, e.g. “Services”. The number is added automatically.
             */
            eyebrow?: string | null;
            columns?:
              | {
                  heading: string;
                  body: string;
                  link?: {
                    label?: string | null;
                    /**
                     * Leave empty to hide the link.
                     */
                    href?: string | null;
                    newTab?: boolean | null;
                  };
                  id?: string | null;
                }[]
              | null;
            images?:
              | {
                  image: number | Media;
                  id?: string | null;
                }[]
              | null;
            /**
             * Background band colour.
             */
            tone?: ("paper" | "paper-2" | "white" | "teal-ink" | "teal") | null;
            id?: string | null;
            blockName?: string | null;
            blockType: "textColumns";
          }
        | {
            /**
             * Small label above the heading, e.g. “Services”. The number is added automatically.
             */
            eyebrow?: string | null;
            heading?: string | null;
            /**
             * Leave empty to show featured testimonials.
             */
            items?: (number | Testimonial)[] | null;
            /**
             * Background band colour.
             */
            tone?: ("paper" | "paper-2" | "white" | "teal-ink" | "teal") | null;
            id?: string | null;
            blockName?: string | null;
            blockType: "testimonialCarousel";
          }
        | {
            /**
             * Small label above the heading, e.g. “Services”. The number is added automatically.
             */
            eyebrow?: string | null;
            heading?: string | null;
            scope?: ("home" | "services" | "contact" | "custom") | null;
            items?: (number | Faq)[] | null;
            image?: (number | null) | Media;
            /**
             * Background band colour.
             */
            tone?: ("paper" | "paper-2" | "white" | "teal-ink" | "teal") | null;
            id?: string | null;
            blockName?: string | null;
            blockType: "faq";
          }
        | {
            /**
             * Small label above the heading, e.g. “Services”. The number is added automatically.
             */
            eyebrow?: string | null;
            heading: string;
            intro?: string | null;
            /**
             * Forms are managed under Inbox → Forms.
             */
            form: number | Form;
            layout?: ("split" | "stacked") | null;
            /**
             * Background band colour.
             */
            tone?: ("paper" | "paper-2" | "white" | "teal-ink" | "teal") | null;
            id?: string | null;
            blockName?: string | null;
            blockType: "leadForm";
          }
        | {
            heading: string;
            text?: string | null;
            link: {
              label: string;
              /**
               * Internal path (e.g. /contact) or full URL (https://…).
               */
              href: string;
              /**
               * Open in a new tab (external links).
               */
              newTab?: boolean | null;
            };
            /**
             * Background band colour.
             */
            tone?: ("paper" | "paper-2" | "white" | "teal-ink" | "teal") | null;
            id?: string | null;
            blockName?: string | null;
            blockType: "cta";
          }
      )[]
    | null;
  /**
   * Leave empty to show case studies tagged with this service.
   */
  relatedWork?: (number | CaseStudy)[] | null;
  meta?: {
    title?: string | null;
    description?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
  };
  /**
   * URL path segment. Lower-case letters, numbers and dashes only.
   */
  slug: string;
  /**
   * Tick while this is placeholder copy or imagery. Untick once real content is in.
   */
  placeholder?: boolean | null;
  order?: number | null;
  icon?: ("brand" | "design" | "growth" | "social" | "ai" | "consulting") | null;
  updatedAt?: string;
  createdAt?: string;
  _status?: ("draft" | "published") | null;
}

export interface Form {
  id: number;
  title: string;
  fields?:
    | (
        | {
            name: string;
            label?: string | null;
            width?: number | null;
            required?: boolean | null;
            defaultValue?: boolean | null;
            id?: string | null;
            blockName?: string | null;
            blockType: "checkbox";
          }
        | {
            name: string;
            label?: string | null;
            width?: number | null;
            required?: boolean | null;
            id?: string | null;
            blockName?: string | null;
            blockType: "email";
          }
        | {
            message?: RichText | null;
            id?: string | null;
            blockName?: string | null;
            blockType: "message";
          }
        | {
            name: string;
            label?: string | null;
            width?: number | null;
            defaultValue?: number | null;
            required?: boolean | null;
            id?: string | null;
            blockName?: string | null;
            blockType: "number";
          }
        | {
            name: string;
            label?: string | null;
            width?: number | null;
            defaultValue?: string | null;
            placeholder?: string | null;
            options?:
              | {
                  label: string;
                  value: string;
                  id?: string | null;
                }[]
              | null;
            required?: boolean | null;
            id?: string | null;
            blockName?: string | null;
            blockType: "select";
          }
        | {
            name: string;
            label?: string | null;
            width?: number | null;
            defaultValue?: string | null;
            required?: boolean | null;
            id?: string | null;
            blockName?: string | null;
            blockType: "text";
          }
        | {
            name: string;
            label?: string | null;
            width?: number | null;
            defaultValue?: string | null;
            required?: boolean | null;
            id?: string | null;
            blockName?: string | null;
            blockType: "textarea";
          }
      )[]
    | null;
  submitButtonLabel?: string | null;
  confirmationType?: ("message" | "redirect") | null;
  confirmationMessage?: RichText | null;
  redirect?: {
    url: string;
  };
  emails?:
    | {
        emailTo?: string | null;
        cc?: string | null;
        bcc?: string | null;
        replyTo?: string | null;
        emailFrom?: string | null;
        subject: string;
        message?: RichText | null;
        id?: string | null;
      }[]
    | null;
  updatedAt?: string;
  createdAt?: string;
}

export interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role?: string | null;
  company?: string | null;
  avatar?: (number | null) | Media;
  logo?: (number | null) | Media;
  /**
   * Shown on this service's page.
   */
  service?: (number | null) | Service;
  /**
   * Featured quotes appear in the Home carousel.
   */
  featured?: boolean | null;
  order?: number | null;
  /**
   * Tick while this is placeholder copy or imagery. Untick once real content is in.
   */
  placeholder?: boolean | null;
  updatedAt?: string;
  createdAt?: string;
}

/**
 * Questions for the FAQ accordions. Scope decides where each one appears.
 *
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "faqs".
 */
export interface Faq {
  id: number;
  question: string;
  answer: string;
  scope?: ("home" | "services" | "contact")[] | null;
  /**
   * Also show on this specific service page.
   */
  service?: (number | null) | Service;
  order?: number | null;
  /**
   * Tick while this is placeholder copy or imagery. Untick once real content is in.
   */
  placeholder?: boolean | null;
  updatedAt?: string;
  createdAt?: string;
}

export interface CaseStudy {
  id: number;
  /**
   * Usually the client name.
   */
  title: string;
  client: string;
  industry?: string | null;
  services: (number | Service)[];
  /**
   * Card blurb, 1–2 sentences.
   */
  summary: string;
  cover?: (number | null) | Media;
  /**
   * Headline results, e.g. 400% / Organic traffic increase.
   */
  stats?:
    | {
        value: string;
        label: string;
        id?: string | null;
      }[]
    | null;
  /**
   * Opening paragraph under the title.
   */
  intro?: string | null;
  /**
   * The brief. Wrap phrases in [[double brackets]] to emphasise.
   */
  objective?: string | null;
  sections?:
    | {
        eyebrow?: string | null;
        heading: string;
        body: string;
        image?: (number | null) | Media;
        id?: string | null;
      }[]
    | null;
  /**
   * Optional before/after image slider.
   */
  beforeAfter?: {
    before?: (number | null) | Media;
    after?: (number | null) | Media;
    caption?: string | null;
  };
  /**
   * Outcome timeline, e.g. Week 0 → Launch → +90 days.
   */
  timeline?:
    | {
        when: string;
        what: string;
        id?: string | null;
      }[]
    | null;
  video?: {
    /**
     * MP4/WebM upload.
     */
    file?: (number | null) | Media;
    /**
     * Or a YouTube/Vimeo URL.
     */
    url?: string | null;
    poster?: (number | null) | Media;
  };
  testimonial?: (number | null) | Testimonial;
  /**
   * Extra sections.
   */
  body?:
    | (
        | {
            content: RichText;
            width?: ("narrow" | "default") | null;
            /**
             * Background band colour.
             */
            tone?: ("paper" | "paper-2" | "white" | "teal-ink" | "teal") | null;
            id?: string | null;
            blockName?: string | null;
            blockType: "richText";
          }
        | {
            media: number | Media;
            /**
             * For videos.
             */
            poster?: (number | null) | Media;
            caption?: string | null;
            aspect?: ("16/9" | "4/3" | "1/1" | "21/9") | null;
            /**
             * Background band colour.
             */
            tone?: ("paper" | "paper-2" | "white" | "teal-ink" | "teal") | null;
            id?: string | null;
            blockName?: string | null;
            blockType: "media";
          }
        | {
            /**
             * Small label above the heading, e.g. “Services”. The number is added automatically.
             */
            eyebrow?: string | null;
            heading?: string | null;
            items?:
              | {
                  value: number;
                  /**
                   * e.g. + or %
                   */
                  suffix?: string | null;
                  label: string;
                  id?: string | null;
                }[]
              | null;
            /**
             * Background band colour.
             */
            tone?: ("paper" | "paper-2" | "white" | "teal-ink" | "teal") | null;
            id?: string | null;
            blockName?: string | null;
            blockType: "stats";
          }
        | {
            /**
             * Small label above the heading, e.g. “Services”. The number is added automatically.
             */
            eyebrow?: string | null;
            heading?: string | null;
            image?: (number | null) | Media;
            items?:
              | {
                  title: string;
                  body: string;
                  id?: string | null;
                }[]
              | null;
            /**
             * Background band colour.
             */
            tone?: ("paper" | "paper-2" | "white" | "teal-ink" | "teal") | null;
            id?: string | null;
            blockName?: string | null;
            blockType: "featureList";
          }
        | {
            /**
             * Small label above the heading, e.g. “Services”. The number is added automatically.
             */
            eyebrow?: string | null;
            columns?:
              | {
                  heading: string;
                  body: string;
                  link?: {
                    label?: string | null;
                    /**
                     * Leave empty to hide the link.
                     */
                    href?: string | null;
                    newTab?: boolean | null;
                  };
                  id?: string | null;
                }[]
              | null;
            images?:
              | {
                  image: number | Media;
                  id?: string | null;
                }[]
              | null;
            /**
             * Background band colour.
             */
            tone?: ("paper" | "paper-2" | "white" | "teal-ink" | "teal") | null;
            id?: string | null;
            blockName?: string | null;
            blockType: "textColumns";
          }
        | {
            /**
             * Small label above the heading, e.g. “Services”. The number is added automatically.
             */
            eyebrow?: string | null;
            heading?: string | null;
            /**
             * Leave empty to show featured testimonials.
             */
            items?: (number | Testimonial)[] | null;
            /**
             * Background band colour.
             */
            tone?: ("paper" | "paper-2" | "white" | "teal-ink" | "teal") | null;
            id?: string | null;
            blockName?: string | null;
            blockType: "testimonialCarousel";
          }
        | {
            /**
             * Small label above the heading, e.g. “Services”. The number is added automatically.
             */
            eyebrow?: string | null;
            heading?: string | null;
            scope?: ("home" | "services" | "contact" | "custom") | null;
            items?: (number | Faq)[] | null;
            image?: (number | null) | Media;
            /**
             * Background band colour.
             */
            tone?: ("paper" | "paper-2" | "white" | "teal-ink" | "teal") | null;
            id?: string | null;
            blockName?: string | null;
            blockType: "faq";
          }
        | {
            /**
             * Small label above the heading, e.g. “Services”. The number is added automatically.
             */
            eyebrow?: string | null;
            heading: string;
            intro?: string | null;
            /**
             * Forms are managed under Inbox → Forms.
             */
            form: number | Form;
            layout?: ("split" | "stacked") | null;
            /**
             * Background band colour.
             */
            tone?: ("paper" | "paper-2" | "white" | "teal-ink" | "teal") | null;
            id?: string | null;
            blockName?: string | null;
            blockType: "leadForm";
          }
        | {
            heading: string;
            text?: string | null;
            link: {
              label: string;
              /**
               * Internal path (e.g. /contact) or full URL (https://…).
               */
              href: string;
              /**
               * Open in a new tab (external links).
               */
              newTab?: boolean | null;
            };
            /**
             * Background band colour.
             */
            tone?: ("paper" | "paper-2" | "white" | "teal-ink" | "teal") | null;
            id?: string | null;
            blockName?: string | null;
            blockType: "cta";
          }
      )[]
    | null;
  meta?: {
    title?: string | null;
    description?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
  };
  /**
   * URL path segment. Lower-case letters, numbers and dashes only.
   */
  slug: string;
  /**
   * Tick while this is placeholder copy or imagery. Untick once real content is in.
   */
  placeholder?: boolean | null;
  publishedAt?: string | null;
  featured?: boolean | null;
  updatedAt?: string;
  createdAt?: string;
  _status?: ("draft" | "published") | null;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  photo?: (number | null) | Media;
  bio?: string | null;
  socials?:
    | {
        platform: "LinkedIn" | "Instagram" | "X" | "Website";
        url: string;
        id?: string | null;
      }[]
    | null;
  /**
   * Founders get the spotlight block on Culture.
   */
  founder?: boolean | null;
  order?: number | null;
  /**
   * Tick while this is placeholder copy or imagery. Untick once real content is in.
   */
  placeholder?: boolean | null;
  updatedAt?: string;
  createdAt?: string;
}

export interface Category {
  id: number;
  title: string;
  description?: string | null;
  /**
   * URL path segment. Lower-case letters, numbers and dashes only.
   */
  slug: string;
  updatedAt?: string;
  createdAt?: string;
}

export interface Post {
  id: number;
  title: string;
  /**
   * Shown on cards and as the dek under the title.
   */
  excerpt: string;
  cover?: (number | null) | Media;
  content: RichText;
  meta?: {
    title?: string | null;
    description?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
  };
  /**
   * URL path segment. Lower-case letters, numbers and dashes only.
   */
  slug: string;
  /**
   * Tick while this is placeholder copy or imagery. Untick once real content is in.
   */
  placeholder?: boolean | null;
  category: number | Category;
  tags?:
    | {
        tag: string;
        id?: string | null;
      }[]
    | null;
  author?: (number | null) | Author;
  publishedAt?: string | null;
  /**
   * Leave empty to pick by category.
   */
  related?: (number | Post)[] | null;
  updatedAt?: string;
  createdAt?: string;
  _status?: ("draft" | "published") | null;
}

export interface Author {
  id: number;
  name: string;
  role?: string | null;
  avatar?: (number | null) | Media;
  updatedAt?: string;
  createdAt?: string;
}

/**
 * Logos for the client marquee. Lower order = earlier in the ticker.
 *
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "clients".
 */
export interface Client {
  id: number;
  name: string;
  /**
   * SVG preferred. Mono/dark version; it is tinted on dark bands.
   */
  logo?: (number | null) | Media;
  website?: string | null;
  featured?: boolean | null;
  order?: number | null;
  /**
   * Tick while this is placeholder copy or imagery. Untick once real content is in.
   */
  placeholder?: boolean | null;
  updatedAt?: string;
  createdAt?: string;
}

/**
 * Contact details, socials and defaults used everywhere.
 *
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "site-settings".
 */
export interface SiteSetting {
  id: number;
  name: string;
  tagline?: string | null;
  email: string;
  /**
   * [PLACEHOLDER] until the real number is supplied.
   */
  phone?: string | null;
  /**
   * tel: link, digits only e.g. +919876543210
   */
  phoneHref?: string | null;
  addressLine1?: string | null;
  addressLine2?: string | null;
  city?: string | null;
  hours?: string | null;
  mapUrl?: string | null;
  socials?:
    | {
        platform: "Instagram" | "LinkedIn" | "X" | "YouTube" | "Behance" | "Dribbble";
        url: string;
        id?: string | null;
      }[]
    | null;
  /**
   * Headline numbers reused across the site.
   */
  stats?:
    | {
        value: number;
        suffix?: string | null;
        label: string;
        id?: string | null;
      }[]
    | null;
  /**
   * Trust badges shown as stickers in heroes, e.g. “Est. 20XX”.
   */
  badges?:
    | {
        text: string;
        id?: string | null;
      }[]
    | null;
  defaultTitle?: string | null;
  defaultDescription?: string | null;
  defaultImage?: (number | null) | Media;
  /**
   * Reserved for later. Leave empty.
   */
  analyticsId?: string | null;
  legalName?: string | null;
  /**
   * e.g. GSTIN / CIN. [PLACEHOLDER]
   */
  registrationNumbers?: string | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}

/**
 * Main navigation. Items with children become dropdown menus.
 *
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "header".
 */
export interface Header {
  id: number;
  items?:
    | {
        label: string;
        href: string;
        /**
         * Dropdown entries.
         */
        children?:
          | {
              label: string;
              href: string;
              description?: string | null;
              id?: string | null;
            }[]
          | null;
        id?: string | null;
      }[]
    | null;
  cta: {
    label: string;
    href: string;
  };
  secondary?:
    | {
        label: string;
        href: string;
        newTab?: boolean | null;
        id?: string | null;
      }[]
    | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}

export interface Footer {
  id: number;
  /**
   * Short agency description at the top of the footer.
   */
  description?: string | null;
  columns?:
    | {
        heading: string;
        links?:
          | {
              label: string;
              href: string;
              newTab?: boolean | null;
              id?: string | null;
            }[]
          | null;
        id?: string | null;
      }[]
    | null;
  newsletter?: {
    heading?: string | null;
    text?: string | null;
    placeholder?: string | null;
    buttonLabel?: string | null;
  };
  legal?:
    | {
        label: string;
        href: string;
        newTab?: boolean | null;
        id?: string | null;
      }[]
    | null;
  copyright?: string | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}

export interface CtaBand {
  id: number;
  /**
   * Optional emoji above the heading.
   */
  emoji?: string | null;
  heading: string;
  subheading?: string | null;
  link: {
    label: string;
    /**
     * Internal path (e.g. /contact) or full URL (https://…).
     */
    href: string;
    /**
     * Open in a new tab (external links).
     */
    newTab?: boolean | null;
  };
  updatedAt?: string | null;
  createdAt?: string | null;
}
