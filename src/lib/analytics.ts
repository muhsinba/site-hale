// Minimal GA4 event helper. Safe to call from anywhere:
//   - no-op during SSR (no `window`)
//   - no-op if gtag hasn't loaded yet (e.g. blocked by an ad-blocker)
// Events show up in GA4 under Reports → Engagement → Events.
type GtagFn = (
  command: "event",
  eventName: string,
  params?: Record<string, unknown>,
) => void;

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: GtagFn }).gtag;
  gtag?.("event", name, params);
}
