"use client";

import { useState } from "react";
import type { ChartModel, Interp } from "@/lib/astro/model";
import BirthDataFields from "@/components/chart/BirthDataFields";
import ChartResult from "@/components/chart/ChartResult";
import { buildPerson, defaultPersonFields, type PersonFields } from "@/components/chart/birthData";
import { trackEvent } from "@/lib/analytics";

type ApiResult = { model: ChartModel; interpretations?: Interp[] };

export default function BirthChartForm() {
  const [fields, setFields] = useState<PersonFields>(defaultPersonFields);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<ApiResult | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const built = buildPerson(fields);
    if (!built.ok) { setError(built.error); return; }

    setLoading(true);
    try {
      const res = await fetch("/api/chart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "natal", person: built.person }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Harita oluşturulamadı."); return; }
      setResult({ model: data.model, interpretations: data.interpretations });
      trackEvent("natal_chart_generated", { service: "Astrolojik Bakış" });
    } catch {
      setError("Harita oluşturulurken bir sorun oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <BirthDataFields value={fields} onChange={setFields} idPrefix="bc" />
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-gold px-8 py-3.5 font-medium text-plum shadow-lg transition-transform hover:scale-[1.03] disabled:opacity-60"
          >
            {loading ? "Oluşturuluyor…" : "Haritamı Oluştur"}
          </button>
        </div>
      </form>

      {error && <p className="mt-4 rounded-2xl bg-rose/15 p-3 text-sm text-rose">{error}</p>}

      {result && (
        <ChartResult
          model={result.model}
          interpretations={result.interpretations}
          ctaLocation="natal_chart_result"
          svgAriaLabel="Doğum haritası çarkı"
        />
      )}
    </div>
  );
}
