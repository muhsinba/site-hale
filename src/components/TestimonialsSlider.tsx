"use client";

import { useEffect, useRef, useState } from "react";
import type { Testimonial } from "@prisma/client";

export default function TestimonialsSlider({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<Testimonial | null>(null);

  // Scroll the track by roughly one viewport of cards.
  function scrollByDir(dir: 1 | -1) {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  }

  // Close the popup on Escape, and lock background scroll while it's open.
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [active]);

  return (
    <div className="relative">
      {/* Arrows (hidden on touch-first small screens, where users just swipe) */}
      <button
        type="button"
        aria-label="Önceki"
        onClick={() => scrollByDir(-1)}
        className="absolute -left-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-cream p-3 text-plum shadow-md transition-colors hover:bg-cream-deep md:flex"
      >
        <ChevronLeft />
      </button>
      <button
        type="button"
        aria-label="Sonraki"
        onClick={() => scrollByDir(1)}
        className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-cream p-3 text-plum shadow-md transition-colors hover:bg-cream-deep md:flex"
      >
        <ChevronRight />
      </button>

      {/* Track */}
      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {testimonials.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActive(t)}
            className="reveal group flex w-64 shrink-0 snap-start flex-col rounded-3xl bg-cream-deep p-6 text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-md sm:w-72"
          >
            <span className="font-serif text-4xl leading-none text-gold/50">
              &ldquo;
            </span>
            <blockquote className="-mt-1 line-clamp-4 flex-1 text-base italic leading-relaxed text-plum/80">
              {t.quote}
            </blockquote>
            <figcaption className="mt-4 text-sm font-medium uppercase tracking-wide text-purple">
              {t.author}
            </figcaption>
            <span className="mt-3 text-xs font-medium text-purple/70 transition-colors group-hover:text-purple">
              Devamını oku →
            </span>
          </button>
        ))}
      </div>

      {/* Popup */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${active.author} yorumu`}
          onClick={() => setActive(null)}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-plum/50 p-6 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[80vh] w-full max-w-lg flex-col rounded-3xl bg-cream p-8 shadow-2xl"
          >
            <button
              type="button"
              aria-label="Kapat"
              onClick={() => setActive(null)}
              className="absolute right-4 top-4 z-10 rounded-full bg-cream p-2 text-plum/50 transition-colors hover:bg-plum/5 hover:text-plum"
            >
              <CloseIcon />
            </button>
            {/* Scroll lives on this inner area, with right padding so the
                scrollbar sits inside the card rather than on its rounded edge. */}
            <div className="min-h-0 overflow-y-auto pr-3">
              <span className="font-serif text-6xl leading-none text-gold/40">
                &ldquo;
              </span>
              <blockquote className="-mt-3 text-xl italic leading-relaxed text-plum/85">
                {active.quote}
              </blockquote>
              <figcaption className="mt-6 text-sm font-medium uppercase tracking-wide text-purple">
                — {active.author}
              </figcaption>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ChevronLeft() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2" aria-hidden="true">
      <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2" aria-hidden="true">
      <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}
