"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { buildNatalChartSvg, PLANET_GLYPHS, type ChartData } from "@/lib/natalChart";
import { TURKEY_CITIES as CITIES } from "@/lib/turkeyCities";

const SIGNS_TR = ["Koç", "Boğa", "İkizler", "Yengeç", "Aslan", "Başak", "Terazi", "Akrep", "Yay", "Oğlak", "Kova", "Balık"];
const PLANET_TR: Record<string, string> = {
  sun: "Güneş", moon: "Ay", mercury: "Merkür", venus: "Venüs", mars: "Mars",
  jupiter: "Jüpiter", saturn: "Satürn", uranus: "Uranüs", neptune: "Neptün", pluto: "Plüton", chiron: "Chiron",
};

type Result = {
  svg: string;
  ascSign: string;
  items: { name: string; glyph: string; sign: string; deg: number }[];
  approxTime: boolean;
};

const input = "w-full rounded-xl border border-plum/15 bg-white px-4 py-3 text-plum outline-none focus:border-purple";
const label = "mb-1 block text-sm font-medium text-plum/80";

// Auto-format free text into dd/mm/yyyy as the user types.
function formatDateInput(v: string): string {
  const s = v.replace(/\D/g, "").slice(0, 8);
  return [s.slice(0, 2), s.slice(2, 4), s.slice(4, 8)].filter(Boolean).join("/");
}

// dd/mm/yyyy -> yyyy-mm-dd (native <input type="date"> value), or "" if incomplete.
function toISODate(v: string): string {
  const m = v.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  return m ? `${m[3]}-${m[2]}-${m[1]}` : "";
}

// yyyy-mm-dd (from the picker) -> dd/mm/yyyy, or "" if incomplete.
function fromISODate(v: string): string {
  const [y, m, d] = v.split("-");
  return y && m && d ? `${d}/${m}/${y}` : "";
}

export default function BirthChartForm() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [cityIdx, setCityIdx] = useState(String(CITIES.findIndex((c) => c.name === "İstanbul")));
  const dateRef = useRef<HTMLInputElement>(null);

  function openDatePicker() {
    const el = dateRef.current as (HTMLInputElement & { showPicker?: () => void }) | null;
    if (!el) return;
    if (typeof el.showPicker === "function") el.showPicker();
    else el.focus();
  }
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  const custom = cityIdx === "custom";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!date) {
      setError("Lütfen doğum tarihinizi girin.");
      return;
    }
    let latitude: number, longitude: number;
    if (custom) {
      latitude = Number(lat);
      longitude = Number(lon);
      if (!Number.isFinite(latitude) || !Number.isFinite(longitude) || Math.abs(latitude) > 90 || Math.abs(longitude) > 180) {
        setError("Lütfen geçerli bir enlem ve boylam girin.");
        return;
      }
    } else {
      const c = CITIES[Number(cityIdx)];
      latitude = c.lat;
      longitude = c.lon;
    }

    const dm = date.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (!dm) {
      setError("Lütfen doğum tarihini gg/aa/yyyy biçiminde girin.");
      return;
    }
    const d = Number(dm[1]), m = Number(dm[2]), y = Number(dm[3]);
    if (d < 1 || d > 31 || m < 1 || m > 12 || y < 1900 || y > 2100) {
      setError("Lütfen geçerli bir doğum tarihi girin.");
      return;
    }
    const approxTime = !time;
    const [hh, mm] = (time || "12:00").split(":").map(Number);

    setLoading(true);
    try {
      const { Origin, Horoscope } = await import("circular-natal-horoscope-js");
      const origin = new Origin({ year: y, month: m - 1, date: d, hour: hh, minute: mm, latitude, longitude });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const h: any = new Horoscope({ origin, houseSystem: "placidus", zodiac: "tropical", aspectTypes: ["major"] });

      const asc: number = h.Ascendant.ChartPosition.Ecliptic.DecimalDegrees;
      const cusps: number[] = h.Houses.map((x: { ChartPosition: { StartPosition: { Ecliptic: { DecimalDegrees: number } } } }) =>
        x.ChartPosition.StartPosition.Ecliptic.DecimalDegrees
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const bodies = h.CelestialBodies.all.filter((b: any) => b && b.label && PLANET_GLYPHS[b.label.toLowerCase()]);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const planets = bodies.map((b: any) => ({
        glyph: PLANET_GLYPHS[b.label.toLowerCase()],
        lon: b.ChartPosition.Ecliptic.DecimalDegrees as number,
      }));

      const data: ChartData = { ascendant: asc, cusps, planets };
      const svg = buildNatalChartSvg(data);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const items = bodies.map((b: any) => {
        const lonDeg: number = b.ChartPosition.Ecliptic.DecimalDegrees;
        const key = b.label.toLowerCase();
        return {
          name: PLANET_TR[key] ?? b.label,
          glyph: PLANET_GLYPHS[key],
          sign: SIGNS_TR[Math.floor(lonDeg / 30) % 12],
          deg: Math.floor(lonDeg % 30),
        };
      });

      setResult({ svg, ascSign: SIGNS_TR[Math.floor(asc / 30) % 12], items, approxTime });
    } catch (err) {
      console.error(err);
      setError("Harita oluşturulurken bir sorun oluştu. Lütfen bilgileri kontrol edip tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="bc-date" className={label}>Doğum tarihi</label>
          <div className="relative">
            <input id="bc-date" type="text" inputMode="numeric" required placeholder="gg/aa/yyyy" maxLength={10} value={date} onChange={(e) => setDate(formatDateInput(e.target.value))} className={`${input} pr-12`} />
            <button
              type="button"
              onClick={openDatePicker}
              aria-label="Takvimden seç"
              className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-plum/45 transition-colors hover:text-purple"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <rect x="3" y="4.5" width="18" height="16" rx="2.5" />
                <path d="M3 9h18M8 2.5v4M16 2.5v4" />
              </svg>
            </button>
            <input
              ref={dateRef}
              type="date"
              tabIndex={-1}
              aria-hidden
              min="1900-01-01"
              max="2100-12-31"
              value={toISODate(date)}
              onChange={(e) => setDate(fromISODate(e.target.value))}
              className="pointer-events-none absolute bottom-0 right-3 h-0 w-0 opacity-0"
            />
          </div>
        </div>
        <div>
          <label htmlFor="bc-time" className={label}>Doğum saati</label>
          <input id="bc-time" type="time" value={time} onChange={(e) => setTime(e.target.value)} className={input} />
        </div>
        <div className={custom ? "" : "sm:col-span-2"}>
          <label htmlFor="bc-city" className={label}>Doğum yeri</label>
          <select id="bc-city" value={cityIdx} onChange={(e) => setCityIdx(e.target.value)} className={input}>
            {CITIES.map((c, i) => (
              <option key={c.name} value={i}>{c.name}</option>
            ))}
            <option value="custom">Diğer (enlem/boylam gir)</option>
          </select>
        </div>
        {custom && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="bc-lat" className={label}>Enlem</label>
              <input id="bc-lat" type="number" step="any" placeholder="41.0082" value={lat} onChange={(e) => setLat(e.target.value)} className={input} />
            </div>
            <div>
              <label htmlFor="bc-lon" className={label}>Boylam</label>
              <input id="bc-lon" type="number" step="any" placeholder="28.9784" value={lon} onChange={(e) => setLon(e.target.value)} className={input} />
            </div>
          </div>
        )}
        <div className="flex justify-center sm:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-gold px-8 py-3.5 font-medium text-plum shadow-lg transition-transform hover:scale-[1.03] disabled:opacity-60"
          >
            {loading ? "Oluşturuluyor…" : "Haritamı Oluştur"}
          </button>
        </div>
      </form>

      {error && <p className="mt-4 rounded-2xl bg-rose/15 p-3 text-sm text-rose">{error}</p>}

      {result && (
        <div className="mt-8">
          <div className="mx-auto max-w-[460px]" dangerouslySetInnerHTML={{ __html: result.svg }} />
          <p className="mt-6 text-center text-lg text-plum">
            Yükselen burcunuz:{" "}
            <span className="font-medium text-purple">{result.ascSign}</span>
            {result.approxTime && (
              <span className="block text-sm text-plum/50">
                (Saat girilmediği için 12:00 varsayıldı; yükselen yaklaşıktır.)
              </span>
            )}
          </p>
          <ul className="mx-auto mt-5 grid max-w-md grid-cols-2 gap-x-6 gap-y-2 text-plum/80">
            {result.items.map((it) => (
              <li key={it.name} className="flex items-center gap-2">
                <span aria-hidden className="text-purple">{it.glyph}</span>
                <span>{it.name}: <span className="text-plum/60">{it.sign} {it.deg}°</span></span>
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-6 max-w-xl text-center text-sm font-bold leading-relaxed text-red-600">
            Bu harita, gezegen konumlarına dayalı otomatik bir özettir. Haritanızın
            derinlemesine ve kişiye özel yorumu için bir seans alabilirsiniz.
          </p>
          <div className="mt-6 text-center">
            <Link
              href={`/?service=${encodeURIComponent("Astrolojik Bakış")}#book`}
              onClick={() =>
                trackEvent("randevu_click", {
                  location: "natal_chart_result",
                  service: "Astrolojik Bakış",
                })
              }
              className="inline-block rounded-full bg-gold px-8 py-3.5 font-medium text-plum shadow-lg transition-transform hover:scale-[1.03]"
            >
              Randevu Al
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
