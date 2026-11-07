import { accreditations } from '../data/site.js'
import { asset } from '../asset.js'

// Accreditation logos. "band" is the full strip (homepage, council page);
// "row" is the small version in the footer.
export default function Accreditations({ variant = 'band', title, lead }) {
  if (!accreditations.length) return null

  const logos = accreditations.map((a) => (
    <figure className="accred__item" key={a.name}>
      <div className="accred__logo">
        <img src={asset(a.image)} alt={a.name} loading="lazy" decoding="async" />
      </div>
      {variant === 'band' && <figcaption>{a.caption}</figcaption>}
    </figure>
  ))

  if (variant === 'row') return <div className="accred accred--row">{logos}</div>

  return (
    <section className="section section--stone2 accred-band" aria-labelledby="accred-title">
      <div className="wrap accred-band__grid">
        <div>
          <p className="eyebrow">Accredited &amp; approved</p>
          <h2 id="accred-title">{title}</h2>
          {lead && <p className="lead">{lead}</p>}
        </div>
        <div className="accred">{logos}</div>
      </div>
    </section>
  )
}
