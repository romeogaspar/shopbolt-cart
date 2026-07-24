import { client } from './client'

/**
 * Queries for the storefront. All run on the server.
 */

// Every product (for the shop page, later).
export async function getAllProducts() {
  return client.fetch(
    `*[_type == "product"] | order(name asc) {
      _id, name, "slug": slug.current, price, compareAtPrice,
      category, inStock, featured,
      "imageUrl": images[0].asset->url
    }`
  )
}

// Featured products (for the home page, later).
export async function getFeaturedProducts() {
  return client.fetch(
    `*[_type == "product" && featured == true] | order(name asc) {
      _id, name, "slug": slug.current, price, compareAtPrice,
      category, "imageUrl": images[0].asset->url
    }`
  )
}

// One product by slug — for the product detail page.
export async function getProductBySlug(slug) {
  return client.fetch(
    `*[_type == "product" && slug.current == $slug][0] {
      _id, name, "slug": slug.current, price, compareAtPrice,
      description, category, inStock,
      "images": images[].asset->url
    }`,
    { slug }
  )
}

// Related products — same category, excluding the current product. Capped at 4.
export async function getRelatedProducts(category, excludeSlug) {
  if (!category) return []
  return client.fetch(
    `*[_type == "product" && category == $category && slug.current != $excludeSlug] | order(name asc) [0...4] {
      _id, name, "slug": slug.current, price, compareAtPrice,
      category, inStock,
      "imageUrl": images[0].asset->url
    }`,
    { category, excludeSlug }
  )
}

// Approved reviews for a product, newest first.
export async function getApprovedReviews(productSlug) {
  return client.fetch(
    `*[_type == "review" && approved == true && product->slug.current == $productSlug]
      | order(createdAt desc) {
      _id, name, rating, comment, createdAt
    }`,
    { productSlug }
  )
}

// All slugs — so Next.js can pre-render every product page at build time.
export async function getAllProductSlugs() {
  const slugs = await client.fetch(
    `*[_type == "product" && defined(slug.current)][].slug.current`
  )
  return slugs
}
