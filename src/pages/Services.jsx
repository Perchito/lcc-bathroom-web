import { company, services, process, faq, areas } from '../data/site.js'
import Reveal from '../components/Reveal.jsx'

export default function Services() {
  return (
    <>
      <section className="page-head">
        <Reveal>
          <div className="wrap">
            <p className="label">What we do</p>
            <h1 className="display">Bathroom fitting in London</h1>
            <p className="lead" style={{ maxWidth: '52ch' }}>
              Full renovations, shower rooms, wet rooms and cloakrooms, with the
              plumbing and tiling done by the same small team from start to finish.
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

      <section className="section" id="areas">
        <Reveal>
          <div className="wrap split">
            <div className="split__aside">
              <p className="label">Areas we cover</p>
            </div>
            <div>
              <h2 style={{ marginBottom: '16px' }}>All of London.</h2>
              <p className="lead" style={{ maxWidth: '58ch' }}>
                We fit bathrooms across London. Recent jobs include homes in{' '}
                {areas.join(', ').replace(/, ([^,]*)$/, ' and $1')}.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="section section--paper2" id="faq">
        <div className="wrap split">
          <div className="split__aside">
            <p className="label">Questions</p>
          </div>
          <div className="faq">
            <h2 style={{ marginBottom: '24px' }}>Common questions.</h2>
            {faq.map((f) => (
              <details className="faq__item" key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
