import { describe, it, expect } from "vitest";
import { computeDignities } from "@/lib/astro/dignities";
import { makePoint } from "../helpers";

// Sign indices: 0=Aries, 4=Leo, 6=Libra, 9=Capricorn, 10=Aquarius.

describe("computeDignities", () => {
  it("marks a planet in its own sign as ruler", () => {
    const [d] = computeDignities([makePoint("sun", 4 * 30)], true); // Sun in Leo
    expect(d.ruler).toBe(true);
    expect(d.score).toBeGreaterThan(0);
  });

  it("marks detriment in the opposite sign", () => {
    const [d] = computeDignities([makePoint("sun", 10 * 30)], true); // Sun in Aquarius
    expect(d.detriment).toBe(true);
    expect(d.score).toBeLessThan(0);
  });

  it("marks exaltation and fall", () => {
    const [exalt] = computeDignities([makePoint("sun", 0)], true); // Sun exalted in Aries
    expect(exalt.exalt).toBe(true);

    const [fall] = computeDignities([makePoint("saturn", 0)], true); // Saturn falls in Aries
    expect(fall.fall).toBe(true);
    expect(fall.score).toBeLessThan(0);
  });

  it("applies triplicity by sect (day vs night)", () => {
    const day = computeDignities([makePoint("sun", 0)], true)[0]; // fire, day → Sun rules
    const night = computeDignities([makePoint("sun", 0)], false)[0];
    expect(day.triplicity).toBe(true);
    expect(night.triplicity).toBe(false);
  });
});
