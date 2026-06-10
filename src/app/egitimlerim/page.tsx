import type { Metadata } from "next";
import Link from "next/link";
import TrackedLink from "@/components/TrackedLink";
import Footer from "@/components/Footer";
import SubHeader from "@/components/SubHeader";

export const metadata: Metadata = {
  title: "Eğitimlerim — Holografik Beyin Teknikleri | Hale Bayramoğlu",
  description:
    "Holografik Beyin Teknikleri Eğitimi: sağlık, ilişkiler ve yaşamın her alanı için beyninizin gücünü keşfedin. Eğitim içeriği ve katılım bilgileri.",
};

const benefits = [
  "Beyninizin henüz kullanıma açmamış olduğunuz teknikleriyle tanışın!",
  "Hepimizde mevcut olan bu beyinsel güçleri hayatınızın içine çekin!",
  "Önünüzde yepyeni bir dünyanın kapıları açılsın!",
  "Evrensel “ana hologram”a bağlanın ve “holografik alan”a geçiş yapın!",
  "Evrenle aynı düzeyde titreşmeye başlayın!",
];

const curriculum = [
  "Holografik sağlık teknikleri giriş",
  "Hologram nedir?",
  "Holistik nedir?",
  "Soyutlanma odaklanma",
  "İmgeleme",
  "Fotoğrafik hafıza",
  "Durugörü",
  "Yüksek odaklanma",
  "Kapalı gözlerle görme, renkleri bilme",
  "5 duyu ile zihinde KLASÖRler açma, kayıt yapma, geri çağırma",
  "Bio ekran nedir, nasıl kurulur?",
  "Resimlerin fotografik hafıza ile ekrana taşınması ve geri çağırılması",
  "Antiaging",
  "İçsel hologramlar, organlarımız",
  "Vücut içinde gezinme, hastalıkların tespiti",
  "Kan, damar, kemik, böbrek, akciğer ve kök hücre çalışmaları",
  "Diabet, tiroit, fıtık, skolyoz çalışmaları",
  "Holistik operasyon",
  "Lenfatik drenaj",
  "Epifiz ve melatonin hormonu çalışması",
  "Kilo çalışması",
  "Bilinçaltı Radar ve Röntgen Görü",
  "Resimlerin organlara dönüşmesi",
  "Uzaktan değişim",
  "Delta birebir ve uzaktan uygulama",
];

export default function EgitimlerimPage() {
  return (
    <>
      <SubHeader />

      <main className="bg-cream">
        {/* Hero */}
        <section className="mx-auto max-w-3xl px-6 pt-10 pb-4 text-center md:pt-14">
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-gold">
            Eğitimlerim
          </p>
          <h1 className="text-4xl md:text-5xl">Holografik Beyin Teknikleri Eğitimi</h1>
        </section>

        {/* Intro / invitation */}
        <section className="mx-auto max-w-3xl px-6 pb-6">
          <p className="text-lg leading-relaxed text-plum/80">
            Koşullarınızı ve gerçekliğinizi değiştirecek gücün içinizde olduğunu
            biliyor musunuz?
          </p>
          <p className="mt-4 text-lg leading-relaxed text-plum/80">
            Sizi; sağlık, ilişkiler, para ve aklınıza gelen her konu için
            kullanabileceğiniz güçlü tekniklerle dolu muhteşem bir eğitime davet
            ediyoruz.
          </p>
        </section>

        {/* Intro video — self-hosted in public/egitim/ */}
        <section className="mx-auto max-w-4xl px-6 py-5">
          <video
            className="aspect-video w-full rounded-2xl bg-plum object-cover shadow-sm"
            controls
            preload="metadata"
            playsInline
          >
            <source src="/egitim/holografik-beyin.mp4" type="video/mp4" />
            Tarayıcınız bu videoyu oynatamıyor.
          </video>
        </section>

        {/* Benefits */}
        <section className="mx-auto max-w-3xl px-6 py-5">
          <h2 className="text-3xl text-plum">Holografik Beyin Teknikleri Eğitimi ile;</h2>
          <ul className="mt-5 space-y-3 text-lg leading-relaxed text-plum/80">
            {benefits.map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden className="text-gold">✦</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Curriculum */}
        <section className="mx-auto max-w-3xl px-6 py-5">
          <h2 className="text-3xl text-plum">Eğitim İçeriği</h2>
          <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {curriculum.map((item) => (
              <li key={item} className="flex gap-3 leading-relaxed text-plum/80">
                <span aria-hidden className="mt-1 text-sm text-gold">◆</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Closing highlight */}
        <section className="mx-auto max-w-3xl px-6 py-6">
          <p className="rounded-2xl bg-emerald-50 px-6 py-5 text-center text-lg font-medium leading-relaxed text-plum ring-1 ring-emerald-200">
            Bütün bunları herkese öğretebilen bir metodoloji hâline getiren
            Holografik Beyin Teknikleri eğitimi ile hayatınız sonsuza dek
            değişecek! ✨
          </p>
        </section>

        {/* Disclaimer */}
        <section className="mx-auto max-w-3xl px-6 py-5">
          <p className="rounded-2xl bg-cream-deep px-5 py-4 text-sm leading-relaxed text-plum/70">
            Bu eğitim ve teknikler; kişisel farkındalık ve bütünsel gelişim
            amaçlıdır. Tıbbi teşhis, tedavi veya uzman hekim tavsiyesinin yerine
            geçmez.
          </p>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-3xl px-6 py-10 text-center">
          <h2 className="text-3xl text-plum">Bu yolculuğa katılmak ister misiniz?</h2>
          <p className="mt-4 text-lg leading-relaxed text-plum/75">
            Eğitim tarihleri ve katılım detayları için bana ulaşın. ✨
          </p>
          <TrackedLink
            href={`/?service=${encodeURIComponent("Eğitimlerim")}#book`}
            location="egitim_page"
            service="Eğitimlerim"
            className="mt-8 inline-block rounded-full bg-gold px-8 py-3.5 font-medium text-plum shadow-lg transition-transform hover:scale-[1.03]"
          >
            Bilgi Alın
          </TrackedLink>
          <div className="mt-6">
            <Link
              href="/#services"
              className="text-sm text-purple underline-offset-4 hover:underline"
            >
              ← Tüm çalışmalara dön
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
