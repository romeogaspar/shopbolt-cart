import Script from "next/script";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CloseCartOnNavigate from "../components/CloseCartOnNavigate ";
import "./globals.css";

const SNIPCART_API_KEY =
  "YTJhOWJlOWQtMjQ1OS00YjY5LTk3ODctZjRhZTM0OTI5YjkxNjM5MTgxNDM0MTA0OTg4NTM4";

export const metadata = {
  title: "ShopBolt — Modern E-Commerce",
  description: "A Next.js + Sanity + Snipcart store.",
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
      </body>
      
    </html>
  );
}