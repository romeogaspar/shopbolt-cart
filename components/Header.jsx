'use client'

/**
 * Header — shared site navigation, appears on every page.
 *
 * Contains: logo (→ home), Shop link, a search box that routes to
 * /shop?q=… , and the Snipcart cart button (snipcart-checkout opens the
 * cart; snipcart-items-count shows the live count).
 *
 * Search routes to the shop page with a query param; the shop reads it
 * and pre-fills the search. (Wiring the shop to read ?q is optional — the
 * shop's own search box also works standalone.)
 */
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Header() {
  const router = useRouter()
  const [q, setQ] = useState('')

  function onSearch(e) {
    e.preventDefault()
    const term = q.trim()
    router.push(term ? `/shop?q=${encodeURIComponent(term)}` : '/shop')
  }

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="site-header__logo">
          Shop<span>Bolt</span>
        </Link>

        <nav className="site-header__nav">
          <Link href="/shop" className="site-header__link">Shop</Link>
        </nav>

        <form className="site-header__search" onSubmit={onSearch}>
          <input
            type="search"
            placeholder="Search…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Search products"
          />
        </form>

        <button className="site-header__cart snipcart-checkout" aria-label="Open cart">
          🛒
          <span className="site-header__badge snipcart-items-count">0</span>
        </button>
      </div>
    </header>
  )
}