import { NavLink, Link } from 'react-router-dom'
import { company, nav } from '../data/site.js'

export default function Header() {
  return (
    <header className="header">
      <div className="container header__inner">
        <Link to="/" className="brand">
          <span className="brand__mark">{company.shortName}</span>
          <span className="brand__text">
            <span className="brand__name">{company.name}</span>
            <span className="brand__sub">Bathrooms &amp; Construction</span>
          </span>
        </Link>

        <nav className="nav" aria-label="Primary">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                'nav__link' + (isActive ? ' is-active' : '')
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <a href={company.phoneHref} className="btn btn--dark header__cta">
          Call {company.phone}
        </a>
      </div>
    </header>
  )
}
