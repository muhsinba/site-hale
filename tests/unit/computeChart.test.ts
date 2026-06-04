import { describe, it, expect } from "vitest";
import { computeChart } from "@/lib/astro/computeChart";

// Engine regression guard: a fixed birth must always produce the same Swiss Ephemeris
// positions. tz:"UTC" pins the exact UT instant (1990-05-15 14:30 UT, İstanbul), so
// these are the canonical reference values. If a dependency update shifts a planet,
// this test fails loudly. Tolerances are ~3 arc-minutes (well within display precision).
describe("computeChart — natal (1990-05-15 14:30 UT, İstanbul)", () => {
  const input = {
    kind: "natal" as const,
    year: 1990, month: 5, day: 15, hour: 14, minute: 30,
    hasTime: true, lat: 41.0082, lon: 28.9784, tz: "UTC",
  };

  it("runs in true Swiss Ephemeris mode with all 14 bodies", async () => {
    const m = await computeChart(input);
    expect(m.meta.ephemeris).toBe("swiss");
    expect(m.points).toHaveLength(14);
    expect(m.cusps).toHaveLength(12);
  });

  it("places the luminaries and angles correctly", async () => {
    const m = await computeChart(input);
    const sun = m.points.find((p) => p.key === "sun")!;
    const moon = m.points.find((p) => p.key === "moon")!;

    expect(sun.lon).toBeCloseTo(54.5, 1); // 24°30' Boğa
    expect(sun.signIndex).toBe(1);
    expect(sun.deg).toBe(24);
    expect(moon.signIndex).toBe(9); // Oğlak

    expect(m.angles!.asc).toBeCloseTo(203.31, 1); // 23°18' Terazi
    expect(m.angles!.mc).toBeCloseTo(117.47, 1); // 27°28' Yengeç
  });

  it("includes Chiron and detects retrograde", async () => {
    const m = await computeChart(input);
    const chiron = m.points.find((p) => p.key === "chiron")!;
    expect(chiron).toBeDefined();
    expect(chiron.signIndex).toBe(3); // Yengeç

    const mercury = m.points.find((p) => p.key === "mercury")!;
    expect(mercury.retro).toBe(true);
    expect(m.aspects.length).toBeGreaterThan(0);
  });

  it("omits houses when no birth time is given", async () => {
    const m = await computeChart({ ...input, hasTime: false });
    expect(m.cusps).toHaveLength(0);
    expect(m.angles).toBeNull();
    expect(m.meta.approxTime).toBe(true);
  });
});
