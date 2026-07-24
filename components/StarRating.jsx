/** Read-only star display for an average/whole rating (server-safe). */
export default function StarRating({ value, size = 'md' }) {
  const rounded = Math.round(value)
  return (
    <span className={`star-rating star-rating--${size}`} aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={n <= rounded ? 'star-rating__star is-filled' : 'star-rating__star'}>
          ★
        </span>
      ))}
    </span>
  )
}
