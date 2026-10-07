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
   Images: key → alt text. Generated studio artwork (scripts/art) in
   public/images/demo/<key>-<hash>.webp; see media-manifest.json
   ---------------------------------------------------------------------------- */
export const media: Record<string, string> = {
  "hero-1": "Phone filming a product reel in front of a ring light",
  "hero-2": "Shipping box, product jar and a quick commerce app showing 10-minute delivery",
  "hero-3": "Desktop monitor with a growth dashboard and a rising chart",
  "svc-brand-consulting":
    "Strategy board with sticky notes for where to play and how to win, beside a notebook",
  "svc-branding": "Brand packaging, colour swatches and business cards on a studio desk",
  "svc-personal-branding":
    "Laptop showing a founder's post, with a camera on a tripod for video content",
  "svc-pr": "Newspapers, a magazine cover and a podcast microphone for PR and media",
  "svc-social": "Phone filming a product reel in front of a ring light, for social media",
  "svc-influencer": "Creator phone with a collab reel next to an unboxed product gift box",
  "svc-performance": "Ads dashboard on a monitor with a cost-per-lead chart card",
  "svc-ecommerce":
    "Shipping boxes, D2C products and a quick commerce app for e-commerce and quick commerce",
  "svc-seo": "Laptop with search results and an AI overview, beside a magnifying glass",
  "svc-ai": "Laptop with an AI chat assistant and an automation flow from order to reply",
  "work-1": "Eyeglasses on a desk with an eyewear campaign reel and poster",
  "work-2": "Toy car with a car campaign poster and social post",
  "work-3": "Phone, earbuds and smartwatch with campaign creative on a monitor",
  "work-4": "Running shoe, football and a sports store listing on a phone",
  before: "Website before the redesign: a cluttered grey layout on a desktop monitor",
  after: "Website after the redesign: a clear headline and products on a desktop monitor",
  "post-qc": "Quick commerce delivery bag, D2C products and a 10-minute delivery app",
  "post-geo": "Phone with an AI answer recommending a brand, with its sources",
  "post-1": "Laptop with an AI assistant drafting a growth plan",
  "post-6": "Strategy board and a notebook sketch of why, how and what before design",
  "post-7": "Content calendar on the wall with a camera and a phone reel",
  "services-hero":
    "Studio desk with packaging, swatches, a dashboard, a reel and a microphone: Upsure Media's services",
  "approach-illo": "Discovery board on customers, competitors and channels with a magnifying glass",
  "one-team": "One 90-day plan across brand, content, media, PR and AI, with four team mugs",
  "faq-chat": "Phone with questions and answers about working with Upsure Media",
  "ind-d2c": "D2C product range on display with a shipping box and an online store on a phone",
  "ind-b2b": "Laptop with a B2B company post, a printed brochure and machined gears",
  "about-1": "Workshop board on audience, offer, channels and next steps",
  "about-2": "Product photo shoot set with softbox lights and a camera",
  "about-3": "Creative review of designs on a monitor and printed proofs on the wall",
  "team-table": "Content calendar planning on the wall above a notebook and phone",
  "team-couch": "Studio lounge with a sofa, artwork and a laptop report",
  "team-review": "Video editing desk with a timeline on the monitor and headphones",
  "team-present": "Report presentation on a wall screen above a studio sofa",
  "culture-hero": "Studio corner with Stay curious and Be useful posters, bookshelves and a sofa",
  "og-default": "Upsure Media – D2C & B2B Brand and Growth Agency in Ahmedabad",
  "person-1": "Vrinda, Strategy at Upsure Media",
  "person-2": "Aarav, Creative at Upsure Media",
  "person-3": "Kabir, Performance at Upsure Media",
  "person-4": "Riddhi, Social at Upsure Media",
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
   Services: the ten services from the copy update (docs, section 1 and 5), in
   menu order. `group` is the dropdown label; `subServices` are the card
   bullets; `checklist` is the "What we do" service list on the service page.
   ---------------------------------------------------------------------------- */
export const SERVICE_GROUPS = ["Build the brand", "Grow demand", "Sell and scale"] as const;

export const services = [
  {
    slug: "brand-consulting",
    title: "Brand Consulting",
    group: "Build the brand",
    icon: "consulting",
    order: 1,
    tags: ["Strategy", "Go-to-market", "Fractional CMO"],
    blurb: "Senior advice for founders and CMOs on where to play, how to win and what to do next.",
    subServices: [
      "Brand & business audits",
      "Go-to-market strategy",
      "Quarterly growth planning",
      "Fractional CMO",
      "End-to-end growth partnership",
    ],
    cardImage: "svc-brand-consulting",
    heroImage: "svc-brand-consulting",
    eyebrow: "Brand consulting",
    heading: "Brand consulting for founders who want to [[grow faster]]",
    lead: "Senior advice on positioning, go-to-market and growth for D2C and B2B brands. Use us as a fractional CMO, or as the team that plans and runs your growth end to end.",
    checklistHeading: "Clear thinking, then action",
    checklistIntro:
      "Most brands don't have a marketing problem. They have a clarity problem: who they sell to, why people should choose them, and which channel to bet on next. We answer those questions with you, then help you execute.",
    checklist: [
      "Brand & business audits",
      "Positioning & go-to-market strategy",
      "Channel and pricing strategy",
      "Quarterly growth planning",
      "Fractional CMO",
      "Team and agency setup",
      "End-to-end growth partnership",
    ],
    whoFor: {
      d2c: "Founders between launch and ₹100 crore who need a plan across website, marketplaces and quick commerce.",
      b2b: "Companies entering new markets, rebranding, or building a marketing team for the first time.",
    },
    meta: {
      title: "Brand Consulting Agency in Ahmedabad for D2C & B2B | Upsure Media",
      description:
        "Senior brand consulting in Ahmedabad: positioning, go-to-market and growth planning for D2C and B2B brands, as a fractional CMO or an end-to-end growth team.",
    },
  },
  {
    slug: "branding",
    title: "Branding & Design",
    group: "Build the brand",
    icon: "brand",
    order: 2,
    tags: ["Identity", "Packaging", "Creative"],
    blurb:
      "Brand identities and creative that look premium and sell on every shelf, screen and app.",
    subServices: [
      "Positioning & naming",
      "Logo & visual identity",
      "Packaging design",
      "Brand guidelines",
      "Campaign & ad creatives",
    ],
    cardImage: "svc-branding",
    heroImage: "svc-branding",
    eyebrow: "Branding & design",
    heading: "Branding and design that [[sells]]",
    lead: "Brand strategy, naming, logo, packaging and campaign creative for D2C and B2B brands. Built to stand out on a shelf, a marketplace listing and a 3-second scroll.",
    checklistHeading: "A brand people remember and choose",
    checklistIntro:
      "A D2C brand gets about one second on a Blinkit grid or an Amazon search page. A B2B brand gets one look at a deck before the buyer decides whether to call. We design for those moments, and hand your team a brand system they can use every day.",
    checklist: [
      "Brand strategy & positioning",
      "Naming & tagline",
      "Logo & visual identity",
      "Packaging design",
      "Brand guidelines",
      "Marketplace & listing creatives",
      "Campaign & ad creatives",
      "Pitch decks & brochures",
      "Motion & video",
    ],
    whoFor: {
      d2c: "New launches, rebrands, new product lines and packaging refreshes.",
      b2b: "Companies that have outgrown their logo and deck, and need to look as big as they are.",
    },
    meta: {
      title: "Branding & Packaging Design Agency in Ahmedabad | Upsure Media",
      description:
        "Brand strategy, naming, logo, packaging and campaign creative for D2C and B2B brands, designed in Ahmedabad to stand out on shelves, marketplaces and feeds.",
    },
  },
  {
    slug: "personal-branding",
    title: "Personal Branding",
    group: "Build the brand",
    icon: "personal",
    order: 3,
    tags: ["Founders", "LinkedIn", "Video"],
    blurb:
      "Turn founders and leaders into trusted voices their customers, investors and hires follow.",
    subServices: [
      "LinkedIn & Instagram strategy",
      "Founder content & ghostwriting",
      "Video & podcast production",
      "Speaking & media opportunities",
    ],
    cardImage: "svc-personal-branding",
    heroImage: "svc-personal-branding",
    eyebrow: "Personal branding",
    heading: "Personal branding for [[founders and leaders]]",
    lead: "We turn founders, CEOs and experts into voices people trust and follow, on LinkedIn, Instagram, YouTube and podcasts.",
    checklistHeading: "People buy from people",
    checklistIntro:
      "Customers, investors and future hires look up the founder before the company. We plan what they say, produce it in-house and publish it consistently, without it taking over their week.",
    checklist: [
      "Personal brand strategy",
      "LinkedIn and Instagram content",
      "Ghostwriting",
      "Video and podcast production",
      "Podcast guest placements",
      "Speaking and award opportunities",
      "Profile and photo shoots",
    ],
    whoFor: {
      d2c: "Founders who want to be the face of their brand, the way customers follow the person behind the product.",
      b2b: "CEOs, consultants, doctors, lawyers and other experts who win business through trust and visibility.",
    },
    meta: {
      title: "Personal Branding Agency for Founders & CEOs in India | Upsure Media",
      description:
        "Personal branding for founders, CEOs and experts: LinkedIn and Instagram content, ghostwriting, video and podcasts, produced in-house in Ahmedabad.",
    },
  },
  {
    slug: "pr",
    title: "PR & Media",
    group: "Build the brand",
    icon: "pr",
    order: 4,
    tags: ["Press", "Media relations", "Launch PR"],
    blurb: "Earned coverage that builds credibility with customers, partners and investors.",
    subServices: [
      "Press releases",
      "Media relations",
      "Founder features & interviews",
      "Launch PR",
      "Reputation management",
    ],
    cardImage: "svc-pr",
    heroImage: "svc-pr",
    eyebrow: "PR & media",
    heading: "PR that builds [[trust]]",
    lead: "Press coverage, founder features and launch PR for D2C and B2B brands, in national, regional and trade media.",
    checklistHeading: "Earned credibility, not paid noise",
    checklistIntro:
      "A mention in the right publication does what ads can't: it tells customers, investors and partners that someone independent believes in you. We find the story in your brand and place it where your audience reads. Coverage also helps your brand appear in Google and AI answers.",
    checklist: [
      "PR strategy",
      "Press releases",
      "Media relations",
      "Founder interviews and features",
      "Launch and funding announcements",
      "Regional and Gujarati media",
      "Awards and recognitions",
      "Crisis and reputation management",
    ],
    whoFor: {
      d2c: "Launches, funding rounds, new categories and founder stories.",
      b2b: "Thought leadership, trade media, partnerships and credibility with enterprise buyers.",
    },
    meta: {
      title: "PR Agency in Ahmedabad for Startups, D2C & B2B Brands | Upsure Media",
      description:
        "PR in Ahmedabad for startups, D2C and B2B brands: press releases, media relations, founder features and launch PR across national, regional and trade media.",
    },
  },
  {
    slug: "social-media",
    title: "Social Media Marketing",
    group: "Grow demand",
    icon: "social",
    order: 5,
    tags: ["Content", "Reels", "Community"],
    blurb: "Content people actually want to watch, and a community that turns into customers.",
    subServices: [
      "Content strategy",
      "Reels & short video",
      "Content calendars",
      "Community management",
      "Monthly reporting",
    ],
    cardImage: "svc-social",
    heroImage: "svc-social",
    eyebrow: "Social media marketing",
    heading: "Social media marketing that turns followers into [[customers]]",
    lead: "Strategy, reels, content calendars and community management for D2C and B2B brands on Instagram, YouTube, LinkedIn and Facebook.",
    checklistHeading: "Content people actually want",
    checklistIntro:
      "We plan content series around your products and customers, produce them in-house, and track what turns views into enquiries and sales.",
    checklist: [
      "Social media strategy",
      "Reels and short video",
      "Content calendars",
      "Static and carousel design",
      "Community management",
      "Shoots and production",
      "Monthly reporting",
    ],
    whoFor: {
      d2c: "Product launches, always-on content and UGC that feeds your ads.",
      b2b: "LinkedIn content, founder posts and content that builds trust with buyers.",
    },
    meta: {
      title: "Social Media Marketing Agency in Ahmedabad | Upsure Media",
      description:
        "Social media marketing in Ahmedabad: strategy, reels, content calendars and community management for D2C and B2B brands on Instagram, YouTube, LinkedIn and Facebook.",
    },
  },
  {
    slug: "influencer-marketing",
    title: "Influencer Marketing",
    group: "Grow demand",
    icon: "influencer",
    order: 6,
    tags: ["Creators", "UGC", "Hyperlocal"],
    blurb:
      "Creator campaigns that drive sales, from nano creators and hyperlocal pages to celebrities.",
    subServices: [
      "Creator discovery & vetting",
      "Campaign management",
      "UGC content",
      "Hyperlocal Gujarat creators",
      "Sales tracking",
    ],
    cardImage: "svc-influencer",
    heroImage: "svc-influencer",
    eyebrow: "Influencer marketing",
    heading: "Influencer marketing that drives [[sales]]",
    lead: "Creator campaigns for D2C and B2B brands, from nano creators and hyperlocal pages to celebrities.",
    checklistHeading: "The right creators, not just the biggest ones",
    checklistIntro:
      "Most influencer campaigns fail because the creator's audience was never going to buy. We pick creators by audience fit and past performance, brief them so the content feels native, and track every campaign to clicks, coupon codes and sales. For Gujarat launches, we work with city and district-level creators and pages across the state.",
    checklist: [
      "Influencer strategy",
      "Creator discovery and vetting",
      "Briefs, contracts and approvals",
      "Campaign management",
      "UGC creators",
      "Celebrity and macro collaborations",
      "Hyperlocal Gujarat creators and pages",
      "Tracking and reporting",
    ],
    whoFor: {
      d2c: "Product launches, quick commerce city launches, UGC for ads and seasonal sales.",
      b2b: "LinkedIn creators, industry experts and event promotion.",
    },
    meta: {
      title: "Influencer Marketing Agency in Ahmedabad & Gujarat | Upsure Media",
      description:
        "Influencer marketing in Ahmedabad and across Gujarat: creator discovery, UGC, celebrity and hyperlocal campaigns for D2C and B2B brands, tracked to sales.",
    },
  },
  {
    slug: "performance-marketing",
    title: "Performance Marketing",
    group: "Grow demand",
    icon: "growth",
    order: 7,
    tags: ["Meta & Google ads", "CRO", "Attribution"],
    blurb: "Paid media on Meta, Google and YouTube, run for ROAS and CAC, not likes.",
    subServices: [
      "Meta & Google ads",
      "Creative testing",
      "Landing pages & CRO",
      "Retargeting",
      "Attribution & reporting",
    ],
    cardImage: "svc-performance",
    heroImage: "svc-performance",
    eyebrow: "Performance marketing",
    heading: "Performance marketing for [[D2C and B2B brands]]",
    lead: "Meta, Google and YouTube ads managed for ROAS, CAC and qualified leads. Creative and media planned together, tested every week.",
    checklistHeading: "Outcomes, not hours",
    checklistIntro:
      "Ad accounts usually stall for one of two reasons: the creative is tired, or the tracking is wrong. We fix both. Our in-house team makes new ad creative every week, and we set up tracking so every rupee is tied to a sale or a lead.",
    checklist: [
      "Meta (Facebook & Instagram) ads",
      "Google Search, Shopping & Performance Max",
      "YouTube ads",
      "Ad creative production and testing",
      "Landing pages and CRO",
      "Retargeting, email and WhatsApp flows",
      "Tracking, attribution and dashboards",
    ],
    whoFor: {
      d2c: "Brands scaling website sales, improving ROAS and lowering CAC.",
      b2b: "Companies that need qualified leads and a lower cost per meeting, not just form fills.",
    },
    meta: {
      title: "Performance Marketing Agency in Ahmedabad for D2C & B2B | Upsure Media",
      description:
        "Performance marketing in Ahmedabad: Meta, Google and YouTube ads for D2C and B2B brands, managed for ROAS, CAC and qualified leads with weekly creative testing.",
    },
  },
  {
    slug: "ecommerce-quick-commerce",
    title: "E-commerce & Quick Commerce",
    group: "Sell and scale",
    icon: "commerce",
    order: 8,
    tags: ["Marketplaces", "Quick commerce", "Shopify"],
    blurb: "Grow sales on Amazon, Flipkart, Myntra, Nykaa, Blinkit, Zepto and Swiggy Instamart.",
    subServices: [
      "Marketplace onboarding & listings",
      "Marketplace ads",
      "Quick commerce launches",
      "D2C website & Shopify",
      "Ratings & reviews",
    ],
    cardImage: "svc-ecommerce",
    heroImage: "svc-ecommerce",
    eyebrow: "E-commerce & quick commerce",
    heading: "E-commerce and quick commerce growth for [[D2C brands]]",
    lead: "Launch and grow on Amazon, Flipkart, Myntra, Nykaa, Blinkit, Zepto, Swiggy Instamart and your own Shopify store, with one team managing listings, ads and operations.",
    checklistHeading: "Sell where your customers already shop",
    checklistIntro:
      "Indian shoppers now buy on marketplaces and order on quick commerce apps in minutes. Each platform has its own rules for listings, ads, pricing and stock. We set up your brand on the right platforms, make your listings convert, run platform ads, and report sales across all channels in one place.",
    checklist: [
      "Marketplace onboarding",
      "Listings, A+ content and storefronts",
      "Marketplace ads",
      "Quick commerce city launches",
      "Thumbnail creatives",
      "Shopify and D2C website builds",
      "Ratings and reviews",
      "Pricing, offers and availability tracking",
    ],
    whoFor: {
      d2c: "Food and beverage, beauty, personal care, home, health and fashion brands.",
      b2b: "Manufacturers and distributors launching their own consumer brand online.",
    },
    body: [
      {
        blockType: "textColumns",
        eyebrow: "Where we sell",
        columns: [
          {
            heading: "E-commerce",
            body: "Amazon, Flipkart, Myntra, Nykaa, Meesho and JioMart onboarding · Listings, A+ content and storefronts · Marketplace ads · Ratings and reviews · Shopify and D2C website builds · Inventory and order reports",
          },
          {
            heading: "Quick commerce",
            body: "Blinkit, Zepto, Swiggy Instamart, BigBasket BB Now and Flipkart Minutes onboarding · City-by-city launch plans · Listings and thumbnail creatives · Quick commerce ads · Pricing, offers and availability tracking",
          },
        ],
        tone: "paper",
      },
    ],
    meta: {
      title:
        "E-commerce & Quick Commerce Agency for D2C Brands | Blinkit, Zepto, Amazon | Upsure Media",
      description:
        "Launch and grow on Amazon, Flipkart, Myntra, Nykaa, Blinkit, Zepto, Swiggy Instamart and Shopify, with one team for listings, ads and operations.",
    },
  },
  {
    slug: "seo-aeo-geo",
    title: "SEO, AEO & GEO",
    group: "Grow demand",
    icon: "search",
    order: 9,
    tags: ["SEO", "Answer engines", "AI search"],
    blurb: "Get found on Google, in answer boxes and inside ChatGPT, Gemini and Perplexity.",
    subServices: [
      "Technical & local SEO",
      "Content that ranks",
      "Answer engine optimisation",
      "Generative engine optimisation",
      "AI visibility tracking",
    ],
    cardImage: "svc-seo",
    heroImage: "svc-seo",
    eyebrow: "SEO, AEO & GEO",
    heading: "SEO, AEO and GEO: get found on Google and in [[AI answers]]",
    lead: "Rank on Google, appear in answer boxes, and get recommended by ChatGPT, Gemini, Perplexity and Google AI Overviews.",
    checklistHeading: "Search has changed. Your strategy should too.",
    checklistIntro:
      "Your customers still search on Google, but more of them now ask AI tools for recommendations. SEO gets you ranked. AEO (answer engine optimisation) gets your answer shown directly. GEO (generative engine optimisation) gets your brand named inside AI answers. We do all three, and track where your brand appears.",
    checklist: [
      "Technical SEO audit",
      "Keyword and content strategy",
      "On-page SEO",
      "Local SEO and Google Business Profile",
      "Schema and structured data",
      "FAQ and answer content",
      "llms.txt and AI crawler setup",
      "Brand mentions and digital PR",
      "AI visibility tracking",
    ],
    /* Definitions written to be quoted by AI tools (section 5.9). */
    body: [
      {
        blockType: "featureList",
        eyebrow: "In one line each",
        heading: "SEO, AEO and GEO, defined",
        items: [
          {
            title: "SEO",
            body: "SEO is the work of ranking your website on Google and Bing for the searches your customers make.",
          },
          {
            title: "AEO",
            body: "AEO is answer engine optimisation: structuring content so search engines and voice assistants show it as the direct answer.",
          },
          {
            title: "GEO",
            body: "GEO is generative engine optimisation: making your brand visible and accurately described in AI tools such as ChatGPT, Gemini and Perplexity.",
          },
        ],
        tone: "paper",
      },
    ],
    whoFor: {
      d2c: "Product and category pages that rank, and brands that AI tools recommend.",
      b2b: "Service pages that bring qualified leads, and expert content that AI tools cite.",
    },
    meta: {
      title: "SEO, AEO & GEO Agency in Ahmedabad | Rank on Google & ChatGPT | Upsure Media",
      description:
        "SEO, AEO and GEO from Ahmedabad: rank on Google, appear in answer boxes and get recommended by ChatGPT, Gemini, Perplexity and Google AI Overviews.",
    },
  },
  {
    slug: "ai-solutions",
    title: "AI Solutions",
    group: "Sell and scale",
    icon: "ai",
    order: 10,
    tags: ["Chatbots", "Automation", "Workflows"],
    blurb:
      "Practical AI that saves your team hours and answers your customers in your brand's voice.",
    subServices: [
      "AI chatbots & agents",
      "Marketing automation",
      "AI content workflows",
      "AI audits & team training",
    ],
    cardImage: "svc-ai",
    heroImage: "svc-ai",
    eyebrow: "AI solutions",
    heading: "AI solutions that save time and grow [[sales]]",
    lead: "AI chatbots, WhatsApp assistants, marketing automation and AI content workflows for D2C and B2B brands, built around the tools you already use.",
    checklistHeading: "Practical, not hype",
    checklistIntro:
      "We start with an audit of where your team loses hours to repetitive work, then build the AI tools that give those hours back. Customer chatbots answer in your brand's voice and hand over to a person when needed. Content workflows help your team publish more without hiring more.",
    checklist: [
      "AI audit and roadmap",
      "Website and WhatsApp chatbots",
      "Custom AI agents",
      "Marketing and CRM automation",
      "AI content and creative workflows",
      "AI training for teams",
    ],
    whoFor: {
      d2c: "Customer support, order queries, product recommendations and content at scale.",
      b2b: "Lead qualification, sales follow-ups, proposal drafting and internal knowledge assistants.",
    },
    meta: {
      title: "AI Solutions for Marketing & Business | AI Chatbots & Automation | Upsure Media",
      description:
        "AI chatbots, WhatsApp assistants, marketing automation and AI content workflows for D2C and B2B brands, built around the tools you already use.",
    },
  },
];

/* ----------------------------------------------------------------------------
   FAQs. `scope` places a question on Home, Services or Contact; `service`
   places it on one service page. The first sentence of every answer is the
   direct answer, so search engines and AI tools can quote it.
   ---------------------------------------------------------------------------- */
const serviceFaqs: [string, string, string][] = [
  // [service slug, question, answer]
  [
    "brand-consulting",
    "What does a brand consultant do?",
    "A brand consultant helps you decide who your brand is for, what it stands for and how it should grow, then turns that into a plan your team can follow.",
  ],
  [
    "brand-consulting",
    "Do you also execute the plan?",
    "Yes. Upsure Media can run any part of the plan in-house, from branding and social to performance marketing and quick commerce.",
  ],
  [
    "brand-consulting",
    "How is consulting priced?",
    "As a fixed-fee audit and strategy project, or as a monthly fractional CMO retainer.",
  ],
  [
    "branding",
    "How long does a branding project take?",
    "A full brand identity takes 4–6 weeks. Packaging adds 2–4 weeks depending on the number of SKUs.",
  ],
  [
    "branding",
    "Do you design packaging for marketplaces and quick commerce?",
    "Yes. We test pack designs as thumbnails, because that is how most D2C shoppers first see them.",
  ],
  [
    "branding",
    "What do we get at the end?",
    "Logo files, colours, fonts, brand guidelines, templates and every design source file.",
  ],
  [
    "personal-branding",
    "How much time does the founder need to give?",
    "About 2 hours a month: one recording session, and a quick review of drafts.",
  ],
  [
    "personal-branding",
    "Which platforms do you cover?",
    "LinkedIn, Instagram, YouTube, X and podcasts. We pick 1–2 to start, based on where your audience is.",
  ],
  [
    "personal-branding",
    "Do you shoot the content?",
    "Yes. We have in-house video and podcast production in Ahmedabad.",
  ],
  [
    "pr",
    "Do you guarantee coverage?",
    "No honest PR agency can guarantee editorial coverage. We commit to a target list, a monthly pitching plan and transparent reporting.",
  ],
  [
    "pr",
    "Do you work with regional media?",
    "Yes, including Gujarati and Hindi publications and channels.",
  ],
  [
    "pr",
    "How does PR help SEO and AI search?",
    "Articles in trusted publications are cited by Google and by AI tools like ChatGPT, which improves how your brand appears in answers.",
  ],
  [
    "social-media",
    "Which platforms do you manage?",
    "Instagram, YouTube, LinkedIn, Facebook and X.",
  ],
  [
    "social-media",
    "How many posts do we get per month?",
    "It depends on the plan. Most D2C brands start with 12–20 posts and reels a month.",
  ],
  [
    "social-media",
    "Do you shoot the content?",
    "Yes. Production is in-house in Ahmedabad, including product shoots, reels and podcasts.",
  ],
  [
    "influencer-marketing",
    "How do you choose influencers?",
    "By audience location, age, engagement quality and past brand results, not follower count alone.",
  ],
  [
    "influencer-marketing",
    "Can you run campaigns in Gujarat only?",
    "Yes. We can target a single city, district or the whole state through local creators and pages.",
  ],
  [
    "influencer-marketing",
    "How do you measure results?",
    "With unique links, coupon codes and platform data, reported against reach, clicks and sales.",
  ],
  [
    "performance-marketing",
    "What ad budget do we need?",
    "Most D2C brands start from ₹1–2 lakh a month in ad spend.",
  ],
  [
    "performance-marketing",
    "How soon will we see results?",
    "Expect learnings in the first 2–3 weeks and stable performance by the end of month two.",
  ],
  [
    "performance-marketing",
    "Do you make the ad creatives?",
    "Yes. Creative is produced in-house, so testing is fast.",
  ],
  [
    "ecommerce-quick-commerce",
    "How do we get listed on Blinkit or Zepto?",
    "We prepare your catalogue, pricing and documents, apply through the platform's seller process, and plan the city launch.",
  ],
  [
    "ecommerce-quick-commerce",
    "Do you manage marketplace ads?",
    "Yes, including Amazon Ads, Flipkart Ads and quick commerce ad platforms.",
  ],
  [
    "ecommerce-quick-commerce",
    "Can you also build our D2C website?",
    "Yes. We build and manage Shopify stores connected to your marketplaces and ads.",
  ],
  [
    "seo-aeo-geo",
    "What is the difference between SEO, AEO and GEO?",
    "SEO ranks your pages, AEO gets your content shown as the direct answer, and GEO gets your brand mentioned inside AI-generated answers.",
  ],
  [
    "seo-aeo-geo",
    "How long does SEO take?",
    "Most sites see movement in 3–4 months and stronger results by 6–9 months.",
  ],
  [
    "seo-aeo-geo",
    "Can you track whether ChatGPT mentions our brand?",
    "Yes. We test a fixed set of prompts every month and report where and how your brand appears.",
  ],
  [
    "ai-solutions",
    "What do your AI services actually look like?",
    "Practical, not hype. We build AI into the work we already do: content workflows that ship faster, automation that removes manual busywork, custom agents and chatbots for your customers, and audits that show your team exactly where AI will pay off first.",
  ],
  [
    "ai-solutions",
    "Do we need technical staff to use these tools?",
    "No. We build, set up and train your team, and support the tools after launch.",
  ],
  [
    "ai-solutions",
    "Is our data safe?",
    "We use business-grade AI platforms and keep your data within the tools you approve.",
  ],
];

export const faqs = [
  /* Homepage (section 9.4) */
  {
    key: "what-we-do",
    question: "What does Upsure Media do?",
    answer:
      "Upsure Media is a full-service brand and growth agency in Ahmedabad. We help D2C and B2B brands with brand consulting, branding, personal branding, PR, social media, influencer marketing, performance marketing, e-commerce, quick commerce, SEO/AEO/GEO and AI solutions.",
    scope: ["home"],
    order: 1,
  },
  {
    key: "d2c-or-b2b",
    question: "Do you work with D2C brands or B2B companies?",
    answer:
      "Both. D2C is our core strength, from launch to marketplaces and quick commerce. We also work with B2B companies on branding, leadership visibility, PR, SEO and lead generation.",
    scope: ["home"],
    order: 2,
  },
  {
    key: "quick-commerce",
    question: "Can you help us sell on Blinkit, Zepto and Instamart?",
    answer:
      "Yes. We handle onboarding, listings, thumbnail creatives, platform ads and city launch plans for quick commerce apps, along with Amazon, Flipkart, Myntra and Nykaa.",
    scope: ["home"],
    order: 3,
  },
  {
    key: "aeo-geo",
    question: "What are AEO and GEO?",
    answer:
      "AEO (answer engine optimisation) gets your content shown as the direct answer in search. GEO (generative engine optimisation) gets your brand mentioned accurately in AI tools like ChatGPT, Gemini and Perplexity.",
    scope: ["home"],
    order: 4,
  },
  {
    key: "strategy-execution",
    question: "Do you only do strategy, or execution too?",
    answer:
      "Both. Strategy, content, production, media buying, influencer management and AI builds are done in-house by one team.",
    scope: ["home", "services"],
    order: 5,
  },
  {
    key: "cost",
    question: "How much does it cost to work with Upsure Media?",
    answer:
      "We offer fixed-price projects and monthly retainers. Every proposal is fixed and transparent before work starts.",
    scope: ["home", "services", "contact"],
    order: 6,
  },
  {
    key: "outside-gujarat",
    question: "Do you work with clients outside Gujarat?",
    answer: "Yes. We are based in Ahmedabad and work with brands across India and abroad.",
    scope: ["home", "services", "contact"],
    order: 7,
  },
  {
    key: "get-started",
    question: "How do we get started?",
    answer:
      "Book a free 30-minute strategy call, or email upsureai@gmail.com. We reply within one business day.",
    scope: ["home", "services", "contact"],
    order: 8,
  },
  /* Services and Contact pages (kept from the current site) */
  {
    key: "how-long",
    question: "How long does a project take?",
    answer:
      "It depends on scope. A brand strategy engagement typically runs 4–6 weeks. A full brand plus web project is 8–12 weeks. Months of 'discovery' is an excuse for inefficiency, so we move fast and iterate.",
    scope: ["services"],
    order: 9,
  },
  {
    key: "no-plan",
    question: "We have an idea but no plan yet. Can you still help?",
    answer:
      "Yes, and that's often where we add the most value. We help shape the strategy, define the scope, then build the brand and growth systems on a base we create together.",
    scope: ["services", "contact"],
    order: 10,
  },
  {
    key: "long-term",
    question: "Do you work with clients long-term?",
    answer:
      "Yes. 98% of our clients stay with us past the first engagement. We stay on to measure, learn and grow the brand and the pipeline month over month.",
    scope: ["services"],
    order: 11,
  },
  /* Service pages (section 5) */
  ...serviceFaqs.map(([service, question, answer], i) => ({
    key: `${service}-${i}`,
    question,
    answer,
    scope: [] as string[],
    order: 100 + i,
    service,
  })),
];

/* ----------------------------------------------------------------------------
   Testimonials. None are shown until real, client-approved quotes exist; every
   testimonial block and the work-section quote slider hide while this is empty.
   Add entries as { key, quote, name, role, company, service, featured, order }.
   ---------------------------------------------------------------------------- */
export const testimonials: {
  key: string;
  quote: string;
  name: string;
  role?: string;
  company?: string;
  avatar?: string;
  service?: string;
  outcome?: boolean;
  featured?: boolean;
  order?: number;
}[] = [];

/* ----------------------------------------------------------------------------
   Team (first names from the live site; roles per the About page brief)
   ---------------------------------------------------------------------------- */
export const team = [
  { key: "vrinda", name: "Vrinda", role: "Strategy", photo: "person-1", order: 1 },
  { key: "aarav", name: "Aarav", role: "Creative", photo: "person-2", order: 2 },
  { key: "kabir", name: "Kabir", role: "Performance", photo: "person-3", order: 3 },
  { key: "riddhi", name: "Riddhi", role: "Social", photo: "person-4", order: 4 },
].map((m) => ({
  ...m,
  bio: `${m.name} leads ${m.role.toLowerCase()} at Upsure Media, working across D2C and B2B brands.`,
}));

/* ----------------------------------------------------------------------------
   Insights (the blog)
   ---------------------------------------------------------------------------- */
export const categories = [
  { slug: "quick-commerce", title: "Quick commerce" },
  { slug: "ai-search", title: "AI search" },
  { slug: "ai", title: "AI" },
  { slug: "brand", title: "Brand" },
  { slug: "agency", title: "Agency" },
];

/** Services linked from Insights posts, by topic (2–3 internal links per page). */
export const CATEGORY_SERVICES: Record<string, string[]> = {
  "quick-commerce": ["ecommerce-quick-commerce", "performance-marketing", "branding"],
  "ai-search": ["seo-aeo-geo", "pr", "ai-solutions"],
  ai: ["ai-solutions", "seo-aeo-geo", "performance-marketing"],
  brand: ["branding", "brand-consulting", "personal-branding"],
  content: ["social-media", "influencer-marketing", "personal-branding"],
  strategy: ["brand-consulting", "branding", "performance-marketing"],
  growth: ["performance-marketing", "ecommerce-quick-commerce", "seo-aeo-geo"],
  agency: ["brand-consulting", "social-media", "performance-marketing"],
};

/* First Insights posts from section 9.5. Each answers its question in the
   first two lines, because that is what search engines and AI tools quote. */
const newPosts = [
  {
    slug: "launch-d2c-brand-on-blinkit-zepto-instamart",
    title: "How to launch a D2C brand on Blinkit, Zepto and Instamart",
    category: "quick-commerce",
    tags: ["Quick commerce", "D2C", "Blinkit", "Zepto", "Instamart"],
    publishedAt: "2026-10-02",
    cover: "post-qc",
    excerpt:
      "Get your catalogue, pricing and documents ready, apply through each platform's seller process, then launch city by city. Here is the order we follow with D2C brands.",
    content: `
To launch a D2C brand on Blinkit, Zepto and Instamart, get your catalogue, pricing and compliance documents ready, apply through each platform's seller process, and launch one or two cities first. Win availability and ratings there, then expand city by city. This is the order we follow from Ahmedabad with D2C brands across India.

Quick commerce rewards brands that are always in stock and easy to pick in a two-second scroll. Most launches that struggle skip one of the steps below.

## 1. Get your catalogue ready before you apply

Every platform asks for the same basics: product names written the way shoppers search, pack sizes, MRP, barcodes, shelf life and clear product images. Food brands also need the right food safety licences, and every brand needs GST details in order. Prepare this once, in one sheet, and you can reuse it across all three apps.

## 2. Apply through the seller process

Each app has its own onboarding route, and some categories go through approved distributors rather than directly. Expect the platform's category team to ask why your product deserves shelf space. A short note on demand you already have, from your website, marketplaces or offline stores, helps.

## 3. Design for the thumbnail

On quick commerce, your pack shot is the ad. Test your images at the size shoppers actually see them, with the product name and pack size readable at a glance. Clean backgrounds and one clear benefit beat busy lifestyle shots.

## 4. Pick your first cities on purpose

Do not launch everywhere at once. Start where you already have demand, such as cities with strong website orders or offline distribution, so early sales and ratings come quickly. Those signals help the platform keep you stocked and visible.

## 5. Plan pricing, offers and ads together

Quick commerce shoppers compare prices instantly. Decide your launch offer, your everyday price and your margin floor before you go live. Platform ads work best once you have stock depth and a few good ratings, not on day one.

## 6. Track availability every day

If you are out of stock in a dark store, you are invisible in that area. Track sell-through and availability by city, and fix gaps before you spend more on ads.

If you want a team to handle onboarding, listings, thumbnail creatives, ads and city launches in one plan, [our e-commerce and quick commerce service](/services/ecommerce-quick-commerce) covers all of it.
`.trim(),
  },
  {
    slug: "what-is-geo-chatgpt-brand-mentions",
    title: "What is GEO, and how do you get your brand mentioned in ChatGPT?",
    category: "ai-search",
    tags: ["GEO", "AEO", "SEO", "ChatGPT", "AI search"],
    publishedAt: "2026-09-28",
    cover: "post-geo",
    excerpt:
      "GEO is generative engine optimisation: making your brand visible and accurately described inside AI answers. Here is how it works and where to start.",
    content: `
GEO (generative engine optimisation) is the work of making your brand visible and accurately described in AI tools such as ChatGPT, Gemini and Perplexity. You get mentioned by being clearly described on your own site, cited by sources those tools trust, and useful on the questions your customers ask. Here is how we approach it at Upsure Media in Ahmedabad.

More customers now ask an AI tool "which agency should I hire" or "which brand is best for" before they ever open Google. If your brand is missing from that answer, you lose the shortlist.

## SEO, AEO and GEO: what is the difference?

**SEO** ranks your pages on Google and Bing. **AEO** (answer engine optimisation) structures your content so search engines and voice assistants show it as the direct answer. **GEO** gets your brand named inside AI-generated answers. They build on each other: good SEO and AEO make GEO much easier.

## How AI tools decide which brands to mention

AI tools summarise what they find across the web. They are more likely to mention a brand when the same clear description of it appears in several trusted places: the brand's own website, news and trade publications, directories, reviews and expert articles.

## Five steps to start

1. **Describe yourself the same way everywhere.** Write one plain sentence about what you do, who for and where, and use it on your website, social profiles and listings.
2. **Add structured data.** Organisation, service and FAQ schema help machines read your site correctly.
3. **Publish answers, not slogans.** Write pages that answer real questions in the first two lines, the way a customer would ask them.
4. **Earn mentions in trusted publications.** PR coverage and expert articles are among the sources AI tools cite most.
5. **Make your site easy for AI crawlers.** Allow the major AI crawlers in robots.txt and publish an llms.txt file that summarises your company.

## How to track it

Pick a fixed set of prompts your customers would ask, test them every month in ChatGPT, Gemini and Perplexity, and record whether your brand appears and how it is described. Change one thing at a time and watch the trend, not a single answer.

Our [SEO, AEO and GEO service](/services/seo-aeo-geo) runs this end to end, from technical SEO to AI visibility tracking.
`.trim(),
  },
];

export const posts = [
  ...newPosts,
  {
    slug: "ai-in-the-growth-engine-2026",
    title: "AI in the growth engine: what's actually working in 2026",
    category: "ai",
    tags: ["AI", "Growth", "Marketing", "Performance"],
    publishedAt: "2026-06-24",
    cover: "post-1",
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
    cover: "svc-ai",
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
    cover: "faq-chat",
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
    cover: "post-6",
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
    cover: "post-7",
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
   Case studies (client names from the logo wall; summaries, segment and services per
   section 3.4 of the copy update; per-client copy written without invented figures or
   quotes, to be confirmed by Upsure Media)
   ---------------------------------------------------------------------------- */
export const caseStudies = [
  {
    slug: "lenskart",
    client: "Lenskart",
    industry: "Eyewear retail",
    segment: "D2C",
    duration: "12 weeks",
    services: ["branding", "performance-marketing"],
    summary:
      "One brand voice from paid ads to the store window, for India's best-known eyewear brand.",
    cover: "work-1",
    featured: true,
    intro:
      "Lenskart sells eyewear online and in stores across India, so the brand has to work as hard in a paid ad as it does on a shop window. Our work as Upsure Media, the brand and growth agency in Ahmedabad, spanned branding, design and performance marketing.",
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
        eyebrow: "Performance",
        heading: "Creative and media in the same room",
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
    segment: "D2C",
    duration: "16 weeks",
    services: ["social-media", "branding"],
    summary: "Launch-ready social content for an automotive brand where every launch is an event.",
    cover: "work-2",
    featured: true,
    intro:
      "Buying a car is a considered decision, and much of that consideration now happens on a phone. Our work with Hyundai, from our studio in Ahmedabad, focused on social media content and the brand design system behind it.",
    objective:
      "Make every model launch feel like [[an event worth following]], and keep the feed [[useful between launches]], not just loud during them.",
    sections: [
      {
        eyebrow: "Social",
        heading: "Planned around the launch calendar",
        body: "Content is planned in phases around each model launch — build-up, launch day and follow-through — so every launch tells a story rather than living in a single post.",
      },
      {
        eyebrow: "Brand",
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
    segment: "D2C",
    duration: "Ongoing retainer",
    services: ["social-media", "ai-solutions"],
    summary:
      "Social, design and AI-assisted production for a consumer-tech brand that never stops launching.",
    cover: "work-3",
    featured: true,
    intro:
      "In consumer electronics the product cycle sets the pace, and content has to keep up across every format and platform. Our work with Samsung, run from Ahmedabad, combined social media with AI-assisted content production.",
    objective:
      "Produce [[more creative, faster]], without letting quality or consistency slip — with [[AI where it helps and people where it matters]].",
    sections: [
      {
        eyebrow: "Social",
        heading: "Built for each platform",
        body: "Rather than resizing one asset everywhere, content is shaped for how each platform is used: quick hooks for short video, detail for carousels, clarity for search.",
      },
      {
        eyebrow: "Design",
        heading: "One look across every format",
        body: "Clear rules for layout, type and product imagery keep every asset recognisably on-brand, whether it is a launch banner or a fifteen-second story.",
      },
      {
        eyebrow: "AI",
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
    segment: "D2C",
    duration: "6 months",
    services: ["performance-marketing", "ecommerce-quick-commerce"],
    summary: "Performance marketing and creative for a sports retailer with thousands of products.",
    cover: "work-4",
    featured: true,
    intro:
      "Decathlon sells gear for dozens of sports, so the challenge is matching the right product to the right person at the right moment. Our work as Upsure Media, from Ahmedabad, covered performance marketing and e-commerce.",
    objective:
      "Help people [[find the right gear faster]], and turn more of that interest into [[orders and store visits]].",
    sections: [
      {
        eyebrow: "Performance",
        heading: "Campaigns organised by sport and season",
        body: "Campaigns follow how people actually shop for sport: by activity and by season. Budgets move towards whichever sports and categories are in demand, instead of being split evenly.",
      },
      {
        eyebrow: "E-commerce",
        heading: "Pages and listings built to convert",
        body: "Product pages, landing pages and marketplace listings follow one clear structure, so a new sport, season or offer can go live quickly with one obvious next step.",
      },
      {
        eyebrow: "Testing",
        heading: "Small tests, steady learning",
        body: "Creative, headlines and offers are tested continuously, and the winners become the new defaults across campaigns and pages.",
      },
    ],
    timeline: [
      { when: "Discover", what: "Account, catalogue and conversion audit" },
      { when: "Define", what: "Sport and season campaign plan" },
      { when: "Build", what: "Campaign creative and page templates" },
      { when: "Grow", what: "Continuous testing and iteration" },
    ],
  },
].map((c, i) => ({
  ...c,
  segment: c.segment as "D2C" | "B2B",
  title: c.client,
  publishedAt: new Date(2026, 6 - i, 10).toISOString(),
}));

/* ----------------------------------------------------------------------------
   Forms. Submissions are emailed to the team (see features/forms/action.ts).
   ---------------------------------------------------------------------------- */
const serviceOptions = services.map((s) => ({ label: s.title, value: s.slug }));
const budgetOptions = [
  { label: "Under ₹50,000", value: "under-50k" },
  { label: "₹50,000–2 lakh", value: "50k-2l" },
  { label: "₹2–5 lakh", value: "2-5l" },
  { label: "₹5 lakh+", value: "5l-plus" },
  { label: "One-time project", value: "one-time" },
];

export const forms = {
  contact: {
    title: "Contact",
    submitButtonLabel: "Send message",
    confirmationType: "message",
    confirmationMessage: "Thanks, we'll get back to you within one business day.",
    fields: [
      { blockType: "text", name: "name", label: "Name", required: true, width: 50 },
      { blockType: "email", name: "email", label: "Work email", required: true, width: 50 },
      { blockType: "text", name: "company", label: "Company", required: false, width: 50 },
      {
        blockType: "select",
        name: "brandType",
        label: "Brand type",
        required: false,
        width: 50,
        options: [
          { label: "D2C", value: "d2c" },
          { label: "B2B", value: "b2b" },
          { label: "Personal brand", value: "personal" },
        ],
      },
      {
        blockType: "select",
        name: "service",
        label: "Service needed",
        required: false,
        width: 50,
        options: [...serviceOptions, { label: "Not sure yet", value: "not-sure" }],
      },
      {
        blockType: "select",
        name: "budget",
        label: "Monthly budget",
        required: false,
        width: 50,
        options: budgetOptions,
      },
      {
        blockType: "textarea",
        name: "message",
        label: "Message",
        required: true,
        width: 100,
      },
    ],
  },
  consultation: {
    title: "Request a free consultation",
    submitButtonLabel: "Request consultation",
    confirmationType: "message",
    confirmationMessage: "Thanks, we'll be in touch to book your free 30-minute strategy call.",
    fields: [
      { blockType: "text", name: "name", label: "Name", required: true, width: 100 },
      { blockType: "email", name: "email", label: "Work email", required: true, width: 100 },
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
    confirmationMessage: "Thanks, we'll call you back within one business day.",
    fields: [
      { blockType: "text", name: "name", label: "Name", required: true, width: 100 },
      { blockType: "text", name: "phone", label: "Phone", required: true, width: 100 },
      { blockType: "email", name: "email", label: "Work email", required: false, width: 100 },
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
        name: "business",
        label: "Your business",
        required: true,
        width: 100,
        options: [
          { label: "D2C brand", value: "d2c" },
          { label: "B2B company", value: "b2b" },
          { label: "Founder / personal brand", value: "personal" },
        ],
      },
      {
        blockType: "select",
        name: "budget",
        label: "Budget per month",
        required: true,
        width: 50,
        options: budgetOptions,
      },
      {
        blockType: "select",
        name: "timeline",
        label: "When",
        required: true,
        width: 50,
        options: [
          { label: "This month", value: "this-month" },
          { label: "In 1–3 months", value: "1-3m" },
          { label: "Just exploring", value: "exploring" },
        ],
      },
      { blockType: "text", name: "name", label: "Name", required: true, width: 50 },
      { blockType: "email", name: "email", label: "Work email", required: true, width: 50 },
      { blockType: "text", name: "company", label: "Company", required: false, width: 50 },
      {
        blockType: "text",
        name: "website_url",
        label: "Website or Instagram link",
        required: false,
        width: 50,
      },
    ],
  },
};

/* ----------------------------------------------------------------------------
   Globals. Sitewide rules: brand "Upsure Media", email upsureai@gmail.com,
   location "Ahmedabad, Gujarat, India" only (no street address, phone or
   hours), Instagram and LinkedIn only, no founder names.
   ---------------------------------------------------------------------------- */

/** The one-line description, used word for word (section 1). */
export const ONE_LINER =
  "Upsure Media is a full-service brand and growth agency in Ahmedabad, Gujarat, India. We help D2C and B2B brands grow through brand consulting, branding, personal branding, PR, social media, influencer marketing, performance marketing, e-commerce and quick commerce growth, SEO/AEO/GEO and AI solutions.";

/** Paste the LinkedIn company page URL here once it exists; empty links are hidden. */
export const LINKEDIN_URL = "";
export const INSTAGRAM_URL = "https://www.instagram.com/upsure_media/";

export const siteSettings = {
  name: "Upsure Media",
  tagline: "We grow brands people love",
  email: "upsureai@gmail.com",
  city: "Ahmedabad, Gujarat, India",
  socials: [
    { platform: "Instagram", url: INSTAGRAM_URL },
    { platform: "LinkedIn", url: LINKEDIN_URL },
  ].filter((s) => s.url),
  stats: [
    { value: 100, suffix: "+", label: "brands served" },
    { value: 250, suffix: "+", label: "Projects delivered across brand & growth" },
    { value: 98, suffix: "%", label: "Client retention, year over year" },
  ],
  badges: [{ text: "Based in Ahmedabad" }],
  defaultTitle: "Upsure Media – D2C & B2B Brand and Growth Agency in Ahmedabad, India",
  defaultDescription:
    "Full-service agency for D2C and B2B brands: branding, social, influencer, performance, e-commerce, quick commerce, PR, SEO/AEO/GEO and AI.",
  legalName: "Upsure Media",
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
        group: s.group,
      })),
    },
    {
      label: "Industries",
      href: "/industries/d2c",
      children: [
        { label: "D2C brands", href: "/industries/d2c" },
        { label: "B2B companies", href: "/industries/b2b" },
      ],
    },
    { label: "Work", href: "/work", children: [] },
    { label: "About", href: "/about", children: [] },
    { label: "Insights", href: "/blog", children: [] },
    { label: "Contact", href: "/contact", children: [] },
  ],
  cta: { label: "Book a free strategy call", href: "/start-a-project" },
  secondary: siteSettings.socials.map((s) => ({ label: s.platform, href: s.url, newTab: true })),
};

export const footer = {
  description:
    "Upsure Media is a full-service brand and growth agency for D2C and B2B brands, working with clients across India and abroad.",
  columns: [
    {
      heading: "Services",
      links: services.map((s) => ({ label: s.title, href: `/services/${s.slug}` })),
    },
    {
      heading: "Industries",
      links: [
        { label: "D2C brands", href: "/industries/d2c" },
        { label: "B2B companies", href: "/industries/b2b" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Work", href: "/work" },
        { label: "Culture", href: "/culture" },
        { label: "Insights", href: "/blog" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      heading: "Legal",
      links: [
        { label: "Terms", href: "/terms" },
        { label: "Privacy", href: "/privacy" },
      ],
    },
    {
      heading: "Social",
      links: siteSettings.socials.map((s) => ({ label: s.platform, href: s.url, newTab: true })),
    },
  ],
  newsletter: {
    heading: "Subscribe to The Upshot",
    text: "One email a month on D2C growth, quick commerce, AI search and brand building.",
    placeholder: "Enter your email",
    buttonLabel: "Subscribe",
  },
  legal: [
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Privacy", href: "/privacy" },
  ],
  copyright: "Upsure Media",
};

export const ctaBand = {
  emoji: "👋",
  heading: "Ready to grow your brand?",
  subheading: "Book a free 30-minute strategy call.",
  note: "We reply within one business day. Or write to upsureai@gmail.com",
  link: { label: "Book a free strategy call", href: "/start-a-project", newTab: false },
};

/* ----------------------------------------------------------------------------
   Pages (block layouts)
   ---------------------------------------------------------------------------- */
/** "How can we help you?" needs, grouped for D2C brands and B2B companies (3.8). */
const needs = (ctx: Ctx) => [
  ...(
    [
      ["We're launching a new D2C brand", "branding"],
      ["Our ads are spending, but ROAS is falling", "performance-marketing"],
      ["We want to sell on Blinkit, Zepto and Instamart", "ecommerce-quick-commerce"],
      ["Our Amazon and Flipkart sales are flat", "ecommerce-quick-commerce"],
      ["We need creators who actually drive sales", "influencer-marketing"],
      ["We need content people stop scrolling for", "social-media"],
    ] as const
  ).map(([label, slug]) => ({ label, service: ctx.services[slug], group: "D2C brands" })),
  ...(
    [
      ["We need qualified leads, not just traffic", "performance-marketing"],
      ["Our founder should be the face of the brand", "personal-branding"],
      ["We want press coverage and credibility", "pr"],
      ["We don't show up on Google or in ChatGPT answers", "seo-aeo-geo"],
      ["Our team wastes hours on manual work", "ai-solutions"],
      ["We need a growth partner, not a vendor", "brand-consulting"],
    ] as const
  ).map(([label, slug]) => ({ label, service: ctx.services[slug], group: "B2B companies" })),
];

export const pages = (ctx: Ctx) => [
  {
    slug: "home",
    title: "Home",
    meta: {
      title: "Upsure Media – D2C & B2B Brand and Growth Agency in Ahmedabad, India",
      description:
        "Full-service agency for D2C and B2B brands: branding, social, influencer, performance, e-commerce, quick commerce, PR, SEO/AEO/GEO and AI.",
    },
    layout: [
      {
        blockType: "hero",
        variant: "collage",
        eyebrow: "D2C & B2B Brand and Growth Agency in Ahmedabad",
        heading: "We grow|brands people|[[love.]]",
        lead: "Upsure Media is a full-service brand and growth agency for [[D2C and B2B brands]]. Brand consulting, branding, social media, influencer marketing, performance marketing, e-commerce, quick commerce, PR and AI, run by [[one senior team and measured on sales]].",
        stickers: [
          { text: "100+ brands served", tone: "sun" },
          { text: "98% client retention", tone: "teal" },
        ],
        ctas: [
          { label: "Book a free strategy call", href: "/start-a-project" },
          { label: "Explore services", href: "/services" },
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
          "D2C launches, marketplace growth and B2B brand builds, each measured by what it changed for the business.",
        limit: 4,
        layout: "grid",
        cta: { label: "View all work", href: "/work", newTab: false },
        tone: "teal-ink",
      },
      {
        blockType: "serviceGrid",
        eyebrow: "Our services",
        heading: "Ten services, [[one team]]",
        intro:
          "From the first brand workshop to your hundredth quick commerce order, strategy, creative, media and technology are planned together and measured together.",
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
        cta: { label: "Book a free strategy call", href: "/start-a-project", newTab: false },
      },
      {
        blockType: "needPicker",
        eyebrow: "Start here",
        heading: "How can we help you?",
        subheading: "Pick what sounds like you.",
        items: needs(ctx),
        tone: "paper-2",
      },
      {
        blockType: "blogCarousel",
        eyebrow: "Insights",
        heading: "Insights",
        intro: "Field notes on D2C growth, quick commerce, AI search and brand building.",
        limit: 4,
        distinctTopics: true,
        tone: "teal-ink",
      },
      { blockType: "faq", eyebrow: "FAQ", heading: "Good questions", scope: "home", tone: "paper" },
    ],
  },
  {
    slug: "services",
    title: "Services",
    meta: {
      title: "Branding, Marketing, Quick Commerce & AI Services | Upsure Media",
      description:
        "10 services, one team: consulting, branding, personal branding, PR, social, influencer, ads, e-commerce, SEO/AEO/GEO and AI.",
    },
    layout: [
      {
        blockType: "hero",
        variant: "editorial",
        eyebrow: "Services",
        heading: "Brand and growth services for [[D2C and B2B brands]]",
        lead: "Ten services, one senior team. Pick one service for a specific problem, or let us run the full journey from brand strategy to marketplace sales.",
        stickers: [
          { text: "Senior specialists", tone: "sun" },
          { text: "Marketing under one roof", tone: "teal" },
        ],
        images: [{ image: ctx.media["services-hero"] }],
        showContact: true,
      },
      {
        blockType: "statement",
        eyebrow: "What we do",
        text: "Most agencies sell you hours. We sell you [[outcomes]], for names like Samsung, Hyundai, Lenskart and Decathlon, and for the ambitious challengers determined to join them.",
        tone: "paper",
      },
      {
        blockType: "serviceGrid",
        eyebrow: "Capabilities",
        heading: "Ten services, [[one team]]",
        intro: "Grouped the way brands grow: build the brand, grow demand, then sell and scale.",
        layout: "cards",
        grouped: true,
        tone: "white",
      },
      {
        blockType: "needPicker",
        eyebrow: "Start here",
        heading: "How can we help you?",
        subheading: "Pick what sounds like you.",
        items: needs(ctx),
        tone: "paper-2",
      },
      {
        blockType: "approachSteps",
        eyebrow: "Our approach",
        heading: "Our approach",
        steps: [
          {
            title: "Discover",
            body: "We audit your brand, channels, numbers and competitors in the first two weeks.",
            image: ctx.media["approach-illo"],
          },
          {
            title: "Plan",
            body: "You get one growth plan with targets for revenue, ROAS, CAC or leads, depending on your model.",
          },
          {
            title: "Build and launch",
            body: "Brand, content, campaigns, listings and tools go live in planned sprints.",
          },
          {
            title: "Grow",
            body: "Weekly optimisation, monthly reporting and a quarterly review against the targets.",
          },
        ],
        tone: "white",
      },
      {
        blockType: "engagementModels",
        eyebrow: "Ways to work together",
        heading: "How we work together",
        intro: "Every proposal is fixed and transparent before work starts.",
        items: [
          {
            name: "Project",
            bestFor: "A launch, rebrand, website or one-off campaign",
            includes: ["Fixed scope", "Fixed price", "Fixed timeline"].map((item) => ({ item })),
            highlight: false,
          },
          {
            name: "Monthly retainer",
            bestFor: "Ongoing social, performance, influencer, marketplace or SEO work",
            includes: ["Monthly deliverables", "Reporting", "A dedicated team"].map((item) => ({
              item,
            })),
            highlight: true,
          },
          {
            name: "Growth partnership",
            bestFor: "D2C and B2B brands that want one team for everything",
            includes: ["Brand consulting", "Execution across all channels", "Shared targets"].map(
              (item) => ({ item }),
            ),
            highlight: false,
          },
          {
            name: "Consulting",
            bestFor: "Founders and CMOs who need senior advice, not execution",
            includes: ["Fractional CMO hours", "Audits", "Quarterly planning"].map((item) => ({
              item,
            })),
            highlight: false,
          },
        ],
        tone: "paper",
      },
      {
        blockType: "featureList",
        eyebrow: "Why Upsure",
        heading: "Why Upsure",
        image: ctx.media["one-team"],
        items: [
          {
            title: "Senior people on every account",
            body: "Strategy, creative and media are led by experienced specialists, not handed to juniors.",
          },
          {
            title: "D2C is home ground",
            body: "We know marketplaces, quick commerce, ROAS and repeat rate, not just likes.",
          },
          {
            title: "One team, one plan",
            body: "Brand, content, media, PR and AI are planned together, so nothing gets lost between vendors.",
          },
        ],
        tone: "white",
      },
      {
        blockType: "statement",
        eyebrow: "What you get",
        text: "What you get: a [[named account lead]], a [[growth plan with targets]], a shared dashboard, weekly updates, and a [[monthly report in plain language]].",
        tone: "paper",
      },
      {
        blockType: "faq",
        eyebrow: "FAQ",
        heading: "Good questions",
        scope: "services",
        image: ctx.media["faq-chat"],
        tone: "paper",
      },
    ],
  },
  {
    slug: "industries/d2c",
    title: "D2C brands",
    meta: {
      title: "D2C Marketing Agency in India | Branding, Ads, Quick Commerce | Upsure Media",
      description:
        "From brand launch to Blinkit shelves, Upsure Media builds and grows D2C brands across their website, marketplaces, quick commerce and social.",
    },
    showCtaBand: false,
    layout: [
      {
        blockType: "hero",
        variant: "editorial",
        eyebrow: "Industries · D2C brands",
        heading: "The growth agency for [[D2C brands]]",
        lead: "From brand launch to Blinkit shelves, Upsure Media builds and grows D2C brands across their website, marketplaces, quick commerce and social.",
        stickers: [
          { text: "Launch to quick commerce", tone: "sun" },
          { text: "One team, one plan", tone: "teal" },
        ],
        ctas: [{ label: "Get a free D2C growth audit", href: "/start-a-project" }],
        images: [{ image: ctx.media["ind-d2c"] }],
        showContact: true,
      },
      {
        blockType: "textColumns",
        eyebrow: "D2C growth",
        columns: [
          {
            heading: "Everything a D2C brand needs, under one roof",
            body: "D2C growth now depends on five things working together: a brand people remember, content that stops the scroll, creators who drive sales, ads that pay back, and availability on the apps where people shop. Most brands hire five vendors for this. With Upsure Media, it's one team and one plan.",
            link: { label: "Explore services", href: "/services", newTab: false },
          },
        ],
        tone: "paper",
      },
      {
        blockType: "featureList",
        eyebrow: "Stages",
        heading: "Launch, grow, scale",
        items: [
          {
            title: "Launch",
            body: "Brand strategy, naming, packaging, Shopify store, launch campaign and first marketplace listings.",
          },
          {
            title: "Grow",
            body: "Performance marketing, influencer campaigns, social content and quick commerce city launches.",
          },
          {
            title: "Scale",
            body: "New categories, new cities, marketplace ads, PR, founder brand and AI-powered customer support.",
          },
        ],
        tone: "white",
      },
      {
        blockType: "capabilities",
        eyebrow: "Categories",
        heading: "Categories we work in",
        items: [
          "Food & beverage",
          "Beauty & personal care",
          "Fashion & accessories",
          "Health & wellness",
          "Home & kitchen",
          "Consumer electronics",
        ].map((label) => ({ label })),
        tone: "paper",
      },
      {
        blockType: "capabilities",
        eyebrow: "Reporting",
        heading: "Metrics we report on",
        items: [
          "ROAS",
          "CAC",
          "Repeat rate",
          "Marketplace sales",
          "Quick commerce sell-through",
          "Contribution margin",
        ].map((label) => ({ label })),
        tone: "paper-2",
      },
      {
        blockType: "textColumns",
        eyebrow: "Services D2C brands use most",
        columns: [
          {
            heading: services.find((s) => s.slug === "branding")!.title,
            body: services.find((s) => s.slug === "branding")!.blurb,
            link: {
              label: `Explore ${services.find((s) => s.slug === "branding")!.title}`,
              href: "/services/branding",
              newTab: false,
            },
          },
          {
            heading: services.find((s) => s.slug === "performance-marketing")!.title,
            body: services.find((s) => s.slug === "performance-marketing")!.blurb,
            link: {
              label: `Explore ${services.find((s) => s.slug === "performance-marketing")!.title}`,
              href: "/services/performance-marketing",
              newTab: false,
            },
          },
          {
            heading: services.find((s) => s.slug === "ecommerce-quick-commerce")!.title,
            body: services.find((s) => s.slug === "ecommerce-quick-commerce")!.blurb,
            link: {
              label: `Explore ${services.find((s) => s.slug === "ecommerce-quick-commerce")!.title}`,
              href: "/services/ecommerce-quick-commerce",
              newTab: false,
            },
          },
        ],
        tone: "white",
      },
      {
        blockType: "workGrid",
        eyebrow: "Work",
        heading: "D2C work",
        intro: "D2C launches, marketplace growth and creator campaigns.",
        limit: 4,
        layout: "grid",
        cta: { label: "View all work", href: "/work/industry/d2c", newTab: false },
        tone: "teal-ink",
      },
      {
        blockType: "cta",
        heading: "Get a free D2C growth audit",
        text: "We reply within one business day. Or write to upsureai@gmail.com",
        link: { label: "Get a free D2C growth audit", href: "/start-a-project", newTab: false },
        tone: "teal",
      },
    ],
  },
  {
    slug: "industries/b2b",
    title: "B2B companies",
    meta: {
      title:
        "B2B Marketing Agency in Ahmedabad | Branding, Leads & Founder Branding | Upsure Media",
      description:
        "Branding, founder visibility, LinkedIn, PR, SEO and performance marketing for B2B companies that sell on trust, from Upsure Media in Ahmedabad.",
    },
    showCtaBand: false,
    layout: [
      {
        blockType: "hero",
        variant: "editorial",
        eyebrow: "Industries · B2B companies",
        heading: "B2B marketing that builds trust and brings [[leads]]",
        lead: "Branding, founder visibility, LinkedIn, PR, SEO and performance marketing for B2B companies that sell on trust.",
        stickers: [
          { text: "Credibility first", tone: "sun" },
          { text: "Qualified leads", tone: "teal" },
        ],
        ctas: [{ label: "Book a free B2B growth call", href: "/start-a-project" }],
        images: [{ image: ctx.media["ind-b2b"] }],
        showContact: true,
      },
      {
        blockType: "textColumns",
        eyebrow: "B2B growth",
        columns: [
          {
            heading: "Look as strong as you are",
            body: "B2B buyers research for weeks before they call. They check your website, your founder's LinkedIn, your press coverage and what AI tools say about you. We make sure each of those builds trust, then run campaigns that bring qualified leads to your sales team.",
            link: { label: "Explore services", href: "/services", newTab: false },
          },
        ],
        tone: "paper",
      },
      {
        blockType: "featureList",
        eyebrow: "Stages",
        heading: "Credibility, visibility, demand",
        items: [
          {
            title: "Credibility",
            body: "Brand identity, website, pitch deck, brochures and case studies.",
          },
          {
            title: "Visibility",
            body: "Founder personal branding, LinkedIn content, PR and SEO/AEO/GEO.",
          },
          {
            title: "Demand",
            body: "Google and LinkedIn ads, landing pages, lead qualification with AI and CRM automation.",
          },
        ],
        tone: "white",
      },
      {
        blockType: "capabilities",
        eyebrow: "Industries",
        heading: "Industries we work in",
        items: [
          "Manufacturing & exports",
          "SaaS & technology",
          "Education",
          "Real estate",
          "Healthcare",
          "Financial & professional services",
        ].map((label) => ({ label })),
        tone: "paper",
      },
      {
        blockType: "capabilities",
        eyebrow: "Reporting",
        heading: "Metrics we report on",
        items: [
          "Qualified leads",
          "Cost per lead",
          "Meetings booked",
          "Pipeline value",
          "Search and AI visibility",
        ].map((label) => ({ label })),
        tone: "paper-2",
      },
      {
        blockType: "textColumns",
        eyebrow: "Services B2B companies use most",
        columns: [
          {
            heading: services.find((s) => s.slug === "personal-branding")!.title,
            body: services.find((s) => s.slug === "personal-branding")!.blurb,
            link: {
              label: `Explore ${services.find((s) => s.slug === "personal-branding")!.title}`,
              href: "/services/personal-branding",
              newTab: false,
            },
          },
          {
            heading: services.find((s) => s.slug === "pr")!.title,
            body: services.find((s) => s.slug === "pr")!.blurb,
            link: {
              label: `Explore ${services.find((s) => s.slug === "pr")!.title}`,
              href: "/services/pr",
              newTab: false,
            },
          },
          {
            heading: services.find((s) => s.slug === "seo-aeo-geo")!.title,
            body: services.find((s) => s.slug === "seo-aeo-geo")!.blurb,
            link: {
              label: `Explore ${services.find((s) => s.slug === "seo-aeo-geo")!.title}`,
              href: "/services/seo-aeo-geo",
              newTab: false,
            },
          },
        ],
        tone: "white",
      },
      {
        blockType: "cta",
        heading: "Book a free B2B growth call",
        text: "We reply within one business day. Or write to upsureai@gmail.com",
        link: { label: "Book a free B2B growth call", href: "/start-a-project", newTab: false },
        tone: "teal",
      },
    ],
  },
  {
    slug: "work",
    title: "Work",
    meta: {
      title: "Case Studies – D2C & B2B Brand Growth | Upsure Media",
      description:
        "Work for brands like Lenskart, Hyundai, Samsung and Decathlon across branding, social, performance marketing and AI.",
    },
    layout: [
      {
        blockType: "hero",
        variant: "editorial",
        eyebrow: "Work",
        heading: "Our work: [[D2C and B2B]] case studies",
        lead: "D2C launches, marketplace growth, creator campaigns and B2B brand builds. Filter by service or industry.",
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
    meta: {
      title: "About Upsure Media | Brand & Growth Agency in Ahmedabad",
      description:
        "Upsure Media is a full-service brand and growth agency in Ahmedabad, Gujarat, working with D2C and B2B brands across India.",
    },
    layout: [
      {
        blockType: "hero",
        variant: "editorial",
        eyebrow: "About",
        heading: "About Upsure Media, a brand and growth agency in [[Ahmedabad]]",
        lead: ONE_LINER.replace(
          "We help D2C and B2B brands grow through",
          "We work with D2C and B2B brands on",
        ).replace("e-commerce and quick commerce growth", "e-commerce, quick commerce"),
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
            heading: "What we do",
            body: "We are a team of strategists, designers, content creators, performance marketers and AI specialists under one roof. Brands come to us to launch, to grow sales, or to be taken seriously in their category. We plan brand, content, media and technology together, and measure the work by what it changes for the business.",
            link: { label: "Explore our services", href: "/services", newTab: false },
          },
          {
            heading: "Who we work with",
            body: "D2C brands selling on their own websites, marketplaces and quick commerce apps, and B2B companies that need credibility, visibility and qualified leads. Clients include Lenskart, Hyundai, Samsung and Decathlon.",
            link: { label: "How we grow D2C brands", href: "/industries/d2c", newTab: false },
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
          { value: 250, suffix: "+", label: "projects delivered" },
          { value: 98, suffix: "%", label: "client retention" },
        ],
        tone: "white",
      },
      {
        blockType: "featureList",
        eyebrow: "What we believe",
        heading: "What we believe",
        items: [
          {
            title: "Every rupee should be traceable to growth.",
            body: "Every plan has targets, and every report shows what moved them.",
          },
          {
            title: "Senior people on every account.",
            body: "The people who plan the work are the people who do it.",
          },
          {
            title: "Brand and performance are one job, not two.",
            body: "A brand people remember makes every ad, listing and post work harder.",
          },
        ],
        tone: "paper",
      },
      {
        blockType: "teamGrid",
        eyebrow: "The team",
        heading: "The people behind the work",
        intro: "Strategy, creative, social and performance, under one roof in Ahmedabad.",
        tone: "white",
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
      {
        blockType: "textColumns",
        eyebrow: "Keep exploring",
        columns: [
          {
            heading: "Culture",
            body: "How we work, what we value and how we hire.",
            link: { label: "Our culture", href: "/culture", newTab: false },
          },
          {
            heading: "Work",
            body: "D2C and B2B case studies across brand, social, performance and AI.",
            link: { label: "View our work", href: "/work", newTab: false },
          },
        ],
        images: ["team-present", "about-2", "about-3"].map((k) => ({ image: ctx.media[k] })),
        tone: "paper",
      },
    ],
  },
  {
    slug: "culture",
    meta: {
      description:
        "How we work at Upsure Media: a tight-knit team of strategists, designers and growth experts, obsessed with doing excellent work.",
    },
    title: "Culture",
    layout: [
      {
        blockType: "hero",
        variant: "editorial",
        eyebrow: "Culture",
        heading: "Everyone has [[skin in the game]]",
        lead: "Upsure Media is a brand and growth team in Ahmedabad, built on one founding principle: deliver the best work, with the best people, for brands we believe in.",
        stickers: [
          { text: "No egos. Just experts.", tone: "sun" },
          { text: "Commercially focused", tone: "teal" },
        ],
        images: [{ image: ctx.media["culture-hero"] }],
      },
      {
        blockType: "statement",
        eyebrow: "Our story",
        text: "Upsure Media started with a small group of people who refused to accept average work. We're a tight team of specialists across [[brand, content, growth and AI]] who care deeply about what we do: [[no egos, no fluff]], just hard work and results.",
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
            body: "We're always curious to meet sharp strategists, designers, and growth marketers. Even when nothing's posted, introduce yourself by email.",
            link: {
              label: "Introduce yourself",
              href: "mailto:upsureai@gmail.com?subject=Joining%20Upsure%20Media",
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
    slug: "blog",
    title: "Insights",
    meta: {
      title: "Insights on D2C Growth, Quick Commerce & AI Search | Upsure Media",
      description:
        "Field notes from Upsure Media on D2C growth, quick commerce, AI search and brand building.",
    },
    layout: [
      {
        blockType: "hero",
        variant: "editorial",
        eyebrow: "Insights",
        heading: "Field notes on [[D2C growth]], quick commerce, AI search and brand building",
        lead: "What we are seeing across D2C and B2B brands, written by the Upsure Media team in Ahmedabad.",
      },
    ],
  },
  {
    slug: "contact",
    title: "Contact",
    showCtaBand: false,
    meta: {
      title: "Contact Upsure Media | Marketing Agency in Ahmedabad",
      description:
        "Talk to Upsure Media about branding, marketing, quick commerce or AI. Email upsureai@gmail.com. Reply within one business day.",
    },
    layout: [
      {
        blockType: "hero",
        variant: "dark",
        eyebrow: "Contact",
        heading: "Contact Upsure Media",
        lead: "Tell us about your brand. We reply within one business day.",
        ctas: [{ label: "Send a message", href: "#lead-form" }],
        showContact: true,
      },
      {
        blockType: "leadForm",
        eyebrow: "Say hello",
        heading: "Tell us about your brand",
        intro:
          "Fill in the form and we'll get back to you within one business day. Prefer email? Write to upsureai@gmail.com.",
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
            body: "Tell us about your brand and what you need. We reply within one business day.",
            link: { label: "Send a message", href: "#lead-form", newTab: false },
          },
          {
            title: "Meeting → Proposal",
            body: "We'll meet to discuss and scope the work, followed by a clear, fixed proposal.",
          },
          {
            title: "Let's get started!",
            body: "We're excited to partner with you, and committed to making this a great, long-running collaboration.",
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
            body: "We're always curious to meet sharp strategists, designers, and growth marketers. Even when nothing's posted, introduce yourself by email.",
            link: {
              label: "Introduce yourself",
              href: "mailto:upsureai@gmail.com?subject=Joining%20Upsure%20Media",
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
    showCtaBand: false,
    meta: {
      title: "Book a Free Strategy Call | Upsure Media",
      description:
        "Tell Upsure Media what you need in three quick steps. A senior team member replies within one business day.",
    },
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
    meta: { description: "The terms that apply when you use the Upsure Media website." },
    title: "Terms & Conditions",
    showCtaBand: false,
    layout: [
      {
        blockType: "hero",
        variant: "editorial",
        eyebrow: "Legal",
        heading: "Terms & Conditions",
        lead: "Last updated: 5 October 2026",
      },
      {
        blockType: "richText",
        width: "narrow",
        content: `
## 1. Who we are

Upsure Media is a full-service brand and growth agency based in Ahmedabad, Gujarat, India. These terms govern your use of this website and, where expressly agreed, form part of our engagement with clients. By using this site you accept these terms.

## 2. Use of this website

You may browse, link to, and share the content on this site for personal and business-evaluation purposes. You may not copy, scrape, republish, or use our content, branding, or imagery for commercial purposes without our written permission.

## 3. Our work and intellectual property

All content on this website — including text, graphics, logos, illustrations, and case-study material — belongs to Upsure Media or to the respective clients whose work is shown. Client work is displayed with permission and remains the property of its respective owners.

## 4. Client engagements

Services we provide to clients are governed by individual proposals and agreements, which take precedence over these website terms. Scope, deliverables, timelines, fees, and ownership of work product are defined per engagement, in writing, before work begins.

## 5. No warranties

This website and its content are provided on an "as is" basis. While we keep information accurate and current, we make no warranties about the completeness or reliability of the content, and we may change it at any time without notice.

## 6. Limitation of liability

To the fullest extent permitted by law, Upsure Media is not liable for any indirect or consequential loss arising from your use of this website. Nothing in these terms limits liability that cannot be limited under applicable law.

## 7. Contact

Questions about these terms? Email us at upsureai@gmail.com and we'll get back to you within one business day.
`.trim(),
        tone: "paper",
      },
    ],
  },
  {
    slug: "privacy",
    meta: { description: "How Upsure Media handles the details you share through this website." },
    title: "Privacy Policy",
    showCtaBand: false,
    layout: [
      {
        blockType: "hero",
        variant: "editorial",
        eyebrow: "Legal",
        heading: "Privacy Policy",
        lead: "Last updated: 5 October 2026",
      },
      {
        blockType: "richText",
        width: "narrow",
        content: `
This policy explains how Upsure Media, a brand and growth agency in Ahmedabad, Gujarat, India, handles the information you share through this website.

## 1. What we collect

When you contact us through the form on this site, we collect the details you provide: your name, work email, company, brand type, the service and budget you choose, your website link, and your message. We don't require an account, and we don't ask for anything we don't need to reply to you.

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

For any privacy question or request, email upsureai@gmail.com. We reply within one business day.
`.trim(),
        tone: "paper",
      },
    ],
  },
];
