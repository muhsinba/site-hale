import type { Metadata } from "next";
import Link from "next/link";
import TrackedLink from "@/components/TrackedLink";
import Footer from "@/components/Footer";
import SubHeader from "@/components/SubHeader";

export const metadata: Metadata = {
  title: "Uzaktan Şifa Nedir? — Hale Bayramoğlu",
  description:
    "Uzaktan şifa nedir, nasıl çalışır ve neden mesafeden bağımsızdır? Şifa enerjisini kendi evinizin rahatlığında, canlı bir çevrimiçi bağlantıyla deneyimleyin.",
};

export default function UzaktanSifaPage() {
  return (
    <>
      <SubHeader />

      <main className="bg-cream">
        {/* Hero */}
        <section className="mx-auto max-w-3xl px-6 pt-10 pb-4 text-center md:pt-14">
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-gold">
            Bütünsel Şifa
          </p>
          <h1 className="text-4xl md:text-6xl">Uzaktan Şifa</h1>
        </section>

        {/* Intro */}
        <section className="mx-auto max-w-3xl px-6 pb-6">
          <p className="text-lg leading-relaxed text-plum/80">
            Uzaktan şifa, şifa enerjisinin fiziksel mesafeden bağımsız olarak
            aktarılabileceği anlayışına dayanır. Enerji ve niyet, aynı odada
            bulunmayı gerektirmez; bağ, farkındalık ve içten bir yöneliş
            aracılığıyla kurulur. Böylece nerede olursanız olun — kendi evinizin
            tanıdık huzurunda — nazik bir şifa çalışmasına katılabilirsiniz.
          </p>
          <div className="mt-4 space-y-3 text-lg leading-relaxed text-plum/80">
            <p>
              🌍 Birçok bütünsel gelenek, yaşam enerjisinin her şeyi birbirine
              bağlayan bir alan olduğunu kabul eder. Bu görüşe göre şifa, mekânla
              sınırlı değildir; niyet ve farkındalıkla taşınır.
            </p>
            <p className="border-l-2 border-gold pl-4 italic text-purple">
              ✨ “Şifa, mesafeyi değil; niyeti ve açıklığı tanır.”
            </p>
            <p>
              🌿 Uzaktan şifa, evinizin güvenli ve tanıdık ortamında gevşeyip
              kendinize alan açmanıza olanak verir. Yolculuk yorgunluğu olmadan,
              tamamen kendi temponuzda.
            </p>
          </div>
        </section>

        {/* What it is */}
        <section className="mx-auto max-w-3xl px-6 py-5">
          <h2 className="text-3xl text-plum">Uzaktan Şifa Nedir?</h2>
          <p className="mt-4 text-lg leading-relaxed text-plum/80">
            Uzaktan şifa, canlı bir çevrimiçi bağlantı aracılığıyla yürütülen,
            nazik ve bütünsel bir enerji çalışmasıdır.
          </p>
          <ul className="mt-6 space-y-3 text-lg leading-relaxed text-plum/80">
            {[
              "Şifa enerjisini fiziksel mesafeden bağımsız olarak aktarmayı temel alır.",
              "Kendi evinizin rahatlığında, güvenli ve tanıdık bir ortamda gerçekleşir.",
              "Yalnızca belirtilere değil, kişinin bütününe — beden, zihin ve ruha — odaklanır.",
              "Stres, gerginlik ve duygusal yüklerin nazikçe bırakılmasına alan açar.",
              "Berraklık, sükûnet ve içsel denge hissini destekler.",
              "Seyahat gerektirmediği için yoğun ya da uzaktaki herkes için erişilebilirdir.",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden>🌿</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* How it works */}
        <section className="mx-auto max-w-3xl px-6 py-5">
          <h2 className="text-3xl text-plum">Nasıl Çalışır?</h2>
          <p className="mt-4 text-lg leading-relaxed text-plum/80">
            Seans öncesinde kısa bir görüşmeyle niyetinizi ve üzerine çalışmak
            istediğiniz temaları belirleriz. Belirlenen saatte, siz evinizde rahat
            bir konumda dinlenirken, çalışma uzaktan, farkındalık ve niyet
            eşliğinde yürütülür. Birçok kişi bu süreçte sıcaklık, gevşeme ya da
            derin bir huzur hissi tarif eder. Mesafe değil, açıklık ve bağ
            önemlidir. 🌸
          </p>
        </section>

        {/* What happens in a session */}
        <section className="mx-auto max-w-3xl px-6 py-5">
          <h2 className="text-3xl text-plum">Bir Seansta Neler Olur?</h2>
          <ul className="mt-4 space-y-3 text-lg leading-relaxed text-plum/80">
            {[
              "Canlı bir çevrimiçi bağlantı kurar, kısa bir sohbetle başlarız.",
              "Rahat, sessiz bir alan hazırlamanız yeterlidir — uzanabilir veya oturabilirsiniz.",
              "Nazik nefes ve farkındalık eşliğinde uzaktan şifa çalışmasına geçeriz.",
              "Seans sonunda hislerinizi paylaşır, günlük yaşamınız için küçük öneriler konuşuruz.",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden>✸</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Disclaimer */}
        <section className="mx-auto max-w-3xl px-6 py-5">
          <p className="rounded-2xl bg-cream-deep px-5 py-4 text-sm leading-relaxed text-plum/70">
            Uzaktan şifa; kişisel farkındalık ve içsel denge için bütünsel bir
            çalışmadır. Tıbbi, psikolojik veya başka bir uzman tavsiyenin yerine
            geçmez.
          </p>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-3xl px-6 py-10 text-center">
          <h2 className="text-3xl text-plum">Nerede olursanız olun, şifaya hazır mısınız?</h2>
          <p className="mt-4 text-lg leading-relaxed text-plum/75">
            Kendi huzurlu alanınızda birlikte çalışalım. ✨
          </p>
          <TrackedLink
            href="/#book"
            location="uzaktan_sifa_page"
            service="Uzaktan Şifa"
            className="mt-8 inline-block rounded-full bg-gold px-8 py-3.5 font-medium text-plum shadow-lg transition-transform hover:scale-[1.03]"
          >
            Randevu Al
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
