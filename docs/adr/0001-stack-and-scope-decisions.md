# ADR 0001 — Stack and scope decisions

Date: 2026-09-29 · Status: Accepted (from client answers to plan §9) · **Partly superseded by [ADR 0002](0002-static-content-no-cms.md)** (rows 1, 5, 6, 8, 10: no CMS, static content, emailed forms, npm)

| # | Question | Decision |
|---|----------|----------|
| 1 | CMS | **Payload CMS 3, self-hosted inside the Next.js repo.** Postgres for data (local Docker/Neon later), local disk for media in dev with an S3-compatible adapter ready for production. |
| 2 | Hosting | **Deferred.** Everything runs locally for now; no hosting-specific code paths. Keep the app portable (no Vercel-only APIs). |
| 3 | Visual direction | **Upsure's own brand (teal, near-black, white, colourful illustration) with Marino's layout system.** Do not clone Marino 1:1 — add capabilities Marino lacks (see plan §10). |
| 4 | Fonts | Upsure has **no licence** for Universal Sans / Circular, so they cannot be used. Use a free, open-licence family via `next/font` (see plan §10 for the pick). |
| 5 | Real content | **All placeholders for now**, every one tagged `[PLACEHOLDER]` in the CMS. Real content swapped in later by the client through the admin panel. |
| 6 | Forms | **Payload Form Builder + submissions in admin + Resend email + Cloudflare Turnstile.** Web3Forms retired. Email/Turnstile keys optional in dev (submissions still stored). |
| 7 | Analytics / cookies | **None for now.** No consent banner. Leave a single `analyticsId` field in Site Settings for later. |
| 8 | Admin users | **Single `admin` role.** Roles can be added later; access-control layer written so it is one field change. |
| 9 | Blog | **Write full placeholder bodies** for the 3 listed posts without pages and the 3 "More from the blog" posts referenced but missing. |
| 10 | Repo | https://github.com/Anshpatel2434/Upsure_media.git — pnpm via Corepack (Node 24 present). |
| 11 | Language | **English only.** No i18n scaffolding. |
| 12 | Domain / deploy | **Local only** for now. |
