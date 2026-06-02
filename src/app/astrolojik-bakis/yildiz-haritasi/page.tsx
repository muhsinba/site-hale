import type { Metadata } from "next";
import Link from "next/link";
import TrackedLink from "@/components/TrackedLink";
import Footer from "@/components/Footer";
import SubHeader from "@/components/SubHeader";
import StarChartForm from "@/components/StarChartForm";

export const metadata: Metadata = {
  title: "Yıldız Haritası — Astrolojik Bakış | Hale Bayramoğlu",
  description:
    "Gökyüzünün güncel hareketlerinin doğum haritanıza etkisini ve önümüzdeki döneme dair temaları keşfedin.",
};

export default function YildizHaritasiPage() {
  return (
    <>
      <SubHeader />

      <main className="bg-cream">
        <section className="mx-auto max-w-3xl px-6 pt-10 pb-4 text-center md:pt-14">
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-gold">
            Harita Analizi
          </p>
          <h1 className="text-4xl md:text-6xl">Yıldız Haritası</h1>
        </section>

        <section className="mx-auto max-w-3xl px-6 pb-6">
          <p className="text-lg leading-relaxed text-plum/80">
            Yıldız Haritası, gökyüzünün güncel hareketlerinin doğum haritanızla
            kurduğu ilişkiyi inceler. Hangi temaların öne çıktığını, hangi
            dönemlerin sizi desteklediğini ve nelere nazikçe dikkat etmenin
            yararlı olacağını birlikte keşfederiz.
          </p>
        </section>

        <section className="mx-auto max-w-3xl px-6 py-5">
          <h2 className="text-3xl text-plum">Neler Öğrenirsiniz?</h2>
          <ul className="mt-4 space-y-3 text-lg leading-relaxed text-plum/80">
            {[
              "Önümüzdeki döneme dair genel atmosfer ve öne çıkan temalar",
              "Sizi destekleyen ve zorlayabilecek olası etkiler",
              "Yeni başlangıçlar ve önemli kararlar için elverişli zamanlamalar",
              "İçsel farkındalığınızı güçlendirecek nazik öneriler",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden className="text-gold">
                  ✶
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mx-auto max-w-3xl px-6 py-5">
          <h2 className="text-3xl text-plum">Nasıl Hazırlanır?</h2>
          <p className="mt-4 text-lg leading-relaxed text-plum/80">
            Doğum tarihiniz, mümkün olduğunca net doğum saatiniz ve doğum yeriniz
            gereklidir. Ayrıca üzerine konuşmak istediğiniz bir dönem ya da konu
            varsa, okumayı buna göre derinleştirebiliriz.
          </p>

          {/* Interactive current-sky (transit) chart generator */}
          <div className="mt-6 rounded-3xl bg-green-300 p-6 md:p-8">
            <h3 className="text-xl text-plum">Güncel Gökyüzünü Şimdi Görün</h3>
            <p className="mt-2 mb-5 text-plum/70">
              Konumunuzu seçin; o ana ait gökyüzü çarkı anında oluşsun. Dilerseniz
              farklı bir tarih girerek başka bir dönemin gökyüzüne de bakabilirsiniz.
            </p>
            <StarChartForm />
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
          <h2 className="text-3xl text-plum">Gökyüzünün rehberliğine kulak verin</h2>
          <p className="mt-4 text-lg leading-relaxed text-plum/75">
            Önünüzdeki döneme nazik bir farkındalıkla bakın. ✨
          </p>
          <TrackedLink
            href={`/?service=${encodeURIComponent("Astrolojik Bakış")}#book`}
            location="yildiz_page"
            service="Astrolojik Bakış"
            className="mt-8 inline-block rounded-full bg-gold px-8 py-3.5 font-medium text-plum shadow-lg transition-transform hover:scale-[1.03]"
          >
            Randevu Al
          </TrackedLink>
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
