import Link from 'next/link'

export const metadata = {
  title: 'Page not found',
}

export default function NotFound() {
  return (
    <main className="not-found">
      <span className="not-found__code">404</span>
      <h1 className="not-found__title">Page not found</h1>
      <p className="not-found__sub">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <Link href="/shop" className="hero__cta">
        Continue shopping →
      </Link>
    </main>
  )
}
