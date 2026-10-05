/**
 * Tiny SVG drawing kit for the site's service and work artwork. Everything is
 * built from brand colours, rounded cards and simple UI mock-ups, so the
 * images describe what Upsure Media actually delivers.
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
  line: "#e3dfd5",
  lineDark: "#c9c4b8",
};

const FONT = "Segoe UI, Arial, sans-serif";
let uid = 0;
const id = (p) => `${p}${++uid}`;
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function svg(w, h, body, { bg = C.paper, blobs = [] } = {}) {
  const blobSvg = blobs
    .map(
      ([cx, cy, rad, fill, op = 0.7]) =>
        `<circle cx="${cx}" cy="${cy}" r="${rad}" fill="${fill}" opacity="${op}" filter="url(#soft)"/>`,
    )
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
<defs>
  <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="22"/></filter>
  <filter id="soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="90"/></filter>
</defs>
<rect width="${w}" height="${h}" fill="${bg}"/>${blobSvg}${body}</svg>`;
}

export function text(x, y, s, o = {}) {
  const { size = 24, weight = 400, fill = C.ink, anchor = "start", ls = 0, opacity = 1 } = o;
  return `<text x="${x}" y="${y}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}" letter-spacing="${ls}" opacity="${opacity}">${esc(s)}</text>`;
}

export function rect(x, y, w, h, o = {}) {
  const { fill = C.white, rx = 0, stroke, sw = 2, opacity = 1 } = o;
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}"${stroke ? ` stroke="${stroke}" stroke-width="${sw}"` : ""} opacity="${opacity}"/>`;
}

export function circle(cx, cy, r, o = {}) {
  const { fill = C.white, stroke, sw = 2, opacity = 1 } = o;
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"${stroke ? ` stroke="${stroke}" stroke-width="${sw}"` : ""} opacity="${opacity}"/>`;
}

/** Card with a soft drop shadow. */
export function card(x, y, w, h, o = {}) {
  const { fill = C.white, rx = 28, shadow = 0.13, stroke } = o;
  return (
    `<rect x="${x + 6}" y="${y + 22}" width="${w - 12}" height="${h}" rx="${rx}" fill="${C.ink}" opacity="${shadow}" filter="url(#shadow)"/>` +
    rect(x, y, w, h, { fill, rx, stroke, sw: 2 })
  );
}

/** Grey text-placeholder bars. */
export function bars(x, y, w, n, o = {}) {
  const { gap = 22, h = 10, fill = C.line, last = 0.6 } = o;
  let out = "";
  for (let i = 0; i < n; i++) {
    const ww = i === n - 1 ? w * last : w * (0.85 + ((i * 37) % 15) / 100);
    out += rect(x, y + i * gap, Math.min(w, ww), h, { fill, rx: h / 2 });
  }
  return out;
}

/** Pill label; returns [svg, width]. */
export function pill(x, y, label, o = {}) {
  const { bg = C.sun, fg = C.ink, size = 22, padX = 22, h = size * 2.1, weight = 600, stroke } = o;
  const w = Math.round(label.length * size * 0.56 + padX * 2);
  return [
    rect(x, y, w, h, { fill: bg, rx: h / 2, stroke, sw: 2 }) +
      text(x + w / 2, y + h / 2 + size * 0.36, label, { size, weight, fill: fg, anchor: "middle" }),
    w,
  ];
}
export const pillSvg = (...a) => pill(...a)[0];

/** Phone frame; `inner(sx, sy, sw, sh)` draws the screen contents (clipped). */
export function phone(x, y, w, h, inner, o = {}) {
  const { frame = C.ink, screen = C.white } = o;
  const cid = id("scr");
  const pad = Math.round(w * 0.045);
  const sx = x + pad;
  const sy = y + pad;
  const sw = w - pad * 2;
  const sh = h - pad * 2;
  return (
    card(x, y, w, h, { fill: frame, rx: w * 0.16, shadow: 0.22 }) +
    `<clipPath id="${cid}"><rect x="${sx}" y="${sy}" width="${sw}" height="${sh}" rx="${w * 0.12}"/></clipPath>` +
    `<g clip-path="url(#${cid})">${rect(sx, sy, sw, sh, { fill: screen })}${inner(sx, sy, sw, sh)}</g>` +
    rect(x + w / 2 - w * 0.12, y + pad + 10, w * 0.24, Math.max(10, w * 0.035), {
      fill: frame,
      rx: 8,
    })
  );
}

/** Browser window card; `inner(bx, by, bw, bh)` draws the page. */
export function browser(x, y, w, h, inner, o = {}) {
  const { url = "", bar = C.paper2 } = o;
  const cid = id("brw");
  return (
    card(x, y, w, h, { rx: 22 }) +
    `<clipPath id="${cid}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="22"/></clipPath>` +
    `<g clip-path="url(#${cid})">${rect(x, y, w, 52, { fill: bar })}` +
    circle(x + 30, y + 26, 7, { fill: C.coral }) +
    circle(x + 54, y + 26, 7, { fill: C.sun }) +
    circle(x + 78, y + 26, 7, { fill: C.mint }) +
    (url
      ? rect(x + 110, y + 13, w - 150, 26, { fill: C.white, rx: 13 }) +
        text(x + 128, y + 32, url, { size: 15, fill: C.muted })
      : "") +
    inner(x, y + 52, w, h - 52) +
    `</g>`
  );
}

/** Smooth-ish line chart through normalised points [0..1]. */
export function lineChart(x, y, w, h, pts, o = {}) {
  const { color = C.teal2, area = true, sw = 6, dots = true } = o;
  const P = pts.map((v, i) => [x + (i / (pts.length - 1)) * w, y + h - v * h]);
  const d = P.map(([px, py], i) => `${i ? "L" : "M"}${px.toFixed(1)},${py.toFixed(1)}`).join(" ");
  const areaPath = `${d} L${x + w},${y + h} L${x},${y + h} Z`;
  const last = P[P.length - 1];
  return (
    (area ? `<path d="${areaPath}" fill="${color}" opacity="0.12"/>` : "") +
    `<path d="${d}" fill="none" stroke="${color}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>` +
    (dots ? circle(last[0], last[1], sw * 1.6, { fill: C.white, stroke: color, sw: sw * 0.8 }) : "")
  );
}

export function barChart(x, y, w, h, vals, o = {}) {
  const { colors = [C.teal2], gap = 14, rx = 8 } = o;
  const bw = (w - gap * (vals.length - 1)) / vals.length;
  return vals
    .map((v, i) =>
      rect(x + i * (bw + gap), y + h - v * h, bw, v * h, { fill: colors[i % colors.length], rx }),
    )
    .join("");
}

/* Icons --------------------------------------------------------------------- */
export const heart = (cx, cy, s, fill = C.coral) =>
  `<path transform="translate(${cx - s / 2},${cy - s / 2}) scale(${s / 24})" d="M12 21s-7.5-4.6-9.6-9.3C.9 8.3 3.1 4.5 6.8 4.5c2.1 0 3.6 1.2 5.2 3 1.6-1.8 3.1-3 5.2-3 3.7 0 5.9 3.8 4.4 7.2C19.5 16.4 12 21 12 21z" fill="${fill}"/>`;
export const star = (cx, cy, s, fill = C.sun) =>
  `<path transform="translate(${cx - s / 2},${cy - s / 2}) scale(${s / 24})" d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.3 5.8 20.9l1.6-7L2 9.2l7.1-.6z" fill="${fill}"/>`;
export const sparkle = (cx, cy, s, fill = C.sun) =>
  `<path transform="translate(${cx - s / 2},${cy - s / 2}) scale(${s / 24})" d="M12 0c.8 6.4 5.6 11.2 12 12-6.4.8-11.2 5.6-12 12-.8-6.4-5.6-11.2-12-12C6.4 11.2 11.2 6.4 12 0z" fill="${fill}"/>`;
export const play = (cx, cy, s, fill = C.white) =>
  `<path d="M${cx - s * 0.35},${cy - s / 2} L${cx + s * 0.5},${cy} L${cx - s * 0.35},${cy + s / 2} Z" fill="${fill}"/>`;
export const check = (cx, cy, s, color = C.teal2) =>
  `<path d="M${cx - s / 2},${cy} l${s * 0.35},${s * 0.35} l${s * 0.65},-${s * 0.7}" fill="none" stroke="${color}" stroke-width="${s * 0.18}" stroke-linecap="round" stroke-linejoin="round"/>`;
export const arrowUp = (cx, cy, s, color = C.teal2) =>
  `<path d="M${cx},${cy + s / 2} V${cy - s / 2} M${cx - s * 0.35},${cy - s * 0.15} L${cx},${cy - s / 2} L${cx + s * 0.35},${cy - s * 0.15}" fill="none" stroke="${color}" stroke-width="${s * 0.16}" stroke-linecap="round" stroke-linejoin="round"/>`;
export const pin = (cx, cy, s, fill = C.coral) =>
  `<path transform="translate(${cx - s / 2},${cy - s})" d="M${s / 2},${s} C${s * 0.15},${s * 0.62} 0,${s * 0.45} 0,${s * 0.32} A${s / 2},${s / 2} 0 1 1 ${s},${s * 0.32} C${s},${s * 0.45} ${s * 0.85},${s * 0.62} ${s / 2},${s} Z" fill="${fill}"/>` +
  circle(cx, cy - s * 0.68, s * 0.14, { fill: C.white });

/** Simple product shapes for D2C scenes. */
export function product(kind, x, y, s, color) {
  switch (kind) {
    case "bottle":
      return (
        rect(x + s * 0.32, y, s * 0.36, s * 0.16, { fill: C.ink2, rx: 6 }) +
        rect(x + s * 0.18, y + s * 0.14, s * 0.64, s * 0.86, { fill: color, rx: s * 0.16 }) +
        rect(x + s * 0.24, y + s * 0.46, s * 0.52, s * 0.26, { fill: C.white, rx: 8, opacity: 0.9 })
      );
    case "box":
      return (
        rect(x + s * 0.08, y + s * 0.12, s * 0.84, s * 0.88, { fill: color, rx: 14 }) +
        rect(x + s * 0.08, y + s * 0.12, s * 0.84, s * 0.2, {
          fill: C.ink,
          rx: 14,
          opacity: 0.12,
        }) +
        circle(x + s / 2, y + s * 0.62, s * 0.16, { fill: C.white, opacity: 0.9 })
      );
    case "pouch":
      return (
        `<path d="M${x + s * 0.15},${y + s * 0.1} H${x + s * 0.85} L${x + s * 0.92},${y + s} H${x + s * 0.08} Z" fill="${color}"/>` +
        rect(x + s * 0.15, y + s * 0.06, s * 0.7, s * 0.1, { fill: C.ink, rx: 4, opacity: 0.18 }) +
        rect(x + s * 0.26, y + s * 0.44, s * 0.48, s * 0.3, {
          fill: C.white,
          rx: 10,
          opacity: 0.92,
        })
      );
    case "jar":
      return (
        rect(x + s * 0.2, y + s * 0.05, s * 0.6, s * 0.16, { fill: C.ink2, rx: 6 }) +
        rect(x + s * 0.12, y + s * 0.2, s * 0.76, s * 0.8, { fill: color, rx: s * 0.14 }) +
        rect(x + s * 0.2, y + s * 0.42, s * 0.6, s * 0.3, { fill: C.white, rx: 8, opacity: 0.92 })
      );
    case "shoe":
      return `<path d="M${x},${y + s * 0.8} C${x},${y + s * 0.45} ${x + s * 0.2},${y + s * 0.3} ${x + s * 0.38},${y + s * 0.3} L${x + s * 0.5},${y + s * 0.5} C${x + s * 0.7},${y + s * 0.55} ${x + s},${y + s * 0.6} ${x + s},${y + s * 0.85} L${x},${y + s * 0.85} Z" fill="${color}"/>${rect(x, y + s * 0.82, s, s * 0.1, { fill: C.ink, rx: 6, opacity: 0.8 })}`;
    case "ball":
      return (
        circle(x + s / 2, y + s / 2, s * 0.45, { fill: color }) +
        `<path d="M${x + s * 0.1},${y + s * 0.5} Q${x + s / 2},${y + s * 0.2} ${x + s * 0.9},${y + s * 0.5} M${x + s / 2},${y + s * 0.05} Q${x + s * 0.75},${y + s / 2} ${x + s / 2},${y + s * 0.95}" stroke="${C.white}" stroke-width="${s * 0.05}" fill="none"/>`
      );
    case "glasses":
      return (
        `<g fill="none" stroke="${color}" stroke-width="${s * 0.07}" stroke-linecap="round">` +
        `<rect x="${x}" y="${y + s * 0.2}" width="${s * 0.42}" height="${s * 0.34}" rx="${s * 0.12}"/>` +
        `<rect x="${x + s * 0.58}" y="${y + s * 0.2}" width="${s * 0.42}" height="${s * 0.34}" rx="${s * 0.12}"/>` +
        `<path d="M${x + s * 0.42},${y + s * 0.3} Q${x + s / 2},${y + s * 0.22} ${x + s * 0.58},${y + s * 0.3}"/></g>`
      );
    case "smartphone":
      return (
        rect(x + s * 0.22, y, s * 0.56, s, { fill: C.ink, rx: s * 0.1 }) +
        rect(x + s * 0.26, y + s * 0.04, s * 0.48, s * 0.92, { fill: color, rx: s * 0.08 })
      );
    default:
      return rect(x, y, s, s, { fill: color, rx: 16 });
  }
}

/** Avatar circle with a simple head-and-shoulders silhouette. */
export function avatar(cx, cy, r, bg = C.mint, fg = C.teal) {
  const cid = id("av");
  return (
    `<clipPath id="${cid}"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath>` +
    circle(cx, cy, r, { fill: bg }) +
    `<g clip-path="url(#${cid})">${circle(cx, cy - r * 0.18, r * 0.36, { fill: fg })}${circle(cx, cy + r * 0.85, r * 0.68, { fill: fg })}</g>`
  );
}
