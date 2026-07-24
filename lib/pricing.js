/** Whether a product should show as "on sale" (has a higher compare-at price). */
export function isOnSale(product) {
  return Boolean(product?.compareAtPrice && product.compareAtPrice > product.price)
}
