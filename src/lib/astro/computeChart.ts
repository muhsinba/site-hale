// Orchestrator: birth data → rich ChartModel. Server-only (imports the engine).
// Reused by all three chart kinds (natal / transit / synastry) — the per-person
// computation is identical; higher layers combine the resulting models.

import type { ChartModel, Point, Cusp, Angles } from "./model";
import type { PlanetKey } from "./signs";
import { PLANET_ORDER, PLANET_TR, PLANET_GLYPHS, SIGNS_TR } from "./signs";
import { toDMS, degnorm } from "./format";
import { detectAspects } from "./aspects";
import { computeDignities } from "./dignities";
import { computeBalance } from "./balances";
import { localToUT } from "./timezone";
import { BODY_SE_ID } from "@/lib/ephemeris/constants";
import { HOUSE_SYSTEM_TR } from "@/lib/ephemeris/constants";
import { juldayUT, calcBody, housesPlacidus, ephemerisMode } from "@/lib/ephemeris/engine";

export type ChartInput = {
  kind: "natal" | "transit" | "synastry";
  year: number; month: number; day: number;
  hour: number; minute: number;
  hasTime: boolean;       // when false, noon is assumed and houses are omitted
  lat: number; lon: number;
  tz: string;             // IANA zone for local→UT conversion
  label?: string;
};

function inArc(x: number, start: number, end: number): boolean {
  const span = degnorm(end - start);
  return degnorm(x - start) < span;
}

function houseOf(lon: number, cusps: number[]): number {
  for (let i = 0; i < 12; i++) {
    if (inArc(lon, cusps[i], cusps[(i + 1) % 12])) return i + 1;
  }
  return 0;
}

function makePoint(key: PlanetKey, lon: number, speed: number, cusps: number[] | null): Point {
  const { deg, min, sign } = toDMS(lon);
  return {
    key, name: PLANET_TR[key], glyph: PLANET_GLYPHS[key],
    lon: degnorm(lon), signIndex: sign, sign: SIGNS_TR[sign],
    deg, min, retro: speed < 0, speed,
    house: cusps ? houseOf(degnorm(lon), cusps) : 0,
  };
}

export async function computeChart(input: ChartInput): Promise<ChartModel> {
  const ut = localToUT(input.year, input.month, input.day, input.hour, input.minute, input.tz);
  const jd = await juldayUT(ut.year, ut.month, ut.day, ut.hourUT);

  // Houses + angles only when a real birth time was supplied.
  let cusps: number[] | null = null;
  let cuspModels: Cusp[] = [];
  let angles: Angles | null = null;
  if (input.hasTime) {
    const h = await housesPlacidus(jd, input.lat, input.lon);
    cusps = h.cusps;
    cuspModels = h.cusps.map((c, i) => {
      const { deg, min, sign } = toDMS(c);
      return { house: i + 1, lon: degnorm(c), signIndex: sign, sign: SIGNS_TR[sign], deg, min };
    });
    angles = {
      asc: degnorm(h.asc), mc: degnorm(h.mc),
      ic: degnorm(h.mc + 180), desc: degnorm(h.asc + 180),
      armc: degnorm(h.armc), vertex: degnorm(h.vertex),
    };
  }

  // Raw longitudes/speeds for every directly-computed body.
  const raw: Partial<Record<PlanetKey, { lon: number; speed: number }>> = {};
  for (const [key, seId] of Object.entries(BODY_SE_ID) as [PlanetKey, number][]) {
    const b = await calcBody(jd, seId);
    raw[key] = { lon: b.lon, speed: b.speed };
  }
  // South Node is exactly opposite the (true) North Node.
  if (raw.northNode) raw.southNode = { lon: raw.northNode.lon + 180, speed: raw.northNode.speed };

  const points: Point[] = PLANET_ORDER
    .filter((k) => raw[k])
    .map((k) => makePoint(k, raw[k]!.lon, raw[k]!.speed, cusps));

  // Day chart when the Sun is above the horizon (houses 7–12); default to day.
  const sun = points.find((p) => p.key === "sun");
  const isDay = sun && sun.house ? sun.house >= 7 : true;

  return {
    meta: {
      kind: input.kind,
      whenUTC: new Date(Date.UTC(ut.year, ut.month - 1, ut.day, Math.floor(ut.hourUT), Math.round((ut.hourUT % 1) * 60))).toISOString(),
      lat: input.lat, lon: input.lon, tz: input.tz,
      houseSystem: HOUSE_SYSTEM_TR,
      ephemeris: await ephemerisMode(),
      approxTime: !input.hasTime,
      label: input.label,
    },
    points,
    cusps: cuspModels,
    angles,
    // South Node is the exact opposite of North Node, so aspects to it just mirror the
    // North Node's — exclude it to avoid a trivial NN–SN opposition and duplicate lines.
    aspects: detectAspects(points.filter((p) => p.key !== "southNode")),
    dignities: computeDignities(points, isDay),
    balance: computeBalance(points),
  };
}
