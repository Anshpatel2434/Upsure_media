# Upsure Media — website

Marketing site for [Upsure](https://www.upsuremedia.com/), a creative & growth agency in Ahmedabad.
Built with **Next.js 16 (App Router)**, **TypeScript** and **Tailwind CSS v4**. Every page is
pre-rendered at build time from static content; there is no database and no admin panel.

## Stack

| Layer     | Choice                                                   |
| --------- | -------------------------------------------------------- |
| Framework | Next.js 16 · React 19 · TypeScript (strict)              |
| Styling   | Tailwind CSS v4 with CSS-variable design tokens          |
| Content   | Typed TypeScript data in `src/content` · images in `public/images` |
| Forms     | Server actions → email via Resend (console log in dev) · Turnstile |
| Tooling   | ESLint · Prettier · Husky · lint-staged · commitlint     |

Planning documents live in [`docs/`](docs/): content inventory, reference analysis, the phased project plan and ADRs.

## Getting started

```bash
npm install
cp .env.example .env.local   # optional: only needed for real form emails
npm run dev
```

Site: http://localhost:3000

## Editing content

- **Copy, pages and demo data:** `src/content/data.ts`. Pages are lists of blocks
  (`hero`, `statement`, `workGrid`, …) rendered by `src/components/blocks`.
- **Images:** drop the file in `public/images/demo/` and add its key, size and blur
  placeholder to `src/content/media-manifest.json`.
- **Rich text** (blog posts, legal pages) is light Markdown: `## heading`, paragraphs,
  `- lists`, `> quotes`, `**bold**`, `[links](/path)`.
- **Highlights:** wrap words in `[[double brackets]]`; on the home hero `|` starts a new line.

Save and the dev server updates instantly; `npm run build` bakes everything into static HTML.

## Forms

Contact, consultation, call-back, "Start a project" and newsletter forms post to server
actions in `src/features`, which validate and spam-check each submission. Delivery is by
Web3Forms (`NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`, posted from the browser because its free
plan requires that) or Resend (`RESEND_API_KEY`, from the server). Without either, dev
prints submissions to the server console. Nothing is stored.

Every form is protected by a honeypot, a per-IP rate limit and, when both Turnstile keys are
set, Cloudflare Turnstile. Set `TRUSTED_IP_HEADER` to your host's real-IP header, and
`UPSTASH_REDIS_REST_URL` / `_TOKEN` to share the rate limit across server instances (see
`.env.example`).

Demo and unconfirmed content still to replace before launch is listed in
[`docs/08-content-to-replace.md`](docs/08-content-to-replace.md).

## Scripts

| Script                 | What it does                                     |
| ---------------------- | ------------------------------------------------ |
| `npm run dev`          | Start the dev server (Turbopack)                 |
| `npm run build`        | Production build                                 |
| `npm start`            | Serve the production build                       |
| `npm run lint`         | ESLint                                           |
| `npm run typecheck`    | `next typegen && tsc --noEmit`                   |
| `npm run format`       | Prettier write                                   |
| `npm run lighthouse`   | Lighthouse budgets against a running `npm start` |

## Project layout

```
src/
  app/            routes only
  components/     ui primitives · layout chrome · page blocks
  content/        site content (data.ts), types and the resolving store
  features/       per-feature views and server actions
  lib/            shared helpers (queries over the content store, email, SEO)
  styles/         global CSS + design tokens
public/images/    demo photography and client logos
docs/             planning docs and ADRs
```

Conventions: kebab-case file names, PascalCase components, `@/` imports, no barrel files, Server Components by default with `"use client"` only on leaves.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for branching, commit format and the PR checklist.
