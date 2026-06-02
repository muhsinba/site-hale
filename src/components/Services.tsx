import Image from "next/image";
import Link from "next/link";
import type { Service } from "@prisma/client";

// Services that have a dedicated detail page: slug -> route.
const detailPages: Record<string, string> = {
  "bach-flowers": "/bach-cicekleri",
  "scio-quantum-biofeedback": "/scio-quantum-biofeedback",
  "astrolojik-bakis": "/astrolojik-bakis",
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
          <h2 className="text-4xl md:text-5xl">Çalışmalarım</h2>
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
            // "Astrolojik Bakış" gets a distinct light-blue look + "En Aranan" badge.
            const isAstro = s.slug === "astrolojik-bakis";
            // "Bach Çiçekleri" gets a soft floral (rose) look + "En Popüler" badge.
            const isBach = s.slug === "bach-flowers";
            // The SCIO card shows the device image (white bg removed) below the text.
            const isScio = s.slug === "scio-quantum-biofeedback";
            return (
              <Link
                key={s.id}
                href={href}
                className={`reveal group relative flex flex-col rounded-3xl border p-8 transition-all hover:-translate-y-1 hover:shadow-xl ${
                  s.featured
                    ? "border-gold bg-gradient-to-b from-plum-soft to-purple text-cream shadow-lg"
                    : isAstro
                      ? "border-sky-200 bg-sky-50"
                      : isBach
                        ? "border-rose-300 bg-rose-100"
                        : "border-plum/10 bg-cream"
                }`}
              >
                {s.featured && (
                  <span className="absolute -top-3 left-8 rounded-full bg-gold px-4 py-1 text-xs font-medium uppercase tracking-wide text-plum">
                    En Sevilen
                  </span>
                )}
                {isAstro && (
                  <span className="absolute -top-3 left-8 rounded-full bg-sky-500 px-4 py-1 text-xs font-medium uppercase tracking-wide text-white">
                    En Aranan
                  </span>
                )}
                {isBach && (
                  <span className="absolute -top-3 left-8 rounded-full bg-rose-400 px-4 py-1 text-xs font-medium uppercase tracking-wide text-white">
                    En Popüler
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
                  className={`mt-3 leading-relaxed ${isScio || isAstro ? "" : "flex-1"} ${s.featured ? "text-cream/80" : "text-plum/70"}`}
                >
                  {s.description}
                </p>
                {isScio && (
                  <div className="relative mt-4 flex flex-1 items-end justify-center">
                    {/* Soft light halo lifts the device off the dark plum so its
                        light top edge stays visible. */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-x-6 bottom-1 top-4 rounded-[50%] bg-cream/25 blur-2xl"
                    />
                    <Image
                      src="/scio/scio-device.png"
                      alt="SCIO Quantum Biofeedback cihazı"
                      width={960}
                      height={540}
                      className="relative h-auto w-full max-w-[253px]"
                    />
                  </div>
                )}
                {isAstro && (
                  <div className="mt-4 overflow-hidden rounded-xl">
                    <Image
                      src="/astro/horoscope.png"
                      alt="Güneş, ay evreleri ve takımyıldızlardan oluşan gök illüstrasyonu"
                      width={1000}
                      height={650}
                      className="h-auto w-full"
                    />
                  </div>
                )}
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
