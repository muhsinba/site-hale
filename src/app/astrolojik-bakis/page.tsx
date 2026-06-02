import type { Metadata } from "next";
import Link from "next/link";
import TrackedLink from "@/components/TrackedLink";
import Footer from "@/components/Footer";
import SubHeader from "@/components/SubHeader";

// Soft element-colored badge per zodiac element.
const elementBadge: Record<string, string> = {
  Ateş: "bg-rose/15 text-rose",
  Toprak: "bg-emerald-100 text-emerald-700",
  Hava: "bg-sky-100 text-sky-700",
  Su: "bg-indigo-100 text-indigo-700",
};

// The twelve zodiac signs with full detail. Lucky color/number/day follow the
// traditional ruling-planet associations and common Turkish astrology usage.
const zodiac = [
  {
    glyph: "♈", name: "Koç", dates: "21 Mart – 19 Nisan", element: "Ateş",
    ruler: "Mars", quality: "Öncü", day: "Salı", number: "9", color: "Kırmızı",
    strengths: "Cesaret, liderlik, kararlılık",
    desc: "Koç, hayata cesaret ve tutkuyla atılan bir öncüdür. Girişimci ruhu ve yüksek enerjisiyle yeni başlangıçlar yapmayı sever; doğal bir liderdir. Bazen sabırsız olabilse de samimiyeti ve dürüstlüğüyle öne çıkar.",
  },
  {
    glyph: "♉", name: "Boğa", dates: "20 Nisan – 20 Mayıs", element: "Toprak",
    ruler: "Venüs", quality: "Sabit", day: "Cuma", number: "6", color: "Yeşil",
    strengths: "Sadakat, sabır, kararlılık",
    desc: "Boğa; sağlam, sabırlı ve güven veren bir burçtur. Konforu, güzelliği ve istikrarı sever; bağlılığı ve kararlılığıyla bilinir. Değişime temkinli yaklaşsa da emek verdiği her şeyde sebat eder.",
  },
  {
    glyph: "♊", name: "İkizler", dates: "21 Mayıs – 20 Haziran", element: "Hava",
    ruler: "Merkür", quality: "Değişken", day: "Çarşamba", number: "5", color: "Sarı",
    strengths: "Zekâ, iletişim, uyum",
    desc: "İkizler; meraklı, zeki ve iletişimi güçlü bir burçtur. Öğrenmeye, paylaşmaya ve çeşitliliğe açıktır; sohbeti ve esnekliğiyle dikkat çeker. Zihinsel canlılığı onu her ortamda uyumlu kılar.",
  },
  {
    glyph: "♋", name: "Yengeç", dates: "21 Haziran – 22 Temmuz", element: "Su",
    ruler: "Ay", quality: "Öncü", day: "Pazartesi", number: "2", color: "Gümüş",
    strengths: "Şefkat, sezgi, koruyuculuk",
    desc: "Yengeç; duygusal, sezgisel ve koruyucu bir burçtur. Yuva, aile ve aidiyet duygusu onun için çok değerlidir; sevdiklerine büyük bir şefkatle yaklaşır. Hassas kalbi en güçlü yanıdır.",
  },
  {
    glyph: "♌", name: "Aslan", dates: "23 Temmuz – 22 Ağustos", element: "Ateş",
    ruler: "Güneş", quality: "Sabit", day: "Pazar", number: "1", color: "Altın",
    strengths: "Özgüven, cömertlik, yaratıcılık",
    desc: "Aslan; sıcak, cömert ve özgüvenli bir burçtur. Yaratıcılığı ve ışığıyla çevresini canlandırır; takdir edilmenin tadını çıkarır. Soylu kalbi ve liderlik ruhuyla parlar.",
  },
  {
    glyph: "♍", name: "Başak", dates: "23 Ağustos – 22 Eylül", element: "Toprak",
    ruler: "Merkür", quality: "Değişken", day: "Çarşamba", number: "5", color: "Lacivert",
    strengths: "Titizlik, analiz, yardımseverlik",
    desc: "Başak; titiz, analitik ve yardımsever bir burçtur. Düzeni, faydayı ve özeni gözetir; ayrıntılardaki inceliği fark eder. Hizmet etme ve iyileştirme arzusu onu değerli kılar.",
  },
  {
    glyph: "♎", name: "Terazi", dates: "23 Eylül – 22 Ekim", element: "Hava",
    ruler: "Venüs", quality: "Öncü", day: "Cuma", number: "6", color: "Pastel Mavi",
    strengths: "Diplomasi, denge, zarafet",
    desc: "Terazi; dengeli, zarif ve uyum arayan bir burçtur. İlişkilerde adaleti, inceliği ve estetiği önemser; uzlaşmacı tavrıyla bilinir. Güzellik ve huzur onun doğal arayışıdır.",
  },
  {
    glyph: "♏", name: "Akrep", dates: "23 Ekim – 21 Kasım", element: "Su",
    ruler: "Plüton ve Mars", quality: "Sabit", day: "Salı", number: "9", color: "Bordo",
    strengths: "Tutku, sezgi, kararlılık",
    desc: "Akrep; tutkulu, derin ve dönüştürücü bir burçtur. Güçlü sezgisi ve odağıyla yüzeyin altındaki gerçeği görür; sadakati belirgindir. Yenilenme ve dönüşüm onun gücüdür.",
  },
  {
    glyph: "♐", name: "Yay", dates: "22 Kasım – 21 Aralık", element: "Ateş",
    ruler: "Jüpiter", quality: "Değişken", day: "Perşembe", number: "3", color: "Mor",
    strengths: "İyimserlik, dürüstlük, macera",
    desc: "Yay; özgür, iyimser ve maceracı bir burçtur. Anlam, keşif ve geniş ufuklar peşinde koşar; içten ve neşeli yapısıyla çevresine ilham verir. Gerçeği arama tutkusu yolunu aydınlatır.",
  },
  {
    glyph: "♑", name: "Oğlak", dates: "22 Aralık – 19 Ocak", element: "Toprak",
    ruler: "Satürn", quality: "Öncü", day: "Cumartesi", number: "8", color: "Koyu Kahve",
    strengths: "Disiplin, sorumluluk, sebat",
    desc: "Oğlak; disiplinli, sorumlu ve hırslı bir burçtur. Uzun vadeli hedeflerine sabır ve kararlılıkla yürür; güvenilirliği ve olgunluğuyla bilinir. Sebatı en büyük gücüdür.",
  },
  {
    glyph: "♒", name: "Kova", dates: "20 Ocak – 18 Şubat", element: "Hava",
    ruler: "Uranüs ve Satürn", quality: "Sabit", day: "Cumartesi", number: "4", color: "Turkuaz",
    strengths: "Özgünlük, yenilikçilik, idealizm",
    desc: "Kova; özgün, yenilikçi ve insancıl bir burçtur. Farklı bakış açıları ve özgürlük getirir; topluma ve geleceğe dönük idealleri vardır. Bağımsız ruhu onu benzersiz kılar.",
  },
  {
    glyph: "♓", name: "Balık", dates: "19 Şubat – 20 Mart", element: "Su",
    ruler: "Neptün ve Jüpiter", quality: "Değişken", day: "Perşembe", number: "7", color: "Deniz Yeşili",
    strengths: "Empati, yaratıcılık, sezgi",
    desc: "Balık; şefkatli, hayalperest ve empatik bir burçtur. Derin bir iç dünyaya ve güçlü bir sezgiye sahiptir; sanata ve maneviyata yatkındır. Sınırsız merhameti en güzel yanıdır.",
  },
];

export const metadata: Metadata = {
  title: "Astrolojik Bakış — Hale Bayramoğlu",
  description:
    "Doğum haritanız üzerinden kişiye özel bir astrolojik okuma. Yaşam temalarınıza, güçlü yönlerinize ve içsel potansiyelinize nazik bir farkındalıkla bakın.",
};

export default function AstrolojikBakisPage() {
  return (
    <>
      <SubHeader />

      <main className="bg-cream">
        {/* Hero */}
        <section className="mx-auto max-w-3xl px-6 pt-10 pb-4 text-center md:pt-14">
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-gold">
            Gökyüzünün Rehberliği
          </p>
          <h1 className="text-4xl md:text-6xl">Astrolojik Bakış</h1>
        </section>

        {/* Intro */}
        <section className="mx-auto max-w-3xl px-6 pb-6">
          <p className="text-lg leading-relaxed text-plum/80">
            Astrolojik Bakış, doğduğunuz anda gökyüzünün bir fotoğrafı olan
            doğum haritanız üzerinden yapılan kişiye özel bir okumadır. Amaç
            geleceği “önceden söylemek” değil; kendinizi daha iyi tanımanız,
            güçlü yanlarınızı fark etmeniz ve yaşam temalarınıza nazik bir
            farkındalıkla bakabilmenizdir.
          </p>
        </section>

        {/* Nedir */}
        <section className="mx-auto max-w-3xl px-6 py-5">
          <h2 className="text-3xl text-plum">Astrolojik Bakış Nedir?</h2>
          <p className="mt-4 text-lg leading-relaxed text-plum/80">
            Doğum haritası; gezegenlerin, burçların ve evlerin doğduğunuz andaki
            konumlarından oluşan sembolik bir haritadır. Bu semboller, kişiliğin
            farklı yönlerini, ihtiyaçlarını ve eğilimlerini anlamak için nazik
            bir dil sunar. Astrolojik Bakış’ta bu harita birlikte okunur ve
            içsel bir keşif yolculuğuna dönüştürülür.
          </p>
        </section>

        {/* Harita Analizi */}
        <section className="mx-auto max-w-5xl px-6 py-5">
          <h2 className="text-3xl text-plum">Harita Analizi</h2>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-plum/80">
            Farklı sorulara farklı haritalar yanıt verir. Size en uygun analizi
            birlikte seçebiliriz.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {(
              [
                {
                  href: "/astrolojik-bakis/dogum-haritasi",
                  icon: "☉",
                  title: "Doğum Haritası",
                  desc: "Doğduğunuz anın haritasıyla karakterinizi, güçlü yönlerinizi ve yaşam temalarınızı keşfedin.",
                  badge: "En İlgi Çeken",
                },
                {
                  href: "/astrolojik-bakis/yildiz-haritasi",
                  icon: "✶",
                  title: "Yıldız Haritası",
                  desc: "Gökyüzünün güncel hareketlerinin size etkisini ve önümüzdeki döneme dair temaları inceleyin.",
                },
                {
                  href: "/astrolojik-bakis/birliktelik-haritasi",
                  icon: "☌",
                  title: "Birliktelik Haritası",
                  desc: "İki haritayı birlikte okuyarak ilişkinizdeki uyum ve gelişim alanlarını anlayın.",
                },
              ] as { href: string; icon: string; title: string; desc: string; badge?: string }[]
            ).map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className={`group relative flex flex-col rounded-3xl border p-6 transition-all hover:-translate-y-1 hover:shadow-md ${
                  c.badge ? "border-red-300 bg-red-100" : "border-plum/10 bg-cream-deep"
                }`}
              >
                {c.badge && (
                  <span className="absolute -top-3 left-6 rounded-full bg-red-500 px-4 py-1 text-xs font-medium uppercase tracking-wide text-white">
                    {c.badge}
                  </span>
                )}
                <div className="text-3xl text-purple">{c.icon}</div>
                <h3 className="mt-3 text-2xl font-bold text-plum">{c.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-plum/70">
                  {c.desc}
                </p>
                <span className="mt-4 text-sm font-medium text-purple transition-colors group-hover:text-plum">
                  Detayları gör →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Neler konuşulur */}
        <section className="mx-auto max-w-3xl px-6 py-5">
          <h2 className="text-3xl text-plum">Bir Okumada Neler Konuşulur?</h2>
          <ul className="mt-4 space-y-3 text-lg leading-relaxed text-plum/80">
            {[
              "Doğum haritanızın genel görünümü ve baskın yaşam temaları",
              "Güçlü yönleriniz ve doğal yetenekleriniz",
              "Zorlayıcı olabilecek alanlar ve bunlarla nazikçe çalışma yolları",
              "Duygusal ihtiyaçlarınız ve ilişki eğilimleriniz",
              "İçsel potansiyelinizi destekleyecek farkındalık önerileri",
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

        {/* Burçlar */}
        <section className="mx-auto max-w-5xl px-6 py-5">
          <h2 className="text-3xl text-plum">Burçlar ve Özellikleri</h2>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-plum/80">
            Güneş burcunuz, doğum haritanızın yalnızca bir parçasıdır; yine de
            kişiliğinizin ana renklerini anlamak için güzel bir başlangıçtır.
            Aşağıda on iki burcun tarihlerini, elementlerini ve öne çıkan
            özelliklerini bulabilirsiniz.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {zodiac.map((z) => (
              <div
                key={z.name}
                className="flex flex-col rounded-3xl border border-plum/10 bg-cream-deep p-6 transition-shadow hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span aria-hidden className="text-3xl text-purple">
                      {z.glyph}
                    </span>
                    <div>
                      <h3 className="text-xl text-plum">{z.name}</h3>
                      <p className="text-sm text-plum/50">{z.dates}</p>
                    </div>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${elementBadge[z.element]}`}
                  >
                    {z.element}
                  </span>
                </div>

                <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  {[
                    ["Yönetici gezegen", z.ruler],
                    ["Nitelik", z.quality],
                    ["Şanslı gün", z.day],
                    ["Şanslı sayı", z.number],
                    ["Şanslı renk", z.color],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <dt className="text-xs uppercase tracking-wide text-plum/45">
                        {label}
                      </dt>
                      <dd className="text-plum/80">{value}</dd>
                    </div>
                  ))}
                </dl>

                <p className="mt-4 text-sm leading-relaxed text-plum/70">
                  {z.desc}
                </p>
                <p className="mt-3 text-sm text-plum/70">
                  <span className="font-medium text-purple">Güçlü yönleri:</span>{" "}
                  {z.strengths}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Hazırlık */}
        <section className="mx-auto max-w-3xl px-6 py-5">
          <h2 className="text-3xl text-plum">Okumaya Hazırlık</h2>
          <p className="mt-4 text-lg leading-relaxed text-plum/80">
            Doğum haritanızın çıkarılabilmesi için üç bilgi yeterlidir: doğum
            tarihiniz, mümkün olduğunca net doğum saatiniz ve doğum yeriniz.
            Doğum saatini tam bilmiyorsanız sorun değil; yaklaşık bir saatle de
            anlamlı bir okuma yapılabilir.
          </p>
        </section>

        {/* Kimler için uygundur */}
        <section className="mx-auto max-w-3xl px-6 py-5">
          <h2 className="text-3xl text-plum">Kimler İçin Uygundur?</h2>
          <ul className="mt-4 space-y-3 text-lg leading-relaxed text-plum/80">
            {[
              "Kendini daha derinden tanımak isteyenler",
              "Bir dönüm noktasında netlik ve perspektif arayanlar",
              "Yaşam temalarına ve ilişkilerine yeni bir gözle bakmak isteyenler",
              "İçsel potansiyeline nazik bir bakış isteyen herkes",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden>🌿</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Disclaimer */}
        <section className="mx-auto max-w-3xl px-6 py-5">
          <p className="rounded-2xl bg-cream-deep px-5 py-4 text-sm leading-relaxed text-plum/70">
            Astrolojik Bakış; kişisel farkındalık ve içsel keşfe yönelik
            bütünsel bir çalışmadır. Tıbbi, psikolojik, hukuki veya finansal
            tavsiyenin yerine geçmez.
          </p>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-3xl px-6 py-10 text-center">
          <h2 className="text-3xl text-plum">Bir okuma için hazır mısınız?</h2>
          <p className="mt-4 text-lg leading-relaxed text-plum/75">
            Kendi hikâyenize gökyüzünün diliyle nazik bir bakış atın. ✨
          </p>
          <TrackedLink
            href={`/?service=${encodeURIComponent("Astrolojik Bakış")}#book`}
            location="astrolojik_page"
            service="Astrolojik Bakış"
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
