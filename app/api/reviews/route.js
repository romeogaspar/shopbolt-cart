import { NextResponse } from 'next/server'
import { writeClient } from '../../../sanity/lib/writeClient'
import { getProductBySlug } from '../../../sanity/lib/queries'

export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { productSlug, name, email, rating, comment, website } = body || {}

  // Honeypot: bots tend to fill every field, humans never see this one (CSS-hidden).
  if (website) {
    return NextResponse.json({ ok: true })
  }

  if (!productSlug || typeof productSlug !== 'string') {
    return NextResponse.json({ error: 'Missing product' }, { status: 400 })
  }
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 })
  }
  const ratingNum = Number(rating)
  if (!Number.isInteger(ratingNum) || ratingNum < 1 || ratingNum > 5) {
    return NextResponse.json({ error: 'Rating must be between 1 and 5' }, { status: 400 })
  }
  if (!comment || typeof comment !== 'string' || comment.trim().length === 0) {
    return NextResponse.json({ error: 'Comment is required' }, { status: 400 })
  }
  if (comment.length > 1000) {
    return NextResponse.json({ error: 'Comment is too long (max 1000 characters)' }, { status: 400 })
  }

  if (!process.env.SANITY_API_TOKEN) {
    return NextResponse.json(
      { error: 'Reviews are not configured yet (missing SANITY_API_TOKEN).' },
      { status: 503 }
    )
  }

  const product = await getProductBySlug(productSlug)
  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 })
  }

  await writeClient.create({
    _type: 'review',
    product: { _type: 'reference', _ref: product._id },
    name: name.trim().slice(0, 120),
    email: typeof email === 'string' ? email.trim().slice(0, 200) : undefined,
    rating: ratingNum,
    comment: comment.trim(),
    approved: false,
    createdAt: new Date().toISOString(),
  })

  return NextResponse.json({ ok: true })
}
