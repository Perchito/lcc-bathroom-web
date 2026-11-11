import { accreditations } from '../data/site.js'
import { asset } from '../asset.js'

// Accreditation logos. "band" is a slowly scrolling strip (homepage, council
// page); "row" is the small version in the footer.
export default function Accreditations({ variant = 'band', title, lead }) {
  if (!accreditations.length) return null

  // Each logo once, even if several entries share it.
  const items = accreditations.filter((a, i) => accreditations.findIndex((b) => b.image === a.image) === i)

  const logos = items.map((a) => (
    <figure className="accred__item" key={a.name}>
      <div className="accred__logo">
        <img src={asset(a.image)} alt={a.name} loading="lazy" decoding="async" />
      </div>
    </figure>
  ))

  if (variant === 'row') return <div className="accred accred--row">{logos}</div>

  // The track holds the logos twice so the loop is seamless; the copy is hidden
  // from screen readers.
  return (
    <section className="section section--stone2 accred-band" aria-labelledby="accred-title">
      <div className="wrap accred-band__head">
        <p className="eyebrow">Accredited &amp; approved</p>
        <h2 id="accred-title">{title}</h2>
        {lead && <p className="lead">{lead}</p>}
      </div>
      <div className="marquee">
        <div className="marquee__track">
          <div className="marquee__set">{logos}</div>
          <div className="marquee__set" aria-hidden="true">{logos}</div>
        </div>
      </div>
    </section>
  )
}
