import { test, expect } from "@playwright/test";

// The core interactive flow: fill the birth-chart form, submit, and confirm the wheel +
// data tables render. This exercises the whole stack (form → /api/chart → Swiss engine →
// SVG + tables) with no side effects (no email, no DB writes).
test("natal chart generates a wheel and tables", async ({ page }) => {
  await page.goto("/astrolojik-bakis/dogum-haritasi");

  await page.fill("#bc-date", "15/05/1990");
  await page.fill("#bc-time", "14:30");
  // City defaults to İstanbul — no change needed.

  await page.getByRole("button", { name: "Haritamı Oluştur" }).click();

  // The chart computation + render (dev compile of the API route on first hit can be slow).
  await expect(page.getByRole("heading", { name: "Gezegen Konumları" })).toBeVisible({ timeout: 60_000 });
  await expect(page.locator("svg[role='img']").first()).toBeVisible();
  // Summary line names the ascendant; for this chart it's Terazi.
  await expect(page.getByText("Yükselen").first()).toBeVisible();
});
