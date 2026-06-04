import { describe, it, expect } from "vitest";
import { localToUT } from "@/lib/astro/timezone";

// The local→UT conversion is the most bug-prone part of the engine (historical DST).
// These lock in Turkey's offsets across the 2016 "permanent +3" change.

describe("localToUT (Europe/Istanbul)", () => {
  it("uses fixed +3 after 2016", () => {
    const ut = localToUT(2020, 6, 15, 14, 30, "Europe/Istanbul");
    expect(ut.hourUT).toBeCloseTo(11.5, 5);
    expect(ut.day).toBe(15);
  });

  it("applies summer DST (+3) for a pre-2016 date", () => {
    const ut = localToUT(1990, 5, 15, 17, 30, "Europe/Istanbul");
    expect(ut.hourUT).toBeCloseTo(14.5, 5); // EEST = UTC+3
    expect(ut.day).toBe(15);
  });

  it("applies standard winter time (+2) for a pre-2016 date", () => {
    const ut = localToUT(1990, 1, 15, 12, 0, "Europe/Istanbul");
    expect(ut.hourUT).toBeCloseTo(10, 5); // EET = UTC+2
    expect(ut.day).toBe(15);
  });

  it("rolls the date back when UT crosses midnight", () => {
    const ut = localToUT(2020, 6, 15, 1, 0, "Europe/Istanbul"); // 01:00 local → 22:00 prev day UT
    expect(ut.hourUT).toBeCloseTo(22, 5);
    expect(ut.day).toBe(14);
  });

  it("treats UTC as a no-op", () => {
    const ut = localToUT(2020, 6, 15, 14, 30, "UTC");
    expect(ut.hourUT).toBeCloseTo(14.5, 5);
    expect(ut.day).toBe(15);
  });
});
