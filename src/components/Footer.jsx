import { Link } from 'react-router-dom'
import { company, services, nav } from '../data/site.js'
import { asset } from '../asset.js'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__top">
          <div className="footer__brand">
            <img src={asset('logo-light.png')} alt={company.name} width="96" height="96" />
            <p>
              {company.tagline} {company.serviceArea}.
            </p>
          </div>

          <div>
            <h4>Services</h4>
            <ul>
              {services.map((s) => (
                <li key={s.title}>{s.title}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Pages</h4>
            <ul>
              {nav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
              <li>
                <Link to="/privacy">Privacy notice</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4>Contact</h4>
            <ul>
              <li>
                <a href={company.phoneHref}>{company.phone}</a>
              </li>
              <li>
                <a href={`mailto:${company.email}`}>{company.email}</a>
              </li>
              <li>{company.hours}</li>
            </ul>
          </div>
        </div>

        <p className="footer__mark" aria-hidden="true">
          {company.shortName}
        </p>

        <div className="footer__bottom">
          <span>
            © {year} {company.name}
          </span>
          <span>{company.license}</span>
        </div>
      </div>
    </footer>
  )
}
