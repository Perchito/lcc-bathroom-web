import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { company, nav } from '../data/site.js'
import { asset } from '../asset.js'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const close = () => setOpen(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock page scroll behind the open mobile menu.
  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open)
  }, [open])

  // The gallery nav link covers both portfolios (luxury + council).
  const isActive = (to) =>
    to === '/gallery' && pathname === '/council-bathrooms'

  return (
    <header className={'header' + (scrolled ? ' header--scrolled' : '')}>
      <div className="wrap header__inner">
        <Link to="/" className="wordmark" onClick={close} aria-label={`${company.name}, home`}>
          <img
            className="wordmark__logo"
            src={asset('logo-light.png')}
            alt=""
            width="48"
            height="48"
          />
          <span className="wordmark__text">
            <span className="wordmark__name">{company.shortName}</span>
            <span className="wordmark__tag">Bathrooms &amp; Services</span>
          </span>
        </Link>

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
          <a href="#quote" className="btn btn--outline header__cta" onClick={close}>
            Free quote
          </a>
        </nav>

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
        </button>
      </div>
    </header>
  )
}
