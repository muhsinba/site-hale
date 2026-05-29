import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="bg-cream py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2 md:gap-16">
        {/* Photo */}
        <div className="reveal">
          {/* PERSONALIZE: portrait lives at /public/haleprofile.jpg */}
          <Image
            src="/haleprofile.jpg"
            alt="Hale Bayramoğlu portresi"
            width={560}
            height={700}
            priority
            className="mx-auto aspect-[4/5] w-full max-w-sm rounded-[2rem] object-cover shadow-xl"
          />
        </div>

        {/* Text */}
        <div className="reveal">
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-gold">
            Hikayem
          </p>
          {/* PERSONALIZE: her name */}
          <h2 className="text-4xl md:text-5xl">
            Merhaba, ben <span className="italic text-purple">Hale Bayramoğlu</span>
          </h2>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-plum/80">
            <p>
              21 yılı aşkın süredir, yaşamında denge, huzur ve içsel dönüşüm
              arayan insanların yolculuğuna eşlik ediyorum. Çalışmalarımda; beden,
              zihin ve ruhun ayrılmaz bütünlüğünü esas alan enerji terapileri,
              frekans çalışmaları ve bütünsel şifa yaklaşımlarıyla danışanlarıma
              nazik, güvenli ve derinleştirici bir alan sunuyorum.
            </p>
            <p>
              Her bireyin özünde taşıdığı denge, bilgelik ve iyileşme
              potansiyeline inanıyorum. Bu nedenle her seansı; yalnızca size özel
              olarak tutulan, yargısız, şefkatli ve farkındalık odaklı bir deneyim
              olarak tasarlıyorum. Bu alanda; bırakmaya, yumuşamaya, dönüşmeye ve
              özünüzde her zaman var olan bütünlüğü yeniden hatırlamaya
              davetlisiniz.
            </p>
            <p>
              Yaklaşımım; sezgisel rehberlik, bilinç farkındalığı ve enerjetik
              dengeleme çalışmalarını bir araya getirerek hem duygusal hem
              zihinsel hem de ruhsal düzeyde destek sunmayı amaçlar. Amacım,
              danışanların kendi iç kaynaklarıyla yeniden bağlantı kurmalarına ve
              yaşamlarında daha yüksek bir uyum hissi oluşturmalarına katkı
              sağlamaktır.
            </p>
          </div>
          <ul className="mt-8 space-y-3">
            {[
              "Sertifikalı Holistik Şifa Eğitimcisi",
              "SCIO Quantum Biofeedback Frekans Seansları Uygulayıcısı",
              "21+ yıllık bütünsel şifa ve dönüşüm deneyimi",
            ].map((c) => (
              <li key={c} className="flex items-center gap-3 text-plum/80">
                <span className="text-gold">✦</span>
                {c}
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <h3 className="text-2xl text-purple">Uzmanlık ve Çalışma Alanları</h3>
            <ul className="mt-4 space-y-3">
              {[
                "Bach Çiçekleri Terapisi",
                "Bireysel Farkındalık ve Dönüşüm Seansları",
                "Enerji Dengeleme ve Frekans Çalışmaları",
                "“Ciddiyetten Eğlenceye” Atölye Programı",
                "Bilinç, farkındalık ve içsel dönüşüm odaklı rehberlik çalışmaları",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-plum/80">
                  <span className="mt-1 text-gold">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
