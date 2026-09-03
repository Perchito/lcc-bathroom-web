import { company, services, process } from '../data/site.js'
import Reveal from '../components/Reveal.jsx'

export default function Services() {
  return (
    <>
      <section className="page-head">
        <Reveal>
          <div className="wrap">
            <p className="label">What we do</p>
            <h1 className="display">Services</h1>
            <p className="lead" style={{ maxWidth: '52ch' }}>
              Bathrooms first — and the plumbing, tiling, carpentry and finishing
              around them. One accountable crew from start to finish.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="section section--paper2">
        <Reveal>
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
        </Reveal>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal>
            <div
              className="split"
              style={{ marginBottom: 'clamp(28px, 4vw, 48px)' }}
            >
              <div className="split__aside">
                <p className="label">Scope</p>
              </div>
              <div>
                <h2>What we take on.</h2>
              </div>
            </div>
          </Reveal>

          <div className="services">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={Math.min(i, 4) * 70}>
                <article className="service">
                  <div className="service__num">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="service__title">{s.title}</h3>
                  <p className="service__desc">{s.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dark" id="process">
        <div className="wrap">
          <Reveal>
            <div
              className="split"
              style={{ marginBottom: 'clamp(32px, 4vw, 52px)' }}
            >
              <div className="split__aside">
                <p className="label">How it works</p>
              </div>
              <div>
                <h2>Four steps, no surprises.</h2>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="steps">
              {process.map((p) => (
                <div className="step" key={p.step}>
                  <div className="step__num">{p.step}</div>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
