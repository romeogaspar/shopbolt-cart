import Link from 'next/link'

/**
 * ProductCard — a single product tile for grids (shop, home).
 * Links to the product detail page. Server-safe (no client hooks),
 * so it renders into the HTML for SEO.
 */
export default function ProductCard({ product }) {
  const onSale =
    product.compareAtPrice && product.compareAtPrice > product.price

  return (
    <Link href={`/product/${product.slug}`} className="pcard">
      <div className="pcard__media">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} className="pcard__img" />
        ) : (
          <div className="pcard__img pcard__img--placeholder" />
        )}
        {onSale && <span className="pcard__badge">Sale</span>}
        {product.inStock === false && (
          <span className="pcard__badge pcard__badge--out">Out of stock</span>
        )}
      </div>
      <div className="pcard__body">
        {product.category && (
          <span className="pcard__cat">{product.category}</span>
        )}
        <h3 className="pcard__name">{product.name}</h3>
        <div className="pcard__price-row">
          <span className="pcard__price">${product.price.toFixed(2)}</span>
          {onSale && (
            <span className="pcard__compare">
              ${product.compareAtPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}