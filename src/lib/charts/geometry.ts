// Shared SVG geometry + palette for the chart renderers (wheel + biwheel).

export const SIZE = 600;
export const C = SIZE / 2;
export const MARGIN = 22; // padding so outer labels aren't clipped

export const PLUM = "#2e1b34";
export const PURPLE = "#6d4c8c";
export const GOLD = "#c9a24b";
export const CREAM = "#f7f1e8";
export const HARD = "#c0392b";    // squares / oppositions
export const SOFT = "#2e6da4";    // trines / sextiles
export const NEUTRAL = "#8a7d93"; // conjunctions

export const ASPECT_COLOR = { hard: HARD, soft: SOFT, neutral: NEUTRAL } as const;

// Ascendant at the left (9 o'clock), longitude increasing counter-clockwise.
export function pos(lon: number, r: number, asc: number): [number, number] {
  const a = ((180 + (lon - asc)) * Math.PI) / 180;
  return [C + r * Math.cos(a), C - r * Math.sin(a)];
}

export function line(x1: number, y1: number, x2: number, y2: number, stroke: string, w: number, opacity = 1): string {
  return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${stroke}" stroke-width="${w}" opacity="${opacity}"/>`;
}

export function text(x: number, y: number, s: string, size: number, fill: string, weight = "400", anchor = "middle"): string {
  return `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" text-anchor="${anchor}" font-size="${size}" font-weight="${weight}" fill="${fill}">${s}</text>`;
}

export function svgOpen(ariaLabel: string): string {
  const m = MARGIN;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-m} ${-m} ${SIZE + 2 * m} ${SIZE + 2 * m}" width="100%" height="100%" role="img" aria-label="${ariaLabel}">`;
}
