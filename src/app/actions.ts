"use server";

import { Resend } from "resend";
import { prisma } from "@/lib/prisma";

export type BookingState = {
  status: "idle" | "success" | "error";
  message: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Where booking notifications land, and who they appear to be from.
// Overridable via env so prod can use a branded sender later without a code change.
const NOTIFY_TO =
  process.env.BOOKING_NOTIFY_EMAIL ?? "bayramoglusafiyehale@gmail.com";
const NOTIFY_FROM =
  process.env.BOOKING_NOTIFY_FROM ?? "Hale Bayramoğlu <onboarding@resend.dev>";

// Emails Hale about a new booking. Best-effort: never throws to the caller, so
// a mail hiccup can't lose a booking that's already saved.
async function sendBookingNotification(booking: {
  name: string;
  email: string;
  service: string;
  message: string | null;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY not set — skipping booking notification email.");
    return;
  }

  const { name, email, service, message } = booking;
  const lines = [
    `İsim: ${name}`,
    `E-posta: ${email}`,
    `Hizmet: ${service}`,
    `Mesaj: ${message ?? "(belirtilmedi)"}`,
  ];

  const resend = new Resend(apiKey);
  await resend.emails.send({
    from: NOTIFY_FROM,
    to: NOTIFY_TO,
    replyTo: email, // replying goes straight to the client
    subject: `Yeni randevu talebi: ${name}`,
    text: `Yeni bir randevu talebi alındı:\n\n${lines.join("\n")}`,
    html: `<h2>Yeni randevu talebi</h2><ul>${lines
      .map((l) => `<li>${l}</li>`)
      .join("")}</ul>`,
  });
}

export async function createBooking(
  _prev: BookingState,
  formData: FormData,
): Promise<BookingState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const service = String(formData.get("service") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  // Honeypot field — bots fill it, humans never see it.
  if (String(formData.get("company") ?? "").length > 0) {
    return { status: "success", message: "Teşekkürler — talebiniz alındı." };
  }

  if (name.length < 2) {
    return { status: "error", message: "Lütfen adınızı girin." };
  }
  if (!EMAIL_RE.test(email)) {
    return { status: "error", message: "Lütfen geçerli bir e-posta adresi girin." };
  }

  const data = {
    name,
    email,
    service: service || "Not specified",
    message: message || null,
  };

  try {
    await prisma.booking.create({ data });
  } catch (err) {
    console.error("Failed to save booking:", err);
    return {
      status: "error",
      message: "Talebiniz kaydedilirken bir sorun oluştu. Lütfen tekrar deneyin.",
    };
  }

  // Notify Hale — best-effort, so a mail failure never breaks a saved booking.
  try {
    await sendBookingNotification(data);
  } catch (err) {
    console.error("Failed to send booking notification email:", err);
  }

  return {
    status: "success",
    message: "Teşekkürler — talebiniz alındı. En kısa sürede sizinle iletişime geçeceğim. 🌿",
  };
}
