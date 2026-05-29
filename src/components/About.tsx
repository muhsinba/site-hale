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
              On yılı aşkın süredir şifa arayan insanların yanında yürüyorum —
              onlara beden, zihin ve ruhu bir bütün olarak onurlandıran enerji
              çalışmaları, Reiki ve bütünsel uygulamalarla nazikçe rehberlik
              ediyorum.
            </p>
            <p>
              Yaklaşımım derin bir farkındalık ve şefkate dayanır. Her seans,
              yalnızca sizin için tutulan kutsal bir alandır; burada yumuşamakta,
              bırakmakta ve içinizde hep var olan bütünlüğü yeniden hatırlamakta
              özgürsünüz.
            </p>
          </div>
          <ul className="mt-8 space-y-3">
            {/* PERSONALIZE: real credentials / certifications */}
            {[
              "Sertifikalı Reiki Ustası ve Enerji Uygulayıcısı",
              "Bütünsel ve Alternatif İyilik Eğitimi Almış",
              "10+ yıldır danışanlara dengeye giden yolda rehberlik ediyor",
            ].map((c) => (
              <li key={c} className="flex items-center gap-3 text-plum/80">
                <span className="text-gold">✦</span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
