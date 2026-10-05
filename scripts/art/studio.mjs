/**
 * "Studio still life" kit: every scene is the same room (a brand-colour wall,
 * a table, window light from the top right, film grain) with shaded objects
 * and soft contact shadows, so the artwork reads as one photo shoot.
 *
 * Scenes call begin(w, h), build a body string from the helpers below, then
 * return end(body). Gradients and filters are collected per scene.
 */

export const C = {
  paper: "#faf8f3",
  paper2: "#f1eee6",
  white: "#ffffff",
  ink: "#0b0d10",
  ink2: "#2a2e35",
  muted: "#5d626b",
  teal: "#0b7577",
  teal2: "#0f8b8d",
  tealSoft: "#d8efee",
  tealInk: "#0a1e21",
  coral: "#ff6b4a",
  coralSoft: "#ffe1d8",
  sun: "#ffd166",
  sunSoft: "#fff1c9",
  mint: "#bfe6e3",
  peach: "#ffc9b8",
  kraft: "#c99a6b",
  leaf: "#3f8f63",
  leafDark: "#1f5a43",
  leafLight: "#79b98a",
  wood: "#d9b48a",
  steel: "#c9ced4",
};

/** Wall, wall shade and table colours per mood. */
export const ROOMS = {
  sun: ["#ffe7a6", "#f3c560", "#fdf0cf"],
  teal: ["#e2f3f0", "#b5ddd8", "#f5fbf9"],
  peach: ["#ffdccf", "#f2b19b", "#fff0ea"],
  mint: ["#d6efe9", "#a9d8cf", "#f1faf7"],
  paper: ["#f6f1e6", "#e2d8c4", "#fbf8f1"],
  coral: ["#ffd2c4", "#f59c80", "#fff0ea"],
  night: ["#123a3e", "#0a1e21", "#1b4a4f"],
};

// ---------- colour ----------
const hex = (c) => c.match(/\w\w/g).map((x) => parseInt(x, 16));
const toHex = (a) =>
  `#${a
    .map((v) =>
      Math.round(Math.max(0, Math.min(255, v)))
        .toString(16)
        .padStart(2, "0"),
    )
    .join("")}`;
export const mix = (a, b, t) => toHex(hex(a).map((v, i) => v + (hex(b)[i] - v) * t));
export const lighten = (c, t) => mix(c, "#ffffff", t);
export const darken = (c, t) => mix(c, "#0a1e21", t);

// ---------- scene state ----------
let defs = [];
let uid = 0;
let blurs = new Map();
export let W = 0;
export let H = 0;

export function begin(w, h) {
  defs = [];
  uid = 0;
  blurs = new Map();
  W = w;
  H = h;
}

const nid = (p) => `${p}${++uid}`;
const stopsXml = (stops) =>
  stops
    .map(([o, c, a = 1]) => `<stop offset="${o}" stop-color="${c}" stop-opacity="${a}"/>`)
    .join("");

/** Linear gradient; direction as [x1, y1, x2, y2] in bounding-box units. */
export function lin(stops, [x1, y1, x2, y2] = [0, 0, 0, 1]) {
  const i = nid("l");
  defs.push(
    `<linearGradient id="${i}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">${stopsXml(stops)}</linearGradient>`,
  );
  return `url(#${i})`;
}
export function rad(stops, cx = 0.5, cy = 0.5, r = 0.5) {
  const i = nid("r");
  defs.push(
    `<radialGradient id="${i}" cx="${cx}" cy="${cy}" r="${r}">${stopsXml(stops)}</radialGradient>`,
  );
  return `url(#${i})`;
}
export function blur(s) {
  const k = Math.round(s * 10) / 10;
  if (!blurs.has(k)) {
    const i = nid("b");
    defs.push(
      `<filter id="${i}" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="${k}"/></filter>`,
    );
    blurs.set(k, `url(#${i})`);
  }
  return blurs.get(k);
}
export function clip(shape) {
  const i = nid("c");
  defs.push(`<clipPath id="${i}">${shape}</clipPath>`);
  return `url(#${i})`;
}
export const g = (t, body) => `<g transform="${t}">${body}</g>`;
export const rect = (x, y, w, h, fill, o = {}) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.rx ?? 0}" fill="${fill}"${o.op != null ? ` opacity="${o.op}"` : ""}${o.stroke ? ` stroke="${o.stroke}" stroke-width="${o.sw ?? 2}"` : ""}${o.filter ? ` filter="${o.filter}"` : ""}/>`;
export const circle = (cx, cy, r, fill, o = {}) =>
  `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"${o.op != null ? ` opacity="${o.op}"` : ""}${o.stroke ? ` stroke="${o.stroke}" stroke-width="${o.sw ?? 2}"` : ""}${o.filter ? ` filter="${o.filter}"` : ""}/>`;
export const path = (d, fill, o = {}) =>
  `<path d="${d}" fill="${fill}"${o.op != null ? ` opacity="${o.op}"` : ""}${o.stroke ? ` stroke="${o.stroke}" stroke-width="${o.sw ?? 2}" stroke-linecap="round" stroke-linejoin="round"` : ""}${o.filter ? ` filter="${o.filter}"` : ""}/>`;
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
export const text = (x, y, s, o = {}) =>
  `<text x="${x}" y="${y}" font-family="Segoe UI, Arial, sans-serif" font-size="${o.size ?? 24}" font-weight="${o.weight ?? 600}" fill="${o.fill ?? C.ink}" text-anchor="${o.anchor ?? "start"}"${o.ls ? ` letter-spacing="${o.ls}"` : ""}${o.op != null ? ` opacity="${o.op}"` : ""}>${esc(s)}</text>`;
/** Greeked text lines. */
export function lines(x, y, w, n, o = {}) {
  let s = "";
  for (let i = 0; i < n; i++) {
    const lw = i === n - 1 ? w * 0.6 : w * (0.85 + ((i * 37) % 15) / 100);
    s += rect(x, y + i * (o.gap ?? 18), Math.min(lw, w), o.h ?? 8, o.fill ?? "#0b0d10", {
      rx: (o.h ?? 8) / 2,
      op: o.op ?? 0.16,
    });
  }
  return s;
}

// ---------- room ----------
/**
 * The shared set. `horizon` is where the wall meets the table (0..1 of H).
 * Light comes from a window at the top right: two soft panes on the wall,
 * and an optional plant shadow on the left.
 */
export function room(mood = "sun", o = {}) {
  const [wall, shade, table] = ROOMS[mood] ?? mood;
  const hz = Math.round(H * (o.horizon ?? 0.64));
  const dark = mood === "night";
  let s = rect(
    0,
    0,
    W,
    hz + 2,
    lin([
      [0, lighten(wall, 0.08)],
      [1, mix(wall, shade, 0.55)],
    ]),
  );
  // window light
  const lw = W * 0.2;
  const lx = W * (o.windowX ?? 0.62);
  const panes = [0, 1]
    .map((i) => {
      const x = lx + i * (lw + W * 0.025);
      return path(
        `M${x},${-20} L${x + lw},${-20} L${x + lw - W * 0.1},${hz} L${x - W * 0.1},${hz} Z`,
        "#ffffff",
        { op: dark ? 0.06 : 0.3 },
      );
    })
    .join("");
  s += g("", `<g filter="${blur(W * 0.012)}">${panes}</g>`);
  if (o.leafShadow !== false) s += leafShadow(W * (o.leafX ?? 0.12), hz * 0.12, W * 0.2, dark);
  // table
  s += rect(
    0,
    hz,
    W,
    H - hz,
    lin([
      [0, table],
      [0.55, mix(table, shade, 0.25)],
      [1, mix(table, shade, 0.5)],
    ]),
  );
  s += path(
    `M${lx - W * 0.1},${hz} L${lx + 2 * lw + W * 0.025 - W * 0.1},${hz} L${lx + 2 * lw - W * 0.2},${H} L${lx - W * 0.25},${H} Z`,
    "#ffffff",
    { op: dark ? 0.04 : 0.16, filter: blur(W * 0.02) },
  );
  s += rect(0, hz - 3, W, 10, darken(shade, 0.4), { op: 0.12, filter: blur(4) });
  s += rect(0, hz, W, 2, "#ffffff", { op: dark ? 0.08 : 0.5 });
  return s;
}

function leafShadow(x, y, w, dark) {
  let leaves = "";
  for (let i = 0; i < 9; i++) {
    const a = -70 + i * 17;
    const l = w * (0.5 + ((i * 29) % 25) / 100);
    const lw = w * 0.07;
    leaves += g(
      `translate(${x + (i - 4) * w * 0.02},${y + w * 1.25}) rotate(${a})`,
      path(
        `M0,0 C${lw},${-l * 0.3} ${lw * 0.8},${-l * 0.8} 0,${-l} C${-lw * 0.8},${-l * 0.8} ${-lw},${-l * 0.3} 0,0 Z`,
        "#000",
      ),
    );
  }
  for (let i = 0; i < 5; i++)
    leaves += path(
      `M${x + (i - 2) * w * 0.05},${y + w * 1.9} Q${x + (i - 2) * w * 0.08},${y + w * 1.5} ${x + (i - 2) * w * 0.14},${y + w * 1.2}`,
      "none",
      { stroke: "#000", sw: w * 0.012 },
    );
  return `<g opacity="${dark ? 0.2 : 0.09}" filter="${blur(w * 0.014)}">${leaves}</g>`;
}

/** Grain + vignette, then the svg wrapper. */
export function end(body, o = {}) {
  const grain = nid("n");
  defs.push(
    `<filter id="${grain}" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>`,
  );
  const vig = rad(
    [
      [0.6, "#000", 0],
      [1, "#0a1e21", o.vignette ?? 0.22],
    ],
    0.5,
    0.42,
    0.75,
  );
  return [
    W,
    H,
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><defs>${defs.join("")}</defs>${body}<rect width="${W}" height="${H}" fill="${vig}"/><rect width="${W}" height="${H}" filter="url(#${grain})" opacity="${o.grain ?? 0.07}"/></svg>`,
  ];
}

// ---------- light & shadow ----------
/**
 * Grounding shadow for an object whose base is centred at (cx, y) and is w
 * wide: a tight dark contact line plus a wide soft cast toward the left
 * (light is top right). `lift` raises the object off the table.
 */
export function shadow(cx, y, w, o = {}) {
  const lift = o.lift ?? 0;
  const k = o.k ?? 1;
  let s = "";
  s += `<ellipse cx="${cx - w * 0.14 - lift * 0.3}" cy="${y + lift * 0.4}" rx="${w * 0.62 + lift * 0.3}" ry="${w * 0.1 + lift * 0.08}" fill="#0a1e21" opacity="${0.2 * k}" filter="${blur(w * 0.06 + lift * 0.25)}"/>`;
  if (lift < 8)
    s += `<ellipse cx="${cx}" cy="${y}" rx="${w * 0.5}" ry="${Math.max(3, w * 0.03)}" fill="#0a1e21" opacity="${0.42 * k}" filter="${blur(Math.max(2, w * 0.012))}"/>`;
  return s;
}

/** Horizontal cylinder shading for a colour: dark edge, body, highlight, rim. */
export function cylFill(c, o = {}) {
  const hi = o.hi ?? 0.35;
  return lin(
    [
      [0, darken(c, 0.32)],
      [0.14, darken(c, 0.08)],
      [0.55, lighten(c, 0.12)],
      [0.68, lighten(c, hi)],
      [0.78, lighten(c, 0.1)],
      [1, darken(c, 0.38)],
    ],
    [0, 0, 1, 0],
  );
}
/** Flat face with a soft top-right light falloff. */
export const faceFill = (c, t = 0.1) =>
  lin(
    [
      [0, lighten(c, t)],
      [1, darken(c, t)],
    ],
    [1, 0, 0, 1],
  );
/** Diagonal glass glare for screens. */
export const glare = (x, y, w, h, rx = 0) =>
  `<path d="M${x + w * 0.45},${y} L${x + w},${y} L${x + w},${y + h * 0.55} Z" fill="#ffffff" opacity="0.1"/>` +
  rect(x, y, w, h, "none", { rx, stroke: "#ffffff", sw: 1.5, op: 0.15 });

// ---------- props ----------
/** Ceramic pot + plant. kind: "snake" | "fiddle" | "trail". Base centred at (x, y). */
export function plant(x, y, s = 1, o = {}) {
  const kind = o.kind ?? "fiddle";
  const potC = o.pot ?? C.paper;
  const pw = 150 * s;
  const ph = 140 * s;
  let leaves = "";
  if (kind === "snake") {
    const blades = [
      [-30, 330, -9],
      [-12, 400, -3],
      [8, 360, 4],
      [26, 300, 10],
      [-44, 250, -16],
      [40, 240, 17],
    ];
    for (const [dx, l, a] of blades) {
      const L = l * s;
      const bw = 26 * s;
      leaves += g(
        `translate(${dx * s},${-ph + 6 * s}) rotate(${a})`,
        path(
          `M${-bw / 2},0 C${-bw * 0.7},${-L * 0.5} ${-bw * 0.3},${-L * 0.85} 0,${-L} C${bw * 0.3},${-L * 0.85} ${bw * 0.7},${-L * 0.5} ${bw / 2},0 Z`,
          lin(
            [
              [0, C.leafLight],
              [0.25, C.leaf],
              [0.75, C.leafDark],
              [1, "#c9b45a"],
            ],
            [0, 0, 1, 0],
          ),
        ) +
          path(
            `M${-bw * 0.15},${-L * 0.15} L${-bw * 0.05},${-L * 0.75} M${bw * 0.15},${-L * 0.25} L${bw * 0.08},${-L * 0.6}`,
            "none",
            { stroke: "#ffffff", sw: 2 * s, op: 0.18 },
          ),
      );
    }
  } else if (kind === "trail") {
    for (let i = 0; i < 14; i++) {
      const side = i % 2 ? 1 : -1;
      const lx = side * (40 + (i % 5) * 14) * s;
      const ly = (-ph * 0.8 + i * 16 * s) * (i > 7 ? 1 : 0.6);
      leaves += g(`translate(${lx},${ly}) rotate(${side * (30 + i * 9)})`, heartLeaf(34 * s));
    }
    for (let i = 0; i < 7; i++)
      leaves += g(
        `translate(${(-50 + i * 17) * s},${-ph - 20 * s}) rotate(${-60 + i * 20})`,
        heartLeaf(40 * s),
      );
  } else {
    const ls = [
      [-70, 250, -38],
      [-30, 330, -14],
      [10, 360, 6],
      [50, 300, 30],
      [-55, 180, -60],
      [65, 200, 55],
      [0, 270, -2],
      [28, 220, 18],
    ];
    for (const [dx, l, a] of ls) {
      const L = l * s;
      leaves += path(
        `M${dx * 0.3 * s},${-ph} Q${dx * 0.6 * s},${-ph - L * 0.5} ${dx * s},${-ph - L * 0.78}`,
        "none",
        { stroke: C.leafDark, sw: 5 * s },
      );
      leaves += g(`translate(${dx * s},${-ph - L * 0.75}) rotate(${a})`, ovalLeaf(62 * s, 112 * s));
    }
  }
  return (
    shadow(x, y, pw * 1.1) +
    g(
      `translate(${x},${y})`,
      leaves +
        path(
          `M${-pw / 2},${-ph} L${pw / 2},${-ph} L${pw * 0.4},0 L${-pw * 0.4},0 Z`,
          cylFill(potC, { hi: 0.5 }),
        ) +
        rect(
          -pw / 2 - 6 * s,
          -ph - 14 * s,
          pw + 12 * s,
          22 * s,
          cylFill(lighten(potC, 0.1), { hi: 0.6 }),
          { rx: 8 * s },
        ) +
        `<ellipse cx="0" cy="${-ph - 12 * s}" rx="${pw / 2}" ry="${8 * s}" fill="#5b4632"/>`,
    )
  );
}
function ovalLeaf(w, h) {
  return (
    path(
      `M0,${h / 2} C${w * 0.75},${h * 0.3} ${w * 0.6},${-h * 0.45} 0,${-h / 2} C${-w * 0.6},${-h * 0.45} ${-w * 0.75},${h * 0.3} 0,${h / 2} Z`,
      lin(
        [
          [0, C.leafLight],
          [0.45, C.leaf],
          [1, C.leafDark],
        ],
        [1, 0, 0, 1],
      ),
    ) + path(`M0,${h / 2} L0,${-h * 0.42}`, "none", { stroke: "#ffffff", sw: 2, op: 0.3 })
  );
}
function heartLeaf(s) {
  return path(
    `M0,${s * 0.6} C${s * 0.7},${s * 0.1} ${s * 0.6},${-s * 0.6} 0,${-s * 0.3} C${-s * 0.6},${-s * 0.6} ${-s * 0.7},${s * 0.1} 0,${s * 0.6} Z`,
    lin(
      [
        [0, C.leafLight],
        [1, C.leafDark],
      ],
      [1, 0, 0, 1],
    ),
  );
}

/** Box standing on the table, base-left at (x, y+h). Front gets `content` (0,0 = front top-left). */
export function box(x, y, w, h, d, color, content = "", o = {}) {
  const dy = d * 0.5;
  return (
    shadow(x + w / 2 + d * 0.3, y + h, w + d * 0.6) +
    g(
      `translate(${x},${y})`,
      path(
        `M${w},0 L${w + d},${-dy} L${w + d},${h - dy} L${w},${h} Z`,
        faceFill(darken(color, 0.2), 0.06),
      ) +
        path(
          `M0,0 L${d},${-dy} L${w + d},${-dy} L${w},0 Z`,
          faceFill(lighten(color, o.topLight ?? 0.22), 0.05),
        ) +
        rect(0, 0, w, h, faceFill(color, 0.07)) +
        rect(0, 0, w, 3, "#ffffff", { op: 0.25 }) +
        content,
    )
  );
}
export function kraftBox(x, y, w, h, d, label = true) {
  return box(
    x,
    y,
    w,
    h,
    d,
    C.kraft,
    rect(w / 2 - w * 0.07, 0, w * 0.14, h, "#e8cfae", { op: 0.85 }) +
      (label
        ? rect(w * 0.08, h * 0.62, w * 0.36, h * 0.24, "#ffffff", { rx: 4 }) +
          lines(w * 0.11, h * 0.67, w * 0.26, 2, { gap: 14, h: 6 })
        : ""),
  );
}

/** Upright cylinder product (bottle/jar). Base centred at (cx, y). */
export function bottle(cx, y, w, h, color, o = {}) {
  const cap = o.cap ?? C.ink;
  const neck = o.neck ?? 0.22;
  const nw = w * (o.neckW ?? 0.42);
  const bodyH = h * (1 - neck);
  const label = o.label ?? C.paper;
  return (
    shadow(cx, y, w * 1.05) +
    g(
      `translate(${cx - w / 2},${y - h})`,
      rect((w - nw) / 2, 0, nw, h * neck + 10, cylFill(cap), { rx: 6 }) +
        rect(0, h * neck, w, bodyH, cylFill(color), { rx: Math.min(w * 0.22, 30) }) +
        (label === false
          ? ""
          : rect(
              w * 0.1,
              h * neck + bodyH * 0.32,
              w * 0.8,
              bodyH * 0.38,
              cylFill(label, { hi: 0.4 }),
              { rx: 4 },
            ) +
            (o.brand
              ? text(w / 2, h * neck + bodyH * 0.53, o.brand, {
                  size: Math.max(12, w * 0.16),
                  weight: 800,
                  anchor: "middle",
                  fill: o.brandFill ?? C.tealInk,
                })
              : "") +
            lines(w * 0.24, h * neck + bodyH * 0.58, w * 0.52, 2, { gap: 10, h: 4 })),
    )
  );
}
export function jar(cx, y, w, h, color, o = {}) {
  return bottle(cx, y, w, h, color, { neck: 0.2, neckW: 0.92, cap: o.cap ?? C.sun, ...o });
}
/** Stand-up pouch. */
export function pouch(cx, y, w, h, color, o = {}) {
  return (
    shadow(cx, y, w) +
    g(
      `translate(${cx - w / 2},${y - h})`,
      path(
        `M${w * 0.06},0 L${w * 0.94},0 L${w},${h * 0.9} Q${w / 2},${h * 1.04} 0,${h * 0.9} Z`,
        cylFill(color, { hi: 0.25 }),
      ) +
        rect(w * 0.06, 0, w * 0.88, h * 0.08, darken(color, 0.15)) +
        rect(w * 0.2, h * 0.4, w * 0.6, h * 0.3, C.paper, { rx: 6, op: 0.95 }) +
        (o.brand
          ? text(w / 2, h * 0.56, o.brand, {
              size: w * 0.14,
              weight: 800,
              anchor: "middle",
              fill: C.tealInk,
            })
          : "") +
        lines(w * 0.3, h * 0.6, w * 0.4, 1, { h: 4 }),
    )
  );
}
export function mug(cx, y, s = 1, color = C.paper, o = {}) {
  const w = 96 * s;
  const h = 104 * s;
  return (
    shadow(cx, y, w * 1.2) +
    g(
      `translate(${cx - w / 2},${y - h})`,
      path(
        `M${w - 4 * s},${h * 0.25} C${w + 46 * s},${h * 0.2} ${w + 46 * s},${h * 0.8} ${w - 4 * s},${h * 0.72}`,
        "none",
        { stroke: darken(color, 0.15), sw: 13 * s },
      ) +
        rect(0, 0, w, h, cylFill(color, { hi: 0.5 }), { rx: 10 * s }) +
        `<ellipse cx="${w / 2}" cy="${4 * s}" rx="${w / 2 - 3 * s}" ry="${9 * s}" fill="${o.drink ?? "#7a4a2a"}"/>` +
        (o.steam === false
          ? ""
          : `<g opacity="0.35" filter="${blur(4 * s)}">${path(`M${w * 0.35},${-10 * s} C${w * 0.2},${-50 * s} ${w * 0.55},${-70 * s} ${w * 0.4},${-115 * s}`, "none", { stroke: "#fff", sw: 9 * s })}${path(`M${w * 0.62},${-14 * s} C${w * 0.5},${-50 * s} ${w * 0.8},${-80 * s} ${w * 0.64},${-120 * s}`, "none", { stroke: "#fff", sw: 7 * s })}</g>`),
    )
  );
}

/** Phone standing upright at base-centre (cx, y). `screen` drawn in a w×h box. */
export function phone(cx, y, w, h, screen, o = {}) {
  const r = w * 0.15;
  const stand = o.stand !== false;
  const lift = stand ? h * 0.06 : 0;
  const x = cx - w / 2;
  const top = y - h - lift;
  return (
    shadow(cx, y, w * 1.25, { lift: o.lift ?? 0 }) +
    (stand
      ? path(
          `M${cx - w * 0.36},${y} L${cx + w * 0.36},${y} L${cx + w * 0.22},${y - lift - h * 0.05} L${cx - w * 0.22},${y - lift - h * 0.05} Z`,
          faceFill(o.standColor ?? "#e9e4da", 0.1),
        )
      : "") +
    g(
      `translate(${x},${top})${o.rotate ? ` rotate(${o.rotate} ${w / 2} ${h})` : ""}`,
      rect(
        -w * 0.04,
        -w * 0.04,
        w * 1.08,
        h + w * 0.08,
        lin(
          [
            [0, "#5b636c"],
            [0.5, "#1c2127"],
            [1, "#3a4048"],
          ],
          [0, 0, 1, 1],
        ),
        { rx: r + w * 0.04 },
      ) +
        rect(0, 0, w, h, "#fff", { rx: r }) +
        `<g clip-path="${clip(rect(0, 0, w, h, "#000", { rx: r }))}">${screen}</g>` +
        rect(w / 2 - w * 0.14, w * 0.04, w * 0.28, w * 0.07, C.ink, { rx: w * 0.035 }) +
        glare(0, 0, w, h, r),
    )
  );
}

/** Open laptop seen from the front. Base centred at (cx, y); w is the screen width. */
export function laptop(cx, y, w, screen, o = {}) {
  const h = w * 0.64;
  const x = cx - w / 2;
  const deck = w * 0.07;
  const lid = o.lid ?? "#c9ced4";
  return (
    shadow(cx, y, w * 1.3) +
    g(
      `translate(${x},${y - h - deck})`,
      rect(
        -w * 0.025,
        -w * 0.025,
        w * 1.05,
        h + w * 0.04,
        lin([
          [0, "#2a3038"],
          [1, "#11151a"],
        ]),
        { rx: w * 0.03 },
      ) +
        `<g clip-path="${clip(rect(0, 0, w, h, "#000", { rx: 6 }))}">${rect(0, 0, w, h, "#fff")}${screen}</g>` +
        glare(0, 0, w, h, 6) +
        path(
          `M${-w * 0.03},${h + w * 0.015} L${w * 1.03},${h + w * 0.015} L${w * 1.1},${h + deck} L${-w * 0.1},${h + deck} Z`,
          lin([
            [0, lighten(lid, 0.3)],
            [1, darken(lid, 0.15)],
          ]),
        ) +
        rect(w * 0.42, h + w * 0.015, w * 0.16, deck * 0.25, darken(lid, 0.2), { rx: 3 }),
    )
  );
}

/** Desktop monitor on a foot. Base centred at (cx, y). */
export function monitor(cx, y, w, screen) {
  const h = w * 0.6;
  const neck = w * 0.18;
  return (
    shadow(cx, y, w * 0.6) +
    g(
      `translate(${cx - w / 2},${y - h - neck})`,
      rect(w * 0.46, h, w * 0.08, neck, cylFill("#c9ced4")) +
        path(
          `M${w * 0.32},${h + neck} L${w * 0.68},${h + neck} L${w * 0.62},${h + neck - 14} L${w * 0.38},${h + neck - 14} Z`,
          faceFill("#d6dadf"),
        ) +
        rect(
          -12,
          -12,
          w + 24,
          h + 24,
          lin([
            [0, "#2a3038"],
            [1, "#0e1215"],
          ]),
          { rx: 14 },
        ) +
        `<g clip-path="${clip(rect(0, 0, w, h, "#000", { rx: 4 }))}">${rect(0, 0, w, h, "#fff")}${screen}</g>` +
        glare(0, 0, w, h, 4),
    )
  );
}

/** Paper card floating in front of the wall (UI callout). */
export function floatCard(x, y, w, h, content = "", o = {}) {
  return (
    `<rect x="${x + 10}" y="${y + 26}" width="${w}" height="${h}" rx="${o.rx ?? 18}" fill="#0a1e21" opacity="0.16" filter="${blur(18)}"/>` +
    g(`translate(${x},${y})`, rect(0, 0, w, h, o.fill ?? C.white, { rx: o.rx ?? 18 }) + content)
  );
}

/**
 * Paper lying on the table: drawn flat, turned in its own plane, then
 * foreshortened (squashed vertically) so it reads as seen from above at an angle.
 * (x, y) is the centre of the footprint.
 */
export function flat(x, y, w, h, fill, content = "", o = {}) {
  const k = o.squash ?? 0.5;
  const r = o.rotate ?? 0;
  const t = o.thick ?? 3;
  return (
    `<ellipse cx="${x - w * 0.06}" cy="${y + h * k * 0.12}" rx="${w * 0.58}" ry="${h * k * 0.62}" fill="#0a1e21" opacity="0.13" filter="${blur(12)}"/>` +
    g(
      `translate(${x},${y}) scale(1,${k}) rotate(${r})`,
      rect(
        -w / 2,
        -h / 2 + t,
        w,
        h,
        darken(typeof fill === "string" && fill.startsWith("#") ? fill : "#e9e4da", 0.12),
        { rx: o.rx ?? 6 },
      ) + g(`translate(${-w / 2},${-h / 2})`, rect(0, 0, w, h, fill, { rx: o.rx ?? 6 }) + content),
    )
  );
}

/** Ring light on a stand, centred at (cx, cy); stand down to y. */
export function ringLight(cx, cy, r, y) {
  return (
    circle(cx, cy, r * 1.25, "#ffffff", { op: 0.45, filter: blur(r * 0.35) }) +
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#ffffff" stroke-width="${r * 0.2}"/>` +
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#fff8e6" stroke-width="${r * 0.08}"/>` +
    `<circle cx="${cx}" cy="${cy}" r="${r * 1.1}" fill="none" stroke="#d8d4cc" stroke-width="3"/>` +
    rect(cx - 5, cy + r * 1.08, 10, y - cy - r * 1.08, cylFill("#2a2e35")) +
    tripodLegs(cx, y, r * 0.9)
  );
}
export function tripodLegs(cx, y, spread) {
  return (
    shadow(cx, y + 6, spread * 2.2, { k: 0.7 }) +
    path(
      `M${cx},${y - spread * 0.7} L${cx - spread},${y + 8} M${cx},${y - spread * 0.7} L${cx + spread},${y + 8} M${cx},${y - spread * 0.7} L${cx + 6},${y + 14}`,
      "none",
      { stroke: "#1c2127", sw: 9 },
    )
  );
}

/** Podcast/condenser mic on a desk stand. Base centred at (cx, y). */
export function mic(cx, y, s = 1) {
  return (
    shadow(cx, y, 120 * s) +
    `<ellipse cx="${cx}" cy="${y - 8 * s}" rx="${60 * s}" ry="${14 * s}" fill="${cylFill("#2a2e35")}"/>` +
    rect(cx - 6 * s, y - 160 * s, 12 * s, 152 * s, cylFill("#3a4048")) +
    rect(cx - 34 * s, y - 330 * s, 68 * s, 170 * s, cylFill("#2a2e35"), { rx: 34 * s }) +
    Array.from({ length: 7 }, (_, i) =>
      rect(cx - 30 * s, y - 310 * s + i * 14 * s, 60 * s, 4 * s, "#ffffff", { op: 0.12, rx: 2 }),
    ).join("") +
    rect(cx - 40 * s, y - 200 * s, 80 * s, 14 * s, cylFill("#c9ced4"), { rx: 7 * s })
  );
}

/** DSLR camera seen from the front, base centred at (cx, y). */
export function camera(cx, y, s = 1, o = {}) {
  const w = 230 * s;
  const h = 150 * s;
  return (
    (o.noShadow ? "" : shadow(cx, y, w)) +
    g(
      `translate(${cx - w / 2},${y - h})`,
      rect(w * 0.12, -h * 0.14, w * 0.3, h * 0.2, faceFill("#2a2e35"), { rx: 8 * s }) +
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
        rect(0, h * 0.18, w, h * 0.5, "#1c2127", { op: 0.6 }) +
        circle(w * 0.55, h * 0.52, h * 0.44, cylFill("#2a2e35")) +
        circle(
          w * 0.55,
          h * 0.52,
          h * 0.32,
          rad(
            [
              [0, "#3b6f86"],
              [0.55, "#0e2a35"],
              [1, "#05090c"],
            ],
            0.38,
            0.35,
            0.7,
          ),
        ) +
        circle(w * 0.48, h * 0.42, h * 0.07, "#ffffff", { op: 0.55 }) +
        circle(w * 0.86, h * 0.1, h * 0.06, C.coral),
    )
  );
}

/** Sticky note. */
export const sticky = (x, y, s, color, rot = 0) =>
  g(
    `translate(${x},${y}) rotate(${rot})`,
    rect(4, 8, s, s, "#0a1e21", { op: 0.15, filter: blur(5) }) +
      rect(0, 0, s, s, faceFill(color, 0.08)) +
      lines(s * 0.14, s * 0.24, s * 0.62, 3, { gap: s * 0.16, h: s * 0.05, op: 0.25 }),
  );

/** Board leaning on / hung on the wall with sticky notes. */
export function board(x, y, w, h, o = {}) {
  const cols = o.cols ?? 3;
  const colors = o.colors ?? [C.sun, C.mint, C.peach, C.coralSoft, C.tealSoft];
  let s =
    rect(x + 12, y + 22, w, h, "#0a1e21", { op: 0.16, filter: blur(16), rx: 10 }) +
    rect(x - 10, y - 10, w + 20, h + 20, faceFill("#e9e2d4", 0.06), { rx: 12 }) +
    rect(x, y, w, h, faceFill(o.fill ?? "#fbfaf6", 0.04), { rx: 6 });
  const cw = w / cols;
  for (let c = 0; c < cols; c++) {
    if (o.headers)
      s += text(x + c * cw + 22, y + 46, o.headers[c] ?? "", {
        size: Math.min(26, cw * 0.11),
        weight: 700,
        fill: C.ink2,
      });
    const rows = o.rows ?? 3;
    const ns = Math.min(cw * 0.36, (h - 90) / rows - 14);
    for (let r = 0; r < rows; r++)
      for (let k = 0; k < 2; k++) {
        if ((c + r + k) % 5 === 4) continue;
        s += sticky(
          x + c * cw + 22 + k * (ns + 12),
          y + 70 + r * (ns + 16),
          ns,
          colors[(c * 2 + r + k) % colors.length],
          ((c + r * 3 + k) % 5) - 2,
        );
      }
    if (c > 0) s += rect(x + c * cw, y + 20, 2, h - 40, C.ink, { op: 0.08 });
  }
  return s;
}

/** Spiral notebook lying open. */
export function notebook(x, y, w, h, left = "", right = "", o = {}) {
  return flat(
    x,
    y,
    w,
    h,
    faceFill(o.cover ?? C.tealInk, 0.05),
    rect(8, 8, w / 2 - 10, h - 16, "#fffdf8", { rx: 4 }) +
      rect(w / 2 + 2, 8, w / 2 - 10, h - 16, "#fffdf8", { rx: 4 }) +
      rect(w / 2 - 3, 8, 6, h - 16, "#0a1e21", { op: 0.12 }) +
      g(`translate(8,8)`, left) +
      g(`translate(${w / 2 + 2},8)`, right),
    { rotate: o.rotate ?? -4, squash: o.squash ?? 0.55, rx: 8, thick: 8 },
  );
}
export function pencil(x, y, l, rot = 0, color = C.sun) {
  return g(
    `translate(${x},${y}) rotate(${rot})`,
    rect(4, 10, l, 14, "#0a1e21", { op: 0.18, filter: blur(4) }) +
      rect(0, 0, l, 14, cylFill(color), { rx: 3 }) +
      rect(-18, 0, 20, 14, cylFill("#f3a6a0"), { rx: 3 }) +
      path(`M${l},0 L${l + 30},7 L${l},14 Z`, "#f0d6b4") +
      path(`M${l + 20},4.5 L${l + 30},7 L${l + 20},9.5 Z`, C.ink2),
  );
}

/** Wall frame / poster with content (0,0 at inner top-left). */
export function frame(x, y, w, h, content, o = {}) {
  const b = o.border ?? 14;
  return (
    rect(x + 8, y + 18, w, h, "#0a1e21", { op: 0.18, filter: blur(14), rx: 4 }) +
    rect(x, y, w, h, faceFill(o.frame ?? "#2a2e35", 0.1), { rx: 4 }) +
    g(
      `translate(${x + b},${y + b})`,
      `<g clip-path="${clip(rect(0, 0, w - 2 * b, h - 2 * b, "#000"))}">${rect(0, 0, w - 2 * b, h - 2 * b, o.fill ?? C.paper)}${content}</g>`,
    ) +
    glare(x + b, y + b, w - 2 * b, h - 2 * b)
  );
}

/** Pendant lamp hanging from the top edge. */
export function pendant(cx, cordTo, r, color = C.sun) {
  return (
    rect(cx - 1.5, 0, 3, cordTo - r * 0.6, "#2a2e35") +
    circle(cx, cordTo + r * 0.6, r * 2.4, "#fff3c4", { op: 0.35, filter: blur(r * 0.8) }) +
    path(
      `M${cx - r},${cordTo + r * 0.4} Q${cx - r},${cordTo - r * 0.7} ${cx},${cordTo - r * 0.7} Q${cx + r},${cordTo - r * 0.7} ${cx + r},${cordTo + r * 0.4} Z`,
      cylFill(color, { hi: 0.4 }),
    ) +
    `<ellipse cx="${cx}" cy="${cordTo + r * 0.4}" rx="${r}" ry="${r * 0.18}" fill="#fff8dd"/>`
  );
}

// ---------- screens (drawn into a w×h box) ----------
export function chartScreen(w, h, o = {}) {
  const pad = w * 0.06;
  let s = rect(0, 0, w, h, o.bg ?? "#f7f8f6");
  s += rect(0, 0, w, h * 0.12, o.bar ?? C.tealInk);
  s +=
    circle(pad, h * 0.06, h * 0.022, C.sun) +
    lines(pad * 1.6, h * 0.05, w * 0.2, 1, { fill: "#fff", op: 0.6, h: h * 0.02 });
  const kw = (w - pad * 2 - 20) / 3;
  (o.kpis ?? ["Reach", "Leads", "ROAS"]).forEach((k, i) => {
    s += rect(pad + i * (kw + 10), h * 0.17, kw, h * 0.2, "#fff", { rx: 8 });
    s += text(pad + i * (kw + 10) + 12, h * 0.17 + h * 0.07, k, {
      size: Math.max(10, h * 0.04),
      weight: 600,
      fill: C.muted,
    });
    s += rect(
      pad + i * (kw + 10) + 12,
      h * 0.17 + h * 0.1,
      kw * 0.5,
      h * 0.05,
      [C.teal2, C.coral, C.ink][i],
      { rx: 3, op: 0.85 },
    );
  });
  const cx = pad;
  const cy = h * 0.42;
  const cw = w - pad * 2;
  const ch = h * 0.5;
  s += rect(cx, cy, cw, ch, "#fff", { rx: 8 });
  const pts = o.pts ?? [0.2, 0.28, 0.25, 0.4, 0.38, 0.55, 0.6, 0.72, 0.86];
  const P = pts.map((p, i) => [
    cx + 16 + (i * (cw - 32)) / (pts.length - 1),
    cy + ch - 16 - p * (ch - 40),
  ]);
  s += path(
    `M${P.map((p) => p.join(",")).join(" L")} L${P.at(-1)[0]},${cy + ch - 12} L${P[0][0]},${cy + ch - 12} Z`,
    lin([
      [0, C.teal2, 0.3],
      [1, C.teal2, 0],
    ]),
  );
  s += path(`M${P.map((p) => p.join(",")).join(" L")}`, "none", {
    stroke: C.teal2,
    sw: Math.max(3, w * 0.008),
  });
  s += circle(...P.at(-1), Math.max(5, w * 0.012), C.sun, { stroke: C.teal2, sw: 3 });
  return s;
}
export function reelScreen(w, h, o = {}) {
  const c = o.color ?? C.coral;
  return (
    rect(
      0,
      0,
      w,
      h,
      lin(
        [
          [0, lighten(c, 0.35)],
          [1, c],
        ],
        [0, 0, 1, 1],
      ),
    ) +
    (o.subject ??
      bottle(w / 2, h * 0.7, w * 0.3, h * 0.42, C.teal2, { cap: C.sun, brand: "nava." })) +
    circle(w / 2, h * 0.36, w * 0.12, "#ffffff", { op: 0.75 }) +
    path(
      `M${w / 2 - w * 0.035},${h * 0.36 - w * 0.06} L${w / 2 + w * 0.07},${h * 0.36} L${w / 2 - w * 0.035},${h * 0.36 + w * 0.06} Z`,
      c,
    ) +
    rect(w * 0.08, h * 0.84, w * 0.55, h * 0.025, "#fff", { rx: 4 }) +
    rect(w * 0.08, h * 0.885, w * 0.38, h * 0.02, "#fff", { rx: 4, op: 0.7 }) +
    heart(w * 0.88, h * 0.62, w * 0.07) +
    circle(w * 0.88, h * 0.72, w * 0.035, "#fff", { op: 0.85 }) +
    circle(w * 0.88, h * 0.8, w * 0.035, "#fff", { op: 0.85 })
  );
}
export const heart = (cx, cy, s, fill = "#ffffff") =>
  path(
    `M${cx},${cy + s * 0.55} L${cx - s * 0.62},${cy - s * 0.05} A${s * 0.33},${s * 0.33} 0 0 1 ${cx},${cy - s * 0.42} A${s * 0.33},${s * 0.33} 0 0 1 ${cx + s * 0.62},${cy - s * 0.05} Z`,
    fill,
  );
export const sparkle = (cx, cy, s, fill = C.sun) =>
  path(
    `M${cx},${cy - s} C${cx + s * 0.12},${cy - s * 0.12} ${cx + s * 0.12},${cy - s * 0.12} ${cx + s},${cy} C${cx + s * 0.12},${cy + s * 0.12} ${cx + s * 0.12},${cy + s * 0.12} ${cx},${cy + s} C${cx - s * 0.12},${cy + s * 0.12} ${cx - s * 0.12},${cy + s * 0.12} ${cx - s},${cy} C${cx - s * 0.12},${cy - s * 0.12} ${cx - s * 0.12},${cy - s * 0.12} ${cx},${cy - s} Z`,
    fill,
  );
export function shopScreen(w, h, o = {}) {
  let s = rect(0, 0, w, h, "#fff") + rect(0, 0, w, h * 0.17, o.bar ?? C.sun);
  s += text(w * 0.08, h * 0.08, o.title ?? "Delivery in", { size: h * 0.032, weight: 600 });
  s += text(w * 0.08, h * 0.13, o.sub ?? "10 minutes", { size: h * 0.042, weight: 800 });
  const cw = w * 0.4;
  const cols = [C.teal2, C.coral, C.mint, C.sun];
  for (let i = 0; i < 4; i++) {
    const x = w * 0.07 + (i % 2) * (cw + w * 0.06);
    const y = h * 0.21 + Math.floor(i / 2) * h * 0.29;
    s += rect(x, y, cw, h * 0.26, "#f4f1ea", { rx: 12 });
    s += rect(x + cw * 0.28, y + h * 0.03, cw * 0.44, h * 0.12, cols[i], { rx: 10 });
    s += rect(x + cw * 0.1, y + h * 0.18, cw * 0.5, h * 0.016, "#000", { rx: 4, op: 0.2 });
    s += rect(x + cw * 0.56, y + h * 0.2, cw * 0.34, h * 0.042, C.teal, { rx: 8 });
  }
  s += rect(w * 0.07, h * 0.82, w * 0.86, h * 0.1, C.teal, { rx: 14 });
  s += text(w / 2, h * 0.885, o.cta ?? "Add to cart", {
    size: h * 0.034,
    weight: 700,
    fill: "#fff",
    anchor: "middle",
  });
  return s;
}
export function chatScreen(w, h, msgs, o = {}) {
  let s = rect(0, 0, w, h, o.bg ?? "#f7f8f6") + rect(0, 0, w, h * 0.1, o.bar ?? C.tealInk);
  s +=
    sparkle(w * 0.08, h * 0.05, h * 0.018, C.sun) +
    lines(w * 0.14, h * 0.043, w * 0.3, 1, { fill: "#fff", op: 0.6, h: h * 0.014 });
  let y = h * 0.15;
  for (const [who, n, label] of msgs) {
    const me = who === "q";
    const bw = w * (me ? 0.6 : 0.78);
    const bh = h * 0.035 * n + h * 0.04 + (label ? h * 0.05 : 0);
    const x = me ? w - bw - w * 0.06 : w * 0.06;
    s += rect(x, y, bw, bh, me ? C.teal : "#fff", { rx: 14 });
    s += lines(x + w * 0.04, y + h * 0.03, bw - w * 0.08, n, {
      gap: h * 0.035,
      h: h * 0.014,
      fill: me ? "#fff" : "#000",
      op: me ? 0.7 : 0.18,
    });
    if (label) {
      s += rect(x + w * 0.04, y + bh - h * 0.06, bw * 0.55, h * 0.04, C.sunSoft, { rx: 8 });
      s += text(x + w * 0.06, y + bh - h * 0.032, label, {
        size: h * 0.022,
        weight: 700,
        fill: C.tealInk,
      });
    }
    y += bh + h * 0.025;
  }
  return s;
}
export function searchScreen(w, h, o = {}) {
  let s = rect(0, 0, w, h, "#fff");
  s += rect(w * 0.06, h * 0.07, w * 0.88, h * 0.09, "#fff", {
    rx: h * 0.045,
    stroke: "#dfe3e6",
    sw: 2,
  });
  s += circle(w * 0.11, h * 0.115, h * 0.018, "none", { stroke: C.muted, sw: 3 });
  s += text(w * 0.15, h * 0.13, o.query ?? "best cold-pressed oil brand", {
    size: h * 0.035,
    weight: 500,
    fill: C.ink2,
  });
  s += rect(w * 0.06, h * 0.21, w * 0.88, h * 0.3, C.tealSoft, { rx: 14 });
  s += sparkle(w * 0.1, h * 0.26, h * 0.02, C.teal);
  s += text(w * 0.14, h * 0.27, "AI overview", { size: h * 0.028, weight: 700, fill: C.teal });
  s += lines(w * 0.1, h * 0.31, w * 0.78, 3, { gap: h * 0.045, h: h * 0.016, op: 0.2 });
  s +=
    rect(w * 0.1, h * 0.44, w * 0.2, h * 0.045, "#fff", { rx: 8 }) +
    text(w * 0.12, h * 0.472, o.brand ?? "nava.", {
      size: h * 0.026,
      weight: 800,
      fill: C.tealInk,
    });
  for (let i = 0; i < 3; i++) {
    const y = h * 0.56 + i * h * 0.14;
    s += rect(w * 0.06, y, w * 0.3, h * 0.022, C.teal2, { rx: 4, op: 0.8 });
    s += lines(w * 0.06, y + h * 0.045, w * 0.8, 2, { gap: h * 0.035, h: h * 0.014 });
  }
  return s;
}
export function profileScreen(w, h, o = {}) {
  let s = rect(0, 0, w, h, "#f3f2ef") + rect(0, 0, w, h * 0.16, o.cover ?? C.teal2);
  s +=
    circle(w * 0.18, h * 0.16, w * 0.09, C.paper, { stroke: "#fff", sw: 4 }) +
    circle(w * 0.18, h * 0.15, w * 0.04, C.teal2, { op: 0.5 });
  s +=
    rect(w * 0.06, h * 0.24, w * 0.4, h * 0.03, C.ink, { rx: 4, op: 0.75 }) +
    lines(w * 0.06, h * 0.29, w * 0.6, 1, { h: h * 0.016 });
  s += rect(w * 0.05, h * 0.35, w * 0.9, h * 0.6, "#fff", { rx: 10 });
  s += text(w * 0.09, h * 0.41, o.headline ?? "What I learnt building", {
    size: h * 0.034,
    weight: 700,
  });
  s += text(w * 0.09, h * 0.455, o.headline2 ?? "our brand in public", {
    size: h * 0.034,
    weight: 700,
  });
  s += lines(w * 0.09, h * 0.49, w * 0.8, 2, { gap: h * 0.03, h: h * 0.013 });
  s += rect(w * 0.09, h * 0.57, w * 0.82, h * 0.28, o.media ?? C.tealInk, { rx: 8 });
  s +=
    circle(w / 2, h * 0.71, h * 0.04, "#fff", { op: 0.3 }) +
    path(
      `M${w / 2 - h * 0.012},${h * 0.69} L${w / 2 + h * 0.025},${h * 0.71} L${w / 2 - h * 0.012},${h * 0.73} Z`,
      "#fff",
    );
  s +=
    heart(w * 0.12, h * 0.9, h * 0.022, C.coral) +
    lines(w * 0.16, h * 0.893, w * 0.3, 1, { h: h * 0.012 });
  return s;
}
export function articleScreen(w, h, o = {}) {
  let s = rect(0, 0, w, h, "#fffdf8");
  s += text(w * 0.06, h * 0.09, o.masthead ?? "The Business Daily", {
    size: h * 0.05,
    weight: 800,
    fill: C.ink,
  });
  s += rect(w * 0.06, h * 0.12, w * 0.88, 2, C.ink, { op: 0.6 });
  s +=
    rect(w * 0.06, h * 0.16, w * 0.88, h * 0.035, C.ink, { rx: 3, op: 0.8 }) +
    rect(w * 0.06, h * 0.215, w * 0.6, h * 0.035, C.ink, { rx: 3, op: 0.8 });
  s += rect(w * 0.06, h * 0.29, w * 0.42, h * 0.3, o.photo ?? C.mint, { rx: 4 });
  s += lines(w * 0.52, h * 0.3, w * 0.42, 7, { gap: h * 0.04, h: h * 0.014 });
  s += lines(w * 0.06, h * 0.64, w * 0.88, 7, { gap: h * 0.045, h: h * 0.014 });
  return s;
}
