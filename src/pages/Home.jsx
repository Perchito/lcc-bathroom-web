import { Link } from 'react-router-dom'
import { useSpring, animated } from '@react-spring/web'
import { company, stats, gallery } from '../data/site.js'
import { asset } from '../asset.js'
import Reveal from '../components/Reveal.jsx'

// Short, snappy springs — the whole entrance settles in well under a second.
const ENTER = { tension: 210, friction: 26 }

function Hero() {
  const meta = useSpring({
    from: { opacity: 0, transform: 'translateY(16px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: ENTER,
  })
  const head = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    delay: 90,
    config: ENTER,
  })
  const support = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    delay: 170,
    config: ENTER,
  })
  const actions = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    delay: 250,
    config: ENTER,
  })
  const visual = useSpring({
    from: { opacity: 0, transform: 'scale(0.97)' },
    to: { opacity: 1, transform: 'scale(1)' },
    delay: 150,
    config: ENTER,
  })

  return (
    <section className="hero">
      <div className="wrap hero__inner">
        <div className="hero__copy">
          <animated.div style={meta} className="hero__meta">
            <span className="label">Est. {company.established}</span>
            <span className="label" style={{ color: 'var(--ink-3)' }}>
              {company.serviceArea}
            </span>
          </animated.div>
          <animated.h1 style={head} className="display">
            {company.tagline}
          </animated.h1>
          <animated.p style={support} className="hero__support">
            {company.heroSupport}
          </animated.p>
          <animated.div style={actions} className="hero__actions">
            <Link to="/gallery" className="tlink">
              View selected work
              <span className="tlink__arrow" aria-hidden="true">
                &rarr;
              </span>
            </Link>
            <a href={company.phoneHref} className="tlink">
              {company.phone}
            </a>
          </animated.div>
        </div>

        <animated.figure style={visual} className="hero__figure">
          {/* PHOTO 1 — see PHOTOS.md */}
          <img
            src={asset('gallery/project-01.svg')}
            alt="A completed bathroom renovation"
          />
        </animated.figure>
      </div>
    </section>
  )
}

function StatLine() {
  return (
    <div className="wrap">
      <Reveal>
        <div className="statline">
          {stats.map((s) => (
            <div className="statline__item" key={s.label}>
              <span className="statline__value">{s.value}</span>
              <span className="statline__label">{s.label}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  )
}

function SelectedWork() {
  const featured = gallery.filter((g) => g.sector === 'luxury').slice(0, 3)
  return (
    <section className="section section--paper2" id="work">
      <div className="wrap">
        <Reveal>
          <div
            className="split"
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
        </Reveal>

        <div className="works">
          {featured.map((item, i) => (
            <Reveal key={item.id} delay={i * 90}>
              <article className={'work' + (i % 2 === 1 ? ' work--flip' : '')}>
                <div className="work__figure">
                  <img
                    src={asset(item.image)}
                    alt={item.title}
                    loading="lazy"
                  />
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
            </Reveal>
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
