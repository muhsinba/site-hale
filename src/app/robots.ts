import type { MetadataRoute } from "next";

// Matches metadataBase in layout.tsx. Served at /robots.txt.
const BASE_URL = "https://halebayramoglu.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin"], // keep crawlers off the chat endpoint & admin panel
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
