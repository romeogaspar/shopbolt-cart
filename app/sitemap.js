import { getAllProductSlugs } from '../sanity/lib/queries'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export default async function sitemap() {
  const slugs = await getAllProductSlugs()

  const staticRoutes = ['', '/shop', '/privacy', '/terms', '/shipping-returns'].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }))

  const productRoutes = slugs.map((slug) => ({
    url: `${SITE_URL}/product/${slug}`,
    lastModified: new Date(),
  }))

  return [...staticRoutes, ...productRoutes]
}
