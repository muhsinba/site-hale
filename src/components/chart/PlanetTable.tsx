import type { Point } from "@/lib/astro/model";
import { SIGN_GLYPHS } from "@/lib/astro/signs";

// Planet position grid: planet, sign, degree°minute', house, retrograde.
export default function PlanetTable({ points }: { points: Point[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm text-plum/80">
        <thead>
          <tr className="border-b border-plum/15 text-xs uppercase tracking-wide text-plum/50">
            <th className="py-2 pr-3 font-medium">Gezegen</th>
            <th className="py-2 pr-3 font-medium">Burç</th>
            <th className="py-2 pr-3 font-medium">Derece</th>
            <th className="py-2 pr-3 font-medium">Ev</th>
            <th className="py-2 font-medium">Durum</th>
          </tr>
        </thead>
        <tbody>
          {points.map((p) => (
            <tr key={p.key} className="border-b border-plum/5">
              <td className="py-1.5 pr-3 whitespace-nowrap">
                <span aria-hidden className="mr-1.5 text-purple">{p.glyph}</span>{p.name}
              </td>
              <td className="py-1.5 pr-3 whitespace-nowrap">
                <span aria-hidden className="mr-1 text-purple">{SIGN_GLYPHS[p.signIndex]}</span>{p.sign}
              </td>
              <td className="py-1.5 pr-3 tabular-nums">{p.deg}°{String(p.min).padStart(2, "0")}&apos;</td>
              <td className="py-1.5 pr-3 tabular-nums">{p.house ? p.house : "—"}</td>
              <td className="py-1.5 text-rose">{p.retro ? "℞ Geri" : ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
