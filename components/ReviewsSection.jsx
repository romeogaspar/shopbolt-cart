import StarRating from './StarRating'
import ReviewForm from './ReviewForm'
import { getRatingStats } from '../lib/reviews'

export default function ReviewsSection({ productSlug, reviews }) {
  const { count, average } = getRatingStats(reviews)

  return (
    <section className="section reviews">
      <div className="section__head">
        <h2 className="section__title">Reviews</h2>
        {count > 0 && (
          <span className="reviews__summary">
            <StarRating value={average} /> {average} out of 5 ({count} review{count === 1 ? '' : 's'})
          </span>
        )}
      </div>

      {count === 0 ? (
        <p className="reviews__empty">No reviews yet — be the first to write one.</p>
      ) : (
        <ul className="reviews__list">
          {reviews.map((r) => (
            <li key={r._id} className="reviews__item">
              <div className="reviews__item-head">
                <StarRating value={r.rating} size="sm" />
                <span className="reviews__author">{r.name}</span>
              </div>
              <p className="reviews__comment">{r.comment}</p>
            </li>
          ))}
        </ul>
      )}

      <div className="reviews__form-wrap">
        <h3 className="reviews__form-title">Write a review</h3>
        <ReviewForm productSlug={productSlug} />
      </div>
    </section>
  )
}
