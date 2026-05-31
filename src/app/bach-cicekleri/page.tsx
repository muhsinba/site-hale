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
        <section className="mx-auto max-w-3xl px-6 pt-10 pb-4 text-center md:pt-14">
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-gold">
            Bütünsel Şifa
          </p>
          <h1 className="text-4xl md:text-6xl">Bach Çiçekleri ve Felsefesi</h1>
        </section>

        {/* Intro (real content) */}
        <section className="mx-auto max-w-3xl px-6 pb-6">
          <p className="text-lg leading-relaxed text-plum/80">
            Bach Çiçekleri (Bach Flower Remedies), İngiliz doktor, bakteriyolog
            ve homeopat Dr. Edward Bach tarafından 1930’lu yıllarda geliştirilmiş
            doğal bir destek yöntemidir. Dr. Bach, uzun yıllar boyunca yaptığı
            gözlemler sonucunda insanların fiziksel rahatsızlıklarının çoğunun
            altında çözülmemiş duygusal çatışmaların, stresin ve içsel
            dengesizliklerin bulunduğunu savunmuştur. Ona göre gerçek iyilik
            hali, beden, zihin ve ruh arasındaki uyumun sağlanmasıyla mümkündür.
          </p>
          <div className="mt-4 space-y-3 text-lg leading-relaxed text-plum/80">
            <p>
              🌿 Dr. Edward Bach’a göre hastalık yalnızca fiziksel bir durum
              değildir; kişinin iç dünyasında yaşadığı uyumsuzlukların ve
              duygusal çatışmaların bir yansımasıdır.
            </p>
            <p className="border-l-2 border-gold pl-4 italic text-purple">
              ✨ “Hastalık, ruhun sesini duyurmaya çalışmasıdır.”
            </p>
            <p>
              🌿 Bach, gerçek iyileşmenin yalnızca belirtilerin ortadan
              kalkmasıyla değil, kişinin kendi özüyle ve yaşam amacıyla uyum
              içinde olmasıyla mümkün olduğuna inanıyordu.
            </p>
            <p className="border-l-2 border-gold pl-4 italic text-purple">
              ✨ “Gerçek iyileşme, kişinin kendi içsel doğasıyla uyumudur.”
            </p>
            <p>
              🌿 Sevgi, anlayış, şefkat ve özgür irade Bach felsefesinin temel
              taşlarıdır. Her bireyin kendi içsel bilgeliğine ulaşma ve yaşam
              yolunu özgürce seçme hakkına sahip olduğunu savunmuştur.
            </p>
            <p>
              🌿 Bach’a göre beden, zihin ve ruh birbirinden ayrı değil; bir
              bütünün parçalarıdır. Bu üçlü, doğal olarak denge ve uyum arayışı
              içindedir.
            </p>
            <p>
              🌿 Duygusal dengesizlikler giderildiğinde, kişinin yaşam enerjisi
              daha özgür akar ve içsel uyum yeniden sağlanabilir.
            </p>
            <p className="font-medium text-plum">
              🌸 Beden, zihin ve ruh uyum içinde olduğunda, kişi kendi özündeki
              dengeyi ve huzuru yeniden hatırlar. ✨
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-6 py-5">
          <h2 className="text-3xl text-plum">Bach Çiçekleri Nedir?</h2>
          <p className="mt-4 text-lg leading-relaxed text-plum/80">
            Bach Çiçekleri, 38 farklı çiçek özünden oluşan doğal bir duygusal
            destek sistemidir.
          </p>
          <ul className="mt-6 space-y-3 text-lg leading-relaxed text-plum/80">
            {[
              "Kişinin duygusal dengesini yeniden kurmasına yardımcı olur.",
              "Her çiçek özü, belirli bir duygu durumu ile ilişkilidir.",
              "Sadece belirtilere değil, kişinin iç dünyasına ve duygusal ihtiyaçlarına odaklanır.",
              "Stres, korku, endişe, kararsızlık, özgüven eksikliği ve duygusal yüklerin dengelenmesinde destek sağlar.",
              "Kullanımı kolay, güvenli ve nazik bir yöntemdir.",
              "Her yaştan birey için uygun bir destek yaklaşımı sunar.",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden>🌿</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-lg leading-relaxed text-plum/80">
            Duygularınız dengelendiğinde, yaşam enerjiniz daha özgür akmaya
            başlar. 🌸
          </p>
          <p className="mt-2 text-lg font-medium leading-relaxed text-purple">
            Bach Çiçekleri ile duygusal dengeye ve içsel huzura bir adım atın. ✨
          </p>
        </section>

        {/* Bach flowers reference table */}
        <section className="mx-auto max-w-4xl px-6 py-5">
          <h2 className="text-3xl text-plum">Bach Çiçekleri ve Duygu Durumları</h2>
          <p className="mt-3 leading-relaxed text-plum/70">
            Bach çiçekleri yedi temel duygu durumu altında gruplanır. Bir başlığa
            dokunarak o gruba ait çiçekleri ve anlamlarını görebilirsiniz.
          </p>
          <div className="mt-6 space-y-3">
            {[
              {
                title: "Korku",
                supports:
                  "Korkularla yüzleşmeyi ve içsel cesareti geliştirmeyi destekler.",
                flowers: [
                  ["Aspen", "Sebebi bilinmeyen, açıklanamayan korkular ve huzursuzluk durumlarında destekleyicidir."],
                  ["Cherry Plum", "Kontrolü kaybetme korkusu, taşkın duygular ve içsel baskı hissiyle ilişkilidir."],
                  ["Mimulus", "Belirli korkular, fobiler ve günlük yaşamda tanımlanabilen endişelerle ilgilidir."],
                  ["Rock Rose", "Yoğun panik, korku ve kriz anlarında yaşanan aşırı korku durumlarını temsil eder."],
                  ["Red Chestnut", "Sevdiklerine yönelik aşırı endişe, koruma isteği ve kaygı durumlarında kullanılır."],
                ],
              },
              {
                title: "Belirsizlik",
                supports:
                  "Kendi fikirlerine güvenmeyi ve içsel netliği artırmayı destekler.",
                flowers: [
                  ["Cerato", "Kendi kararlarından sürekli şüphe eden, içsel güven eksikliği yaşayan kişilerle ilişkilidir."],
                  ["Gentian", "Geçmiş hayal kırıklıkları ve başarısızlıklara takılarak motivasyon kaybı yaşayan kişiler için kullanılır."],
                  ["Gorse", "Umudunu yitirmiş, çaresizlik hissi içinde olan ve yeniden deneme gücü bulmakta zorlanan bireyleri temsil eder."],
                  ["Hornbeam", "Günlük yaşamı erteleme eğiliminde olan, zihinsel yorgunluk ve isteksizlik yaşayan kişilerle ilişkilidir."],
                  ["Scleranthus", "İçsel kararsızlık yaşayan, iki seçenek arasında gidip gelen ve netlik bulmakta zorlanan kişiler için kullanılır."],
                  ["Wild Oat", "Hayat yönünü belirlemekte zorlanan, hangi yöne ilerleyeceğini bilemeyen kişilerle ilişkilidir."],
                ],
              },
              {
                title: "Bulunulan Duruma Yetersiz İlgi",
                supports:
                  "Anda kalmayı, yaşam enerjisini artırmayı ve motivasyonu destekler.",
                flowers: [
                  ["Clematis", "Hayal dünyasında yaşayan, sık sık dalıp giden ve düş kuran kişileri temsil eder."],
                  ["Chestnut Bud", "Deneyimlerinden yeterince ders alamayan ve aynı hataları tekrar eden kişiler için destekleyicidir."],
                  ["Honeysuckle", "Geçmişe bağlı yaşayan, eski zamanları özleyen ve zihinsel olarak geçmişte kalan kişilerle ilişkilidir."],
                  ["Olive", "Zihinsel ve fiziksel tükenmişlik, aşırı yorgunluk ve enerji düşüklüğü durumlarını temsil eder."],
                  ["Mustard", "Sebepsiz görünen derin hüzün, ani gelen duygusal çökkünlük halleriyle ilişkilidir."],
                  ["White Chestnut", "Zihinde sürekli tekrar eden düşünceler, zihinsel yoğunluk ve içsel gürültü durumlarında kullanılır."],
                  ["Wild Rose", "Duygusal donukluk, ilgisizlik, isteksizlik ve yaşamdan vazgeçmişlik hissini temsil eder."],
                ],
              },
              {
                title: "Yalnızlık",
                supports:
                  "Diğer canlılarla bağ kurmayı ve aidiyet hissini fark etmeyi destekler.",
                flowers: [
                  ["Heather", "Sürekli konuşma ihtiyacı duyan, yalnız kalmakta zorlanan ve başkalarının ilgisini sürekli arayan kişileri temsil eder."],
                  ["Impatiens", "Sabırsızlık, tahammülsüzlük ve alınganlık nedeniyle yalnız çalışmayı veya kendi başına olmayı tercih eden kişilerle ilişkilidir."],
                  ["Water Violet", "Kendi iç dünyasında huzurlu, bağımsız, sessiz ve mesafeli kişileri temsil eder; yalnızlığı bilinçli olarak seçebilir, içsel dengeye önem verirler."],
                ],
              },
              {
                title: "Etki ve Fikirlere Karşı Aşırı Duyarlılık",
                supports:
                  "Köklenmeyi, içsel gücü ve duygusal dayanıklılığı güçlendirmeyi destekler.",
                flowers: [
                  ["Agrimony", "Dışarıdan neşeli ve güler yüzlü görünürken, iç dünyasında çatışmalar yaşayan ve sorunlarını gizlemeyi tercih eden kişileri temsil eder."],
                  ["Centaury", "“Hayır” diyemeyen, başkalarının isteklerine kolayca boyun eğen ve kendi ihtiyaçlarını ihmal eden kişilerle ilişkilidir."],
                  ["Holly", "Öfke, kıskançlık, güvensizlik ve kin gibi yoğun duygular yaşayan; temelinde sevgi eksikliği hissi bulunan kişiler için kullanılır."],
                  ["Walnut", "Değişim dönemlerinde zorlanan, dış etkilere karşı hassas olan ve yeni koşullara uyum sağlamakta güçlük çeken kişileri temsil eder."],
                ],
              },
              {
                title: "Ümitsizlik ve Çaresizlik",
                supports:
                  "Yaşam amacını yeniden hatırlamayı ve yaşamdan keyif almayı destekler.",
                flowers: [
                  ["Crab Apple", "Kendinden hoşlanmama, öz eleştiri ve aşırı temizlik/takıntı eğilimleri olan kişilerle ilişkilidir."],
                  ["Elm", "Sorumluluk duygusu yüksek olup geçici olarak tükenmişlik ve “yetersizlik” hissi yaşayan kişiler için kullanılır."],
                  ["Larch", "Özgüven eksikliği yaşayan, kendini yetersiz hisseden ve denemekten çekinen kişilerle ilişkilidir."],
                  ["Oak", "Görev bilinciyle sürekli mücadele eden, dinlenmeden çalışan ve asla pes etmeyen güçlü yapıya rağmen yorulan kişileri temsil eder."],
                  ["Pine", "Kendini sürekli suçlayan, kontrol edemediği durumlar için bile sorumluluk hisseden kişilerle ilişkilidir."],
                  ["Star of Bethlehem", "Şok, travma, ani kötü haberler ve yas süreçlerinde yaşanan duygusal etkiler için kullanılır."],
                  ["Sweet Chestnut", "Yoğun çaresizlik, derin keder ve umutsuzluk hissinin zirve noktalarını temsil eder."],
                ],
              },
              {
                title: "Başkalarının İyiliğini Aşırı Önemseme",
                supports:
                  "Özsevgi, özşefkat ve kişisel sınırları koruma becerisini destekler.",
                flowers: [
                  ["Beech", "Hoşgörüsüz, eleştirel ve başkalarını kolayca yargılayan kişilerle ilişkilidir."],
                  ["Chicory", "Sevgisini karşılık bekleyerek gösteren, sevdiklerini duygusal olarak kendine bağımlı hale getirme eğiliminde olan kişiler için kullanılır."],
                  ["Rock Water", "Kendine karşı çok sert, mükemmeliyetçi, katı kurallara bağlı ve yaşamın keyiflerini kendine yasaklayan kişilerle ilişkilidir."],
                  ["Vervain", "Fikirlerine güçlü şekilde bağlı, adalet duygusu yüksek, idealist ve aşırı tutkulu (bazen fanatikleşebilen) kişiler için kullanılır."],
                  ["Vine", "Kontrolcü, yönlendirici, güçlü iradeli ve otoriter yapıda olan; liderlik gücünü baskın şekilde kullanan kişileri temsil eder."],
                ],
              },
            ].map((g) => (
              <details
                key={g.title}
                className="group rounded-2xl border border-plum/10 bg-cream p-5"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                  <span>
                    <span className="font-serif text-xl text-plum">{g.title}</span>
                    <span className="mt-1 block text-sm text-plum/60">
                      {g.supports}
                    </span>
                  </span>
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden
                    className="mt-1.5 h-5 w-5 shrink-0 fill-gold transition-transform group-open:rotate-180"
                  >
                    <path d="M7 10l5 5 5-5z" />
                  </svg>
                </summary>
                <ul className="mt-4 space-y-3 border-t border-plum/10 pt-4">
                  {g.flowers.map(([name, desc]) => (
                    <li key={name} className="flex gap-3 text-plum/75">
                      <span aria-hidden>🌿</span>
                      <span>
                        <span className="font-medium text-plum">{name}</span> — {desc}
                      </span>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </section>

        {/* Image gallery. To add/replace: drop a JPG in public/bach/ and add an
            entry below (and a credit in the "Görsel kaynakları" list further down). */}
        <section className="mx-auto max-w-4xl px-6 py-5">
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
        <section className="mx-auto max-w-4xl px-6 py-5">
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
        <section className="mx-auto max-w-3xl px-6 py-10 text-center">
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
