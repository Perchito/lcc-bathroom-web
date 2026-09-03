import { reviews } from '../data/site.js'
import Stars from './Stars.jsx'

export default function Reviews() {
  const avg =
    reviews.reduce((sum, r) => sum + r.rating, 0) / (reviews.length || 1)

  return (
    <section className="section section--alt" id="reviews">
      <div className="container">
        <div className="section__head">
          <p className="section__eyebrow">Reviews</p>
          <h2>What our clients say</h2>
          <div className="reviews__summary">
            <Stars rating={Math.round(avg)} size={22} />
            <span>
              {avg.toFixed(1)} average · {reviews.length} reviews
            </span>
          </div>
          <p className="section__lead">
            Real feedback from homeowners we&apos;ve worked with. Replace these
            with your own Google or Facebook reviews.
          </p>
        </div>

        <div className="reviews-grid">
          {reviews.map((r) => (
            <blockquote className="review" key={r.name + r.location}>
              <Stars rating={r.rating} />
              <p className="review__text">&ldquo;{r.text}&rdquo;</p>
              <footer className="review__by">
                <strong>{r.name}</strong>
                {r.location}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
