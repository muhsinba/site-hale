import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The Swiss Ephemeris WASM package ships a 12MB .data + .wasm it loads from its own
  // node_modules dir at runtime; keep it external so the bundler doesn't try to inline
  // it, and trace its files into the standalone server build.
  serverExternalPackages: ["swisseph-wasm"],
  outputFileTracingIncludes: {
    "/api/chart": ["./node_modules/swisseph-wasm/wasm/**"],
  },
};

export default nextConfig;
