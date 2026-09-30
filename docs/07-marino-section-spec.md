# Marino section spec (measured 2026-09-30, 1440 × 900)

Mirrored layouts and motion for four sections. Upsure keeps its own copy, colours (paper / ink / teal / sun), font and imagery; Marino's mint → Upsure sun, Marino's lilac → Upsure mint (`#bfe6e3`).

## Shared motion

| Cue | Value |
|---|---|
| Section activation | Class toggled when the section is ≥200 px inside the viewport (125 px below 1000 px). Removed again when it leaves, so sections re-animate on re-entry. |
| Line / block entrance | `opacity 0 → 1`, `translateX(±30px) → 0`, `1s cubic-bezier(.4,0,.2,1)`, stagger 0.25 s |
| Media chip reveal | `clip-path: inset(0 100% 0 0 round 22px) → inset(0)`, `scale(1.04) → 1`, `1.2s cubic-bezier(.77,0,.175,1)` |
| Glow | 4 s ease-in-out infinite pulse of a 12 vw coloured shadow, staggered 1 s / 2 s / 3 s |
| Floating pills | Two summed sines per axis; x ≈ ±0.5 vw over ~4.5 s, y ≈ ±1.5 vw over ~7.8 s, random phase |
| Dot | 25 px circle, `scale(.8) ↔ scale(1.2)`, 2 s ease-in-out infinite |
| Marker | Pill behind `<strong>` phrases, `background-size 0% → 100%`, `1.2s cubic-bezier(.25,1,.5,1)`, each phrase +0.3 s |
| Links | Long arrow translates 10 px on hover, `.35s cubic-bezier(.65,0,.35,1)` |

## Hero (home)

- White pill eyebrow with a long arrow (13 px, `10px 25px`, radius 30).
- Three display lines, 123 px / 1.1 / 600 (8 vw at 768–1239, 15 vw on mobile).
- Line 1 inline-block; 180 px 16:9 media chip at `left:104%`, `bottom:12px`; pill at `left:120%`, `top:60%`.
- Line 2 `padding-left:285px` with the chip in that gutter at `left:5%`.
- Line 3 flex: text, then a 42 % column (`padding-left:30px`) holding a 16 px / 1.6 paragraph (`padding-top:44px`) and a third chip (`padding-top:34px`).
- Second pill below line 3 at the far left (`left:-30px`).
- Contact details bottom-right, 14 px, email bold.
- Pills: 66 px tall, `10px 35px`, radius 33, 16 px / 600.

## Hero (listing pages — "default")

- Same eyebrow pill. Two thirds: one display line (115 px) with a pill at `top:-2.5vw; right:-18%`; below, a pill plus a 73 % paragraph (`padding-left:6%`) aligned to the bottom. One third: 900 × 500 image, radius 22, glowing.

## About statement ("text reveal")

- Right-aligned, capped to 85 % and pushed right, `padding-right:50px`, pulsing dot on the right edge.
- 33 px / 1.55 / 500; phrases highlighted with the marker; black pill button underneath.

## Work

- Full-width dark card, radius 40, padding `100px 70px`.
- Two 50 % columns, 100 px gutter, 50 px vertical gap.
- Right column: dot + 33 px title, 17 px paragraph, bold accent link with long arrow, then two tiles. Left column: two tiles, then a fading quote slider.
- Tiles: min-height 450, radius 22, cover image, bottom black gradient, 40 px padding, title 28 / 500, "View work" 14 px + arrow, outline service pills (10 px, `8px 15px`).
- Tile hover: background floods with an accent colour, image `opacity .15` and `scale(1.2)` over 5 s, gradient fades, text turns ink, excerpt unfolds (`grid-template-rows 0fr → 1fr`, opacity delayed 0.5 s).
- Quote: 8 px accent bar bleeding to the card edge (`margin-left:-70px; padding-left:62px`), 28 px / 1.5, name line 17 px accent, circle controls + "1 / 6".

## Services

- White pill eyebrow; rows `padding 50px 0`, 1 px divider, first row no top padding, last row no divider.
- Title 53 px / 700 with an accent dot after it; description 33 px / 1.5 / 400, `padding-right:550px`.
- Hover (0.5 s ease): 250 px image slides in from `-280px`, content shifts `+280px`, description cross-fades to the sub-service list, "More info" label fades in and the link slides `-280px`, 120 px arrow nudges (1.25 s loop).
- Mobile: no image, sub-services shown under the description, link below.
