import { test, expect } from "@playwright/test";

// Smoke tests: every key page loads and renders its identifying content.
test.describe("page loads", () => {
  test("homepage", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Hale Bayramoğlu/);
  });

  test("astrolojik bakış hub", async ({ page }) => {
    await page.goto("/astrolojik-bakis");
    await expect(page.getByRole("heading", { name: "Astrolojik Bakış", level: 1 })).toBeVisible();
  });

  test("çakra dengeleme detail page", async ({ page }) => {
    await page.goto("/cakra-dengeleme");
    await expect(page.getByRole("heading", { name: "Çakra Dengeleme", level: 1 })).toBeVisible();
    await expect(page.getByText("Yedi Temel Çakra")).toBeVisible();
  });

  test("uzaktan şifa detail page", async ({ page }) => {
    await page.goto("/uzaktan-sifa");
    await expect(page.getByRole("heading", { name: "Uzaktan Şifa", level: 1 })).toBeVisible();
  });

  test("bach çiçekleri detail page", async ({ page }) => {
    await page.goto("/bach-cicekleri");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Bach Çiçekleri");
  });
});
