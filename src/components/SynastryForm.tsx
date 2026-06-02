"use client";

import { useState } from "react";
import type { BiwheelModel } from "@/lib/astro/model";
import BirthDataFields from "@/components/chart/BirthDataFields";
import BiwheelResult from "@/components/chart/BiwheelResult";
import { buildPerson, defaultPersonFields, type PersonFields } from "@/components/chart/birthData";
import { trackEvent } from "@/lib/analytics";

const input = "w-full rounded-xl border border-plum/15 bg-white px-4 py-3 text-plum outline-none focus:border-purple";
const label = "mb-1 block text-sm font-medium text-plum/80";

export default function SynastryForm() {
  const [nameA, setNameA] = useState("");
  const [nameB, setNameB] = useState("");
  const [a, setA] = useState<PersonFields>(defaultPersonFields);
  const [b, setB] = useState<PersonFields>(defaultPersonFields);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{ biwheel: BiwheelModel; labelA: string; labelB: string } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const pa = buildPerson(a, nameA || undefined);
    if (!pa.ok) { setError(`1. kişi: ${pa.error}`); return; }
    const pb = buildPerson(b, nameB || undefined);
    if (!pb.ok) { setError(`2. kişi: ${pb.error}`); return; }

    setLoading(true);
    try {
      const res = await fetch("/api/chart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "synastry", personA: pa.person, personB: pb.person }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Harita oluşturulamadı."); return; }
      setResult({
        biwheel: data.biwheel,
        labelA: nameA.trim() || "1. Kişi",
        labelB: nameB.trim() || "2. Kişi",
      });
      trackEvent("synastry_chart_generated", { service: "Astrolojik Bakış" });
    } catch {
      setError("Harita oluşturulurken bir sorun oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="grid gap-5">
        <div className="rounded-2xl bg-white/60 p-4 ring-1 ring-plum/10">
          <div className="mb-3">
            <label htmlFor="syn-name-a" className={label}>1. Kişi (isim — opsiyonel)</label>
            <input id="syn-name-a" type="text" value={nameA} onChange={(e) => setNameA(e.target.value)} placeholder="örn. Ayşe" className={input} />
          </div>
          <BirthDataFields value={a} onChange={setA} idPrefix="syn-a" />
        </div>

        <div className="rounded-2xl bg-white/60 p-4 ring-1 ring-plum/10">
          <div className="mb-3">
            <label htmlFor="syn-name-b" className={label}>2. Kişi (isim — opsiyonel)</label>
            <input id="syn-name-b" type="text" value={nameB} onChange={(e) => setNameB(e.target.value)} placeholder="örn. Mehmet" className={input} />
          </div>
          <BirthDataFields value={b} onChange={setB} idPrefix="syn-b" />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-gold px-8 py-3.5 font-medium text-plum shadow-lg transition-transform hover:scale-[1.03] disabled:opacity-60"
          >
            {loading ? "Oluşturuluyor…" : "Birliktelik Haritasını Oluştur"}
          </button>
        </div>
      </form>

      {error && <p className="mt-4 rounded-2xl bg-rose/15 p-3 text-sm text-rose">{error}</p>}

      {result && (
        <BiwheelResult
          biwheel={result.biwheel}
          innerLabel={result.labelA}
          outerLabel={result.labelB}
          ctaLocation="synastry_chart_result"
          ariaLabel="Birliktelik çift çark haritası"
        />
      )}
    </div>
  );
}
