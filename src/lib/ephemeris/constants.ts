// Swiss Ephemeris body ids + the PlanetKey → id mapping used by the engine.
// SE numeric ids are stable Swiss Ephemeris constants.

import type { PlanetKey } from "@/lib/astro/signs";

export const SE = {
  SUN: 0, MOON: 1, MERCURY: 2, VENUS: 3, MARS: 4, JUPITER: 5, SATURN: 6,
  URANUS: 7, NEPTUNE: 8, PLUTO: 9, TRUE_NODE: 11, MEAN_APOG: 12, CHIRON: 15,
} as const;

// Bodies we calc directly via swe_calc_ut. northNode is derived (TRUE_NODE),
// southNode is computed as northNode + 180° in the calc layer (not listed here),
// and lilith maps to the Mean Lunar Apogee.
export const BODY_SE_ID: Partial<Record<PlanetKey, number>> = {
  sun: SE.SUN, moon: SE.MOON, mercury: SE.MERCURY, venus: SE.VENUS, mars: SE.MARS,
  jupiter: SE.JUPITER, saturn: SE.SATURN, uranus: SE.URANUS, neptune: SE.NEPTUNE,
  pluto: SE.PLUTO, northNode: SE.TRUE_NODE, chiron: SE.CHIRON, lilith: SE.MEAN_APOG,
};

export const HOUSE_SYSTEM = "P"; // Placidus (SolarFire default)
export const HOUSE_SYSTEM_TR = "Placidus";
