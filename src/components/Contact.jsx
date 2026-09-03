import { company } from '../data/site.js'

// Site-wide call-to-action band. Rendered once in App, below every page.
export default function Contact() {
  return (
    <section className="section section--dark" id="contact">
      <div className="wrap split reveal" data-reveal="">
        <div className="split__aside">
          <p className="label">Start a project</p>
        </div>
        <div>
          <h2 style={{ marginBottom: '28px' }}>
            Free estimates. Tell us what you have in mind.
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
