// Bi-wheel (two-ring) chart → SVG string. Inner ring = first chart (natal / person A),
// outer ring = second chart (transit / person B). Inter-aspect lines cross the hub.
// Used by the transit "natal + transit" view and by synastry.

import type { BiwheelModel, ChartModel } from "@/lib/astro/model";
import { SIGN_GLYPHS } from "@/lib/astro/signs";
import {
  C, pos, line, text, svgOpen, ASPECT_COLOR, PLUM, PURPLE, GOLD, CREAM, HARD,
} from "./geometry";

const R_OUT = 288;        // outer edge of zodiac band
const R_ZIN = 250;        // inner edge of zodiac band
const R_OUTER_PL = 226;   // outer-chart planet ring (just inside the band)
const R_MID = 188;        // divider between the two charts
const R_INNER_PL = 162;   // inner-chart planet ring
const R_RING = 124;       // inner ring: house spokes + aspect endpoints
const R_HOUSENUM = 110;

function plotPlanets(model: ChartModel, ring: number, asc: number, out: string[]) {
  const sorted = [...model.points].sort((x, y) => x.lon - y.lon);
  let prevLon = -999, step = 0;
  for (const pt of sorted) {
    if (pt.lon - prevLon < 10) step = (step + 1) % 3;
    else step = 0;
    prevLon = pt.lon;
    const r = ring - step * 22;
    const [tx1, ty1] = pos(pt.lon, R_ZIN, asc);
    const [tx2, ty2] = pos(pt.lon, R_ZIN - 8, asc);
    out.push(line(tx1, ty1, tx2, ty2, PURPLE, 0.8, 0.5));
    const [gx, gy] = pos(pt.lon, r, asc);
    out.push(`<circle cx="${gx.toFixed(1)}" cy="${gy.toFixed(1)}" r="11" fill="${CREAM}" stroke="${GOLD}" stroke-width="1"/>`);
    out.push(text(gx, gy + 5, pt.glyph, 13, PLUM));
    out.push(text(gx, gy + 17, `${pt.deg}°${pt.retro ? "℞" : ""}`, 6.5, pt.retro ? HARD : PURPLE, "500"));
  }
}

export function buildBiwheelSvg(bi: BiwheelModel, opts: { ariaLabel?: string } = {}): string {
  const { ariaLabel = "Çift çark harita" } = opts;
  const { inner, outer, interAspects } = bi;
  const asc = inner.angles?.asc ?? outer.angles?.asc ?? 0;
  const p: string[] = [];

  // Rings
  p.push(`<circle cx="${C}" cy="${C}" r="${R_OUT}" fill="${CREAM}" stroke="${PLUM}" stroke-width="1.5"/>`);
  p.push(`<circle cx="${C}" cy="${C}" r="${R_ZIN}" fill="#fff" stroke="${PLUM}" stroke-width="1"/>`);
  p.push(`<circle cx="${C}" cy="${C}" r="${R_MID}" fill="none" stroke="${PURPLE}" stroke-width="0.7" opacity="0.4"/>`);
  p.push(`<circle cx="${C}" cy="${C}" r="${R_RING}" fill="none" stroke="${PURPLE}" stroke-width="0.8" opacity="0.5"/>`);

  // Degree ticks + zodiac dividers + glyphs
  for (let deg = 0; deg < 360; deg++) {
    const len = deg % 10 === 0 ? 8 : deg % 5 === 0 ? 5 : 3;
    const [x1, y1] = pos(deg, R_ZIN, asc);
    const [x2, y2] = pos(deg, R_ZIN - len, asc);
    p.push(line(x1, y1, x2, y2, PLUM, deg % 10 === 0 ? 0.7 : 0.45, deg % 5 === 0 ? 0.55 : 0.3));
  }
  for (let i = 0; i < 12; i++) {
    const [x1, y1] = pos(i * 30, R_ZIN, asc);
    const [x2, y2] = pos(i * 30, R_OUT, asc);
    p.push(line(x1, y1, x2, y2, PLUM, 1, 0.6));
    const [gx, gy] = pos(i * 30 + 15, (R_OUT + R_ZIN) / 2, asc);
    p.push(text(gx, gy + 7, SIGN_GLYPHS[i], 19, PLUM));
  }

  // Inner-chart house cusps + numbers + angle labels
  if (inner.cusps.length === 12) {
    inner.cusps.forEach((cusp, i) => {
      const isAngle = i === 0 || i === 3 || i === 6 || i === 9;
      const [x1, y1] = pos(cusp.lon, R_RING, asc);
      const [x2, y2] = pos(cusp.lon, R_MID, asc);
      p.push(line(x1, y1, x2, y2, isAngle ? GOLD : PURPLE, isAngle ? 1.6 : 0.7, isAngle ? 0.85 : 0.4));
      const next = inner.cusps[(i + 1) % 12].lon;
      const span = ((next - cusp.lon) % 360 + 360) % 360;
      const [nx, ny] = pos(cusp.lon + span / 2, R_HOUSENUM, asc);
      p.push(text(nx, ny + 3, String(i + 1), 8, PLUM, "600"));
    });
    const labels: [number, string][] = [
      [inner.cusps[0].lon, "ASC"], [inner.cusps[3].lon, "IC"],
      [inner.cusps[6].lon, "DSC"], [inner.cusps[9].lon, "MC"],
    ];
    for (const [lon, lab] of labels) {
      const [x, y] = pos(lon, R_OUT + 12, asc);
      p.push(text(x, y + 3, lab, 10, GOLD, "600"));
    }
  }

  // Inter-aspect lines across the hub
  const innerLon = new Map(inner.points.map((pt) => [pt.key, pt.lon]));
  const outerLon = new Map(outer.points.map((pt) => [pt.key, pt.lon]));
  const maxOrb = 8;
  for (const a of interAspects) {
    const la = innerLon.get(a.a), lb = outerLon.get(a.b);
    if (la === undefined || lb === undefined) continue;
    const [x1, y1] = pos(la, R_RING, asc);
    const [x2, y2] = pos(lb, R_RING, asc);
    const opacity = 0.22 + 0.5 * (1 - Math.min(a.orb, maxOrb) / maxOrb);
    p.push(line(x1, y1, x2, y2, ASPECT_COLOR[a.category], a.category === "hard" ? 1 : 0.8, opacity));
  }

  // Planets: inner chart on the inner ring, outer chart just inside the zodiac band
  plotPlanets(inner, R_INNER_PL, asc, p);
  plotPlanets(outer, R_OUTER_PL, asc, p);

  return `${svgOpen(ariaLabel)}${p.join("")}</svg>`;
}
