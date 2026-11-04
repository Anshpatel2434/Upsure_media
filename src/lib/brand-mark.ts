/**
 * The Upsure Media marks, as supplied: the full "upsure." wordmark and the
 * "u." square mark used for icons. Path data is kept here so the React logo,
 * the generated app icons and the share cards all draw the same artwork
 * instead of each approximating it with text in a font.
 *
 * The source files are kept at src/assets/brand/{wordmark,mark}.svg. They are
 * black; every consumer here passes its own colour, so the same artwork works
 * on the light header, the dark footer and the near-black app icon.
 */

/** Full "upsure." wordmark. Ratio is roughly 4.86 : 1. */
export const WORDMARK = {
  viewBox: "0 0 841.89 173.23",
  width: 841.89,
  height: 173.23,
  paths: [
    "M644.72,153.83l-29.94.14-26.51-40.78c-7.34-11.29-15.72-12.32-29.34-11.64v52.35s-25.29,0-25.29,0l-.02-126.41,62.13.09c8.09.01,15.77,1.53,22.93,4.5,10.63,6.1,15.72,16.92,16.55,28.8,1.38,19.57-11.28,35.32-31.73,37.3,8.31,5.69,14.36,12.1,19.37,20.22l21.85,35.44ZM604.06,77.93c3.9-3.96,5.63-8.58,5.2-13.74.39-8.93-5.78-14.77-14.52-15.75l-35.8-.22.04,33.31,31.27-.16c4.77-.38,9.26-1.33,13.81-3.43Z",
    "M360.65,152.76c-14.11,4.54-28.73,4.54-42.8,1.13-19.86-4.8-31.18-21.22-32.7-41.09l25.16-2.41c1.01,15.61,12.26,24.85,26.87,24.51,8.8-.21,17.71-2.19,22.22-10.4,1.85-3.36,2.37-7.66,1.11-11.74-.89-2.86-4.13-6.52-7.98-7.64l-21.17-6.14c-7.63-2.22-15.14-4.15-22.17-7.55-11.12-5.38-18.36-15.7-19.36-27.04-1.12-12.65,4.36-23.99,14.84-31.06,13.37-9.03,34.87-9.6,50.71-5.65,17.01,4.24,28.07,18.92,28.15,36.35l-25.14,1.08c-.84-7.14-3.91-14.23-11.02-16.97-12.86-4.94-32.76-1.49-33.24,10.73-.4,10.24,11.86,12.71,21.87,15.6l26.25,7.58c14.72,4.25,23.61,16.61,24.55,31.87,1.08,17.56-8.69,33.25-26.14,38.86Z",
    "M745.42,98.21l-61.14.01-.01,34.8,68.86-.04.03,20.94-94.25-.04-.01-126.38,91.59-.01.05,20.79-66.25.02-.04,29.04,61.17.02v20.85Z",
    "M123.57,27.63l25.43-.16.03,76.42c-.13,6.71-.4,12.88-1.51,19.35-2.56,14.87-12.88,26.5-27.67,30.42-13.9,3.68-28.62,3.58-42.38-.47-14.98-4.41-25.03-16.42-27.3-31.66-1.04-7-1.29-13.71-1.45-20.95l-.03-73.01,25.35-.08.07,78.06,1.31,12.2c1.38,12.86,19.69,20.74,35.65,14.65,5.74-2.19,10.56-6.83,11.12-13.03l1.39-15.47V27.63Z",
    "M482.4,27.6l25.54-.09v77.21c-.12,7.09-.57,13.64-2.01,20.44-2.99,14.09-13.14,24.67-27.18,28.44s-27.62,3.59-41.06-.02c-15.51-4.17-26.25-16.25-28.56-32.05l-1.49-23.44-.03-70.56,25.38-.02.06,78.03c0,12.5,2.81,23.07,14.65,27.14,15.19,5.22,32.43-1.43,33.42-13.3l1.3-15.48V27.6Z",
    "M269.22,79.96c-10.72,31.39-39.48,25.65-69.08,26.37l.03,47.6-25.38-.07V27.54s61.81.39,61.81.39c15.5.1,27.67,9.45,32.41,24,2.71,9.17,2.65,18.71.21,28.03ZM245.14,66.28c.06-10.17-7.02-16.28-16.28-17.7l-28.72-.36.03,36.93c20.84-.55,44.68,4.15,44.97-18.87Z",
  ],
  /** The full stop. */
  dot: { cx: 780.16, cy: 141.98, r: 13.04 },
} as const;

/** Square "u." mark, for app icons. */
export const MARK = {
  viewBox: "0 0 141.73 141.73",
  size: 141.73,
  path: "M77.55,21.01l19.73-.13.02,59.29c-.1,5.21-.31,9.99-1.17,15.01-1.99,11.54-9.99,20.56-21.47,23.6-10.79,2.86-22.2,2.78-32.88-.37-11.62-3.42-19.42-12.74-21.18-24.56-.81-5.43-1-10.63-1.12-16.25l-.02-56.64,19.66-.07.05,60.56,1.01,9.47c1.07,9.98,15.27,16.09,27.66,11.37,4.45-1.7,8.19-5.3,8.62-10.1l1.08-12V21.01Z",
  dot: { cx: 112.15, cy: 109.72, r: 10.11 },
} as const;

/** Standalone SVG markup for the square mark, in one colour. */
export function markSvg(color: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${MARK.viewBox}"><path fill="${color}" d="${MARK.path}"/><circle fill="${color}" cx="${MARK.dot.cx}" cy="${MARK.dot.cy}" r="${MARK.dot.r}"/></svg>`;
}

/** Standalone SVG markup for the wordmark, in one colour. */
export function wordmarkSvg(color: string): string {
  const paths = WORDMARK.paths.map((d) => `<path fill="${color}" d="${d}"/>`).join("");
  const { cx, cy, r } = WORDMARK.dot;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${WORDMARK.viewBox}">${paths}<circle fill="${color}" cx="${cx}" cy="${cy}" r="${r}"/></svg>`;
}

/**
 * `data:` URI for a mark, for use in <img> inside next/og ImageResponse —
 * satori renders an embedded SVG image far more reliably than raw SVG nodes.
 */
export function svgDataUri(svg: string): string {
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}
