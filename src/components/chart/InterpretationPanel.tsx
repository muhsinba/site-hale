import type { Interp } from "@/lib/astro/model";

// Renders the selected canned-text interpretation paragraphs for a chart.
export default function InterpretationPanel({ items }: { items: Interp[] }) {
  if (!items.length) return null;
  return (
    <div className="space-y-5">
      {items.map((it, i) => (
        <div key={`${it.title}-${i}`}>
          <h4 className="text-base font-medium text-plum">{it.title}</h4>
          <p className="mt-1 leading-relaxed text-plum/75">{it.body}</p>
        </div>
      ))}
    </div>
  );
}
