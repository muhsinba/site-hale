"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

// A drop-in for <Link> (or an external <a> when `external`) that fires a GA4
// event on click. Lets Server Components emit click events without each one
// becoming a Client Component. Defaults the event to "randevu_click".
type TrackedLinkProps = {
  href: string;
  location: string;
  service?: string;
  event?: string;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
};

export default function TrackedLink({
  href,
  location,
  service,
  event = "randevu_click",
  external = false,
  className,
  children,
}: TrackedLinkProps) {
  const fire = () =>
    trackEvent(event, { location, ...(service ? { service } : {}) });

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={fire}
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} onClick={fire} className={className}>
      {children}
    </Link>
  );
}
