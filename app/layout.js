import Script from 'next/script'
import './globals.css'

/**
 * Root layout — loads Snipcart once for the whole app.
 * Uses the current SnipcartSettings install method.
 *
 * Replace the API key with your Snipcart PUBLIC TEST key.
 * (In production you'd use an env var; public test key inline is fine here.)
 */
const SNIPCART_API_KEY = 'YTJhOWJlOWQtMjQ1OS00YjY5LTk3ODctZjRhZTM0OTI5YjkxNjM5MTgxNDM0MTA0OTg4NTM4'

export const metadata = {
  title: 'ShopBolt — Modern E-Commerce',
  description: 'A Next.js + Sanity + Snipcart store.',
}

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
        {children}

        <Script id="snipcart-settings" strategy="beforeInteractive">
          {`
            window.SnipcartSettings = {
              publicApiKey: "${SNIPCART_API_KEY}",
              loadStrategy: "on-user-interaction",
            };
            
          `}
        </Script>
        <div hidden id="snipcart" data-api-key={SNIPCART_API_KEY} />
        <Script
          src="https://cdn.snipcart.com/themes/v3.7.3/default/snipcart.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
