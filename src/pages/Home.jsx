import { Link } from 'react-router-dom'
import { company, stats, gallery } from '../data/site.js'
import { asset } from '../asset.js'

function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero__inner">
        <div className="hero__copy">
          <div className="hero__meta">
            <span className="label">Est. {company.established}</span>
            <span className="label" style={{ color: 'var(--ink-3)' }}>
              {company.serviceArea}
            </span>
          </div>
          <h1 className="display">{company.tagline}</h1>
          <p className="hero__support">{company.heroSupport}</p>
          <div className="hero__actions">
            <Link to="/gallery" className="tlink">
              View selected work
              <span className="tlink__arrow" aria-hidden="true">
                &rarr;
              </span>
            </Link>
            <a href={company.phoneHref} className="tlink">
              {company.phone}
            </a>
          </div>
        </div>

        <figure className="hero__figure">
          {/* PHOTO 1 — see PHOTOS.md */}
          <img
            src={asset('gallery/project-01.svg')}
            alt="A completed bathroom renovation"
          />
        </figure>
      </div>
    </section>
  )
}

function StatLine() {
  return (
    <div className="wrap">
      <div className="statline">
        {stats.map((s, i) => (
          <div
            className="statline__item reveal"
            data-reveal=""
            style={{ '--d': `${i * 70}ms` }}
            key={s.label}
          >
            <span className="statline__value">{s.value}</span>
            <span className="statline__label">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function SelectedWork() {
  const featured = gallery.filter((g) => g.sector === 'luxury').slice(0, 3)
  return (
    <section className="section section--paper2" id="work">
      <div className="wrap">
        <div
          className="split reveal"
          data-reveal=""
          style={{ marginBottom: 'clamp(36px, 5vw, 64px)' }}
        >
          <div className="split__aside">
            <p className="label">Selected work</p>
          </div>
          <div>
            <h2 style={{ marginBottom: '18px' }}>Recent projects</h2>
            <Link to="/gallery" className="tlink">
              All projects
              <span className="tlink__arrow" aria-hidden="true">
                &rarr;
              </span>
            </Link>
          </div>
        </div>

        <div className="works">
          {featured.map((item, i) => (
            <article
              className={
                'work reveal' + (i % 2 === 1 ? ' work--flip' : '')
              }
              data-reveal=""
              key={item.id}
            >
              <div className="work__figure">
                <img src={asset(item.image)} alt={item.title} loading="lazy" />
              </div>
              <div className="work__body">
                <p className="label">{item.meta}</p>
                <h3 className="work__title">{item.title}</h3>
                <p className="work__blurb">{item.blurb}</p>
                <Link to="/gallery" className="tlink">
                  See the gallery
                  <span className="tlink__arrow" aria-hidden="true">
                    &rarr;
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <StatLine />
      <SelectedWork />
    </>
  )
}
