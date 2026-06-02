"use client";

import { useRef } from "react";
import { TURKEY_CITIES as CITIES } from "@/lib/turkeyCities";
import { formatDateInput, fromISODate, toISODate, type PersonFields } from "./birthData";

const input = "w-full rounded-xl border border-plum/15 bg-white px-4 py-3 text-plum outline-none focus:border-purple";
const label = "mb-1 block text-sm font-medium text-plum/80";

type Props = {
  value: PersonFields;
  onChange: (next: PersonFields) => void;
  idPrefix: string;
};

// Shared birth-data fieldset (date / time / place) used by every chart form.
export default function BirthDataFields({ value, onChange, idPrefix }: Props) {
  const dateRef = useRef<HTMLInputElement>(null);
  const set = (patch: Partial<PersonFields>) => onChange({ ...value, ...patch });
  const custom = value.cityIdx === "custom";

  function openDatePicker() {
    const el = dateRef.current as (HTMLInputElement & { showPicker?: () => void }) | null;
    if (!el) return;
    if (typeof el.showPicker === "function") el.showPicker();
    else el.focus();
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div>
        <label htmlFor={`${idPrefix}-date`} className={label}>Doğum tarihi</label>
        <div className="relative">
          <input
            id={`${idPrefix}-date`} type="text" inputMode="numeric" required placeholder="gg/aa/yyyy"
            maxLength={10} value={value.date}
            onChange={(e) => set({ date: formatDateInput(e.target.value) })}
            className={`${input} pr-12`}
          />
          <button
            type="button" onClick={openDatePicker} aria-label="Takvimden seç"
            className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-plum/45 transition-colors hover:text-purple"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <rect x="3" y="4.5" width="18" height="16" rx="2.5" />
              <path d="M3 9h18M8 2.5v4M16 2.5v4" />
            </svg>
          </button>
          <input
            ref={dateRef} type="date" tabIndex={-1} aria-hidden min="1900-01-01" max="2100-12-31"
            value={toISODate(value.date)}
            onChange={(e) => set({ date: fromISODate(e.target.value) })}
            className="pointer-events-none absolute bottom-0 right-3 h-0 w-0 opacity-0"
          />
        </div>
      </div>

      <div>
        <label htmlFor={`${idPrefix}-time`} className={label}>Doğum saati</label>
        <input id={`${idPrefix}-time`} type="time" value={value.time} onChange={(e) => set({ time: e.target.value })} className={input} />
      </div>

      <div className={custom ? "" : "sm:col-span-2"}>
        <label htmlFor={`${idPrefix}-city`} className={label}>Doğum yeri</label>
        <select id={`${idPrefix}-city`} value={value.cityIdx} onChange={(e) => set({ cityIdx: e.target.value })} className={input}>
          {CITIES.map((c, i) => (
            <option key={c.name} value={i}>{c.name}</option>
          ))}
          <option value="custom">Diğer (enlem/boylam gir)</option>
        </select>
      </div>

      {custom && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor={`${idPrefix}-lat`} className={label}>Enlem</label>
            <input id={`${idPrefix}-lat`} type="number" step="any" placeholder="41.0082" value={value.lat} onChange={(e) => set({ lat: e.target.value })} className={input} />
          </div>
          <div>
            <label htmlFor={`${idPrefix}-lon`} className={label}>Boylam</label>
            <input id={`${idPrefix}-lon`} type="number" step="any" placeholder="28.9784" value={value.lon} onChange={(e) => set({ lon: e.target.value })} className={input} />
          </div>
        </div>
      )}
    </div>
  );
}
