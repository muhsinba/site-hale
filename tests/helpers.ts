// Shared test helpers (not a test file itself).
import type { Point } from "@/lib/astro/model";
import type { PlanetKey } from "@/lib/astro/signs";
import { SIGNS_TR, signIndex } from "@/lib/astro/signs";

// Build a Point with sensible defaults; only the fields a test cares about need passing.
export function makePoint(key: PlanetKey, lon: number, opts: Partial<Point> = {}): Point {
  const idx = signIndex(lon);
  return {
    key,
    name: key,
    glyph: "•",
    lon,
    signIndex: idx,
    sign: SIGNS_TR[idx],
    deg: Math.floor(lon % 30),
    min: 0,
    retro: false,
    speed: 1,
    house: 0,
    ...opts,
  };
}
