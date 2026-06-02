"use client";

import { useEffect, useState } from "react";
import type { ChartModel, BiwheelModel, Interp } from "@/lib/astro/model";
import BirthDataFields from "@/components/chart/BirthDataFields";
import ChartResult from "@/components/chart/ChartResult";
import BiwheelResult from "@/components/chart/BiwheelResult";
import { buildPerson, defaultPersonFields, type PersonFields } from "@/components/chart/birthData";
import { trackEvent } from "@/lib/analytics";

const pad = (n: number) => String(n).padStart(2, "0");

type Result =
  | { kind: "single"; model: ChartModel; interpretations?: Interp[] }
  | { kind: "biwheel"; biwheel: BiwheelModel };

export default function StarChartForm() {
  const [transit, setTransit] = useState<PersonFields>(defaultPersonFields);
  const [compare, setCompare] = useState(false);
  const [natal, setNatal] = useState<PersonFields>(defaultPersonFields);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  // Prefill the transit moment with "now" after mount (client-only — avoids a
  // hydration mismatch).
  useEffect(() => {
    const now = new Date();
    // Client-only prefill (intentional): keeps SSR output empty to avoid a hydration
    // mismatch, then fills "now" on the client.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTransit((t) => ({
      ...t,
      date: `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()}`,
      time: `${pad(now.getHours())}:${pad(now.getMinutes())}`,
    }));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const t = buildPerson(transit);
    if (!t.ok) { setError(t.error); return; }

    let payload: Record<string, unknown> = { kind: "transit", transit: t.person };
    if (compare) {
      const n = buildPerson(natal);
      if (!n.ok) { setError(n.error); return; }
      payload = { kind: "transit", transit: t.person, natal: n.person, biwheel: true };
    }

    setLoading(true);
    try {
      const res = await fetch("/api/chart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Harita oluşturulamadı."); return; }
      if (data.biwheel) setResult({ kind: "biwheel", biwheel: data.biwheel });
      else setResult({ kind: "single", model: data.model, interpretations: data.interpretations });
      trackEvent("star_chart_generated", { service: "Astrolojik Bakış", compare });
    } catch {
      setError("Harita oluşturulurken bir sorun oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <BirthDataFields value={transit} onChange={setTransit} idPrefix="sc" />

        <label className="flex items-center gap-2 text-sm text-plum/80">
          <input
            type="checkbox"
            checked={compare}
            onChange={(e) => setCompare(e.target.checked)}
            className="h-4 w-4 accent-gold"
          />
          Doğum haritamla karşılaştır (çift çark)
        </label>

        {compare && (
          <div className="rounded-2xl bg-white/60 p-4 ring-1 ring-plum/10">
            <p className="mb-3 text-sm font-medium text-plum/70">Doğum bilgileriniz</p>
            <BirthDataFields value={natal} onChange={setNatal} idPrefix="sc-natal" />
          </div>
        )}

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-gold px-8 py-3.5 font-medium text-plum shadow-lg transition-transform hover:scale-[1.03] disabled:opacity-60"
          >
            {loading ? "Oluşturuluyor…" : "Gökyüzünü Görüntüle"}
          </button>
        </div>
      </form>

      {error && <p className="mt-4 rounded-2xl bg-rose/15 p-3 text-sm text-rose">{error}</p>}

      {result?.kind === "single" && (
        <ChartResult
          model={result.model}
          interpretations={result.interpretations}
          ctaLocation="star_chart_result"
          svgAriaLabel="Yıldız haritası çarkı"
        />
      )}
      {result?.kind === "biwheel" && (
        <BiwheelResult
          biwheel={result.biwheel}
          innerLabel="Doğum"
          outerLabel="Transit"
          ctaLocation="star_chart_biwheel_result"
          ariaLabel="Doğum ve transit çift çark"
        />
      )}
    </div>
  );
}
