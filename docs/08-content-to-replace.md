# Content to replace before launch

Everything below is demo or unconfirmed content. All of it lives in
`src/content/data.ts` (images in `public/images/`). **Do not launch while items
in the first table remain**: they attribute invented results or quotes to real
companies and people.

## Must replace or remove before launch

| What | Where in `data.ts` | Why it matters |
|------|--------------------|----------------|
| Case studies for Lenskart, Hyundai, Samsung, Decathlon, with stats such as "3.2× return on ad spend" | `caseStudies` | Invented results credited to real brands. Replace with real, client-approved work or remove. |
| Case-study before/after images and caption | `store.ts` (`beforeAfter`), `media.before` / `media.after` | Demo images presented as a real relaunch. |
| Testimonials from "Neha Kapoor", "Arjun Desai", "Sana Merchant" | `testimonials` (keys `t2`–`t4`) | Invented quotes with names. Only Akash's quote is real. |
| Team roles and bios (Vrinda, Aarav, Kabir, Riddhi) and their photos | `team`, `media.person-*` | Names are real (from the live site); roles, the shared bio and the photos are demo. |

## Fill in when available

| What | Where | Current state |
|------|-------|---------------|
| Phone number | `siteSettings.phone` + `phoneHref` | Empty, hidden site-wide until set. |
| Street address | `siteSettings.addressLine1` / `addressLine2` | Empty, hidden until set. |
| Founding year sticker | About hero `stickers` | Removed; comment shows where to add it. |
| Registration numbers | `siteSettings.registrationNumbers` | Empty. |
| Contact email | `CONTACT_EMAIL` at the top of `data.ts` | `upsureai@gmail.com` (real, from the live site). Change once a domain inbox exists. Also set `EMAIL_TO` / `EMAIL_FROM` in the environment. |
| Remaining demo photography | `public/images/demo/*.webp` | Team portraits (`person-*`), case-study covers (`work-*`), before/after, the consulting card and the social share image. Everything else now uses the live site's photos (`public/images/site/`). |
| Per-service page sections and extra FAQs | `services`, `faqs` | Card and accordion copy is real; the rest is placeholder. |

## Already real

Hero and section copy, services list, the headline stats (100+ brands, 250+
projects, 98% retention), client names and logos, Akash's testimonial, the
five blog posts (imported from the live Sanity dataset) and most photography
come from the live site (see `01-current-site-content-inventory.md`).
