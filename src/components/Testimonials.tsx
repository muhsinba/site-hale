import type { Testimonial } from "@prisma/client";
import TestimonialsSlider from "./TestimonialsSlider";

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
            Dönüşüm Hikayeleri
          </p>
          <h2 className="text-4xl md:text-5xl">Danışanlar ne diyor</h2>
        </div>

        <TestimonialsSlider testimonials={testimonials} />
      </div>
    </section>
  );
}
