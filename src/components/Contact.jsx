import { company } from '../data/site.js'
import Reveal from './Reveal.jsx'
import QuoteForm from './QuoteForm.jsx'

// Site-wide call-to-action band. Rendered once in App, below every page.
export default function Contact() {
  return (
    <section className="section section--ink contact" id="contact">
      <div className="wrap contact__grid">
        <Reveal className="contact__aside">
          <p className="eyebrow">Start your project</p>
          <h2>
            Let&rsquo;s talk about <em>your bathroom.</em>
          </h2>
          <p className="lead">
            Free home visit and a clear written quote. No pressure, no fee.
          </p>
          <div className="contact__lines">
            <a href={company.phoneHref} className="contact__big">
              {company.phone}
            </a>
            <a href={`mailto:${company.email}`} className="contact__mail">
              {company.email}
            </a>
          </div>
          <dl className="contact__facts">
            <div>
              <dt>Hours</dt>
              <dd>{company.hours}</dd>
            </div>
            <div>
              <dt>Area</dt>
              <dd>{company.serviceArea}</dd>
            </div>
            <div>
              <dt>Cover</dt>
              <dd>{company.license}</dd>
            </div>
          </dl>
        </Reveal>
        <Reveal delay={120}>
          <QuoteForm />
        </Reveal>
      </div>
    </section>
  )
}
