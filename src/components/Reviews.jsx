import { reviews, company } from '../data/site.js'
import Stars from './Stars.jsx'

export default function Reviews() {
  const avg =
    reviews.reduce((sum, r) => sum + r.rating, 0) / (reviews.length || 1)

  return (
    <section className="section" id="reviews">
      <div className="wrap">
        <div className="split" style={{ marginBottom: 'clamp(36px, 5vw, 60px)' }}>
          <div className="split__aside">
            <p className="label">Client notes</p>
          </div>
          <div>
            <h2 style={{ marginBottom: '12px' }}>
              Homeowners on working with us
            </h2>
            <p className="notes__summary">
              {avg.toFixed(1)} / 5 average · {reviews.length} reviews ·{' '}
              <a
                href={company.googleReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                read them on Google
              </a>
            </p>
          </div>
        </div>

        <div className="notes">
          {reviews.map((r) => (
            <blockquote className="note" key={r.name}>
              <div className="note__by">
                <div className="note__name">{r.name}</div>
                <div className="note__place">
                  {r.job} · {r.when}
                </div>
              </div>
              <div>
                <p className="note__quote">&ldquo;{r.text}&rdquo;</p>
                <Stars rating={r.rating} />
              </div>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
