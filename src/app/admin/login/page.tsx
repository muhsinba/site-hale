import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { login } from "../actions";
import { isAuthenticated, isAdminConfigured } from "@/lib/auth";

// Don't let search engines index the admin area.
export const metadata: Metadata = {
  title: "Yönetim Girişi",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  // Already logged in? Go straight to the dashboard.
  if (await isAuthenticated()) redirect("/admin");

  const { error } = await searchParams;
  const configured = isAdminConfigured();

  return (
    <main className="flex min-h-screen items-center justify-center bg-cream-deep px-6">
      <div className="w-full max-w-sm rounded-3xl bg-cream p-8 shadow-lg">
        <p className="mb-2 text-sm uppercase tracking-[0.2em] text-gold">
          Yönetim
        </p>
        <h1 className="mb-6 text-3xl text-plum">Giriş</h1>

        {!configured ? (
          <p className="rounded-2xl bg-rose/15 p-4 text-sm leading-relaxed text-plum/80">
            Henüz bir yönetici şifresi tanımlanmamış. Lütfen sunucudaki{" "}
            <code className="font-mono">ADMIN_PASSWORD</code> değişkenini
            ayarlayın.
          </p>
        ) : (
          <form action={login} className="space-y-4">
            {error && (
              <p className="rounded-2xl bg-rose/15 p-3 text-sm text-rose">
                Şifre hatalı. Lütfen tekrar deneyin.
              </p>
            )}
            <div>
              <label
                htmlFor="password"
                className="mb-1 block text-sm font-medium text-plum/80"
              >
                Şifre
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoFocus
                required
                className="w-full rounded-xl border border-plum/15 bg-white px-4 py-3 text-plum outline-none focus:border-purple"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-plum py-3 font-medium text-cream transition-colors hover:bg-plum-soft"
            >
              Giriş yap
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
