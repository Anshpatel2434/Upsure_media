/**
 * Site content. Real copy comes from docs/01-current-site-content-inventory.md;
 * the rest is demo data sized to exercise every layout. Edit here, rebuild,
 * and the site updates: nothing is read from a database.
 *
 * Relations are written as keys (service slugs, media keys, form keys) and
 * resolved in `store.ts`. Rich text is light Markdown (see types.ts).
 */

import type { Form, Media, Service } from "./types";

/** Public contact address, used in copy, mailto links and as the default form inbox. */
export const CONTACT_EMAIL = "upsureai@gmail.com";

/** Resolved documents handed to `pages()` so layouts can embed them. */
export type Ctx = {
  media: Record<string, Media>;
  services: Record<string, Service>;
  forms: Record<string, Form>;
};

/* ----------------------------------------------------------------------------
   Images: key → alt text. Real photos from upsuremedia.com live in
   public/images/site/<key>.webp; the remaining demo images in public/images/demo/
   ---------------------------------------------------------------------------- */
export const media: Record<string, string> = {
  "hero-1": "Styled food shoot on a checked tablecloth",
  "hero-2": "Product shot of a bottle on a shelf",
  "hero-3": "Designer sketching on a tablet",
  "team-table": "Upsure team collaborating at a table",
  "team-couch": "Upsure team member taking notes on a couch",
  "team-review": "Two Upsure designers reviewing work",
  "team-present": "Upsure team presenting work",
  "studio-plant": "A team member standing in the studio next to a plant and a colourful artwork",
  "services-hero":
    "Three team members in a strategy discussion around a table with a laptop and notes",
  "approach-illo": "Abstract artwork for the discovery phase",
  "studio-dog": "A small dog wearing a blue bandana sitting in front of a bookshelf",
  "about-1": "Upsure team member taking notes",
  "about-2": "Upsure designer at a desk",
  "about-3": "The Upsure studio",
  "culture-hero": "Two Upsure team members planning on a whiteboard",
  "og-default": "Upsure – We design brands people love",
  "service-brand": "Branding service artwork",
  "service-design": "Two designers reviewing brand stationery",
  "service-growth": "Team member reviewing work over coffee",
  "service-social": "Social media services artwork",
  "service-ai": "AI-first services artwork",
  "service-consulting": "Consulting and advisory artwork",
  "work-lenskart": "Lenskart logo",
  "work-hyundai": "Hyundai logo",
  "work-samsung": "Samsung logo",
  "work-decathlon": "Decathlon logo",
  "post-ai-in-the-growth-engine-2026":
    "A dark, orderly tech workstation with monitor, tablet, and keyboard",
  "post-custom-ai-workflows-busywork-audit":
    "A top-down view of a busy desk: laptop, handwritten notes, phone, and coffee",
  "post-customers-want-answers-not-chatbots":
    "A phone resting on a café table next to two cups of coffee",
  "post-we-design-brands-people-love":
    "An open book of logo designs on a desk with pencils and a phone",
  "post-inside-upsure-what-we-actually-do":
    "A laptop with a design tool open beside a sketchbook of wireframes",
  "avatar-akash": "Akash",
  "person-1": "Vrinda",
  "person-2": "Aarav",
  "person-3": "Kabir",
  "person-4": "Riddhi",
};

/* ----------------------------------------------------------------------------
   Clients (real names and logos from the live logo wall)
   ---------------------------------------------------------------------------- */
export const clients = [
  "Allen",
  "Axis Max Life",
  "BNI",
  "Cashify",
  "Decathlon",
  "Gheeyonnaise",
  "Hyundai",
  "Jio BP",
  "Khetibank",
  "Lenskart",
  "PW Vidyapeeth",
  "R & B",
  "Realme",
  "Reliance Fashion",
  "Samsung",
  "Titan",
  "Unicorn",
  "Vivo",
  "Waaree",
  "Wrogn",
];

/* ----------------------------------------------------------------------------
   Services (real card + accordion copy; page sections partly placeholder)
   ---------------------------------------------------------------------------- */
export const services = [
  {
    slug: "branding",
    title: "Branding",
    icon: "brand",
    order: 1,
    tags: ["Identity", "Voice", "Visual Systems"],
    blurb:
      "We build brand identities that earn recognition — from positioning and naming to visual systems and tone of voice.",
    cardImage: "service-brand",
    eyebrow: "Brand strategy & identity",
    heading: "Brands with somewhere to [[grow]]",
    lead: "Sharpen positioning, narrative, and architecture so the brand has somewhere to grow. Brand audits, positioning & messaging, naming & verbal identity, and internal brand activation.",
    subServices: [
      "Brand audits",
      "Positioning & messaging",
      "Naming & verbal identity",
      "Visual identity & guidelines",
      "Internal brand activation",
    ],
    heroImage: "service-brand",
    checklistHeading: "We build brands to perform",
    checklistIntro:
      "A brand is the promise your growth engine has to keep. We define it tightly, express it distinctively, and hand your team a system they can actually use.",
    checklist: [
      "Brand strategy & positioning",
      "Naming & verbal identity",
      "Visual identity & guidelines",
      "Tone of voice",
      "Rebrands & refreshes",
      "Internal brand activation",
    ],
  },
  {
    slug: "design",
    title: "Design Services",
    icon: "design",
    order: 2,
    tags: ["UI", "Print", "Motion"],
    blurb:
      "UI, print, and motion design that builds trust at every touchpoint — crafted to convert as much as it impresses.",
    cardImage: "service-design",
    eyebrow: "Creative & identity",
    heading: "Design that ships and [[lasts]]",
    lead: "Visual identity systems, campaigns, and editorial content built to ship and to last. Visual identity & guidelines, campaign concepts, content series & social, and production & design ops.",
    subServices: [
      "UI & web design",
      "Campaign concepts",
      "Print & packaging",
      "Motion & video",
      "Production & design ops",
    ],
    heroImage: "service-design",
    checklistHeading: "Craft that converts",
    checklistIntro:
      "Every touchpoint is a chance to earn trust. We design interfaces, campaigns and collateral that look the part and do the job.",
    checklist: [
      "UI & landing pages",
      "Campaign concepts",
      "Content series & social",
      "Print & packaging",
      "Motion graphics",
      "Design systems & ops",
    ],
  },
  {
    slug: "growth",
    title: "Growth Services",
    icon: "growth",
    order: 3,
    tags: ["Performance", "SEO", "CRO"],
    blurb:
      "Performance marketing, SEO, and conversion strategies that compound over time and drive measurable returns.",
    cardImage: "service-growth",
    eyebrow: "Growth marketing",
    heading: "An operating system for [[compounding growth]]",
    lead: "Acquisition, CRO, lifecycle — the operating system that compounds growth month over month. Performance media, SEO & content engine, CRO & landing pages, and lifecycle & retention.",
    subServices: [
      "Performance media",
      "SEO & content engine",
      "CRO & landing pages",
      "Lifecycle & retention",
      "Analytics & attribution",
    ],
    heroImage: "service-growth",
    checklistHeading: "Outcomes, not hours",
    checklistIntro:
      "We run acquisition, conversion and retention as one system, measured against the numbers that matter to your P&L.",
    checklist: [
      "Paid search & social",
      "SEO & content engine",
      "CRO & landing pages",
      "Email & lifecycle",
      "Attribution & reporting",
      "Quarterly growth planning",
    ],
  },
  {
    slug: "social-media",
    title: "Social Media",
    icon: "social",
    order: 4,
    tags: ["Content", "Community", "Strategy"],
    blurb:
      "Content strategy and community building that turns followers into loyal customers across every platform.",
    cardImage: "service-social",
    eyebrow: "Content & community",
    heading: "Followers into [[loyal customers]]",
    lead: "Content strategy and community building that turns followers into loyal customers across every platform.",
    subServices: [
      "Content strategy",
      "Always-on content",
      "Community management",
      "Creator partnerships",
      "Social listening",
    ],
    heroImage: "service-social",
    checklistHeading: "Content people actually want",
    checklistIntro:
      "We plan, produce and publish content series that build an audience worth having, then turn that audience into demand.",
    checklist: [
      "Channel strategy",
      "Content series & formats",
      "Production & scheduling",
      "Community management",
      "Creator & influencer programs",
      "Reporting & optimisation",
    ],
  },
  {
    slug: "ai-automation",
    title: "AI-first Services",
    icon: "ai",
    order: 5,
    tags: ["AI", "Automation", "Workflows"],
    blurb:
      "Automations, AI workflows, and smart content systems woven directly into your brand and growth engine.",
    cardImage: "service-ai",
    eyebrow: "Applied AI & automation",
    heading: "Intelligent systems, [[practically applied]]",
    lead: "We put intelligent systems to work inside your brand and marketing. AI-powered content workflows, marketing automation, custom agents & chatbots, and AI audits & team enablement — practical, measurable, and built around your stack.",
    subServices: [
      "AI content workflows",
      "Marketing automation",
      "Custom AI agents & chatbots",
      "AI audits & team enablement",
    ],
    heroImage: "service-ai",
    checklistHeading: "Practical, not hype",
    checklistIntro:
      "We build AI into the work we already do — content that ships faster, automation that removes busywork, assistants that resolve queries in your brand's voice.",
    checklist: [
      "AI content workflows",
      "Marketing automation",
      "Custom agents & chatbots",
      "AI audits",
      "Team enablement & training",
      "Governance & QA pipelines",
    ],
  },
  {
    slug: "consulting",
    title: "Consulting & Advisory",
    icon: "consulting",
    order: 6,
    tags: ["GTM", "Planning", "Reviews"],
    blurb:
      "Fractional senior support for founders and CMOs at growth inflection points — GTM advisory, quarterly planning, and brand & growth reviews.",
    cardImage: "service-consulting",
    eyebrow: "Consulting & advisory",
    heading: "Senior thinking, [[on call]]",
    lead: "Fractional senior support for founders and CMOs at growth inflection points. GTM advisory, org & hiring support, quarterly planning, and brand & growth reviews.",
    subServices: [
      "GTM advisory",
      "Org & hiring support",
      "Quarterly planning",
      "Brand & growth reviews",
    ],
    heroImage: "service-consulting",
    checklistHeading: "A senior team, no fuss",
    checklistIntro:
      "From D2C challengers to enterprise in-house teams, we adapt to where you are. No junior teams ghostwriting the thinking.",
    checklist: [
      "Go-to-market strategy",
      "Org design & hiring",
      "Quarterly planning",
      "Brand & growth reviews",
      "Board & investor narratives",
      "Fractional CMO support",
    ],
  },
];

/* ----------------------------------------------------------------------------
   FAQs (real, from /services) + placeholder per-service extras
   ---------------------------------------------------------------------------- */
export const faqs = [
  {
    key: "us-eu",
    question: "Do you work with US and EU clients?",
    answer:
      "Absolutely. We work with clients globally — we're comfortable navigating time zones and remote collaboration. Most of our partnerships run async, which keeps things fast without the friction.",
    scope: ["services", "home", "contact"],
    order: 1,
  },
  {
    key: "how-long",
    question: "How long does a project take?",
    answer:
      "It depends on scope. A brand strategy engagement typically runs 4–6 weeks. A full brand plus web project is 8–12 weeks. Months of 'discovery' is an excuse for inefficiency — we move fast and iterate aggressively.",
    scope: ["services", "home"],
    order: 2,
  },
  {
    key: "strategy-execution",
    question: "Do you only do strategy, or execution too?",
    answer:
      "Both. We handle strategy, creative, and performance marketing end-to-end. You work with senior people throughout — no junior relay race, no version gaps.",
    scope: ["services", "home"],
    order: 3,
  },
  {
    key: "cost",
    question: "What does it cost?",
    answer:
      "We offer fixed-scope project pricing and monthly retainers. Transparent upfront — no surprise invoices. We scope tightly so both sides know exactly what's being built and what it costs.",
    scope: ["services", "home", "contact"],
    order: 4,
  },
  {
    key: "get-started",
    question: "How do we get started?",
    answer: `Fill in the contact form or email us at ${CONTACT_EMAIL}. We'll schedule a free 30-minute discovery call to learn about your goals, then come back with a scoped proposal.`,
    scope: ["services", "contact"],
    order: 5,
  },
  {
    key: "no-plan",
    question: "We have an idea but no plan yet. Can you still help?",
    answer:
      "Often that's exactly where we add the most value. We help shape the strategy, define the scope, then build the brand and growth systems on a base we create together.",
    scope: ["services", "contact"],
    order: 6,
  },
  {
    key: "ai-services",
    question: "What do your AI services actually look like?",
    answer:
      "Practical, not hype. We build AI into the work we already do — content workflows that ship faster, automation that removes manual busywork, custom agents and chatbots for your customers, and audits that show your team exactly where intelligent systems will pay off first.",
    scope: ["services", "home"],
    order: 7,
    service: "ai-automation",
  },
  {
    key: "long-term",
    question: "Do you work with clients long-term?",
    answer:
      "98% of our clients stay with us past the first engagement. Launching is a beginning — we stay on to measure, learn, and compound the brand and the pipeline month over month.",
    scope: ["services", "home"],
    order: 8,
  },
];

/* ----------------------------------------------------------------------------
   Testimonials (1 real + 3 demo)
   ---------------------------------------------------------------------------- */
export const testimonials = [
  {
    key: "akash",
    quote:
      "Upsure took our messy positioning and turned it into a story our entire team rallies behind. The relaunch paid back inside a quarter.",
    name: "Akash",
    role: "Founder",
    company: "",
    avatar: "avatar-akash",
    featured: true,
    order: 1,
  },
  {
    key: "t2",
    quote:
      "The new identity finally looks like the company we've become. Sales decks, site, packaging — everything speaks with one voice now.",
    name: "Neha Kapoor",
    role: "Marketing Head",
    company: "Consumer brand",
    featured: true,
    order: 2,
    service: "branding",
  },
  {
    key: "t3",
    quote:
      "Paid acquisition went from a cost centre to a growth lever. Same budget, twice the qualified pipeline in ninety days.",
    name: "Arjun Desai",
    role: "Co-founder",
    company: "D2C challenger",
    featured: true,
    order: 3,
    service: "growth",
  },
  {
    key: "t4",
    quote:
      "They built an AI assistant that actually answers customer questions in our tone — and knows when to hand over to a human.",
    name: "Sana Merchant",
    role: "Head of CX",
    company: "Retail chain",
    featured: true,
    order: 4,
    service: "ai-automation",
  },
];

/* ----------------------------------------------------------------------------
   Team (names from the live hero ticker; roles and bios are demo copy)
   ---------------------------------------------------------------------------- */
export const team = [
  {
    key: "vrinda",
    name: "Vrinda",
    role: "Founder & Brand Strategist",
    photo: "person-1",
    founder: true,
    order: 1,
  },
  { key: "aarav", name: "Aarav", role: "Creative Director", photo: "person-2", order: 2 },
  { key: "kabir", name: "Kabir", role: "Head of Growth", photo: "person-3", order: 3 },
  { key: "riddhi", name: "Riddhi", role: "Design Lead", photo: "person-4", order: 4 },
].map((m) => ({
  ...m,
  bio: `${m.name} is part of the senior team at Upsure. Ten years across brand and growth work for D2C challengers and enterprise teams, with a soft spot for launches that make a category look different overnight.`,
}));

/* ----------------------------------------------------------------------------
   Blog
   ---------------------------------------------------------------------------- */
export const categories = [
  { slug: "ai", title: "AI" },
  { slug: "brand", title: "Brand" },
  { slug: "agency", title: "Agency" },
];

export const posts = [
  {
    slug: "ai-in-the-growth-engine-2026",
    title: "AI in the growth engine: what's actually working in 2026",
    category: "ai",
    tags: ["AI", "Growth", "Marketing", "Performance"],
    publishedAt: "2026-06-24",
    cover: "post-ai-in-the-growth-engine-2026",
    excerpt:
      "Past the hype and the LinkedIn hot takes, a quiet truth: AI has made some marketing tasks 10x faster and left others completely untouched. A field report from inside the campaigns.",
    content: `
Somewhere between "AI will replace all marketers" and "AI content is soulless garbage" lives the boring, useful truth. We run growth programmes for brands every day with AI woven through the stack, so consider this a field report: what's genuinely working, what's overrated, and what hasn't changed at all.

## Working: the research grind, compressed

Audience research, competitor teardowns, review mining, keyword clustering, transcript analysis — work that used to eat the first two weeks of any engagement now takes days. Not because the thinking is automated, but because the reading is. We feed hundreds of customer reviews into an analysis pipeline and get themed, quoted, prioritised insight back in an afternoon. The strategist's job starts where it should: at the "so what?"

## Working: creative volume for testing

Performance marketing has always been a volume game — more angles, more hooks, more variants to test. AI has collapsed the cost of variants. We can take one strong creative concept and produce twenty disciplined variations for testing in the time it used to take to brief three. The winners still surprise us regularly, which is exactly the point: cheaper variants mean the data picks the winner, not the loudest opinion in the room.

The crucial caveat: volume without a strong concept is just noise at scale. AI multiplies the quality of the input. Garbage in, twenty variants of garbage out.

## Working: lifecycle that actually feels personal

Email and retention flows used to be segmented by crude buckets — new, active, lapsed. With AI in the loop, messaging adapts to what customers actually browsed, asked, and bought. One client's win-back flow now references the specific product category a customer went quiet on, in the brand's voice, generated and QA'd in a human-reviewed pipeline. Reply rates roughly doubled. Not magic — just relevance at a scale humans couldn't manually write.

## Overrated: fully automated content publishing

The "set it and forget it" AI blog machine produces exactly what you'd expect: content nobody asked for, ranking for terms nobody values, slowly training Google to ignore your domain. Every piece we publish has a human who owns the idea and a human who approves the words. AI drafts, accelerates, and adapts — people decide. The brands winning with content in 2026 are the ones using AI to raise their floor, not to abandon their standards.

## Unchanged: strategy, taste, and nerve

No model chooses your positioning. No model tells you which audience to walk away from, or gives you the nerve to look different from your category when every best practice says blend in. The decisions that make or break growth are exactly as human as they were five years ago — there are just fewer excuses now for spending your human hours on anything else.

> AI didn't change what good marketing is. It changed how much of your week you get to spend doing it.

If your growth engine still runs entirely on manual effort — or you've bolted on AI tools nobody actually uses — we build these systems end to end: strategy, creative, performance, and the intelligent plumbing underneath. Let's talk.
`.trim(),
  },
  {
    slug: "custom-ai-workflows-busywork-audit",
    title: "The busywork audit: how custom AI workflows give teams their week back",
    category: "ai",
    tags: ["AI", "Automation", "Workflows", "Operations"],
    publishedAt: "2026-05-27",
    cover: "post-custom-ai-workflows-busywork-audit",
    excerpt:
      "Every business runs on invisible, repetitive screen-work nobody signed up for. We find it, automate it, and hand the hours back. Here's our playbook — including where automation is a terrible idea.",
    content: `
Here's an exercise we run with every client, and you can do it right now: list the tasks your team does every single week that (a) happen on a screen, (b) follow roughly the same steps each time, and (c) nobody would miss doing.

Copying leads from forms into the CRM. Assembling the Monday report from four dashboards. Renaming and filing creative assets. Summarising call notes. Chasing invoice approvals. Reformatting the same content for five platforms. Sound familiar? That list is your busywork inventory — and it's almost always bigger and more expensive than anyone expects.

## Busywork is a tax on your best people

The cruel joke of busywork is that it usually lands on your most capable people, because they're the ones trusted to get it right. Your senior marketer builds the weekly report. Your best ops person reconciles the spreadsheets. Hours of judgment-capable brainpower spent on tasks that require none.

When we audit a team's week, we routinely find 8–15 hours per person of automatable work. Across a ten-person team, that's more than a full-time employee's worth of hours — currently being spent on copy-paste.

## What a custom workflow actually looks like

Forget the sci-fi version. A custom AI workflow is usually a chain of small, boring, reliable steps: watch for a trigger (new form entry, new file, incoming email), read and understand the content, transform it (summarise, extract, categorise, draft), then push the result where it belongs (CRM, Slack, spreadsheet, inbox) — with a human checkpoint wherever judgment matters.

Some real examples from our projects: a lead-routing flow that reads enquiries, scores intent, drafts a personalised reply, and files everything in the CRM before the founder has finished breakfast. A reporting pipeline that pulls from ad platforms and analytics, writes the narrative summary, and posts it to Slack every Monday at 9. A content engine that turns one long-form piece into platform-native drafts for five channels, each awaiting a human yes.

## The part nobody tells you: where automation is a bad idea

We turn down automation requests regularly, and it's worth explaining why. Don't automate a process that's still changing weekly — you'll automate the wrong thing, twice. Don't automate judgment calls with real consequences (pricing exceptions, sensitive customer replies) beyond a draft-for-review. And don't automate a broken process; automation makes processes faster, including bad ones. Fix first, then automate.

## How we run it

Every engagement starts with the audit: we map the week, find the busywork, and rank it by hours saved versus build effort. Then we ship the top of the list in small pieces — a working automation every week or two, not a six-month platform project. Your team learns to trust each piece before the next one arrives, and by the end they're spotting automation candidates themselves. That's the real win: not the workflows we build, but the team that starts thinking in workflows.

> The goal isn't replacing people. It's returning their hours to work that actually needs a human — the thinking, the taste, the relationships.

Want to know what your busywork inventory looks like? Send us a message — the audit conversation is free, and it's usually eye-opening.
`.trim(),
  },
  {
    slug: "customers-want-answers-not-chatbots",
    title: "Your customers don't want a chatbot. They want answers.",
    category: "ai",
    tags: ["AI", "Chatbots", "Customer Experience"],
    publishedAt: "2026-04-22",
    cover: "post-customers-want-answers-not-chatbots",
    excerpt:
      "Everyone's had a rage-inducing chatbot experience. It doesn't have to be that way. How we design AI assistants that resolve queries, sound like your brand, and know when to hand over to a human.",
    content: `
You know the feeling. You have one simple question. The little chat bubble pops up, chirpy and useless: "Hi! I'm Sparky! 😊 How can I help?" Twelve messages later, Sparky has linked you to three irrelevant FAQ pages, asked you to rephrase twice, and you're now typing AGENT AGENT AGENT like you're casting a spell.

That experience is so common that "chatbot" has become a dirty word. Which is a shame — because the technology has quietly gotten very, very good. The bad experiences aren't a technology problem anymore. They're a design problem.

## What changed

Old chatbots were decision trees wearing a trench coat: rigid scripts that shattered the moment you phrased something unexpectedly. Modern AI assistants actually read — your help docs, your policies, your product catalogue, your tone of voice — and generate answers grounded in that knowledge. Ask in Hindi, in slang, or in a rambling three-part question; a well-built assistant handles it.

## How we build them differently

### 1. Grounded in your actual knowledge

We connect the assistant to your real sources — help centre, policy docs, order systems, product data — so it answers from facts, not vibes. When it doesn't know, it says so and routes to a human. An assistant that admits uncertainty builds more trust than one that confidently makes things up.

### 2. Written in your brand voice

This is the step everyone skips, and it's our favourite one. Your assistant is often the highest-volume conversation your brand has — thousands of exchanges a month. We treat it like a brand touchpoint: tone, vocabulary, personality, even how it apologises. A D2C snack brand and an insurance company should not sound like the same robot.

### 3. Designed to hand over, not hold hostage

The goal is resolution, not containment. We design clear escalation paths — to WhatsApp, email, or a live agent — with full conversation context passed along so customers never repeat themselves. The metric we optimise is "did the customer get what they needed?", not "did we avoid a support ticket?"

### 4. Measured like a growth channel

Resolution rate, deflection quality, CSAT, conversion assists — we instrument all of it. One client discovered their assistant was quietly answering pre-purchase sizing questions at 2am and nudging conversions up. That insight reshaped their whole product page.

## Beyond support: where assistants earn their keep

Support is the obvious use case, but it's rarely the most valuable one. Lead qualification that asks smart questions before your sales team wakes up. Internal assistants that answer "where's the latest brand deck?" so your ops team stops playing librarian. Onboarding guides that walk new customers through setup step by step. Anywhere a knowledgeable human answers repetitive questions, an assistant can take the first shift.

> The best chatbot compliment isn't "wow, great AI." It's the customer not noticing anything except how fast they got their answer.

If your current chat widget is generating more rage than resolutions — or you don't have one and keep answering the same twenty questions by email — that's exactly the kind of project we love. Get in touch and we'll show you what a good one feels like.
`.trim(),
  },
  {
    slug: "we-design-brands-people-love",
    title: '"We design brands people love" — here\'s what that actually means',
    category: "brand",
    tags: ["Brand", "Philosophy", "Agency"],
    publishedAt: "2026-03-18",
    cover: "post-we-design-brands-people-love",
    excerpt:
      "Love is a strong word for a company. We use it anyway — because 'brands people tolerate' doesn't compound. A look at the philosophy behind everything we ship.",
    content: `
It's the first thing you see on our website: we design brands people love. It sounds like a tagline — and it is — but it's also a filter we run every single deliverable through. Here's what it means in practice.

## Tolerated brands leak. Loved brands compound.

Think about the brands you personally love. You forgive their mistakes. You tell friends about them unprompted. You don't comparison-shop every purchase. That behaviour — trust, advocacy, retention — is worth more than any single campaign, because it compounds quietly in the background while your competitors pay full price for every customer, every time.

A tolerated brand has to win every transaction on price or convenience. A loved brand starts every transaction two steps ahead. That gap is the entire economic argument for investing in brand.

## Love is earned in the details

Nobody falls in love with a logo. They fall in love with the hundred small moments around it: the confirmation email that made them smile, the packaging that felt considered, the support reply that solved the problem in one message, the Instagram post that felt like it was written by a person and not a committee.

That's why we don't stop at identity systems. We follow the brand into the touchpoints — content, campaigns, product moments, even the chatbot (yes, a chatbot can be on-brand; most are just built by people who never read the brand guidelines).

## People first — on both sides of the work

Since 2019 we've built the studio around one belief: great work comes from people who feel empowered, not managed. An honest, inclusive culture where designers challenge strategists and everyone challenges the brief. It's more fun like that — and the fun shows up in the work.

The same principle points outward. We put your customers first in every decision, because they're the ones who decide whether your brand gets loved or tolerated. Not us, not you, not an awards jury.

## Craft plus systems — the unglamorous secret

Here's the part agencies don't usually say out loud: love at scale requires systems. Consistency is what turns a good impression into a trusted relationship, and consistency doesn't come from inspiration — it comes from templates, guidelines, automation, and increasingly from AI that keeps quality high when humans are busy.

We pair an eye for craft with intelligent systems on purpose. The craft creates the moments people love; the systems make sure those moments happen every time, on every channel, at any volume.

> Beauty gets attention. Consistency earns trust. You need both, and they're built with completely different tools.

That's the philosophy. If it sounds like how you want your brand built, we should talk.
`.trim(),
  },
  {
    slug: "inside-upsure-what-we-actually-do",
    title: "Inside Upsure: what we actually do all day",
    category: "agency",
    tags: ["Agency", "Services", "Strategy"],
    publishedAt: "2026-02-12",
    cover: "post-inside-upsure-what-we-actually-do",
    excerpt:
      "Strategy decks that gather dust. Rebrands that change nothing. We built Upsure to be the opposite of that. Here's an honest tour of what we do — and what we refuse to do.",
    content: `
Ask ten agencies what they do and you'll get ten versions of the same sentence: "we build brands that connect." Cool. Connect to what? For how much? And who's actually doing the work — the senior person from the pitch, or three interns and a shared Notion doc?

We started Upsure because we were tired of that sentence. So here's the honest version of what we do all day, written the way we'd explain it to a friend over chai.

## Brand strategy: deciding what you are before deciding what you look like

Most branding problems are actually deciding problems. The founder thinks the product is for everyone (it isn't). The team describes the company six different ways (pick one). The website says "innovative solutions" (it means nothing).

Our strategy work is about making those decisions on purpose: who you're for, what you stand against, why anyone should care, and how you say it in a sentence a customer would actually repeat. Audits, positioning, messaging, naming — all of it exists to answer one question: what makes you the obvious choice?

## Creative & identity: the part people see

Once the thinking is sharp, we make it visible. Identity systems, campaign concepts, content series, social — designed to be beautiful, yes, but more importantly designed to ship. A gorgeous brand book that your team can't apply in Canva on a Tuesday afternoon is a very expensive PDF.

Everything we build comes with the systems to use it: templates, guidelines, and design ops that keep quality high when we're not in the room.

## Growth marketing: the compounding machine

Brand gets people to trust you. Growth gets them to find you. We run the whole engine — performance media, SEO and content, CRO and landing pages, lifecycle and retention — as one connected system, not four disconnected line items with four different reports.

The goal is compounding: every month's work should make next month's work more effective. If your acquisition costs are flat while your volume grows, the machine is working.

## Applied AI: the newest tool in the box (and the most misunderstood)

Here's where we're different from most agencies our size: we build with AI, not just about it. Custom chatbots that actually resolve customer queries instead of frustrating them. Workflow automations that take a 6-hour reporting task down to 6 minutes. Content pipelines where AI drafts and humans direct. Audits that show your team exactly where intelligent systems will pay off first — and where they're a waste of money.

And no, this isn't just for marketing. We've automated operations handoffs, internal knowledge bases, lead qualification, and customer support flows. If your team does it repeatedly on a screen, there's a good chance we can make it faster.

## What we refuse to do

No junior relay races — the people in the pitch are the people doing the work. No bloated retainers — we scope tightly and you always know what you're paying for. No 3-month discovery phases — momentum is a feature. And no hype — if AI (or anything else) won't move your numbers, we'll be the first to tell you.

> Our only metric of success is the asymmetric growth of our partners. 98% of our clients stay past their first engagement — that number is the whole pitch.

Curious what this looks like for your brand? Tell us where you're stuck — the contact form takes two minutes, and we reply within a business day.
`.trim(),
  },
];

/* ----------------------------------------------------------------------------
   Case studies (clients from the live logo wall; scope copy to be confirmed by Upsure, no invented figures or quotes)
   ---------------------------------------------------------------------------- */
export const caseStudies = [
  {
    slug: "lenskart",
    client: "Lenskart",
    industry: "Eyewear retail",
    services: ["branding", "design", "growth"],
    cover: "work-lenskart",
    featured: true,
    summary:
      "Brand, design and growth for one of India's best-known eyewear brands, working as one system.",
    intro:
      "Lenskart sells eyewear online and in stores across India, so the brand has to work as hard in a paid ad as it does on a shop window. Our work spanned brand, design and growth marketing.",
    objective:
      "Keep the brand [[instantly recognisable]] at every touchpoint, while the performance work [[keeps pace with a fast-moving retailer]].",
    sections: [
      {
        eyebrow: "Brand",
        heading: "One voice, online and in store",
        body: "We started from how people actually shop for glasses: browsing frames online, trying them on in store, coming back for lenses. Messaging was organised around those moments, so every channel knew its job.",
      },
      {
        eyebrow: "Design",
        heading: "A system built to ship",
        body: "Ads, social and in-store graphics share one set of design rules, so new collections and offers can go live quickly without drifting off-brand.",
      },
      {
        eyebrow: "Growth",
        heading: "Creative and performance in the same room",
        body: "Paid creative is planned alongside the media plan, not after it. New angles are tested in small batches, and what works feeds straight into the next round of design.",
      },
    ],
    timeline: [
      { when: "Discover", what: "Audit of brand, channels and creative" },
      { when: "Define", what: "Messaging framework and design rules" },
      { when: "Build", what: "Templates and campaign creative" },
      { when: "Grow", what: "Ongoing testing and iteration" },
    ],
  },
  {
    slug: "hyundai",
    client: "Hyundai",
    industry: "Automotive",
    services: ["social-media", "design"],
    cover: "work-hyundai",
    featured: true,
    summary: "Social content and design for an automotive brand where every launch is an event.",
    intro:
      "Buying a car is a considered decision, and much of that consideration now happens on a phone. Our work with Hyundai focused on social media content and the design system behind it.",
    objective:
      "Make every model launch feel like [[an event worth following]], and keep the feed [[useful between launches]], not just loud during them.",
    sections: [
      {
        eyebrow: "Social",
        heading: "Planned around the launch calendar",
        body: "Content is planned in phases around each model launch — build-up, launch day and follow-through — so every launch tells a story rather than living in a single post.",
      },
      {
        eyebrow: "Design",
        heading: "A kit that respects the brand",
        body: "A social design kit keeps typography, colour and photography consistent across every format, from stories to carousels, so the team can move fast without guesswork.",
      },
      {
        eyebrow: "Community",
        heading: "Reasons to stay between launches",
        body: "Feature explainers, ownership tips and community moments keep the audience engaged in the quieter months, and give people a reason to come back.",
      },
    ],
    timeline: [
      { when: "Discover", what: "Channel and content audit" },
      { when: "Define", what: "Content pillars and launch playbook" },
      { when: "Build", what: "Social design kit and templates" },
      { when: "Grow", what: "Always-on content and launch campaigns" },
    ],
  },
  {
    slug: "samsung",
    client: "Samsung",
    industry: "Consumer electronics",
    services: ["design", "social-media", "ai-automation"],
    cover: "work-samsung",
    featured: true,
    summary:
      "Design, social and AI-assisted production for a consumer-tech brand that never stops launching.",
    intro:
      "In consumer electronics the product cycle sets the pace, and content has to keep up across every format and platform. Our work with Samsung combined design, social media and AI-assisted content workflows.",
    objective:
      "Produce [[more creative, faster]], without letting quality or consistency slip — with [[AI where it helps and people where it matters]].",
    sections: [
      {
        eyebrow: "Design",
        heading: "One look across every format",
        body: "Clear rules for layout, type and product imagery keep every asset recognisably on-brand, whether it is a launch banner or a fifteen-second story.",
      },
      {
        eyebrow: "Social",
        heading: "Built for each platform",
        body: "Rather than resizing one asset everywhere, content is shaped for how each platform is used: quick hooks for short video, detail for carousels, clarity for search.",
      },
      {
        eyebrow: "AI-first",
        heading: "AI-assisted, human-approved",
        body: "AI tools take on the repetitive parts of production, such as versioning, resizing and first drafts. Designers and writers make the decisions and sign off every piece.",
      },
    ],
    timeline: [
      { when: "Discover", what: "Production and workflow audit" },
      { when: "Define", what: "Design rules and platform playbooks" },
      { when: "Build", what: "AI-assisted production workflow" },
      { when: "Grow", what: "Ongoing content across platforms" },
    ],
  },
  {
    slug: "decathlon",
    client: "Decathlon",
    industry: "Sports retail",
    services: ["growth", "design"],
    cover: "work-decathlon",
    featured: true,
    summary: "Growth marketing and design for a sports retailer with a huge, varied range.",
    intro:
      "Decathlon sells gear for dozens of sports, which makes search and landing pages as important as any campaign. Our work focused on growth marketing and design.",
    objective:
      "Help people [[find the right gear faster]], and turn more of that interest into [[orders and store visits]].",
    sections: [
      {
        eyebrow: "Growth",
        heading: "Planned around what people search for",
        body: "We mapped what people look for across sports and seasons, and planned content and landing pages around those needs rather than around internal categories.",
      },
      {
        eyebrow: "Design",
        heading: "Landing pages built to convert",
        body: "A modular landing-page system makes it quick to launch a page for a new sport, season or offer, each designed around one clear action.",
      },
      {
        eyebrow: "Testing",
        heading: "Small tests, steady learning",
        body: "Headlines, layouts and offers are tested continuously, and the winners become the new defaults across pages.",
      },
    ],
    timeline: [
      { when: "Discover", what: "Search and conversion audit" },
      { when: "Define", what: "Sport and season content plan" },
      { when: "Build", what: "Modular landing-page system" },
      { when: "Grow", what: "Continuous testing and iteration" },
    ],
  },
].map((c, i) => ({
  ...c,
  title: c.client,
  publishedAt: new Date(2026, 6 - i, 10).toISOString(),
}));

/* ----------------------------------------------------------------------------
   Forms. Submissions are emailed to the team (see features/forms/action.ts).
   ---------------------------------------------------------------------------- */
export const forms = {
  contact: {
    title: "Contact",
    submitButtonLabel: "Send message",
    confirmationType: "message",
    confirmationMessage: "Thanks — we'll get back to you within one business day.",
    fields: [
      { blockType: "text", name: "name", label: "Name", required: true, width: 50 },
      { blockType: "email", name: "email", label: "Email", required: true, width: 50 },
      { blockType: "text", name: "company", label: "Company / brand", required: false, width: 50 },
      {
        blockType: "select",
        name: "source",
        label: "How did you hear about us?",
        required: false,
        width: 50,
        options: [
          { label: "Referral", value: "referral" },
          { label: "Instagram", value: "instagram" },
          { label: "Search", value: "search" },
          { label: "LinkedIn", value: "linkedin" },
          { label: "Event", value: "event" },
          { label: "Other", value: "other" },
        ],
      },
      {
        blockType: "textarea",
        name: "message",
        label: "Tell us about your brand and what you're looking for",
        required: true,
        width: 100,
      },
    ],
  },
  consultation: {
    title: "Request a free consultation",
    submitButtonLabel: "Request consultation",
    confirmationType: "message",
    confirmationMessage: "Thanks — we'll be in touch to book your free 30-minute discovery call.",
    fields: [
      { blockType: "text", name: "name", label: "Name", required: true, width: 100 },
      { blockType: "email", name: "email", label: "Email", required: true, width: 100 },
      { blockType: "text", name: "phone", label: "Phone", required: false, width: 100 },
      {
        blockType: "textarea",
        name: "message",
        label: "What do you need help with?",
        required: false,
        width: 100,
      },
    ],
  },
  callback: {
    title: "Request a call back",
    submitButtonLabel: "Request call back",
    confirmationType: "message",
    confirmationMessage: "Thanks — we'll call you back within one business day.",
    fields: [
      { blockType: "text", name: "name", label: "Name", required: true, width: 100 },
      { blockType: "text", name: "phone", label: "Phone", required: true, width: 100 },
      { blockType: "email", name: "email", label: "Email", required: false, width: 100 },
    ],
  },
  brief: {
    title: "Project brief",
    submitButtonLabel: "Send brief",
    confirmationType: "message",
    confirmationMessage: "Brief received. We'll reply with next steps within one business day.",
    fields: [
      { blockType: "text", name: "needs", label: "What do you need?", required: true, width: 100 },
      {
        blockType: "select",
        name: "budget",
        label: "Budget",
        required: true,
        width: 50,
        options: [
          { label: "Under ₹2 lakh", value: "under-2l" },
          { label: "₹2 – 5 lakh", value: "2-5l" },
          { label: "₹5 – 15 lakh", value: "5-15l" },
          { label: "₹15 lakh+", value: "15l-plus" },
          { label: "Monthly retainer", value: "retainer" },
          { label: "Not sure yet", value: "unsure" },
        ],
      },
      {
        blockType: "select",
        name: "timeline",
        label: "Timeline",
        required: true,
        width: 50,
        options: [
          { label: "As soon as possible", value: "asap" },
          { label: "Within 1–2 months", value: "1-2m" },
          { label: "This quarter", value: "quarter" },
          { label: "Exploring", value: "exploring" },
        ],
      },
      { blockType: "text", name: "name", label: "Name", required: true, width: 50 },
      { blockType: "email", name: "email", label: "Email", required: true, width: 50 },
      { blockType: "text", name: "company", label: "Company / brand", required: false, width: 100 },
      {
        blockType: "textarea",
        name: "message",
        label: "Anything else we should know?",
        required: false,
        width: 100,
      },
    ],
  },
};

/* ----------------------------------------------------------------------------
   Globals
   ---------------------------------------------------------------------------- */
export const siteSettings = {
  name: "Upsure",
  tagline: "We design brands people love",
  email: CONTACT_EMAIL,
  // Phone and street address are hidden site-wide while empty. Fill in the
  // real ones (phoneHref is digits only, e.g. "+919876543210").
  phone: "",
  phoneHref: "",
  addressLine1: "",
  addressLine2: "",
  city: "Ahmedabad, India",
  hours: "Mon – Fri, 10:00 – 18:00 IST",
  socials: [{ platform: "Instagram", url: "https://www.instagram.com/upsure_media/" }],
  stats: [
    { value: 100, suffix: "+", label: "brands served" },
    { value: 250, suffix: "+", label: "Projects delivered across brand & growth" },
    { value: 98, suffix: "%", label: "Client retention, year over year" },
  ],
  badges: [{ text: "Based in Ahmedabad" }],
  defaultTitle: "Upsure – Creative & growth agency in Ahmedabad",
  defaultDescription:
    "We design brands people love. Upsure is a creative agency rooted in strategy, craft, and AI-driven growth — helping ambitious brands cut through the noise.",
  legalName: "Upsure",
  registrationNumbers: "",
};

export const header = {
  items: [
    {
      label: "Services",
      href: "/services",
      children: services.map((s) => ({
        label: s.title,
        href: `/services/${s.slug}`,
        description: s.tags.join(" · "),
      })),
    },
    { label: "Work", href: "/work", children: [] },
    {
      label: "About",
      href: "/about",
      children: [
        { label: "About us", href: "/about", description: "Who we are and how we work" },
        { label: "Culture", href: "/culture", description: "Values, team and how we hire" },
        { label: "Testimonials", href: "/testimonials", description: "What clients say" },
      ],
    },
    { label: "Blog", href: "/blog", children: [] },
    { label: "Contact", href: "/contact", children: [] },
  ],
  cta: { label: "Start a project", href: "/start-a-project" },
  secondary: [
    { label: "Instagram", href: "https://www.instagram.com/upsure_media/", newTab: true },
  ],
};

export const footer = {
  description:
    "Upsure is a creative and growth agency in Ahmedabad. We are the creative link between strategy, brand, and AI-driven growth.",
  columns: [
    {
      heading: "Explore",
      links: [
        { label: "Services", href: "/services" },
        { label: "Work", href: "/work" },
        { label: "About", href: "/about" },
        { label: "Culture", href: "/culture" },
        { label: "Testimonials", href: "/testimonials" },
        { label: "Blog", href: "/blog" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      heading: "Services",
      links: services.map((s) => ({ label: s.title, href: `/services/${s.slug}` })),
    },
  ],
  newsletter: {
    heading: "Subscribe to The Upshot",
    text: "Sharp takes on brand, growth, and applied AI. Sent monthly, from our screen to yours.",
    placeholder: "Enter your email",
    buttonLabel: "Subscribe",
  },
  legal: [
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Privacy", href: "/privacy" },
  ],
  copyright: "Upsure",
};

export const ctaBand = {
  emoji: "👋",
  heading: "Ready to move forward?",
  subheading: "Let's work together!",
  link: { label: "Contact us", href: "/contact", newTab: false },
};

/* ----------------------------------------------------------------------------
   Pages (block layouts)
   ---------------------------------------------------------------------------- */
const needs = (ctx: Ctx, items: [string, string][]) =>
  items.map(([label, slug]) => ({ label, service: ctx.services[slug] }));

export const pages = (ctx: Ctx) => [
  {
    slug: "home",
    title: "Home",
    layout: [
      {
        blockType: "hero",
        variant: "collage",
        eyebrow: "Creative & growth agency, Ahmedabad",
        heading: "We design|brands people|[[love.]]",
        lead: "We are Upsure, a creative agency rooted in [[strategy, craft, and growth]]. We help ambitious brands cut through the noise through [[brand, content, and performance]] that compounds.",
        stickers: [
          { text: "100+ brands served", tone: "sun" },
          { text: "98% client retention", tone: "teal" },
        ],
        ctas: [
          { label: "Start a project", href: "/start-a-project" },
          { label: "Our services", href: "/services" },
        ],
        images: ["hero-1", "hero-2", "hero-3"].map((k) => ({ image: ctx.media[k] })),
        showContact: true,
      },
      { blockType: "logoTicker", heading: "Trusted by India's leading brands", tone: "paper" },
      {
        blockType: "statement",
        eyebrow: "About us",
        text: "We are the [[creative link]] between strategy, brand, and AI-driven growth: a [[tight-knit team]] of strategists, designers, and growth experts, [[obsessed with doing excellent work]] for the brands we partner with.",
        cta: { label: "Get to know us", href: "/about", newTab: false },
        tone: "paper",
      },
      {
        blockType: "workGrid",
        eyebrow: "Work",
        heading: "Our latest work",
        intro:
          "A few of the brands we have helped sharpen, launch and grow. Every project pairs senior strategy with craft, and is measured by what it moves.",
        limit: 4,
        layout: "grid",
        cta: { label: "View all work", href: "/work", newTab: false },
        tone: "teal-ink",
      },
      {
        blockType: "serviceGrid",
        eyebrow: "Our services",
        heading: "Brand, content and growth — [[under one roof]]",
        intro:
          "Most agencies pick one. We refuse to. Strategy, creative and performance run as one team, so the work is as effective as it is beautiful.",
        layout: "accordion",
        tone: "paper",
      },
      {
        blockType: "proofTicker",
        items: [
          "100+ brands served",
          "250+ projects delivered",
          "98% client retention",
          "Based in Ahmedabad, working worldwide",
          "Senior team on every project",
        ].map((text) => ({ text })),
        heading: "Send us a brief and we'll talk",
        cta: { label: "Start a project", href: "/start-a-project", newTab: false },
      },
      {
        blockType: "needPicker",
        eyebrow: "Start here",
        heading: "How can we help you?",
        subheading: "Choose what fits your needs",
        items: needs(ctx, [
          ["We need to sharpen our positioning", "branding"],
          ["Our brand needs to reflect who we are", "branding"],
          ["We need content that actually converts", "social-media"],
          ["We want to scale paid acquisition", "growth"],
          ["Our SEO needs a real growth engine", "growth"],
          ["We need a growth partner, not a vendor", "consulting"],
        ]),
        tone: "paper-2",
      },
      {
        blockType: "blogCarousel",
        eyebrow: "Blog",
        heading: "What's happening?",
        limit: 4,
        tone: "teal-ink",
      },
      { blockType: "faq", eyebrow: "FAQ", heading: "Good questions", scope: "home", tone: "paper" },
    ],
  },
  {
    slug: "services",
    title: "Services",
    layout: [
      {
        blockType: "hero",
        variant: "editorial",
        eyebrow: "Services",
        heading:
          "Ideas that build brands. Senior strategy, creative, and growth — for companies that want [[outcomes, not hours]].",
        stickers: [
          { text: "Senior specialists", tone: "sun" },
          { text: "Marketing under one roof", tone: "teal" },
        ],
        images: [{ image: ctx.media["services-hero"] }],
        showContact: true,
      },
      {
        blockType: "statement",
        text: "Most agencies sell you hours. We sell you [[outcomes]] — for names like Samsung, Hyundai, Lenskart, and Decathlon, and for the ambitious challengers determined to join them.",
        tone: "paper",
      },
      {
        blockType: "serviceGrid",
        eyebrow: "What we do",
        heading: "Five ways we help, [[one team]]",
        layout: "accordion",
        tone: "white",
      },
      {
        blockType: "capabilities",
        eyebrow: "Capabilities",
        heading: "Capabilities",
        items: [
          "Brand audits",
          "Positioning & messaging",
          "Naming & verbal identity",
          "Internal brand activation",
          "Visual identity & guidelines",
          "Campaign concepts",
          "Content series & social",
          "Production & design ops",
          "Performance media",
          "SEO & content engine",
          "CRO & landing pages",
          "Lifecycle & retention",
          "AI content workflows",
          "Marketing automation",
          "Custom AI agents & chatbots",
          "AI audits & team enablement",
          "GTM advisory",
          "Quarterly planning",
          "Brand & growth reviews",
        ].map((label) => ({ label })),
        tone: "paper",
      },
      {
        blockType: "needPicker",
        eyebrow: "Start here",
        heading: "How can we help you?",
        subheading: "Choose what fits your needs",
        items: needs(ctx, [
          ["Our brand needs sharper positioning", "branding"],
          ["We need a consistent identity across every channel", "branding"],
          ["Our content isn't converting the way it should", "social-media"],
          ["We want to launch a new brand the right way", "branding"],
          ["We need campaigns that actually bring our brand to life", "design"],
          ["We need to scale acquisition without wasting spend", "growth"],
          ["We want to put AI to work in our marketing — properly", "ai-automation"],
          ["We want a senior team, not a junior relay race", "consulting"],
        ]),
        tone: "paper-2",
      },
      {
        blockType: "approachSteps",
        eyebrow: "Our approach",
        heading: "Our approach",
        steps: [
          {
            title: "Discover",
            subtitle: "Research and insights",
            body: "Stakeholder interviews, audits, and audience research. We listen, challenge assumptions, and separate the musts from the maybes — so we truly understand your business before we build.",
            image: ctx.media["approach-illo"],
          },
          {
            title: "Define",
            subtitle: "Strategy and scope",
            body: "Positioning, narrative and a tightly scoped plan. Everyone knows what we are building, why, and what it costs before the first pixel.",
          },
          {
            title: "Design & build",
            subtitle: "Craft, fast",
            body: "Identity, content, campaigns and growth systems, shown early and often. Senior people do the work; you see it while it is still cheap to change.",
          },
          {
            title: "Launch & grow",
            subtitle: "Measure, learn, compound",
            body: "Launching is a beginning. We stay on to measure, learn and compound the brand and the pipeline month over month.",
          },
        ],
        tone: "white",
      },
      {
        blockType: "engagementModels",
        eyebrow: "Ways to work together",
        heading: "How we work together",
        intro:
          "Transparent upfront — no surprise invoices. Pick the shape that fits where you are.",
        items: [
          {
            name: "Fixed-scope project",
            bestFor: "A defined outcome: a rebrand, a launch, a site",
            length: "4–12 weeks",
            includes: ["Senior team throughout", "Tight written scope", "Fixed price"].map(
              (item) => ({ item }),
            ),
            highlight: false,
          },
          {
            name: "Monthly retainer",
            bestFor: "Ongoing brand, content and growth",
            length: "3 months minimum",
            includes: ["Dedicated pod", "Monthly planning & reporting", "Priority access"].map(
              (item) => ({ item }),
            ),
            highlight: true,
          },
          {
            name: "Fractional senior support",
            bestFor: "Founders and CMOs at inflection points",
            length: "Flexible",
            includes: ["GTM advisory", "Quarterly planning", "Brand & growth reviews"].map(
              (item) => ({ item }),
            ),
            highlight: false,
          },
        ],
        tone: "paper",
      },
      {
        blockType: "comparison",
        eyebrow: "Why Upsure",
        heading: "Upsure vs a typical agency",
        usLabel: "Upsure",
        themLabel: "Typical agency",
        rows: [
          {
            label: "Who does the thinking",
            us: "Senior people, start to finish",
            them: "Seniors pitch, juniors deliver",
          },
          { label: "What you buy", us: "Outcomes, scoped in writing", them: "Hours and retainers" },
          {
            label: "Brand and growth",
            us: "One integrated team",
            them: "Pick one, or two vendors",
          },
          {
            label: "AI",
            us: "Built into the work where it pays off",
            them: "A badge on the website",
          },
          { label: "Discovery", us: "Weeks, then we build", them: "Months, then a deck" },
        ],
        tone: "teal-ink",
      },
      {
        blockType: "featureList",
        eyebrow: "Why us",
        heading: "What you get",
        image: ctx.media["studio-plant"],
        items: [
          {
            title: "A senior team, no fuss",
            body: "From D2C challengers to enterprise in-house teams, we adapt to where you are. No junior teams ghostwriting the thinking, no bloated retainers padding the bill — just senior people doing excellent work.",
          },
          {
            title: "Expertise across brand & growth",
            body: "We understand brand and growth inside out. By integrating strategy, creative, and performance into one team, we ship work that's as effective as it is beautiful. Most agencies pick one — we refuse to.",
          },
          {
            title: "Outcomes, early and often",
            body: "Most agencies sell you hours. We sell you outcomes. Our only metric of success is the asymmetric growth of our partners — and we hold ourselves to it. 98% of our clients stay. The numbers speak.",
          },
        ],
        tone: "white",
      },
      {
        blockType: "faq",
        eyebrow: "FAQ",
        heading: "Good questions",
        scope: "services",
        image: ctx.media["studio-dog"],
        tone: "paper",
      },
    ],
  },
  {
    slug: "work",
    title: "Work",
    layout: [
      {
        blockType: "hero",
        variant: "editorial",
        eyebrow: "Work",
        heading: "Work that [[moved the numbers]]",
        lead: "Brand, content and growth work for household names and the challengers determined to sit beside them.",
        stickers: [
          { text: "Full-service", tone: "sun" },
          { text: "Trusted by India's brands", tone: "teal" },
        ],
        showContact: true,
      },
    ],
  },
  {
    slug: "about",
    title: "About",
    layout: [
      {
        blockType: "hero",
        variant: "editorial",
        eyebrow: "About",
        heading: "About [[Upsure]]",
        lead: "We're a creative agency shaped by the [[brands we build for]], and the [[people we build with]]. We design brands people love.",
        stickers: [
          { text: "Proudly from Ahmedabad", tone: "sun" },
          // Add { text: "Est. <year>", tone: "teal" } once the founding year is confirmed.
        ],
        images: [{ image: ctx.media["about-1"] }],
        showContact: true,
      },
      {
        blockType: "textColumns",
        eyebrow: "Who we are",
        columns: [
          {
            heading: "We design brands people love.",
            body: "We believe in creating more than just functional work. We craft strategy, creative, and growth that bridge people, businesses, and ideas — intuitive, impactful, and built to compound, all while having fun along the way. We put people first, from the team we nurture to the brands we build.",
          },
          {
            heading: "Based in Ahmedabad, working worldwide.",
            body: "We help companies cut through the noise and establish new growth — from household names like Vivo, Titan, Realme, and Axis Max Life to the challengers determined to sit beside them. Like the brands we work with, Upsure is constantly evolving, driven to shape what's next. Curiosity and clear communication guide us at every step.",
          },
        ],
        images: ["team-table", "team-couch", "team-review"].map((k) => ({ image: ctx.media[k] })),
        tone: "paper",
      },
      {
        blockType: "stats",
        eyebrow: "Trusted by",
        items: [
          { value: 100, suffix: "+", label: "brands served" },
          { value: 250, suffix: "+", label: "Projects delivered across brand & growth" },
          { value: 98, suffix: "%", label: "Client retention, year over year" },
        ],
        tone: "white",
      },
      {
        blockType: "textColumns",
        eyebrow: "What we do",
        columns: [
          {
            heading: "What we do",
            body: "Our expertise lies in brand, content, and AI-driven growth for forward-thinking businesses. We pair an eye for craft with intelligent systems and a strong grip on strategy to deliver lasting value and real results.",
            link: { label: "Our services", href: "/services", newTab: false },
          },
        ],
        images: ["team-present", "about-2", "about-3"].map((k) => ({ image: ctx.media[k] })),
        tone: "paper",
      },
      {
        blockType: "leadForm",
        eyebrow: "Talk to us",
        heading: "Built by people who know how to make growth happen",
        intro:
          "Leave your number and a senior member of the team will call you back within one business day.",
        form: ctx.forms.callback,
        layout: "split",
        tone: "teal-ink",
      },
      { blockType: "logoTicker", heading: "Trusted by India's leading brands", tone: "paper" },
      {
        blockType: "workGrid",
        eyebrow: "Our work",
        heading: "Some of the brands we work with",
        limit: 4,
        layout: "grid",
        cta: { label: "View all work", href: "/work", newTab: false },
        tone: "white",
      },
    ],
  },
  {
    slug: "culture",
    title: "Culture",
    layout: [
      {
        blockType: "hero",
        variant: "editorial",
        eyebrow: "Culture",
        heading: "Everyone has [[skin in the game]]",
        lead: "Upsure is built on one founding principle: deliver the best work, with the best people, for brands we believe in.",
        stickers: [
          { text: "No egos. Just experts.", tone: "sun" },
          { text: "Commercially focused", tone: "teal" },
        ],
        images: [{ image: ctx.media["culture-hero"] }],
      },
      {
        blockType: "statement",
        eyebrow: "Founder's note",
        text: "Upsure started with a small group of people who refused to accept average work. We're a tight team of specialists across [[brand, content, growth and AI]] who care deeply about what we do — [[no egos, no fluff]], just hard work and results.",
        tone: "paper",
      },
      {
        blockType: "featureList",
        eyebrow: "Values",
        heading: "How we work",
        items: [
          {
            title: "Curiosity first",
            body: "We ask the uncomfortable question before we open the design tools.",
          },
          {
            title: "Clear communication",
            body: "Fewer meetings, shorter decks, straight answers.",
          },
          {
            title: "Craft and outcomes",
            body: "Beautiful work that moves a number. Never one without the other.",
          },
          {
            title: "People before process",
            body: "Trusted people do their best work when they're allowed to get on with it.",
          },
        ],
        tone: "white",
      },
      {
        blockType: "teamGrid",
        eyebrow: "The team",
        heading: "The people behind the work",
        intro:
          "Strategists, designers and growth people who have shipped for the brands on our wall.",
        tone: "paper",
      },
      {
        blockType: "textColumns",
        eyebrow: "Work with us",
        columns: [
          {
            heading: "Join us",
            body: "We're always curious to meet sharp strategists, designers, and growth marketers. Even when nothing's posted, introduce yourself — drop us a line by email.",
            link: {
              label: "Introduce yourself",
              href: `mailto:${CONTACT_EMAIL}?subject=Joining%20Upsure`,
              newTab: false,
            },
          },
          {
            heading: "Collaborate with us",
            body: "We're always expanding our network of collaborators for projects that need more than one team. If you share our values and way of working, we'd love to hear from you.",
            link: {
              label: "Become a collaborator",
              href: `mailto:${CONTACT_EMAIL}?subject=Collaboration`,
              newTab: false,
            },
          },
        ],
        tone: "paper-2",
      },
    ],
  },
  {
    slug: "testimonials",
    title: "Testimonials",
    layout: [
      {
        blockType: "hero",
        variant: "editorial",
        eyebrow: "Testimonials",
        heading: "What clients say about [[working with us]]",
        lead: "A few words from the founders and marketing leads we work with.",
        stickers: [
          { text: "98% stay", tone: "teal" },
          { text: "Senior team", tone: "sun" },
        ],
        showContact: true,
      },
      {
        blockType: "testimonialCarousel",
        eyebrow: "Reviews",
        heading: "In their words",
        tone: "paper",
      },
      {
        blockType: "stats",
        eyebrow: "Trusted by",
        items: [
          { value: 100, suffix: "+", label: "brands served" },
          { value: 250, suffix: "+", label: "Projects delivered" },
          { value: 98, suffix: "%", label: "Client retention" },
        ],
        tone: "white",
      },
    ],
  },
  {
    slug: "blog",
    title: "Blog",
    layout: [
      {
        blockType: "hero",
        variant: "editorial",
        eyebrow: "Blog",
        heading: "Sharp ideas on [[brand, content, and growth]].",
        lead: "Thinking from the Upsure team — on strategy, creativity, and what it actually takes to grow a brand.",
      },
    ],
  },
  {
    slug: "contact",
    title: "Contact",
    showCtaBand: false,
    layout: [
      {
        blockType: "hero",
        variant: "dark",
        eyebrow: "Contact",
        heading: "Let's work together! 👋",
        lead: "We'd love to hear more about your brand and explore how we can help you grow. You'd be in good company — Samsung, Hyundai, and 100+ other brands have trusted us with theirs.",
        ctas: [{ label: "Send a message", href: "#lead-form" }],
        showContact: true,
      },
      {
        blockType: "leadForm",
        eyebrow: "Say hello",
        heading: "Tell us about your brand",
        intro: `Fill in the form and we'll get back to you within one business day. Prefer email? Reach us at ${CONTACT_EMAIL}.`,
        form: ctx.forms.contact,
        layout: "split",
        tone: "paper",
      },
      {
        blockType: "processSteps",
        eyebrow: "What happens next",
        heading: "Start a collaboration",
        steps: [
          {
            title: "Get in touch",
            body: "We'd love to hear about your brand and how we can help. Send us an email and we'll get back to you shortly.",
            link: { label: "Send a message", href: "#lead-form", newTab: false },
          },
          {
            title: "Meeting → Proposal",
            body: "We'll meet to discuss and scope the work, followed by a clear proposal. Agree? Let's do this!",
          },
          {
            title: "Let's get started!",
            body: "We're excited to partner with you — and committed to making this a great, long-running collaboration.",
          },
        ],
        tone: "white",
      },
      {
        blockType: "faq",
        eyebrow: "FAQ",
        heading: "Before you write",
        scope: "contact",
        tone: "paper",
      },
      {
        blockType: "textColumns",
        eyebrow: "Other ways in",
        columns: [
          {
            heading: "Join us",
            body: "We're always curious to meet sharp strategists, designers, and growth marketers. Even when nothing's posted, introduce yourself — drop us a line by email.",
            link: {
              label: "Introduce yourself",
              href: `mailto:${CONTACT_EMAIL}?subject=Joining%20Upsure`,
              newTab: false,
            },
          },
          {
            heading: "Collaborate with us",
            body: "We're always expanding our network of collaborators for projects that need more than one team. If you share our values and way of working, we'd love to hear from you.",
            link: {
              label: "Become a collaborator",
              href: `mailto:${CONTACT_EMAIL}?subject=Collaboration`,
              newTab: false,
            },
          },
        ],
        tone: "paper-2",
      },
    ],
  },
  {
    slug: "start-a-project",
    title: "Start a project",
    showCtaBand: false,
    layout: [
      {
        blockType: "hero",
        variant: "editorial",
        eyebrow: "Brief builder",
        heading: "Tell us what you need. We'll come back with a [[scoped plan]].",
        lead: "Three quick steps. Pick what you need, tell us roughly when and how much, leave your details. A senior team member replies within one business day.",
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms & Conditions",
    showCtaBand: false,
    layout: [
      {
        blockType: "hero",
        variant: "editorial",
        eyebrow: "Legal",
        heading: "Terms & Conditions",
        lead: "Last updated: 9 July 2026",
      },
      {
        blockType: "richText",
        width: "narrow",
        content: `
## 1. Who we are

Upsure is a creative and growth agency based in Ahmedabad, India. These terms govern your use of this website and, where expressly agreed, form part of our engagement with clients. By using this site you accept these terms.

## 2. Use of this website

You may browse, link to, and share the content on this site for personal and business-evaluation purposes. You may not copy, scrape, republish, or use our content, branding, or imagery for commercial purposes without our written permission.

## 3. Our work and intellectual property

All content on this website — including text, graphics, logos, illustrations, and case-study material — belongs to Upsure or to the respective clients whose work is shown. Client work is displayed with permission and remains the property of its respective owners.

## 4. Client engagements

Services we provide to clients are governed by individual proposals and agreements, which take precedence over these website terms. Scope, deliverables, timelines, fees, and ownership of work product are defined per engagement, in writing, before work begins.

## 5. No warranties

This website and its content are provided on an "as is" basis. While we keep information accurate and current, we make no warranties about the completeness or reliability of the content, and we may change it at any time without notice.

## 6. Limitation of liability

To the fullest extent permitted by law, Upsure is not liable for any indirect or consequential loss arising from your use of this website. Nothing in these terms limits liability that cannot be limited under applicable law.

## 7. Contact

Questions about these terms? Email us at ${CONTACT_EMAIL} and we'll get back to you within one business day.
`.trim(),
        tone: "paper",
      },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy Policy",
    showCtaBand: false,
    layout: [
      {
        blockType: "hero",
        variant: "editorial",
        eyebrow: "Legal",
        heading: "Privacy Policy",
        lead: "Last updated: 9 July 2026",
      },
      {
        blockType: "richText",
        width: "narrow",
        content: `
## 1. What we collect

When you contact us through the form on this site, we collect the details you provide: your name, email address, company name, and message. We don't require an account, and we don't ask for anything we don't need to reply to you.

## 2. How we use it

We use your contact details solely to respond to your enquiry and, where a conversation continues, to manage our working relationship. If you subscribe to our newsletter, we use your email to send it — nothing else. We never sell or rent your information.

## 3. Form processing

Form submissions are checked for spam on our server, then emailed to our inbox through Web3Forms, a form-delivery service. They are not stored on this website, and are used only to deliver your message to us.

## 4. Analytics and cookies

This site may use privacy-respecting analytics to understand aggregate visitor behaviour (pages visited, approximate region). We don't use advertising trackers, and we don't build individual visitor profiles.

## 5. Data retention

We keep enquiry emails for as long as needed to serve the conversation and our legitimate business records. You can ask us to delete your correspondence at any time.

## 6. Your rights

You can request access to, correction of, or deletion of the personal information we hold about you. Email us and we'll action it promptly.

## 7. Contact

For any privacy question or request, email ${CONTACT_EMAIL}. We reply within one business day.
`.trim(),
        tone: "paper",
      },
    ],
  },
];
