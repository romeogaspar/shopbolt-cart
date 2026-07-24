import Link from "next/link";
import { getFeaturedProducts, getAllProducts } from "../sanity/lib/queries";
import ProductCard from "../components/ProductCard";
import Image from "next/image";

/**
 * Home page — replaces the Stage 1 placeholder.
 *
 * Server component: fetches featured products (and derives categories
 * from all products) on the server, so everything is in the HTML for SEO.
 *
 * Sections: hero → featured products → category links → CTA.
 * If no products are marked "featured" in Sanity, it falls back to showing
 * the first few products so the section is never empty.
 */
export const metadata = {
  title: { absolute: "ShopBolt — Modern E-Commerce" },
  description: "Shop modern products. Fast, simple, secure checkout.",
};

export default async function Home() {
  let featured = await getFeaturedProducts();
  const all = await getAllProducts();

  // Fallback: if nothing is flagged featured, show the first 4 products.
  if (!featured || featured.length === 0) {
    featured = all.slice(0, 4);
  }

  const categories = [
    ...new Set(all.map((p) => p.category).filter(Boolean)),
  ].sort();

  return (
    <main className="home">
      {/* HERO */}
      <section className="hero">
        <div className="hero__content">
          <span className="hero__eyebrow">New Season · 2026</span>
          <h1 className="hero__title">
            Modern products,
            <br />
            simple checkout.
          </h1>
          <p className="hero__sub">
            Browse the collection and check out in seconds. Fast, secure, and
            built for the way you shop.
          </p>
          <Link href="/shop" className="hero__cta">
            Shop the collection →
          </Link>
        </div>
        <div className="hero__art">
          <Image src="/images/hero_1.jpg" width={450} height={360}  alt="" className="hero__img" />
        </div>
      </section>

      {/* FEATURED */}
      <section className="section">
        <div className="section__head">
          <h2 className="section__title">Featured</h2>
          <Link href="/shop" className="section__link">
            View all →
          </Link>
        </div>
        {featured.length === 0 ? (
          <p className="section__empty">
            No products yet — add some in the Studio at <code>/studio</code>.
          </p>
        ) : (
          <div className="home__grid">
            {featured.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </section>

      {/* CATEGORIES */}
      {categories.length > 0 && (
        <section className="section">
          <div className="section__head">
            <h2 className="section__title">Shop by category</h2>
          </div>
          <div className="cat-grid">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/shop?q=${encodeURIComponent(cat)}`}
                className="cat-tile"
              >
                {cat}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="home-cta">
        <h2>Ready to shop?</h2>
        <p>Browse the full collection and check out securely.</p>
        <Link href="/shop" className="hero__cta">
          Go to Shop →
        </Link>
      </section>
    </main>
  );
}
