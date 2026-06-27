'use client'

/**
 * AddToCart — the Snipcart button for a single product.
 *
 * The critical attribute is data-item-url: it points to THIS product's
 * own page (/product/[slug]). Because that page is server-rendered by
 * Next.js, the price is in the HTML — so when Snipcart crawls this URL to
 * validate the price, it SUCCEEDS. (This is exactly what the Vite SPA
 * couldn't do: it had no per-product server-rendered URL, so the crawl
 * found no price and checkout failed.)
 *
 * Everything else (cart UI, checkout, payment) is Snipcart's job.
 */
export default function AddToCart({ product }) {
  const itemUrl = `/product/${product.slug}`

  return (
    <button
      className="snipcart-add-item add-to-cart"
      data-item-id={product.slug}
      data-item-name={product.name}
      data-item-price={product.price}
      data-item-url={itemUrl}
      data-item-description={product.description || product.category || ''}
      data-item-image={product.images?.[0] || ''}
      disabled={product.inStock === false}
    >
      {product.inStock === false ? 'Out of Stock' : 'Add to Cart'}
    </button>
  )
}
