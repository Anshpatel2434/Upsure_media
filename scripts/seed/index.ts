/* eslint-disable no-console */
/**
 * Seeds the CMS with every piece of current-site content plus tagged placeholders.
 * Idempotent: documents are matched by slug/key and updated in place, so it is
 * safe to run again after changing this dataset.
 *
 *   npm run seed            # seed / update
 *   npm run seed -- --reset # wipe content collections first
 */
import "dotenv/config";

import { getPayload, type Payload } from "payload";

import config from "@payload-config";

import * as data from "./content";
import { placeholderImage, placeholderLogo } from "./images";
import { richText } from "./lexical";

type Id = number | string;
type AnyRecord = Record<string, unknown>;

const RESET = process.argv.includes("--reset");
const CONTENT_COLLECTIONS = [
  "pages",
  "services",
  "case-studies",
  "posts",
  "categories",
  "authors",
  "testimonials",
  "team-members",
  "clients",
  "faqs",
  "forms",
  "media",
] as const;

async function upsert(
  payload: Payload,
  collection: string,
  where: AnyRecord,
  doc: AnyRecord,
): Promise<Id> {
  const existing = await payload.find({
    collection: collection as never,
    where: where as never,
    limit: 1,
    pagination: false,
    depth: 0,
    draft: true,
  });
  const found = existing.docs[0] as { id: Id } | undefined;
  const context = { disableRevalidate: true };
  if (found) {
    await payload.update({
      collection: collection as never,
      id: found.id,
      data: doc as never,
      context,
      depth: 0,
    });
    return found.id;
  }
  const created = (await payload.create({
    collection: collection as never,
    data: doc as never,
    context,
    depth: 0,
  })) as { id: Id };
  return created.id;
}

async function uploadMedia(
  payload: Payload,
  key: string,
  alt: string,
  file: { data: Buffer; mimetype: string; name: string },
): Promise<Id> {
  const existing = await payload.find({
    collection: "media",
    where: { filename: { equals: file.name } },
    limit: 1,
    depth: 0,
  });
  if (existing.docs[0]) {
    await payload.update({
      collection: "media",
      id: existing.docs[0].id,
      data: { alt },
      context: { disableRevalidate: true },
    });
    return existing.docs[0].id;
  }
  const created = await payload.create({
    collection: "media",
    data: { alt },
    file: { ...file, size: file.data.byteLength },
    context: { disableRevalidate: true },
  });
  console.log(`  media  ${key} → #${created.id}`);
  return created.id;
}

async function main() {
  const payload = await getPayload({ config });
  const t0 = Date.now();

  if (RESET) {
    console.log("Resetting content collections…");
    for (const collection of CONTENT_COLLECTIONS) {
      await payload.delete({
        collection: collection as never,
        where: { id: { exists: true } },
        context: { disableRevalidate: true },
      });
    }
  }

  const ctx: data.Ctx = {
    media: {},
    services: {},
    caseStudies: {},
    testimonials: {},
    faqs: {},
    categories: {},
    forms: {},
    team: {},
  };

  /* Media ------------------------------------------------------------------ */
  console.log("Media…");
  for (const [key, spec] of Object.entries(data.mediaSpecs)) {
    const buffer = await placeholderImage(spec.label, spec.w, spec.h, spec.palette);
    ctx.media[key] = await uploadMedia(payload, key, spec.alt, {
      data: buffer,
      mimetype: "image/webp",
      name: `placeholder-${key}.webp`,
    });
  }
  const logoIds: Record<string, Id> = {};
  for (const name of data.clients) {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    logoIds[name] = await uploadMedia(payload, `logo-${slug}`, `${name} logo`, {
      data: placeholderLogo(name),
      mimetype: "image/svg+xml",
      name: `logo-${slug}.svg`,
    });
  }

  /* Forms ------------------------------------------------------------------ */
  console.log("Forms…");
  for (const [key, form] of Object.entries(data.forms)) {
    ctx.forms[key] = await upsert(
      payload,
      "forms",
      { title: { equals: form.title } },
      {
        ...form,
        emails: [
          {
            emailTo: process.env.EMAIL_TO ?? "upsureai@gmail.com",
            subject: `New ${form.title.toLowerCase()} from the website`,
            message: richText(
              "A new submission arrived. Open the admin panel → Inbox → Form submissions to read it.",
            ),
          },
        ],
      },
    );
  }

  /* Simple collections ------------------------------------------------------ */
  console.log("Clients, categories, authors, team…");
  let order = 0;
  for (const name of data.clients) {
    await upsert(
      payload,
      "clients",
      { name: { equals: name } },
      {
        name,
        logo: logoIds[name],
        featured: true,
        order: ++order,
        placeholder: true,
      },
    );
  }
  for (const c of data.categories) {
    ctx.categories[c.slug] = await upsert(payload, "categories", { slug: { equals: c.slug } }, c);
  }
  const authorId = await upsert(
    payload,
    "authors",
    { name: { equals: "Team Upsure" } },
    {
      name: "Team Upsure",
      role: "Strategy, creative & growth",
    },
  );
  for (const m of data.team) {
    const { key, photo, ...rest } = m;
    ctx.team[key] = await upsert(
      payload,
      "team-members",
      { name: { equals: m.name } },
      {
        ...rest,
        photo: ctx.media[photo],
      },
    );
  }

  /* Services ---------------------------------------------------------------- */
  console.log("Services…");
  for (const s of data.services) {
    const { tags, subServices, checklist, cardImage, heroImage, ...rest } = s;
    ctx.services[s.slug] = await upsert(
      payload,
      "services",
      { slug: { equals: s.slug } },
      {
        ...rest,
        tags: tags.map((label) => ({ label })),
        subServices: subServices.map((label) => ({ label })),
        checklist: checklist.map((item) => ({ item })),
        cardImage: ctx.media[cardImage],
        heroImage: ctx.media[heroImage],
        form: ctx.forms.consultation,
        _status: "published",
      },
    );
  }

  /* FAQs & testimonials ------------------------------------------------------ */
  console.log("FAQs & testimonials…");
  for (const f of data.faqs) {
    const { key, service, ...rest } = f;
    ctx.faqs[key] = await upsert(
      payload,
      "faqs",
      { question: { equals: f.question } },
      {
        ...rest,
        service: service ? ctx.services[service] : undefined,
      },
    );
  }
  for (const t of data.testimonials) {
    const { key, avatar, service, ...rest } = t;
    ctx.testimonials[key] = await upsert(
      payload,
      "testimonials",
      { quote: { equals: t.quote } },
      {
        ...rest,
        avatar: avatar ? ctx.media[avatar] : undefined,
        service: service ? ctx.services[service] : undefined,
      },
    );
  }

  /* Case studies -------------------------------------------------------------- */
  console.log("Case studies…");
  for (const [i, c] of data.caseStudies.entries()) {
    const { services, cover, stats, ...rest } = c;
    const testimonialKeys = Object.keys(ctx.testimonials);
    ctx.caseStudies[c.slug] = await upsert(
      payload,
      "case-studies",
      { slug: { equals: c.slug } },
      {
        ...rest,
        services: services.map((slug) => ctx.services[slug]),
        cover: ctx.media[cover],
        stats: stats.map(([value, label]) => ({ value, label })),
        beforeAfter: {
          before: ctx.media["before"],
          after: ctx.media["after"],
          caption: "Placeholder before / after",
        },
        testimonial: ctx.testimonials[testimonialKeys[(i + 1) % testimonialKeys.length] ?? "akash"],
        _status: "published",
      },
    );
  }

  /* Posts ------------------------------------------------------------------- */
  console.log("Posts…");
  const postIds: Record<string, Id> = {};
  for (const post of data.posts) {
    const { category, cover, tags, content, ...rest } = post;
    postIds[post.slug] = await upsert(
      payload,
      "posts",
      { slug: { equals: post.slug } },
      {
        ...rest,
        category: ctx.categories[category],
        cover: ctx.media[cover],
        tags: tags.map((tag) => ({ tag })),
        author: authorId,
        content: richText(content),
        _status: "published",
      },
    );
  }
  // "More from the blog" on the AI post links to the three articles the live site referenced.
  await payload.update({
    collection: "posts",
    id: postIds["ai-in-the-growth-engine-2026"] as never,
    data: {
      related: [
        "why-brand-strategy-comes-before-design",
        "content-engines-that-compound",
        "hidden-cost-of-bad-positioning",
      ].map((s) => postIds[s]) as never,
    },
    context: { disableRevalidate: true },
  });

  /* Globals ------------------------------------------------------------------ */
  console.log("Globals…");
  await payload.updateGlobal({
    slug: "site-settings",
    data: { ...data.siteSettings, defaultImage: ctx.media["og-default"] } as never,
    context: { disableRevalidate: true },
  });
  await payload.updateGlobal({
    slug: "header",
    data: data.header(ctx) as never,
    context: { disableRevalidate: true },
  });
  await payload.updateGlobal({
    slug: "footer",
    data: data.footer as never,
    context: { disableRevalidate: true },
  });
  await payload.updateGlobal({
    slug: "cta-band",
    data: data.ctaBand as never,
    context: { disableRevalidate: true },
  });

  /* Pages -------------------------------------------------------------------- */
  console.log("Pages…");
  for (const page of data.pages(ctx)) {
    await upsert(
      payload,
      "pages",
      { slug: { equals: page.slug } },
      { ...page, _status: "published" },
    );
    console.log(`  page   /${page.slug === "home" ? "" : page.slug}`);
  }

  console.log(`Done in ${((Date.now() - t0) / 1000).toFixed(1)}s.`);
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
