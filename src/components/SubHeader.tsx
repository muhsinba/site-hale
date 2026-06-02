"use client";

import { useState } from "react";
import Link from "next/link";

// Links point back to the home page sections, so they work from any sub-page.
const links = [
  { href: "/#about", label: "Hakkımda" },
  { href: "/#services", label: "Çalışmalarım" },
  { href: "/#testimonials", label: "Hikayeler" },
  { href: "/#contact", label: "İletişim" },
];

// Sticky top bar for detail pages (Bach, SCIO, …). Unlike the home Header it
// sits on a solid cream background (no dark hero behind it), and its nav links
// jump back to the home page's sections.
export default function SubHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-plum/10 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-gold text-xl">✦</span>
          <span className="font-serif text-xl text-plum">Hale Bayramoğlu</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 text-sm md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-plum/80 transition-colors hover:text-purple"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/#book"
            className="rounded-full bg-gold px-5 py-2 font-medium text-plum transition-transform hover:scale-[1.03]"
          >
            Randevu Al
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="flex flex-col gap-1.5 p-2 md:hidden"
          aria-label="Menüyü aç/kapat"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span
            className={`block h-0.5 w-6 bg-plum transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-plum transition-opacity ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-plum transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <ul className="mx-4 mb-3 flex flex-col gap-1 rounded-2xl bg-cream p-4 shadow-lg md:hidden">
          {[...links, { href: "/#book", label: "Randevu Al" }].map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 text-plum transition-colors hover:bg-cream-deep"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
