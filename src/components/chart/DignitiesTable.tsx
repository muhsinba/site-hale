import type { Dignity } from "@/lib/astro/model";
import { PLANET_GLYPHS, PLANET_TR, type PlanetKey } from "@/lib/astro/signs";

// Dignities are only meaningful for the traditional + modern planets.
const SHOWN: PlanetKey[] = [
  "sun", "moon", "mercury", "venus", "mars", "jupiter", "saturn", "uranus", "neptune", "pluto",
];

function mark(on: boolean) {
  return on ? <span className="text-gold">●</span> : <span className="text-plum/15">·</span>;
}

// Essential dignities grid (rulership / exaltation / triplicity / detriment / fall) + score.
export default function DignitiesTable({ dignities }: { dignities: Dignity[] }) {
  const rows = dignities.filter((d) => SHOWN.includes(d.key));
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm text-plum/80">
        <thead>
          <tr className="border-b border-plum/15 text-xs uppercase tracking-wide text-plum/50">
            <th className="py-2 pr-3 font-medium">Gezegen</th>
            <th className="py-2 pr-2 text-center font-medium" title="Yönetici">Yön.</th>
            <th className="py-2 pr-2 text-center font-medium" title="Yücelme">Yüc.</th>
            <th className="py-2 pr-2 text-center font-medium" title="Üçgenlik">Üçg.</th>
            <th className="py-2 pr-2 text-center font-medium" title="Düşüş (Zarar)">Zar.</th>
            <th className="py-2 pr-2 text-center font-medium" title="Düşüş">Düş.</th>
            <th className="py-2 text-right font-medium">Puan</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((d) => (
            <tr key={d.key} className="border-b border-plum/5">
              <td className="py-1.5 pr-3 whitespace-nowrap">
                <span aria-hidden className="mr-1.5 text-purple">{PLANET_GLYPHS[d.key]}</span>{PLANET_TR[d.key]}
              </td>
              <td className="py-1.5 pr-2 text-center">{mark(d.ruler)}</td>
              <td className="py-1.5 pr-2 text-center">{mark(d.exalt)}</td>
              <td className="py-1.5 pr-2 text-center">{mark(d.triplicity)}</td>
              <td className="py-1.5 pr-2 text-center">{mark(d.detriment)}</td>
              <td className="py-1.5 pr-2 text-center">{mark(d.fall)}</td>
              <td className={`py-1.5 text-right tabular-nums font-medium ${d.score > 0 ? "text-emerald-600" : d.score < 0 ? "text-rose" : "text-plum/40"}`}>
                {d.score > 0 ? `+${d.score}` : d.score}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
