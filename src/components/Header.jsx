import { NavLink, Link } from 'react-router-dom'
import { company, nav } from '../data/site.js'
import { asset } from '../asset.js'

export default function Header() {
  return (
    <header className="header">
      <div className="wrap header__inner">
        <Link to="/" className="wordmark">
          <img
            className="wordmark__logo"
            src={asset('logo.png')}
            alt=""
            width="42"
            height="45"
          />
          <span className="wordmark__text">
            <span className="wordmark__name">{company.name}</span>
            <span className="wordmark__tag">
              Bathroom &amp; Home Construction · Est. {company.established}
            </span>
          </span>
        </Link>

        <nav className="header__nav" aria-label="Primary">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                'header__link' + (isActive ? ' is-active' : '')
              }
            >
              {item.label}
            </NavLink>
          ))}
          <a href={company.phoneHref} className="header__phone">
            {company.phone}
          </a>
        </nav>
      </div>
    </header>
  )
}
