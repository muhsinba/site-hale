// Client-side helpers shared by the three chart forms: date-input formatting and
// building the API `person` payload from the form fields. No server imports.

import { TURKEY_CITIES as CITIES } from "@/lib/turkeyCities";

export const DEFAULT_TZ = "Europe/Istanbul";

export type PersonFields = {
  date: string;    // dd/mm/yyyy
  time: string;    // hh:mm ("" = unknown)
  cityIdx: string; // index into CITIES, or "custom"
  lat: string;
  lon: string;
};

export function defaultPersonFields(): PersonFields {
  const istanbul = String(CITIES.findIndex((c) => c.name === "İstanbul"));
  return { date: "", time: "", cityIdx: istanbul, lat: "", lon: "" };
}

// Auto-format free text into dd/mm/yyyy as the user types.
export function formatDateInput(v: string): string {
  const s = v.replace(/\D/g, "").slice(0, 8);
  return [s.slice(0, 2), s.slice(2, 4), s.slice(4, 8)].filter(Boolean).join("/");
}

// dd/mm/yyyy -> yyyy-mm-dd (native date picker value), or "" if incomplete.
export function toISODate(v: string): string {
  const m = v.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  return m ? `${m[3]}-${m[2]}-${m[1]}` : "";
}

// yyyy-mm-dd -> dd/mm/yyyy, or "" if incomplete.
export function fromISODate(v: string): string {
  const [y, m, d] = v.split("-");
  return y && m && d ? `${d}/${m}/${y}` : "";
}

export type PersonPayload = {
  date: { d: number; m: number; y: number };
  time?: { h: number; m: number };
  lat: number;
  lon: number;
  tz: string;
  label?: string;
};

// Validate the fields and build the API payload, or return a Turkish error message.
export function buildPerson(pf: PersonFields, label?: string): { ok: true; person: PersonPayload } | { ok: false; error: string } {
  const dm = pf.date.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!dm) return { ok: false, error: "Lütfen doğum tarihini gg/aa/yyyy biçiminde girin." };
  const d = Number(dm[1]), m = Number(dm[2]), y = Number(dm[3]);
  if (d < 1 || d > 31 || m < 1 || m > 12 || y < 1900 || y > 2100) {
    return { ok: false, error: "Lütfen geçerli bir doğum tarihi girin." };
  }

  let lat: number, lon: number;
  if (pf.cityIdx === "custom") {
    lat = Number(pf.lat); lon = Number(pf.lon);
    if (!Number.isFinite(lat) || !Number.isFinite(lon) || Math.abs(lat) > 90 || Math.abs(lon) > 180) {
      return { ok: false, error: "Lütfen geçerli bir enlem ve boylam girin." };
    }
  } else {
    const c = CITIES[Number(pf.cityIdx)];
    if (!c) return { ok: false, error: "Lütfen doğum yerini seçin." };
    lat = c.lat; lon = c.lon;
  }

  const person: PersonPayload = { date: { d, m, y }, lat, lon, tz: DEFAULT_TZ, label };
  if (pf.time) {
    const [h, mi] = pf.time.split(":").map(Number);
    person.time = { h, m: mi };
  }
  return { ok: true, person };
}
