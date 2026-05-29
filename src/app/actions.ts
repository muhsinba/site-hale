"use server";

import { prisma } from "@/lib/prisma";

export type BookingState = {
  status: "idle" | "success" | "error";
  message: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  try {
    await prisma.booking.create({
      data: {
        name,
        email,
        service: service || "Not specified",
        message: message || null,
      },
    });
  } catch (err) {
    console.error("Failed to save booking:", err);
    return {
      status: "error",
      message: "Talebiniz kaydedilirken bir sorun oluştu. Lütfen tekrar deneyin.",
    };
  }

  return {
    status: "success",
    message: "Teşekkürler — talebiniz alındı. En kısa sürede sizinle iletişime geçeceğim. 🌿",
  };
}
