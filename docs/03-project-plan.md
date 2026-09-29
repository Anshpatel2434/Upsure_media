# Upsure Media — new website: project plan

Status: **Phases 1–10 built and verified locally (2026-09-29). Remaining: 11 admin polish, 12 perf/a11y hardening (baseline in `perf/`), 13 launch.**
Companion docs: `01-current-site-content-inventory.md` (all current copy), `02-marino-reference-analysis.md` (reference structure + gap list).

---

## 1. Goal

Rebuild upsuremedia.com as a professional, maintainable Next.js codebase that:

1. Keeps every piece of current Upsure content (inventoried in doc 01).
2. Adopts the information architecture and section patterns of marino.co.uk (doc 02) — work/case studies, per-service pages, testimonials, culture, proof bands, FAQ, mega-menu, lead forms everywhere — with **placeholder copy, images and video** wherever Upsure has no real content yet.
3. Ships an **admin panel** where a non-developer edits any text, image, list or page block and sees the public site update immediately.
4. Loads fast and scrolls smoothly on **low-end phones and slow networks** (Core Web Vitals green on Slow 4G + 4× CPU throttle).

## 2. Recommended stack (decisions to confirm — see §9)

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 16.x** (App Router, `src/`, TypeScript strict, Turbopack) | Current stable; server components cut client JS; `'use cache'`/ISR for instant, cached pages |
| Styling | **Tailwind CSS v4** + CSS variables design tokens | Tiny CSS output, no runtime; tokens make theming/admin colour changes cheap |
| CMS / admin | **Payload CMS 3** mounted at `/admin` inside the same Next.js app | Free, MIT, no per-seat/API quotas; block-based page builder; Live Preview; drafts + versions; `afterChange` hooks → on-demand revalidation = "real-time" public updates. Alternative: **Sanity** (hosted, free tier, best editor UX, less to own) |
| Database | **Postgres** — local via Docker Compose in dev; Neon (free) or any Postgres in production | Payload's Postgres adapter |
| Media | Local disk in dev; **S3-compatible adapter** (R2 or similar) switched on by env vars for production. Payload generates responsive sizes + blur placeholder on upload | Portable, free |
| Forms | Payload **Form Builder plugin** (submissions stored in admin) + **Resend** email notification; honeypot + Cloudflare Turnstile (free, lighter than reCAPTCHA) | Replaces Web3Forms; leads visible in admin |
| Animation | CSS transitions/scroll-driven animations first; **Motion** (`LazyMotion` + `m`, ~5 kB) only where needed; **no Lenis/GSAP** | Keeps main thread free on low-end devices |
| Fonts | `next/font` self-hosted, 1 variable family, latin subset, `display: swap` | Zero layout shift, no third-party requests |
| Hosting | **Deferred** — local only for now; app kept portable (no host-specific APIs) | Client decision |
| Analytics | **None for now**; single `analyticsId` setting reserved | Client decision |
| Package manager | **pnpm** (via Corepack; Node 24 is installed locally) | Faster, standard for Next.js projects |
| Quality tooling | ESLint flat config + Prettier, Husky + lint-staged, commitlint (Conventional Commits), EditorConfig, `.nvmrc`, GitHub Actions CI (lint, typecheck, build, Lighthouse CI), Dependabot | "Professional repo" baseline |

## 3. Repository layout

```
upsure-media/
├─ .github/workflows/ci.yml          lint · typecheck · build · lighthouse
├─ .husky/                           pre-commit (lint-staged) · commit-msg (commitlint)
├─ docs/                             these planning docs + ADRs + admin user guide
├─ public/                           favicons, og default, placeholder media
├─ scripts/seed.ts                   seeds all current content + placeholders into the CMS
├─ src/
│  ├─ app/
│  │  ├─ (frontend)/                 public site: layout.tsx, page.tsx, services/, work/, about/, culture/, testimonials/, blog/, contact/, terms/, privacy/
│  │  ├─ (payload)/admin/            Payload admin UI + API routes (generated)
│  │  ├─ api/revalidate/route.ts     on-demand revalidation endpoint (called by CMS hooks)
│  │  ├─ sitemap.ts · robots.ts · not-found.tsx
│  ├─ components/
│  │  ├─ ui/                         Button, Pill, Badge, Container, Section, Heading, Input, Textarea, Accordion, Marquee, Carousel, Card, RichText
│  │  ├─ layout/                     Header, MegaMenu, MobileDrawer, Footer, CtaBand, CookieConsent (if needed)
│  │  └─ blocks/                     one component per CMS block: Hero, Stats, LogoTicker, TextReveal, ServiceGrid, WorkGrid, TestimonialCarousel, FaqAccordion, NeedPicker, Capabilities, ApproachSteps, TeamGrid, BlogCarousel, LeadForm, MediaBlock, RichTextBlock…
│  ├─ features/                      contact-form/, newsletter/, blog/, work/ (queries, actions, schemas)
│  ├─ lib/                           payload client, seo helpers, utils, constants
│  ├─ payload/                       payload.config.ts, collections/, globals/, blocks/, access/, hooks/
│  └─ styles/                        globals.css (tokens, base), animations.css
├─ .editorconfig · .nvmrc · .env.example · eslint.config.mjs · prettier.config.mjs · commitlint.config.mjs · lighthouserc.json
├─ next.config.ts · tsconfig.json · tailwind config (v4 = CSS-first) · package.json
└─ README.md · CONTRIBUTING.md · LICENSE
```

Conventions: kebab-case files, PascalCase components, `@/` alias, no barrel files, Zod schemas next to server actions, server components by default, `'use client'` only on leaves.

## 4. Site map (new)

| Route | Page | Source of truth in CMS |
|---|---|---|
| `/` | Home | Page "home" (blocks) |
| `/services` | Services overview | Page "services" + Services collection |
| `/services/[slug]` | Service detail ×5 (branding, design, growth, social-media, ai-automation) + consulting | Services collection |
| `/work` | Case-study grid | CaseStudies collection |
| `/work/[slug]` | Case-study detail ×6 placeholders | CaseStudies collection |
| `/about` | About | Page "about" (blocks) |
| `/culture` | Culture / values / team | Page "culture" + TeamMembers |
| `/testimonials` | Reviews | Testimonials collection |
| `/blog`, `/blog/[slug]`, `/blog/category/[slug]` | Blog | Posts, Categories, Authors |
| `/contact` | Contact | Page "contact" + Forms |
| `/terms`, `/privacy` | Legal | Pages (rich text) |
| `/admin` | Admin panel | Payload |

## 5. Content model (admin panel)

**Collections**
- `pages` — title, slug, SEO, `layout` (block array), draft/publish, versions, live preview
- `services` — title, slug, eyebrow, tags (3), short blurb, hero, sub-service pills, checklist, body blocks, related case studies, FAQ items, SEO
- `case-studies` — client, slug, services (relation), cover, intro, objective, stats (×3), sections, video (URL/upload + poster), testimonial (relation), similar work (auto by service), SEO
- `testimonials` — quote, name, role, company, avatar, logo, featured flag
- `posts` — title, slug, category, tags, author, date, excerpt, cover, rich-text body, related, SEO
- `categories`, `authors`, `team-members` (name, role, photo, bio, socials), `clients` (name, logo, order), `faqs` (question, answer, page scope)
- `media` — image sizes (thumb/card/hero/og), focal point, alt required, blurDataURL generated on upload
- `forms` + `form-submissions` (Form Builder plugin), `newsletter-subscribers`, `redirects`
- `users` — single `admin` role (access layer written so adding `editor` later is one field)

**Globals**
- `site-settings` — name, tagline, email, phone, address, hours, socials, default SEO/OG, analytics ID
- `header` — nav tree (supports dropdowns), CTA
- `footer` — columns, newsletter copy, legal links, company numbers
- `cta-band` — heading lines, button

**Blocks** (page builder): hero (variants: collage / media-chips / listing), stats, logo-ticker, text-reveal, service-grid, work-grid, work-carousel, testimonial-carousel, need-picker, capabilities, approach-steps, why-us, faq, team-grid, blog-carousel, lead-form (call-back / consultation), media, rich-text, cta.

"Real-time" behaviour: every collection/global has `afterChange`/`afterDelete` hooks → `revalidateTag`/`revalidatePath`; admin has Live Preview iframe (desktop/tablet/mobile) so editors see changes before publishing.

## 6. Placeholder content to create (marked `[PLACEHOLDER]` in the CMS so it's easy to find)

- 6 case studies (cover, 3 stats, 2 sections, quote, video poster) — e.g. Samsung, Hyundai, Lenskart, Decathlon, Vivo, Titan (names from the logo wall; copy is clearly marked placeholder)
- 5 service pages: sub-service pills, 6-item checklists, benefits copy, 3 FAQs each
- 6 testimonials (1 real: Akash)
- 6 team members (Vrinda, Aarav, Kabir, Riddhi, Jagat, Priya — placeholder roles/photos)
- Culture page copy: values ×4, founder story, pull-quote
- "Our approach" steps 02 Define, 03 Design/Build, 04 Launch & Grow
- Bodies for the 3 blog posts that have none + 3 "More from the blog" posts referenced but missing
- Phone number, street address, registration numbers, trust badges ("Est. 20XX", partner badge)
- Placeholder images: neutral branded SVG/AVIF placeholders (generated), 1 short muted MP4 + poster
- Client logos ×20: placeholder wordmarks until real SVGs are supplied

## 7. Performance & accessibility budget (enforced in CI)

| Metric | Target | How verified |
|---|---|---|
| LCP | ≤ 2.5 s on Slow 4G, 4× CPU (Moto G-class) | Lighthouse CI mobile preset, assert |
| INP | ≤ 200 ms | Lighthouse TBT ≤ 200 ms as proxy + manual on throttled device |
| CLS | ≤ 0.05 | Lighthouse assert |
| First-load JS | ≤ 100 kB gz per public route | `@next/bundle-analyzer`, CI size check |
| Images | AVIF/WebP, correct `sizes`, blur placeholder, hero `priority` | next/image + Payload sizes |
| Video | `preload="none"`, poster, IntersectionObserver play/pause, skipped on `saveData` / reduced-motion | Component test |
| Motion | All motion behind `prefers-reduced-motion`; no scroll-jacking; marquee is CSS | Lint rule + manual |
| A11y | Lighthouse a11y ≥ 95, keyboard-navigable menu/carousels/accordions, focus rings, alt required in CMS | axe + Lighthouse |
| SEO | Metadata per page, OG images, sitemap, robots, JSON-LD (Organization, Article, FAQ) | Lighthouse SEO 100 |

Public pages render statically (cached) and revalidate on demand — the server does almost no work per request.

## 8. Phases, tasks and verification

Each phase ends with a checklist that must pass before the next starts. "Verify" = what we run/inspect.

### Phase 0 — Decisions & setup (this document)
- [ ] Answer §9 questions; record decisions as `docs/adr/0001-stack.md`
- [ ] Create GitHub repo, Neon project, R2 bucket, Resend account (or alternatives) — credentials go in `.env.local` only
- Verify: ADR committed; `.env.example` lists every variable with a comment.

### Phase 1 — Repository scaffold & tooling ✅ (done 2026-09-29, commit 2bb6be6)
- [x] `pnpm create next-app` (TS, App Router, `src/`, Tailwind v4, ESLint) on Next 16.x
- [x] Strict tsconfig, `@/` alias, `next.config.ts` (images remotePatterns, `optimizePackageImports`, headers)
- [x] ESLint flat config (next, ts, jsx-a11y, import order) + Prettier (+ tailwind plugin)
- [x] Husky + lint-staged + commitlint; `.editorconfig`; `.nvmrc`; `packageManager` + `engines`
- [x] GitHub Actions CI: install → lint → `tsc --noEmit` → build; Dependabot config
- [x] README (setup, scripts, env, deploy), CONTRIBUTING (branching, commits, PR checklist), LICENSE
- Verify: `pnpm lint && pnpm typecheck && pnpm build` pass locally and in CI on a PR; a bad commit message is rejected; a formatting error is auto-fixed on commit.

### Phase 2 — Design system ✅ (done 2026-09-29)
- [x] Tokens in `globals.css`: colours (light grey bg, ink, mint, lilac, teal, dark band), spacing, radii (pill 999px, card 24px), type scale (fluid `clamp()` H1–H6), shadows
- [x] `next/font` setup (font decision from §9), fallback metrics
- [x] UI primitives: Button (variants: primary mint, ghost, dark), Pill/Badge, Container, Section (bg variants), Heading (with highlight spans), Input/Textarea/Select, Accordion (native `<details>` based), Marquee (pure CSS), Carousel (CSS scroll-snap + buttons, no library), Card, RichText renderer
- [x] Motion utilities: `FadeIn` (IntersectionObserver + CSS), `TextReveal` (CSS scroll-driven animation with JS fallback), all gated by reduced-motion
- [x] `/dev/ui` (dev-only) page showcasing every primitive
- Verify: primitives render on the showcase page at 360px, 768px, 1280px; keyboard works on accordion/carousel; axe reports 0 violations; zero client JS shipped for Marquee/Accordion.

### Phase 3 — CMS & data layer (Payload) ✅ (verified locally 2026-09-29)
- [x] Install Payload 3 into the app; Postgres adapter (Neon); S3 adapter (R2); Lexical rich text
- [x] Collections, globals and blocks from §5 with field validation and required alt text
- [x] Access control: `admin` vs `editor`; public read for published only
- [x] Drafts, versions, autosave; Live Preview config with breakpoints
- [x] `afterChange`/`afterDelete` hooks → `revalidateTag`; typed data fetchers in `lib/cms/*` using Payload Local API with `'use cache'` + tags
- [x] Image sizes + blur placeholder generation on upload; focal point
- [x] Form Builder plugin + submissions; Resend notification; Turnstile verification server-side
- [x] `scripts/seed.ts`: idempotent seed of every item in doc 01 + all placeholders from §6; generated placeholder images
- [x] Generate `payload-types.ts`; admin branding (logo, favicon)
- Verify: `pnpm seed` on an empty DB produces every page/collection with no errors; log in at `/admin` as admin and editor and confirm role limits; editing a testimonial and publishing updates the public page within ~1 s (revalidation) without a rebuild; Live Preview shows unpublished changes; uploading a 5 MB JPEG yields AVIF/WebP sizes + blurDataURL.

### Phase 4 — Global layout ✅ (verified locally 2026-09-29)
- [x] Header: floating pill nav, mega-menu dropdowns (Services, About), mint Contact CTA, scroll-aware (hide/show), mobile drawer with focus trap
- [x] Footer (from CMS global): description, contact block, nav, newsletter form, legal, company numbers
- [x] CTA band (global), Cookie consent (only if analytics needs it)
- [x] SEO: `generateMetadata` from CMS, default OG image route (`opengraph-image.tsx`), `sitemap.ts`, `robots.ts`, JSON-LD Organization, canonical
- [x] `not-found.tsx`, `error.tsx`, loading skeletons
- Verify: nav is fully keyboard/screen-reader operable (Esc closes, arrow keys in menus); Lighthouse SEO 100 on a blank page; sitemap lists all published routes; header/footer edits in admin appear on site immediately.

### Phase 5 — Home page ✅ (verified locally 2026-09-29)
- [x] Blocks: Hero (Upsure collage variant with media chips + stat badges), Intro/Text-reveal, Logo ticker, Services grid (5), Latest work (4 cards, dark band), Testimonial carousel (6), Proof stats ticker, Need-picker (6), "What's happening" blog carousel, Results feature (case study stat + quote), FAQ (from Services FAQ), Team teaser, CTA band
- [x] All content served from the seeded "home" page; every block editable/reorderable in admin
- Verify: content matches doc 01 word-for-word for existing copy; Lighthouse mobile ≥ 90 perf / ≥ 95 a11y / 100 SEO with throttling; first-load JS ≤ 100 kB; reorder blocks in admin → order changes on site.

### Phase 6 — Services overview + service detail ✅ (verified locally 2026-09-29)
- [x] `/services`: hero (listing template with trust pills), intro, service cards, capabilities cloud (19), need-picker (8), approach stepper (4 steps), why-us (3), FAQ (8), CTA
- [x] `/services/[slug]`: hero with sub-service pills + inline consultation form, blurb/checklist/media, related work carousel, service FAQs, CTA; `generateStaticParams`
- Verify: 5 detail pages build statically; each "Know more" card links to the right slug; form submission creates a `form-submissions` record and emails; invalid submissions return field errors without page reload; Lighthouse targets met.

### Phase 7 — Work / case studies ✅ (verified locally 2026-09-29)
- [x] `/work` grid with service filter (URL param, server-rendered)
- [x] `/work/[slug]`: hero + service tags, objective, 3-stat row, sections, lazy video block, testimonial + call-back form, similar work (same service, excluding self)
- Verify: 6 placeholders render; filter works without client JS (links) and with progressive enhancement; video does not download until in viewport; stats animate only when reduced-motion is off.

### Phase 8 — About, Culture, Testimonials ✅ (verified locally 2026-09-29)
- [x] `/about`: floating photo-card hero (Upsure teal variant), manifesto, stats (100+/250+/98%), mission, call-back form + copy, logo ticker, services band, results grid, CTA
- [x] `/culture`: hero, founder story, pull-quote, values, team grid (6), "Join us / Collaborate" (moved from Contact and kept there too)
- [x] `/testimonials`: hero + full list/grid with company logos
- Verify: About copy matches doc 01; team/testimonial items added in admin appear immediately; images use blur placeholders; pages pass budgets.

### Phase 9 — Blog ✅ (verified locally 2026-09-29)
- [x] `/blog` listing (featured latest + grid, category chips), `/blog/category/[slug]`, pagination
- [x] `/blog/[slug]`: breadcrumb, tags, title/dek, author/date, Lexical rich text (headings, images, code, embeds), reading time, newsletter band, related posts (same category), Article JSON-LD, OG image per post
- [x] Newsletter subscribe (server action → `newsletter-subscribers`, double-opt-in email optional)
- Verify: all 5 current posts + 3 missing "related" posts exist; RSS feed at `/blog/feed.xml`; new post published in admin shows on `/blog` and Home carousel within ~1 s; rich text renders every block type from a test post.

### Phase 10 — Contact & forms ✅ (verified locally 2026-09-29)
- [x] `/contact`: dark hero, contact details, long form (Name*, Email*, Phone, Company, "How did you hear about us?", Message*), 3-step "Start a collaboration", Join/Collaborate
- [x] Shared `LeadForm` component (variants: contact / consultation / call-back) with Zod validation, honeypot, Turnstile, rate limiting, success state, error state
- [x] Email templates (Resend) + admin inbox
- Verify: submit valid/invalid/spam cases; each creates/blocks a record correctly; form works with JS disabled (progressive enhancement); Turnstile fails closed; screen reader announces errors.

### Phase 11 — Admin panel polish
- [x] Custom dashboard (quick links: edit Home, new post, new case study, submissions)
- [x] Field descriptions/help text for every field; `[PLACEHOLDER]` items flagged with a filter
- [~] Redirects collection (plugin installed; wired via Next redirects on next build — not yet), SEO preview fields ✅, focal point ✅ wired into `proxy.ts`; SEO preview fields; image focal-point picker
- [x] `docs/05-admin-guide.md`: how to edit each page, add a case study/post/testimonial, upload images, publish vs draft, live preview
- Verify: a non-developer follows the guide to change hero text, add a blog post and a case study with images, and both appear live; no console errors in admin.

### Phase 12 — Performance, accessibility & low-end hardening
- [~] Lighthouse locally via `npm run lighthouse` (lighthouserc.json); GitHub Actions job needs a DB secret — pending on Home, Services, a service, Work, a case study, Blog, a post, Contact with mobile throttling; assertions from §7
- [ ] Bundle analysis; remove/dynamic-import anything over budget
- [x] Reduced-motion + `saveData` + low-memory paths (`navigator.deviceMemory` ≤ 2 → skip videos/heavy effects)
- [x] Manual test on a real low-end Android (or Chrome DevTools Slow 4G + 6× CPU): no jank while scrolling, no layout shift, menu opens < 100 ms
- [ ] axe-core run on every route; keyboard-only walkthrough; colour contrast fixes
- [x] Security headers (CSP pending) (CSP, HSTS, frame-ancestors), rate limits, dependency audit
- Verify: CI Lighthouse assertions green on all routes; bundle report committed to `docs/perf/`; axe 0 serious/critical; `pnpm audit` clean.

### Phase 13 — Launch & handover
- [ ] Production env (hosting from §9), Neon prod branch, R2 prod bucket, Resend domain verification
- [ ] Domain cut-over plan + 301 map from old URLs (`/services` etc. are unchanged; add any new ones)
- [ ] Backups: nightly Neon branch/export; media bucket versioning
- [ ] Final content review: every `[PLACEHOLDER]` listed in a handover sheet for the client to replace
- [ ] Analytics + Search Console verification; uptime check
- Verify: production Lighthouse run matches CI; forms deliver to the real inbox; admin login works for client accounts; old URLs 301 correctly; handover doc delivered.

---

## 9. Decisions

All twelve questions are answered in `adr/0001-stack-and-scope-decisions.md`.

## 10. Beyond Marino — additions Marino does not have

Marino's site is a strong but conventional agency template. The following are planned so the new site is better, not just similar. Each is small enough to fit its phase.

| # | Feature | Why it is better | Phase |
|---|---------|------------------|-------|
| A | **Brief builder** (`/start-a-project`): 3-step guided form — pick needs (reuses the "How can we help you?" pills), budget band + timeline, contact details. Pre-fills from whichever need-pill the visitor clicked anywhere on the site. Submission lands in admin with a structured summary. | Marino's pills are static; Upsure's currently go nowhere. Qualified leads instead of "Message" free-text. | 10 |
| B | **Need-pill → service routing**: every need-pill links to the matching service page section, not `#cta`. | Turns decoration into navigation. | 5–6 |
| C | **Engagement models section** on Services: Fixed-scope project · Monthly retainer · Fractional senior support, each with "best for", "typical length", "what you get". | Marino never explains how to buy. Upsure's FAQ already says this in prose. | 6 |
| D | **Case-study before/after slider** block + **outcome timeline** (week 0 → launch → +90 days). | Marino shows 3 numbers; this shows the change. Pure CSS/`<input type=range>`, no library. | 7 |
| E | **Instant page transitions** using React 19.2 View Transitions + Next 16 prefetching, respecting reduced-motion. | Marino's WordPress does full reloads. | 4 |
| F | **Site search** (`/search`, ⌘K palette on desktop): posts, case studies, services, FAQs; server-rendered results, works without JS. | Marino has none. | 9 |
| G | **"Upsure vs a typical agency" comparison block** (senior team vs junior relay, outcomes vs hours, AI-native vs bolted-on). | Upsure's differentiators already exist as copy; this makes them scannable. | 6 |
| H | **Low-data mode**: honours `prefers-reduced-motion`, `saveData` and `deviceMemory ≤ 2` — swaps videos for posters, disables text-reveal, keeps layout identical. Toggle also exposed in the footer. | Marino's site is heavy on the main thread. Directly serves the low-end-device requirement. | 2, 12 |
| I | **Admin editing quality**: Live Preview with device switcher, `[PLACEHOLDER]` filter and dashboard counter, per-block "Duplicate" and "Move to another page", scheduled publishing, image focal point. | Marino editors use stock WordPress. | 11 |
| J | **Structured SEO out of the box**: FAQ, Article, Organization, Service and Breadcrumb JSON-LD; per-post OG images generated from the CMS; RSS. | Marino has partial schema only. | 4, 9 |
| K | **Accessibility as a feature**: skip links, focus-visible rings, keyboard-operable carousels/mega-menu, alt text required in CMS, axe in CI. | Marino's carousels are not keyboard-friendly. | 2, 12 |

### Font pick

Upsure has no licence for Universal Sans or Circular, so they will not be used. Chosen replacement (open licence, variable, self-hosted via `next/font`):
- **Display + body: Instrument Sans** — geometric, close in feel to Universal Sans/Circular, one variable file, latin subset ≈ 30 kB.
- Alternative if a warmer look is wanted: **Plus Jakarta Sans** (Marino's font) or **Inter**.
