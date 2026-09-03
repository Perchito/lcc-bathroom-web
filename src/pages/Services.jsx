import { company, services, process } from '../data/site.js'

export default function Services() {
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <p className="label">What we do</p>
          <h1 className="display">Services</h1>
          <p className="lead" style={{ maxWidth: '52ch' }}>
            Bathrooms first — and the plumbing, tiling, carpentry and finishing
            around them. One accountable crew from start to finish.
          </p>
        </div>
      </section>

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

      <section className="section">
        <div className="wrap">
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

      <section className="section section--dark" id="process">
        <div className="wrap">
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
    </>
  )
}
