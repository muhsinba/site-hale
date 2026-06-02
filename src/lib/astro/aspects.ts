// Aspect detection between two sets of points. Major (Ptolemaic) aspects only,
// matching the site's prior "major" configuration. Orbs are configurable.

import type { Point, Aspect, AspectType } from "./model";
import { angularDiff } from "./format";

type AspectDef = { type: AspectType; angle: number; glyph: string; category: "hard" | "soft" | "neutral" };

const ASPECTS: AspectDef[] = [
  { type: "conjunction", angle: 0, glyph: "☌", category: "neutral" },
  { type: "sextile", angle: 60, glyph: "⚹", category: "soft" },
  { type: "square", angle: 90, glyph: "□", category: "hard" },
  { type: "trine", angle: 120, glyph: "△", category: "soft" },
  { type: "opposition", angle: 180, glyph: "☍", category: "hard" },
];

export type OrbConfig = Record<AspectType, number>;

export const DEFAULT_ORBS: OrbConfig = {
  conjunction: 8, sextile: 4, square: 7, trine: 7, opposition: 8,
};

// Applying when the orb to exactness shrinks under the bodies' motion. Compared
// via a small forward step (finite difference) so sign-of-speed and wrap are handled.
function isApplying(a: Point, b: Point, exactAngle: number): boolean {
  const dt = 0.02; // days
  const now = Math.abs(angularDiff(a.lon, b.lon) - exactAngle);
  const later = Math.abs(angularDiff(a.lon + a.speed * dt, b.lon + b.speed * dt) - exactAngle);
  return later < now;
}

function match(a: Point, b: Point, orbs: OrbConfig): Aspect | null {
  const sep = angularDiff(a.lon, b.lon);
  for (const def of ASPECTS) {
    const orb = Math.abs(sep - def.angle);
    if (orb <= orbs[def.type]) {
      return {
        a: a.key, b: b.key, type: def.type, glyph: def.glyph, angle: def.angle,
        orb: Math.round(orb * 100) / 100,
        applying: isApplying(a, b, def.angle),
        category: def.category,
      };
    }
  }
  return null;
}

// Aspects within a single chart (each unordered pair once).
export function detectAspects(points: Point[], orbs: OrbConfig = DEFAULT_ORBS): Aspect[] {
  const out: Aspect[] = [];
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const m = match(points[i], points[j], orbs);
      if (m) out.push(m);
    }
  }
  return out;
}

// Inter-aspects between two charts (every point of A against every point of B) —
// used for transit-to-natal and synastry. a.key is from set A, b.key from set B.
export function interAspects(aPoints: Point[], bPoints: Point[], orbs: OrbConfig = DEFAULT_ORBS): Aspect[] {
  const out: Aspect[] = [];
  for (const pa of aPoints) {
    for (const pb of bPoints) {
      const m = match(pa, pb, orbs);
      if (m) out.push(m);
    }
  }
  return out;
}
