import { Link } from 'react-router-dom'
import { company, stats, services, process, gallery } from '../data/site.js'
import Reviews from '../components/Reviews.jsx'

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
          <img src="/gallery/project-01.svg" alt="A completed bathroom renovation" />
        </figure>
      </div>
    </section>
  )
}

function StatLine() {
  return (
    <div className="wrap">
      <div className="statline">
        {stats.map((s) => (
          <div className="statline__item" key={s.label}>
            <span className="statline__value">{s.value}</span>
            <span className="statline__label">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Statement() {
  return (
    <section className="section section--paper2">
      <div className="wrap split">
        <div className="split__aside">
          <p className="label">The company</p>
        </div>
        <div>
          <h2 style={{ marginBottom: '24px' }}>
            A small crew that does the whole job.
          </h2>
          <p className="lead" style={{ maxWidth: '58ch' }}>
            {company.statement}
          </p>
        </div>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section className="section" id="services">
      <div className="wrap">
        <div className="split" style={{ marginBottom: 'clamp(28px, 4vw, 48px)' }}>
          <div className="split__aside">
            <p className="label">What we do</p>
          </div>
          <div>
            <h2>Bathrooms first — and everything around them.</h2>
          </div>
        </div>

        <div className="services">
          {services.map((s, i) => (
            <article className="service" key={s.id}>
              <div className="service__num">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="service__title">{s.title}</h3>
              <p className="service__desc">{s.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function SelectedWork() {
  const featured = gallery.slice(0, 3)
  return (
    <section className="section section--paper2" id="work">
      <div className="wrap">
        <div className="split" style={{ marginBottom: 'clamp(36px, 5vw, 64px)' }}>
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
              className={'work' + (i % 2 === 1 ? ' work--flip' : '')}
              key={item.id}
            >
              <div className="work__figure">
                <img src={item.image} alt={item.title} loading="lazy" />
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

function Process() {
  return (
    <section className="section section--dark" id="process">
      <div className="wrap">
        <div className="split" style={{ marginBottom: 'clamp(32px, 4vw, 52px)' }}>
          <div className="split__aside">
            <p className="label">How it works</p>
          </div>
          <div>
            <h2>Four steps, no surprises.</h2>
          </div>
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

function Contact() {
  return (
    <section className="section section--dark" id="contact">
      <div className="wrap split">
        <div className="split__aside">
          <p className="label">Start a project</p>
        </div>
        <div>
          <h2 style={{ marginBottom: '28px' }}>
            Free in-home estimates. Tell us what you have in mind.
          </h2>
          <div className="contact__lines">
            <a href={company.phoneHref} className="contact__big">
              {company.phone}
            </a>
            <a href={`mailto:${company.email}`} className="contact__big">
              {company.email}
            </a>
            <p className="contact__fine">
              {company.hours}
              <br />
              {company.serviceArea}
              <br />
              {company.license}
            </p>
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
      <StatLine />
      <Statement />
      <Services />
      <SelectedWork />
      <Process />
      <Contact />
      <Reviews />
    </>
  )
}
