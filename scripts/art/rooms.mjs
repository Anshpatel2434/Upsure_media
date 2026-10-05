/**
 * Studio still-life scenes, one function per image. Each returns
 * [width, height, svg]. "nava." is the fictional D2C brand used across them.
 */
import {
  C,
  begin,
  board,
  bottle,
  box,
  camera,
  chartScreen,
  chatScreen,
  circle,
  cylFill,
  end,
  faceFill,
  flat,
  floatCard,
  frame,
  g,
  glare,
  heart,
  jar,
  kraftBox,
  laptop,
  lin,
  lines,
  mic,
  monitor,
  mug,
  notebook,
  path,
  pencil,
  phone,
  plant,
  pouch,
  profileScreen,
  rad,
  rect,
  reelScreen,
  ringLight,
  room,
  searchScreen,
  shadow,
  shopScreen,
  sparkle,
  text,
  tripodLegs,
  articleScreen,
  blur,
  darken,
} from "./studio.mjs";

export const brandMark = (x, y, s = 1, fg = "#fff", dot = C.sun) =>
  circle(x, y, 26 * s, dot) +
  circle(x + 6 * s, y - 6 * s, 9 * s, C.tealInk) +
  text(x + 38 * s, y + 13 * s, "nava.", { size: 40 * s, weight: 800, fill: fg });

export function swatchFan(px, py, s = 1) {
  const sw = [C.tealInk, C.teal2, C.mint, C.coral, C.sun, C.paper];
  let out = shadow(px + 80 * s, py + 6, 360 * s, { k: 0.8 });
  sw.forEach((c, i) => {
    out += g(
      `translate(${px},${py}) rotate(${-62 + i * 13})`,
      rect(-36 * s, -340 * s, 72 * s, 340 * s, faceFill(c, 0.08), { rx: 8 * s }) +
        rect(-36 * s, -78 * s, 72 * s, 78 * s, "#fffdf8", { rx: 8 * s }) +
        lines(-24 * s, -58 * s, 40 * s, 2, { gap: 16 * s, h: 7 * s, op: 0.25 }) +
        rect(-36 * s, -340 * s, 3, 340 * s, "#fff", { op: 0.25 }),
    );
  });
  return out + circle(px, py, 9 * s, cylFill("#c9ced4"));
}

export function magnifier(x, y, s = 1, rot = -30) {
  return (
    `<ellipse cx="${x - 20 * s}" cy="${y + 30 * s}" rx="${150 * s}" ry="${34 * s}" fill="#0a1e21" opacity="0.16" filter="${blur(12 * s)}"/>` +
    g(
      `translate(${x},${y}) rotate(${rot})`,
      rect(70 * s, -14 * s, 160 * s, 28 * s, cylFill(C.tealInk), { rx: 14 * s }) +
        circle(0, 0, 82 * s, cylFill("#d6dadf")) +
        circle(
          0,
          0,
          68 * s,
          rad(
            [
              [0, "#ffffff", 0.5],
              [0.7, C.mint, 0.35],
              [1, C.teal2, 0.45],
            ],
            0.4,
            0.35,
            0.7,
          ),
        ) +
        path(`M${-40 * s},${-30 * s} A${50 * s},${50 * s} 0 0 1 ${10 * s},${-52 * s}`, "none", {
          stroke: "#fff",
          sw: 7 * s,
          op: 0.7,
        }),
    )
  );
}

// ---------- services (1200×900) ----------
export function svcBrandConsulting() {
  begin(1200, 900);
  let b = room("paper", { leafX: 0.82 });
  b += board(110, 70, 600, 400, {
    headers: ["Where to play", "How to win", "Next 90 days"],
    rows: 2,
  });
  b += plant(1060, 720, 0.95, { kind: "snake", pot: C.sun });
  const matrix =
    path(`M30,150 L170,150 M100,30 L100,190`, "none", { stroke: C.ink2, sw: 2.5, op: 0.6 }) +
    circle(140, 70, 9, C.coral) +
    circle(60, 120, 7, C.teal2) +
    circle(135, 175, 6, C.ink2, { op: 0.5 }) +
    circle(70, 60, 6, C.ink2, { op: 0.5 }) +
    path(`M120,90 Q130,75 138,72`, "none", { stroke: C.coral, sw: 3 });
  b += notebook(735, 730, 460, 220, matrix, lines(24, 34, 160, 7, { gap: 22, h: 6, op: 0.22 }));
  b += pencil(860, 850, 190, -12, C.teal2);
  b += mug(310, 800, 1.15, C.sun);
  return end(b);
}

export function svcBranding() {
  begin(1200, 900);
  let b = room("sun");
  b += plant(1065, 700, 1, { kind: "fiddle" });
  b += swatchFan(300, 770);
  b += box(
    480,
    400,
    300,
    300,
    110,
    C.tealInk,
    brandMark(70, 130, 1.25) + lines(40, 240, 200, 2, { fill: "#fff", op: 0.3, gap: 16, h: 7 }),
  );
  b += flat(
    690,
    815,
    240,
    130,
    "#fffdf8",
    brandMark(40, 52, 0.55, C.tealInk) + lines(24, 84, 120, 1, { h: 6 }),
    { rotate: -8 },
  );
  b += flat(
    950,
    830,
    240,
    130,
    C.sun,
    text(120, 72, "nava.", { size: 36, weight: 800, fill: C.tealInk, anchor: "middle" }),
    { rotate: 10 },
  );
  b += pencil(850, 700, 200, -16, C.coral);
  return end(b);
}

export function svcPersonalBranding() {
  begin(1200, 900);
  let b = room("mint");
  b += frame(
    860,
    90,
    230,
    290,
    circle(101, 110, 52, C.peach) +
      path(`M20,262 Q101,150 182,262 Z`, C.teal2) +
      rect(0, 0, 202, 262, C.sun, { op: 0.15 }),
    { frame: "#f4efe4", border: 16 },
  );
  b += plant(150, 700, 0.85, { kind: "fiddle", pot: C.coral });
  b += laptop(560, 790, 520, profileScreen(520, 333));
  b += rect(955, 600, 10, 120, cylFill("#2a2e35")) + tripodLegs(960, 770, 80);
  b += camera(960, 610, 0.75, { noShadow: true });
  b += mug(250, 830, 1, C.paper);
  return end(b);
}

export function svcPR() {
  begin(1200, 900);
  let b = room("coral");
  b += frame(
    110,
    80,
    300,
    220,
    articleScreen(272, 192, { masthead: "Business Weekly", photo: C.sun }),
    { frame: "#2a2e35", border: 14 },
  );
  b += frame(
    440,
    130,
    200,
    160,
    articleScreen(172, 132, { masthead: "City News", photo: C.mint }),
    { frame: "#f4efe4", border: 14 },
  );
  // newspapers on the table
  b += flat(330, 760, 420, 260, "#f2ede2", "", { rotate: 9 });
  b += flat(
    320,
    770,
    440,
    270,
    "#fffdf8",
    articleScreen(440, 270, { masthead: "The Business Daily", photo: C.teal2 }),
    { rotate: -6 },
  );
  // magazine leaning on the wall
  b += `<ellipse cx="660" cy="742" rx="150" ry="16" fill="#0a1e21" opacity="0.25" filter="${blur(8)}"/>`;
  b += g(
    "translate(560,350) rotate(-5 130 400)",
    rect(
      0,
      0,
      260,
      390,
      lin(
        [
          [0, C.teal2],
          [1, C.tealInk],
        ],
        [0, 0, 1, 1],
      ),
      { rx: 4 },
    ) +
      text(22, 62, "FOUNDERS", { size: 40, weight: 800, fill: "#fff", ls: 2 }) +
      text(22, 92, "The brands issue", { size: 18, weight: 600, fill: C.sun }) +
      bottle(130, 330, 90, 190, C.sun, { cap: C.paper, brand: "nava.", label: C.paper }) +
      lines(22, 352, 140, 2, { fill: "#fff", op: 0.5, gap: 14, h: 6 }) +
      glare(0, 0, 260, 390, 4),
  );
  b += mic(1010, 790, 0.95);
  b += mug(870, 820, 0.95, C.sun);
  return end(b);
}

export function svcSocial() {
  begin(1200, 900);
  let b = room("teal");
  b += plant(150, 720, 0.85, { kind: "fiddle" });
  b += ringLight(720, 320, 170, 760);
  b += rect(700, 470, 40, 30, "#1c2127", { rx: 6 });
  b += phone(720, 515, 180, 360, reelScreen(180, 360), { stand: false });
  b += bottle(380, 790, 110, 240, C.teal2, { cap: C.sun, brand: "nava." });
  b += jar(510, 800, 120, 130, C.sun, { cap: C.tealInk, brand: "nava." });
  b += floatCard(
    930,
    150,
    190,
    92,
    heart(48, 46, 30, C.coral) + text(82, 56, "12.4k", { size: 30, weight: 800 }),
  );
  return end(b);
}

export function svcInfluencer() {
  begin(1200, 900);
  let b = room("peach");
  b += ringLight(260, 300, 140, 740);
  b += phone(
    560,
    800,
    230,
    460,
    reelScreen(230, 460, {
      color: C.teal2,
      subject: pouch(115, 330, 90, 120, C.coral, { brand: "nava." }),
    }) +
      rect(16, 20, 92, 34, C.sun, { rx: 17 }) +
      text(62, 44, "Collab", { size: 18, weight: 800, anchor: "middle" }),
  );
  // open gift box with the product inside
  b += box(
    780,
    610,
    250,
    170,
    80,
    C.sun,
    rect(0, 0, 250, 26, darken(C.sun, 0.1)) +
      text(125, 110, "nava.", { size: 40, weight: 800, fill: C.tealInk, anchor: "middle" }),
  );
  b += path(
    `M790,610 Q840,520 880,600 Q930,500 960,600 Q1010,530 1030,600 L1100,560 L1030,610 Z`,
    "#fffdf8",
    { op: 0.95 },
  );
  b += bottle(900, 600, 70, 170, C.tealInk, { cap: C.sun, label: C.paper });
  b += g(
    "translate(1060,560) rotate(-35)",
    rect(0, 0, 120, 80, faceFill("#ffffff"), { rx: 6 }) + rect(0, 0, 120, 10, C.coral, { rx: 4 }),
  );
  b += plant(1110, 760, 0.6, { kind: "snake", pot: C.paper });
  return end(b);
}

export function svcPerformance() {
  begin(1200, 900);
  let b = room("sun");
  b += plant(130, 720, 0.9, { kind: "snake" });
  b += monitor(600, 730, 600, chartScreen(600, 360));
  b += flat(
    600,
    812,
    440,
    120,
    "#f4f2ed",
    Array.from({ length: 4 }, (_, r) =>
      Array.from({ length: 14 }, (_, c) =>
        rect(14 + c * 29.5, 14 + r * 25, 25, 20, "#fff", { rx: 4 }),
      ).join(""),
    ).join(""),
    { squash: 0.42, rx: 10 },
  );
  b += floatCard(
    930,
    120,
    220,
    170,
    text(24, 44, "Cost per lead", { size: 20, weight: 600, fill: C.muted }) +
      Array.from({ length: 6 }, (_, i) =>
        rect(26 + i * 30, 140 - (6 - i) * 13, 20, (6 - i) * 13, i === 5 ? C.teal2 : C.mint, {
          rx: 4,
        }),
      ).join(""),
  );
  b += mug(980, 800, 1.1, C.tealInk, { drink: "#6b3f22" });
  return end(b);
}

export function svcEcommerce() {
  begin(1200, 900);
  let b = room("coral");
  b += kraftBox(90, 520, 300, 210, 90);
  b += kraftBox(140, 330, 220, 170, 70);
  b += plant(245, 295, 0.42, { kind: "trail", pot: C.paper });
  b += jar(560, 780, 150, 180, C.tealInk, { cap: C.sun, brand: "nava.", brandFill: C.tealInk });
  b += pouch(720, 790, 130, 190, C.sun, { brand: "nava." });
  b += phone(960, 810, 230, 470, shopScreen(230, 470));
  return end(b);
}

export function svcSEO() {
  begin(1200, 900);
  let b = room("mint");
  b += plant(140, 710, 0.85, { kind: "fiddle", pot: C.sun });
  b += laptop(580, 780, 540, searchScreen(540, 346));
  b += magnifier(1000, 770, 0.85);
  b += floatCard(
    880,
    110,
    250,
    120,
    sparkle(36, 44, 16, C.teal) +
      text(60, 52, "Cited in", { size: 20, weight: 600, fill: C.muted }) +
      text(30, 92, "AI answers", { size: 28, weight: 800 }),
  );
  return end(b);
}

export function svcAI() {
  begin(1200, 900);
  let b = room("night", { leafX: 0.08 });
  // workflow cards on the wall
  const node = (x, y, label, c) =>
    floatCard(
      x,
      y,
      200,
      70,
      circle(34, 35, 14, c) + text(58, 43, label, { size: 20, weight: 700 }),
      { rx: 14 },
    );
  b += path(`M310,170 C385,170 385,250 460,250 M660,250 C735,250 735,170 810,170`, "none", {
    stroke: C.sun,
    sw: 4,
    op: 0.8,
  });
  b +=
    node(110, 135, "New order", C.coral) +
    node(460, 215, "AI agent", C.sun) +
    node(810, 135, "Reply sent", C.teal2);
  b += circle(1030, 520, 120, "#ffe9a8", { op: 0.4, filter: blur(50) });
  b +=
    circle(
      1030,
      600,
      70,
      rad(
        [
          [0, "#fffbe9"],
          [0.6, "#ffe08a"],
          [1, "#f1b93a"],
        ],
        0.4,
        0.35,
        0.7,
      ),
    ) + shadow(1030, 675, 120, { k: 0.6 });
  b += plant(150, 730, 0.85, { kind: "snake", pot: C.tealInk });
  b += laptop(
    590,
    790,
    540,
    chatScreen(540, 346, [
      ["q", 1],
      ["a", 2, "Order #1042 shipped"],
      ["q", 1],
    ]),
  );
  b += sparkle(860, 380, 22) + sparkle(900, 330, 12) + sparkle(330, 400, 14, C.mint);
  return end(b, { vignette: 0.3 });
}

// ---------- home hero chips ----------
export function heroSocial() {
  begin(960, 540);
  let b = room("teal", { horizon: 0.78 });
  b += circle(480, 230, 230, "#ffffff", { op: 0.5, filter: blur(60) });
  b += `<circle cx="480" cy="250" r="190" fill="none" stroke="#fff" stroke-width="36"/>`;
  b += phone(480, 520, 210, 420, reelScreen(210, 420), { stand: false });
  b += floatCard(
    650,
    110,
    170,
    80,
    heart(40, 40, 26, C.coral) + text(72, 50, "Reach", { size: 24, weight: 800 }),
  );
  b += plant(120, 500, 0.7, { kind: "snake" });
  return end(b);
}

export function heroCommerce() {
  begin(960, 540);
  let b = room("coral", { horizon: 0.72 });
  b += kraftBox(80, 260, 240, 190, 70);
  b += jar(420, 500, 120, 150, C.tealInk, { cap: C.sun, brand: "nava." });
  b += phone(680, 520, 200, 410, shopScreen(200, 410));
  b += pouch(860, 500, 100, 150, C.sun, { brand: "nava." });
  return end(b);
}

export function heroGrowth() {
  begin(1000, 700);
  let b = room("sun", { horizon: 0.74 });
  b += monitor(
    470,
    600,
    560,
    chartScreen(560, 336, { pts: [0.15, 0.22, 0.2, 0.35, 0.42, 0.5, 0.66, 0.78, 0.94] }),
  );
  b += floatCard(
    760,
    90,
    190,
    110,
    text(22, 42, "Growth", { size: 20, weight: 600, fill: C.muted }) +
      path(`M24,86 L70,70 L110,76 L166,40`, "none", { stroke: C.teal2, sw: 5 }) +
      circle(166, 40, 7, C.sun, { stroke: C.teal2, sw: 3 }),
  );
  b += plant(880, 640, 0.7, { kind: "fiddle" });
  return end(b);
}
