import { useEffect, useMemo, useState, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useSpring, animated } from '@react-spring/web'
import { gallery, gallerySectors } from '../data/site.js'
import { asset } from '../asset.js'
import Reveal from '../components/Reveal.jsx'

function ProjectCard({ item, onOpen }) {
  const [hovered, setHovered] = useState(false)
  const style = useSpring({
    transform: hovered ? 'translateY(-4px)' : 'translateY(0px)',
    config: { tension: 280, friction: 18 },
  })

  return (
    <animated.button
      type="button"
      style={style}
      className="project"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onOpen}
      aria-label={`Open ${item.title}`}
    >
      <div className="project__figure">
        <img src={asset(item.image)} alt={item.title} loading="lazy" />
      </div>
      <div className="project__title">{item.title}</div>
      <div className="project__meta">{item.meta}</div>
    </animated.button>
  )
}

function Lightbox({ active, onClose, onPrev, onNext }) {
  const backdrop = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { tension: 300, friction: 30 },
  })
  const figure = useSpring({
    from: { opacity: 0, transform: 'translateY(14px) scale(0.985)' },
    to: { opacity: 1, transform: 'translateY(0px) scale(1)' },
    config: { tension: 210, friction: 26 },
  })

  return (
    <animated.div
      style={backdrop}
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={active.title}
      onClick={onClose}
    >
      <button
        type="button"
        className="lightbox__btn lightbox__close"
        aria-label="Close"
        onClick={onClose}
      >
        &times;
      </button>

      <button
        type="button"
        className="lightbox__btn lightbox__nav lightbox__nav--prev"
        aria-label="Previous project"
        onClick={(e) => {
          e.stopPropagation()
          onPrev()
        }}
      >
        &lsaquo;
      </button>

      <animated.figure
        style={figure}
        className="lightbox__figure"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={asset(active.image)} alt={active.title} />
        <figcaption className="lightbox__cap">
          <strong>{active.title}</strong>
          <span>{active.meta}</span>
        </figcaption>
      </animated.figure>

      <button
        type="button"
        className="lightbox__btn lightbox__nav lightbox__nav--next"
        aria-label="Next project"
        onClick={(e) => {
          e.stopPropagation()
          onNext()
        }}
      >
        &rsaquo;
      </button>
    </animated.div>
  )
}

export default function Gallery({ defaultSector = 'luxury' }) {
  const sector =
    gallerySectors.find((s) => s.id === defaultSector) ?? gallerySectors[0]

  // App.jsx gives each sector route its own `key`, so this component remounts
  // (and state resets) when you move between the luxury and council portfolios.
  const [filter, setFilter] = useState('All')
  const [activeIndex, setActiveIndex] = useState(null)

  const sectorItems = useMemo(
    () => gallery.filter((g) => g.sector === sector.id),
    [sector.id],
  )

  const items = useMemo(
    () =>
      filter === 'All'
        ? sectorItems
        : sectorItems.filter((g) => g.category === filter),
    [filter, sectorItems],
  )

  function changeFilter(cat) {
    setActiveIndex(null) // close any open lightbox before the list changes
    setFilter(cat)
  }

  const open = activeIndex !== null
  const active = open ? items[activeIndex] : null

  useEffect(() => {
    if (!open) return
    function onKey(e) {
      if (e.key === 'Escape') setActiveIndex(null)
      if (e.key === 'ArrowRight') setActiveIndex((i) => (i + 1) % items.length)
      if (e.key === 'ArrowLeft')
        setActiveIndex((i) => (i - 1 + items.length) % items.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, items.length])

  return (
    <>
      <section className="page-head">
        <Reveal>
          <div className="wrap">
            <p className="label">Selected work</p>
            <h1 className="display">{sector.label}</h1>
            <p className="lead" style={{ maxWidth: '52ch' }}>
              {sector.intro} These are placeholder images — see{' '}
              <code>PHOTOS.md</code> for what to drop into{' '}
              <code>/public/gallery/</code>.
            </p>

            <div
              className="sector-toggle"
              role="tablist"
              aria-label="Choose a portfolio"
            >
              {gallerySectors.map((s) => (
                <Link
                  key={s.id}
                  to={s.path}
                  role="tab"
                  aria-selected={s.id === sector.id}
                  className={
                    'sector-toggle__btn' +
                    (s.id === sector.id ? ' is-active' : '')
                  }
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="filters" role="tablist" aria-label="Filter projects">
            {sector.categories.map((cat, i) => (
              <Fragment key={cat}>
                {i > 0 && (
                  <span className="filter__sep" aria-hidden="true">
                    /
                  </span>
                )}
                <button
                  type="button"
                  role="tab"
                  aria-selected={filter === cat}
                  className={'filter' + (filter === cat ? ' is-active' : '')}
                  onClick={() => changeFilter(cat)}
                >
                  {cat}
                </button>
              </Fragment>
            ))}
          </div>

          <Reveal key={filter}>
            <div className="grid">
              {items.map((item, i) => (
                <ProjectCard
                  key={item.id}
                  item={item}
                  onOpen={() => setActiveIndex(i)}
                />
              ))}
            </div>
          </Reveal>

          {items.length === 0 && (
            <p className="lead">No projects in this category yet.</p>
          )}
        </div>
      </section>

      {open && active && (
        <Lightbox
          active={active}
          onClose={() => setActiveIndex(null)}
          onPrev={() =>
            setActiveIndex((i) => (i - 1 + items.length) % items.length)
          }
          onNext={() => setActiveIndex((i) => (i + 1) % items.length)}
        />
      )}
    </>
  )
}
