"use client";

/**
 * Header — shared site navigation, appears on every page.
 *
 * Contains: logo (→ home), Shop link, a search box that routes to
 * /shop?q=… , and the Snipcart cart button (snipcart-checkout opens the
 * cart; snipcart-items-count shows the live count).
 *
 * Every navigation action first closes any open Snipcart view (side
 * drawer or #/cart full cart) — Snipcart's overlay is hash-routed and
 * doesn't listen to Next's router, so without this the cart stays open
 * on top of the new page and links appear dead.
 */
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

/** Close any open Snipcart view. No-op if the cart is already closed. */
function closeCart() {
  window.Snipcart?.api?.theme?.cart?.close();
}



export default function Header() {
  const router = useRouter();
  const [q, setQ] = useState("");

  const onSearch = (e) => {
    e.preventDefault();
    closeCart();
    const term = q.trim();
    router.push(term ? `/shop?q=${encodeURIComponent(term)}` : "/shop");
  };

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="site-header__logo" onClick={closeCart}>
          Shop<span>Bolt</span>
        </Link>

        <nav className="site-header__nav">
          <Link href="/shop" className="site-header__link" onClick={closeCart}>
            Shop
          </Link>
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

        <button
          className="site-header__cart snipcart-checkout"
          aria-label="Open cart"
        >
          🛒
          <span className="site-header__badge snipcart-items-count">0</span>
        </button>
      </div>
    </header>
  );
}
