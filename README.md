# Upsure Media — website

Marketing site for [Upsure](https://www.upsuremedia.com/), a creative & growth agency in Ahmedabad.
Built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4** and **Payload CMS 3** (admin panel at `/admin`).

## Stack

| Layer     | Choice                                         |
| --------- | ---------------------------------------------- |
| Framework | Next.js 16 · React 19 · TypeScript (strict)    |
| Styling   | Tailwind CSS v4 with CSS-variable design tokens |
| CMS       | Payload CMS 3, embedded, Postgres (Neon)       |
| Media     | Local disk in dev · S3-compatible in prod      |
| Forms     | Payload form builder · Resend · Turnstile      |
| Tooling   | ESLint · Prettier · Husky · lint-staged · commitlint · GitHub Actions |

Planning documents live in [`docs/`](docs/): content inventory, reference analysis, the phased project plan and ADRs.

## Requirements

- Node.js `>=20.9` (see `.nvmrc`; Node 24 recommended)
- npm 10+
- A Postgres database (Neon free tier works) for the CMS

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in DATABASE_URI and PAYLOAD_SECRET
npm run dev
```

- Site: http://localhost:3000
- Admin: http://localhost:3000/admin (create the first admin user on first visit)

## Scripts

| Script                 | What it does                                  |
| ---------------------- | --------------------------------------------- |
| `npm run dev`          | Start the dev server (Turbopack)              |
| `npm run build`        | Production build                              |
| `npm start`            | Serve the production build                    |
| `npm run lint`         | ESLint                                        |
| `npm run lint:fix`     | ESLint with auto-fix                          |
| `npm run typecheck`    | `tsc --noEmit`                                |
| `npm run format`       | Prettier write                                |
| `npm run format:check` | Prettier check (CI)                           |

## Environment variables

All variables are documented in [`.env.example`](.env.example). `DATABASE_URI` and `PAYLOAD_SECRET` are required; everything else is optional in development.

## Project layout

```
src/
  app/            routes only — (frontend) public site, (payload) admin
  components/     ui primitives · layout chrome · CMS blocks
  features/       per-feature logic (queries, actions, schemas)
  lib/            shared helpers
  payload/        CMS config: collections, globals, blocks, hooks, access
  styles/         global CSS + design tokens
docs/             planning docs, ADRs, admin guide
```

Conventions: kebab-case file names, PascalCase components, `@/` imports, no barrel files, Server Components by default with `"use client"` only on leaves.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for branching, commit format and the PR checklist.
