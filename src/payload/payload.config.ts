import path from "node:path";
import { fileURLToPath } from "node:url";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { resendAdapter } from "@payloadcms/email-resend";
import { formBuilderPlugin } from "@payloadcms/plugin-form-builder";
import { redirectsPlugin } from "@payloadcms/plugin-redirects";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import { buildConfig, type Plugin } from "payload";
import sharp from "sharp";

import { getSiteUrl, SITE_NAME } from "@/lib/site";
import { Authors } from "@/payload/collections/authors";
import { CaseStudies } from "@/payload/collections/case-studies";
import { Categories } from "@/payload/collections/categories";
import { Clients } from "@/payload/collections/clients";
import { Faqs } from "@/payload/collections/faqs";
import { Media } from "@/payload/collections/media";
import { NewsletterSubscribers } from "@/payload/collections/newsletter-subscribers";
import { Pages } from "@/payload/collections/pages";
import { Posts } from "@/payload/collections/posts";
import { Services } from "@/payload/collections/services";
import { TeamMembers } from "@/payload/collections/team-members";
import { Testimonials } from "@/payload/collections/testimonials";
import { Users } from "@/payload/collections/users";
import { CtaBand } from "@/payload/globals/cta-band";
import { Footer } from "@/payload/globals/footer";
import { Header } from "@/payload/globals/header";
import { SiteSettings } from "@/payload/globals/site-settings";
import { revalidateEverything } from "@/payload/hooks/revalidate";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const useS3 = Boolean(process.env.S3_BUCKET && process.env.S3_ACCESS_KEY_ID);

const plugins: Plugin[] = [
  seoPlugin({
    generateTitle: ({ doc }) => (doc?.title ? `${doc.title} – ${SITE_NAME}` : SITE_NAME),
    generateDescription: ({ doc }) =>
      (doc?.excerpt as string | undefined) ??
      (doc?.summary as string | undefined) ??
      (doc?.blurb as string | undefined) ??
      "",
    generateURL: ({ doc, collectionSlug }) => {
      const base = getSiteUrl();
      const slug = doc?.slug as string | undefined;
      if (!slug) return base;
      const prefix =
        collectionSlug === "posts"
          ? "/blog"
          : collectionSlug === "case-studies"
            ? "/work"
            : collectionSlug === "services"
              ? "/services"
              : "";
      return slug === "home" ? base : `${base}${prefix}/${slug}`;
    },
  }),
  formBuilderPlugin({
    fields: { payment: false, state: false, country: false },
    defaultToEmail: process.env.EMAIL_TO,
    formOverrides: {
      admin: { group: "Inbox" },
    },
    formSubmissionOverrides: {
      admin: { group: "Inbox" },
    },
  }),
  redirectsPlugin({
    collections: ["pages", "posts", "case-studies", "services"],
    overrides: {
      admin: { group: "Settings" },
      hooks: {
        afterChange: [
          ({ doc, req }) => {
            revalidateEverything("redirects changed", req.payload.logger);
            return doc;
          },
        ],
      },
    },
  }),
];

if (useS3) {
  plugins.push(
    s3Storage({
      collections: { media: { prefix: "media" } },
      bucket: process.env.S3_BUCKET ?? "",
      config: {
        region: process.env.S3_REGION ?? "auto",
        endpoint: process.env.S3_ENDPOINT,
        forcePathStyle: true,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID ?? "",
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? "",
        },
      },
    }),
  );
}

export default buildConfig({
  serverURL: getSiteUrl(),
  secret: process.env.PAYLOAD_SECRET ?? "",
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname, "../app/(payload)") },
    meta: {
      titleSuffix: " – Upsure admin",
      description: "Edit the Upsure website.",
    },
    livePreview: {
      breakpoints: [
        { label: "Mobile", name: "mobile", width: 375, height: 812 },
        { label: "Tablet", name: "tablet", width: 768, height: 1024 },
        { label: "Desktop", name: "desktop", width: 1440, height: 900 },
      ],
    },
  },
  collections: [
    Pages,
    Services,
    CaseStudies,
    Posts,
    Categories,
    Authors,
    Testimonials,
    TeamMembers,
    Clients,
    Faqs,
    Media,
    NewsletterSubscribers,
    Users,
  ],
  globals: [SiteSettings, Header, Footer, CtaBand],
  editor: lexicalEditor(),
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI ?? "" },
    // In development the schema is pushed automatically; in production run migrations.
    push: process.env.NODE_ENV !== "production",
  }),
  email: process.env.RESEND_API_KEY
    ? resendAdapter({
        apiKey: process.env.RESEND_API_KEY,
        defaultFromAddress: process.env.EMAIL_FROM?.match(/<(.+)>/)?.[1] ?? "hello@upsuremedia.com",
        defaultFromName: process.env.EMAIL_FROM?.split("<")[0]?.trim() || "Upsure",
      })
    : undefined,
  plugins,
  sharp,
  cors: [getSiteUrl()],
  csrf: [getSiteUrl()],
  typescript: { outputFile: path.resolve(dirname, "../payload-types.ts") },
  graphQL: { disable: true },
});
