// Chart computation endpoint. Runs the Swiss Ephemeris (WASM) server-side so the GPL
// binary + .se1 data never reach the browser; the client receives computed JSON only.
// One route, discriminated on `kind`. Transit bi-wheel + synastry land in later phases.

import { computeChart } from "@/lib/astro/computeChart";
import { interAspects } from "@/lib/astro/aspects";
import { getInterpretations } from "@/lib/interpretations";
import { parsePerson, type ChartRequest } from "./schema";

export const runtime = "nodejs"; // native-ish WASM + bundled data files
export const dynamic = "force-dynamic"; // computed per request, never cached

const SERVER_ERROR = "Harita hesaplanırken bir sorun oluştu. Lütfen bilgileri kontrol edip tekrar deneyin.";

export async function POST(request: Request) {
  let body: ChartRequest;
  try {
    body = (await request.json()) as ChartRequest;
  } catch {
    return Response.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  try {
    switch (body?.kind) {
      case "natal": {
        const p = parsePerson(body.person, "natal");
        if (!p.ok) return Response.json({ error: p.error }, { status: 400 });
        const model = await computeChart(p.value);
        return Response.json({ model, interpretations: getInterpretations(model) });
      }

      case "transit": {
        const t = parsePerson(body.transit, "transit");
        if (!t.ok) return Response.json({ error: t.error }, { status: 400 });
        const transit = await computeChart(t.value);

        // Optional bi-wheel: natal (inner) + transit (outer) with inter-aspects.
        if (body.biwheel && body.natal) {
          const n = parsePerson(body.natal, "natal");
          if (!n.ok) return Response.json({ error: n.error }, { status: 400 });
          const natal = await computeChart(n.value);
          return Response.json({
            biwheel: { inner: natal, outer: transit, interAspects: interAspects(natal.points, transit.points) },
          });
        }
        return Response.json({ model: transit, interpretations: getInterpretations(transit) });
      }

      case "synastry": {
        const a = parsePerson(body.personA, "synastry");
        const b = parsePerson(body.personB, "synastry");
        if (!a.ok) return Response.json({ error: a.error }, { status: 400 });
        if (!b.ok) return Response.json({ error: b.error }, { status: 400 });
        const inner = await computeChart(a.value);
        const outer = await computeChart(b.value);
        return Response.json({
          biwheel: { inner, outer, interAspects: interAspects(inner.points, outer.points) },
        });
      }

      default:
        return Response.json({ error: "Bilinmeyen harita türü." }, { status: 400 });
    }
  } catch (err) {
    console.error("Chart error:", err);
    return Response.json({ error: SERVER_ERROR }, { status: 500 });
  }
}
