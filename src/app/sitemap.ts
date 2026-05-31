import type { MetadataRoute } from "next";

// Matches metadataBase in layout.tsx. Served at /sitemap.xml.
const BASE_URL = "https://halebayramoglu.com";

export default function sitemap(): MetadataRoute.Sitemap {
  // Single-page site — About/Services/Booking are anchor sections on the home
  // page, not separate URLs, so the sitemap lists only the homepage.
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/bach-cicekleri`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
