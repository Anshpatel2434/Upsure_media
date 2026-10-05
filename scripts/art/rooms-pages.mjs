/**
 * Studio still-life scenes for case studies, blog covers, page heroes, About
 * and Culture, team cards and the share image. Same room and kit as rooms.mjs.
 */
import { brandMark, magnifier, swatchFan } from "./rooms.mjs";
import {
  C,
  articleScreen,
  begin,
  blur,
  board,
  bottle,
  box,
  camera,
  chartScreen,
  chatScreen,
  circle,
  clip,
  cylFill,
  darken,
  end,
  faceFill,
  flat,
  floatCard,
  frame,
  g,
  jar,
  kraftBox,
  laptop,
  lighten,
  lin,
  lines,
  mic,
  monitor,
  mug,
  notebook,
  path,
  pencil,
  pendant,
  phone,
  plant,
  pouch,
  profileScreen,
  rad,
  rect,
  reelScreen,
  room,
  shadow,
  shopScreen,
  sparkle,
  text,
  tripodLegs,
} from "./studio.mjs";

// ---------- props ----------
/** Scale the numbers in a path authored at size 1. */
const sp = (d, s) => d.replace(/-?\d+(\.\d+)?/g, (m) => String(+m * s));

function glasses(cx, cy, s = 1, color = C.tealInk) {
  const lens = (x) =>
    rect(
      x,
      -38 * s,
      120 * s,
      84 * s,
      rad(
        [
          [0, "#ffffff", 0.35],
          [1, C.teal2, 0.25],
        ],
        0.35,
        0.3,
        0.8,
      ),
      { rx: 30 * s, stroke: color, sw: 12 * s },
    ) +
    path(`M${x + 24 * s},${-18 * s} L${x + 56 * s},${-26 * s}`, "none", {
      stroke: "#fff",
      sw: 5 * s,
      op: 0.7,
    });
  return (
    shadow(cx, cy + 50 * s, 300 * s, { k: 0.8 }) +
    g(
      `translate(${cx - 135 * s},${cy})`,
      path(
        `M${-6 * s},${-20 * s} L${-60 * s},${-56 * s} M${276 * s},${-20 * s} L${330 * s},${-56 * s}`,
        "none",
        { stroke: darken(color, 0.2), sw: 10 * s },
      ) +
        lens(0) +
        lens(150 * s) +
        path(`M${120 * s},${-14 * s} Q${135 * s},${-30 * s} ${150 * s},${-14 * s}`, "none", {
          stroke: color,
          sw: 10 * s,
        }),
    )
  );
}

function car(cx, y, s = 1, color = C.coral) {
  const w = 420 * s;
  const wheel = (x) =>
    circle(x, -2 * s, 46 * s, cylFill("#1c2127")) + circle(x, -2 * s, 22 * s, cylFill("#c9ced4"));
  return (
    shadow(cx, y, w * 0.95) +
    g(
      `translate(${cx - w / 2},${y - 44 * s})`,
      path(
        sp(
          "M10,-10 L20,-70 Q30,-96 70,-100 L130,-104 L180,-160 Q200,-176 236,-176 L300,-176 Q330,-174 350,-150 L384,-104 Q414,-98 414,-60 L410,-10 Z",
          s,
        ),
        lin([
          [0, lighten(color, 0.25)],
          [0.5, color],
          [1, darken(color, 0.3)],
        ]),
      ) +
        path(
          sp(
            "M150,-104 L194,-152 L256,-152 L256,-104 Z M270,-104 L270,-152 L312,-152 Q330,-150 360,-104 Z",
            s,
          ),
          lin(
            [
              [0, "#d8eef2"],
              [1, "#5b7b88"],
            ],
            [0, 0, 1, 1],
          ),
        ) +
        rect(30 * s, -80 * s, 360 * s, 5 * s, "#fff", { op: 0.4, rx: 2 }) +
        rect(392 * s, -72 * s, 18 * s, 12 * s, C.sun, { rx: 4 }) +
        wheel(100 * s) +
        wheel(320 * s),
    )
  );
}

function sneaker(cx, y, s = 1, color = C.teal2) {
  return (
    shadow(cx, y, 360 * s) +
    g(
      `translate(${cx - 180 * s},${y})`,
      path(
        sp("M0,0 L360,0 Q372,-20 352,-34 L10,-34 Q-6,-20 0,0 Z", s),
        cylFill("#f4f1ea", { hi: 0.3 }),
      ) +
        path(
          sp("M14,-34 Q4,-110 60,-130 L150,-140 Q190,-100 250,-90 Q330,-80 350,-34 Z", s),
          lin([
            [0, lighten(color, 0.2)],
            [1, darken(color, 0.25)],
          ]),
        ) +
        path(sp("M120,-130 L190,-100 M108,-112 L178,-86 M96,-94 L166,-70", s), "none", {
          stroke: "#fff",
          sw: 6 * s,
        }) +
        path(sp("M200,-60 Q260,-70 320,-44", s), "none", { stroke: C.sun, sw: 10 * s }),
    )
  );
}

function football(cx, cy, r) {
  const patch = (a, d) => {
    const x = cx + Math.cos(a) * d;
    const y = cy + Math.sin(a) * d;
    const pts = Array.from({ length: 5 }, (_, i) => {
      const t = (i / 5) * Math.PI * 2 - Math.PI / 2;
      return `${x + Math.cos(t) * r * 0.22},${y + Math.sin(t) * r * 0.22}`;
    });
    return path(`M${pts.join(" L")} Z`, C.ink2);
  };
  return (
    shadow(cx, cy + r, r * 1.6) +
    circle(
      cx,
      cy,
      r,
      rad(
        [
          [0, "#ffffff"],
          [0.7, "#e9e6df"],
          [1, "#a8a49b"],
        ],
        0.62,
        0.32,
        0.8,
      ),
    ) +
    patch(0, 0) +
    [0, 1, 2, 3, 4].map((i) => patch((i / 5) * Math.PI * 2 - Math.PI / 2, r * 0.68)).join("")
  );
}

function gear(cx, cy, r, teeth = 12) {
  const pts = [];
  for (let i = 0; i < teeth * 2; i++) {
    const a = (i / (teeth * 2)) * Math.PI * 2;
    const R = i % 2 ? r : r * 0.82;
    pts.push(
      `${cx + Math.cos(a - 0.1) * R},${cy + Math.sin(a - 0.1) * R} ${cx + Math.cos(a + 0.1) * R},${cy + Math.sin(a + 0.1) * R}`,
    );
  }
  return (
    shadow(cx, cy + r, r * 2) +
    path(
      `M${pts.join(" L")} Z`,
      lin(
        [
          [0, "#eef1f4"],
          [0.5, "#aab2bb"],
          [1, "#6c7681"],
        ],
        [1, 0, 0, 1],
      ),
    ) +
    circle(
      cx,
      cy,
      r * 0.45,
      lin(
        [
          [0, "#7d8792"],
          [1, "#d9dee3"],
        ],
        [1, 0, 0, 1],
      ),
    ) +
    circle(cx, cy, r * 0.22, darken(C.paper, 0.35))
  );
}

function wallCalendar(x, y, w, h, o = {}) {
  const cols = o.cols ?? 7;
  const rows = o.rows ?? 4;
  const chips = [C.sun, C.teal2, C.coral, C.mint, C.peach];
  let s =
    rect(0, 0, w, 56, C.tealInk, { rx: 6 }) +
    text(22, 38, o.title ?? "Content calendar", { size: 24, weight: 700, fill: "#fff" });
  const cw = (w - 20) / cols;
  const ch = (h - 76) / rows;
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) {
      s += rect(10 + c * cw + 3, 66 + r * ch + 3, cw - 6, ch - 6, "#fff", { rx: 6 });
      if ((r * 3 + c * 2) % 4 !== 3)
        s += rect(
          10 + c * cw + 10,
          66 + r * ch + ch * 0.45,
          cw - 20,
          ch * 0.28,
          chips[(r + c) % chips.length],
          { rx: 5 },
        );
    }
  return frame(x, y, w + 20, h + 20, s, { frame: "#f4efe4", border: 10, fill: "#efe9dd" });
}

function softbox(cx, cy, w, y) {
  return (
    circle(cx, cy, w * 0.9, "#ffffff", { op: 0.45, filter: blur(w * 0.3) }) +
    rect(cx - w / 2, cy - w * 0.62, w, w * 1.24, "#1c2127", { rx: 10 }) +
    rect(
      cx - w / 2 + 12,
      cy - w * 0.62 + 12,
      w - 24,
      w * 1.24 - 24,
      rad([
        [0, "#ffffff"],
        [1, "#efeae0"],
      ]),
      { rx: 6 },
    ) +
    rect(cx - 5, cy + w * 0.62, 10, y - cy - w * 0.62, cylFill("#2a2e35")) +
    tripodLegs(cx, y, w * 0.55)
  );
}

function sofa(x, y, w, color = C.teal2) {
  const h = w * 0.42;
  return (
    rect(x - 20, y - 20, w + 40, 60, "#0a1e21", { op: 0.25, filter: blur(20) }) +
    rect(x + w * 0.06, y - h, w * 0.88, h * 0.6, faceFill(darken(color, 0.05), 0.08), { rx: 30 }) +
    rect(x + w * 0.04, y - h * 0.5, w * 0.92, h * 0.38, faceFill(lighten(color, 0.08), 0.08), {
      rx: 24,
    }) +
    rect(x, y - h * 0.72, w * 0.1, h * 0.66, cylFill(color, { hi: 0.2 }), { rx: 26 }) +
    rect(x + w * 0.9, y - h * 0.72, w * 0.1, h * 0.66, cylFill(color, { hi: 0.2 }), { rx: 26 }) +
    rect(x + w * 0.18, y - h * 0.86, w * 0.2, h * 0.36, faceFill(C.sun, 0.1), { rx: 22 }) +
    rect(x + w * 0.62, y - h * 0.84, w * 0.18, h * 0.34, faceFill(C.peach, 0.1), { rx: 22 }) +
    rect(x + w * 0.06, y - h * 0.08, 14, h * 0.1, "#2a2e35") +
    rect(x + w * 0.92, y - h * 0.08, 14, h * 0.1, "#2a2e35")
  );
}

function shelf(x, y, w, items) {
  return (
    rect(x + 6, y + 12, w, 16, "#0a1e21", { op: 0.2, filter: blur(8) }) +
    items +
    rect(x, y, w, 16, faceFill(C.wood, 0.12), { rx: 3 })
  );
}

function books(x, y, n, colors = [C.teal2, C.sun, C.coral, C.tealInk, C.mint, C.peach]) {
  let s = "";
  let cx = x;
  for (let i = 0; i < n; i++) {
    const bw = 22 + ((i * 7) % 12);
    const bh = 110 + ((i * 23) % 50);
    s += rect(cx, y - bh, bw, bh, cylFill(colors[i % colors.length], { hi: 0.25 }), { rx: 3 });
    s += rect(cx + 4, y - bh + 16, bw - 8, 4, "#fff", { op: 0.5 });
    cx += bw + 3;
  }
  return s;
}

/** Camera seen from behind, its screen showing the shot. Base centred at (cx, y). */
function cameraBack(cx, y, s, screen) {
  const w = 240 * s;
  const h = 160 * s;
  return g(
    `translate(${cx - w / 2},${y - h})`,
    rect(w * 0.6, -h * 0.12, w * 0.26, h * 0.16, faceFill("#2a2e35"), { rx: 6 * s }) +
      rect(
        0,
        0,
        w,
        h,
        lin(
          [
            [0, "#3a4048"],
            [1, "#14181c"],
          ],
          [1, 0, 0, 1],
        ),
        { rx: 18 * s },
      ) +
      rect(w * 0.08, h * 0.16, w * 0.62, h * 0.68, "#000", { rx: 6 * s }) +
      `<g transform="translate(${w * 0.1},${h * 0.19})" clip-path="${clip(rect(0, 0, w * 0.58, h * 0.62, "#000", { rx: 4 }))}">${screen(w * 0.58, h * 0.62)}</g>` +
      circle(w * 0.84, h * 0.4, h * 0.11, cylFill("#2a2e35")) +
      circle(w * 0.84, h * 0.72, h * 0.07, C.coral),
  );
}

function laptopBack(cx, y, w, color = "#c9ced4") {
  const h = w * 0.62;
  return (
    shadow(cx, y, w * 1.1) +
    rect(cx - w / 2, y - h, w, h, faceFill(color, 0.1), { rx: 10 }) +
    circle(cx, y - h / 2, w * 0.06, "#ffffff", { op: 0.7 }) +
    rect(cx - w * 0.55, y - 10, w * 1.1, 12, faceFill(darken(color, 0.1)), { rx: 4 })
  );
}

function deliveryBag(x, y, w, h) {
  return (
    path(
      `M${x + w * 0.15},${y - w * 0.05} Q${x + w * 0.55},${y - h * 0.55} ${x + w * 0.95},${y - w * 0.12}`,
      "none",
      { stroke: C.tealInk, sw: 14 },
    ) +
    box(
      x,
      y,
      w,
      h,
      w * 0.32,
      C.sun,
      rect(0, h * 0.66, w, h * 0.1, darken(C.sun, 0.12)) +
        text(w / 2, h * 0.46, "10 min", {
          size: w * 0.15,
          weight: 800,
          fill: C.tealInk,
          anchor: "middle",
        }),
    )
  );
}

function compass(cx, cy, r) {
  return (
    `<ellipse cx="${cx - r * 0.2}" cy="${cy + r * 0.32}" rx="${r * 1.15}" ry="${r * 0.42}" fill="#0a1e21" opacity="0.25" filter="${blur(r * 0.12)}"/>` +
    g(
      `translate(${cx},${cy}) scale(1,0.55)`,
      circle(
        0,
        0,
        r,
        lin(
          [
            [0, "#f1d48a"],
            [0.5, "#c9a24b"],
            [1, "#8c6a26"],
          ],
          [1, 0, 0, 1],
        ),
      ) +
        circle(0, 0, r * 0.84, "#fffdf6") +
        [0, 90, 180, 270]
          .map((a) => g(`rotate(${a})`, rect(-2, -r * 0.8, 4, r * 0.14, C.ink2)))
          .join("") +
        g(
          "rotate(28)",
          path(`M0,${-r * 0.7} L${r * 0.1},0 L0,${r * 0.7} L${-r * 0.1},0 Z`, C.coral) +
            path(`M0,0 L${r * 0.1},0 L0,${r * 0.7} L${-r * 0.1},0 Z`, C.tealInk),
        ) +
        circle(0, 0, r * 0.06, C.sun),
    )
  );
}

const mapContent = (w, h) =>
  rect(0, 0, w, h, "#eef4ec") +
  path(
    `M0,${h * 0.6} C${w * 0.2},${h * 0.5} ${w * 0.3},${h * 0.8} ${w * 0.55},${h * 0.62} S${w * 0.85},${h * 0.3} ${w},${h * 0.4}`,
    "none",
    { stroke: C.mint, sw: 18 },
  ) +
  path(
    `M${w * 0.1},0 L${w * 0.3},${h} M${w * 0.6},0 L${w * 0.5},${h} M0,${h * 0.25} L${w},${h * 0.2}`,
    "none",
    { stroke: "#ffffff", sw: 8 },
  ) +
  path(`M${w * 0.15},${h * 0.8} Q${w * 0.4},${h * 0.2} ${w * 0.8},${h * 0.35}`, "none", {
    stroke: C.coral,
    sw: 4,
    op: 0.8,
  }) +
  circle(w * 0.8, h * 0.35, 10, C.coral);

const orb = (cx, cy, r) =>
  circle(cx, cy - r * 0.5, r * 1.8, "#ffe9a8", { op: 0.35, filter: blur(r * 0.55) }) +
  circle(
    cx,
    cy,
    r,
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
  ) +
  shadow(cx, cy + r * 0.95, r * 1.6, { k: 0.6 });

// ---------- case studies (1600×1100) ----------
export function workEyewear() {
  begin(1600, 1100);
  let b = room("sun", { horizon: 0.62 });
  b += frame(
    980,
    110,
    380,
    300,
    rect(0, 0, 352, 272, C.tealInk) +
      glasses(176, 130, 0.8, C.sun) +
      text(24, 246, "New season frames", { size: 22, weight: 700, fill: "#fff" }),
    { frame: "#f4efe4", border: 14 },
  );
  b += plant(180, 860, 1.05, { kind: "fiddle" });
  b += flat(700, 930, 560, 200, C.tealInk, "", { rotate: -4, squash: 0.45, rx: 80, thick: 16 });
  b += glasses(700, 860, 1.35);
  b += phone(
    1240,
    990,
    240,
    490,
    reelScreen(240, 490, { color: C.sun, subject: glasses(120, 300, 0.42, C.tealInk) }),
  );
  return end(b);
}

export function workAuto() {
  begin(1600, 1100);
  let b = room("mint", { horizon: 0.62 });
  b += frame(
    120,
    110,
    560,
    320,
    rect(
      0,
      0,
      532,
      292,
      lin(
        [
          [0, C.sun],
          [1, C.coral],
        ],
        [0, 0, 1, 1],
      ),
    ) +
      car(300, 250, 0.9, C.tealInk) +
      text(30, 60, "Drive the city", { size: 34, weight: 800, fill: C.tealInk }),
    { frame: "#2a2e35", border: 14 },
  );
  b += car(700, 930, 1.5, C.coral);
  b += phone(
    1230,
    990,
    240,
    490,
    profileScreen(240, 490, {
      headline: "Weekend test drives",
      headline2: "near you",
      media: C.coral,
      cover: C.teal2,
    }),
  );
  b += plant(1460, 860, 0.85, { kind: "snake" });
  return end(b);
}

export function workTech() {
  begin(1600, 1100);
  let b = room("paper", { horizon: 0.62 });
  b += plant(170, 860, 1, { kind: "snake", pot: C.tealInk });
  const hero = phone(
    320,
    330,
    110,
    220,
    rect(
      0,
      0,
      110,
      220,
      lin(
        [
          [0, C.sun],
          [1, C.coral],
        ],
        [0, 0, 1, 1],
      ),
    ),
    { stand: false },
  );
  b += monitor(800, 880, 640, reelScreen(640, 384, { color: C.teal2, subject: hero }));
  b += phone(1320, 990, 200, 410, chartScreen(200, 410, { kpis: ["Reach", "Saves", "Clicks"] }));
  // earbuds case
  b += g(
    "translate(380,930)",
    shadow(65, 0, 160) +
      rect(0, -90, 130, 90, cylFill("#ffffff", { hi: 0.4 }), { rx: 40 }) +
      rect(0, -58, 130, 3, "#000", { op: 0.12 }),
  );
  // watch
  b += g(
    "translate(1010,960)",
    shadow(60, 0, 140) +
      rect(30, -30, 60, 40, cylFill(C.tealInk), { rx: 10 }) +
      rect(10, -130, 100, 110, faceFill(C.ink, 0.1), { rx: 28 }) +
      rect(
        22,
        -118,
        76,
        86,
        lin([
          [0, C.teal2],
          [1, C.tealInk],
        ]),
        { rx: 20 },
      ) +
      text(60, -68, "10:42", { size: 20, weight: 700, fill: "#fff", anchor: "middle" }),
  );
  return end(b);
}

export function workSports() {
  begin(1600, 1100);
  let b = room("coral", { horizon: 0.62 });
  b += frame(
    170,
    120,
    300,
    380,
    rect(0, 0, 272, 352, C.teal2) +
      sneaker(136, 270, 0.6, C.sun) +
      text(20, 56, "Run more", { size: 34, weight: 800, fill: "#fff" }),
    { frame: "#f4efe4", border: 14 },
  );
  b += plant(1460, 860, 0.9, { kind: "fiddle" });
  b += football(330, 870, 110);
  b += sneaker(690, 990, 1.35, C.teal2);
  b += bottle(1000, 970, 120, 300, C.sun, { cap: C.tealInk, label: false });
  b += phone(
    1250,
    1000,
    230,
    470,
    shopScreen(230, 470, {
      title: "Free delivery",
      sub: "Running shoes",
      cta: "Buy now",
      bar: C.mint,
    }),
  );
  return end(b);
}

// ---------- blog covers (1600×1000) ----------
export function postAIGrowth() {
  begin(1600, 1000);
  let b = room("teal", { horizon: 0.64 });
  b += floatCard(
    1130,
    130,
    280,
    190,
    text(26, 48, "Pipeline", { size: 22, weight: 600, fill: C.muted }) +
      path(`M30,150 L90,130 L150,138 L240,70`, "none", { stroke: C.teal2, sw: 6 }) +
      circle(240, 70, 9, C.sun, { stroke: C.teal2, sw: 3 }),
  );
  b += orb(270, 730, 90);
  b += laptop(
    780,
    900,
    640,
    chatScreen(640, 410, [
      ["q", 1],
      ["a", 3, "Plan ready"],
      ["q", 1],
    ]),
  );
  b += sparkle(1130, 520, 24) + sparkle(1190, 470, 12) + sparkle(400, 450, 16, C.teal2);
  b += plant(1430, 900, 0.9, { kind: "snake" });
  return end(b);
}

export function postPositioning() {
  begin(1600, 1000);
  let b = room("paper", { horizon: 0.6 });
  b += board(140, 90, 620, 380, { headers: ["Why", "How", "What"], rows: 2 });
  const pyramid =
    path(`M150,30 L260,190 L40,190 Z`, "none", { stroke: C.ink2, sw: 3, op: 0.7 }) +
    path(`M90,120 L210,120 M65,155 L235,155`, "none", { stroke: C.ink2, sw: 2, op: 0.5 }) +
    circle(150, 80, 8, C.coral);
  b += plant(1440, 610, 0.75, { kind: "fiddle", pot: C.sun });
  b += mug(260, 900, 1.2, C.teal2);
  b += notebook(820, 800, 600, 290, pyramid, lines(26, 40, 220, 8, { gap: 24, h: 7, op: 0.22 }));
  b += swatchFan(1270, 920, 0.8);
  b += pencil(470, 930, 240, -14, C.coral);
  return end(b);
}

export function postContent() {
  begin(1600, 1000);
  let b = room("sun", { horizon: 0.62 });
  b += wallCalendar(140, 80, 640, 420);
  b += plant(1440, 860, 0.85, { kind: "snake" });
  b += camera(560, 890, 1.15);
  b += phone(1000, 910, 230, 470, reelScreen(230, 470, { color: C.teal2 }));
  b += mug(1250, 910, 1.1, C.paper);
  return end(b);
}

export function postCompass() {
  begin(1600, 1000);
  let b = room("mint", { horizon: 0.56 });
  b += plant(170, 760, 0.9, { kind: "fiddle" });
  b += flat(800, 800, 900, 420, "#eef4ec", mapContent(900, 420), {
    rotate: -3,
    squash: 0.48,
    thick: 4,
  });
  b += compass(760, 790, 170);
  b += pencil(1060, 930, 230, -10, C.sun);
  b += mug(1400, 830, 1.1, C.coral);
  return end(b);
}

export function postQuickCommerce() {
  begin(1600, 1000);
  let b = room("coral", { horizon: 0.62 });
  b += plant(1470, 860, 0.7, { kind: "snake" });
  b += deliveryBag(170, 520, 360, 330);
  b += jar(720, 880, 150, 190, C.tealInk, { cap: C.sun, brand: "nava." });
  b += pouch(890, 890, 130, 200, C.sun, { brand: "nava." });
  b += phone(1200, 930, 250, 510, shopScreen(250, 510));
  return end(b);
}

export function postGEO() {
  begin(1600, 1000);
  let b = room("peach", { horizon: 0.64 });
  b += floatCard(
    1060,
    150,
    300,
    220,
    text(26, 46, "Sources", { size: 22, weight: 700 }) +
      [0, 1, 2]
        .map(
          (i) =>
            rect(26, 70 + i * 46, 32, 32, [C.teal2, C.sun, C.coral][i], { rx: 8 }) +
            lines(72, 80 + i * 46, 190, 1, { h: 8 }),
        )
        .join(""),
  );
  b += floatCard(
    230,
    200,
    270,
    110,
    sparkle(40, 55, 18, C.teal) + text(70, 64, "AI answer", { size: 26, weight: 800 }),
  );
  b += plant(250, 910, 0.85, { kind: "fiddle", pot: C.sun });
  b += phone(
    800,
    930,
    290,
    590,
    chatScreen(290, 590, [
      ["q", 2],
      ["a", 4, "nava. is a top pick"],
      ["q", 1],
    ]),
  );
  b += magnifier(1230, 870, 0.9);
  return end(b);
}

// ---------- page images ----------
export function servicesOverview() {
  begin(1600, 900);
  let b = room("paper", { horizon: 0.6 });
  b += frame(
    560,
    90,
    230,
    280,
    rect(0, 0, 202, 252, C.sun) + brandMark(40, 130, 0.9, C.tealInk, C.paper),
    { frame: "#2a2e35", border: 14 },
  );
  b += frame(820, 140, 260, 200, chartScreen(232, 172), { frame: "#f4efe4", border: 14 });
  b += plant(110, 720, 0.85, { kind: "snake" });
  b += kraftBox(460, 560, 200, 150, 60);
  b += swatchFan(330, 820, 0.7);
  b += laptop(900, 800, 420, chartScreen(420, 269));
  b += phone(1250, 810, 160, 330, reelScreen(160, 330));
  b += mic(1410, 800, 0.7);
  b += plant(1530, 770, 0.55, { kind: "fiddle", pot: C.coral });
  return end(b);
}

export function approachDiscover() {
  begin(1200, 900);
  let b = room("sun");
  b += board(120, 70, 640, 420, { headers: ["Customers", "Competitors", "Channels"], rows: 2 });
  b += plant(1070, 700, 0.85, { kind: "fiddle" });
  b += notebook(
    690,
    760,
    400,
    200,
    lines(24, 34, 150, 6, { gap: 24, h: 6, op: 0.22 }),
    lines(24, 34, 150, 6, { gap: 24, h: 6, op: 0.22 }),
  );
  b += magnifier(400, 800, 0.9);
  b += mug(1030, 820, 1.1, C.tealInk);
  return end(b);
}

export function oneTeamPlan() {
  begin(1000, 1250);
  let b = room("teal", { horizon: 0.6 });
  const rowsL = ["Brand", "Content", "Media", "PR", "AI"];
  const cols = [C.sun, C.coral, C.teal2, C.peach, C.tealInk];
  let plan =
    rect(0, 0, 740, 60, C.tealInk) +
    text(24, 40, "One plan · 90 days", { size: 26, weight: 700, fill: "#fff" });
  rowsL.forEach((l, i) => {
    plan += text(24, 118 + i * 86, l, { size: 24, weight: 700, fill: C.ink2 });
    plan += rect(150, 90 + i * 86, 560, 46, "#fff", { rx: 10 });
    const bx = 160 + ((i * 70) % 220);
    plan += rect(bx, 98 + i * 86, Math.min(220 + ((i * 53) % 160), 700 - bx), 30, cols[i], {
      rx: 8,
    });
  });
  b += frame(120, 90, 760, 540, plan, { frame: "#f4efe4", border: 10, fill: "#efe9dd" });
  b += plant(860, 920, 0.8, { kind: "snake" });
  [C.sun, C.coral, C.paper, C.teal2].forEach(
    (c, i) => (b += mug(200 + i * 170, 1010 + (i % 2) * 50, 1.05, c, { steam: i % 2 === 0 })),
  );
  return end(b);
}

export function faqChat() {
  begin(1000, 1250);
  let b = room("mint", { horizon: 0.66 });
  b += floatCard(
    70,
    150,
    200,
    120,
    text(100, 92, "?", { size: 80, weight: 800, fill: C.teal2, anchor: "middle" }),
  );
  b += floatCard(
    720,
    260,
    220,
    100,
    text(28, 62, "Answered", { size: 28, weight: 800 }) + circle(196, 50, 12, C.teal2),
  );
  b += plant(150, 1090, 0.8, { kind: "fiddle", pot: C.sun });
  b += phone(
    500,
    1120,
    330,
    680,
    chatScreen(330, 680, [
      ["q", 2],
      ["a", 3],
      ["q", 1],
      ["a", 2, "Book a free call"],
    ]),
  );
  b += mug(850, 1120, 1.1, C.coral);
  return end(b);
}

export function industryD2C() {
  begin(1600, 900);
  let b = room("peach", { horizon: 0.6 });
  b += plant(160, 760, 0.9, { kind: "fiddle" });
  b += box(330, 620, 560, 100, 120, C.wood, "", { topLight: 0.15 });
  b += bottle(440, 610, 100, 260, C.teal2, { cap: C.sun, brand: "nava." });
  b += jar(600, 610, 130, 150, C.sun, { cap: C.tealInk, brand: "nava." });
  b += pouch(770, 610, 120, 180, C.coral, { brand: "nava." });
  b += bottle(520, 820, 90, 170, C.tealInk, { cap: C.paper, neck: 0.3, neckW: 0.3 });
  b += kraftBox(1000, 600, 210, 160, 60);
  b += phone(
    1380,
    820,
    220,
    450,
    shopScreen(220, 450, { title: "Your store", sub: "New arrivals", bar: C.mint }),
  );
  return end(b);
}

export function industryB2B() {
  begin(1600, 900);
  let b = room("paper", { horizon: 0.6 });
  b += frame(
    1040,
    90,
    380,
    260,
    articleScreen(352, 232, { masthead: "Case study", photo: C.steel }),
    { frame: "#2a2e35", border: 14 },
  );
  b += plant(170, 750, 0.95, { kind: "snake" });
  b += laptop(
    640,
    800,
    520,
    profileScreen(520, 333, {
      headline: "How we cut lead time",
      headline2: "for our buyers",
      media: C.steel,
      cover: C.tealInk,
    }),
  );
  b += flat(
    1200,
    820,
    300,
    160,
    "#ffffff",
    rect(0, 0, 300, 50, C.tealInk) + lines(20, 74, 220, 3, { gap: 20, h: 7 }),
    { rotate: 6 },
  );
  b += gear(1110, 690, 95);
  b += gear(1270, 730, 60, 10);
  return end(b);
}

export function sceneWorkshop() {
  begin(1600, 900);
  let b = room("sun", { horizon: 0.62, leafX: 0.86 });
  b += board(170, 70, 900, 420, {
    cols: 4,
    headers: ["Audience", "Offer", "Channels", "Next steps"],
    rows: 2,
  });
  b += plant(1440, 740, 0.95, { kind: "fiddle" });
  b += mug(330, 790, 1, C.paper, { steam: false });
  b += laptopBack(560, 770, 260);
  b += laptopBack(920, 750, 240, "#e9e4da");
  b += mug(1150, 790, 1, C.coral);
  b += notebook(1250, 820, 300, 150, lines(18, 24, 110, 4, { gap: 22, h: 6 }), "");
  return end(b);
}

export function sceneShoot() {
  begin(1600, 900);
  let b = room("paper", { horizon: 0.66 });
  b += path(
    `M520,40 L1080,40 L1080,520 Q1080,620 1120,680 L480,680 Q520,620 520,520 Z`,
    lin([
      [0, "#ffffff"],
      [0.75, "#f6f3ec"],
      [1, "#e9e4da"],
    ]),
  );
  b += rect(500, 20, 600, 30, cylFill("#2a2e35"), { rx: 14 });
  b += bottle(740, 650, 110, 270, C.teal2, { cap: C.sun, brand: "nava." });
  b += pouch(880, 655, 120, 180, C.coral, { brand: "nava." });
  b += softbox(250, 300, 230, 800);
  b += softbox(1350, 280, 230, 800);
  b += rect(1185, 640, 12, 160, cylFill("#2a2e35")) + tripodLegs(1190, 860, 90);
  b += cameraBack(
    1190,
    650,
    1.1,
    (w, h) =>
      rect(0, 0, w, h, "#f6f3ec") +
      bottle(w * 0.42, h * 0.92, w * 0.16, h * 0.62, C.teal2, { cap: C.sun, label: C.paper }) +
      pouch(w * 0.64, h * 0.92, w * 0.18, h * 0.42, C.coral) +
      rect(4, 4, 22, 8, C.coral, { rx: 4 }),
  );
  return end(b);
}

export function sceneReview() {
  begin(1600, 900);
  let b = room("mint", { horizon: 0.62 });
  const comps = (w, h) =>
    [0, 1, 2, 3]
      .map((i) =>
        rect(
          20 + (i % 2) * (w / 2 - 10),
          20 + Math.floor(i / 2) * (h / 2 - 10),
          w / 2 - 30,
          h / 2 - 30,
          [C.sun, C.teal2, C.coral, C.tealSoft][i],
          { rx: 10 },
        ),
      )
      .join("");
  [
    [150, 110, C.sun, -4],
    [370, 150, C.coral, 3],
    [1180, 110, C.teal2, 4],
    [1390, 160, C.peach, -3],
  ].forEach(([x, y, c, r]) => {
    b += g(
      `rotate(${r} ${x + 90} ${y + 110})`,
      rect(x + 8, y + 16, 180, 220, "#0a1e21", { op: 0.15, filter: blur(10) }) +
        rect(x, y, 180, 220, "#fffdf8", { rx: 4 }) +
        rect(x + 16, y + 16, 148, 120, c, { rx: 4 }) +
        lines(x + 16, y + 154, 120, 2, { gap: 18, h: 7 }) +
        rect(x + 60, y - 12, 60, 24, "#f3e3b5", { op: 0.85 }),
    );
  });
  b += plant(1490, 770, 0.7, { kind: "snake" });
  b += monitor(800, 770, 600, rect(0, 0, 600, 360, "#f4f2ed") + comps(600, 360));
  b += swatchFan(320, 840, 0.6);
  b += pencil(1040, 860, 200, -12, C.teal2);
  b += mug(1320, 840, 1.05, C.sun);
  return end(b);
}

export function sceneCalendar() {
  begin(1600, 1000);
  let b = room("teal", { horizon: 0.62 });
  b += wallCalendar(200, 70, 900, 470);
  b += plant(1430, 850, 0.95, { kind: "fiddle" });
  b += notebook(
    560,
    870,
    480,
    220,
    lines(20, 30, 180, 6, { gap: 22, h: 6 }),
    lines(20, 30, 180, 6, { gap: 22, h: 6 }),
  );
  b += phone(1000, 910, 190, 390, reelScreen(190, 390, { color: C.sun }));
  b += mug(1220, 910, 1.05, C.coral);
  return end(b);
}

export function scenePresent() {
  begin(1600, 900);
  let b = room("peach", { horizon: 0.74 });
  b += frame(470, 70, 660, 400, chartScreen(630, 370, { bar: C.teal2 }), {
    frame: "#1c2127",
    border: 15,
  });
  b += pendant(1450, 200, 50);
  b += plant(150, 830, 1, { kind: "fiddle" });
  b += sofa(380, 830, 840, C.teal2);
  b +=
    shadow(1430, 830, 180) +
    rect(1360, 690, 140, 16, faceFill(C.wood), { rx: 6 }) +
    rect(1420, 706, 20, 124, "#2a2e35");
  b += mug(1430, 690, 0.9, C.sun);
  return end(b);
}

export function sceneValues() {
  begin(1600, 900);
  let b = room("sun", { horizon: 0.74, leafX: 0.6 });
  const poster = (x, y, w, h, bg, t1, t2, fg) =>
    frame(
      x,
      y,
      w,
      h,
      rect(0, 0, w - 28, h - 28, bg) +
        text(24, h * 0.42, t1, { size: 36, weight: 800, fill: fg }) +
        text(24, h * 0.42 + 44, t2, { size: 36, weight: 800, fill: fg }),
      { frame: "#2a2e35", border: 14 },
    );
  b += poster(150, 90, 280, 340, C.tealInk, "Stay", "curious.", "#fff");
  b += poster(460, 150, 240, 280, C.coral, "Be", "useful.", "#fff");
  b += shelf(860, 190, 380, books(880, 190, 7) + mug(1170, 190, 0.7, C.teal2, { steam: false }));
  b += shelf(
    800,
    360,
    520,
    books(820, 360, 12) + plant(1220, 360, 0.42, { kind: "trail", pot: C.paper }),
  );
  b += plant(1430, 870, 1.05, { kind: "snake", pot: C.paper });
  b += sofa(420, 870, 780, C.tealInk);
  return end(b);
}

/** Team card placeholder until real headshots: a framed initial and the role. */
export function memberCard(name, role, color) {
  begin(800, 1000);
  let b = room([lighten(color, 0.35), darken(color, 0.12), lighten(color, 0.6)], {
    horizon: 0.66,
    leafX: 0.05,
  });
  b += frame(
    200,
    110,
    400,
    460,
    rect(0, 0, 372, 432, C.tealInk) +
      text(186, 300, name.slice(0, 1), { size: 240, weight: 800, fill: color, anchor: "middle" }),
    { frame: "#f4efe4", border: 14 },
  );
  b += plant(110, 900, 0.62, { kind: "snake" });
  b += box(
    250,
    810,
    300,
    80,
    60,
    C.tealInk,
    text(150, 52, role, { size: 32, weight: 700, fill: "#fff", anchor: "middle" }),
  );
  b += mug(670, 900, 0.85, C.paper);
  return end(b);
}

export function ogCard() {
  begin(1200, 630);
  let b = room("sun", { horizon: 0.72, leafX: 0.5 });
  b += text(70, 170, "Upsure Media", { size: 72, weight: 800, fill: C.tealInk });
  b += text(70, 226, "D2C & B2B brand and growth agency", { size: 30, weight: 600, fill: C.ink2 });
  b += text(70, 266, "Ahmedabad, India", { size: 30, weight: 600, fill: C.ink2 });
  b += kraftBox(640, 400, 180, 130, 56);
  b += phone(940, 600, 170, 350, reelScreen(170, 350));
  b += plant(1110, 570, 0.55, { kind: "fiddle" });
  return end(b);
}

// ---------- before / after (1600×1000, identical framing for the slider) ----------
function deskWithSite(site) {
  begin(1600, 1000);
  let b = room("paper", { horizon: 0.7, leafX: 0.04 });
  b += plant(130, 920, 0.8, { kind: "snake" });
  b += monitor(800, 930, 1080, site(1080, 648));
  b += mug(1450, 930, 1, C.sun);
  return end(b);
}
export function websiteBefore() {
  return deskWithSite((w, h) => {
    let s = rect(0, 0, w, h, "#ececec") + rect(0, 0, w, 60, "#d6d6d6");
    for (let i = 0; i < 7; i++) s += rect(30 + i * 130, 22, 100, 16, "#bdbdbd", { rx: 2 });
    for (let r = 0; r < 3; r++)
      for (let c = 0; c < 4; c++) {
        const x = 30 + c * 258;
        const y = 84 + r * 186;
        s += rect(x, y, 238, 170, ["#e2e2e2", "#cfcfcf", "#dadada"][(r + c) % 3], { rx: 2 });
        s += lines(x + 16, y + 120, 180, 2, { gap: 18, h: 8, op: 0.12 });
      }
    return s;
  });
}
export function websiteAfter() {
  return deskWithSite((w, h) => {
    let s = rect(0, 0, w, h, C.paper);
    s += brandMark(54, 52, 0.75, C.tealInk);
    s += ["Shop", "Story", "Stores"]
      .map((l, i) => text(640 + i * 110, 60, l, { size: 20, weight: 600, fill: C.ink2 }))
      .join("");
    s +=
      rect(950, 34, 100, 40, C.sun, { rx: 20 }) +
      text(1000, 60, "Cart", { size: 18, weight: 700, anchor: "middle" });
    s += text(54, 230, "Made for", { size: 76, weight: 800, fill: C.ink });
    s += text(54, 312, "everyday.", { size: 76, weight: 800, fill: C.teal2 });
    s += lines(56, 352, 400, 2, { gap: 24, h: 10, op: 0.2 });
    s +=
      rect(56, 420, 190, 56, C.tealInk, { rx: 28 }) +
      text(151, 455, "Shop now", { size: 20, weight: 700, fill: "#fff", anchor: "middle" });
    s += rect(560, 110, 470, 480, C.mint, { rx: 30 });
    s += bottle(720, 530, 110, 300, C.teal2, { cap: C.sun, brand: "nava." });
    s += jar(880, 530, 130, 160, C.sun, { cap: C.tealInk, brand: "nava." });
    return s;
  });
}

function headphones(cx, y, s = 1) {
  return (
    shadow(cx, y, 220 * s) +
    path(
      `M${cx - 80 * s},${y - 40 * s} C${cx - 90 * s},${y - 190 * s} ${cx + 90 * s},${y - 190 * s} ${cx + 80 * s},${y - 40 * s}`,
      "none",
      { stroke: "#2a2e35", sw: 16 * s },
    ) +
    rect(cx - 112 * s, y - 90 * s, 56 * s, 90 * s, cylFill(C.tealInk), { rx: 24 * s }) +
    rect(cx + 56 * s, y - 90 * s, 56 * s, 90 * s, cylFill(C.tealInk), { rx: 24 * s })
  );
}
const timeline = (w, h) => {
  let s =
    rect(0, 0, w, h, "#1c2127") +
    rect(
      w * 0.04,
      h * 0.06,
      w * 0.55,
      h * 0.5,
      lin(
        [
          [0, C.coral],
          [1, C.sun],
        ],
        [0, 0, 1, 1],
      ),
      { rx: 6 },
    );
  s += bottle(w * 0.31, h * 0.5, w * 0.08, h * 0.32, C.teal2, { cap: C.paper, label: C.paper });
  s +=
    rect(w * 0.63, h * 0.06, w * 0.33, h * 0.5, "#2a2e35", { rx: 6 }) +
    lines(w * 0.66, h * 0.12, w * 0.25, 6, { gap: h * 0.06, h: h * 0.02, fill: "#fff", op: 0.25 });
  [C.teal2, C.sun, C.coral, C.mint].forEach((c, i) => {
    for (let k = 0; k < 4; k++)
      s += rect(
        w * 0.04 + k * w * 0.23 + (i % 2) * w * 0.05,
        h * 0.62 + i * h * 0.085,
        w * 0.18,
        h * 0.06,
        c,
        { rx: 4, op: 0.85 },
      );
  });
  return s + rect(w * 0.42, h * 0.58, 3, h * 0.4, C.coral);
};
export function sceneEdit() {
  begin(1600, 900);
  let b = room("teal", { horizon: 0.64 });
  b += frame(
    150,
    110,
    260,
    320,
    rect(0, 0, 232, 292, C.sun) +
      circle(116, 130, 60, C.coral) +
      text(24, 250, "Cut. Post.", { size: 30, weight: 800, fill: C.tealInk }),
    { frame: "#2a2e35", border: 14 },
  );
  b += plant(1460, 790, 0.9, { kind: "fiddle", pot: C.sun });
  b += monitor(800, 790, 640, timeline(640, 384));
  b += headphones(380, 820, 1);
  b += mug(1180, 820, 1, C.paper);
  return end(b);
}
export function sceneLounge() {
  begin(1600, 900);
  let b = room("mint", { horizon: 0.74, leafX: 0.75 });
  b += frame(520, 90, 240, 300, rect(0, 0, 212, 272, C.tealInk) + sparkle(106, 136, 50), {
    frame: "#f4efe4",
    border: 14,
  });
  b += frame(800, 140, 300, 240, rect(0, 0, 272, 212, C.coral) + circle(136, 106, 60, C.sun), {
    frame: "#2a2e35",
    border: 14,
  });
  b += pendant(1340, 180, 48, C.teal2);
  b += plant(170, 840, 1.05, { kind: "snake" });
  b += sofa(400, 850, 860, C.coral);
  b += laptop(1000, 680, 200, chartScreen(200, 128));
  b += plant(1440, 860, 0.85, { kind: "fiddle", pot: C.tealInk });
  return end(b);
}
