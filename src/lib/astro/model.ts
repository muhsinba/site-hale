// Framework-agnostic chart model. Produced server-side by computeChart() and consumed
// by the SVG renderers (wheel/biwheel) and the React table components. Pure data — no
// dependency on the ephemeris engine or React, so it serialises cleanly over the API.

import type { PlanetKey, Element, Modality } from "./signs";

export type AspectType = "conjunction" | "sextile" | "square" | "trine" | "opposition";

export type Point = {
  key: PlanetKey;
  name: string;        // TR
  glyph: string;
  lon: number;         // ecliptic longitude 0–360
  signIndex: number;   // 0 = Aries
  sign: string;        // TR
  deg: number;         // whole degrees within sign (0–29)
  min: number;         // arc-minutes within degree (0–59)
  retro: boolean;
  speed: number;       // °/day in longitude
  house: number;       // 1–12, or 0 when no birth time / no houses
};

export type Cusp = {
  house: number;       // 1–12
  lon: number;
  signIndex: number;
  sign: string;        // TR
  deg: number;
  min: number;
};

export type Angles = {
  asc: number;
  mc: number;
  ic: number;
  desc: number;
  armc: number;
  vertex: number;
};

export type Aspect = {
  a: PlanetKey;
  b: PlanetKey;
  type: AspectType;
  glyph: string;
  angle: number;       // exact aspect angle (0/60/90/120/180)
  orb: number;         // |deviation| in degrees
  applying: boolean;
  category: "hard" | "soft" | "neutral";
};

export type Dignity = {
  key: PlanetKey;
  ruler: boolean;
  exalt: boolean;
  detriment: boolean;
  fall: boolean;
  triplicity: boolean;
  score: number;       // Ptolemaic-style additive score
};

export type Balance = {
  elements: Record<Element, number>;
  modalities: Record<Modality, number>;
};

export type ChartMeta = {
  kind: "natal" | "transit" | "synastry";
  whenUTC: string;          // ISO instant the chart was cast for
  lat: number;
  lon: number;
  tz: string;               // IANA zone used for local→UT conversion
  houseSystem: string;      // e.g. "Placidus"
  ephemeris: "swiss" | "moshier";
  approxTime: boolean;      // true when no birth time was supplied (noon assumed)
  label?: string;           // optional person label (synastry / transit)
};

export type ChartModel = {
  meta: ChartMeta;
  points: Point[];
  cusps: Cusp[];            // 12 entries, or [] when approxTime/no houses
  angles: Angles | null;
  aspects: Aspect[];
  dignities: Dignity[];
  balance: Balance;
};

export type BiwheelModel = {
  inner: ChartModel;
  outer: ChartModel;
  interAspects: Aspect[];   // aspects from inner points to outer points
};

export type Interp = { title: string; body: string };
