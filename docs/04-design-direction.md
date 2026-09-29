# Design direction

Goal: borrow Marino's **information architecture and section patterns**, but make the UI recognisably Upsure. Nothing below should read as a Marino clone.

## How it differs from Marino at a glance

| Aspect | Marino | Upsure (new) |
|---|---|---|
| Canvas | Flat light grey `#F3F3F3` | Warm paper `#FAF8F3` with faint hairline grid lines in hero/feature areas |
| Ink | Pure black | Deep ink `#0B0D10`; dark bands are **deep teal-ink `#0A1E21`**, never pure black |
| Accents | Mint `#82FFCD` + lilac `#E2CBFF` pills | **Teal `#0F8B8D`** (brand), **coral `#FF6B4A`** (emphasis/CTA hover), **sun `#FFD166`** (sticker labels) |
| Type | Plus Jakarta Sans everywhere | **Instrument Sans** variable; headings tight (-0.03em), oversized editorial numerals |
| Radius | 50px pills, 33px cards | **12px** buttons, **16px** cards/images, pills only for tags |
| Nav | Floating centred white pill bar | Left logo · inline links with animated underline · right ink button "Start a project"; compacts with backdrop blur on scroll |
| Section headers | Eyebrow pill with arrow | **Numbered index eyebrow** `01 — Services`, monospace-style small caps, hairline rule |
| Hero | 3-line headline with inline video chips + mint badges | Headline + **rotated sticker labels** (sun/coral) + illustrated collage (Upsure's existing asset style); no video chips |
| Cards | White, very rounded, soft | White on paper with **1px ink/10% border**, teal border + lift on hover, 16px radius |
| Emphasis in copy | Lilac highlighter behind words | **Teal underline offset** or coral text, no highlighter box |
| Text reveal on scroll | Words colour in | Not used. Subtle fade-up only; counters animate once |
| Buttons | Mint pill | Ink solid (hover → teal), ghost with hairline, arrow icon that nudges on hover |
| Dark bands | Black with white text | Teal-ink with paper text; teal accents glow slightly |
| Footer | Black, plain columns | Teal-ink, oversized wordmark, newsletter first |

## Tokens (defined in `src/styles/globals.css`)

- Colours: `paper`, `paper-2`, `ink`, `ink-2`, `muted`, `line`, `teal`, `teal-2`, `teal-ink`, `coral`, `sun`, `white`
- Type scale (fluid): `display` 56–112px, `h1` 40–72, `h2` 32–48, `h3` 24–30, `lead` 18–22, `body` 16–17, `small` 14, `eyebrow` 12 uppercase tracking 0.12em
- Radius: `sm` 8, `md` 12, `lg` 16, `xl` 24, `pill` 999
- Spacing: section padding `clamp(64px, 10vw, 128px)`; container max 1280px, gutter 16px mobile / 32px desktop
- Motion: `--ease-out: cubic-bezier(.2,.8,.2,1)`, durations 160/240/400ms; all disabled under `prefers-reduced-motion`

## Component vocabulary

`Button` (solid / ghost / link), `Tag` (pill), `Sticker` (rotated label), `Eyebrow` (numbered), `Container`, `Section` (paper / paper-2 / teal-ink / teal), `Heading` (with `<Highlight>`), `Card`, `Accordion` (native `<details>`), `Marquee` (CSS), `Carousel` (scroll-snap), `Stat`, `Field`/`Textarea`/`Select`, `RichText`, `FadeIn`.
