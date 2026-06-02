import type { Cusp } from "@/lib/astro/model";
import { SIGN_GLYPHS } from "@/lib/astro/signs";

const ANGLE_LABEL: Record<number, string> = { 1: "ASC", 4: "IC", 7: "DSC", 10: "MC" };

// House cusps: 12 cusps with sign + degree°minute'. Angles (1/4/7/10) tagged.
export default function HouseCuspsTable({ cusps }: { cusps: Cusp[] }) {
  if (!cusps.length) return null;
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm text-plum/80">
        <thead>
          <tr className="border-b border-plum/15 text-xs uppercase tracking-wide text-plum/50">
            <th className="py-2 pr-3 font-medium">Ev</th>
            <th className="py-2 pr-3 font-medium">Burç</th>
            <th className="py-2 font-medium">Derece</th>
          </tr>
        </thead>
        <tbody>
          {cusps.map((c) => (
            <tr key={c.house} className="border-b border-plum/5">
              <td className="py-1.5 pr-3 whitespace-nowrap tabular-nums">
                {c.house}
                {ANGLE_LABEL[c.house] && <span className="ml-1.5 text-xs font-medium text-gold">{ANGLE_LABEL[c.house]}</span>}
              </td>
              <td className="py-1.5 pr-3 whitespace-nowrap">
                <span aria-hidden className="mr-1 text-purple">{SIGN_GLYPHS[c.signIndex]}</span>{c.sign}
              </td>
              <td className="py-1.5 tabular-nums">{c.deg}°{String(c.min).padStart(2, "0")}&apos;</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
