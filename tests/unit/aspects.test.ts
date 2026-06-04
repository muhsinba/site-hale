import { describe, it, expect } from "vitest";
import { detectAspects, interAspects, DEFAULT_ORBS } from "@/lib/astro/aspects";
import { makePoint } from "../helpers";

describe("detectAspects", () => {
  it("identifies each major aspect by exact angle", () => {
    const trine = detectAspects([makePoint("sun", 0), makePoint("moon", 120)]);
    expect(trine).toHaveLength(1);
    expect(trine[0]).toMatchObject({ type: "trine", category: "soft", orb: 0 });

    expect(detectAspects([makePoint("sun", 0), makePoint("mars", 90)])[0])
      .toMatchObject({ type: "square", category: "hard" });
    expect(detectAspects([makePoint("sun", 0), makePoint("venus", 60)])[0])
      .toMatchObject({ type: "sextile", category: "soft" });
    expect(detectAspects([makePoint("sun", 0), makePoint("mercury", 4)])[0])
      .toMatchObject({ type: "conjunction", category: "neutral" });
    expect(detectAspects([makePoint("sun", 0), makePoint("pluto", 180)])[0])
      .toMatchObject({ type: "opposition", category: "hard" });
  });

  it("returns no aspect when outside orb", () => {
    expect(detectAspects([makePoint("sun", 0), makePoint("moon", 40)])).toHaveLength(0);
  });

  it("respects the orb config", () => {
    // 7° from a conjunction: inside the default 8° orb, outside a tight 5° orb.
    expect(detectAspects([makePoint("sun", 0), makePoint("moon", 7)])).toHaveLength(1);
    const tight = { ...DEFAULT_ORBS, conjunction: 5 };
    expect(detectAspects([makePoint("sun", 0), makePoint("moon", 7)], tight)).toHaveLength(0);
  });

  it("computes applying vs separating from speed", () => {
    // Fast Moon approaching a slower Sun toward an exact trine → applying.
    const a = makePoint("moon", 118, { speed: 13 });
    const b = makePoint("sun", 0, { speed: 1 });
    expect(detectAspects([a, b])[0]).toMatchObject({ type: "trine", applying: true });
  });
});

describe("interAspects", () => {
  it("matches every point in set A against set B", () => {
    const res = interAspects([makePoint("sun", 0)], [makePoint("sun", 120), makePoint("moon", 90)]);
    expect(res).toHaveLength(2);
    expect(res.map((r) => r.type).sort()).toEqual(["square", "trine"]);
  });
});
