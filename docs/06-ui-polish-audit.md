# UI/UX polish audit — what Marino does that we were missing

Source: CSS/keyframe extraction and scroll-through of marino.co.uk on 2026-09-29, compared against our production build screenshots. Structure is already comparable; the gap is *feel*.

## The cues behind the "luxurious, smooth" impression

| # | Marino cue (measured) | Ours before | Action |
|---|---|---|---|
| 1 | **Photography everywhere** — people, offices, product, muted looping video; cards are image-first | Flat coloured tiles stamped "PLACEHOLDER IMAGE" | Demo photography (Lorem Picsum, fixed seeds) for team/about/work/blog + generated gradient artwork (no text) for service tiles and hero collage |
| 2 | **Scroll reveals on every section**: `opacity 0 → 1`, `translate 30px → 0`, `1s cubic-bezier(.4,0,.2,1)`, per-element direction (`anim-up/left/right/fade`), triggered when the section is on screen | Only one block used a CSS scroll-timeline reveal (no effect in Safari/Firefox) | `Reveal` component (IntersectionObserver, once) + staggered children (`--i` delay), reduced-motion safe |
| 3 | **Work tiles**: full-bleed image, dark bottom gradient, title on image, image zooms `scale 1 → 1.08` over **5 s** on hover, excerpt unfolds (`grid-template-rows 0fr → 1fr`) | White card, image on top, static | Rebuilt `CaseStudyCard` as image tile with overlay, slow zoom, unfolding summary |
| 4 | **Marker highlight** behind key phrases (lilac pill `background-size` grows as you scroll) | Teal underline | `Highlight variant="marker"`: sun/teal-soft pill that fills on reveal (`background-size 0% → 100%`, 0.9 s) |
| 5 | **Every state change eases** (`0.35–0.5s`), link arrows `translateX(10px)` on hover, slider circles fill + `scale(1.2)`, accordion icon `rotate + scale` and fills | Colour hover only, arrows nudge 2px | Global transition tokens; button/link/control hover choreography; circle controls fill; accordion icon in a circle |
| 6 | **Soft surfaces**: `#f3f3f3` canvas, white cards, 22px radius, no hard borders, black bands with light text | Hairline-bordered cards, 16px radius | Cards: border → soft elevation shadow, radius 20–24px; keep hairlines only for lists |
| 7 | **Nav**: blurred translucent pill, hover background, dropdown fades; mobile drawer slides from the right `0.75s`, links' arrows stagger in | Solid header; drawer pops with no transition | Header gets blur + soft shadow on scroll (kept), dropdown fade/slide, drawer slide-in with staggered links |
| 8 | **Hero life**: mint `glow-pulse` behind video chips (4 s loop), pulsing dot bullets, ticker | Static collage | Slow float on collage tiles (8–12 s, alternating), soft glow blob behind the H1, pulsing dot on the eyebrow |
| 9 | **Image reveal**: `clip-path: inset(0 100% 0 0 round 22px)` → `inset(0)` + `scale` over `1.2s cubic-bezier(.77,0,.175,1)` | Images just appear | `img-reveal` class on hero/section images: clip from bottom + scale 1.04 → 1 |
| 10 | Copy weight: hero paragraph 600, generous line-height, short lines | Lead copy 400 | Lead paragraphs 500 weight, max 60ch |
| 11 | Big editorial numbers and a single "results" feature card | Stats exist | Kept; numbers now animate with easing (already) and sit in a soft white card |
| 12 | Calm palette: two accents only | Teal + coral + sun all at once | Coral demoted to hover/emphasis only; stickers default to sun; teal is the working accent |

## Not copied on purpose (keeps Upsure distinct)

- Floating centred pill nav (ours stays left-logo / inline links / ink button)
- Lilac + mint palette, Plus Jakarta Sans
- Word-by-word scroll colouring of paragraphs (replaced by the marker fill on reveal, cheaper and calmer)
- Auto-playing hero videos (we use still artwork + float; video can be added per block later)

## Demo data policy

Every "[PLACEHOLDER]" string and "Placeholder …" sentence is replaced with realistic demo copy. Items remain flagged `placeholder: true` in the admin so the dashboard still counts what to swap. Nothing from the original site is removed. Demo contact details are obviously demo (phone `+91 98250 00000`, "Est. 2019"), and registration numbers are left blank rather than invented.

## Layout: stop looking like a template

The bigger gap is composition. Ours reads as "eyebrow → heading → subheading → grid of equal cards" on every section. Marino's sections each have their own shape. Layout changes, section by section:

| Section | Template pattern (ours, before) | New composition |
|---|---|---|
| Hero | Centred heading over a tile collage | Left-set giant headline with **image chips and stickers embedded between the words**, eyebrow with pulsing dot, lead + two buttons bottom-left, one tall photo card overlapping the right edge |
| Statement | Paragraph block | Oversized paragraph set **right-aligned on a 10/12 column**, marker highlights, a single floating pill button underneath |
| Services | 3-column equal cards | **Editorial ledger**: numbered rows, big title with an accent dot, one-line promise, bullet-separated sub-services, "More info" arrow link; a thumbnail image slides in on the right on hover (desktop) |
| Work | 2×2 equal cards | **Bento tiles**: one large tile spanning two rows + two stacked tiles, image-first with overlay text; a pull quote with an accent bar hangs beneath, with a "01 / 06" slider counter |
| Proof | Ticker + heading | **Giant typographic band**: 2–3 lines of display type ("100+ brands · 250+ projects · 98% stay") with floating photo chips and pills tucked between words, offset left/right |
| Stats | Three columns | Oversized numbers set inline in one long rule-separated row, labels beside them, not under |
| Need picker | Pills (liked) | Kept; pills wrap in a wide ragged block under a right-aligned heading |
| Testimonials | Card carousel | Quote with a **teal accent bar**, name in bold, circle arrow controls with a counter; on dark bands the bar is sun |
| Blog | Cards in a dark band | Dark band kept; cards become image tiles with the date as a stamp and a "Read article →" arrow link; first card larger |
| FAQ | Left heading, list | **Right-aligned heading** with a dot, questions as a hairline list with circle arrow icons that rotate and fill on hover |
| Team | Equal grid | Offset masonry: alternating portrait/landscape crops, names set as a running caption row |
| Text columns / About | Two columns + images | Copy on a narrow 5/12 column, images overlapping the section edge with slight rotation, second column starts lower (staggered) |
| CTA band | Centred | Giant two-line "Ready to move forward?" with the button hanging off the line end and a soft glow |

Rule of thumb applied everywhere: **one section, one idea, one asymmetry.** Never two equal card grids in a row; alternate tone and alignment between sections.
