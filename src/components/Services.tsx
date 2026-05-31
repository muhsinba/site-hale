import Link from "next/link";
import type { Service } from "@prisma/client";

// Services that have a dedicated detail page: slug -> route.
const detailPages: Record<string, string> = {
  "bach-flowers": "/bach-cicekleri",
  "scio-quantum-biofeedback": "/scio-quantum-biofeedback",
};

function formatDuration(min: number) {
  return min >= 60 && min % 60 === 0
    ? `${min / 60} saat`
    : min > 60
      ? `${Math.floor(min / 60)} saat ${min % 60} dk`
      : `${min} dk`;
}

export default function Services({ services }: { services: Service[] }) {
  return (
    <section id="services" className="bg-cream-deep py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="reveal mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-gold">
            Sunduklarım
          </p>
          <h2 className="text-4xl md:text-5xl">Çalışmalar</h2>
          <p className="mt-5 text-lg leading-relaxed text-plum/75">
            Her çalışma, yenilenmeye giden kişiye özel bir yoldur. Hangisinin
            size uygun olduğundan emin değil misiniz?{" "}
            <a href="#contact" className="text-purple underline-offset-4 hover:underline">
              Bize ulaşın
            </a>{" "}
            birlikte bulalım.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const detail = detailPages[s.slug];
            const href = detail ?? "#book";
            return (
              <Link
                key={s.id}
                href={href}
                className={`reveal group relative flex flex-col rounded-3xl border p-8 transition-all hover:-translate-y-1 hover:shadow-xl ${
                  s.featured
                    ? "border-gold bg-gradient-to-b from-plum to-plum-soft text-cream shadow-lg"
                    : "border-plum/10 bg-cream"
                }`}
              >
                {s.featured && (
                  <span className="absolute -top-3 left-8 rounded-full bg-gold px-4 py-1 text-xs font-medium uppercase tracking-wide text-plum">
                    En Sevilen
                  </span>
                )}
                <div
                  className={`text-3xl ${s.featured ? "text-gold-light" : "text-purple"}`}
                >
                  {s.icon}
                </div>
                <h3 className={`mt-4 text-2xl ${s.featured ? "text-cream" : "text-plum"}`}>
                  {s.title}
                </h3>
                <p
                  className={`mt-3 flex-1 leading-relaxed ${s.featured ? "text-cream/80" : "text-plum/70"}`}
                >
                  {s.description}
                </p>
                <div className="mt-6">
                  <span
                    className={`text-sm ${s.featured ? "text-cream/60" : "text-plum/50"}`}
                  >
                    {formatDuration(s.durationMin)}
                  </span>
                </div>
                <span
                  className={`mt-6 text-sm font-medium transition-colors ${
                    s.featured
                      ? "text-gold-light group-hover:text-gold"
                      : "text-purple group-hover:text-plum"
                  }`}
                >
                  {detail ? "Detayları gör →" : "Randevu al →"}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
