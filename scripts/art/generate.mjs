/**
 * Renders the site artwork to public/images/demo/<key>.webp and updates
 * src/content/media-manifest.json (size + blur placeholder).
 *
 *   node scripts/art/generate.mjs            all images
 *   node scripts/art/generate.mjs svc-pr     only the keys given
 *
 * Alt text lives with each image in `ART` and is copied into the media map in
 * src/content/data.ts by hand (it is content, so it stays editable there).
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

import * as S from "./scenes.mjs";
import { C } from "./kit.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const outDir = path.join(root, "public/images/demo");
const manifestPath = path.join(root, "src/content/media-manifest.json");

/** key → scene. Keep in sync with the `media` map in src/content/data.ts. */
export const ART = {
  "hero-1": S.heroSocial,
  "hero-2": S.heroCommerce,
  "hero-3": S.heroGrowth,
  "svc-brand-consulting": S.svcBrandConsulting,
  "svc-branding": S.svcBranding,
  "svc-personal-branding": S.svcPersonalBranding,
  "svc-pr": S.svcPR,
  "svc-social": S.svcSocial,
  "svc-influencer": S.svcInfluencer,
  "svc-performance": S.svcPerformance,
  "svc-ecommerce": S.svcEcommerce,
  "svc-seo": S.svcSEO,
  "svc-ai": S.svcAI,
  "work-1": S.workEyewear,
  "work-2": S.workAuto,
  "work-3": S.workTech,
  "work-4": S.workSports,
  before: S.websiteBefore,
  after: S.websiteAfter,
  "post-1": S.postAIGrowth,
  "post-6": S.postPositioning,
  "post-7": S.postContent,
  "post-8": S.postCompass,
  "post-qc": S.postQuickCommerce,
  "post-geo": S.postGEO,
  "services-hero": S.servicesOverview,
  "approach-illo": S.approachDiscover,
  "one-team": S.oneTeamPlan,
  "faq-chat": S.faqChat,
  "ind-d2c": S.industryD2C,
  "ind-b2b": S.industryB2B,
  "about-1": S.sceneWorkshop,
  "about-2": S.sceneShoot,
  "about-3": S.sceneReview,
  "team-table": S.sceneCalendar,
  "team-couch": S.scenePresent,
  "team-review": S.sceneShoot,
  "team-present": S.scenePresent,
  "culture-hero": S.sceneValues,
  "person-1": () => S.memberCard("Vrinda", "Strategy", C.sun),
  "person-2": () => S.memberCard("Aarav", "Creative", C.mint),
  "person-3": () => S.memberCard("Kabir", "Performance", C.peach),
  "person-4": () => S.memberCard("Riddhi", "Social", C.tealSoft),
  "og-default": S.ogCard,
};

async function render(key) {
  const [width, height, markup] = ART[key]();
  const buffer = Buffer.from(markup);
  await sharp(buffer, { density: 96 })
    .webp({ quality: 86 })
    .toFile(path.join(outDir, `${key}.webp`));
  const blur = await sharp(buffer).resize(16).webp({ quality: 40 }).toBuffer();
  return {
    file: `/images/demo/${key}.webp`,
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
