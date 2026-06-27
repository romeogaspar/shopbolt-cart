import { getAllProducts } from '../../sanity/lib/queries'
import ShopFilter from '../../components/ShopFilter'

/**
 * Shop page — /shop
 *
 * Server component: fetches ALL products on the server (so they're in the
 * HTML for SEO), derives the category list, and hands both to the client
 * ShopFilter for interactive filtering/search.
 */
export const metadata = {
  title: 'Shop | ShopBolt',
  description: 'Browse all products — filter by category and search.',
}

export default async function ShopPage() {
  const products = await getAllProducts()

  // Build the category list from the products that actually exist.
  const categories = [
    ...new Set(products.map((p) => p.category).filter(Boolean)),
  ].sort()

  return <ShopFilter products={products} categories={categories} />
}