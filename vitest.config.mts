import { defineConfig } from "vitest/config";

// Unit + API tests run in a Node environment (they exercise pure logic, the Swiss
// Ephemeris WASM engine, and route handlers — not the DOM). Playwright E2E specs live
// in /e2e and are excluded here. resolve.tsconfigPaths handles the "@/..." alias.
export default defineConfig({
  resolve: { tsconfigPaths: true },
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
    exclude: ["node_modules", ".next", "e2e", "dist"],
    pool: "forks", // most reliable for loading the native-ish WASM module
    testTimeout: 30000, // first WASM init + ephemeris calc can take a moment
    hookTimeout: 30000,
    // Let Node load the Swiss Ephemeris package natively (don't let Vite transform it).
    server: { deps: { external: ["swisseph-wasm"] } },
  },
});
