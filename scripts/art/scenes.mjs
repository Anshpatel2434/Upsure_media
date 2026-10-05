/**
 * One function per artwork. Each draws what the service or project actually
 * involves (feeds, listings, dashboards, press, chat, plans). Client work
 * covers show the category of work, never a client's logo or brand marks.
 */
import {
  C,
  arrowUp,
  avatar,
  barChart,
  bars,
  browser,
  card,
  check,
  circle,
  heart,
  lineChart,
  phone,
  pill,
  pillSvg,
  pin,
  play,
  product,
  rect,
  sparkle,
  star,
  svg,
  text,
} from "./kit.mjs";

/* Shared pieces --------------------------------------------------------------- */
const stars = (x, y, n, s = 26) =>
  Array.from({ length: 5 }, (_, i) =>
    star(x + i * (s + 4) + s / 2, y, s, i < n ? C.sun : C.line),
  ).join("");

function kpi(x, y, w, label, value, delta, up = true) {
  return (
    card(x, y, w, 150, { rx: 22, shadow: 0.08 }) +
    text(x + 26, y + 44, label, { size: 20, fill: C.muted }) +
    text(x + 26, y + 104, value, { size: 46, weight: 700 }) +
    pillSvg(x + w - 26 - (delta.length * 18 * 0.56 + 32), y + 76, delta, {
      bg: up ? C.tealSoft : C.coralSoft,
      fg: up ? C.teal : C.coral,
      size: 18,
      padX: 16,
    })
  );
}

function reelScreen(sx, sy, sw, sh, o = {}) {
  const { bg = C.tealInk, kind = "bottle", color = C.sun, likes = "24.1K" } = o;
  return (
    rect(sx, sy, sw, sh, { fill: bg }) +
    circle(sx + sw / 2, sy + sh * 0.4, sw * 0.42, { fill: C.white, opacity: 0.06 }) +
    product(kind, sx + sw * 0.28, sy + sh * 0.2, sw * 0.44, color) +
    circle(sx + sw / 2, sy + sh * 0.42, 38, { fill: C.white, opacity: 0.25 }) +
    play(sx + sw / 2 + 4, sy + sh * 0.42, 34) +
    heart(sx + sw - 40, sy + sh * 0.62, 34) +
    text(sx + sw - 40, sy + sh * 0.62 + 40, likes, {
      size: 16,
      weight: 600,
      fill: C.white,
      anchor: "middle",
    }) +
    circle(sx + sw - 40, sy + sh * 0.76, 16, { fill: C.white, opacity: 0.85 }) +
    bars(sx + 24, sy + sh - 110, sw * 0.6, 3, {
      fill: "#ffffff",
      gap: 22,
      h: 10,
      last: 0.5,
    }).replace(/fill="#ffffff"/g, 'fill="#ffffff" fill-opacity="0.75"')
  );
}

function car(x, y, s, color = C.sun) {
  return (
    `<path d="M${x},${y + s * 0.55} Q${x},${y + s * 0.38} ${x + s * 0.12},${y + s * 0.36} L${x + s * 0.28},${y + s * 0.32} L${x + s * 0.42},${y + s * 0.14} Q${x + s * 0.46},${y + s * 0.1} ${x + s * 0.52},${y + s * 0.1} L${x + s * 0.72},${y + s * 0.1} Q${x + s * 0.78},${y + s * 0.1} ${x + s * 0.82},${y + s * 0.16} L${x + s * 0.92},${y + s * 0.34} Q${x + s},${y + s * 0.38} ${x + s},${y + s * 0.5} L${x + s},${y + s * 0.6} L${x},${y + s * 0.6} Z" fill="${color}"/>` +
    rect(x + s * 0.46, y + s * 0.16, s * 0.14, s * 0.15, { fill: C.white, rx: 4, opacity: 0.55 }) +
    rect(x + s * 0.63, y + s * 0.16, s * 0.15, s * 0.15, { fill: C.white, rx: 4, opacity: 0.55 }) +
    circle(x + s * 0.22, y + s * 0.6, s * 0.1, { fill: C.ink }) +
    circle(x + s * 0.22, y + s * 0.6, s * 0.045, { fill: C.lineDark }) +
    circle(x + s * 0.78, y + s * 0.6, s * 0.1, { fill: C.ink }) +
    circle(x + s * 0.78, y + s * 0.6, s * 0.045, { fill: C.lineDark })
  );
}

function productTile(x, y, w, kind, color, price) {
  return (
    card(x, y, w, w * 1.3, { rx: 18, shadow: 0.07 }) +
    rect(x + 12, y + 12, w - 24, w * 0.72, { fill: C.paper2, rx: 12 }) +
    product(kind, x + w * 0.22, y + w * 0.1, w * 0.56, color) +
    bars(x + 16, y + w * 0.9, w * 0.6, 1, { h: 9 }) +
    text(x + 16, y + w * 1.16, price, { size: Math.round(w * 0.13), weight: 700 }) +
    rect(x + w - 16 - w * 0.36, y + w * 1.02, w * 0.36, w * 0.18, {
      fill: C.white,
      rx: 10,
      stroke: C.teal2,
    }) +
    text(x + w - 16 - w * 0.18, y + w * 1.15, "ADD", {
      size: Math.round(w * 0.1),
      weight: 700,
      fill: C.teal2,
      anchor: "middle",
    })
  );
}

function sticky(x, y, w, h, label, fill) {
  return (
    card(x, y, w, h, { fill, rx: 14, shadow: 0.08 }) +
    text(x + 20, y + 42, label, { size: 22, weight: 600 }) +
    bars(x + 20, y + 62, w - 50, 2, { fill: C.ink, h: 8, gap: 18, last: 0.55 }).replace(
      /fill="#0b0d10"/g,
      'fill="#0b0d10" fill-opacity="0.18"',
    )
  );
}

function chatBubble(x, y, w, lines, o = {}) {
  const { bg = C.white, fg = C.ink, size = 22, tail = "left" } = o;
  const h = 28 + lines.length * (size + 12);
  const t =
    tail === "left"
      ? `<path d="M${x + 18},${y + h - 2} l-14,18 l30,-14 z" fill="${bg}"/>`
      : `<path d="M${x + w - 18},${y + h - 2} l14,18 l-30,-14 z" fill="${bg}"/>`;
  return (
    card(x, y, w, h, { fill: bg, rx: 22, shadow: 0.07 }) +
    t +
    lines
      .map((l, i) => text(x + 24, y + 22 + size + i * (size + 12), l, { size, fill: fg }))
      .join("")
  );
}

/* Services ------------------------------------------------------------------------ */
export function svcBrandConsulting() {
  const W = 1200,
    H = 900;
  const cols = [
    ["Q1", "Brand audit", "Positioning", C.sun],
    ["Q2", "Launch plan", "New listings", C.mint],
    ["Q3", "Scale ads", "Creators", C.peach],
    ["Q4", "New cities", "Review", C.sunSoft],
  ];
  let body = card(90, 90, 1020, 720, { rx: 34 });
  body +=
    text(140, 170, "Growth plan", { size: 46, weight: 700 }) +
    pillSvg(470, 128, "Targets agreed", { bg: C.tealSoft, fg: C.teal, size: 20 });
  cols.forEach(([q, a, b, color], i) => {
    const x = 140 + i * 235;
    body += text(x, 240, q, { size: 26, weight: 700, fill: C.muted });
    body += sticky(x, 262, 205, 120, a, color) + sticky(x, 400, 205, 120, b, color);
  });
  body +=
    rect(140, 560, 920, 2, { fill: C.line }) +
    lineChart(140, 580, 920, 190, [0.1, 0.18, 0.3, 0.38, 0.52, 0.6, 0.78, 0.92], {
      color: C.teal2,
    });
  body += pillSvg(840, 600, "Revenue +40%", { bg: C.sun, size: 22 });
  return [
    W,
    H,
    svg(W, H, body, {
      blobs: [
        [160, 120, 260, C.mint],
        [1100, 820, 300, C.sunSoft],
      ],
    }),
  ];
}

export function svcBranding() {
  const W = 1200,
    H = 900;
  let body = card(80, 90, 560, 450, { fill: C.tealInk, rx: 34 });
  body += circle(210, 315, 70, { fill: C.sun }) + circle(232, 296, 22, { fill: C.tealInk });
  body += text(305, 345, "nava.", { size: 110, weight: 700, fill: C.white, ls: -4 });
  body += text(120, 500, "Primary logo", { size: 20, fill: C.paper, opacity: 0.6 });
  const sw = [
    [C.teal2, "#0F8B8D"],
    [C.sun, "#FFD166"],
    [C.peach, "#FFC9B8"],
    [C.mint, "#BFE6E3"],
  ];
  sw.forEach(([col, hex], i) => {
    body +=
      circle(140 + i * 140, 650, 52, { fill: col, stroke: C.white, sw: 6 }) +
      text(140 + i * 140, 735, hex, { size: 18, fill: C.muted, anchor: "middle" });
  });
  body +=
    card(690, 90, 430, 250, { rx: 30 }) +
    text(730, 250, "Aa", { size: 150, weight: 700 }) +
    text(950, 175, "Display", { size: 22, weight: 600 }) +
    text(950, 205, "700 · 64/72", { size: 18, fill: C.muted }) +
    bars(950, 235, 130, 3, { gap: 20 });
  body += card(690, 380, 430, 430, { fill: C.paper2, rx: 30, shadow: 0.06 });
  body +=
    product("box", 720, 450, 210, C.peach) +
    text(825, 640, "nava.", { size: 30, weight: 700, anchor: "middle" });
  body +=
    product("pouch", 920, 470, 180, C.mint) +
    text(1010, 640, "nava.", { size: 26, weight: 700, anchor: "middle" });
  body += pillSvg(730, 730, "Packaging · 6 SKUs", { bg: C.white, size: 20 });
  return [W, H, svg(W, H, body, { bg: C.sunSoft, blobs: [[1100, 120, 260, C.peach, 0.6]] })];
}

export function svcPersonalBranding() {
  const W = 1200,
    H = 900;
  let body = card(110, 80, 620, 740, { rx: 30 });
  body +=
    avatar(185, 160, 44) +
    text(248, 152, "Founder, D2C brand", { size: 24, weight: 700 }) +
    text(248, 184, "Building in Ahmedabad · 2d", { size: 18, fill: C.muted });
  body +=
    text(150, 262, "Three lessons from building", { size: 32, weight: 700 }) +
    text(150, 304, "our brand in public.", { size: 32, weight: 700 });
  body += bars(150, 336, 520, 3, { gap: 24 });
  body +=
    rect(150, 420, 540, 280, { fill: C.tealInk, rx: 20 }) +
    circle(420, 560, 46, { fill: C.white, opacity: 0.2 }) +
    play(426, 560, 42);
  body += pillSvg(170, 440, "Video · 1:24", { bg: C.white, size: 16, padX: 14 });
  body +=
    heart(170, 750, 30) +
    text(196, 760, "2,481", { size: 22, weight: 600 }) +
    text(320, 760, "184 comments", { size: 20, fill: C.muted }) +
    text(520, 760, "96 reposts", { size: 20, fill: C.muted });
  body += card(780, 120, 320, 330, { fill: C.tealInk, rx: 30 });
  body +=
    rect(905, 170, 70, 120, { fill: C.sun, rx: 35 }) +
    `<path d="M875,250 a65,65 0 0 0 130,0" fill="none" stroke="${C.white}" stroke-width="10" stroke-linecap="round"/>` +
    rect(935, 315, 10, 40, { fill: C.white });
  body += text(820, 410, "Podcast · EP 12", { size: 24, weight: 700, fill: C.white });
  body +=
    card(780, 500, 320, 290, { rx: 30 }) +
    text(815, 560, "Profile views", { size: 22, fill: C.muted }) +
    text(815, 625, "+312%", { size: 58, weight: 700, fill: C.teal2 });
  body += barChart(815, 660, 250, 100, [0.2, 0.3, 0.28, 0.45, 0.6, 0.72, 0.95], {
    colors: [C.mint, C.teal2],
  });
  return [
    W,
    H,
    svg(W, H, body, {
      blobs: [
        [150, 820, 280, C.mint],
        [1120, 100, 240, C.sunSoft],
      ],
    }),
  ];
}

export function svcPR() {
  const W = 1200,
    H = 900;
  let body = card(90, 80, 640, 740, { rx: 20 });
  body += `<text x="410" y="160" font-family="Georgia, 'Times New Roman', serif" font-size="50" font-weight="700" fill="${C.ink}" text-anchor="middle">The Business Daily</text>`;
  body += rect(130, 185, 560, 3, { fill: C.ink }) + rect(130, 193, 560, 1, { fill: C.ink });
  body += `<text x="130" y="262" font-family="Georgia, serif" font-size="38" font-weight="700" fill="${C.ink}">Your brand story,</text><text x="130" y="308" font-family="Georgia, serif" font-size="38" font-weight="700" fill="${C.ink}">featured where it counts</text>`;
  body +=
    rect(130, 340, 560, 230, { fill: C.paper2, rx: 6 }) +
    product("jar", 260, 380, 150, C.teal2) +
    product("box", 430, 395, 140, C.sun);
  [0, 1].forEach((c) => (body += bars(130 + c * 290, 600, 270, 8, { gap: 24, h: 9 })));
  body +=
    card(780, 130, 330, 310, { rx: 26 }) +
    pillSvg(810, 160, "FEATURED", { bg: C.sun, size: 16, padX: 14 }) +
    rect(810, 215, 270, 110, { fill: C.mint, rx: 14 }) +
    bars(810, 350, 260, 3, { gap: 22 });
  body +=
    card(780, 490, 330, 300, { fill: C.tealInk, rx: 26 }) +
    text(810, 600, "“", { size: 140, weight: 700, fill: C.sun }) +
    text(810, 650, "Earned coverage", { size: 30, weight: 700, fill: C.white }) +
    text(810, 692, "that builds trust", { size: 30, weight: 700, fill: C.white }) +
    text(810, 740, "National · Regional · Trade", { size: 18, fill: C.white, opacity: 0.7 });
  return [W, H, svg(W, H, body, { bg: C.paper2, blobs: [[1150, 860, 300, C.peach, 0.55]] })];
}

export function svcSocial() {
  const W = 1200,
    H = 900;
  let body = phone(190, 90, 340, 720, (sx, sy, sw, sh) =>
    reelScreen(sx, sy, sw, sh, { kind: "bottle", color: C.peach }),
  );
  body += phone(650, 150, 340, 700, (sx, sy, sw) => {
    let s =
      avatar(sx + 60, sy + 90, 36) +
      text(sx + 112, sy + 84, "12.4K", { size: 24, weight: 700 }) +
      text(sx + 112, sy + 108, "followers", { size: 16, fill: C.muted });
    s +=
      rect(sx + 24, sy + 140, sw - 48, 38, { fill: C.teal2, rx: 12 }) +
      text(sx + sw / 2, sy + 166, "Follow", {
        size: 18,
        weight: 700,
        fill: C.white,
        anchor: "middle",
      });
    const cols = [
      C.sun,
      C.mint,
      C.peach,
      C.tealInk,
      C.sunSoft,
      C.teal2,
      C.coralSoft,
      C.mint,
      C.sun,
    ];
    cols.forEach((col, i) => {
      const tx = sx + 6 + (i % 3) * ((sw - 12) / 3);
      const ty = sy + 200 + Math.floor(i / 3) * ((sw - 12) / 3) * 1.3;
      s += rect(tx, ty, (sw - 12) / 3 - 4, ((sw - 12) / 3) * 1.3 - 4, { fill: col });
      if (i % 2 === 0) s += play(tx + 22, ty + 20, 14, C.white);
    });
    return s;
  });
  body += pillSvg(70, 620, "Reach +212%", { bg: C.sun, size: 26 });
  body += pillSvg(760, 70, "Reels · Shorts · Carousels", { bg: C.white, size: 20 });
  return [
    W,
    H,
    svg(W, H, body, {
      blobs: [
        [120, 120, 300, C.peach, 0.6],
        [1120, 820, 320, C.mint],
      ],
    }),
  ];
}

export function svcInfluencer() {
  const W = 1200,
    H = 900;
  const creators = [
    [90, 150, "@foodie.amd", "48K", "Ahmedabad · Food", C.peach],
    [450, 100, "@glowwithriya", "220K", "Beauty", C.mint],
    [810, 160, "@techbyrohan", "12K", "Tech · Gujarati", C.sun],
  ];
  let body = "";
  creators.forEach(([x, y, handle, f, tag, col], i) => {
    body += card(x, y, 300, 420, { rx: 28, stroke: i === 1 ? C.teal2 : undefined });
    body += avatar(x + 150, y + 110, 64, col, C.teal);
    body += text(x + 150, y + 220, handle, { size: 24, weight: 700, anchor: "middle" });
    body +=
      text(x + 150, y + 280, f, { size: 48, weight: 700, anchor: "middle" }) +
      text(x + 150, y + 310, "followers", { size: 18, fill: C.muted, anchor: "middle" });
    const [p, pw] = pill(0, 0, tag, { bg: C.paper2, size: 18, padX: 14 });
    body += pillSvg(x + 150 - pw / 2, y + 340, tag, { bg: C.paper2, size: 18, padX: 14 });
    void p;
    if (i === 1)
      body += pillSvg(x + 80, y - 26, "Best audience fit", {
        bg: C.teal2,
        fg: C.white,
        size: 16,
        padX: 14,
      });
  });
  body += card(90, 640, 1020, 180, { fill: C.tealInk, rx: 28 });
  [
    ["Clicks", "18.2K"],
    ["Code uses", "2,140"],
    ["Sales", "₹14.6L"],
  ].forEach(([l, v], i) => {
    body +=
      text(140 + i * 250, 700, l, { size: 20, fill: C.white, opacity: 0.65 }) +
      text(140 + i * 250, 760, v, { size: 46, weight: 700, fill: C.white });
  });
  body += barChart(880, 680, 190, 110, [0.3, 0.45, 0.4, 0.7, 0.95], { colors: [C.sun] });
  return [W, H, svg(W, H, body, { bg: C.sunSoft, blobs: [[600, 60, 260, C.peach, 0.5]] })];
}

export function svcPerformance() {
  const W = 1200,
    H = 900;
  const body = browser(
    70,
    70,
    1060,
    760,
    (bx, by, bw) => {
      let s =
        kpi(bx + 40, by + 40, 300, "ROAS", "3.4×", "+0.6") +
        kpi(bx + 370, by + 40, 300, "CAC", "₹412", "−18%") +
        kpi(bx + 700, by + 40, 320, "Qualified leads", "1,284", "+42%");
      s += card(bx + 40, by + 230, bw - 80, 420, { rx: 22, shadow: 0.06 });
      s += text(bx + 76, by + 290, "Revenue from ads", { size: 24, weight: 700 });
      ["Meta", "Google", "YouTube"].forEach(
        (ch, i) =>
          (s += pillSvg(bx + 560 + i * 140, by + 258, ch, {
            bg: i === 0 ? C.sun : C.paper2,
            size: 18,
            padX: 18,
          })),
      );
      s += lineChart(
        bx + 76,
        by + 340,
        bw - 160,
        260,
        [0.12, 0.2, 0.18, 0.34, 0.42, 0.4, 0.58, 0.66, 0.8, 0.9],
        { color: C.teal2 },
      );
      s += lineChart(
        bx + 76,
        by + 340,
        bw - 160,
        260,
        [0.1, 0.14, 0.15, 0.2, 0.22, 0.25, 0.28, 0.3, 0.32, 0.35],
        { color: C.lineDark, area: false, sw: 4, dots: false },
      );
      return s;
    },
    { url: "ads dashboard · last 90 days" },
  );
  return [
    W,
    H,
    svg(W, H, body, {
      blobs: [
        [1100, 80, 260, C.mint],
        [100, 860, 260, C.sunSoft],
      ],
    }),
  ];
}

export function svcEcommerce() {
  const W = 1200,
    H = 900;
  let body = phone(110, 80, 380, 760, (sx, sy, sw) => {
    let s =
      rect(sx, sy, sw, 150, { fill: C.teal2 }) +
      text(sx + 24, sy + 62, "Delivery in", { size: 20, fill: C.white, opacity: 0.85 }) +
      text(sx + 24, sy + 100, "10 minutes", { size: 34, weight: 700, fill: C.white });
    s +=
      rect(sx + 20, sy + 168, sw - 40, 46, { fill: C.paper2, rx: 23 }) +
      text(sx + 46, sy + 198, "Search products", { size: 18, fill: C.muted });
    const items = [
      ["bottle", C.peach, "₹249"],
      ["jar", C.sun, "₹399"],
      ["pouch", C.mint, "₹179"],
      ["box", C.coralSoft, "₹549"],
    ];
    items.forEach(
      ([k, col, p], i) =>
        (s += productTile(
          sx + 18 + (i % 2) * ((sw - 50) / 2 + 14),
          sy + 236 + Math.floor(i / 2) * 230,
          (sw - 50) / 2,
          k,
          col,
          p,
        )),
    );
    return s;
  });
  body += card(560, 120, 560, 430, { rx: 30 });
  body +=
    rect(590, 150, 220, 220, { fill: C.paper2, rx: 20 }) + product("jar", 625, 175, 150, C.teal2);
  body +=
    text(840, 190, "Cold-pressed", { size: 26, weight: 700 }) +
    text(840, 224, "groundnut oil, 1L", { size: 26, weight: 700 });
  body += stars(840, 262, 4) + text(1000, 270, "4.6 (2,310)", { size: 18, fill: C.muted });
  body +=
    text(840, 330, "₹499", { size: 40, weight: 700 }) +
    text(950, 330, "₹649", { size: 22, fill: C.muted });
  body +=
    rect(590, 410, 500, 64, { fill: C.sun, rx: 32 }) +
    text(840, 452, "Add to cart", { size: 24, weight: 700, anchor: "middle" });
  body += bars(590, 500, 460, 1, { h: 10 });
  [
    ["Marketplaces", C.white],
    ["Quick commerce", C.white],
    ["Shopify", C.white],
  ].forEach(([l, bg], i) => (body += pillSvg(560 + [0, 200, 420][i], 620, l, { bg, size: 20 })));
  body +=
    card(560, 700, 560, 130, { fill: C.tealInk, rx: 26 }) +
    text(600, 760, "Sell-through this week", { size: 22, fill: C.white, opacity: 0.7 }) +
    text(600, 806, "94%", { size: 42, weight: 700, fill: C.sun }) +
    barChart(820, 730, 260, 80, [0.5, 0.62, 0.7, 0.66, 0.84, 0.94], { colors: [C.mint] });
  return [W, H, svg(W, H, body, { bg: C.tealSoft, blobs: [[1150, 80, 220, C.sunSoft]] })];
}

export function svcSEO() {
  const W = 1200,
    H = 900;
  let body = browser(
    70,
    70,
    1060,
    640,
    (bx, by, bw) => {
      let s =
        rect(bx + 40, by + 34, bw - 80, 64, { fill: C.white, rx: 32, stroke: C.line }) +
        circle(bx + 78, by + 66, 12, { fill: "none", stroke: C.muted, sw: 4 }) +
        text(bx + 104, by + 74, "best d2c brand agency in ahmedabad", { size: 24, fill: C.ink2 });
      s +=
        card(bx + 40, by + 128, bw - 80, 250, { fill: C.tealSoft, rx: 22, shadow: 0.04 }) +
        sparkle(bx + 80, by + 168, 30, C.teal2) +
        text(bx + 106, by + 178, "AI Overview", { size: 22, weight: 700, fill: C.teal });
      s +=
        rect(bx + 76, by + 210, 240, 40, { fill: C.sun, rx: 10 }) +
        text(bx + 92, by + 238, "Upsure Media", { size: 24, weight: 700 }) +
        text(bx + 328, by + 238, "is a full-service brand and growth", { size: 24, fill: C.ink2 });
      s +=
        text(bx + 76, by + 282, "agency in Ahmedabad for D2C and B2B brands…", {
          size: 24,
          fill: C.ink2,
        }) + bars(bx + 76, by + 310, 760, 2, { gap: 26, h: 12, fill: C.mint });
      [0, 1, 2].forEach((i) => {
        const y = by + 410 + i * 62;
        s +=
          bars(bx + 40, y, 260, 1, { h: 10, fill: C.teal2 }) +
          bars(bx + 40, y + 24, 760, 1, { h: 10 });
      });
      return s;
    },
    { url: "search" },
  );
  body += chatBubble(640, 620, 450, ["Which agency should we hire", "for quick commerce?"], {
    bg: C.white,
    tail: "right",
  });
  body += chatBubble(560, 740, 520, ["Upsure Media in Ahmedabad handles…"], {
    bg: C.tealInk,
    fg: C.white,
  });
  body += pillSvg(110, 760, "Rank · Answer · Get cited", { bg: C.sun, size: 22 });
  return [
    W,
    H,
    svg(W, H, body, {
      blobs: [
        [100, 100, 260, C.mint],
        [1100, 860, 260, C.sunSoft],
      ],
    }),
  ];
}

export function svcAI() {
  const W = 1200,
    H = 900;
  let body = card(100, 80, 620, 740, { rx: 30 });
  body +=
    rect(100, 80, 620, 100, { fill: C.tealInk, rx: 30 }) +
    rect(100, 140, 620, 40, { fill: C.tealInk });
  body +=
    circle(160, 130, 26, { fill: C.sun }) +
    sparkle(160, 130, 26, C.tealInk) +
    text(204, 124, "Support assistant", { size: 24, weight: 700, fill: C.white }) +
    circle(212, 150, 6, { fill: C.mint }) +
    text(226, 157, "Online · replies instantly", { size: 16, fill: C.white, opacity: 0.75 });
  body += chatBubble(140, 220, 400, ["Hi! How can I help today?"], { bg: C.paper2 });
  body += chatBubble(300, 330, 380, ["Where is my order #4521?"], {
    bg: C.teal2,
    fg: C.white,
    tail: "right",
  });
  body += chatBubble(140, 440, 470, ["It's out for delivery and", "arrives by 6 pm today."], {
    bg: C.paper2,
  });
  [
    ["Track order", 140],
    ["Return", 330],
    ["Talk to a person", 450],
  ].forEach(
    ([l, x]) => (body += pillSvg(x, 610, l, { bg: C.white, size: 18, padX: 16, stroke: C.teal2 })),
  );
  body +=
    rect(140, 720, 540, 60, { fill: C.paper2, rx: 30 }) +
    text(170, 758, "Type a message…", { size: 20, fill: C.muted });
  const flow = ["New lead", "AI qualifies", "CRM updated", "Sales follow-up"];
  flow.forEach((l, i) => {
    const y = 150 + i * 170;
    if (i) body += rect(948, y - 70, 4, 70, { fill: C.teal2 });
    body +=
      card(790, y, 320, 100, { fill: i === 1 ? C.sun : C.white, rx: 22 }) +
      (i === 1 ? sparkle(830, y + 50, 28, C.tealInk) : check(830, y + 50, 28)) +
      text(864, y + 59, l, { size: 24, weight: 700 });
  });
  return [
    W,
    H,
    svg(W, H, body, {
      blobs: [
        [1100, 860, 300, C.mint],
        [120, 860, 220, C.sunSoft],
      ],
    }),
  ];
}

/* Hero chips (shown small: bold and simple) --------------------------------------- */
export function heroSocial() {
  const W = 960,
    H = 540;
  let body = phone(330, 40, 230, 470, (sx, sy, sw, sh) =>
    reelScreen(sx, sy, sw, sh, { kind: "bottle", color: C.peach, likes: "48K" }),
  );
  body += heart(200, 150, 70) + heart(760, 120, 50, C.sun) + heart(720, 380, 60);
  body += pillSvg(600, 300, "+212% reach", { bg: C.sun, size: 34 });
  return [W, H, svg(W, H, body, { bg: C.peach, blobs: [[120, 460, 240, C.sunSoft]] })];
}

export function heroCommerce() {
  const W = 960,
    H = 540;
  let body = "";
  [
    ["bottle", C.peach, "₹249"],
    ["jar", C.sun, "₹399"],
    ["pouch", C.white, "₹179"],
  ].forEach(([k, col, p], i) => (body += productTile(110 + i * 250, 110, 210, k, col, p)));
  body += pillSvg(640, 40, "10 min", { bg: C.tealInk, fg: C.sun, size: 40 });
  return [W, H, svg(W, H, body, { bg: C.mint, blobs: [[820, 480, 220, C.sunSoft]] })];
}

export function heroGrowth() {
  const W = 1000,
    H = 700;
  let body =
    text(80, 150, "ROAS", { size: 40, weight: 600, fill: C.white, opacity: 0.7 }) +
    text(80, 250, "3.4×", { size: 120, weight: 700, fill: C.white });
  body += arrowUp(420, 200, 70, C.sun);
  body += lineChart(80, 330, 840, 300, [0.1, 0.16, 0.14, 0.3, 0.38, 0.36, 0.55, 0.68, 0.85, 0.96], {
    color: C.sun,
    sw: 10,
  });
  return [W, H, svg(W, H, body, { bg: C.tealInk, blobs: [[900, 120, 240, C.teal2, 0.6]] })];
}

/* Work covers: category of work, no client brand marks ------------------------------ */
export function workEyewear() {
  const W = 1600,
    H = 1100;
  let body = product("glasses", 560, 120, 480, C.ink);
  body += phone(
    150,
    300,
    300,
    620,
    (sx, sy, sw, sh) =>
      rect(sx, sy, sw, sh, { fill: C.peach }) +
      product("glasses", sx + 40, sy + 160, sw - 80, C.ink) +
      bars(sx + 30, sy + sh - 160, sw - 80, 2, { fill: C.ink, h: 14, gap: 30 }).replace(
        /fill="#0b0d10"/g,
        'fill="#0b0d10" fill-opacity="0.3"',
      ) +
      rect(sx + 30, sy + sh - 90, 150, 46, { fill: C.ink, rx: 23 }),
  );
  body +=
    card(560, 560, 420, 420, { rx: 28 }) +
    rect(580, 580, 380, 260, { fill: C.mint, rx: 18 }) +
    product("glasses", 640, 640, 260, C.ink) +
    bars(580, 870, 300, 2, { gap: 28, h: 14 });
  body +=
    card(1060, 380, 420, 600, { fill: C.tealInk, rx: 28 }) +
    product("glasses", 1110, 520, 320, C.sun) +
    text(1110, 820, "New collection", { size: 40, weight: 700, fill: C.white }) +
    bars(1110, 860, 280, 2, { fill: C.white, gap: 30, h: 14 }).replace(
      /fill="#ffffff"/g,
      'fill="#ffffff" fill-opacity="0.4"',
    );
  body += pillSvg(150, 200, "Feed · Story · Store", { bg: C.white, size: 28 });
  return [W, H, svg(W, H, body, { bg: C.sun, blobs: [[1400, 160, 320, C.sunSoft, 0.8]] })];
}

export function workAuto() {
  const W = 1600,
    H = 1100;
  let body = "";
  [
    [160, 220, C.tealInk],
    [610, 140, C.teal2],
    [1060, 240, C.ink2],
  ].forEach(([x, y, bg], i) => {
    body += phone(
      x,
      y,
      360,
      740,
      (sx, sy, sw, sh) =>
        rect(sx, sy, sw, sh, { fill: bg }) +
        car(sx + 30, sy + sh * 0.3, sw - 60, [C.sun, C.white, C.peach][i]) +
        play(sx + sw / 2, sy + sh * 0.22, 40, C.white) +
        bars(sx + 30, sy + sh - 140, sw - 120, 3, { fill: "#ffffff", gap: 26, h: 12 }).replace(
          /fill="#ffffff"/g,
          'fill="#ffffff" fill-opacity="0.6"',
        ),
    );
  });
  body += pillSvg(620, 60, "Launch day", { bg: C.sun, size: 32 });
  return [W, H, svg(W, H, body, { bg: C.tealInk, blobs: [[800, 1000, 420, C.teal2, 0.5]] })];
}

export function workTech() {
  const W = 1600,
    H = 1100;
  let body = product("smartphone", 160, 180, 560, C.teal2);
  body += sparkle(700, 220, 70, C.sun);
  const cols = [C.sun, C.peach, C.white, C.tealInk, C.mint, C.coralSoft];
  cols.forEach((col, i) => {
    const x = 760 + (i % 3) * 250;
    const y = 200 + Math.floor(i / 3) * 360;
    body +=
      card(x, y, 220, 320, { fill: col, rx: 22 }) +
      product("smartphone", x + 50, y + 40, 120, i === 3 ? C.sun : C.teal2) +
      bars(x + 24, y + 210, 170, 2, { gap: 26, h: 12, fill: i === 3 ? C.teal2 : C.lineDark });
  });
  body += pillSvg(760, 100, "AI variants ×10", { bg: C.tealInk, fg: C.sun, size: 30 });
  return [W, H, svg(W, H, body, { bg: C.mint, blobs: [[300, 1000, 360, C.tealSoft]] })];
}

export function workSports() {
  const W = 1600,
    H = 1100;
  let body = "";
  [
    ["shoe", C.coral, "₹2,999"],
    ["bottle", C.teal2, "₹499"],
    ["ball", C.sun, "₹899"],
    ["shoe", C.tealInk, "₹3,499"],
  ].forEach(
    ([k, col, p], i) =>
      (body += productTile(140 + (i % 2) * 330, 140 + Math.floor(i / 2) * 420, 300, k, col, p)),
  );
  body +=
    card(860, 220, 600, 560, { rx: 30 }) +
    text(910, 300, "ROAS", { size: 30, fill: C.muted }) +
    text(910, 380, "4.1×", { size: 84, weight: 700 });
  body += lineChart(910, 430, 500, 280, [0.15, 0.22, 0.3, 0.28, 0.45, 0.6, 0.72, 0.9], {
    color: C.teal2,
    sw: 8,
  });
  body += pillSvg(860, 120, "Catalogue ads · 1,200 SKUs", { bg: C.white, size: 26 });
  return [W, H, svg(W, H, body, { bg: C.peach, blobs: [[1500, 1000, 360, C.sunSoft, 0.7]] })];
}

export function websiteBefore() {
  const W = 1600,
    H = 1000;
  const body = browser(
    100,
    80,
    1400,
    840,
    (bx, by, bw) => {
      let s = rect(bx, by, bw, 70, { fill: "#d9d9d9" });
      for (let i = 0; i < 8; i++)
        s += rect(bx + 30 + i * 150, by + 25, 120, 20, { fill: "#bdbdbd", rx: 2 });
      for (let r = 0; r < 3; r++)
        for (let c = 0; c < 4; c++)
          s +=
            rect(bx + 30 + c * 340, by + 100 + r * 220, 320, 200, {
              fill: ["#e5e5e5", "#cfcfcf", "#dedede"][(r + c) % 3],
              rx: 2,
            }) +
            bars(bx + 50 + c * 340, by + 230 + r * 220, 260, 2, {
              fill: "#b5b5b5",
              h: 10,
              gap: 20,
            });
      return s;
    },
    { url: "before", bar: "#e0e0e0" },
  );
  return [W, H, svg(W, H, body, { bg: "#ececec" })];
}

export function websiteAfter() {
  const W = 1600,
    H = 1000;
  const body = browser(
    100,
    80,
    1400,
    840,
    (bx, by) => {
      let s =
        text(bx + 60, by + 80, "brand.", { size: 34, weight: 700 }) +
        ["Shop", "Story", "Reviews"]
          .map((l, i) => text(bx + 900 + i * 130, by + 78, l, { size: 22, fill: C.ink2 }))
          .join("") +
        rect(bx + 1240, by + 48, 120, 46, { fill: C.sun, rx: 23 });
      s +=
        text(bx + 60, by + 260, "Made for", { size: 92, weight: 700, ls: -3 }) +
        text(bx + 60, by + 360, "everyday", { size: 92, weight: 700, ls: -3, fill: C.teal2 });
      s +=
        bars(bx + 60, by + 410, 520, 2, { gap: 28, h: 14 }) +
        rect(bx + 60, by + 490, 240, 66, { fill: C.ink, rx: 33 }) +
        text(bx + 180, by + 532, "Shop now", {
          size: 24,
          weight: 700,
          fill: C.white,
          anchor: "middle",
        });
      s +=
        rect(bx + 760, by + 150, 560, 560, { fill: C.mint, rx: 40 }) +
        product("jar", bx + 900, by + 260, 280, C.teal2);
      s +=
        stars(bx + 60, by + 640, 5, 30) +
        text(bx + 240, by + 650, "4.8 from 12,000+ reviews", { size: 22, fill: C.muted });
      return s;
    },
    { url: "after" },
  );
  return [W, H, svg(W, H, body, { blobs: [[1500, 100, 300, C.sunSoft]] })];
}

/* Insights covers ---------------------------------------------------------------- */
export function postAIGrowth() {
  const W = 1600,
    H = 1000;
  let body =
    card(140, 140, 760, 720, { rx: 32 }) +
    text(200, 230, "Growth engine", { size: 40, weight: 700 });
  body +=
    kpi(200, 280, 300, "Hours saved", "38/wk", "+AI") +
    kpi(540, 280, 300, "Variants", "20×", "+18");
  body += lineChart(200, 500, 640, 300, [0.1, 0.2, 0.26, 0.4, 0.5, 0.62, 0.8, 0.92], {
    color: C.teal2,
  });
  [
    [1050, 220, 120],
    [1300, 380, 80],
    [1120, 620, 150],
    [1380, 760, 60],
  ].forEach(([x, y, s]) => (body += sparkle(x, y, s, C.sun)));
  return [W, H, svg(W, H, body, { bg: C.tealInk, blobs: [[1300, 500, 400, C.teal2, 0.6]] })];
}

export function postPositioning() {
  const W = 1600,
    H = 1000;
  let body =
    card(300, 110, 1000, 780, { rx: 32 }) +
    rect(800, 160, 3, 680, { fill: C.line }) +
    rect(350, 500, 900, 3, { fill: C.line });
  body +=
    text(800, 150, "Premium", { size: 22, fill: C.muted, anchor: "middle" }) +
    text(800, 870, "Value", { size: 22, fill: C.muted, anchor: "middle" }) +
    text(340, 490, "Mass", { size: 22, fill: C.muted }) +
    text(1260, 490, "Niche", { size: 22, fill: C.muted, anchor: "end" });
  [
    [480, 620],
    [560, 700],
    [640, 600],
    [520, 420],
    [700, 680],
    [600, 300],
  ].forEach(([x, y]) => (body += circle(x, y, 26, { fill: C.lineDark })));
  body +=
    circle(1060, 280, 46, { fill: C.teal2 }) +
    text(1060, 360, "Your brand", { size: 26, weight: 700, anchor: "middle" });
  body +=
    sticky(80, 160, 200, 120, "Who for?", C.sun) + sticky(1320, 640, 200, 120, "Why us?", C.peach);
  return [W, H, svg(W, H, body, { bg: C.mint })];
}

export function postContent() {
  const W = 1600,
    H = 1000;
  let body =
    card(140, 120, 1320, 760, { rx: 32 }) +
    text(200, 210, "Content calendar", { size: 40, weight: 700 });
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  days.forEach((d, i) => (body += text(220 + i * 175, 280, d, { size: 22, fill: C.muted })));
  const cols = [C.sun, C.mint, C.peach, C.tealSoft, C.sunSoft];
  const labels = ["Reel", "Carousel", "Story", "Blog", "Podcast", "Live", "UGC"];
  for (let r = 0; r < 4; r++)
    for (let c = 0; c < 7; c++) {
      if ((r * 3 + c * 2) % 5 === 4) continue;
      body +=
        rect(200 + c * 175, 310 + r * 135, 155, 110, { fill: cols[(r + c) % 5], rx: 16 }) +
        text(220 + c * 175, 355 + r * 135, labels[(r * 2 + c) % 7], { size: 20, weight: 600 });
    }
  return [W, H, svg(W, H, body, { bg: C.peach })];
}

export function postCompass() {
  const W = 1600,
    H = 1000;
  let body = "";
  for (let i = 0; i < 9; i++)
    body += `<path d="M0,${110 * i + 40} C400,${110 * i - 20} 1200,${110 * i + 100} 1600,${110 * i + 30}" stroke="${C.white}" stroke-width="2" fill="none" opacity="0.18"/>`;
  body +=
    circle(800, 500, 330, { fill: C.white }) +
    circle(800, 500, 300, { fill: C.paper, stroke: C.line, sw: 4 });
  ["N", "E", "S", "W"].forEach((l, i) => {
    const a = (i * Math.PI) / 2;
    body += text(800 + Math.sin(a) * 250, 500 - Math.cos(a) * 250 + 14, l, {
      size: 40,
      weight: 700,
      anchor: "middle",
      fill: C.muted,
    });
  });
  body +=
    `<path d="M800,250 L840,500 L800,520 L760,500 Z" fill="${C.coral}"/><path d="M800,750 L840,500 L800,480 L760,500 Z" fill="${C.ink2}"/>` +
    circle(800, 500, 20, { fill: C.sun });
  return [W, H, svg(W, H, body, { bg: C.tealInk })];
}

export function postQuickCommerce() {
  const W = 1600,
    H = 1000;
  let body = phone(180, 90, 380, 820, (sx, sy, sw) => {
    let s =
      rect(sx, sy, sw, 140, { fill: C.teal2 }) +
      text(sx + 24, sy + 96, "10 minutes", { size: 34, weight: 700, fill: C.white });
    [
      ["bottle", C.peach, "₹249"],
      ["jar", C.sun, "₹399"],
      ["pouch", C.mint, "₹179"],
      ["box", C.coralSoft, "₹549"],
    ].forEach(
      ([k, col, p], i) =>
        (s += productTile(
          sx + 18 + (i % 2) * ((sw - 50) / 2 + 14),
          sy + 170 + Math.floor(i / 2) * 230,
          (sw - 50) / 2,
          k,
          col,
          p,
        )),
    );
    return s;
  });
  body += card(680, 150, 760, 700, { fill: C.tealSoft, rx: 32, shadow: 0.06 });
  for (let i = 0; i < 6; i++)
    body += `<path d="M${700 + i * 120},170 L${760 + i * 110},830" stroke="${C.white}" stroke-width="10" opacity="0.8"/>`;
  [
    [820, 340, "Ahmedabad"],
    [1080, 280, "Surat"],
    [960, 560, "Vadodara"],
    [1260, 640, "Mumbai"],
  ].forEach(
    ([x, y, l], i) =>
      (body +=
        pin(x, y, 70, i === 0 ? C.coral : C.teal2) +
        text(x, y + 40, l, { size: 24, weight: 700, anchor: "middle" })),
  );
  body += pillSvg(720, 760, "City-by-city launch", { bg: C.sun, size: 26 });
  return [W, H, svg(W, H, body, { bg: C.mint })];
}

export function postGEO() {
  const W = 1600,
    H = 1000;
  let body = chatBubble(
    560,
    150,
    820,
    ["Which brand agency in Ahmedabad", "should a D2C founder hire?"],
    { bg: C.white, tail: "right", size: 34 },
  );
  body +=
    card(220, 420, 1160, 440, { fill: C.white, rx: 32 }) +
    sparkle(290, 500, 50, C.teal2) +
    text(340, 515, "AI answer", { size: 30, weight: 700, fill: C.teal });
  body +=
    rect(290, 570, 300, 56, { fill: C.sun, rx: 14 }) +
    text(310, 610, "Upsure Media", { size: 34, weight: 700 }) +
    text(606, 610, "is a full-service brand and", { size: 34, fill: C.ink2 });
  body +=
    text(290, 670, "growth agency for D2C and B2B brands…", { size: 34, fill: C.ink2 }) +
    bars(290, 710, 980, 2, { gap: 34, h: 16, fill: C.mint });
  return [W, H, svg(W, H, body, { bg: C.tealInk, blobs: [[200, 200, 300, C.teal2, 0.6]] })];
}

/* Pages ------------------------------------------------------------------------- */
export function servicesOverview() {
  const W = 1600,
    H = 900;
  const groups = [
    [
      "Build the brand",
      ["Brand Consulting", "Branding & Design", "Personal Branding", "PR & Media"],
      C.sun,
    ],
    [
      "Grow demand",
      ["Social Media Marketing", "Influencer Marketing", "Performance Marketing", "SEO, AEO & GEO"],
      C.mint,
    ],
    ["Sell and scale", ["E-commerce & Quick Commerce", "AI Solutions"], C.peach],
  ];
  let body = "";
  groups.forEach(([g, items, col], gi) => {
    const x = 90 + gi * 490;
    body +=
      card(x, 110, 450, 680, { rx: 32 }) +
      rect(x + 30, 140, 390, 70, { fill: col, rx: 20 }) +
      text(x + 56, 186, g, { size: 28, weight: 700 });
    items.forEach(
      (it, i) =>
        (body +=
          check(x + 64, 280 + i * 110, 30) +
          text(x + 96, 291 + i * 110, it, { size: it.length > 20 ? 22 : 26, weight: 600 })),
    );
  });
  return [
    W,
    H,
    svg(W, H, body, {
      blobs: [
        [1500, 820, 320, C.sunSoft],
        [100, 100, 260, C.mint],
      ],
    }),
  ];
}

export function approachDiscover() {
  const W = 1200,
    H = 900;
  let body =
    card(160, 120, 640, 660, { rx: 30 }) + text(210, 200, "Brand audit", { size: 40, weight: 700 });
  [
    "Brand & positioning",
    "Website & listings",
    "Ads & channels",
    "Numbers & margins",
    "Competitors",
  ].forEach(
    (l, i) => (body += check(230, 270 + i * 90, 30) + text(266, 280 + i * 90, l, { size: 28 })),
  );
  body +=
    circle(860, 560, 170, { fill: "none", stroke: C.tealInk, sw: 34 }) +
    circle(860, 560, 150, { fill: C.tealSoft, opacity: 0.6 }) +
    `<path d="M985,690 L1110,815" stroke="${C.tealInk}" stroke-width="44" stroke-linecap="round"/>`;
  return [W, H, svg(W, H, body, { bg: C.sunSoft })];
}

export function oneTeamPlan() {
  const W = 1000,
    H = 1250;
  const nodes = [
    ["Brand", 500, 150, C.sun],
    ["Content", 820, 380, C.mint],
    ["Media", 760, 860, C.peach],
    ["PR", 240, 860, C.sunSoft],
    ["AI", 180, 380, C.tealSoft],
  ];
  let body = "";
  nodes.forEach(
    ([, x, y]) =>
      (body += `<path d="M500,600 L${x},${y}" stroke="${C.teal2}" stroke-width="6" stroke-dasharray="14 12"/>`),
  );
  body +=
    card(300, 470, 400, 260, { fill: C.tealInk, rx: 36 }) +
    text(500, 580, "One plan", { size: 52, weight: 700, fill: C.white, anchor: "middle" }) +
    text(500, 640, "Shared targets", { size: 28, fill: C.sun, anchor: "middle" });
  nodes.forEach(([l, x, y, col]) => {
    const [, w] = pill(0, 0, l, { size: 34, padX: 34 });
    body +=
      card(x - w / 2, y - 40, w, 80, { fill: col, rx: 40, shadow: 0.1 }) +
      text(x, y + 12, l, { size: 34, weight: 700, anchor: "middle" });
  });
  body += pillSvg(320, 1060, "One team, one plan", { bg: C.white, size: 32 });
  return [W, H, svg(W, H, body, { blobs: [[500, 600, 380, C.mint, 0.5]] })];
}

export function faqChat() {
  const W = 1000,
    H = 1250;
  let body = chatBubble(120, 160, 640, ["How long does a project take?"], {
    bg: C.white,
    size: 30,
  });
  body += chatBubble(
    240,
    330,
    640,
    ["4–6 weeks for a brand identity.", "Packaging adds 2–4 weeks."],
    { bg: C.tealInk, fg: C.white, tail: "right", size: 30 },
  );
  body += chatBubble(120, 560, 640, ["Do you also execute the plan?"], { bg: C.white, size: 30 });
  body += chatBubble(240, 730, 640, ["Yes. Strategy to launch,", "one team in-house."], {
    bg: C.tealInk,
    fg: C.white,
    tail: "right",
    size: 30,
  });
  body += pillSvg(120, 1010, "Questions? Ask us.", { bg: C.sun, size: 34 });
  return [W, H, svg(W, H, body, { bg: C.tealSoft })];
}

export function industryD2C() {
  const W = 1600,
    H = 900;
  let body = phone(140, 70, 360, 760, (sx, sy, sw) => {
    let s =
      text(sx + 28, sy + 90, "brand.", { size: 34, weight: 700 }) +
      rect(sx + 20, sy + 120, sw - 40, 250, { fill: C.peach, rx: 20 }) +
      product("bottle", sx + sw / 2 - 70, sy + 150, 140, C.teal2);
    s +=
      text(sx + 28, sy + 420, "Daily face wash", { size: 26, weight: 700 }) +
      stars(sx + 28, sy + 456, 5, 22) +
      rect(sx + 20, sy + 500, sw - 40, 60, { fill: C.sun, rx: 30 }) +
      text(sx + sw / 2, sy + 540, "Buy now", { size: 24, weight: 700, anchor: "middle" });
    return s;
  });
  body +=
    product("box", 600, 470, 240, C.sun) +
    product("box", 780, 520, 190, C.peach) +
    product("pouch", 950, 500, 200, C.white);
  body +=
    card(1120, 150, 380, 300, { fill: C.tealInk, rx: 30 }) +
    text(1160, 230, "Website", { size: 24, fill: C.white, opacity: 0.7 }) +
    text(1160, 280, "Marketplaces", { size: 24, fill: C.white, opacity: 0.7 }) +
    text(1160, 330, "Quick commerce", { size: 24, fill: C.white, opacity: 0.7 }) +
    text(1160, 400, "One plan", { size: 40, weight: 700, fill: C.sun });
  body += pillSvg(620, 160, "Launch · Grow · Scale", { bg: C.white, size: 30 });
  return [W, H, svg(W, H, body, { bg: C.mint, blobs: [[1400, 800, 300, C.sunSoft]] })];
}

export function industryB2B() {
  const W = 1600,
    H = 900;
  let body =
    card(110, 120, 720, 460, { fill: C.tealInk, rx: 30 }) +
    text(160, 220, "Company profile", { size: 26, fill: C.sun }) +
    text(160, 300, "Look as strong", { size: 56, weight: 700, fill: C.white }) +
    text(160, 366, "as you are", { size: 56, weight: 700, fill: C.white }) +
    bars(160, 420, 500, 2, { fill: "#ffffff", h: 12, gap: 28 }).replace(
      /fill="#ffffff"/g,
      'fill="#ffffff" fill-opacity="0.35"',
    );
  body +=
    card(160, 620, 600, 200, { rx: 26 }) +
    avatar(220, 690, 36) +
    text(272, 684, "CEO, B2B company", { size: 22, weight: 700 }) +
    bars(272, 700, 300, 1, { h: 8 }) +
    bars(200, 740, 520, 2, { gap: 22, h: 10 });
  const steps = [
    ["Visitors", 520, C.mint],
    ["Qualified leads", 400, C.teal2],
    ["Meetings", 280, C.sun],
  ];
  steps.forEach(
    ([l, w, col], i) =>
      (body +=
        rect(1180 - w / 2, 170 + i * 200, w, 150, { fill: col, rx: 24 }) +
        text(1180, 260 + i * 200, l, {
          size: 30,
          weight: 700,
          anchor: "middle",
          fill: i === 1 ? C.white : C.ink,
        })),
  );
  return [W, H, svg(W, H, body, { bg: C.paper2, blobs: [[1500, 100, 260, C.sunSoft]] })];
}

/* Studio scenes (what the team does) ------------------------------------------------- */
export function sceneWorkshop() {
  const W = 1600,
    H = 900;
  let body = card(180, 90, 1240, 560, { rx: 30 });
  const cols = [C.sun, C.mint, C.peach, C.sunSoft, C.tealSoft];
  for (let c = 0; c < 5; c++) {
    body += text(
      240 + c * 235,
      160,
      ["Audience", "Positioning", "Channels", "Launch", "Targets"][c],
      { size: 24, weight: 700, fill: C.muted },
    );
    for (let r = 0; r < 3; r++)
      if ((r + c) % 4 !== 3)
        body +=
          rect(230 + c * 235, 190 + r * 140, 200, 115, { fill: cols[(c + r) % 5], rx: 12 }) +
          bars(250 + c * 235, 220 + r * 140, 150, 2, { fill: C.ink, h: 9, gap: 20 }).replace(
            /fill="#0b0d10"/g,
            'fill="#0b0d10" fill-opacity="0.2"',
          );
  }
  [
    [360, C.peach],
    [620, C.mint],
    [880, C.sun],
    [1140, C.tealSoft],
  ].forEach(([x, col]) => (body += avatar(x, 770, 82, col, C.teal)));
  return [W, H, svg(W, H, body, { bg: C.paper2 })];
}

export function sceneShoot() {
  const W = 1600,
    H = 900;
  let body =
    circle(420, 360, 190, { fill: "none", stroke: C.white, sw: 26 }) +
    rect(408, 550, 24, 300, { fill: C.ink2 });
  body += phone(340, 260, 160, 300, (sx, sy, sw, sh) =>
    reelScreen(sx, sy, sw, sh, { kind: "jar", color: C.sun, likes: "" }),
  );
  body +=
    card(760, 300, 260, 180, { fill: C.ink, rx: 30 }) +
    circle(890, 390, 60, { fill: C.ink2, stroke: C.lineDark, sw: 10 }) +
    rect(800, 270, 80, 40, { fill: C.ink, rx: 10 }) +
    rect(878, 480, 24, 380, { fill: C.ink2 });
  body +=
    rect(1100, 560, 380, 30, { fill: C.white, rx: 15 }) +
    product("jar", 1160, 360, 200, C.teal2) +
    product("bottle", 1320, 380, 180, C.peach);
  body += pillSvg(1080, 120, "Shoot day · Reels", { bg: C.sun, size: 30 });
  return [W, H, svg(W, H, body, { bg: C.tealInk, blobs: [[420, 360, 260, C.teal2, 0.5]] })];
}

export function sceneReview() {
  const W = 1600,
    H = 900;
  let body =
    card(140, 120, 600, 440, { fill: C.peach, rx: 26 }) +
    product("box", 300, 200, 280, C.white) +
    text(440, 520, "Option A", { size: 26, weight: 700, anchor: "middle" });
  body +=
    card(820, 120, 600, 440, { fill: C.mint, rx: 26 }) +
    product("pouch", 990, 200, 260, C.white) +
    text(1120, 520, "Option B", { size: 26, weight: 700, anchor: "middle" });
  body += circle(1360, 150, 50, { fill: C.teal2 }) + check(1360, 150, 46, C.white);
  body +=
    card(520, 610, 560, 230, { fill: C.ink, rx: 22 }) +
    rect(540, 630, 520, 170, { fill: C.paper, rx: 10 }) +
    bars(570, 660, 300, 3, { gap: 34, h: 14 });
  return [W, H, svg(W, H, body, { bg: C.sunSoft })];
}

export function scenePresent() {
  const W = 1600,
    H = 900;
  let body =
    card(200, 80, 1200, 560, { fill: C.ink, rx: 24 }) +
    rect(224, 104, 1152, 512, { fill: C.white, rx: 12 });
  body +=
    text(280, 190, "Monthly report", { size: 42, weight: 700 }) +
    kpi(280, 230, 330, "ROAS", "3.4×", "+0.6") +
    kpi(640, 230, 330, "Leads", "1,284", "+42%");
  body +=
    lineChart(1010, 260, 310, 300, [0.2, 0.3, 0.45, 0.5, 0.7, 0.9], { color: C.teal2 }) +
    bars(280, 430, 690, 4, { gap: 34, h: 14 });
  [
    [420, C.peach],
    [700, C.mint],
    [980, C.sun],
    [1260, C.tealSoft],
  ].forEach(([x, col]) => (body += avatar(x, 790, 80, col, C.teal)));
  return [W, H, svg(W, H, body, { bg: C.paper2 })];
}

export function sceneCalendar() {
  return postContent();
}

export function sceneValues() {
  const W = 1600,
    H = 900;
  const vals = [
    ["No egos. Just experts.", 140, 170, C.sun],
    ["Curiosity first", 780, 120, C.mint],
    ["Clear communication", 260, 360, C.white],
    ["Craft and outcomes", 860, 330, C.peach],
    ["People before process", 420, 560, C.tealSoft],
    ["Commercially focused", 980, 560, C.sun],
  ];
  let body = "";
  vals.forEach(([l, x, y, col]) => (body += pillSvg(x, y, l, { bg: col, size: 40, padX: 40 })));
  [
    [300, C.peach],
    [620, C.mint],
    [940, C.sun],
    [1260, C.tealSoft],
  ].forEach(([x, col]) => (body += avatar(x, 800, 70, col, C.teal)));
  return [W, H, svg(W, H, body, { bg: C.tealInk, blobs: [[800, 450, 400, C.teal2, 0.55]] })];
}

/** Team member card: initial and role until real photos arrive. */
export function memberCard(name, role, bg) {
  const W = 800,
    H = 1000;
  let body = text(400, 560, name[0], {
    size: 420,
    weight: 700,
    anchor: "middle",
    fill: C.ink,
    opacity: 0.9,
  });
  body += pillSvg(400 - (role.length * 34 * 0.56 + 68) / 2, 760, role, {
    bg: C.white,
    size: 34,
    padX: 34,
  });
  return [W, H, svg(W, H, body, { bg, blobs: [[650, 150, 220, C.white, 0.5]] })];
}

export function ogCard() {
  const W = 1200,
    H = 630;
  let body = `<text x="80" y="130" font-family="Segoe UI, Arial, sans-serif" font-size="64" font-weight="700" fill="${C.white}" letter-spacing="-2">upsure<tspan fill="${C.teal2}">.</tspan></text>`;
  body +=
    text(80, 300, "D2C & B2B Brand and", { size: 62, weight: 700, fill: C.white }) +
    text(80, 378, "Growth Agency in Ahmedabad", { size: 62, weight: 700, fill: C.white });
  body += pillSvg(80, 450, "We grow brands people love", { bg: C.sun, size: 30 });
  body += text(80, 580, "upsuremedia.com", { size: 26, fill: C.white, opacity: 0.6 });
  return [W, H, svg(W, H, body, { bg: C.tealInk, blobs: [[1050, 120, 260, C.teal2, 0.6]] })];
}
