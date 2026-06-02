// Pure SVG renderer for a natal chart wheel. No DOM / no deps — takes computed
// ecliptic longitudes and returns an <svg> string. Drawn in the site's palette
// (plum lines, gold accents) for a light (cream) background.

export type ChartData = {
  ascendant: number; // ecliptic longitude of the Ascendant (degrees)
  cusps: number[]; // 12 house-cusp longitudes (degrees)
  planets: { glyph: string; lon: number }[];
};

const SIGN_GLYPHS = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"];

const SIZE = 460;
const C = SIZE / 2;
const R_OUTER = 212;
const R_SIGN_IN = 178; // inner edge of the zodiac band
const R_HUB = 64; // central hub
const R_PLANET = 132; // base ring for planet glyphs

const PLUM = "#2e1b34";
const PURPLE = "#6d4c8c";
const GOLD = "#c9a24b";
const CREAM = "#f7f1e8";

// Map an ecliptic longitude to an (x,y) on a circle, with the Ascendant at the
// left (9 o'clock) and longitude increasing counter-clockwise.
function pos(lon: number, r: number, asc: number): [number, number] {
  const a = ((180 + (lon - asc)) * Math.PI) / 180;
  return [C + r * Math.cos(a), C - r * Math.sin(a)];
}

function line(x1: number, y1: number, x2: number, y2: number, stroke: string, w: number, opacity = 1) {
  return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${stroke}" stroke-width="${w}" opacity="${opacity}"/>`;
}

export function buildNatalChartSvg(
  data: ChartData,
  ariaLabel = "Doğum haritası çarkı",
): string {
  const { ascendant: asc, cusps, planets } = data;
  const p: string[] = [];

  // Rings
  p.push(`<circle cx="${C}" cy="${C}" r="${R_OUTER}" fill="${CREAM}" stroke="${PLUM}" stroke-width="1.5"/>`);
  p.push(`<circle cx="${C}" cy="${C}" r="${R_SIGN_IN}" fill="#fff" stroke="${PLUM}" stroke-width="1"/>`);
  p.push(`<circle cx="${C}" cy="${C}" r="${R_HUB}" fill="${CREAM}" stroke="${PURPLE}" stroke-width="1" opacity="0.8"/>`);

  // Zodiac: 12 dividers + sign glyphs
  for (let i = 0; i < 12; i++) {
    const [x1, y1] = pos(i * 30, R_SIGN_IN, asc);
    const [x2, y2] = pos(i * 30, R_OUTER, asc);
    p.push(line(x1, y1, x2, y2, PLUM, 1, 0.6));
    const [gx, gy] = pos(i * 30 + 15, (R_OUTER + R_SIGN_IN) / 2, asc);
    p.push(
      `<text x="${gx.toFixed(1)}" y="${(gy + 6).toFixed(1)}" text-anchor="middle" font-size="18" fill="${PLUM}">${SIGN_GLYPHS[i]}</text>`
    );
  }

  // House cusps (spokes from hub to zodiac band)
  cusps.forEach((cusp, i) => {
    const isAngle = i === 0 || i === 3 || i === 6 || i === 9; // ASC, IC, DSC, MC
    const [x1, y1] = pos(cusp, R_HUB, asc);
    const [x2, y2] = pos(cusp, R_SIGN_IN, asc);
    p.push(line(x1, y1, x2, y2, isAngle ? GOLD : PURPLE, isAngle ? 1.8 : 0.8, isAngle ? 0.9 : 0.4));
  });

  // Angle labels (ASC / MC)
  const [ax, ay] = pos(cusps[0], R_OUTER + 2, asc);
  p.push(`<text x="${(ax - 16).toFixed(1)}" y="${(ay + 4).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="600" fill="${GOLD}">ASC</text>`);
  const [mx, my] = pos(cusps[9], R_OUTER + 2, asc);
  p.push(`<text x="${mx.toFixed(1)}" y="${(my - 6).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="600" fill="${GOLD}">MC</text>`);

  // Planets — stagger radius when glyphs would collide.
  const sorted = [...planets].sort((a, b) => a.lon - b.lon);
  let prevLon = -999;
  let step = 0;
  sorted.forEach((pl) => {
    if (pl.lon - prevLon < 9) step = (step + 1) % 3;
    else step = 0;
    prevLon = pl.lon;
    const r = R_PLANET - step * 20;
    const [tickX1, tickY1] = pos(pl.lon, R_SIGN_IN, asc);
    const [tickX2, tickY2] = pos(pl.lon, R_SIGN_IN - 8, asc);
    p.push(line(tickX1, tickY1, tickX2, tickY2, PURPLE, 1, 0.6));
    const [px, py] = pos(pl.lon, r, asc);
    p.push(`<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="13" fill="${CREAM}" stroke="${GOLD}" stroke-width="1"/>`);
    p.push(`<text x="${px.toFixed(1)}" y="${(py + 6).toFixed(1)}" text-anchor="middle" font-size="16" fill="${PLUM}">${pl.glyph}</text>`);
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}" width="100%" height="100%" role="img" aria-label="${ariaLabel}">${p.join("")}</svg>`;
}

// Map the library's body labels to astrological glyphs.
export const PLANET_GLYPHS: Record<string, string> = {
  sun: "☉", moon: "☽", mercury: "☿", venus: "♀", mars: "♂",
  jupiter: "♃", saturn: "♄", uranus: "♅", neptune: "♆", pluto: "♇",
  chiron: "⚷", northnode: "☊", "north node": "☊", southnode: "☋", "south node": "☋", lilith: "⚸",
};
