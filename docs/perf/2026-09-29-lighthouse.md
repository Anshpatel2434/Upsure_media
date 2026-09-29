# Lighthouse baseline — 2026-09-29

Production build (`next build && next start`) against Neon, Lighthouse 12 mobile preset, simulated slow 4G + 4× CPU, headless Chrome.

## Run 1 (before header/contrast fixes)

| Page | Perf | A11y | Best practices | SEO | LCP | TBT | CLS | Total bytes |
|---|---|---|---|---|---|---|---|---|
| `/` | 94 | 96 | 96 | 100 | 3.1 s | 50 ms | 0 | 283 KB |
| `/services/branding` | 95 | 96 | 96 | 100 | 2.7 s | 30 ms | 0 | 245 KB |
| `/blog/ai-in-the-growth-engine-2026` | 94 | 96 | 96 | 100 | 2.8 s | 40 ms | 0 | 256 KB |

Findings and fixes applied after run 1:

- **0.6 s wasted re-request on every page**: `withPayload` adds `Critical-CH: Sec-CH-Prefers-Color-Scheme` to all routes, which makes Chrome re-fetch the document. Scoped to `/admin/*` in `next.config.ts`.
- **favicon 404** (best-practices "errors in console"): favicon lived inside the `(frontend)` route group; moved to `src/app/favicon.ico`.
- **Contrast**: teal `#0F8B8D` on paper was 3.96:1 for small text; brand teal is now `#0B7577` (≈5:1). Coral stickers use ink text instead of white.

See "Run 2" below for the re-measure.
