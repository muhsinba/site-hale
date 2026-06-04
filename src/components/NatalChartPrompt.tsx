"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

// A one-time nudge on the landing page toward the (most-visited) birth-chart tool.
// Shows immediately on load (once per browsing session) as a blocking modal. "Evet" →
// the chart page; dismiss (button / ✕ / backdrop / Esc) closes it and the page continues.
const SEEN_KEY = "natalPromptSeen";
const TARGET = "/astrolojik-bakis/dogum-haritasi";

export default function NatalChartPrompt() {
  const [open, setOpen] = useState(false);

  // Show once per session, as soon as the component mounts (no delay).
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {
      /* storage unavailable — just show it */
    }
    if (seen) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional show-on-mount
    setOpen(true);
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* non-fatal */
    }
    trackEvent("natal_prompt_shown");
  }, []);

  // Lock background scroll while the modal is open (true blocking modal).
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Close on Escape while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function dismiss() {
    setOpen(false);
    trackEvent("natal_prompt_dismiss");
  }
  function accept() {
    trackEvent("natal_prompt_accept");
    setOpen(false); // the <Link> handles navigation
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="natal-prompt-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
      {/* Backdrop — clicking it dismisses */}
      <button
        aria-label="Kapat"
        onClick={dismiss}
        className="absolute inset-0 cursor-default bg-plum/60 backdrop-blur-sm"
      />

      {/* Card */}
      <div className="relative w-full max-w-md rounded-3xl bg-cream p-7 text-center shadow-2xl ring-1 ring-plum/10 md:p-9">
        <button
          onClick={dismiss}
          aria-label="Kapat"
          className="absolute right-4 top-4 text-lg text-plum/40 transition-colors hover:text-purple"
        >
          ✕
        </button>

        <div aria-hidden className="mx-auto mb-3 text-4xl text-gold">
          ✶
        </div>
        <h2 id="natal-prompt-title" className="text-2xl leading-snug text-plum md:text-[1.7rem]">
          Doğum haritanı kontrol ederek başlamak ister misin?
        </h2>
        <p className="mt-3 leading-relaxed text-plum/70">
          Birkaç saniyede doğum haritanın çarkını oluştur; gökyüzünün sana özel
          fotoğrafına nazik bir bakış at. ✨
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href={TARGET}
            onClick={accept}
            className="rounded-full bg-gold px-7 py-3 font-medium text-plum shadow-lg transition-transform hover:scale-[1.03]"
          >
            Evet, başlayalım
          </Link>
          <button
            onClick={dismiss}
            className="rounded-full px-7 py-3 font-medium text-plum/70 ring-1 ring-plum/15 transition-colors hover:bg-plum/5"
          >
            Şimdi değil
          </button>
        </div>
      </div>
    </div>
  );
}
