import { describe, it, expect } from "vitest";
import { degnorm, angularDiff, toDMS, dmsLabel } from "@/lib/astro/format";

describe("degnorm", () => {
  it("wraps into 0–360", () => {
    expect(degnorm(370)).toBe(10);
    expect(degnorm(-10)).toBe(350);
    expect(degnorm(0)).toBe(0);
    expect(degnorm(360)).toBe(0);
  });
});

describe("angularDiff", () => {
  it("returns the shortest separation (0–180)", () => {
    expect(angularDiff(10, 350)).toBe(20);
    expect(angularDiff(0, 180)).toBe(180);
    expect(angularDiff(350, 10)).toBe(20);
    expect(angularDiff(120, 0)).toBe(120);
  });
});

describe("toDMS", () => {
  it("splits a longitude into sign / degree / minute", () => {
    expect(toDMS(45.5)).toEqual({ deg: 15, min: 30, sign: 1 }); // 15°30' Taurus
    expect(toDMS(0)).toEqual({ deg: 0, min: 0, sign: 0 }); // 0° Aries
  });

  it("carries minutes that round up to 60", () => {
    // 10.999° → 10°59.94' → rounds to 11°00'
    expect(toDMS(10.999)).toEqual({ deg: 11, min: 0, sign: 0 });
  });
});

describe("dmsLabel", () => {
  it("formats as d°mm'", () => {
    expect(dmsLabel(45.5)).toBe("15°30'");
    expect(dmsLabel(33)).toBe("3°00'");
  });
});
