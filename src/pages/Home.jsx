import { Link } from 'react-router-dom'
import {
  company,
  stats,
  services,
  process,
  gallery,
} from '../data/site.js'
import Icon from '../components/Icon.jsx'
import Reviews from '../components/Reviews.jsx'

function Hero() {
  return (
    <section className="hero">
      <img src="/hero.svg" alt="" className="hero__bg" />
      <div className="container hero__inner">
        <div className="hero__content">
          <h1>{company.tagline}</h1>
          <p className="hero__lead">{company.intro}</p>
          <div className="hero__actions">
            <a href={company.phoneHref} className="btn btn--primary">
              <Icon name="phone" size={18} /> Get a free estimate
            </a>
            <Link to="/gallery" className="btn btn--ghost">
              See our renovations
            </Link>
          </div>
          <div className="hero__trust">
            <span>
              <Icon name="shield" size={18} /> {company.license}
            </span>
            <span>
              <Icon name="pin" size={18} /> {company.serviceArea}
            </span>
            <span>
              <Icon name="clock" size={18} /> {company.yearsInBusiness} years experience
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <div className="container">
      <div className="stats">
        {stats.map((s) => (
          <div className="stat" key={s.label}>
            <div className="stat__value">{s.value}</div>
            <div className="stat__label">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Services() {
  return (
    <section className="section" id="services">
      <div className="container">
        <div className="section__head">
          <p className="section__eyebrow">What we do</p>
          <h2>Full-service bathroom &amp; home construction</h2>
          <p className="section__lead">
            One licensed crew handles every stage — demolition, plumbing,
            electrical, tile, and finish carpentry — so you have a single point
            of accountability from start to finish.
          </p>
        </div>
        <div className="cards">
          {services.map((s) => (
            <article className="card" key={s.id}>
              <div className="card__icon">
                <Icon name={s.icon} size={24} />
              </div>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Process() {
  return (
    <section className="section section--navy" id="process">
      <div className="container">
        <div className="section__head">
          <p className="section__eyebrow">How it works</p>
          <h2>A clear process, no surprises</h2>
          <p className="section__lead">
            We keep the job organized and the communication honest from the first
            visit to the final walkthrough.
          </p>
        </div>
        <div className="steps">
          {process.map((p) => (
            <div className="step" key={p.step}>
              <div className="step__num">{p.step}</div>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function GalleryPreview() {
  const preview = gallery.slice(0, 3)
  return (
    <section className="section" id="recent-work">
      <div className="container">
        <div className="section__head">
          <p className="section__eyebrow">Recent work</p>
          <h2>A few of our latest renovations</h2>
          <p className="section__lead">
            Every project is different. Browse the full gallery to see the range
            of work we take on.
          </p>
        </div>
        <div className="gallery-grid">
          {preview.map((item) => (
            <Link className="tile" to="/gallery" key={item.id}>
              <img src={item.image} alt={item.title} loading="lazy" />
              <span className="tile__caption">
                <strong>{item.title}</strong>
                <span>{item.category}</span>
              </span>
            </Link>
          ))}
        </div>
        <div style={{ marginTop: '28px' }}>
          <Link to="/gallery" className="btn btn--dark">
            View all renovations <Icon name="arrow" size={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}

function CallToAction() {
  return (
    <section className="section">
      <div className="container">
        <div className="cta">
          <div>
            <h2>Ready to start your project?</h2>
            <p>
              Free in-home estimates. Call or email and we&apos;ll set up a time
              that works for you.
            </p>
          </div>
          <div className="cta__actions">
            <a href={company.phoneHref} className="btn btn--primary">
              <Icon name="phone" size={18} /> {company.phone}
            </a>
            <a href={`mailto:${company.email}`} className="btn btn--ghost">
              Email us
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <Process />
      <GalleryPreview />
      <CallToAction />
      <Reviews />
    </>
  )
}
