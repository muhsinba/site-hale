import { defineConfig, devices } from "@playwright/test";

// E2E tests for the live UI flows. Playwright starts the app itself (webServer) and
// drives a real browser. Specs live in /e2e. Chromium only — fast and enough coverage
// for these flows; add Firefox/WebKit projects later if needed.
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : [["html", { open: "never" }]],
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    // Optional slow-motion for watching headed runs: `PWSLOW=600 npx playwright test --headed`.
    // Off by default, so CI/headless runs are unaffected.
    launchOptions: { slowMo: Number(process.env.PWSLOW) || 0 },
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
  // Build + start for a production-like run in CI; reuse the dev server locally.
  webServer: {
    command: process.env.CI ? "npm run start" : "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
