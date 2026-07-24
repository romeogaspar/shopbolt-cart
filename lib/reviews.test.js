import { describe, it, expect } from 'vitest'
import { getRatingStats } from './reviews'

describe('getRatingStats', () => {
  it('returns zero stats for an empty list', () => {
    expect(getRatingStats([])).toEqual({ count: 0, average: 0 })
  })

  it('returns zero stats for undefined/null', () => {
    expect(getRatingStats(undefined)).toEqual({ count: 0, average: 0 })
    expect(getRatingStats(null)).toEqual({ count: 0, average: 0 })
  })

  it('averages ratings, rounded to one decimal', () => {
    const reviews = [{ rating: 5 }, { rating: 4 }, { rating: 4 }]
    expect(getRatingStats(reviews)).toEqual({ count: 3, average: 4.3 })
  })

  it('handles a single review', () => {
    expect(getRatingStats([{ rating: 3 }])).toEqual({ count: 1, average: 3 })
  })
})
