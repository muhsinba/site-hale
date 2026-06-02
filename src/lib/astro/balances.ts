// Element (fire/earth/air/water) and modality (cardinal/fixed/mutable) tallies over
// the chart's points. Counts the seven classical planets + the modern three by default
// (nodes/Lilith/Chiron excluded) to match how SolarFire weights the elemental balance.

import type { Point, Balance } from "./model";
import type { PlanetKey } from "./signs";
import { SIGN_ELEMENTS, SIGN_MODALITIES } from "./signs";

const COUNTED: PlanetKey[] = [
  "sun", "moon", "mercury", "venus", "mars", "jupiter", "saturn", "uranus", "neptune", "pluto",
];

export function computeBalance(points: Point[]): Balance {
  const balance: Balance = {
    elements: { fire: 0, earth: 0, air: 0, water: 0 },
    modalities: { cardinal: 0, fixed: 0, mutable: 0 },
  };
  for (const p of points) {
    if (!COUNTED.includes(p.key)) continue;
    balance.elements[SIGN_ELEMENTS[p.signIndex]] += 1;
    balance.modalities[SIGN_MODALITIES[p.signIndex]] += 1;
  }
  return balance;
}
