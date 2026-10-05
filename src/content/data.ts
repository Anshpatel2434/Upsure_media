/**
 * Site content. Real copy comes from docs/01-current-site-content-inventory.md;
 * the rest is demo data sized to exercise every layout. Edit here, rebuild,
 * and the site updates: nothing is read from a database.
 *
 * Relations are written as keys (service slugs, media keys, form keys) and
 * resolved in `store.ts`. Rich text is light Markdown (see types.ts).
 */

import type { Form, Media, Service } from "./types";

/** Resolved documents handed to `pages()` so layouts can embed them. */
export type Ctx = {
  media: Record<string, Media>;
  services: Record<string, Service>;
  forms: Record<string, Form>;
};

/* ----------------------------------------------------------------------------
   Images: key → alt text. Files live in public/images/demo/<key>.webp
   ---------------------------------------------------------------------------- */
export const media: Record<string, string> = {
  "hero-1": "Social media reel on a phone with rising reach, by Upsure Media",
  "hero-2": "Quick commerce product listings with 10-minute delivery, by Upsure Media",
  "hero-3": "Ad dashboard showing ROAS rising to 3.4×, by Upsure Media",
  "svc-brand-consulting": "Quarterly growth plan with targets, from Upsure Media brand consulting",
  "svc-branding": "Brand identity board with logo, colours, type and packaging, by Upsure Media",
  "svc-personal-branding":
    "Founder LinkedIn post, podcast and profile growth, by Upsure Media personal branding",
  "svc-pr": "Press clipping and featured article layout for PR by Upsure Media",
  "svc-social": "Instagram reel and profile grid for social media marketing by Upsure Media",
  "svc-influencer":
    "Creator profiles and campaign sales tracking for influencer marketing by Upsure Media",
  "svc-performance":
    "Meta, Google and YouTube ads dashboard with ROAS, CAC and leads, by Upsure Media",
  "svc-ecommerce":
    "Quick commerce app and marketplace listing for e-commerce growth by Upsure Media",
  "svc-seo": "Search results with an AI Overview answer, for SEO, AEO and GEO by Upsure Media",
  "svc-ai": "AI support chatbot and lead automation flow built by Upsure Media",
  "work-1": "Eyewear campaign creative for feed, story and store, by Upsure Media",
  "work-2": "Automotive launch reels and social content, by Upsure Media",
  "work-3": "Consumer tech creative variants produced with AI, by Upsure Media",
  "work-4": "Sports retail catalogue ads and ROAS growth, by Upsure Media",
  before: "Website before the redesign: cluttered grey layout",
  after: "Website after the redesign: clear headline, product and reviews",
  "post-1": "Growth dashboard with AI-saved hours and creative variants",
  "post-6": "Brand positioning map against competitors",
  "post-7": "Weekly content calendar with reels, carousels and blogs",
  "post-8": "Compass on a dark map, for brand positioning",
  "post-qc": "Quick commerce app and city-by-city launch map for Gujarat and Mumbai",
  "post-geo": "AI answer naming a brand in response to a founder's question",
  "services-hero":
    "Upsure Media's ten services in three groups: build the brand, grow demand, sell and scale",
  "approach-illo": "Brand audit checklist under a magnifying glass",
  "one-team": "One plan connecting brand, content, media, PR and AI",
  "faq-chat": "Questions and answers about working with Upsure Media",
  "ind-d2c":
    "D2C storefront, product packs and one plan across website, marketplaces and quick commerce",
  "ind-b2b": "B2B company profile, founder post and lead funnel",
  "about-1": "Upsure Media strategy workshop board with the team",
  "about-2": "Upsure Media in-house content shoot for reels",
  "about-3": "Upsure Media creative review of two packaging options",
  "team-table": "Upsure Media content calendar planning",
  "team-couch": "Upsure Media monthly report presentation",
  "team-review": "Upsure Media in-house reel production",
  "team-present": "Upsure Media team presenting monthly results",
  "culture-hero": "Upsure Media values: no egos, curiosity first, craft and outcomes",
  "og-default": "Upsure Media – D2C & B2B Brand and Growth Agency in Ahmedabad",
  "person-1": "Vrinda, Strategy at Upsure Media",
  "person-2": "Aarav, Creative at Upsure Media",
  "person-3": "Kabir, Performance at Upsure Media",
  "person-4": "Riddhi, Social at Upsure Media",
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
      "Book a free 30-minute strategy call, or email collab@upsuremedia.com. We reply within one business day.",
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
   Testimonial slots (section 3.5). Until real client quotes are collected,
   each service slot shows its outcome with no name attached. Replace an entry
   with { quote, name, role, company, service } once a client signs off.
   ---------------------------------------------------------------------------- */
export const testimonials = [
  ["brand-consulting", "One growth plan, with clear targets, that the whole team works from."],
  ["branding", "A brand that stands out on a shelf, a marketplace grid and a 3-second scroll."],
  ["personal-branding", "Leaders who are known, followed and invited in their industry."],
  ["pr", "Coverage in the publications your customers and investors read."],
  ["social-media", "Content people watch and share, and enquiries that follow."],
  ["influencer-marketing", "Creators chosen for audience fit and tracked to sales."],
  ["performance-marketing", "Ad spend tied to ROAS, CAC and qualified leads."],
  [
    "ecommerce-quick-commerce",
    "Listings that convert on Amazon, Flipkart, Blinkit, Zepto and Instamart.",
  ],
  ["seo-aeo-geo", "A brand that shows up on Google and inside AI answers."],
  ["ai-solutions", "Hours of manual work handed back to your team every week."],
].map(([service, quote], i) => ({
  key: `outcome-${service}`,
  quote: quote!,
  name: services.find((s) => s.slug === service)!.title,
  role: "",
  company: "",
  outcome: true,
  featured: true,
  order: i + 1,
  service: service!,
}));

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
  { slug: "content", title: "Content" },
  { slug: "strategy", title: "Strategy" },
  { slug: "growth", title: "Growth" },
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

AI didn't change what good marketing is. It changed how much of your week you get to spend doing it.

If your growth engine still runs entirely on manual effort — or you've bolted on AI tools nobody actually uses — we build these systems end to end: strategy, creative, performance, and the intelligent plumbing underneath. Let's talk.
`.trim(),
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
    content: `
Every few months a founder asks for "just a logo". We understand the instinct — a logo is tangible, quick, and feels like progress. But a logo is the answer to a question, and if the question has not been asked, the answer is decoration.

## Strategy is a set of decisions

Who is this for, and who is it not for? What do we stand for that a competitor would not say? What should someone feel in the first three seconds, and what should they believe after three months? These are business decisions, and they are the brief for every visual choice that follows.

## Design without strategy is expensive to fix

You can tell when strategy was skipped: the identity looks like the category, the messaging changes with every campaign, and the team argues about taste because there is no shared intent to argue from. Fixing it means starting again — this time with the questions.

## Strategy without design is invisible

The reverse is also true. A sharp positioning document that never becomes a system people can use is a deck that gathers dust. Strategy has to be made visible, and that is where design earns its keep.

## The order we work in

Four to six weeks of strategy: audit, interviews, positioning, narrative, architecture. Then identity, with the strategy in the room for every review. It is slower for the first month and faster for every year after.
`.trim(),
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
    content: `
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
`.trim(),
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
    content: `
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
`.trim(),
  },
];

/* ----------------------------------------------------------------------------
   Case studies (client names from the logo wall; descriptions and tags per
   section 3.4 of the copy update)
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
    segment: "D2C",
    duration: "16 weeks",
    services: ["social-media", "branding"],
    summary: "Launch-ready social content for an automotive brand where every launch is an event.",
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
    segment: "D2C",
    duration: "Ongoing retainer",
    services: ["social-media", "ai-solutions"],
    summary:
      "Social, design and AI-assisted production for a consumer-tech brand that never stops launching.",
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
    segment: "D2C",
    duration: "6 months",
    services: ["performance-marketing", "ecommerce-quick-commerce"],
    summary: "Performance marketing and creative for a sports retailer with thousands of products.",
    cover: "work-4",
    featured: true,
    stats: [
      ["210%", "Organic traffic growth"],
      ["2.4×", "Landing-page conversion"],
      ["#1", "For 14 category keywords"],
    ],
  },
].map((c, i) => ({
  ...c,
  segment: c.segment as "D2C" | "B2B",
  title: c.client,
  publishedAt: new Date(2026, 6 - i, 10).toISOString(),
  intro: `${c.client} came to Upsure Media, the brand and growth agency in Ahmedabad, at an inflection point: a strong product, an audience that had outgrown the brand, and growth targets the existing marketing engine could not reach. We were asked to rethink how the brand showed up everywhere, and to build the machine underneath it.`,
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
   Globals. Sitewide rules: brand "Upsure Media", email collab@upsuremedia.com,
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
  email: "collab@upsuremedia.com",
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
  badges: [{ text: "Est. 2019" }, { text: "Based in Ahmedabad" }],
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
        { label: "Testimonials", href: "/testimonials" },
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
  note: "We reply within one business day. Or write to collab@upsuremedia.com",
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
        text: "We reply within one business day. Or write to collab@upsuremedia.com",
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
        text: "We reply within one business day. Or write to collab@upsuremedia.com",
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
        eyebrow: "Results",
        heading: "We let our results do the talking",
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
            heading: "Testimonials",
            body: "What D2C and B2B clients say about working with Upsure Media.",
            link: { label: "Read testimonials", href: "/testimonials", newTab: false },
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
              href: "mailto:collab@upsuremedia.com?subject=Joining%20Upsure%20Media",
              newTab: false,
            },
          },
          {
            heading: "Collaborate with us",
            body: "We're always expanding our network of collaborators for projects that need more than one team. If you share our values and way of working, we'd love to hear from you.",
            link: {
              label: "Become a collaborator",
              href: "mailto:collab@upsuremedia.com?subject=Collaboration",
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
    meta: {
      title: "Client Testimonials | Upsure Media",
      description:
        "What D2C and B2B clients say about working with Upsure Media on branding, marketing and AI.",
    },
    layout: [
      {
        blockType: "hero",
        variant: "editorial",
        eyebrow: "Testimonials",
        heading: "What our [[clients]] say",
        lead: "Founders and marketing heads from D2C and B2B brands on working with Upsure Media.",
        stickers: [
          { text: "98% stay", tone: "teal" },
          { text: "Senior team", tone: "sun" },
        ],
        showContact: true,
      },
      {
        blockType: "testimonialCarousel",
        eyebrow: "By service",
        heading: "What each service delivers",
        layout: "grid",
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
        "Talk to Upsure Media about branding, marketing, quick commerce or AI. Email collab@upsuremedia.com. Reply within one business day.",
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
          "Fill in the form and we'll get back to you within one business day. Prefer email? Write to collab@upsuremedia.com.",
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
              href: "mailto:collab@upsuremedia.com?subject=Joining%20Upsure%20Media",
              newTab: false,
            },
          },
          {
            heading: "Collaborate with us",
            body: "We're always expanding our network of collaborators for projects that need more than one team. If you share our values and way of working, we'd love to hear from you.",
            link: {
              label: "Become a collaborator",
              href: "mailto:collab@upsuremedia.com?subject=Collaboration",
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

Questions about these terms? Email us at collab@upsuremedia.com and we'll get back to you within one business day.
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

Contact form submissions are stored securely in our website's content system and emailed to our inbox. Your submission is used only for delivery of your message to us.

## 4. Analytics and cookies

This site may use privacy-respecting analytics to understand aggregate visitor behaviour (pages visited, approximate region). We don't use advertising trackers, and we don't build individual visitor profiles.

## 5. Data retention

We keep enquiry emails for as long as needed to serve the conversation and our legitimate business records. You can ask us to delete your correspondence at any time.

## 6. Your rights

You can request access to, correction of, or deletion of the personal information we hold about you. Email us and we'll action it promptly.

## 7. Contact

For any privacy question or request, email collab@upsuremedia.com. We reply within one business day.
`.trim(),
        tone: "paper",
      },
    ],
  },
];
