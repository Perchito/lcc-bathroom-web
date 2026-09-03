import { Link } from 'react-router-dom'
import { company, services, nav } from '../data/site.js'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <h4>{company.name}</h4>
            <p style={{ maxWidth: '34ch' }}>{company.tagline}</p>
            <p>{company.serviceArea}</p>
            <p>{company.license}</p>
          </div>

          <div>
            <h4>Services</h4>
            <ul>
              {services.slice(0, 5).map((s) => (
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
            © {year} {company.name}. All rights reserved.
          </span>
          <span>Built for the family. Placeholder content — update in src/data/site.js</span>
        </div>
      </div>
    </footer>
  )
}
