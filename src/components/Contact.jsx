import { company } from '../data/site.js'
import Reveal from './Reveal.jsx'
import QuoteForm from './QuoteForm.jsx'
import Icon from './Icon.jsx'

const PROMISES = [
  ['calendar', 'Home visit arranged at your convenience'],
  ['layers', 'Tailored solutions to your space'],
  ['shield', 'Clear and honest quoting'],
]

// Site-wide call-to-action band. Rendered once in App, below every page.
export default function Contact() {
  return (
    <section className="section section--ink contact" id="contact">
      <div className="wrap contact__grid">
        <Reveal className="contact__aside">
          <p className="eyebrow">Plan your bathroom</p>
          <h2>
            Let&rsquo;s talk about <em>your bathroom.</em>
          </h2>
          <p className="lead">
            Arrange a home visit to discuss your ideas, explore the options and receive a
            clear, detailed quote.
          </p>
          <div className="contact__lines">
            <a href={company.phoneHref} className="contact__big">
              <Icon name="phone" size={28} />
              {company.phone}
            </a>
            <a href={`mailto:${company.email}`} className="contact__mail">
              <Icon name="mail" size={28} />
              {company.email}
            </a>
          </div>
          <ul className="contact__promises">
            {PROMISES.map(([icon, text]) => (
              <li key={icon}>
                <Icon name={icon} size={30} />
                <span>{text}</span>
              </li>
            ))}
          </ul>
          <dl className="contact__facts">
            <div>
              <dt>Hours</dt>
              <dd>{company.hours}</dd>
            </div>
          </dl>
        </Reveal>
        <div id="quote" className="contact__form">
          <Reveal delay={120}>
            <QuoteForm />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
