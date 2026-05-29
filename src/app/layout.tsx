import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext"],
});

const jost = Jost({
  variable: "--font-jost",
  weight: ["300", "400", "500", "600"],
  subsets: ["latin", "latin-ext"],
});

// PERSONALIZE: site title & description (shown in browser tabs and search results)
export const metadata: Metadata = {
  title: "Hale Bayramoğlu — Enerji Şifası ve Bütünsel İyilik",
  description:
    "Dengenizi yeniden kurmanız, artık size hizmet etmeyeni bırakmanız ve gerçek benliğinizle yeniden bağ kurmanız için Reiki, enerji şifası ve bütünsel iyilik seansları.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${cormorant.variable} ${jost.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
