import type { Aspect } from "@/lib/astro/model";
import { PLANET_GLYPHS, PLANET_TR } from "@/lib/astro/signs";

const CAT_COLOR: Record<Aspect["category"], string> = {
  hard: "text-rose", soft: "text-sky-600", neutral: "text-plum/60",
};

const ASPECT_TR: Record<Aspect["type"], string> = {
  conjunction: "Kavuşum", sextile: "Altmışlık", square: "Kare", trine: "Üçgen", opposition: "Karşıt",
};

// Inter-chart aspects (A = inner chart, B = outer chart). `aLabel`/`bLabel` name the two
// people/charts (e.g. "Natal" / "Transit", or two partners' names).
export default function InterAspectList({
  aspects, aLabel, bLabel,
}: { aspects: Aspect[]; aLabel: string; bLabel: string }) {
  if (!aspects.length) return <p className="text-sm text-plum/60">Belirgin bir açı bulunamadı.</p>;
  const sorted = [...aspects].sort((x, y) => x.orb - y.orb);
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm text-plum/80">
        <thead>
          <tr className="border-b border-plum/15 text-xs uppercase tracking-wide text-plum/50">
            <th className="py-2 pr-3 font-medium">{aLabel}</th>
            <th className="py-2 pr-3 text-center font-medium">Açı</th>
            <th className="py-2 pr-3 font-medium">{bLabel}</th>
            <th className="py-2 font-medium">Orb</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((a, i) => (
            <tr key={`${a.a}-${a.b}-${a.type}-${i}`} className="border-b border-plum/5">
              <td className="py-1.5 pr-3 whitespace-nowrap">
                <span aria-hidden className="mr-1.5 text-purple">{PLANET_GLYPHS[a.a]}</span>{PLANET_TR[a.a]}
              </td>
              <td className="py-1.5 pr-3 text-center whitespace-nowrap">
                <span className={`mr-1 text-base ${CAT_COLOR[a.category]}`}>{a.glyph}</span>
                <span className="text-xs text-plum/50">{ASPECT_TR[a.type]}</span>
              </td>
              <td className="py-1.5 pr-3 whitespace-nowrap">
                <span aria-hidden className="mr-1.5 text-purple">{PLANET_GLYPHS[a.b]}</span>{PLANET_TR[a.b]}
              </td>
              <td className="py-1.5 tabular-nums">{a.orb}°{a.applying ? " ↘" : " ↗"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
