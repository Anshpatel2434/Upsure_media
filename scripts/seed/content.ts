/**
 * Seed dataset. Real copy comes verbatim from docs/01-current-site-content-inventory.md.
 * Anything invented is flagged `placeholder: true` so it can be found in the admin.
 */

import { richText } from "./lexical";

export type Id = number | string;

/** Resolved ids the runner fills in before building page layouts. */
export type Ctx = {
  media: Record<string, Id>;
  services: Record<string, Id>;
  caseStudies: Record<string, Id>;
  testimonials: Record<string, Id>;
  faqs: Record<string, Id>;
  categories: Record<string, Id>;
  forms: Record<string, Id>;
  team: Record<string, Id>;
};

/* ----------------------------------------------------------------------------
   Media (generated placeholders). key → { label, w, h, palette, alt }
   ---------------------------------------------------------------------------- */
export type MediaSpec = {
  kind: "photo" | "art";
  seed: string;
  w: number;
  h: number;
  palette: "teal" | "coral" | "sun" | "ink" | "paper";
  alt: string;
};
const photo = (
  seed: string,
  w: number,
  h: number,
  alt: string,
  palette: MediaSpec["palette"] = "paper",
): MediaSpec => ({ kind: "photo", seed, w, h, palette, alt });
const art = (
  seed: string,
  w: number,
  h: number,
  alt: string,
  palette: MediaSpec["palette"],
): MediaSpec => ({ kind: "art", seed, w, h, palette, alt });

export const mediaSpecs: Record<string, MediaSpec> = {
  "hero-1": photo("upsure-hero-chip-1", 900, 600, "Designer sketching brand marks at a desk"),
  "hero-2": photo("upsure-hero-chip-2", 900, 600, "Team reviewing a campaign wall"),
  "hero-3": photo(
    "upsure-hero-feature",
    900,
    1125,
    "Founder presenting a brand strategy on a whiteboard",
  ),
  "hero-4": art("upsure-hero-art-1", 900, 1100, "Abstract teal artwork", "teal"),
  "hero-5": photo("upsure-hero-chip-5", 900, 700, "Close-up of printed brand collateral"),
  "hero-6": art("upsure-hero-art-2", 800, 800, "Abstract sun-coloured artwork", "sun"),
  "team-table": photo("upsure-team-table", 1600, 1100, "Upsure team collaborating at a table"),
  "team-couch": photo(
    "upsure-team-couch",
    1200,
    1500,
    "Upsure team member taking notes on a couch",
  ),
  "team-review": photo("upsure-team-review", 1600, 1100, "Two Upsure designers reviewing work"),
  "team-present": photo("upsure-team-present", 1600, 1100, "Upsure team presenting work"),
  "studio-plant": photo(
    "upsure-studio-plant",
    1200,
    1500,
    "A team member standing in the studio next to a plant and a colourful artwork",
  ),
  "services-hero": photo(
    "upsure-services-hero",
    1600,
    1100,
    "Three team members in a strategy discussion around a table with a laptop and notes",
  ),
  "approach-illo": art(
    "upsure-approach",
    1200,
    1200,
    "Abstract artwork for the discovery phase",
    "sun",
  ),
  "studio-dog": photo(
    "upsure-studio-dog",
    1200,
    1500,
    "A small dog wearing a blue bandana sitting in front of a bookshelf",
  ),
  "about-1": photo("upsure-about-1", 900, 1200, "Upsure team member working at a laptop"),
  "about-2": photo("upsure-about-2", 900, 1200, "Upsure designer at a desk"),
  "about-3": photo("upsure-about-3", 900, 1200, "The Upsure studio"),
  "about-4": photo("upsure-about-4", 900, 1200, "Upsure team on a city walk"),
  "culture-hero": photo(
    "upsure-culture-hero",
    1600,
    1100,
    "Upsure team laughing together in the studio",
  ),
  "contact-hero": photo("upsure-contact-hero", 1600, 1100, "Hands waving hello"),
  "og-default": art("upsure-og", 1200, 630, "Upsure – We design brands people love", "teal"),
  "service-brand": art("upsure-service-brand", 1600, 1100, "Branding service artwork", "teal"),
  "service-design": art("upsure-service-design", 1600, 1100, "Design services artwork", "sun"),
  "service-growth": art("upsure-service-growth", 1600, 1100, "Growth services artwork", "coral"),
  "service-social": art(
    "upsure-service-social",
    1600,
    1100,
    "Social media services artwork",
    "ink",
  ),
  "service-ai": art("upsure-service-ai", 1600, 1100, "AI-first services artwork", "paper"),
  "service-consulting": art(
    "upsure-service-consulting",
    1600,
    1100,
    "Consulting and advisory artwork",
    "teal",
  ),
  "work-1": photo("upsure-work-lenskart", 1600, 1100, "Lenskart campaign visuals on a store wall"),
  "work-2": photo("upsure-work-hyundai", 1600, 1100, "Hyundai launch film still"),
  "work-3": photo("upsure-work-samsung", 1600, 1100, "Samsung content studio"),
  "work-4": photo("upsure-work-decathlon", 1600, 1100, "Decathlon landing page on a laptop"),
  "work-5": photo("upsure-work-vivo", 1600, 1100, "Vivo social campaign shoot"),
  "work-6": photo("upsure-work-titan", 1600, 1100, "Titan retail experience"),
  before: photo("upsure-before", 1600, 1000, "Website before the redesign"),
  after: photo("upsure-after", 1600, 1000, "Website after the redesign"),
  "post-1": photo("upsure-post-ai-growth", 1600, 1000, "Marketing dashboard on a screen"),
  "post-2": photo("upsure-post-busywork", 1600, 1000, "Desk with laptop and notes"),
  "post-3": photo("upsure-post-answers", 1600, 1000, "Person messaging on a phone"),
  "post-4": photo("upsure-post-love", 1600, 1000, "Hands holding a printed brand book"),
  "post-5": photo("upsure-post-inside", 1600, 1000, "The Upsure studio floor"),
  "post-6": photo("upsure-post-strategy", 1600, 1000, "Strategy map drawn on a whiteboard"),
  "post-7": photo("upsure-post-content", 1600, 1000, "Editorial team planning content"),
  "post-8": photo("upsure-post-positioning", 1600, 1000, "Compass on a map"),
  "avatar-akash": photo("upsure-avatar-akash", 400, 400, "Akash"),
  "person-1": photo("upsure-person-vrinda", 900, 1100, "Vrinda"),
  "person-2": photo("upsure-person-aarav", 900, 1100, "Aarav"),
  "person-3": photo("upsure-person-kabir", 900, 1100, "Kabir"),
  "person-4": photo("upsure-person-riddhi", 900, 1100, "Riddhi"),
  "person-5": photo("upsure-person-jagat", 900, 1100, "Jagat"),
  "person-6": photo("upsure-person-priya", 900, 1100, "Priya"),
};

/* ----------------------------------------------------------------------------
   Clients (real names from the live logo wall; logos are placeholder wordmarks)
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
    placeholder: true,
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
    placeholder: true,
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
    placeholder: true,
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
    placeholder: true,
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
    placeholder: true,
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
    placeholder: true,
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
    answer:
      "Fill in the contact form or email us at upsureai@gmail.com. We'll schedule a free 30-minute discovery call to learn about your goals, then come back with a scoped proposal.",
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
   Testimonials (1 real + 5 placeholder)
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
    placeholder: false,
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
    placeholder: true,
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
    placeholder: true,
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
    placeholder: true,
  },
  {
    key: "t5",
    quote:
      "Content that used to take us a month now ships every week, and it's better. The team feels like an extension of ours.",
    name: "Rohan Iyer",
    role: "Brand Manager",
    company: "Lifestyle brand",
    featured: true,
    order: 5,
    service: "social-media",
    placeholder: true,
  },
  {
    key: "t6",
    quote:
      "Senior people on every call, clear scope, no surprises on the invoice. Exactly what they promised.",
    name: "Meera Shah",
    role: "CEO",
    company: "B2B SaaS",
    featured: true,
    order: 6,
    service: "consulting",
    placeholder: true,
  },
];

/* ----------------------------------------------------------------------------
   Team (names from the live hero ticker; roles/bios placeholder)
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
  { key: "jagat", name: "Jagat", role: "AI & Automation Lead", photo: "person-5", order: 5 },
  { key: "priya", name: "Priya", role: "Content & Community Lead", photo: "person-6", order: 6 },
].map((m) => ({
  ...m,
  bio: `${m.name} is part of the senior team at Upsure. Ten years across brand and growth work for D2C challengers and enterprise teams, with a soft spot for launches that make a category look different overnight.`,
  placeholder: true,
}));

/* ----------------------------------------------------------------------------
   Blog
   ---------------------------------------------------------------------------- */
export const categories = [
  { slug: "ai", title: "AI" },
  { slug: "brand", title: "Brand" },
  { slug: "agency", title: "Agency" },
  { slug: "content", title: "Content" },
  { slug: "strategy", title: "Strategy" },
  { slug: "growth", title: "Growth" },
];

const p = (s: string) => s.trim();

export const posts = [
  {
    slug: "ai-in-the-growth-engine-2026",
    title: "AI in the growth engine: what's actually working in 2026",
    category: "ai",
    tags: ["AI", "Growth", "Marketing", "Performance"],
    publishedAt: "2026-06-24",
    cover: "post-1",
    excerpt:
      "Past the hype and the LinkedIn hot takes, a quiet truth: AI has made some marketing tasks 10x faster and left others completely untouched. A field report from inside the campaigns.",
    placeholder: false,
    content: p(`
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

AI didn't change what good marketing is. It changed how much of your week you get to spend doing it.

If your growth engine still runs entirely on manual effort — or you've bolted on AI tools nobody actually uses — we build these systems end to end: strategy, creative, performance, and the intelligent plumbing underneath. Let's talk.
`),
  },
  {
    slug: "custom-ai-workflows-busywork-audit",
    title: "The busywork audit: how custom AI workflows give teams their week back",
    category: "ai",
    tags: ["AI", "Automation", "Insights"],
    publishedAt: "2026-05-27",
    cover: "post-2",
    excerpt:
      "Every business runs on invisible, repetitive screen-work nobody signed up for. We find it, automate it, and hand the hours back. Here's our playbook — including where automation is a terrible idea.",
    placeholder: true,
    content: p(`
Ask any team what they actually do all day and the honest answer is rarely "strategy". It is copying figures between tools, reformatting the same report, chasing approvals, renaming files, and answering the same eleven questions in slightly different words. None of it is in anyone's job description. All of it is on the clock.

## Step one: find the busywork

We start with a week-long audit. Not a workshop — a shadowing exercise. Each person keeps a simple log of every task that feels repetitive, and we watch the screen-recordings for the tasks people forgot to log because they no longer notice them. The output is a ranked list: how often the task happens, how long it takes, how much judgement it needs, and what breaks when it goes wrong.

## Step two: sort by judgement, not by effort

The tempting move is to automate the most time-consuming task first. The right move is to automate the tasks that need the least judgement. A two-minute task done forty times a day with zero decisions is a perfect candidate. A four-hour task that needs taste, context and a difficult phone call is not — even if it looks expensive on the spreadsheet.

## Step three: build small, boring workflows

Our best automations are unglamorous: a pipeline that turns call transcripts into CRM notes, a checker that flags brand-guideline violations in creative before review, a weekly digest that writes itself from five dashboards. Each one saves a few hours. Together they give a team its week back.

## Where automation is a terrible idea

Anything customer-facing without a human in the loop. Anything where the cost of a confident wrong answer is high. Anything the team does not understand well enough to explain in a paragraph. If you cannot describe the rule, you cannot automate it — you can only hide it.

## What it looks like after

Fewer tabs. Shorter Mondays. People spending their hours on the work that needed them in the first place. That is the whole point.
`),
  },
  {
    slug: "customers-want-answers-not-chatbots",
    title: "Your customers don't want a chatbot. They want answers.",
    category: "ai",
    tags: ["AI", "CX", "Insights"],
    publishedAt: "2026-04-22",
    cover: "post-3",
    excerpt:
      "Everyone's had a rage-inducing chatbot experience. It doesn't have to be that way. How we design AI assistants that resolve queries, sound like your brand, and know when to hand over to a human.",
    placeholder: true,
    content: p(`
Nobody wakes up hoping to talk to a chatbot. They wake up with a question — where is my order, does this come in a smaller size, can I change my booking — and they want it answered quickly, correctly, and without being made to feel like a ticket number.

## Start from the questions, not the technology

Before we write a line of prompt, we pull the last six months of support conversations and cluster them. Typically fewer than thirty question types cover more than eighty percent of volume. Those thirty get grounded answers from real sources: the order system, the product catalogue, the returns policy as it is actually written.

## Sound like the brand, not like a model

Tone is a design decision. We write the assistant's voice the same way we write a brand's voice: short guidelines, real examples, and a list of things it must never say. Then we test it against the awkward cases — the angry customer, the ambiguous question, the request it cannot fulfil.

## Know when to stop

The most important feature of a good assistant is a graceful handover. When confidence drops, when the customer asks for a person, or when the topic is sensitive, the conversation moves to a human with the full context attached. No repeating yourself. No "let me transfer you".

## Measure resolution, not deflection

Deflection rate rewards assistants that make people give up. We measure whether the question was actually answered, how long it took, and whether the customer came back for the same thing. Those numbers tell you if the assistant is helping or hiding.

Done well, an assistant is not a wall between customers and your team. It is the fastest, friendliest member of that team.
`),
  },
  {
    slug: "we-design-brands-people-love",
    title: '"We design brands people love" — here\'s what that actually means',
    category: "brand",
    tags: ["Brand", "Philosophy", "Insights"],
    publishedAt: "2026-03-18",
    cover: "post-4",
    excerpt:
      "Love is a strong word for a company. We use it anyway — because 'brands people tolerate' doesn't compound. A look at the philosophy behind everything we ship.",
    placeholder: true,
    content: p(`
"Love" is a big claim for a line of shampoo, an insurance policy, or a B2B software tool. We use the word on purpose. The alternative — brands people tolerate, brands people barely notice — is the default, and the default does not compound.

## Tolerated brands rent attention. Loved brands own it.

A tolerated brand has to buy every interaction. A loved brand gets recommended, remembered and forgiven. That difference shows up in every growth metric we track: lower acquisition costs, higher retention, better response to every campaign. Love is not a soft metric. It is the hard metric underneath the others.

## Love is built from small, consistent decisions

It is rarely one big campaign. It is the packaging that opens the right way, the email that says something true, the support reply that sounds like a person. Brand strategy sets the intent; the craft in a thousand touchpoints delivers it. We work on both because neither works alone.

## It starts with honesty

You cannot design your way into being loved for something you are not. The brands we build begin with a clear, honest answer to "why should anyone care?" — and the nerve to make that answer visible when the category would rather blend in.

## What this means for how we work

We turn down work where the product cannot keep the promise. We push back on positioning that flatters instead of clarifies. And we measure our work by whether customers come back — because that, in the end, is what love looks like on a dashboard.
`),
  },
  {
    slug: "inside-upsure",
    title: "Inside Upsure: what we actually do all day",
    category: "agency",
    tags: ["Agency", "Culture", "Insights"],
    publishedAt: "2026-02-12",
    cover: "post-5",
    excerpt:
      "Strategy decks that gather dust. Rebrands that change nothing. We built Upsure to be the opposite of that. Here's an honest tour of what we do — and what we refuse to do.",
    placeholder: true,
    content: p(`
Most agency websites describe a process. Few describe a day. Here is an honest one.

## Mornings are for making

Nobody books meetings before eleven. Strategists write, designers design, growth leads look at yesterday's numbers before anyone tells them what the numbers mean. Protected making time is the single biggest reason our work ships on schedule.

## Every project has one senior owner

Not an account manager relaying messages — a senior practitioner who did the thinking, presents the work and takes the call when something breaks. Clients know exactly who is responsible. So do we.

## We show work early and ugly

A rough concept on day five beats a polished deck on day thirty. Early feedback is cheap; late feedback is a rebuild. We would rather be corrected in a sketch than admired in a PDF nobody uses.

## What we refuse to do

We do not sell hours. We do not staff juniors on the strategy and bill for seniors. We do not run months of "discovery" to delay the moment we have to be right. We do not bolt AI on as a badge — we use it where it makes the work faster and better, and say so plainly when it does not.

## Evenings are short

Good work comes from rested people. We plan capacity honestly, say no when we are full, and go home. That is not a perk. It is how the quality stays high.
`),
  },
  {
    slug: "why-brand-strategy-comes-before-design",
    title: "Why brand strategy must come before design",
    category: "brand",
    tags: ["Brand", "Strategy", "Insights"],
    publishedAt: "2026-01-20",
    cover: "post-6",
    excerpt:
      "A beautiful identity built on a fuzzy strategy is an expensive way to stay confused. Why we always answer the hard questions before we open the design tools.",
    placeholder: true,
    content: p(`
Every few months a founder asks for "just a logo". We understand the instinct — a logo is tangible, quick, and feels like progress. But a logo is the answer to a question, and if the question has not been asked, the answer is decoration.

## Strategy is a set of decisions

Who is this for, and who is it not for? What do we stand for that a competitor would not say? What should someone feel in the first three seconds, and what should they believe after three months? These are business decisions, and they are the brief for every visual choice that follows.

## Design without strategy is expensive to fix

You can tell when strategy was skipped: the identity looks like the category, the messaging changes with every campaign, and the team argues about taste because there is no shared intent to argue from. Fixing it means starting again — this time with the questions.

## Strategy without design is invisible

The reverse is also true. A sharp positioning document that never becomes a system people can use is a deck that gathers dust. Strategy has to be made visible, and that is where design earns its keep.

## The order we work in

Four to six weeks of strategy: audit, interviews, positioning, narrative, architecture. Then identity, with the strategy in the room for every review. It is slower for the first month and faster for every year after.
`),
  },
  {
    slug: "content-engines-that-compound",
    title: "Content engines that actually compound over time",
    category: "content",
    tags: ["Content", "SEO", "Insights"],
    publishedAt: "2025-12-10",
    cover: "post-7",
    excerpt:
      "Most content programmes are treadmills: publish, spike, forget. Here is how we build engines where every piece makes the next one more valuable.",
    placeholder: true,
    content: p(`
A treadmill content programme looks busy and goes nowhere. Each post gets a small spike, then disappears. The team is exhausted and the graph is flat. An engine is different: pieces link, rank, get reused, and keep bringing people in long after they were published.

## Build around questions people keep asking

We start with the questions customers ask in sales calls, support tickets and search. Those questions do not expire, and content that answers them properly keeps working for years.

## Design pieces to be reused

One deep guide becomes a newsletter, a short video, five social posts and a sales enablement one-pager. Reuse is not laziness; it is the mechanism by which one week of work compounds into a quarter of distribution.

## Connect everything

Internal links, topic clusters, consistent naming. Search engines and readers both reward structure. A new post that plugs into an existing cluster ranks faster than a brilliant orphan.

## Measure the curve, not the spike

Launch-day traffic is vanity. The number that matters is how much a piece is still delivering three, six and twelve months later — and whether the total keeps rising as the library grows.

Content engines are slower to start and impossible to stop. That is the trade we recommend making.
`),
  },
  {
    slug: "hidden-cost-of-bad-positioning",
    title: "The hidden cost of bad positioning",
    category: "strategy",
    tags: ["Strategy", "Positioning", "Insights"],
    publishedAt: "2025-11-05",
    cover: "post-8",
    excerpt:
      "Weak positioning does not show up as a line item. It shows up everywhere else — in ad costs, sales cycles, churn and hiring. How to spot it and what it is costing you.",
    placeholder: true,
    content: p(`
Bad positioning never appears on the P&L. There is no line called "nobody understands what we do". Instead the cost is spread across every other number until it looks like the normal cost of doing business.

## It shows up in acquisition

When the promise is fuzzy, ads have to work harder. Click-through rates fall, cost per lead rises, and the team compensates with more budget and louder creative. Sharper positioning is the cheapest performance lever most companies never pull.

## It shows up in the sales cycle

Prospects who cannot place you in a category take longer to decide and compare you to the wrong alternatives. Every extra call is positioning work being done manually, one deal at a time.

## It shows up in churn

Customers who bought for the wrong reasons leave. If the promise attracted the wrong people, retention will not fix it. Positioning is a filter as much as a magnet.

## It shows up in hiring

Candidates join a story. When the story is vague, the best people choose a clearer one somewhere else.

## Spotting it

Ask five people in the company what you do and for whom. If you get five answers, you have found the cost. Fixing it is a few weeks of hard decisions — considerably cheaper than another year of paying for it everywhere else.
`),
  },
];

/* ----------------------------------------------------------------------------
   Case studies (all placeholder; names from the logo wall)
   ---------------------------------------------------------------------------- */
export const caseStudies = [
  {
    slug: "lenskart",
    client: "Lenskart",
    industry: "Eyewear retail",
    services: ["branding", "design", "growth"],
    cover: "work-1",
    featured: true,
    stats: [
      ["3.2×", "Return on ad spend"],
      ["48%", "Lower cost per order"],
      ["1.9M", "Campaign reach"],
    ],
  },
  {
    slug: "hyundai",
    client: "Hyundai",
    industry: "Automotive",
    services: ["social-media", "design"],
    cover: "work-2",
    featured: true,
    stats: [
      ["120%", "Engagement uplift"],
      ["38k", "New followers in 90 days"],
      ["6", "Launch films produced"],
    ],
  },
  {
    slug: "samsung",
    client: "Samsung",
    industry: "Consumer electronics",
    services: ["design", "social-media", "ai-automation"],
    cover: "work-3",
    featured: true,
    stats: [
      ["10×", "Creative variants per week"],
      ["-60%", "Time to publish"],
      ["4.7", "Avg. content rating"],
    ],
  },
  {
    slug: "decathlon",
    client: "Decathlon",
    industry: "Sports retail",
    services: ["growth", "design"],
    cover: "work-4",
    featured: true,
    stats: [
      ["210%", "Organic traffic growth"],
      ["2.4×", "Landing-page conversion"],
      ["#1", "For 14 category keywords"],
    ],
  },
  {
    slug: "vivo",
    client: "Vivo",
    industry: "Smartphones",
    services: ["branding", "social-media"],
    cover: "work-5",
    featured: false,
    stats: [
      ["3", "Markets launched"],
      ["92%", "Positive sentiment"],
      ["25M", "Video views"],
    ],
  },
  {
    slug: "titan",
    client: "Titan",
    industry: "Watches & lifestyle",
    services: ["ai-automation", "growth", "consulting"],
    cover: "work-6",
    featured: false,
    stats: [
      ["2×", "Email revenue"],
      ["-35%", "Support handling time"],
      ["14", "Automations shipped"],
    ],
  },
].map((c, i) => ({
  ...c,
  title: c.client,
  publishedAt: new Date(2026, 6 - i, 10).toISOString(),
  summary: `How ${c.client} turned a strong product into a brand people seek out — brand, content and growth working as one system.`,
  intro: `${c.client} came to Upsure at an inflection point: a strong product, an audience that had outgrown the brand, and growth targets the existing marketing engine could not reach. We were asked to rethink how the brand showed up everywhere, and to build the machine underneath it.`,
  objective: `The brief was clear: [[modernise the brand]], make every channel pull in the same direction, and build a [[growth system that compounds]] rather than a series of one-off campaigns.`,
  sections: [
    {
      eyebrow: "Strategy",
      heading: "Starting with the hard questions",
      body: "We began with stakeholder interviews, a brand audit and audience research across the category, then sharpened positioning and messaging so every later decision had a reference point. Two audiences were dropped on purpose; the remaining one got everything.",
    },
    {
      eyebrow: "Craft",
      heading: "A system built to ship",
      body: "Identity, content templates and landing pages were designed as one system, so the in-house team could produce at pace without drifting off-brand. Every asset had a rule and every rule had an example.",
    },
    {
      eyebrow: "Growth",
      heading: "Measured every week, improved every month",
      body: "Paid, organic and lifecycle ran from one dashboard with shared targets. Winners were scaled, losers were cut within the week, and the learning compounded into the next quarter's plan.",
    },
  ],
  timeline: [
    { when: "Week 0", what: "Kick-off, audit and research" },
    { when: "Week 6", what: "Positioning and identity signed off" },
    { when: "Week 12", what: "Site and campaigns live" },
    { when: "+90 days", what: "Headline results above" },
  ],
  placeholder: true,
}));

/* ----------------------------------------------------------------------------
   Forms (Form Builder plugin)
   ---------------------------------------------------------------------------- */
export const forms = {
  contact: {
    title: "Contact",
    submitButtonLabel: "Send message",
    confirmationType: "message",
    confirmationMessage: richText("Thanks — we'll get back to you within one business day."),
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
    confirmationMessage: richText(
      "Thanks — we'll be in touch to book your free 30-minute discovery call.",
    ),
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
    confirmationMessage: richText("Thanks — we'll call you back within one business day."),
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
    confirmationMessage: richText(
      "Brief received. We'll reply with next steps within one business day.",
    ),
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
  email: "upsureai@gmail.com",
  phone: "+91 98250 00000",
  phoneHref: "+919825000000",
  addressLine1: "3rd Floor, Iscon Emporio",
  addressLine2: "Satellite Road, Ahmedabad 380015",
  city: "Ahmedabad, India",
  hours: "Mon – Fri, 10:00 – 18:00 IST",
  socials: [{ platform: "Instagram", url: "https://www.instagram.com/upsure_media/" }],
  stats: [
    { value: 100, suffix: "+", label: "brands served" },
    { value: 250, suffix: "+", label: "Projects delivered across brand & growth" },
    { value: 98, suffix: "%", label: "Client retention, year over year" },
  ],
  badges: [{ text: "Est. 2019" }, { text: "Based in Ahmedabad" }],
  defaultTitle: "Upsure – Creative & growth agency in Ahmedabad",
  defaultDescription:
    "We design brands people love. Upsure is a creative agency rooted in strategy, craft, and AI-driven growth — helping ambitious brands cut through the noise.",
  legalName: "Upsure",
  registrationNumbers: "",
};

export const header = (ctx: Ctx) => ({
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
  ...(ctx && {}),
});

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
    placeholder: false,
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
      },
      {
        blockType: "logoTicker",
        heading: "Trusted by India's leading brands",
        statement: "We are the creative link between strategy, brand, and AI-driven growth.",
        cta: { label: "Our expertise", href: "/services", newTab: false },
        tone: "paper",
      },
      {
        blockType: "statement",
        eyebrow: "About us",
        text: "We're a [[tight-knit team]] of strategists, designers, and growth experts, [[obsessed with doing excellent work]] for the brands we partner with. From Ahmedabad, for ambitious brands [[everywhere]].",
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
    placeholder: false,
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
    placeholder: true,
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
    placeholder: false,
    layout: [
      {
        blockType: "hero",
        variant: "editorial",
        eyebrow: "About",
        heading: "About [[Upsure]]",
        lead: "We're a creative agency shaped by the [[brands we build for]], and the [[people we build with]]. We design brands people love.",
        stickers: [
          { text: "Proudly from Ahmedabad", tone: "sun" },
          { text: "Est. 2019", tone: "teal" },
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
        eyebrow: "Results",
        heading: "We let our results do the talking",
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
    placeholder: true,
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
              href: "mailto:upsureai@gmail.com?subject=Joining%20Upsure",
              newTab: false,
            },
          },
          {
            heading: "Collaborate with us",
            body: "We're always expanding our network of collaborators for projects that need more than one team. If you share our values and way of working, we'd love to hear from you.",
            link: {
              label: "Become a collaborator",
              href: "mailto:upsureai@gmail.com?subject=Collaboration",
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
    placeholder: true,
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
    placeholder: false,
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
    placeholder: false,
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
        intro:
          "Fill in the form and we'll get back to you within one business day. Prefer email? Reach us at upsureai@gmail.com.",
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
              href: "mailto:upsureai@gmail.com?subject=Joining%20Upsure",
              newTab: false,
            },
          },
          {
            heading: "Collaborate with us",
            body: "We're always expanding our network of collaborators for projects that need more than one team. If you share our values and way of working, we'd love to hear from you.",
            link: {
              label: "Become a collaborator",
              href: "mailto:upsureai@gmail.com?subject=Collaboration",
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
    placeholder: false,
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
    placeholder: false,
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
        content: richText(`
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

Questions about these terms? Email us at upsureai@gmail.com and we'll get back to you within one business day.
`),
        tone: "paper",
      },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy Policy",
    placeholder: false,
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
        content: richText(`
## 1. What we collect

When you contact us through the form on this site, we collect the details you provide: your name, email address, company name, and message. We don't require an account, and we don't ask for anything we don't need to reply to you.

## 2. How we use it

We use your contact details solely to respond to your enquiry and, where a conversation continues, to manage our working relationship. If you subscribe to our newsletter, we use your email to send it — nothing else. We never sell or rent your information.

## 3. Form processing

Contact form submissions are stored securely in our website's content system and emailed to our inbox. Your submission is used only for delivery of your message to us.

## 4. Analytics and cookies

This site may use privacy-respecting analytics to understand aggregate visitor behaviour (pages visited, approximate region). We don't use advertising trackers, and we don't build individual visitor profiles.

## 5. Data retention

We keep enquiry emails for as long as needed to serve the conversation and our legitimate business records. You can ask us to delete your correspondence at any time.

## 6. Your rights

You can request access to, correction of, or deletion of the personal information we hold about you. Email us and we'll action it promptly.

## 7. Contact

For any privacy question or request, email upsureai@gmail.com. We reply within one business day.
`),
        tone: "paper",
      },
    ],
  },
];
