import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { company, stats, services, process, reviews, gallery, whyUs } from '../data/site.js'
import { photo, blurStyle } from '../img.js'
import Stars from '../components/Stars.jsx'
import Arrow from '../components/Arrow.jsx'
import Accreditations from '../components/Accreditations.jsx'


// The homepage leads with the first luxury project that has a full photo set
// (the gallery's SVG placeholders never appear here).
const featured =
  gallery.find((g) => g.sector === 'luxury' && g.images?.length) ??
  gallery.find((g) => g.sector === 'luxury')
const featuredPhotos = [
  ...new Set([featured.image, ...(featured.images || [])].filter(Boolean)),
]

// "Transforming spaces, one bathroom at a time." → split after the first comma
// (or, without one, after the first word); the second half is set in italic.
function Headline({ text }) {
  const cut = text.indexOf(',')
  const [first, ...rest] =
    cut > 0 ? [text.slice(0, cut + 1), text.slice(cut + 1).trim()] : text.split(' ')
  return (
    <h1 className="hero__title">
      <span className="line"><span className="line__in">{first}</span></span>
      {rest.length > 0 && (
        <span className="line">
          <em className="line__in">{rest.join(' ')}</em>
        </span>
      )}
    </h1>
  )
}

function Hero() {
  const avg = reviews.reduce((s, r) => s + r.rating, 0) / (reviews.length || 1)
  return (
    <section className="hero" data-hero>
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <p className="eyebrow" data-in>
            Bathroom fitters · {company.serviceArea}
          </p>
          <Headline text={company.tagline} />
          <p className="hero__support" data-in>
            {company.heroSupport}
          </p>
          <div className="hero__actions" data-in>
            <a href="#quote" className="btn btn--brass">
              Request a free quote <Arrow />
            </a>
            <Link to="/gallery" className="btn btn--ghost">
              View our work
            </Link>
          </div>
          <a
            className="hero__rating"
            href={company.googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-in
          >
            <Stars rating={5} />
            <span>
              <strong>{avg.toFixed(1)}</strong> on Google{company.googleReviewCount && ` from ${company.googleReviewCount} reviews`} · read them
            </span>
          </a>
        </div>

        <div className="hero__media">
          <figure className="hero__main" style={blurStyle(featuredPhotos[0])}>
            <img
              {...photo(featuredPhotos[0], { sizes: '(min-width: 960px) 40vw, 100vw' })}
              alt={featured.title}
              fetchPriority="high"
            />
          </figure>
          {featuredPhotos[2] && (
            <figure className="hero__inset" style={blurStyle(featuredPhotos[2])} data-inset>
              <img {...photo(featuredPhotos[2], { sizes: '240px' })} alt="" />
            </figure>
          )}
          <p className="hero__caption" data-in>
            <span>Recent project</span>
            {featured.title}
          </p>
        </div>
      </div>

      <div className="wrap">
        <ul className="hero__stats">
          {stats.map((s) => (
            <li key={s.label} data-stat>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function ServicesBlock() {
  return (
    <section className="section section--stone" id="services">
      <div className="wrap svc">
        <div className="svc__head">
          <p className="eyebrow" data-up>Our services</p>
          <h2 data-up>
            Every trade under <em>one roof.</em>
          </h2>
          <p className="lead" data-up>
            From the first measure to the last bead of silicone, one small team
            plans, builds and finishes your room. One point of contact, no gaps.
          </p>
          <div data-up>
            <Link to="/services" className="tlink">
              All services <Arrow />
            </Link>
          </div>
        </div>

        <ol className="svc__list">
          {services.map((s, i) => (
            <li key={s.title} className="svc__item" data-up>
              <span className="svc__num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function WhyUs() {
  return (
    <section className="section section--paper2 why" id="why-us">
      <div className="wrap">
        <div className="why__head">
          <p className="eyebrow" data-up>What makes us different</p>
          <h2 data-up>{whyUs.title}</h2>
          <p className="lead" data-up>{whyUs.lead}</p>
          {whyUs.intro.map((t) => (
            <p key={t} data-up>{t}</p>
          ))}
        </div>
        <ol className="services">
          {whyUs.points.map((p, i) => (
            <li key={p.title} className="service" data-up>
              <span className="service__num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="service__title">{p.title}</h3>
              <p className="service__desc">{p.text}</p>
            </li>
          ))}
        </ol>
        <div className="why__promise" data-up>
          <p className="eyebrow">Our promise</p>
          <p className="lead">{whyUs.promise}</p>
          <p className="why__sign">{whyUs.sign}</p>
          <p className="why__tagline">{whyUs.tagline}</p>
        </div>
      </div>
    </section>
  )
}

function FeaturedProject() {
  const rest = featuredPhotos.slice(1, 4)
  if (!rest.length) return null
  return (
    <section className="section section--ink feature" id="work">
      <div className="wrap">
        <div className="feature__head">
          <div>
            <p className="eyebrow" data-up>Featured project</p>
            <h2 data-up>{featured.title}</h2>
          </div>
          <div className="feature__intro" data-up>
            <p className="feature__meta">{featured.meta}</p>
            <p>{featured.blurb}</p>
            <Link to="/gallery" className="tlink">
              See the full gallery <Arrow />
            </Link>
          </div>
        </div>

        <div className="mosaic">
          {rest.map((src, i) => (
            <figure
              key={src}
              className={`mosaic__item mosaic__item--${i + 1}`}
              style={blurStyle(src)}
              data-reveal
            >
              <img
                {...photo(src, { sizes: '(min-width: 960px) 34vw, 100vw' })}
                alt={`${featured.title}, photo ${i + 2}`}
                loading="lazy"
                decoding="async"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

function Process() {
  return (
    <section className="section section--stone process" id="process">
      <div className="wrap">
        <div className="process__head">
          <p className="eyebrow" data-up>How it works</p>
          <h2 data-up>
            Four steps. <em>No surprises.</em>
          </h2>
        </div>
        <div className="process__track">
          <span className="process__line" aria-hidden="true" data-line />
          <ol className="process__steps">
            {process.map((p) => (
              <li key={p.step} className="process__step" data-up>
                <span className="process__num">{p.step}</span>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

function ReviewsBlock() {
  if (!reviews.length) return null
  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
  // Lead with the first review short enough to read as a pull quote.
  const lead = reviews.find((r) => r.text.length <= 450) ?? reviews[0]
  const rest = reviews.filter((r) => r !== lead)
  return (
    <section className="section section--stone2 voices" id="reviews">
      <div className="wrap">
        <div className="voices__top">
          <div className="voices__score" data-up>
            <span className="voices__big">{avg.toFixed(1)}</span>
            <Stars rating={5} />
            <a
              className="voices__src"
              href={company.googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {company.googleReviewCount ? `${company.googleReviewCount} Google reviews` : 'Rated on Google'}
            </a>
          </div>
          <figure className="voices__lead" data-up>
            <blockquote className={lead.text.length > 320 ? 'is-long' : ''}>
              &ldquo;{lead.text}&rdquo;
            </blockquote>
            <figcaption>
              <strong>{lead.name}</strong> · {lead.job}
            </figcaption>
          </figure>
        </div>

        <div className="voices__row" tabIndex={0} aria-label="More client reviews">
          {rest.map((r) => (
            <figure className="voice" key={r.name}>
              <Stars rating={r.rating} />
              <blockquote>&ldquo;{r.text}&rdquo;</blockquote>
              <figcaption>
                <strong>{r.name}</strong>
                <span>{r.job}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="voices__more">
          <Link to="/reviews" className="tlink">
            Read every review <Arrow />
          </Link>
        </div>
      </div>
    </section>
  )
}

// Motion: one GSAP context for the page. With "reduce motion" on, none of this
// runs, so nothing is hidden or moved and everything renders in place.
// The hero entrance is CSS (.hero in index.css) so the prerendered page shows
// straight away; GSAP loads after hydration and only drives the scroll effects.
function useHomeMotion(root) {
  useEffect(() => {
    let ctx
    let cancelled = false
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ default: gsap }, { ScrollTrigger }]) => {
      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger)
      ctx = gsap.context(() => {
        gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
          const ease = 'power3.out'
          const heroScrub = { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
          gsap.to('.hero__main img', { yPercent: 8, ease: 'none', scrollTrigger: heroScrub })
          gsap.to('[data-inset]', { yPercent: -30, ease: 'none', scrollTrigger: { ...heroScrub } })

          gsap.utils.toArray('[data-up]').forEach((el) => {
            gsap.from(el, {
              y: 28,
              autoAlpha: 0,
              duration: 0.9,
              ease,
              scrollTrigger: { trigger: el, start: 'top 90%', once: true },
            })
          })

          gsap.utils.toArray('[data-reveal]').forEach((el, i) => {
            gsap.from(el, {
              clipPath: 'inset(0% 0% 100% 0%)',
              duration: 1.2,
              delay: i * 0.12,
              ease: 'expo.out',
              scrollTrigger: { trigger: el, start: 'top 88%', once: true },
            })
            gsap.fromTo(
              el.querySelector('img'),
              { yPercent: -5 },
              {
                yPercent: 5,
                ease: 'none',
                scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
              },
            )
          })

          gsap.from('[data-line]', {
            scaleX: 0,
            ease: 'none',
            scrollTrigger: { trigger: '.process__track', start: 'top 80%', end: 'bottom 55%', scrub: true },
          })
        })
      }, root)
    })
    return () => {
      cancelled = true
      ctx?.revert()
    }
  }, [root])
}

export default function Home() {
  const root = useRef(null)
  useHomeMotion(root)
  return (
    <div ref={root}>
      <Hero />
      <Accreditations
        title="Checked and approved for the work we do."
        lead="We are Constructionline members, PQS Health & Safety approved (SSIP) and fully insured, with £5m public and £10m employers' liability."
      />
      <ServicesBlock />
      <WhyUs />
      <FeaturedProject />
      <Process />
      <ReviewsBlock />
    </div>
  )
}
