import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";
import {
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  logout,
} from "./actions";

export const metadata: Metadata = {
  title: "Yorum Yönetimi",
  robots: { index: false, follow: false },
};

// Always read fresh — this page reflects the live testimonials table.
export const dynamic = "force-dynamic";

const inputClass =
  "w-full rounded-xl border border-plum/15 bg-white px-3 py-2 text-plum outline-none focus:border-purple";
const labelClass = "mb-1 block text-xs font-medium uppercase tracking-wide text-plum/60";

export default async function AdminPage() {
  if (!(await isAuthenticated())) redirect("/admin/login");

  const testimonials = await prisma.testimonial.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });

  return (
    <main className="min-h-screen bg-cream-deep px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <header className="mb-10 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-gold">
              Yönetim
            </p>
            <h1 className="text-3xl text-plum">Danışan Yorumları</h1>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="rounded-xl border border-plum/20 px-4 py-2 text-sm text-plum/70 transition-colors hover:bg-plum/5"
            >
              Çıkış
            </button>
          </form>
        </header>

        {/* Add new */}
        <section className="mb-10 rounded-3xl bg-cream p-6 shadow-sm">
          <h2 className="mb-4 text-xl text-plum">Yeni yorum ekle</h2>
          <form action={createTestimonial} className="space-y-4">
            <div>
              <label htmlFor="new-quote" className={labelClass}>
                Yorum
              </label>
              <textarea
                id="new-quote"
                name="quote"
                rows={3}
                required
                placeholder="Danışanın yorumu…"
                className={inputClass}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-[1fr_auto_auto] sm:items-end">
              <div>
                <label htmlFor="new-author" className={labelClass}>
                  İsim
                </label>
                <input
                  id="new-author"
                  name="author"
                  type="text"
                  required
                  placeholder="Örn. Elif K."
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="new-order" className={labelClass}>
                  Sıra
                </label>
                <input
                  id="new-order"
                  name="order"
                  type="number"
                  defaultValue={testimonials.length + 1}
                  className={`${inputClass} w-20`}
                />
              </div>
              <label className="flex items-center gap-2 pb-2 text-sm text-plum/80">
                <input
                  name="published"
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 accent-purple"
                />
                Yayında
              </label>
            </div>
            <button
              type="submit"
              className="rounded-xl bg-plum px-5 py-2.5 font-medium text-cream transition-colors hover:bg-plum-soft"
            >
              Ekle
            </button>
          </form>
        </section>

        {/* Existing */}
        <section className="space-y-5">
          <h2 className="text-xl text-plum">
            Mevcut yorumlar ({testimonials.length})
          </h2>
          {testimonials.length === 0 && (
            <p className="rounded-3xl bg-cream p-6 text-plum/60">
              Henüz yorum yok. Yukarıdan ilk yorumu ekleyin.
            </p>
          )}
          {testimonials.map((t) => (
            <div key={t.id} className="rounded-3xl bg-cream p-6 shadow-sm">
              <form action={updateTestimonial} className="space-y-4">
                <input type="hidden" name="id" value={t.id} />
                <div>
                  <label htmlFor={`quote-${t.id}`} className={labelClass}>
                    Yorum
                  </label>
                  <textarea
                    id={`quote-${t.id}`}
                    name="quote"
                    rows={3}
                    required
                    defaultValue={t.quote}
                    className={inputClass}
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-[1fr_auto_auto] sm:items-end">
                  <div>
                    <label htmlFor={`author-${t.id}`} className={labelClass}>
                      İsim
                    </label>
                    <input
                      id={`author-${t.id}`}
                      name="author"
                      type="text"
                      required
                      defaultValue={t.author}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor={`order-${t.id}`} className={labelClass}>
                      Sıra
                    </label>
                    <input
                      id={`order-${t.id}`}
                      name="order"
                      type="number"
                      defaultValue={t.order}
                      className={`${inputClass} w-20`}
                    />
                  </div>
                  <label className="flex items-center gap-2 pb-2 text-sm text-plum/80">
                    <input
                      name="published"
                      type="checkbox"
                      defaultChecked={t.published}
                      className="h-4 w-4 accent-purple"
                    />
                    Yayında
                  </label>
                </div>
                <button
                  type="submit"
                  className="rounded-xl bg-purple px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-plum"
                >
                  Kaydet
                </button>
              </form>
              <form action={deleteTestimonial} className="mt-3 border-t border-plum/10 pt-3">
                <input type="hidden" name="id" value={t.id} />
                <button
                  type="submit"
                  className="text-sm text-rose transition-colors hover:underline"
                >
                  Sil
                </button>
              </form>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
