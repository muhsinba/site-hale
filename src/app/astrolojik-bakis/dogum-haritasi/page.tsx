import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import SubHeader from "@/components/SubHeader";
import BirthChartForm from "@/components/BirthChartForm";

export const metadata: Metadata = {
  title: "Doğum Haritası — Astrolojik Bakış | Hale Bayramoğlu",
  description:
    "Doğum haritanız üzerinden karakterinizi, güçlü yönlerinizi ve yaşam temalarınızı keşfedin. Kişiye özel bir astrolojik okuma.",
};

export default function DogumHaritasiPage() {
  return (
    <>
      <SubHeader />

      <main className="bg-cream">
        <section className="mx-auto max-w-3xl px-6 pt-10 pb-4 text-center md:pt-14">
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-gold">
            Harita Analizi
          </p>
          <h1 className="text-4xl md:text-6xl">Doğum Haritası</h1>
        </section>

        <section className="mx-auto max-w-3xl px-6 pb-6">
          <p className="text-lg leading-relaxed text-plum/80">
            Doğum haritası, doğduğunuz an gökyüzünün kişisel bir fotoğrafıdır.
            Gezegenlerin, burçların ve evlerin o andaki konumları; karakterinizi,
            doğal yeteneklerinizi ve yaşam temalarınızı anlamak için zengin bir
            harita sunar.
          </p>
        </section>

        <section className="mx-auto max-w-3xl px-6 py-5">
          <h2 className="text-3xl text-plum">Neler Öğrenirsiniz?</h2>
          <ul className="mt-4 space-y-3 text-lg leading-relaxed text-plum/80">
            {[
              "Karakteriniz, güçlü yönleriniz ve doğal yetenekleriniz",
              "Duygusal ihtiyaçlarınız ve içsel motivasyonlarınız",
              "Yaşamınızda tekrar eden temalar ve gelişim alanlarınız",
              "Kariyer, ilişkiler ve kişisel gelişime dair eğilimler",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden className="text-gold">
                  ☉
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mx-auto max-w-3xl px-6 py-5">
          <h2 className="text-3xl text-plum">Nasıl Hazırlanır?</h2>
          <p className="mt-4 text-lg leading-relaxed text-plum/80">
            Haritanızın çıkarılabilmesi için doğum tarihiniz, mümkün olduğunca
            net doğum saatiniz ve doğum yeriniz gereklidir. Doğum saatini tam
            bilmiyorsanız, yaklaşık bir saatle de anlamlı bir okuma yapılabilir.
          </p>

          {/* Interactive natal chart generator */}
          <div className="mt-6 rounded-3xl bg-green-300 p-6 md:p-8">
            <h3 className="text-xl text-plum">Haritanızı Şimdi Oluşturun</h3>
            <p className="mt-2 mb-5 text-plum/70">
              Bilgilerinizi girin, doğum haritanızın çarkı anında oluşturulsun.
            </p>
            <BirthChartForm />
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-6 py-5">
          <p className="rounded-2xl bg-cream-deep px-5 py-4 text-sm leading-relaxed text-plum/70">
            Astrolojik analizler; kişisel farkındalık ve içsel keşfe yönelik
            bütünsel çalışmalardır. Tıbbi, psikolojik, hukuki veya finansal
            tavsiyenin yerine geçmez.
          </p>
        </section>

        <section className="mx-auto max-w-3xl px-6 py-10 text-center">
          <h2 className="text-3xl text-plum">Haritanızı birlikte okuyalım</h2>
          <p className="mt-4 text-lg leading-relaxed text-plum/75">
            Kendi hikâyenize gökyüzünün diliyle nazik bir bakış atın. ✨
          </p>
          <Link
            href={`/?service=${encodeURIComponent("Astrolojik Bakış")}#book`}
            className="mt-8 inline-block rounded-full bg-gold px-8 py-3.5 font-medium text-plum shadow-lg transition-transform hover:scale-[1.03]"
          >
            Randevu Al
          </Link>
          <div className="mt-6">
            <Link
              href="/astrolojik-bakis"
              className="text-sm text-purple underline-offset-4 hover:underline"
            >
              ← Astrolojik Bakış’a dön
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
