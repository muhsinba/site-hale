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

  // Flags read by the animation loop (refs so it never needs to restart).
  const hoverRef = useRef(false);
  const cooldownRef = useRef(false); // brief pause after an arrow nudge
  const activeRef = useRef(false); // popup open

  // Auto-scroll + duplicate the list only when there's more than one card.
  const loop = testimonials.length > 1;
  const cards = loop ? [...testimonials, ...testimonials] : testimonials;

  useEffect(() => {
    activeRef.current = active !== null;
  }, [active]);

  // Continuous gentle drift via requestAnimationFrame. The list is duplicated,
  // so wrapping at the half-way point (one copy width) is seamless.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || !loop) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let last = 0;
    const speed = 28; // px per second
    const tick = (now: number) => {
      if (last) {
        const half = el.scrollWidth / 2;
        if (half > 0 && !cooldownRef.current) {
          if (!hoverRef.current && !activeRef.current) {
            el.scrollLeft += (speed * (now - last)) / 1000;
          }
          if (el.scrollLeft >= half) el.scrollLeft -= half;
          else if (el.scrollLeft < 0) el.scrollLeft += half;
        }
      }
      last = now;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [loop]);

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

  // Arrow nudge: smooth-scroll by ~one card and briefly pause the auto-drift.
  function nudge(dir: 1 | -1) {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector("button") as HTMLElement | null;
    const step = card ? card.offsetWidth + 20 /* mr-5 */ : el.clientWidth * 0.6;
    cooldownRef.current = true;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
    window.setTimeout(() => {
      cooldownRef.current = false;
    }, 650);
  }

  return (
    <div className="relative px-[10vw]">
      {loop && (
        <>
          <button
            type="button"
            aria-label="Önceki"
            onClick={() => nudge(-1)}
            className="absolute left-[10vw] top-1/2 z-10 ml-1 -translate-y-1/2 rounded-full bg-cream p-3 text-plum shadow-md transition-colors hover:bg-cream-deep"
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            aria-label="Sonraki"
            onClick={() => nudge(1)}
            className="absolute right-[10vw] top-1/2 z-10 mr-1 -translate-y-1/2 rounded-full bg-cream p-3 text-plum shadow-md transition-colors hover:bg-cream-deep"
          >
            <ChevronRight />
          </button>
        </>
      )}

      <div
        ref={scrollerRef}
        onMouseEnter={() => {
          hoverRef.current = true;
        }}
        onMouseLeave={() => {
          hoverRef.current = false;
        }}
        onFocusCapture={() => {
          hoverRef.current = true;
        }}
        onBlurCapture={() => {
          hoverRef.current = false;
        }}
        className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex w-max">
          {cards.map((t, i) => {
            const isClone = loop && i >= testimonials.length;
            return (
              <button
                key={`${t.id}-${i}`}
                type="button"
                onClick={() => setActive(t)}
                aria-hidden={isClone || undefined}
                tabIndex={isClone ? -1 : undefined}
                className="group mr-5 flex w-64 shrink-0 flex-col rounded-3xl bg-cream-deep p-6 text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-md sm:w-72"
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
            );
          })}
        </div>
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
