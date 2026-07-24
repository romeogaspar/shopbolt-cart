import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CloseCartOnNavigate from "../components/CloseCartOnNavigate ";
import "./globals.css";

const SNIPCART_API_KEY = process.env.NEXT_PUBLIC_SNIPCART_API_KEY;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ShopBolt — Modern E-Commerce",
    template: "%s | ShopBolt",
  },
  description: "A Next.js + Sanity + Snipcart store.",
  openGraph: {
    type: "website",
    siteName: "ShopBolt",
    title: "ShopBolt — Modern E-Commerce",
    description: "Shop modern products. Fast, simple, secure checkout.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ShopBolt — Modern E-Commerce",
    description: "Shop modern products. Fast, simple, secure checkout.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.snipcart.com/themes/v3.7.3/default/snipcart.css"
        />
      </head>
      <body>
        {/* Must be defined BEFORE snipcart.js runs — v3.7.x reads it at init */}
        <Script id="snipcart-settings" strategy="beforeInteractive">
          {`
            window.SnipcartSettings = {
              publicApiKey: "${SNIPCART_API_KEY}",
              version: "3.7.3",
              loadStrategy: "on-user-interaction",
              addProductBehavior: "none",
              modalStyle: "side",
            };
          `}
        </Script>
        <Header />
        {children}
        <Footer />

        <CloseCartOnNavigate />       

        <div hidden id="snipcart" data-api-key={SNIPCART_API_KEY} />
        <Script
          src="https://cdn.snipcart.com/themes/v3.7.3/default/snipcart.js"
          strategy="afterInteractive"
        />
        <Analytics />
      </body>
      
    </html>
  );
}