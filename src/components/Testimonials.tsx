import type { Testimonial } from "@prisma/client";

export default function Testimonials({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="reveal mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-gold">
            Stories of Transformation
          </p>
          <h2 className="text-4xl md:text-5xl">What clients are saying</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.id}
              className="reveal flex flex-col rounded-3xl bg-cream-deep p-8 shadow-sm"
            >
              <span className="font-serif text-5xl leading-none text-gold/50">
                &ldquo;
              </span>
              <blockquote className="-mt-2 flex-1 text-lg italic leading-relaxed text-plum/80">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 text-sm font-medium uppercase tracking-wide text-purple">
                {t.author}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
