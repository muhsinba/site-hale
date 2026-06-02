// SolarFire-style single chart wheel → SVG string. Pure (no DOM/React), so it runs on
// server or client and mounts via dangerouslySetInnerHTML like the original renderer.
// Keeps the site palette (plum lines, gold accents) and the Ascendant-left orientation.
//
// Over the old natalChart.ts: 1°/5°/10° degree ticks, planet deg/min + ℞ labels,
// house-cusp degree labels, angle labels (ASC/IC/DSC/MC), and color-coded aspect lines
// across the inner hub (red = hard, blue = soft, grey = conjunction).

import type { ChartModel } from "@/lib/astro/model";
import { SIGN_GLYPHS } from "@/lib/astro/signs";
import {
  C, pos, line, text, svgOpen, ASPECT_COLOR, PLUM, PURPLE, GOLD, CREAM, HARD,
} from "./geometry";

const R_OUT = 288;       // outer edge of zodiac band
const R_ZIN = 250;       // inner edge of zodiac band (sign dividers, ticks start here)
const R_PLANET = 224;    // base ring for planet glyphs (staggered inward on collision)
const R_RING = 150;      // inner ring: house-spoke ends + aspect-line endpoints
const R_HOUSENUM = 134;  // house-number labels sit just inside the ring

export type WheelOptions = { ariaLabel?: string; showAspects?: boolean };

export function buildWheelSvg(model: ChartModel, opts: WheelOptions = {}): string {
  const { ariaLabel = "Doğum haritası çarkı", showAspects = true } = opts;
  const asc = model.angles?.asc ?? 0; // orient by Ascendant; fall back to 0° Aries
  const hasHouses = model.cusps.length === 12;
  const p: string[] = [];

  // Rings
  p.push(`<circle cx="${C}" cy="${C}" r="${R_OUT}" fill="${CREAM}" stroke="${PLUM}" stroke-width="1.5"/>`);
  p.push(`<circle cx="${C}" cy="${C}" r="${R_ZIN}" fill="#fff" stroke="${PLUM}" stroke-width="1"/>`);
  p.push(`<circle cx="${C}" cy="${C}" r="${R_RING}" fill="none" stroke="${PURPLE}" stroke-width="0.8" opacity="0.55"/>`);

  // Degree ticks around the inner edge of the zodiac band (1° minor, 5° medium, 10° major).
  for (let deg = 0; deg < 360; deg++) {
    const len = deg % 10 === 0 ? 9 : deg % 5 === 0 ? 6 : 3;
    const [x1, y1] = pos(deg, R_ZIN, asc);
    const [x2, y2] = pos(deg, R_ZIN - len, asc);
    p.push(line(x1, y1, x2, y2, PLUM, deg % 10 === 0 ? 0.8 : 0.5, deg % 5 === 0 ? 0.6 : 0.35));
  }

  // Zodiac: 12 sign dividers + glyphs.
  for (let i = 0; i < 12; i++) {
    const [x1, y1] = pos(i * 30, R_ZIN, asc);
    const [x2, y2] = pos(i * 30, R_OUT, asc);
    p.push(line(x1, y1, x2, y2, PLUM, 1, 0.6));
    const [gx, gy] = pos(i * 30 + 15, (R_OUT + R_ZIN) / 2, asc);
    p.push(text(gx, gy + 7, SIGN_GLYPHS[i], 20, PLUM));
  }

  // House cusps + numbers (only when a birth time produced houses).
  if (hasHouses) {
    model.cusps.forEach((cusp, i) => {
      const isAngle = i === 0 || i === 3 || i === 6 || i === 9; // ASC, IC, DSC, MC
      const [x1, y1] = pos(cusp.lon, R_RING, asc);
      const [x2, y2] = pos(cusp.lon, R_ZIN, asc);
      p.push(line(x1, y1, x2, y2, isAngle ? GOLD : PURPLE, isAngle ? 1.8 : 0.8, isAngle ? 0.9 : 0.45));
      const [lx, ly] = pos(cusp.lon, R_ZIN - 16, asc);
      p.push(text(lx, ly + 3, `${cusp.deg}°`, 7.5, PURPLE, "400"));
      const next = model.cusps[(i + 1) % 12].lon;
      const span = ((next - cusp.lon) % 360 + 360) % 360;
      const [nx, ny] = pos(cusp.lon + span / 2, R_HOUSENUM, asc);
      p.push(text(nx, ny + 3, String(i + 1), 9, PLUM, "600"));
    });

    const labels: [number, string][] = [
      [model.cusps[0].lon, "ASC"], [model.cusps[3].lon, "IC"],
      [model.cusps[6].lon, "DSC"], [model.cusps[9].lon, "MC"],
    ];
    for (const [lon, lab] of labels) {
      const [x, y] = pos(lon, R_OUT + 12, asc);
      p.push(text(x, y + 3, lab, 11, GOLD, "600"));
    }
  }

  // Aspect lines across the hub.
  if (showAspects && model.aspects.length) {
    const lonOf = new Map(model.points.map((pt) => [pt.key, pt.lon]));
    const maxOrb = 8;
    for (const a of model.aspects) {
      const la = lonOf.get(a.a), lb = lonOf.get(a.b);
      if (la === undefined || lb === undefined) continue;
      const [x1, y1] = pos(la, R_RING, asc);
      const [x2, y2] = pos(lb, R_RING, asc);
      const opacity = 0.25 + 0.55 * (1 - Math.min(a.orb, maxOrb) / maxOrb);
      p.push(line(x1, y1, x2, y2, ASPECT_COLOR[a.category], a.category === "hard" ? 1.1 : 0.9, opacity));
    }
  }

  // Planets — stagger radius when glyphs would collide, draw exact-degree tick + label.
  const sorted = [...model.points].sort((x, y) => x.lon - y.lon);
  let prevLon = -999;
  let step = 0;
  for (const pt of sorted) {
    if (pt.lon - prevLon < 9) step = (step + 1) % 3;
    else step = 0;
    prevLon = pt.lon;
    const r = R_PLANET - step * 26;

    const [tx1, ty1] = pos(pt.lon, R_ZIN, asc);
    const [tx2, ty2] = pos(pt.lon, R_ZIN - 10, asc);
    p.push(line(tx1, ty1, tx2, ty2, PURPLE, 1, 0.7));
    const [gx, gy] = pos(pt.lon, r, asc);
    p.push(line(tx2, ty2, gx, gy, PURPLE, 0.5, 0.35));

    p.push(`<circle cx="${gx.toFixed(1)}" cy="${gy.toFixed(1)}" r="13" fill="${CREAM}" stroke="${GOLD}" stroke-width="1"/>`);
    p.push(text(gx, gy + 6, pt.glyph, 16, PLUM));
    const lab = `${pt.deg}°${String(pt.min).padStart(2, "0")}'${pt.retro ? "℞" : ""}`;
    p.push(text(gx, gy + 20, lab, 7.5, pt.retro ? HARD : PURPLE, "500"));
  }

  return `${svgOpen(ariaLabel)}${p.join("")}</svg>`;
}
