import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import SubHeader from "@/components/SubHeader";

export const metadata: Metadata = {
  title: "SCIO Quantum Biofeedback — Hale Bayramoğlu",
  description:
    "SCIO Quantum Biofeedback nedir, nasıl çalışır ve seans nasıl ilerler? Bedenin enerjetik tepkilerini ölçen, stresi dengeleyen bütünsel biofeedback yaklaşımını keşfedin.",
};

export default function ScioPage() {
  return (
    <>
      <SubHeader />

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

        {/* Biofeedback Nedir */}
        <section className="mx-auto max-w-3xl px-6 py-5">
          <h2 className="text-3xl text-plum">Biofeedback Nedir?</h2>
          <p className="mt-4 text-lg leading-relaxed text-plum/80">
            Biofeedback; kalp atış hızı, kas gerginliği, solunum, terleme, cilt
            sıcaklığı, kan basıncı ve hatta beyin dalgaları gibi normalde
            otomatik olarak gerçekleşen vücut fonksiyonlarını kontrol etmeyi
            öğrenmenizi amaçlayan bir yöntemdir. Bu fonksiyonları kontrol etmeyi
            öğrenerek sağlık durumunuzu iyileştirebilir, kronik ağrıları
            hafifletebilir, stresi azaltabilir veya fiziksel ve zihinsel
            performansınızı artırabilirsiniz (buna bazen zirve performans
            eğitimi de denir).
          </p>
          <p className="mt-4 text-lg leading-relaxed text-plum/80">
            Biofeedback eğitimi sırasında vücudunuza bağlanan sensörler; nabız,
            cilt sıcaklığı, kas tonusu, beyin dalgası örüntüleri veya diğer
            fizyolojik fonksiyonlardaki değişiklikleri algılar. Bu değişiklikler
            bir ses, yanıp sönen ışık veya ekrandaki görüntü değişimi şeklinde
            geri bildirim (feedback) oluşturur ve böylece fizyolojik değişimin
            gerçekleştiğini fark edersiniz. Zamanla, biofeedback terapistinizin
            yardımıyla, vücudunuzun otomatik işlevleri üzerinde bilinçli kontrol
            geliştirerek bu sinyalleri değiştirmeyi öğrenebilirsiniz.
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

        {/* Hangi amaçlarla kullanılır */}
        <section className="mx-auto max-w-3xl px-6 py-5">
          <h2 className="text-3xl text-plum">Hangi Amaçlarla Kullanılır?</h2>
          <p className="mt-4 text-lg leading-relaxed text-plum/80">
            Biofeedback birçok sağlık sorununun tedavisinde kullanılmış olsa da,
            bunların çoğu için bilimsel kanıtlar karışıktır. Bununla birlikte
            bazı alanlarda etkinliği daha güçlü şekilde desteklenmektedir.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-plum/80">
            Çok sayıda araştırma, biofeedback’in aşağıdaki durumlarda etkili
            olabileceğini göstermektedir:
          </p>
          <ul className="mt-4 space-y-3 text-lg leading-relaxed text-plum/80">
            {[
              "Migren ataklarını azaltabildiği",
              "Gerilim tipi baş ağrılarını hafifletebildiği",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden className="text-gold">
                  ✦
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-lg leading-relaxed text-plum/80">
            Ayrıca aşağıdaki durumlarda da etkili olabileceği bulunmuştur:
          </p>
          <ul className="mt-4 space-y-3 text-lg leading-relaxed text-plum/80">
            {[
              "Bazı idrar kaçırma (üriner inkontinans) türleri",
              "Dışkı kaçırma (fekal inkontinans)",
              "Aşırı kas kasılmalarına bağlı anal ağrı",
              "Anüs çevresindeki kasların işlev bozukluğuna bağlı kabızlık",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden>🌿</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Yardımcı olabileceği diğer durumlar */}
        <section className="mx-auto max-w-3xl px-6 py-5">
          <h2 className="text-3xl text-plum">
            Yardımcı Olabileceği Diğer Durumlar
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-plum/80">
            Biofeedback bazı kişilerde aşağıdaki rahatsızlıkların belirtilerini
            azaltmak amacıyla kullanılmıştır:
          </p>
          <ul className="mt-5 grid gap-x-6 gap-y-2 leading-relaxed text-plum/75 sm:grid-cols-2">
            {[
              "Kronik ağrı",
              "Migren",
              "Fibromiyalji",
              "Temporomandibular eklem (TMJ / çene eklemi) bozuklukları",
              "Sindirim sistemi rahatsızlıkları (özellikle kabızlık)",
              "İdrar ve dışkı kaçırma",
              "Yüksek tansiyon (hipertansiyon)",
              "Kalp ritim bozuklukları (aritmiler)",
              "Alkol dahil bağımlılıklar",
              "Epilepsi",
              "Felç ve bazı hareket bozuklukları",
              "Omurilik yaralanmaları",
              "Uyku bozuklukları",
              "Premenstrüel sendrom (PMS)",
              "Gece altını ıslatma (enürezis)",
              "Dikkat eksikliği bozukluğu (ADD)",
              "Dikkat eksikliği ve hiperaktivite bozukluğu (ADHD)",
              "Panik bozukluk",
              "Anksiyete bozuklukları",
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden className="text-gold">
                  ·
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
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

        {/* Seans öncesi hazırlık */}
        <section className="mx-auto max-w-3xl px-6 py-5">
          <h2 className="text-3xl text-plum">Seans Öncesi Hazırlık</h2>
          <p className="mt-4 text-lg leading-relaxed text-plum/80">
            Biofeedback uygulamasına başlamadan önce bazı hazırlıklar yararlı
            olabilir:
          </p>
          <ul className="mt-4 space-y-3 text-lg leading-relaxed text-plum/80">
            {[
              "Biofeedback hakkında okuyarak sürecin genel mantığını öğrenmek",
              "Tedavinin gerektirdiği zaman ve çabayı göstermeye istekli olmak",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden>🌿</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-lg leading-relaxed text-plum/80">
            Eğer doktorunuz sizi bir biofeedback terapistine yönlendirdiyse,
            terapistiniz tedaviye başlamadan önce mevcut sağlık durumunuz
            hakkında gerekli bilgileri doktorunuzdan alacaktır.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-plum/80">
            Doktor yönlendirmesi olmadan biofeedback denemek istiyorsanız,
            öncelikle doktorunuzla görüşmeniz önerilir. Böylece biofeedback’in
            sizin sağlık durumunuz için uygun olup olmadığı konusunda tıbbi
            görüş alabilirsiniz. Ayrıca doktorunuz kullandığınız tüm tedavi
            yöntemleri hakkında bilgi sahibi olur.
          </p>
        </section>

        {/* Görseller — free CC0 images (StockSnap). Replace with Hale's own
            photos anytime by dropping files into public/scio/. */}
        <section className="mx-auto max-w-4xl px-6 py-5">
          <h2 className="text-3xl text-plum">Görseller</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/scio/bio-feedback.jpg"
                alt="Biofeedback nasıl çalışır — beden sinyalleri ekranda geri bildirim olarak gösterilir"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/scio/scio-patient.jpg"
                alt="SCIO biofeedback seansı — bilek, ayak bileği ve baş bağlantılarıyla dinlenen danışan"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/scio/energy-light.jpg"
                alt="Avuç içine düşen ışık tayfı — enerji ve frekans"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/scio/session.jpg"
                alt="Sıcak ve sakin bir ortamda dinlenen bir kişi"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>

        {/* Video — original Türkçe slideshow explainer (public/scio/scio-explainer.mp4). */}
        <section className="mx-auto max-w-4xl px-6 py-5">
          <h2 className="text-3xl text-plum">Video</h2>
          <div className="mt-6 overflow-hidden rounded-2xl shadow-sm">
            <video
              controls
              preload="metadata"
              poster="/scio/scio-poster.jpg"
              className="aspect-video w-full bg-plum/5"
            >
              <source src="/scio/scio-explainer.mp4" type="video/mp4" />
              Tarayıcınız bu videoyu oynatamıyor.
            </video>
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
