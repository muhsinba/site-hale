"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#about", label: "Hakkımda" },
  { href: "#services", label: "Hizmetler" },
  { href: "#testimonials", label: "Hikayeler" },
  { href: "#contact", label: "İletişim" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cream/90 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="mx-auto max-w-6xl px-6 flex items-center justify-between">
        {/* PERSONALIZE: brand name */}
        <a
          href="#top"
          className={`flex items-center gap-2 transition-colors ${
            scrolled ? "text-plum" : "text-cream"
          }`}
        >
          <span className="text-gold text-xl">✦</span>
          <span className="font-serif text-xl tracking-wide">Hale Bayramoğlu</span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8 text-sm">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`transition-colors ${
                  scrolled
                    ? "text-plum/80 hover:text-purple"
                    : "text-cream/90 hover:text-gold-light"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#book"
              className={`rounded-full px-5 py-2.5 transition-colors ${
                scrolled
                  ? "bg-purple text-cream hover:bg-plum-soft"
                  : "bg-gold text-plum hover:bg-gold-light"
              }`}
            >
              Randevu Al
            </a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menüyü aç/kapat"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {(() => {
            // Light bars over the hero; dark bars once scrolled. When the menu
            // is open it sits on a cream panel, so keep the bars dark.
            const bar = scrolled || open ? "bg-plum" : "bg-cream";
            return (
              <>
                <span
                  className={`block h-0.5 w-6 ${bar} transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
                />
                <span
                  className={`block h-0.5 w-6 ${bar} transition-opacity ${open ? "opacity-0" : ""}`}
                />
                <span
                  className={`block h-0.5 w-6 ${bar} transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
                />
              </>
            );
          })()}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <ul className="md:hidden mt-3 mx-4 rounded-2xl bg-cream shadow-lg p-4 flex flex-col gap-1">
          {[...links, { href: "#book", label: "Randevu Al" }].map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 text-plum hover:bg-cream-deep transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
