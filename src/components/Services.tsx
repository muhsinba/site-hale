import type { Service } from "@prisma/client";

function formatDuration(min: number) {
  return min >= 60 && min % 60 === 0
    ? `${min / 60} hr`
    : min > 60
      ? `${Math.floor(min / 60)} hr ${min % 60} min`
      : `${min} min`;
}

export default function Services({ services }: { services: Service[] }) {
  return (
    <section id="services" className="bg-cream-deep py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="reveal mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-gold">
            What I Offer
          </p>
          <h2 className="text-4xl md:text-5xl">Services &amp; Pricing</h2>
          <p className="mt-5 text-lg leading-relaxed text-plum/75">
            Each offering is a personalized path toward restoration. Not sure
            which is right for you?{" "}
            <a href="#contact" className="text-purple underline-offset-4 hover:underline">
              Reach out
            </a>{" "}
            and we&apos;ll find it together.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <article
              key={s.id}
              className={`reveal group relative flex flex-col rounded-3xl border p-8 transition-all hover:-translate-y-1 hover:shadow-xl ${
                s.featured
                  ? "border-gold bg-gradient-to-b from-plum to-plum-soft text-cream shadow-lg"
                  : "border-plum/10 bg-cream"
              }`}
            >
              {s.featured && (
                <span className="absolute -top-3 left-8 rounded-full bg-gold px-4 py-1 text-xs font-medium uppercase tracking-wide text-plum">
                  Most Loved
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
              <div className="mt-6 flex items-baseline gap-2">
                <span
                  className={`font-serif text-3xl ${s.featured ? "text-gold-light" : "text-purple"}`}
                >
                  {s.priceLabel}
                </span>
                <span
                  className={`text-sm ${s.featured ? "text-cream/60" : "text-plum/50"}`}
                >
                  · {formatDuration(s.durationMin)}
                </span>
              </div>
              <a
                href="#book"
                className={`mt-6 text-sm font-medium transition-colors ${
                  s.featured
                    ? "text-gold-light hover:text-gold"
                    : "text-purple hover:text-plum"
                }`}
              >
                Book this →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
