'use client'

import { useState } from 'react'

/**
 * ReviewForm — client component, posts to /api/reviews.
 * Submitted reviews are held for moderation (approved: false) until
 * someone approves them in the Sanity Studio, so nothing appears here.
 */
export default function ReviewForm({ productSlug }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [website, setWebsite] = useState('') // honeypot
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [error, setError] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    setError('')

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productSlug, name, email, rating, comment, website }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }

      setStatus('success')
      setName('')
      setEmail('')
      setRating(5)
      setComment('')
    } catch {
      setError('Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <p className="review-form__success">
        Thanks! Your review has been submitted and will appear once it&apos;s approved.
      </p>
    )
  }

  return (
    <form className="review-form" onSubmit={onSubmit}>
      <input
        type="text"
        name="website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="review-form__honeypot"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="review-form__row">
        <label className="review-form__field">
          Name
          <input
            type="text"
            required
            maxLength={120}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="review-form__field">
          Email (optional, not shown publicly)
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
      </div>

      <label className="review-form__field">
        Rating
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={n}>
              {n} star{n === 1 ? '' : 's'}
            </option>
          ))}
        </select>
      </label>

      <label className="review-form__field">
        Review
        <textarea
          required
          maxLength={1000}
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </label>

      {error && <p className="review-form__error">{error}</p>}

      <button type="submit" className="review-form__submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Submitting…' : 'Submit review'}
      </button>
    </form>
  )
}
