import { createClient } from 'next-sanity'

/**
 * Server-only Sanity client with write access, used by API routes (e.g.
 * review submission). Never import this from a Client Component — the
 * token must stay off the browser bundle.
 *
 * Set in .env.local (NOT prefixed with NEXT_PUBLIC_):
 *   SANITY_API_TOKEN=... (create at sanity.io/manage → API → Tokens, "Editor" permission)
 */
export const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})
