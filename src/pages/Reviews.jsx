import { reviews, company } from '../data/site.js'
import Stars from '../components/Stars.jsx'

export default function Reviews() {
  const avg =
    reviews.reduce((sum, r) => sum + r.rating, 0) / (reviews.length || 1)

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <p className="label">Client notes</p>
          <h1 className="display">Reviews</h1>
          <p className="notes__summary" style={{ marginTop: '14px' }}>
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
      </section>

      <section className="section">
        <div className="wrap">
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
    </>
  )
}
