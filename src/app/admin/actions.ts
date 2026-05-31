"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import {
  checkPassword,
  startSession,
  endSession,
  isAuthenticated,
} from "@/lib/auth";

// Refresh both the admin view and the public home page (where testimonials show).
function revalidate() {
  revalidatePath("/admin");
  revalidatePath("/");
}

// Guard for every mutating action: bounce to login if the session is missing.
async function requireAuth() {
  if (!(await isAuthenticated())) redirect("/admin/login");
}

export async function login(formData: FormData): Promise<void> {
  const password = String(formData.get("password") ?? "");
  if (!checkPassword(password)) {
    redirect("/admin/login?error=1");
  }
  await startSession();
  redirect("/admin");
}

export async function logout(): Promise<void> {
  await endSession();
  redirect("/admin/login");
}

export async function createTestimonial(formData: FormData): Promise<void> {
  await requireAuth();
  const quote = String(formData.get("quote") ?? "").trim();
  const author = String(formData.get("author") ?? "").trim();
  const order = Number(formData.get("order") ?? 0) || 0;
  const published = formData.get("published") === "on";
  if (quote.length < 3 || author.length < 1) return;
  await prisma.testimonial.create({ data: { quote, author, order, published } });
  revalidate();
}

export async function updateTestimonial(formData: FormData): Promise<void> {
  await requireAuth();
  const id = String(formData.get("id") ?? "");
  const quote = String(formData.get("quote") ?? "").trim();
  const author = String(formData.get("author") ?? "").trim();
  const order = Number(formData.get("order") ?? 0) || 0;
  const published = formData.get("published") === "on";
  if (!id || quote.length < 3 || author.length < 1) return;
  await prisma.testimonial.update({
    where: { id },
    data: { quote, author, order, published },
  });
  revalidate();
}

export async function deleteTestimonial(formData: FormData): Promise<void> {
  await requireAuth();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await prisma.testimonial.delete({ where: { id } });
  revalidate();
}
