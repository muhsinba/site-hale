// Convert a local wall-clock birth time in an IANA zone to a UTC instant, using the
// platform's bundled tz database (so historical DST — e.g. Turkey's pre-2016 summer
// time — is applied correctly). No external dependency.

type UTCParts = { year: number; month: number; day: number; hourUT: number };

// Offset (minutes, east-positive) of `zone` at the given UTC instant.
function zoneOffsetMinutes(utcMs: number, zone: string): number {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: zone, hourCycle: "h23",
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
  });
  const parts = dtf.formatToParts(new Date(utcMs));
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  const asUTC = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour"), get("minute"), get("second"));
  return Math.round((asUTC - utcMs) / 60000);
}

// Local components (in `zone`) → UTC calendar components + decimal UT hour.
export function localToUT(
  year: number, month: number, day: number, hour: number, minute: number, zone: string,
): UTCParts {
  // First guess: interpret the wall time as if it were UTC, then correct by the
  // zone's offset, re-evaluated at the corrected instant to settle DST boundaries.
  const guess = Date.UTC(year, month - 1, day, hour, minute);
  let offset = zoneOffsetMinutes(guess, zone);
  let utcMs = guess - offset * 60000;
  offset = zoneOffsetMinutes(utcMs, zone);
  utcMs = guess - offset * 60000;

  const d = new Date(utcMs);
  return {
    year: d.getUTCFullYear(),
    month: d.getUTCMonth() + 1,
    day: d.getUTCDate(),
    hourUT: d.getUTCHours() + d.getUTCMinutes() / 60 + d.getUTCSeconds() / 3600,
  };
}
