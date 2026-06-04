import { describe, it, expect } from "vitest";
import { POST } from "@/app/api/chart/route";

// Exercises the route handler directly with a web Request — no running server needed.
function post(body: unknown): Promise<Response> {
  return POST(new Request("http://localhost/api/chart", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  }));
}

describe("POST /api/chart", () => {
  it("returns a Swiss-mode natal chart with interpretations", async () => {
    const res = await post({
      kind: "natal",
      person: { date: { d: 15, m: 5, y: 1990 }, time: { h: 14, m: 30 }, lat: 41.0082, lon: 28.9784, tz: "UTC" },
    });
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.model.meta.ephemeris).toBe("swiss");
    expect(data.model.points).toHaveLength(14);
    expect(data.interpretations.length).toBeGreaterThan(0);
  });

  it("rejects an invalid date with a 400 + Turkish error", async () => {
    const res = await post({
      kind: "natal",
      person: { date: { d: 99, m: 99, y: 1700 }, lat: 41, lon: 29 },
    });
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(typeof data.error).toBe("string");
    expect(data.error.length).toBeGreaterThan(0);
  });

  it("rejects out-of-range coordinates", async () => {
    const res = await post({
      kind: "natal",
      person: { date: { d: 1, m: 1, y: 2000 }, lat: 999, lon: 999 },
    });
    expect(res.status).toBe(400);
  });

  it("returns a synastry bi-wheel with inter-aspects", async () => {
    const res = await post({
      kind: "synastry",
      personA: { date: { d: 15, m: 5, y: 1990 }, time: { h: 14, m: 30 }, lat: 41.0082, lon: 28.9784, tz: "UTC" },
      personB: { date: { d: 3, m: 11, y: 1988 }, time: { h: 9, m: 15 }, lat: 39.93, lon: 32.86, tz: "UTC" },
    });
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.biwheel.inner.points).toHaveLength(14);
    expect(data.biwheel.outer.points).toHaveLength(14);
    expect(Array.isArray(data.biwheel.interAspects)).toBe(true);
  });

  it("rejects malformed JSON", async () => {
    const res = await POST(new Request("http://localhost/api/chart", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: "not json",
    }));
    expect(res.status).toBe(400);
  });
});
