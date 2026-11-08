import { Link } from 'react-router-dom'
import { company, services } from '../data/site.js'
import { asset } from '../asset.js'
import Accreditations from './Accreditations.jsx'
import Icon from './Icon.jsx'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/reviews', label: 'Reviews' },
  { href: '#contact', label: 'Contact Us' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  const legal = company.legalName || company.name
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__top">
          <div className="footer__brand">
            <img src={asset('logo-light.png')} alt="" width="104" height="104" />
            <p className="footer__legal-name">{legal}</p>
            <span className="footer__rule" aria-hidden="true" />
            <p className="footer__slogan">{company.tagline}</p>
            {company.footerBlurb && <p className="footer__blurb">{company.footerBlurb}</p>}
            <Accreditations variant="row" />
          </div>

          <div className="footer__col">
            <h4>Our services</h4>
            <ul className="footer__list">
              {services.map((s) => (
                <li key={s.title}>
                  <Icon name="chevron" size={14} />
                  <Link to="/services">{s.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h4>Quick links</h4>
            <ul className="footer__list">
              {LINKS.map((l) => (
                <li key={l.label}>
                  <Icon name="chevron" size={14} />
                  {l.to ? <Link to={l.to}>{l.label}</Link> : <a href={l.href}>{l.label}</a>}
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h4>Get in touch</h4>
            <ul className="footer__contact">
              <li>
                <Icon name="phone" size={18} />
                <a href={company.phoneHref}>{company.phone}</a>
              </li>
              <li>
                <Icon name="mail" size={18} />
                <a href={`mailto:${company.email}`}>{company.email}</a>
              </li>
              {company.location && (
                <li>
                  <Icon name="pin" size={18} />
                  <span>{company.location}</span>
                </li>
              )}
            </ul>
            {company.googleReviewsUrl && (
              <div className="footer__social">
                <a
                  href={company.googleReviewsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LCC on Google"
                >
                  G
                </a>
              </div>
            )}
          </div>

          <div className="footer__col">
            <h4>Business hours</h4>
            <table className="footer__hours">
              <tbody>
                {(company.hoursList || []).map((h) => (
                  <tr key={h.days}>
                    <th scope="row">{h.days}</th>
                    <td>{h.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {company.companyNumber && (
              <>
                <h4 className="footer__h4-gap">Company details</h4>
                <p className="footer__company">
                  {legal}
                  <br />
                  Company registration no: {company.companyNumber}
                  {company.vatNumber && (
                    <>
                      <br />
                      VAT registration no: {company.vatNumber}
                    </>
                  )}
                  {company.registeredAddress && (
                    <>
                      <br />
                      Registered office: {company.registeredAddress}
                    </>
                  )}
                </p>
              </>
            )}
          </div>
        </div>

        <div className="footer__bottom">
          <span>
            © {year} {legal}. All rights reserved.
          </span>
          <Link to="/privacy">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  )
}
