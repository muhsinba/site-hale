// Composes the canned Turkish interpretation paragraphs relevant to a given chart.
// Server-side only is not required (pure data), but the route calls it so the phrase
// banks never ship to the client. Returns an ordered, de-duplicated paragraph list.

import type { ChartModel, Interp, Point } from "@/lib/astro/model";
import type { PlanetKey } from "@/lib/astro/signs";
import { SIGNS_TR, PLANET_TR, PLANET_GLYPHS } from "@/lib/astro/signs";
import {
  PLANET_THEME, PLANET_SHORT, SIGN_TRAIT, HOUSE_THEME, ASPECT_NAME_TR, ASPECT_TONE,
} from "./data";

// Bodies that get a sign paragraph (luminaries first; South Node omitted — its meaning
// is covered by the North Node entry).
const SIGN_BODIES: PlanetKey[] = [
  "sun", "moon", "mercury", "venus", "mars", "jupiter", "saturn",
  "uranus", "neptune", "pluto", "chiron", "northNode", "lilith",
];

// Bodies that get a house paragraph (the ten planets — angles/points add little here).
const HOUSE_BODIES: PlanetKey[] = [
  "sun", "moon", "mercury", "venus", "mars", "jupiter", "saturn", "uranus", "neptune", "pluto",
];

const MAX_ASPECTS = 12; // tightest-orb aspects only, to keep the report readable

function planetInSign(p: Point): Interp {
  return {
    title: `${PLANET_GLYPHS[p.key]} ${p.name}, ${p.sign}`,
    body: `${p.name}, ${p.sign} burcunda — ${PLANET_THEME[p.key]}, ${SIGN_TRAIT[p.signIndex]} bir nitelikle ifade bulur.`,
  };
}

function planetInHouse(p: Point): Interp {
  return {
    title: `${PLANET_GLYPHS[p.key]} ${p.name}, ${p.house}. Ev`,
    body: `${p.name}, ${p.house}. evde — ${PLANET_THEME[p.key]}, ${HOUSE_THEME[p.house]} alanında belirginleşir.`,
  };
}

export function getInterpretations(model: ChartModel): Interp[] {
  const out: Interp[] = [];
  const byKey = new Map(model.points.map((p) => [p.key, p]));

  for (const key of SIGN_BODIES) {
    const p = byKey.get(key);
    if (p) out.push(planetInSign(p));
  }

  for (const key of HOUSE_BODIES) {
    const p = byKey.get(key);
    if (p && p.house) out.push(planetInHouse(p));
  }

  const aspects = [...model.aspects].sort((a, b) => a.orb - b.orb).slice(0, MAX_ASPECTS);
  for (const a of aspects) {
    const na = PLANET_TR[a.a], nb = PLANET_TR[a.b];
    out.push({
      title: `${PLANET_GLYPHS[a.a]} ${PLANET_GLYPHS[a.b]} ${na} – ${nb}: ${ASPECT_NAME_TR[a.type]}`,
      body: `${na} (${PLANET_SHORT[a.a]}) ile ${nb} (${PLANET_SHORT[a.b]}) ${ASPECT_NAME_TR[a.type].toLowerCase()} açısı yapıyor: bu iki enerji ${ASPECT_TONE[a.type]} (orb ${a.orb}°).`,
    });
  }

  return out;
}

// Re-export for convenience.
export type { Interp };
export { SIGNS_TR };
