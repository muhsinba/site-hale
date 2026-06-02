import type { Point, Aspect } from "@/lib/astro/model";
import type { PlanetKey } from "@/lib/astro/signs";

const CAT_COLOR: Record<Aspect["category"], string> = {
  hard: "text-rose", soft: "text-sky-600", neutral: "text-plum/60",
};

function key(a: PlanetKey, b: PlanetKey) {
  return [a, b].sort().join("-");
}

// Triangular aspectarian: each pair of points shows its aspect glyph (colored by
// category) with the orb on hover. Mirrors SolarFire's aspect grid.
export default function AspectGrid({ points, aspects }: { points: Point[]; aspects: Aspect[] }) {
  const map = new Map<string, Aspect>();
  for (const a of aspects) map.set(key(a.a, a.b), a);

  return (
    <div className="overflow-x-auto">
      <table className="border-separate border-spacing-0 text-center">
        <tbody>
          {points.map((row, i) => (
            <tr key={row.key}>
              {points.slice(0, i).map((col) => {
                const asp = map.get(key(row.key, col.key));
                return (
                  <td
                    key={col.key}
                    className="h-7 w-7 border border-plum/10 text-base"
                    title={asp ? `${row.name} – ${col.name}: ${asp.orb}°${asp.applying ? " (yaklaşan)" : " (uzaklaşan)"}` : undefined}
                  >
                    {asp ? <span className={CAT_COLOR[asp.category]}>{asp.glyph}</span> : ""}
                  </td>
                );
              })}
              <td className="h-7 w-7 border border-plum/15 bg-cream-deep text-base text-purple" title={row.name}>
                {row.glyph}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
