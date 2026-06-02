// Request validation + types for /api/chart. Hand-rolled validators in the same style
// as the existing chat route (no extra dependency). All error messages are Turkish.

import type { ChartInput } from "@/lib/astro/computeChart";

export const DEFAULT_TZ = "Europe/Istanbul";

export type PersonRaw = {
  date?: { d?: unknown; m?: unknown; y?: unknown };
  time?: { h?: unknown; m?: unknown } | null;
  lat?: unknown;
  lon?: unknown;
  tz?: unknown;
  label?: unknown;
};

export type ChartRequest =
  | { kind: "natal"; person: PersonRaw }
  | { kind: "transit"; transit: PersonRaw; natal?: PersonRaw; biwheel?: boolean }
  | { kind: "synastry"; personA: PersonRaw; personB: PersonRaw };

type Parsed = { ok: true; value: ChartInput } | { ok: false; error: string };

function num(v: unknown): number | null {
  const n = typeof v === "string" ? Number(v) : v;
  return typeof n === "number" && Number.isFinite(n) ? n : null;
}

// Validate one person's birth data into a ChartInput (minus `kind`, added by caller).
export function parsePerson(raw: PersonRaw | undefined, kind: ChartInput["kind"]): Parsed {
  if (!raw || typeof raw !== "object") return { ok: false, error: "Eksik doğum bilgisi." };

  const d = num(raw.date?.d), m = num(raw.date?.m), y = num(raw.date?.y);
  if (d === null || m === null || y === null) return { ok: false, error: "Lütfen geçerli bir tarih girin." };
  if (d < 1 || d > 31 || m < 1 || m > 12 || y < 1900 || y > 2100) {
    return { ok: false, error: "Tarih 01/01/1900 ile 31/12/2100 arasında olmalıdır." };
  }

  const hasTime = !!raw.time && raw.time.h !== undefined && raw.time.h !== null;
  let hour = 12, minute = 0;
  if (hasTime) {
    const h = num(raw.time!.h), mi = num(raw.time!.m ?? 0);
    if (h === null || mi === null || h < 0 || h > 23 || mi < 0 || mi > 59) {
      return { ok: false, error: "Lütfen geçerli bir saat girin." };
    }
    hour = h; minute = mi;
  }

  const lat = num(raw.lat), lon = num(raw.lon);
  if (lat === null || lon === null || Math.abs(lat) > 90 || Math.abs(lon) > 180) {
    return { ok: false, error: "Lütfen geçerli bir enlem ve boylam girin." };
  }

  const tz = typeof raw.tz === "string" && raw.tz ? raw.tz : DEFAULT_TZ;
  const label = typeof raw.label === "string" ? raw.label : undefined;

  return {
    ok: true,
    value: { kind, year: y, month: m, day: d, hour, minute, hasTime, lat, lon, tz, label },
  };
}
