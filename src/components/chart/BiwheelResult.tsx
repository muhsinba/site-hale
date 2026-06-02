"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import { buildBiwheelSvg } from "@/lib/charts/biwheel";
import type { BiwheelModel } from "@/lib/astro/model";
import PlanetTable from "./PlanetTable";
import InterAspectList from "./InterAspectList";

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
  biwheel: BiwheelModel;
  innerLabel: string;
  outerLabel: string;
  ctaLocation: string;
  ariaLabel?: string;
};

// Two-ring result: bi-wheel drawing + inter-aspect grid + both planet tables.
// Shared by the transit (natal+transit) view and synastry.
export default function BiwheelResult({ biwheel, innerLabel, outerLabel, ctaLocation, ariaLabel }: Props) {
  const svg = buildBiwheelSvg(biwheel, { ariaLabel });

  return (
    <div className="mt-8 space-y-6">
      <div className="mx-auto max-w-[560px]" dangerouslySetInnerHTML={{ __html: svg }} />

      <p className="text-center text-sm text-plum/60">
        İç çark: <span className="font-medium text-purple">{innerLabel}</span> · Dış çark:{" "}
        <span className="font-medium text-purple">{outerLabel}</span>
      </p>

      <Section title="Karşılıklı Açılar">
        <InterAspectList aspects={biwheel.interAspects} aLabel={innerLabel} bLabel={outerLabel} />
      </Section>

      <div className="grid gap-6 md:grid-cols-2">
        <Section title={`${innerLabel} — Gezegenler`}><PlanetTable points={biwheel.inner.points} /></Section>
        <Section title={`${outerLabel} — Gezegenler`}><PlanetTable points={biwheel.outer.points} /></Section>
      </div>

      <p className="mx-auto max-w-xl text-center text-sm font-bold leading-relaxed text-red-600">
        Bu harita otomatik bir özettir. Karşılaştırmanın derinlemesine ve kişiye özel
        yorumu için bir seans alabilirsiniz.
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
