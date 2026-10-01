# ADR 0002 — Static content, no CMS

Date: 2026-10-01 · Status: Accepted · Supersedes rows 1, 5, 6, 8 and 10 of [ADR 0001](0001-stack-and-scope-decisions.md)

## Context

Phases 1–10 were built on Payload CMS 3 with Postgres (ADR 0001). Commit `77bb7e2`
removed Payload and the database: the site is small, edited rarely, and a CMS
added a database, an admin login and hosting cost for little benefit.

## Decision

| # | Topic | Was (ADR 0001) | Now |
|---|-------|----------------|-----|
| 1 | CMS | Payload CMS 3 + Postgres + S3 media | **None.** Content is typed TypeScript in `src/content/data.ts`; images in `public/images`. Every page is pre-rendered by `next build`. |
| 5 | Real content | Swapped in by the client through the admin panel | Swapped in by a developer editing `src/content/data.ts`. Outstanding items: [`docs/08-content-to-replace.md`](../08-content-to-replace.md). |
| 6 | Forms | Payload Form Builder, submissions stored in admin | Server actions validate and **email** submissions via Resend; nothing is stored. Spam protection on every form (contact, call-back, consultation, brief, newsletter): honeypot, per-IP rate limit, Cloudflare Turnstile. Forms are matched by their key in `data.forms`. |
| 8 | Admin users | Single `admin` role | No admin panel, so no users. |
| 10 | Package manager | pnpm via Corepack | **npm** (`package-lock.json`, `npm ci` in CI). |

Rows 2, 3, 4, 7, 9, 11 and 12 of ADR 0001 still stand.

## Consequences

- Content changes need a commit and a rebuild; there is no live editing.
- No database, secrets or admin surface to secure or host.
- The rate limit is per server process unless `UPSTASH_REDIS_REST_URL` /
  `_TOKEN` are set; Turnstile is the main defence in production.
- Phases 3 (CMS) and 11 (admin polish) of the project plan are retired.
