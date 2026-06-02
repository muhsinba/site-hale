"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import { buildWheelSvg } from "@/lib/charts/wheel";
import type { ChartModel, Interp } from "@/lib/astro/model";
import PlanetTable from "./PlanetTable";
import HouseCuspsTable from "./HouseCuspsTable";
import DignitiesTable from "./DignitiesTable";
import AspectGrid from "./AspectGrid";
import BalancePanel from "./BalancePanel";
import InterpretationPanel from "./InterpretationPanel";

const card = "rounded-3xl bg-white/70 p-5 md:p-6 ring-1 ring-plum/10";
const cardTitle = "mb-4 text-lg font-medium text-plum";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className={card}>
      <h3 className={cardTitle}>{title}</h3>
      {children}
    </div>
  );
}

type Props = {
  model: ChartModel;
  interpretations?: Interp[];
  ctaLocation: string;
  svgAriaLabel?: string;
};

export default function ChartResult({ model, interpretations = [], ctaLocation, svgAriaLabel }: Props) {
  const svg = buildWheelSvg(model, { ariaLabel: svgAriaLabel });
  const asc = model.cusps.length ? model.cusps[0].sign : null;
  const sun = model.points.find((p) => p.key === "sun");
  const moon = model.points.find((p) => p.key === "moon");

  return (
    <div className="mt-8 space-y-6">
      {/* Wheel */}
      <div className="mx-auto max-w-[560px]" dangerouslySetInnerHTML={{ __html: svg }} />

      {/* Summary line */}
      <p className="text-center text-lg text-plum">
        {sun && <>Güneş <span className="font-medium text-purple">{sun.sign}</span></>}
        {moon && <> · Ay <span className="font-medium text-purple">{moon.sign}</span></>}
        {asc && <> · Yükselen <span className="font-medium text-purple">{asc}</span></>}
      </p>
      {model.meta.approxTime && (
        <p className="-mt-3 text-center text-sm text-plum/50">
          Doğum saati girilmediği için öğlen (12:00) varsayıldı; ev ve yükselen bilgileri verilmedi.
        </p>
      )}
      {model.meta.ephemeris === "moshier" && (
        <p className="-mt-3 text-center text-sm text-plum/50">
          (Yüksek hassasiyetli efemeris verisi yüklenemedi; Chiron hariç tutuldu.)
        </p>
      )}

      {/* Tables */}
      <Section title="Gezegen Konumları"><PlanetTable points={model.points} /></Section>

      <div className="grid gap-6 md:grid-cols-2">
        <Section title="Açılar (Aspektler)"><AspectGrid points={model.points} aspects={model.aspects} /></Section>
        <Section title="Element &amp; Nitelik Dengesi"><BalancePanel balance={model.balance} /></Section>
      </div>

      {model.cusps.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2">
          <Section title="Ev Başlangıçları"><HouseCuspsTable cusps={model.cusps} /></Section>
          <Section title="Asli Soyluluklar (Dignite)"><DignitiesTable dignities={model.dignities} /></Section>
        </div>
      )}
      {model.cusps.length === 0 && (
        <Section title="Asli Soyluluklar (Dignite)"><DignitiesTable dignities={model.dignities} /></Section>
      )}

      {interpretations.length > 0 && (
        <Section title="Harita Yorumu"><InterpretationPanel items={interpretations} /></Section>
      )}

      <p className="mx-auto max-w-xl text-center text-sm font-bold leading-relaxed text-red-600">
        Bu harita, gezegen konumlarına dayalı otomatik bir özettir. Haritanızın
        derinlemesine ve kişiye özel yorumu için bir seans alabilirsiniz.
      </p>

      <div className="text-center">
        <Link
          href={`/?service=${encodeURIComponent("Astrolojik Bakış")}#book`}
          onClick={() => trackEvent("randevu_click", { location: ctaLocation, service: "Astrolojik Bakış" })}
          className="inline-block rounded-full bg-gold px-8 py-3.5 font-medium text-plum shadow-lg transition-transform hover:scale-[1.03]"
        >
          Randevu Al
        </Link>
      </div>
    </div>
  );
}
