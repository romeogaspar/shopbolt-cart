'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * CloseCartOnNavigate — Snipcart's overlay doesn't listen to Next's
 * router, so close it whenever the pathname changes.
 */
export default function CloseCartOnNavigate() {
  const pathname = usePathname()

  useEffect(() => {
    (window as any).Snipcart?.api?.theme?.cart?.close()
  }, [pathname])

  return null
}