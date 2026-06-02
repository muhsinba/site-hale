import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import SubHeader from "@/components/SubHeader";

export const metadata: Metadata = {
  title: "Birliktelik Haritası — Astrolojik Bakış | Hale Bayramoğlu",
  description:
    "İki kişinin doğum haritasını birlikte inceleyerek ilişkinizdeki uyum, çekim ve gelişim alanlarını keşfedin.",
};

export default function BirliktelikHaritasiPage() {
  return (
    <>
      <SubHeader />

      <main className="bg-cream">
        <section className="mx-auto max-w-3xl px-6 pt-10 pb-4 text-center md:pt-14">
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-gold">
            Harita Analizi
          </p>
          <h1 className="text-4xl md:text-6xl">Birliktelik Haritası</h1>
        </section>

        <section className="mx-auto max-w-3xl px-6 pb-6">
          <p className="text-lg leading-relaxed text-plum/80">
            Birliktelik Haritası, iki kişinin doğum haritalarını birlikte
            inceleyerek aralarındaki bağın dinamiklerini anlamayı amaçlar.
            İlişkinizdeki uyum alanlarını, birbirinizi besleyen yönleri ve
            nazikçe çalışılabilecek konuları aydınlatır.
          </p>
        </section>

        <section className="mx-auto max-w-3xl px-6 py-5">
          <h2 className="text-3xl text-plum">Neler Öğrenirsiniz?</h2>
          <ul className="mt-4 space-y-3 text-lg leading-relaxed text-plum/80">
            {[
              "İki harita arasındaki uyum ve çekim alanları",
              "İletişim, duygusal ihtiyaçlar ve değerlerdeki örtüşmeler",
              "Olası gerilim noktaları ve bunlarla nazikçe çalışma yolları",
              "İlişkinizi daha derin anlamak için farkındalık önerileri",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden className="text-gold">
                  ☌
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mx-auto max-w-3xl px-6 py-5">
          <h2 className="text-3xl text-plum">Nasıl Hazırlanır?</h2>
          <p className="mt-4 text-lg leading-relaxed text-plum/80">
            Her iki kişinin de doğum tarihi, mümkün olduğunca net doğum saati ve
            doğum yeri gereklidir. Saatler tam bilinmiyorsa yaklaşık değerlerle
            de anlamlı bir okuma yapılabilir.
          </p>
        </section>

        <section className="mx-auto max-w-3xl px-6 py-5">
          <p className="rounded-2xl bg-cream-deep px-5 py-4 text-sm leading-relaxed text-plum/70">
            Astrolojik analizler; kişisel farkındalık ve içsel keşfe yönelik
            bütünsel çalışmalardır. Tıbbi, psikolojik, hukuki veya finansal
            tavsiyenin yerine geçmez.
          </p>
        </section>

        <section className="mx-auto max-w-3xl px-6 py-10 text-center">
          <h2 className="text-3xl text-plum">Bağınızı birlikte keşfedelim</h2>
          <p className="mt-4 text-lg leading-relaxed text-plum/75">
            İlişkinize gökyüzünün diliyle nazik bir bakış atın. ✨
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
