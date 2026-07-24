import { getProductBySlug, getAllProductSlugs, getRelatedProducts, getApprovedReviews } from '../../../sanity/lib/queries'
import AddToCart from '../../../components/AddToCart'
import ProductCard from '../../../components/ProductCard'
import StarRating from '../../../components/StarRating'
import ReviewsSection from '../../../components/ReviewsSection'
import { getRatingStats } from '../../../lib/reviews'
import { isOnSale } from '../../../lib/pricing'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return { title: 'Product not found' }

  const title = product.name
  const description = product.description || `${product.name} — ${product.category}`
  const image = product.images?.[0]

  return {
    title,
    description,
    alternates: { canonical: `/product/${slug}` },
    openGraph: {
      title,
      description,
      type: 'website',
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : undefined,
    },
  }
}

export default async function ProductPage({ params }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) notFound()

  const related = await getRelatedProducts(product.category, slug)
  const reviews = await getApprovedReviews(slug)
  const { count: reviewCount, average: reviewAverage } = getRatingStats(reviews)

  const onSale = isOnSale(product)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description || undefined,
    image: product.images || undefined,
    category: product.category || undefined,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: product.price,
      availability: product.inStock === false
        ? 'https://schema.org/OutOfStock'
        : 'https://schema.org/InStock',
    },
    aggregateRating: reviewCount > 0
      ? { '@type': 'AggregateRating', ratingValue: reviewAverage, reviewCount }
      : undefined,
  }

  return (
    <main className="product-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="product-page__inner">
        <div className="product-page__gallery">
          {product.images?.[0] ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="product-page__img"
            />
          ) : (
            <div className="product-page__img product-page__img--placeholder" />
          )}
          {product.images?.length > 1 && (
            <div className="product-page__thumbs">
              {product.images.slice(1).map((img, i) => (
                <img key={i} src={img} alt="" className="product-page__thumb" />
              ))}
            </div>
          )}
        </div>

        <div className="product-page__info">
          {product.category && (
            <span className="product-page__category">{product.category}</span>
          )}
          <h1 className="product-page__name">{product.name}</h1>

          {reviewCount > 0 && (
            <a href="#reviews" className="product-page__rating">
              <StarRating value={reviewAverage} size="sm" />
              <span>{reviewAverage} ({reviewCount} review{reviewCount === 1 ? '' : 's'})</span>
            </a>
          )}

          <div className="product-page__price-row">
            <span className="product-page__price">${product.price.toFixed(2)}</span>
            {onSale && (
              <span className="product-page__compare">
                ${product.compareAtPrice.toFixed(2)}
              </span>
            )}
          </div>

          {product.description && (
            <p className="product-page__desc">{product.description}</p>
          )}

          <AddToCart product={product} />

          {product.inStock === false && (
            <p className="product-page__stock">Currently out of stock</p>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="section product-page__related">
          <div className="section__head">
            <h2 className="section__title">You might also like</h2>
          </div>
          <div className="home__grid">
            {related.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </section>
      )}

      <div id="reviews">
        <ReviewsSection productSlug={slug} reviews={reviews} />
      </div>
    </main>
  )
}