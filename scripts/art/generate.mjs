/**
 * Renders the site artwork to public/images/demo/<key>.webp and updates
 * src/content/media-manifest.json (size + blur placeholder).
 *
 *   node scripts/art/generate.mjs            all images
 *   node scripts/art/generate.mjs svc-pr     only the keys given
 *
 * Files are named <key>-<hash>.webp so a changed image gets a new URL; the
 * optimised copies are cached by browsers for 30 days under the old one.
 *
 * Alt text lives with each image in `ART` and is copied into the media map in
 * src/content/data.ts by hand (it is content, so it stays editable there).
 */
import { createHash } from "node:crypto";
import { readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

import * as R from "./rooms.mjs";
import * as P from "./rooms-pages.mjs";
import { C } from "./studio.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const outDir = path.join(root, "public/images/demo");
const manifestPath = path.join(root, "src/content/media-manifest.json");

/** key → scene. Keep in sync with the `media` map in src/content/data.ts. */
export const ART = {
  "hero-1": R.heroSocial,
  "hero-2": R.heroCommerce,
  "hero-3": R.heroGrowth,
  "svc-brand-consulting": R.svcBrandConsulting,
  "svc-branding": R.svcBranding,
  "svc-personal-branding": R.svcPersonalBranding,
  "svc-pr": R.svcPR,
  "svc-social": R.svcSocial,
  "svc-influencer": R.svcInfluencer,
  "svc-performance": R.svcPerformance,
  "svc-ecommerce": R.svcEcommerce,
  "svc-seo": R.svcSEO,
  "svc-ai": R.svcAI,
  "work-1": P.workEyewear,
  "work-2": P.workAuto,
  "work-3": P.workTech,
  "work-4": P.workSports,
  before: P.websiteBefore,
  after: P.websiteAfter,
  "post-1": P.postAIGrowth,
  "post-6": P.postPositioning,
  "post-7": P.postContent,
  "post-8": P.postCompass,
  "post-qc": P.postQuickCommerce,
  "post-geo": P.postGEO,
  "services-hero": P.servicesOverview,
  "approach-illo": P.approachDiscover,
  "one-team": P.oneTeamPlan,
  "faq-chat": P.faqChat,
  "ind-d2c": P.industryD2C,
  "ind-b2b": P.industryB2B,
  "about-1": P.sceneWorkshop,
  "about-2": P.sceneShoot,
  "about-3": P.sceneReview,
  "team-table": P.sceneCalendar,
  "team-couch": P.sceneLounge,
  "team-review": P.sceneEdit,
  "team-present": P.scenePresent,
  "culture-hero": P.sceneValues,
  "person-1": () => P.memberCard("Vrinda", "Strategy", C.sun),
  "person-2": () => P.memberCard("Aarav", "Creative", C.mint),
  "person-3": () => P.memberCard("Kabir", "Performance", C.peach),
  "person-4": () => P.memberCard("Riddhi", "Social", C.tealSoft),
  "og-default": P.ogCard,
};

async function render(key) {
  const [width, height, markup] = ART[key]();
  const buffer = Buffer.from(markup);
  const webp = await sharp(buffer, { density: 96 }).webp({ quality: 86 }).toBuffer();
  const name = `${key}-${createHash("sha1").update(webp).digest("hex").slice(0, 8)}.webp`;
  const stale = new RegExp(`^${key}(-[0-9a-f]{8})?\\.webp$`);
  for (const f of await readdir(outDir)) if (stale.test(f)) await rm(path.join(outDir, f));
  await writeFile(path.join(outDir, name), webp);
  const blur = await sharp(buffer).resize(16).webp({ quality: 40 }).toBuffer();
  return {
    file: `/images/demo/${name}`,
    width,
    height,
    blur: `data:image/webp;base64,${blur.toString("base64")}`,
  };
}

const only = process.argv.slice(2);
const keys = only.length ? only : Object.keys(ART);
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
for (const key of keys) {
  if (!ART[key]) throw new Error(`Unknown artwork key: ${key}`);
  manifest[key] = await render(key);
  console.warn(`  ${key}`);
}
const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
await writeFile(manifestPath, `${JSON.stringify(sorted, null, 2)}\n`);
console.warn(`Rendered ${keys.length} image(s).`);
