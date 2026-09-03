import { Link } from 'react-router-dom'
import { company, services, nav } from '../data/site.js'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__top">
          <div>
            <div className="footer__name">{company.name}</div>
            <p style={{ maxWidth: '32ch', margin: 0 }}>
              {company.tagline} {company.serviceArea}.
            </p>
            <p style={{ margin: '10px 0 0' }}>{company.license}</p>
          </div>

          <div>
            <h4>Services</h4>
            <ul>
              {services.map((s) => (
                <li key={s.id}>{s.title}</li>
              ))}
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
            <h4 style={{ marginTop: '18px' }}>Pages</h4>
            <ul>
              {nav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>
            © {year} {company.name}
          </span>
          <span>Placeholder content — edit src/data/site.js</span>
        </div>
      </div>
    </footer>
  )
}
