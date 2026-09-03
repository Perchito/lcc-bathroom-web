import { useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { company, nav } from '../data/site.js'
import { asset } from '../asset.js'

export default function Header() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  const { pathname } = useLocation()

  // The gallery nav link covers both portfolios (luxury + council).
  const isActive = (to) =>
    to === '/gallery' && pathname === '/council-bathrooms'

  return (
    <header className="header">
      <div className="wrap header__inner">
        <Link to="/" className="wordmark" onClick={close}>
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

        <button
          type="button"
          className="nav-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="nav-toggle__bar" />
          <span className="nav-toggle__bar" />
          <span className="nav-toggle__bar" />
        </button>

        <nav
          id="primary-nav"
          className={'header__nav' + (open ? ' is-open' : '')}
          aria-label="Primary"
        >
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={close}
              className={({ isActive: routeActive }) =>
                'header__link' +
                (routeActive || isActive(item.to) ? ' is-active' : '')
              }
            >
              {item.label}
            </NavLink>
          ))}
          <a href={company.phoneHref} className="header__phone" onClick={close}>
            {company.phone}
          </a>
        </nav>
      </div>
    </header>
  )
}
