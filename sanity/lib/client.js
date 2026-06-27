import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

/**
 * Sanity client for the storefront.
 * Reads products at build/request time on the SERVER, so prices land in
 * the rendered HTML — which is exactly what Snipcart needs to validate
 * checkout, and what makes products SEO-visible.
 *
 * Set these in .env.local:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
 *   NEXT_PUBLIC_SANITY_DATASET=production
 */
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

const builder = imageUrlBuilder(client)

/** Turn a Sanity image reference into a URL. Usage: urlFor(img).width(600).url() */
export function urlFor(source) {
  return builder.image(source)
}
