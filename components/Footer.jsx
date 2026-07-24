import Link from "next/link"

/**
 * Footer — simple shared site footer (server-safe, no client hooks).
 */
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <span className="site-footer__logo">Shop<span>Bolt</span></span>
        <nav className="site-footer__links">
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
          <Link href="/shipping-returns">Shipping &amp; Returns</Link>
        </nav>
        <p className="site-footer__note">
          A Next.js + Sanity + Snipcart store · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}