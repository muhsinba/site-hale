"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { createBooking, type BookingState } from "@/app/actions";

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
        <Field label="İlgilendiğiniz hizmet">
          <select name="service" className="input" defaultValue={services[0]}>
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

      <div className="mt-7 flex justify-center">
        <SubmitButton />
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
