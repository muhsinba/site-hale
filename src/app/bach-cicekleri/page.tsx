import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Bach Çiçekleri Nedir? — Hale Bayramoğlu",
  description:
    "Bach Çiçekleri (Bach Flower Remedies) nedir, nasıl çalışır ve duygusal denge için nasıl destek olur? Dr. Edward Bach'ın geliştirdiği doğal yöntemi keşfedin.",
};

export default function BachCicekleriPage() {
  return (
    <>
      {/* Top bar — simple nav back to the home page + booking CTA */}
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
        <section className="mx-auto max-w-3xl px-6 pt-16 pb-10 text-center md:pt-24">
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-gold">
            Bütünsel Şifa
          </p>
          <h1 className="text-4xl md:text-6xl">Bach Çiçekleri Nedir?</h1>
        </section>

        {/* Intro (real content) */}
        <section className="mx-auto max-w-3xl px-6 pb-12">
          <p className="text-lg leading-relaxed text-plum/80">
            Bach Çiçekleri (Bach Flower Remedies), İngiliz doktor, bakteriyolog
            ve homeopat Dr. Edward Bach tarafından 1930’lu yıllarda geliştirilmiş
            doğal bir destek yöntemidir. Dr. Bach, uzun yıllar boyunca yaptığı
            gözlemler sonucunda insanların fiziksel rahatsızlıklarının çoğunun
            altında çözülmemiş duygusal çatışmaların, stresin ve içsel
            dengesizliklerin bulunduğunu savunmuştur. Ona göre gerçek iyilik
            hali, beden, zihin ve ruh arasındaki uyumun sağlanmasıyla mümkündür.
          </p>
        </section>

        {/* ===================================================================
            TEXT SECTION TEMPLATE — duplicate this block for each new topic.
            Replace the heading and paragraph(s) with your own content.
            =================================================================== */}
        <section className="mx-auto max-w-3xl px-6 py-8">
          <h2 className="text-3xl text-plum">Bach Çiçekleri Nasıl Etki Eder?</h2>
          <p className="mt-4 text-lg leading-relaxed text-plum/80">
            Bach Çiçekleri, kişinin yaşadığı olumsuz duygu durumlarını
            dönüştürerek içsel dengeyi ve duygusal uyumu desteklemeyi amaçlar.
            Dr. Edward Bach’a göre her olumsuz duygunun karşısında kişinin doğal
            yapısında bulunan olumlu bir potansiyel vardır. Bach Çiçek Özleri,
            bu olumlu niteliklerin yeniden ortaya çıkmasına yardımcı olarak
            bireyin duygusal dengesini güçlendirir.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-plum/80">
            Örneğin korku duygusu cesarete, kararsızlık içsel güvene, umutsuzluk
            ise umut ve yaşam enerjisine dönüşme potansiyeli taşır. Bach
            Çiçekleri, bu dönüşüm sürecini nazik ve doğal bir şekilde
            desteklemeyi hedefler.
          </p>
        </section>

        {/* Bach flowers reference table */}
        <section className="mx-auto max-w-4xl px-6 py-8">
          <h2 className="text-3xl text-plum">Bach Çiçekleri ve Anlamları</h2>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-plum/10">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="bg-plum text-cream">
                  <th className="px-4 py-3 font-medium">Çiçek</th>
                  <th className="px-4 py-3 font-medium">Kullanım Alanı ve Etkisi</th>
                </tr>
              </thead>
              <tbody>
                {(
                  [
                    ["Agrimony (Kaşık Otu)", "Çeşitli zihinsel sıkıntıları yatıştırır ve içsel huzur hissi uyandırır."],
                    ["Aspen (Tirek Kavak)", "Sebepsiz korkuları ve açıklanamayan huzursuzluğu yumuşatır, güven ve sükûnet kazandırır."],
                    ["Cerato", "Sürekli onay arama ihtiyacını dengeler ve kişinin kendi iç sesine güvenmesini destekler."],
                    ["Cherry Plum (Erik Ağacı)", "Kontrolünü ya da aklını kaybetme korkusunu yatıştırır ve iç huzuru güçlendirir."],
                    ["Chestnut Bud (Kestane Tomurcuğu)", "Aynı hataları tekrarlama eğilimini kırar ve deneyimlerden ders çıkarmayı kolaylaştırır."],
                    ["Chicory (Hindiba)", "Sahiplenici ve karşılık bekleyen tutumu yumuşatır, koşulsuz sevgiyi destekler."],
                    ["Olive (Zeytin Ağacı)", "Tükenmişliği ve enerji yetersizliğini giderir, canlılığı ve gücü yeniden kazandırır."],
                    ["Pine (Çam)", "Suçluluk duygusunu ve kendini ayıplamayı hafifletir, kendini bağışlamayı destekler."],
                    ["Star of Bethlehem", "Şok ve travmanın etkilerini yatıştırır, teselli ve denge hissi uyandırır."],
                    ["Sweet Chestnut (Kestane)", "Derin zihinsel ızdırabı yumuşatır ve içsel ferahlama ile umut kazandırır."],
                    ["White Chestnut (Ak Kestane)", "Zihni meşgul eden istenmeyen düşünceleri sakinleştirir ve zihinsel berraklık sağlar."],
                    ["Wild Oat (Yaban Otu)", "Belirsizliği ve kararsızlığı azaltır, yaşamda yön bulmayı kolaylaştırır."],
                    ["Wild Rose (Yaban Gülü)", "İlgisizlik ve cansızlık halini dönüştürür, yaşama dair ilgi ve canlılık uyandırır."],
                    ["Willow (Söğüt Ağacı)", "Gücenme ve içerleme duygularını çözer, affediciliği ve iç huzuru destekler."],
                    ["Holly (Çobanpüskülü)", "Öfke, kıskançlık ve kuşku gibi duyguları yatıştırır, sevgi ve hoşgörü uyandırır."],
                    ["Gorse (Karaçalı)", "Umutsuzluk ve karamsarlığı dağıtır, içte yeniden umut uyandırır."],
                    ["Heather (Funda)", "Aşırı kendine odaklanmayı dengeler, başkalarını dinlemeyi ve iç dengeyi güçlendirir."],
                    ["Gentian (Yılanotu)", "Engeller karşısında oluşan güvensizliği giderir, inanç ve kararlılığı destekler."],
                    ["Elm (Karaağaç)", "Sorumlulukların altında ezilme hissini hafifletir, güç ve özgüven kazandırır."],
                    ["Crab Apple (Yaban Elması)", "Kendini “kirli” ya da yetersiz hissetme duygusunu arındırır, öz kabul ve ferahlık uyandırır."],
                    ["Clematis (Akasma)", "Dağınık dikkati toplar ve kişiyi anın gerçekliğine, yaşama bağlar."],
                    ["Cherry Plum (Kiraz Eriği)", "Kontrolü kaybetme korkusunu ve aşırı gerginliği yatıştırır, sakinlik ve iç denge kazandırır."],
                    ["Willow (Söğüt)", "Kendine acıma ve hoşnutsuzluğu dönüştürür, sorumluluk alma ve şükran duygusunu destekler."],
                    ["Beech (Kayın)", "Aşırı eleştirel ve tahammülsüz tutumu yumuşatır, hoşgörü ve anlayış uyandırır."],
                    ["Agrimony (Kasıkotu)", "Neşeli bir maskenin ardına gizlenen iç sıkıntıyı açığa çıkarır ve gerçek iç huzuru destekler."],
                    ["Honeysuckle (Hanımeli)", "Geçmişe takılı kalmayı çözer ve kişinin şimdiki ana dönmesini destekler."],
                    ["Hornbeam (Gürgen)", "Zihinsel yorgunluğu ve isteksizliği giderir, tazelik ve motivasyon kazandırır."],
                    ["Sweet Chestnut (Tatlı Kestane)", "Dayanma sınırındaki derin acıyı yumuşatır ve içte umut ile ferahlama uyandırır."],
                    ["Impatiens (Sabırotu)", "Sabırsızlığı ve aceleciliği yatıştırır, sabır ve akışta kalma hissi kazandırır."],
                    ["Vervain (Mine Çiçeği)", "Aşırı hevesi ve gerginliği dengeler, sakinlik ve esneklik kazandırır."],
                    ["Larch (Karaçam)", "Yetersizlik hissini giderir ve özgüveni güçlendirir."],
                    ["Centaury (Kantaron)", "Hayır demekte zorlanmayı dönüştürür, kişinin kendi sınırlarını korumasını destekler."],
                    ["Mimulus", "Bilinen korkuları ve çekingenliği yatıştırır, cesaret ve sükûnet kazandırır."],
                    ["Walnut (Ceviz)", "Değişim ve yeni başlangıçlarda kişiyi dış etkilerden korur, uyum sağlamayı kolaylaştırır."],
                    ["Mustard (Hardal)", "Nedeni belirsiz hüzün ve karamsarlığı dağıtır, içte aydınlık ve neşe uyandırır."],
                    ["Water Violet (Su Menekşesi)", "Mesafeli ve yalnızlığa eğilimli tutumu yumuşatır, sıcaklık ve paylaşımı destekler."],
                    ["Red Chestnut (Kızıl Kestane)", "Sevdikleri için duyulan aşırı kaygıyı yatıştırır, güven ve iç sükûnet kazandırır."],
                    ["White Chestnut (Ak Kestane)", "Sürekli dönüp duran rahatsız edici düşünceleri sakinleştirir ve zihinsel dinginlik sağlar."],
                    ["Rock Rose (Kaya Gülü)", "Yoğun korku, panik ve dehşet hissini yatıştırır, cesaret ve sükûnet kazandırır."],
                    ["Wild Oat (Yaban Yulafı)", "Yaşam yönüne dair kararsızlığı giderir, amaç ve berraklık kazandırır."],
                    ["Rock Water", "Aşırı katılığı ve kendine sertliği yumuşatır, esneklik ve içsel akışı destekler."],
                    ["Wild Rose (Yaban Gülü)", "Teslimiyet ve isteksizlik halini dönüştürür, yaşama ilgi ve canlılık uyandırır."],
                    ["Scleranthus", "Kararsızlığı ve ani ruh hali dalgalanmalarını dengeler, denge ve kararlılık kazandırır."],
                    ["Star of Bethlehem (Akyıldız)", "Şok ve travmanın ardından gelen umutsuzluğu yatıştırır, teselli ve iç denge uyandırır."],
                    ["Vine (Üzüm)", "Baskın ve hükmedici eğilimleri yumuşatır, anlayışlı ve ilham veren liderliği destekler."],
                  ] as const
                ).map(([name, meaning], i) => (
                  <tr key={i} className="odd:bg-cream even:bg-cream-deep/40">
                    <td className="px-4 py-2.5 align-top font-medium text-plum">
                      {name}
                    </td>
                    <td className="px-4 py-2.5 align-top text-plum/75">
                      {meaning}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Image gallery. To add/replace: drop a JPG in public/bach/ and add an
            entry below (and a credit in the "Görsel kaynakları" list further down). */}
        <section className="mx-auto max-w-4xl px-6 py-8">
          <h2 className="text-3xl text-plum">Görseller</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              { src: "/bach/rock-rose.jpg", caption: "Kaya Gülü (Rock Rose)" },
              {
                src: "/bach/star-of-bethlehem.jpg",
                caption: "Akyıldız (Star of Bethlehem)",
              },
              { src: "/bach/impatiens.jpg", caption: "Camkesen (Impatiens)" },
              { src: "/bach/mimulus.jpg", caption: "Maymun Çiçeği (Mimulus)" },
            ].map((img) => (
              <figure
                key={img.src}
                className="overflow-hidden rounded-2xl bg-cream-deep shadow-sm"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={img.src}
                    alt={img.caption}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="px-4 py-3 text-sm text-plum/70">
                  {img.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Video — short public-domain flower clip, self-hosted in public/bach/. */}
        <section className="mx-auto max-w-4xl px-6 py-8">
          <h2 className="text-3xl text-plum">Video</h2>
          <video
            className="mt-6 aspect-video w-full rounded-2xl bg-plum object-cover shadow-sm"
            controls
            preload="metadata"
            playsInline
          >
            <source src="/bach/flowers.webm" type="video/webm" />
            Tarayıcınız bu videoyu oynatamıyor.
          </video>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-3xl px-6 py-16 text-center">
          <h2 className="text-3xl text-plum">Bir seans için hazır mısınız?</h2>
          <p className="mt-4 text-lg leading-relaxed text-plum/75">
            Size en uygun yolu birlikte bulalım.
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

        {/* Credits — required by the CC licenses of the gallery photos and music. */}
        <section className="mx-auto max-w-4xl px-6 pb-12">
          <details className="text-xs text-plum/50">
            <summary className="cursor-pointer hover:text-plum/70">
              Kaynaklar ve telif
            </summary>
            <ul className="mt-3 space-y-1">
              {[
                {
                  label: "Kaya Gülü (Helianthemum nummularium) — Uoaei1, CC BY-SA 4.0",
                  href: "https://commons.wikimedia.org/wiki/File:Helianthemum_nummularium_Mitterbach_01.jpg",
                },
                {
                  label:
                    "Akyıldız (Ornithogalum umbellatum) — Michael Goodyear, CC BY-SA 4.0",
                  href: "https://commons.wikimedia.org/wiki/File:Ornithogalum_umbellatum_lateral.jpg",
                },
                {
                  label: "Camkesen (Impatiens glandulifera) — Thomas Bresson, CC BY 3.0",
                  href: "https://commons.wikimedia.org/wiki/File:2013-11-05_12-34-54_Impatiens-glandulifera.jpg",
                },
                {
                  label:
                    "Maymun Çiçeği (Mimulus guttatus) — Krzysztof Ziarnek (Kenraiz), CC BY-SA 4.0",
                  href: "https://commons.wikimedia.org/wiki/File:Mimulus_guttatus_kz08.jpg",
                },
                {
                  label: "Video: “Flowers” — U.S. Forest Service, Public Domain",
                  href: "https://commons.wikimedia.org/wiki/File:Flowers_(20210715-FPAC-KLS-0001).webm",
                },
                {
                  label:
                    "Müzik: “Meditation Impromptu 01” — Kevin MacLeod (incompetech.com), CC BY 3.0",
                  href: "https://commons.wikimedia.org/wiki/File:Meditation_Impromptu_01_(ISRC_USUAN1100163).mp3",
                },
              ].map((c) => (
                <li key={c.href}>
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-offset-2 hover:underline"
                  >
                    {c.label}
                  </a>{" "}
                  · Wikimedia Commons
                </li>
              ))}
            </ul>
          </details>
        </section>
      </main>

      <Footer />
    </>
  );
}
