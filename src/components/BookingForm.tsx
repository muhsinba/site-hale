"use client";

import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { createBooking, type BookingState } from "@/app/actions";
import { trackEvent, takeBookingOrigin } from "@/lib/analytics";

const initialState: BookingState = { status: "idle", message: "" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-gold px-8 py-3.5 font-medium text-plum shadow-lg transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Gönderiliyor…" : "Talep Gönder"}
    </button>
  );
}

export default function BookingForm({ services }: { services: string[] }) {
  const [state, formAction] = useActionState(createBooking, initialState);
  const [service, setService] = useState(services[0]);

  // Preselect a service when arriving via e.g. /?service=Astrolojik%20Bakış#book.
  // Reads window.location, so it must run on the client after mount (not during SSR).
  useEffect(() => {
    const wanted = new URLSearchParams(window.location.search).get("service");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only URL preselect
    if (wanted && services.includes(wanted)) setService(wanted);
  }, [services]);

  // The conversion: fire once the booking request is accepted. Mark
  // `booking_submit` as a Key Event in GA4 to track it as a conversion. `location`
  // carries the originating "Randevu Al" button/page (from the prior randevu_click),
  // so the funnel can attribute bookings back to where they started.
  useEffect(() => {
    if (state.status === "success") {
      const location = takeBookingOrigin();
      trackEvent("booking_submit", { service, ...(location ? { location } : {}) });
    }
  }, [state.status, service]);

  if (state.status === "success") {
    return (
      <div className="reveal mx-auto max-w-xl rounded-3xl bg-cream p-10 text-center shadow-lg">
        <div className="mb-4 text-4xl">🌿</div>
        <h3 className="text-2xl text-plum">{state.message}</h3>
        <p className="mt-3 text-plum/70">
          Gelen kutunuzu takip edin — yanıt yolda.
        </p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="reveal mx-auto max-w-xl rounded-3xl bg-cream p-8 shadow-lg md:p-10"
    >
      {/* Honeypot (hidden from humans) */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px]"
        aria-hidden="true"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Adınız">
          <input
            type="text"
            name="name"
            required
            placeholder="Ayşe Yılmaz"
            className="input"
          />
        </Field>
        <Field label="E-posta">
          <input
            type="email"
            name="email"
            required
            placeholder="ayse@ornek.com"
            className="input"
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field label="İlgilendiğiniz çalışma">
          <select
            name="service"
            className="input"
            value={service}
            onChange={(e) => setService(e.target.value)}
          >
            {services.map((s) => (
              <option key={s}>{s}</option>
            ))}
            <option>Henüz emin değilim</option>
          </select>
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Ne arıyorsunuz? (isteğe bağlı)">
          <textarea
            name="message"
            rows={4}
            placeholder="Sizi buraya getiren şey hakkında birkaç kelime…"
            className="input resize-none"
          />
        </Field>
      </div>

      {state.status === "error" && (
        <p className="mt-4 text-sm text-rose">{state.message}</p>
      )}

      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        <SubmitButton />
        <a
          href="tel:+905422920324"
          onClick={() => trackEvent("phone_click", { location: "booking_form" })}
          aria-label="Telefonla ara: 0542 292 03 24"
          className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-8 py-3.5 font-medium text-white shadow-lg transition-all hover:scale-[1.03] hover:bg-emerald-700"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          0542 292 03 24
        </a>
      </div>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-plum/80">
        {label}
      </span>
      {children}
    </label>
  );
}
