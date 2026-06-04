// Minimal GA4 event helper. Safe to call from anywhere:
//   - no-op during SSR (no `window`)
//   - no-op if gtag hasn't loaded yet (e.g. blocked by an ad-blocker)
// Events show up in GA4 under Reports → Engagement → Events.
type GtagFn = (
  command: "event",
  eventName: string,
  params?: Record<string, unknown>,
) => void;

// sessionStorage key holding where the current booking journey started.
const BOOKING_ORIGIN_KEY = "rdv_from";

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  // Remember which "Randevu Al" button/page started a booking journey so the eventual
  // booking_submit can be attributed back to its origin. sessionStorage survives the
  // navigation to the booking form and is scoped to this tab.
  if (name === "randevu_click" && typeof params?.location === "string") {
    try {
      sessionStorage.setItem(BOOKING_ORIGIN_KEY, params.location);
    } catch {
      /* storage unavailable (private mode etc.) — non-fatal */
    }
  }
  const gtag = (window as unknown as { gtag?: GtagFn }).gtag;
  gtag?.("event", name, params);
}

// Read and clear the booking origin recorded by the most recent randevu_click.
// Returns null when the form was reached without clicking a "Randevu Al" button.
export function takeBookingOrigin(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const v = sessionStorage.getItem(BOOKING_ORIGIN_KEY);
    if (v) sessionStorage.removeItem(BOOKING_ORIGIN_KEY);
    return v;
  } catch {
    return null;
  }
}
