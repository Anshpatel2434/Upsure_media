# Content to confirm or replace

All content lives in `src/content/data.ts`; images are generated studio artwork
(`scripts/art`, files in `public/images/demo/`) and client logos in
`public/images/clients/`.

## Needs Upsure Media's confirmation

| What | Where in `data.ts` | Current state |
|------|--------------------|---------------|
| Case-study scope for Lenskart, Hyundai, Samsung, Decathlon | `caseStudies` | Summaries, segment, duration and services come from the copy update; intro, sections and timeline describe the kind of work, with **no figures or quotes**. Upsure should confirm the scope and can add real results (`stats`), a client quote (`testimonial`) and project images. |
| Team roles (Vrinda, Aarav, Kabir, Riddhi) | `team` | First names from the live site, roles from the About brief; portraits are artwork. |
| LinkedIn URL | `LINKEDIN_URL` | Empty, so the LinkedIn link is hidden until set. |
| Founding year | `siteSettings.badges` | Not shown; add `{ text: "Est. <year>" }` once confirmed. |
| Registration numbers | `siteSettings.registrationNumbers` | Empty. |

## Already real

Copy (Upsure Media copy update), services, industries, the headline stats
(100+ brands, 250+ projects, 98% retention), client names and logos, the five
blog posts imported from the previous site's Sanity dataset, and the two new
Insights posts. Testimonials are per-service outcome lines, not named quotes.
