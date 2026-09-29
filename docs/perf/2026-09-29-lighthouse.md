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

## Run 2 (after header/contrast fixes)

| Page | Perf | A11y | BP | SEO | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|
| `/` | 93 | 96 | 100 | 100 | 3.1 s | 80 ms | 0 |
| `/services/branding` | 95 | 100 | 100 | 100 | 2.9 s | 50 ms | 0 |
| `/blog/ai-in-the-growth-engine-2026` | 94 | 100 | 100 | 100 | 3.0 s | 50 ms | 0 |

Remaining contrast fail on Home was muted text `#6b7079` on paper-2 (4.29:1) → muted is now `#5d626b`.

## Run 3 (font `display: optional`, muted fixed)

| Page | Perf | A11y | BP | SEO | LCP (simulated) | FCP | TBT | CLS |
|---|---|---|---|---|---|---|---|---|
| `/` | 92 | 100 | 100 | 100 | 3.0 s | 1.1 s | 70 ms | 0 |
| `/services/branding` | 95 | 100 | 100 | 100 | 3.0 s | 0.9 s | 40 ms | 0 |

### Why simulated LCP stays ~3 s

- The LCP element is the hero `<h1>` (text). Observed (unthrottled) LCP right after a fresh build was 2.5 s because 37 cold `/_next/image` requests (each a Payload media fetch with a Neon round-trip plus a sharp resize) competed with the CSS for the six HTTP/1.1 connections. On the next run, with the optimizer cache warm, observed LCP was **248 ms**. In production behind a CDN this cold-start happens once per image size.
- Lighthouse's *simulated* throttling still charges the H1 for the web-font download. With `display: optional` a real browser paints the metric-matched fallback at FCP (~1 s on slow 4G) and never swaps, so the real-world LCP is close to FCP. See the DevTools-throttled run below for the realistic number.
