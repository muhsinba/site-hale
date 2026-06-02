// Swiss Ephemeris adapter — the ONLY module that imports the WASM package.
// Everything else depends on this typed surface, so the engine can be swapped
// without touching the calc/render layers. Server-only (Node runtime): the GPL
// WASM binary and its bundled .se1 ephemeris data never reach the browser.

import { SE, HOUSE_SYSTEM } from "./constants";

// swisseph-wasm's bundled .d.ts is incomplete (e.g. houses() is typed as
// returning a number but actually returns { cusps, ascmc }). Describe the subset
// we use here so the rest of the file is type-safe.
type SweInstance = {
  initSwissEph(): Promise<void>;
  version(): string;
  julday(year: number, month: number, day: number, hour: number): number;
  calc_ut(jd: number, body: number, flags: number): Float64Array;
  houses(jd: number, lat: number, lon: number, hsys: string): { cusps: Float64Array; ascmc: Float64Array };
  SEFLG_SWIEPH: number;
  SEFLG_SPEED: number;
};

let instancePromise: Promise<SweInstance> | null = null;

async function getEngine(): Promise<SweInstance> {
  if (!instancePromise) {
    instancePromise = (async () => {
      const mod = await import("swisseph-wasm");
      const SwissEph = mod.default;
      const swe = new SwissEph() as unknown as SweInstance;
      await swe.initSwissEph();
      return swe;
    })();
  }
  return instancePromise;
}

function flags(swe: SweInstance): number {
  return swe.SEFLG_SWIEPH | swe.SEFLG_SPEED;
}

export type RawBody = { lon: number; lat: number; dist: number; speed: number };
export type RawHouses = {
  cusps: number[]; // 12 entries, cusps[0] = house 1
  asc: number;
  mc: number;
  armc: number;
  vertex: number;
};

// Julian Day (UT) from a Gregorian UTC date with a decimal hour.
export async function juldayUT(year: number, month: number, day: number, hourUT: number): Promise<number> {
  const swe = await getEngine();
  return swe.julday(year, month, day, hourUT);
}

export async function calcBody(jd: number, seId: number): Promise<RawBody> {
  const swe = await getEngine();
  const r = swe.calc_ut(jd, seId, flags(swe));
  return { lon: r[0], lat: r[1], dist: r[2], speed: r[3] };
}

export async function housesPlacidus(jd: number, lat: number, lon: number): Promise<RawHouses> {
  const swe = await getEngine();
  const h = swe.houses(jd, lat, lon, HOUSE_SYSTEM);
  // cusps[1..12] are the house cusps; ascmc[0]=Asc, [1]=MC, [2]=ARMC, [3]=Vertex.
  const cusps: number[] = [];
  for (let i = 1; i <= 12; i++) cusps.push(h.cusps[i]);
  return { cusps, asc: h.ascmc[0], mc: h.ascmc[1], armc: h.ascmc[2], vertex: h.ascmc[3] };
}

// "swiss" when the bundled .se1 data loads (Chiron resolves); "moshier" if it
// silently fell back. The result is cached after the first probe.
let modeCache: "swiss" | "moshier" | null = null;
export async function ephemerisMode(): Promise<"swiss" | "moshier"> {
  if (modeCache) return modeCache;
  try {
    const jd = await juldayUT(2000, 1, 1, 12);
    await calcBody(jd, SE.CHIRON);
    modeCache = "swiss";
  } catch {
    modeCache = "moshier";
  }
  return modeCache;
}

export async function engineVersion(): Promise<string> {
  const swe = await getEngine();
  return swe.version();
}
