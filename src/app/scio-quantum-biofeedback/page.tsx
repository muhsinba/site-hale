import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "SCIO Quantum Biofeedback — Hale Bayramoğlu",
  description:
    "SCIO Quantum Biofeedback nedir, nasıl çalışır ve seans nasıl ilerler? Bedenin enerjetik tepkilerini ölçen, stresi dengeleyen bütünsel biofeedback yaklaşımını keşfedin.",
};

export default function ScioPage() {
  return (
    <>
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-plum/10 bg-cream/90 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-gold text-xl">✦</span>
            <span className="font-serif text-xl text-plum">Hale Bayramoğlu</span>
          </Link>
          <Link
            href="/#book"
            className="rounded-full bg-gold px-5 py-2 text-sm font-medium text-plum transition-transform hover:scale-[1.03]"
          >
            Randevu Al
          </Link>
        </div>
      </header>

      <main className="bg-cream">
        {/* Hero */}
        <section className="mx-auto max-w-3xl px-6 pt-10 pb-4 text-center md:pt-14">
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-gold">
            Frekans Çalışması
          </p>
          <h1 className="text-4xl md:text-6xl">SCIO Quantum Biofeedback</h1>
        </section>

        {/* Intro */}
        <section className="mx-auto max-w-3xl px-6 pb-6">
          <p className="text-lg leading-relaxed text-plum/80">
            SCIO Quantum Biofeedback, bedenin enerjetik tepkilerini ölçen
            biyo-enerjetik bir geri bildirim (biofeedback) sistemidir. Cilt
            üzerine yerleştirilen nazik bağlantılar aracılığıyla beden ile cihaz
            arasında sürekli bir bilgi alışverişi kurulur; stresle ilişkili
            alanlar belirlenir ve bu alanlara yumuşak frekans çalışmalarıyla
            yanıt verilir. Amaç, bedenin kendi öz-düzenleme ve dengelenme
            kapasitesini nazikçe desteklemektir.
          </p>
        </section>

        {/* Nasıl Çalışır */}
        <section className="mx-auto max-w-3xl px-6 py-5">
          <h2 className="text-3xl text-plum">Nasıl Çalışır?</h2>
          <p className="mt-4 text-lg leading-relaxed text-plum/80">
            Cihaz, bedenin verdiği enerjetik tepkileri tarayarak stresle ilişkili
            alanları belirler ve bu alanlara nazik frekanslarla yanıt verir. Bu
            karşılıklı “geri bildirim” döngüsü, bedenin dengeye yönelme eğilimini
            destekler. Seans tamamen ağrısız ve gevşeticidir.
          </p>
        </section>

        {/* Seans nasıl ilerler */}
        <section className="mx-auto max-w-3xl px-6 py-5">
          <h2 className="text-3xl text-plum">Seans Nasıl İlerler?</h2>
          <ul className="mt-4 space-y-3 text-lg leading-relaxed text-plum/80">
            {[
              "Kısa bir görüşmeyle ihtiyaçlarınız ve hedefleriniz konuşulur.",
              "Bilek, ayak bileği ve baş bölgesine nazik bağlantılar yerleştirilir; işlem ağrısızdır.",
              "Cihaz, bedenin enerjetik tepkilerini tarar ve stresle ilişkili alanları belirler.",
              "Belirlenen alanlara nazik frekans çalışmaları uygulanır.",
              "Seans sonunda gözlemler paylaşılır ve size özel öneriler sunulur.",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden className="text-gold">
                  ✦
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Kimler için uygundur */}
        <section className="mx-auto max-w-3xl px-6 py-5">
          <h2 className="text-3xl text-plum">Kimler İçin Uygundur?</h2>
          <ul className="mt-4 space-y-3 text-lg leading-relaxed text-plum/80">
            {[
              "Stres, gerginlik ve yorgunluk hissedenler",
              "Duygusal denge ve derin gevşeme arayanlar",
              "Bütünsel yaklaşımlarla kendine destek olmak isteyenler",
              "Her yaştan birey — nazik ve güvenli bir yöntemdir",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden>🌿</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ===================================================================
            GÖRSELLER (isteğe bağlı) — Görselleri public/scio/ klasörüne ekleyin,
            sonra dosyanın başına `import Image from "next/image";` ekleyip
            aşağıdaki kutuları <Image ... /> ile değiştirin.
            =================================================================== */}
        <section className="mx-auto max-w-4xl px-6 py-5">
          <h2 className="text-3xl text-plum">Görseller</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[1, 2].map((n) => (
              <div
                key={n}
                className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-dashed border-plum/25 bg-cream-deep text-plum/40"
              >
                Görsel {n} buraya gelecek
              </div>
            ))}
          </div>
        </section>

        {/* ===================================================================
            VIDEO (isteğe bağlı) — Kısa bir tanıtım videosu eklemek için bu kutuyu
            self-hosted bir <video> ya da YouTube embed ile değiştirin.
            =================================================================== */}
        <section className="mx-auto max-w-4xl px-6 py-5">
          <h2 className="text-3xl text-plum">Video</h2>
          <div className="mt-6 flex aspect-video items-center justify-center rounded-2xl border border-dashed border-plum/25 bg-cream-deep text-plum/40">
            Video buraya gelecek
          </div>
        </section>

        {/* Disclaimer */}
        <section className="mx-auto max-w-3xl px-6 py-5">
          <p className="rounded-2xl bg-cream-deep px-5 py-4 text-sm leading-relaxed text-plum/70">
            SCIO Quantum Biofeedback tamamlayıcı bir uygulamadır; tıbbi teşhis,
            tedavi veya doktor tavsiyesinin yerine geçmez. Sağlıkla ilgili
            endişeleriniz için lütfen bir sağlık uzmanına başvurun.
          </p>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-3xl px-6 py-10 text-center">
          <h2 className="text-3xl text-plum">Bir seans için hazır mısınız?</h2>
          <p className="mt-4 text-lg leading-relaxed text-plum/75">
            Bedeninizin dengesini nazikçe desteklemek için bir adım atın. ✨
          </p>
          <Link
            href="/#book"
            className="mt-8 inline-block rounded-full bg-gold px-8 py-3.5 font-medium text-plum shadow-lg transition-transform hover:scale-[1.03]"
          >
            Randevu Al
          </Link>
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
