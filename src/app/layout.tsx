import type { Metadata } from "next";
import Script from "next/script";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import ChatWidget from "@/components/ChatWidget";

// Google Analytics (gtag.js) measurement ID.
const GA_ID = "G-L4M4JF4D17";

// Microsoft Clarity project ID (session replays + heatmaps).
const CLARITY_ID = "x0rmr742cr";

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
  // Base URL for resolving relative metadata (Open Graph, canonical) to absolute URLs.
  metadataBase: new URL("https://halebayramoglu.com"),
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
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${jost.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <ChatWidget />

        {/* Google Analytics (gtag.js) — loads on every page via the root layout */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
        </Script>

        {/* Microsoft Clarity — session replays + heatmaps */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "${CLARITY_ID}");`}
        </Script>
      </body>
    </html>
  );
}
