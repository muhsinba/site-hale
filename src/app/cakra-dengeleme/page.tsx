import type { Metadata } from "next";
import Link from "next/link";
import TrackedLink from "@/components/TrackedLink";
import Footer from "@/components/Footer";
import SubHeader from "@/components/SubHeader";

export const metadata: Metadata = {
  title: "Çakra Dengeleme Nedir? — Hale Bayramoğlu",
  description:
    "Çakra dengeleme nedir, nasıl çalışır ve yedi temel enerji merkezi neyi temsil eder? Enerji merkezlerinizi yeniden hizalayarak berraklık, denge ve içsel huzuru destekleyin.",
};

// The seven main chakras: color swatch (Tailwind), Sanskrit name, body region, theme.
const chakras = [
  { name: "Kök Çakra", sanskrit: "Muladhara", color: "bg-red-500", region: "Omurganın tabanı", theme: "Güven, topraklanma ve güvenlik duygusu. Dengede olduğunda kendinizi köklenmiş ve sağlam hissedersiniz." },
  { name: "Sakral Çakra", sanskrit: "Svadhisthana", color: "bg-orange-400", region: "Karın alt bölgesi", theme: "Yaratıcılık, duygular ve yaşamdan keyif alma. Akışkan duygusal ifadeyi ve tutkuyu destekler." },
  { name: "Solar Pleksus Çakra", sanskrit: "Manipura", color: "bg-yellow-400", region: "Mide bölgesi", theme: "Özgüven, irade ve kişisel güç. Dengede olduğunda kararlılık ve içsel netlik getirir." },
  { name: "Kalp Çakra", sanskrit: "Anahata", color: "bg-green-500", region: "Göğüs ortası", theme: "Sevgi, şefkat ve bağ kurma. Hem kendinize hem başkalarına açık bir kalple yaklaşmayı destekler." },
  { name: "Boğaz Çakra", sanskrit: "Vishuddha", color: "bg-sky-500", region: "Boğaz", theme: "İletişim, ifade ve hakikat. Kendinizi özgürce ve dürüstçe ifade etmenize alan açar." },
  { name: "Üçüncü Göz Çakra", sanskrit: "Ajna", color: "bg-indigo-500", region: "Kaşların arası", theme: "Sezgi, içgörü ve farkındalık. Berrak görüş ve içsel bilgeliğe ulaşmayı destekler." },
  { name: "Taç Çakra", sanskrit: "Sahasrara", color: "bg-violet-500", region: "Başın tepesi", theme: "Ruhsal bağlantı, bilinç ve birlik. Daha büyük bir bütünle huzurlu bir bağ kurmayı temsil eder." },
];

export default function CakraDengelemePage() {
  return (
    <>
      <SubHeader />

      <main className="bg-cream">
        {/* Hero */}
        <section className="mx-auto max-w-3xl px-6 pt-10 pb-4 text-center md:pt-14">
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-gold">
            Bütünsel Şifa
          </p>
          <h1 className="text-4xl md:text-6xl">Çakra Dengeleme</h1>
        </section>

        {/* Intro */}
        <section className="mx-auto max-w-3xl px-6 pb-6">
          <p className="text-lg leading-relaxed text-plum/80">
            Çakralar, bedenimiz boyunca akan yaşam enerjisinin (prana) toplandığı
            ve dönüştüğü merkezlerdir. Sanskritçede “tekerlek” ya da “dönen çark”
            anlamına gelen çakra, her biri belirli bir bedensel bölge, duygu ve
            yaşam temasıyla ilişkilenen yedi temel enerji merkezini ifade eder.
            Bu merkezler dengede ve açık olduğunda enerji özgürce akar; kişi
            kendini daha berrak, dengeli ve canlı hisseder.
          </p>
          <div className="mt-4 space-y-3 text-lg leading-relaxed text-plum/80">
            <p>
              🌬️ Stres, bastırılmış duygular ve uzun süreli gerginlikler zamanla
              bu merkezlerde tıkanıklıklara yol açabilir. Bir çakra fazla kapalı
              ya da fazla aktif olduğunda, o temaya ait alanlarda zorlanma
              hissedilebilir.
            </p>
            <p className="border-l-2 border-gold pl-4 italic text-purple">
              ✨ “Enerji özgürce aktığında, beden ve zihin doğal dengesine geri
              döner.”
            </p>
            <p>
              🌿 Çakra dengeleme, bu enerji merkezlerini nazikçe yeniden
              hizalayarak akışı destekler; gerilimi bırakmaya, sükûnete ve
              yenilenmiş bir canlılığa davet eder.
            </p>
          </div>
        </section>

        {/* What it is */}
        <section className="mx-auto max-w-3xl px-6 py-5">
          <h2 className="text-3xl text-plum">Çakra Dengeleme Nedir?</h2>
          <p className="mt-4 text-lg leading-relaxed text-plum/80">
            Çakra dengeleme, enerji merkezlerinizdeki uyumu yeniden kurmayı
            amaçlayan, nazik ve bütünsel bir enerji çalışmasıdır.
          </p>
          <ul className="mt-6 space-y-3 text-lg leading-relaxed text-plum/80">
            {[
              "Tıkanmış ya da aşırı aktif enerji merkezlerini fark edip nazikçe dengelemeyi destekler.",
              "Yalnızca belirtilere değil, kişinin bütününe — beden, zihin ve ruha — odaklanır.",
              "Stres, gerginlik ve duygusal yüklerin bırakılmasına alan açar.",
              "Berraklık, içsel sükûnet ve topraklanma hissini güçlendirir.",
              "Sakin, güvenli ve nazik bir yöntemdir.",
              "Her bireyin kendi enerjisiyle yeniden uyumlanmasına eşlik eder.",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden>🌿</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Seven chakras */}
        <section className="mx-auto max-w-3xl px-6 py-5">
          <h2 className="text-3xl text-plum">Yedi Temel Çakra</h2>
          <p className="mt-3 leading-relaxed text-plum/70">
            Her çakra, bedenin belirli bir bölgesi ve yaşam temasıyla ilişkilidir.
          </p>
          <div className="mt-6 space-y-3">
            {chakras.map((c) => (
              <div
                key={c.sanskrit}
                className="flex gap-4 rounded-2xl border border-plum/10 bg-cream p-5"
              >
                <span aria-hidden className={`mt-1 h-5 w-5 shrink-0 rounded-full ${c.color}`} />
                <div>
                  <h3 className="font-serif text-xl text-plum">
                    {c.name}{" "}
                    <span className="text-base font-normal text-plum/50">· {c.sanskrit}</span>
                  </h3>
                  <p className="mt-0.5 text-sm text-plum/50">{c.region}</p>
                  <p className="mt-2 leading-relaxed text-plum/75">{c.theme}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How a session goes */}
        <section className="mx-auto max-w-3xl px-6 py-5">
          <h2 className="text-3xl text-plum">Bir Seansta Neler Olur?</h2>
          <p className="mt-4 text-lg leading-relaxed text-plum/80">
            Seans, kısa bir sohbetle başlar; o gün kendinizi nasıl hissettiğinizi
            ve üzerine çalışmak istediğiniz temaları birlikte konuşuruz. Ardından
            rahat bir konumda, nazik nefes ve farkındalık eşliğinde enerji
            merkezlerinizi sırayla dengeleyen bir çalışmaya geçeriz. Seans
            sonunda hislerinizi paylaşır, günlük yaşamınızda dengeyi destekleyecek
            küçük öneriler üzerine konuşuruz. 🌸
          </p>
        </section>

        {/* Disclaimer */}
        <section className="mx-auto max-w-3xl px-6 py-5">
          <p className="rounded-2xl bg-cream-deep px-5 py-4 text-sm leading-relaxed text-plum/70">
            Çakra dengeleme; kişisel farkındalık ve içsel denge için bütünsel bir
            çalışmadır. Tıbbi, psikolojik veya başka bir uzman tavsiyenin yerine
            geçmez.
          </p>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-3xl px-6 py-10 text-center">
          <h2 className="text-3xl text-plum">Dengeye bir adım atmaya hazır mısınız?</h2>
          <p className="mt-4 text-lg leading-relaxed text-plum/75">
            Enerjinizi birlikte nazikçe uyumlandıralım. ✨
          </p>
          <TrackedLink
            href="/#book"
            location="cakra_page"
            service="Çakra Dengeleme"
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
