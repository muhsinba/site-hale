export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-plum via-plum-soft to-purple text-cream"
    >
      {/* Soft radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/3 left-1/2 h-[80vh] w-[80vh] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--color-gold) 0%, transparent 60%)",
        }}
      />
      {/* Faint texture dots */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(var(--color-gold-light) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <p className="reveal mb-6 text-sm uppercase tracking-[0.25em] text-gold-light">
          Enerji Şifası · Reiki · Bütünsel İyilik
        </p>
        {/* PERSONALIZE: main headline */}
        <h1 className="reveal text-5xl leading-tight sm:text-6xl md:text-7xl">
          Yolculuğunuza başlayın,
          <br />
          <span className="italic text-gold-light">dengeye dönün</span>
        </h1>
        <p className="reveal mx-auto mt-8 max-w-xl text-lg leading-relaxed text-cream/85">
          Artık size hizmet etmeyeni bırakmanız, enerjinizi yenilemeniz ve
          gerçek benliğinizle yeniden bağ kurmanız için nazik, sezgisel şifa
          seansları.
        </p>
        <div className="reveal mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#book"
            className="rounded-full bg-gold px-8 py-3.5 font-medium text-plum shadow-lg transition-transform hover:scale-105"
          >
            Randevu Al
          </a>
          <a
            href="#services"
            className="rounded-full border border-cream/40 px-8 py-3.5 text-cream transition-colors hover:bg-cream/10"
          >
            Hizmetleri Keşfet
          </a>
        </div>
      </div>

      <a
        href="#about"
        aria-label="Aşağı kaydır"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-2xl text-cream/60"
      >
        ⌄
      </a>
    </section>
  );
}
