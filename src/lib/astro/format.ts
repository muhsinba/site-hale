// Small pure helpers for angle math and degree formatting. No deps.

export function degnorm(x: number): number {
  return ((x % 360) + 360) % 360;
}

// Smallest absolute separation between two longitudes (0–180).
export function angularDiff(a: number, b: number): number {
  const d = Math.abs(degnorm(a) - degnorm(b));
  return d > 180 ? 360 - d : d;
}

export type DMS = { deg: number; min: number; sign: number };

// Split a longitude into degrees + arc-minutes within its zodiac sign.
export function toDMS(lon: number): DMS {
  const n = degnorm(lon);
  const within = n % 30;
  let deg = Math.floor(within);
  let min = Math.round((within - deg) * 60);
  if (min === 60) { min = 0; deg += 1; } // rounding carry
  return { deg, min, sign: Math.floor(n / 30) };
}

// "12°34'" style label.
export function dmsLabel(lon: number): string {
  const { deg, min } = toDMS(lon);
  return `${deg}°${String(min).padStart(2, "0")}'`;
}
