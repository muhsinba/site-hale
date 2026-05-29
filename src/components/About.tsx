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
            alt="Portrait of Hale Bayramoğlu"
            width={560}
            height={700}
            priority
            className="mx-auto aspect-[4/5] w-full max-w-sm rounded-[2rem] object-cover shadow-xl"
          />
        </div>

        {/* Text */}
        <div className="reveal">
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-gold">
            My Story
          </p>
          {/* PERSONALIZE: her name */}
          <h2 className="text-4xl md:text-5xl">
            Hello, I&apos;m <span className="italic text-purple">[Her Name]</span>
          </h2>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-plum/80">
            <p>
              For over a decade I&apos;ve walked alongside people seeking healing
              — guiding them gently through energy work, Reiki, and holistic
              practices that honor the body, mind, and spirit as one.
            </p>
            <p>
              My approach is rooted in deep presence and compassion. Each session
              is a sacred space, held just for you, where you are free to soften,
              release, and remember the wholeness that has always been within you.
            </p>
          </div>
          <ul className="mt-8 space-y-3">
            {/* PERSONALIZE: real credentials / certifications */}
            {[
              "Certified Reiki Master & Energy Practitioner",
              "Trained in Holistic & Alternative Wellness",
              "10+ years guiding clients toward balance",
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
