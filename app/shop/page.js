import { getAllProducts } from '../../sanity/lib/queries'
import ShopFilter from '../../components/ShopFilter'

export const metadata = {
  title: 'Shop | ShopBolt',
  description: 'Browse all products — filter by category and search.',
}

export default async function ShopPage({ searchParams }) {
  // Next 15: searchParams is a Promise — must await, or q is silently undefined
  const { q } = await searchParams

  const products = await getAllProducts()

  const categories = [
    ...new Set(products.map((p) => p.category).filter(Boolean)),
  ].sort()

  return (
    <ShopFilter
      products={products}
      categories={categories}
      initialQuery={q?.trim() ?? ''}
    />
  )
}