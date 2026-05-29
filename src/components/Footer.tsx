export default function Footer() {
  // PERSONALIZE: contact details and social links
  const email = "hello@serenehealing.com";
  const phone = "+1 (000) 000-0000";
  const address = "123 Tranquil Lane, Your City";
  const socials = [
    { label: "Instagram", href: "#" },
    { label: "Facebook", href: "#" },
  ];

  return (
    <footer id="contact" className="bg-plum text-cream/90">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-3">
        <div className="reveal">
          <a href="#top" className="flex items-center gap-2">
            <span className="text-gold text-xl">✦</span>
            <span className="font-serif text-2xl text-cream">Hale Bayramoğlu</span>
          </a>
          <p className="mt-4 max-w-xs leading-relaxed text-cream/70">
            Restoring balance to body, mind &amp; spirit — one gentle session at
            a time.
          </p>
        </div>

        <div className="reveal">
          <h4 className="mb-4 text-lg text-cream">Get in touch</h4>
          <ul className="space-y-3 text-cream/75">
            <li>
              <a href={`mailto:${email}`} className="hover:text-gold-light transition-colors">
                {email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${phone.replace(/[^+\d]/g, "")}`}
                className="hover:text-gold-light transition-colors"
              >
                {phone}
              </a>
            </li>
            <li>{address}</li>
          </ul>
        </div>

        <div className="reveal">
          <h4 className="mb-4 text-lg text-cream">Follow along</h4>
          <ul className="space-y-3 text-cream/75">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold-light transition-colors"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto max-w-6xl px-6 py-6 text-center text-sm text-cream/50">
          {/* PERSONALIZE: business name */}
          © {new Date().getFullYear()} Hale Bayramoğlu. Made with care.
        </div>
      </div>
    </footer>
  );
}
