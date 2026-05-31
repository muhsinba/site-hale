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
          <h2 className="text-3xl text-plum">Nasıl Çalışır?</h2>
          <p className="mt-4 text-lg leading-relaxed text-plum/80">
            {/* TODO: Bu bölüme metninizi yazın. */}
            Buraya Bach Çiçekleri’nin nasıl çalıştığına dair açıklamanızı
            ekleyin.
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
                  <th className="px-4 py-3 font-medium">Anlamı / Kullanım Alanı</th>
                </tr>
              </thead>
              <tbody>
                {(
                  [
                    ["Agrimony (Kaşık Otu)", "Çeşitli zihinsel sıkıntılar"],
                    ["Aspen (Tirek Kavak)", "Endişe hali, sebepsiz korkular, açıklanamayan huzursuzluk hissi"],
                    ["Cerato", "Her daim danışma ve onaylanma ihtiyacı duyma"],
                    ["Cherry Plum (Erik Ağacı)", "Aklını kaybetme korkusu"],
                    ["Chestnut Bud (Kestane Tomurcuğu)", "Hatalardan asla ders çıkaramama"],
                    ["Chicory (Hindiba)", "Bencil bir şekilde mülkiyet düşkünü olma"],
                    ["Olive (Zeytin Ağacı)", "Enerji yetersizliği"],
                    ["Pine (Çam)", "Kendini ayıplama, suçluluk duygusu hissetme"],
                    ["Star of Bethlehem", "Şok geçirme"],
                    ["Sweet Chestnut (Kestane)", "Çok şiddetli bir şekilde zihinsel ızdırap çekmek"],
                    ["White Chestnut (Ak Kestane)", "İstenmeyen farklı düşünceler"],
                    ["Wild Oat (Yaban Otu)", "Yersiz şüphe duymak"],
                    ["Wild Rose (Yaban Gülü)", "Teslimiyet, cansızlık, hissizlik"],
                    ["Willow (Söğüt Ağacı)", "Gücenme, içerleme"],
                    ["Holly (Çobanpüskülü)", "Kızgınlık, sinirlilik, kıskançlık, kuşkuculuk"],
                    ["Gorse (Karaçalı)", "Umutsuz, çaresiz, kötümser"],
                    ["Heather (Funda)", "Konuşkan fakat yalnız, başkalarının varlığına muhtaç olanlar"],
                    ["Gentian (Yılanotu)", "Başaracağına inanmayan, güvensiz"],
                    ["Elm (Karaağaç)", "Ağır sorumluluklar altında ezilme hissi"],
                    ["Crab Apple (Yaban Elması)", "Duygusal ve fiziksel olarak “kirli” hissetme"],
                    ["Clematis (Akasma)", "Konsantrasyon eksikliği; hayal dünyasında olma"],
                    ["Cherry Plum (Kiraz Eriği)", "Gergin, çaresiz, kontrolü kaybetme korkusu; intihar eğilimleri, sinir krizleri"],
                    ["Willow (Söğüt)", "Pişmanlık, kendine acıma, hoşnutsuzluk, kızgınlık"],
                    ["Beech (Kayın)", "Fazlasıyla eleştirel ve tahammülsüz olanlar"],
                    ["Agrimony (Kasıkotu)", "Gülüp eğleniyorum, yani problem yok…"],
                    ["Honeysuckle (Hanımeli)", "Geçmişte yaşamak, geçmişe takılı kalmak"],
                    ["Hornbeam (Gürgen)", "İsteksizlik, motivasyonsuzluk hali"],
                    ["Sweet Chestnut (Tatlı Kestane)", "Son raddede duygusal ve fiziksel acı; dayanma noktalarının en sonunda olanlar"],
                    ["Impatiens (Sabırotu)", "Sabırsız, aceleci, içten gelen bir aciliyet hissi"],
                    ["Vervain (Mine Çiçeği)", "Hemen şimdi dünyayı kurtarma hevesinde olanlar"],
                    ["Larch (Karaçam)", "Yetersizlik hissi; kendine güven eksikliği"],
                    ["Centaury (Kantaron)", "Hayır demekte güçlük çeken, herkesi memnun etme kaygısı yaşayan kişiler"],
                    ["Mimulus", "Korku veya huzursuzluk hissi; fazla hassas ve çekingen"],
                    ["Walnut (Ceviz)", "Değişimin ya da değişim çabasının kürü"],
                    ["Mustard (Hardal)", "Kara bir bulut gibi çöken üzüntü ve karamsarlık"],
                    ["Water Violet (Su Menekşesi)", "Gururlu ve ilgisiz; kendi başına olmaktan memnun olma"],
                    ["Red Chestnut (Kızıl Kestane)", "Yakınlarının güvenine dair korku düzeyinde endişe duyma"],
                    ["White Chestnut (Ak Kestane)", "Rahatsız edici düşünceler; kafası meşgul ve düşüncelerle dolu"],
                    ["Rock Rose (Kaya Gülü)", "Dehşet, büyük korku, panik atak, histeri hali"],
                    ["Wild Oat (Yaban Yulafı)", "Tatminsizlik, kararsızlık, hayatta doğru yolun ne olduğuna dair belirsizlik"],
                    ["Rock Water", "Katılık, disiplin ve kendi doğallığını reddetme"],
                    ["Wild Rose (Yaban Gülü)", "Geriye çekilmiş, isteksiz, enerjisiz; her şeyi sessizce kabul etme"],
                    ["Scleranthus", "Kararsızlık hali, sık ve ani ruh hali değişiklikleri"],
                    ["Star of Bethlehem (Akyıldız)", "Hayattaki bir şok ya da travmanın ardından başlayan umutsuzluk ve mutsuzluk"],
                    ["Vine (Üzüm)", "Liderler, hükmetmeyi sevenler"],
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

        {/* ===================================================================
            VIDEO TEMPLATE
            Replace the placeholder below with a responsive embed, e.g. YouTube:
              <div className="aspect-video overflow-hidden rounded-2xl">
                <iframe
                  className="h-full w-full"
                  src="https://www.youtube.com/embed/VIDEO_ID"
                  title="Bach Çiçekleri"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            (VIDEO_ID = the part after watch?v= in the YouTube URL.)
            =================================================================== */}
        <section className="mx-auto max-w-4xl px-6 py-8">
          <h2 className="text-3xl text-plum">Video</h2>
          <div className="mt-6 flex aspect-video items-center justify-center rounded-2xl border border-dashed border-plum/25 bg-cream-deep text-plum/40">
            Video buraya gelecek
          </div>
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

        {/* Image credits — required by the CC licenses of the gallery photos. */}
        <section className="mx-auto max-w-4xl px-6 pb-12">
          <details className="text-xs text-plum/50">
            <summary className="cursor-pointer hover:text-plum/70">
              Görsel kaynakları ve telif
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
