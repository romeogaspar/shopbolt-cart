/** Average rating stats for a list of reviews ({ rating } objects). */
export function getRatingStats(reviews) {
  const count = reviews?.length ?? 0
  if (count === 0) return { count: 0, average: 0 }

  const total = reviews.reduce((sum, r) => sum + r.rating, 0)
  const average = Math.round((total / count) * 10) / 10

  return { count, average }
}
