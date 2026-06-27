import { getProductBySlug, getAllProductSlugs } from '../../../sanity/lib/queries'
import AddToCart from '../../../components/AddToCart'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return { title: 'Product not found' }
  return {
    title: `${product.name} | ShopBolt`,
    description: product.description || `${product.name} — ${product.category}`,
  }
}

export default async function ProductPage({ params }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) notFound()

  const onSale =
    product.compareAtPrice && product.compareAtPrice > product.price

  return (
    <main className="product-page">
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
    </main>
  )
}