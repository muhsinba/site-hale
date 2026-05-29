import { prisma } from "@/lib/prisma";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";
import RevealInit from "@/components/RevealInit";

// Always read fresh data (bookings/services may change).
export const dynamic = "force-dynamic";

export default async function Home() {
  const [services, testimonials] = await Promise.all([
    prisma.service.findMany({
      where: { active: true },
      orderBy: { order: "asc" },
    }),
    prisma.testimonial.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    }),
  ]);

  const serviceNames = services.map((s) => s.title);

  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <Services services={services} />
        <Testimonials testimonials={testimonials} />

        {/* Booking */}
        <section
          id="book"
          className="bg-gradient-to-b from-cream-deep to-cream py-24 md:py-32"
        >
          <div className="mx-auto max-w-6xl px-6">
            <div className="reveal mx-auto mb-12 max-w-2xl text-center">
              <p className="mb-3 text-sm uppercase tracking-[0.2em] text-gold">
                Yolculuğunuza Başlayın
              </p>
              <h2 className="text-4xl md:text-5xl">Seans talep edin</h2>
              <p className="mt-5 text-lg leading-relaxed text-plum/75">
                Kendinizden ve ne aradığınızdan kısaca bahsedin. Randevunuzu
                onaylamak için sizinle bizzat iletişime geçeceğim.
              </p>
            </div>
            <BookingForm services={serviceNames} />
          </div>
        </section>
      </main>
      <Footer />
      <RevealInit />
    </>
  );
}
