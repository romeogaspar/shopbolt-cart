import { describe, it, expect } from 'vitest'
import { isOnSale } from './pricing'

describe('isOnSale', () => {
  it('is true when compareAtPrice is higher than price', () => {
    expect(isOnSale({ price: 20, compareAtPrice: 25 })).toBe(true)
  })

  it('is false when there is no compareAtPrice', () => {
    expect(isOnSale({ price: 20 })).toBe(false)
  })

  it('is false when compareAtPrice is not higher than price', () => {
    expect(isOnSale({ price: 20, compareAtPrice: 20 })).toBe(false)
    expect(isOnSale({ price: 20, compareAtPrice: 15 })).toBe(false)
  })
})
