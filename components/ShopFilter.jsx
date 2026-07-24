'use client'

/**
 * ShopFilter — the interactive layer of the shop page.
 *
 * Pattern: the parent (server component) fetches ALL products once and
 * passes them in as a prop, along with any ?q= search term from the URL
 * (initialQuery). This component filters the array in the browser based
 * on the chosen category and search text.
 *
 * initialQuery is re-synced on every render where it changes (not just
 * initial state) because a Header search while already on /shop re-renders
 * this component with a new prop but does NOT remount it — initial state
 * alone would go stale. This compares-and-sets during render instead of in
 * an effect, per React's "adjusting state when a prop changes" pattern.
 */
import { useState, useMemo } from 'react'
import ProductCard from './ProductCard'

export default function ShopFilter({ products, categories, initialQuery = '' }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState(initialQuery)
  const [prevInitialQuery, setPrevInitialQuery] = useState(initialQuery)

  if (initialQuery !== prevInitialQuery) {
    setPrevInitialQuery(initialQuery)
    setSearch(initialQuery)
  }

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