# Reference analysis — marino.co.uk

Captured 2026-09-29. Marino is a WordPress site (Gravity Forms, Vimeo, reCAPTCHA, CookieYes, GA4, Cloudflare).
We are borrowing its **information architecture, section patterns and interaction model**, not its code.

## 1. Visual system

| Token | Marino value | Notes |
|-------|-------------|-------|
| Page background | `#F3F3F3` light grey | Sections alternate light grey → white cards → black bands |
| Ink | `#000` | Headings pure black, very large (hero H1 ~96-120px desktop) |
| Accent 1 | mint `#82FFCD` | Pill buttons ("Contact"), trust badges ("£100m+ client revenue", "Proudly from Manchester") |
| Accent 2 | lilac `#E2CBFF` | Inline highlight behind key phrases ("free consultation") |
| Dark band | `#000` | "What's happening?" blog band, Contact hero, footer, "latest work" section |
| Font | Plus Jakarta Sans (single family, 400–800) | Free Google font |
| Radius | 50px pills, 20–33px cards/images | Everything is rounded |
| Nav | Floating white pill bar, centre-aligned, active item in grey pill, "Contact" mint pill | Mega-menu dropdowns on Services and About |

Motion: scroll-reveal fade/slide on every section, text "reveal" that colours words as you scroll, marquee logo ticker, muted looping hero videos, carousels with numeric pagers ("1 / 6"). Heavy on the main thread — our version must be lighter (see plan §Performance).

## 2. Site map

```
/                      Home
/services/             Services overview
  /branding/           Service detail ×5 (branding, web-design, seo, ppc, video) + /ai-seo/
/work/                 Case-study listing (grid)
  /work/[slug]/        Case-study detail ×6 (WR Partners, Office Insight, Latakoo, Vislink, Eventotron, Blackbird)
/about-us/             About
/culture/              Culture / values
/testimonials/         Reviews
/seo-consultant/       Founder page ("Work directly with Toni")
/blog/                 Blog + /category/[slug]/ + post pages
/contact/              Contact (dark hero + long form)
/privacy-policy/ /terms-conditions/
```

## 3. Homepage, section by section (top → bottom)

1. **Hero** — eyebrow pill "Marino Web Design Agency" + "Google Partner" badge; giant 3-line H1 "Building Brands / That Grow, Scale, / & Lead" with inline media chips (looping video thumbnails + mint stat badges "£100m+ client revenue", "World class team") interrupting the headline; short paragraph with bold phrases; email + phone links.
2. **Logo ticker** — marquee of client logos.
3. **Text-reveal statement** — one large paragraph, words colour in on scroll, bold phrases ("bold creatives, sharp strategists, technical pros…"); CTA "About Us".
4. **Latest work (black band)** — heading + intro + "View all work"; 4 case-study cards (image, title, "View work", blurb, service-tag links); then a **testimonial carousel** (6 quotes, "1 / 6" pager, prev/next).
5. **Our Services** — 5 cards (title, one-liner, bullet-separated sub-services, "More Info").
6. **Proof band / second hero** — scrolling ticker "100 verified 5 star reviews • Clients in 30 countries • Decade of experience • Generated £100M+…", looping videos, "Send us a brief and we'll talk" + "Contact Us".
7. **What's happening? (black band)** — 4 latest posts in a 2-visible carousel (title, month/year, "Read article", excerpt, category chips); "View all articles".
8. **Results-driven** — featured case study stat ("400% Revenue growth", Blackbird) + quote + "View Work".
9. **FAQ accordion** — 7 questions, answers link to service pages; final item is a founder plug ("Work directly with Marino founder Toni Marino").
10. **Footer (black)** — agency description with inline service links, "Get in Touch" (email, phone, address, Contact link), nav (Services, Work, About, Culture, Blog, Testimonials, Privacy, Terms), logo, company/VAT numbers.

## 4. Reusable page patterns

- **Listing-page hero template**: eyebrow (page name with arrow) → H1 → two trust pills → paragraph with bold phrases → email/phone. Used on Services, Work, About, Culture, Testimonials, Blog.
- **Service detail template**: hero with sub-service anchor pills + **inline "Request a free consultation" form** (Name*, Email*, Phone, Message) → "We build X to perform" copy + 6-item checklist + image → "favourite X projects" case-study carousel → (process / FAQ / CTA below, not captured).
- **Case-study template**: eyebrow "Work" → H1 client name → service tag links → intro → objective paragraph with bold phrases → **3-stat row** (e.g. 400% / 22% / 50%) → two text sections with sub-headings → video block → client testimonial + **"Request a Call Back" short form** (Name*, Phone*, Email) → "Similar Work" carousel.
- **About**: hero → "Our mission?" statement → call-back form beside "Built by those who know…" copy → media block → logo ticker → "Our Services" band with 5 links → "We let our results do the talking" case-study grid.
- **Culture**: hero "Everyone has skin in the game" → founder story → pull-quote (Sir Henry Royce) → logo ticker → values text blocks with highlighted phrases.
- **Contact**: full-black hero "Let's Talk", "Take advantage of a free consultation.", email/phone/address, form (Name*, Email*, Phone, "How did you hear about Marino?", Message*).
- Two forms reused everywhere: **call-back** (short) and **consultation** (long), both honeypot-protected.

## 5. Gap analysis — what Marino has that upsuremedia.com lacks

| Missing on Upsure today | Marino pattern to adopt | Content status for new site |
|---|---|---|
| Work / case studies | `/work` grid + `/work/[slug]` detail with stats, video, testimonial, similar work | Placeholder ×6 unless real work is supplied |
| Individual service pages | `/services/[slug]` with inline lead form, sub-service pills, checklist, related work | Copy exists for 5 services (services accordion); expand with placeholders |
| Testimonials page + carousel | `/testimonials` + 6-quote carousel on Home | 1 real quote (Akash); 5+ placeholders |
| Culture page | `/culture` with values, founder story, pull-quote | Placeholder copy |
| Founder / team | Founder block in FAQ + founder page; team photos | Placeholder team ×4-6 (site already hints Vrinda, Aarav, Kabir, Riddhi, Jagat, Priya) |
| Proof band on Home | Stats ticker ("100+ brands · 250+ projects · 98% retention") | Real stats exist on About |
| FAQ on Home | Accordion with links into services | Real FAQ exists on Services |
| Blog categories + related posts + Home blog carousel | `/blog/category/[slug]`, "What's happening?" band | Categories exist (AI, Brand, Agency) |
| Phone + address | Header/footer contact links | **Need from client** |
| Mega-menu navigation | Services and About dropdowns | Build |
| Short call-back form in multiple places | "Request a Call Back" | Build |
| Video content | Hero/proof looping videos with posters | Placeholder MP4/poster |
| Cookie consent + analytics | Consent banner, GA4 | Decide (see questions) |
| Trust badges ("Google Partner", "Est 2015") | Pill badges in heroes | Placeholders (e.g. "Est. 20XX", "Meta / Google Partner") |
| Footer agency description, services list, company registration | Footer | Placeholder reg. numbers |

## 6. Upsure strengths to keep (Marino lacks these)

- "How can we help you?" need-picker pills (Home + Services variants)
- Capabilities tag cloud (19 tags)
- Newsletter "The Upshot" (footer + blog band)
- AI-first / Applied AI positioning and FAQ
- "Our approach" stepper (needs steps 02-04 written)
- "Start a collaboration" 3-step process, "Join us" / "Collaborate with us" on Contact
- Illustrated, colourful hero collage and floating photo-card About hero (brand personality)
