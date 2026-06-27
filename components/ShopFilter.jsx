'use client'

/**
 * ShopFilter — the interactive layer of the shop page.
 *
 * Pattern: the parent (server component) fetches ALL products once and
 * passes them in as a prop. This component filters that array in the
 * browser based on the chosen category and search text. Instant, no
 * re-fetch per keystroke, and the full product list is still in the
 * server-rendered HTML for SEO.
 *
 * (For a catalogue of hundreds+, you'd filter server-side via GROQ —
 * the same approach as your Sanity filter prototype. For a typical shop,
 * client-side filtering of the full set is simpler and snappier.)
 */
import { useState, useMemo } from 'react'
import ProductCard from './ProductCard'

export default function ShopFilter({ products, categories }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    return products.filter((p) => {
      const categoryOk =
        activeCategory === 'all' || p.category === activeCategory
      const searchOk =
        term === '' ||
        p.name.toLowerCase().includes(term) ||
        (p.category && p.category.toLowerCase().includes(term))
      return categoryOk && searchOk
    })
  }, [products, activeCategory, search])

  return (
    <div className="shop">
      <div className="shop__head">
        <h1 className="shop__title">Shop</h1>
        <input
          type="search"
          className="shop__search"
          placeholder="Search products…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search products"
        />
      </div>

      <nav className="shop__filters" aria-label="Filter by category">
        <button
          className={`chip ${activeCategory === 'all' ? 'is-active' : ''}`}
          onClick={() => setActiveCategory('all')}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`chip ${activeCategory === cat ? 'is-active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </nav>

      {filtered.length === 0 ? (
        <p className="shop__empty">
          No products match. Try clearing the search or choosing “All”.
        </p>
      ) : (
        <div className="shop__grid">
          {filtered.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}

      <p className="shop__count">
        {filtered.length} product{filtered.length === 1 ? '' : 's'}
      </p>
    </div>
  )
}