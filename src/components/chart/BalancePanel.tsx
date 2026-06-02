import type { Balance } from "@/lib/astro/model";
import { ELEMENT_TR, MODALITY_TR, type Element, type Modality } from "@/lib/astro/signs";

const ELEMENT_COLOR: Record<Element, string> = {
  fire: "bg-rose", earth: "bg-emerald-600", air: "bg-amber-400", water: "bg-sky-500",
};
const MODALITY_COLOR: Record<Modality, string> = {
  cardinal: "bg-purple", fixed: "bg-plum", mutable: "bg-gold",
};

function Row({ name, count, total, color }: { name: string; count: number; total: number; color: string }) {
  const pct = total ? (count / total) * 100 : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="w-16 shrink-0 text-sm text-plum/70">{name}</span>
      <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-plum/10">
        <div className={`h-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="w-5 text-right text-sm tabular-nums text-plum/60">{count}</span>
    </div>
  );
}

// Element + modality balance (counts the 10 planets).
export default function BalancePanel({ balance }: { balance: Balance }) {
  const elTotal = Object.values(balance.elements).reduce((a, b) => a + b, 0);
  const moTotal = Object.values(balance.modalities).reduce((a, b) => a + b, 0);
  const elements = Object.keys(balance.elements) as Element[];
  const modalities = Object.keys(balance.modalities) as Modality[];

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div>
        <h4 className="mb-3 text-sm font-medium uppercase tracking-wide text-plum/50">Elementler</h4>
        <div className="space-y-2">
          {elements.map((e) => (
            <Row key={e} name={ELEMENT_TR[e]} count={balance.elements[e]} total={elTotal} color={ELEMENT_COLOR[e]} />
          ))}
        </div>
      </div>
      <div>
        <h4 className="mb-3 text-sm font-medium uppercase tracking-wide text-plum/50">Nitelikler</h4>
        <div className="space-y-2">
          {modalities.map((m) => (
            <Row key={m} name={MODALITY_TR[m]} count={balance.modalities[m]} total={moTotal} color={MODALITY_COLOR[m]} />
          ))}
        </div>
      </div>
    </div>
  );
}
