// Essential dignities (rulership / exaltation / detriment / fall / triplicity) and a
// Ptolemaic-style additive score, as shown in SolarFire's dignities grid. Terms and
// faces are intentionally omitted for now; the table degrades gracefully and can be
// extended with the Egyptian-term / Chaldean-face arrays later.

import type { Point, Dignity } from "./model";
import type { PlanetKey, Element } from "./signs";
import { SIGN_RULERS, SIGN_ELEMENTS } from "./signs";

// Sign index (0=Aries) where each planet is exalted.
const EXALT_SIGN: Partial<Record<PlanetKey, number>> = {
  sun: 0, moon: 1, mercury: 5, venus: 11, mars: 9, jupiter: 3, saturn: 6, northNode: 2,
};

// Triplicity rulers by element and sect (day/night), classical (Dorothean).
const TRIPLICITY: Record<Element, { day: PlanetKey; night: PlanetKey }> = {
  fire: { day: "sun", night: "jupiter" },
  earth: { day: "venus", night: "moon" },
  air: { day: "saturn", night: "mercury" },
  water: { day: "mars", night: "mars" },
};

const SCORE = { ruler: 5, exalt: 4, triplicity: 3, detriment: -5, fall: -4 };

// `isDay` controls triplicity sect; default day-chart if the Sun's house is unknown.
export function computeDignities(points: Point[], isDay: boolean): Dignity[] {
  return points.map((p): Dignity => {
    const s = p.signIndex;
    const opp = (s + 6) % 12;
    const ruler = SIGN_RULERS[s] === p.key;
    const detriment = SIGN_RULERS[opp] === p.key;
    const exalt = EXALT_SIGN[p.key] === s;
    const fall = EXALT_SIGN[p.key] === opp;
    const trip = TRIPLICITY[SIGN_ELEMENTS[s]];
    const triplicity = (isDay ? trip.day : trip.night) === p.key;

    let score = 0;
    if (ruler) score += SCORE.ruler;
    if (exalt) score += SCORE.exalt;
    if (triplicity) score += SCORE.triplicity;
    if (detriment) score += SCORE.detriment;
    if (fall) score += SCORE.fall;

    return { key: p.key, ruler, exalt, detriment, fall, triplicity, score };
  });
}
