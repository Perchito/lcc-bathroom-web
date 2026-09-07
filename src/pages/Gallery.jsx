import { useEffect, useMemo, useRef, useState, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useSpring, animated } from '@react-spring/web'
import { gallery, gallerySectors } from '../data/site.js'
import { photo } from '../img.js'
import Reveal from '../components/Reveal.jsx'

// A project can carry a single `image` (the grid thumbnail) plus any number of
// extra `images`. This returns the full, de-duplicated photo list for a project,
// always with the main `image` first.
function photosOf(item) {
  const extra = Array.isArray(item.images) ? item.images.filter(Boolean) : []
  const all = [item.image, ...extra].filter(Boolean)
  return [...new Set(all)]
}

const CARD_SIZES = '(min-width: 720px) 45vw, 92vw'
const LIGHTBOX_SIZES = '(min-width: 1100px) 1000px, 100vw'

// On a card the dots are a non-interactive hint (the card itself is a <button>,
// so a nested <button> would be invalid). In the lightbox they're clickable.
function Dots({ count, index, onDot }) {
  const interactive = typeof onDot === 'function'
  const Item = interactive ? 'button' : 'span'
  return (
    <div
      className="dots"
      aria-hidden={interactive ? undefined : true}
      role={interactive ? 'tablist' : undefined}
      aria-label={interactive ? 'Project photos' : undefined}
    >
      {Array.from({ length: count }, (_, i) => (
        <Item
          key={i}
          className={'dots__dot' + (i === index ? ' is-active' : '')}
          {...(interactive
            ? {
                type: 'button',
                role: 'tab',
                'aria-selected': i === index,
                'aria-label': `Photo ${i + 1} of ${count}`,
                onClick: (e) => {
                  e.stopPropagation()
                  onDot(i)
                },
              }
            : {})}
        />
      ))}
    </div>
  )
}

function ProjectCard({ item, onOpen }) {
  const photos = useMemo(() => photosOf(item), [item])
  const multi = photos.length > 1

  const [hovered, setHovered] = useState(false)
  const [idx, setIdx] = useState(0)
  const style = useSpring({
    transform: hovered ? 'translateY(-4px)' : 'translateY(0px)',
    config: { tension: 280, friction: 18 },
  })

  // Swipe-to-browse on touch, without hijacking a tap (which opens the lightbox)
  // or a vertical scroll.
  const start = useRef(null)
  const swiped = useRef(false)

  function onTouchStart(e) {
    const t = e.touches[0]
    start.current = { x: t.clientX, y: t.clientY }
    swiped.current = false
  }
  function onTouchEnd(e) {
    if (!start.current) return
    const t = e.changedTouches[0]
    const dx = t.clientX - start.current.x
    const dy = t.clientY - start.current.y
    start.current = null
    if (multi && Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      swiped.current = true
      setIdx((i) =>
        dx < 0
          ? (i + 1) % photos.length
          : (i - 1 + photos.length) % photos.length,
      )
    }
  }
  function handleClick() {
    if (swiped.current) {
      swiped.current = false
      return
    }
    onOpen(idx)
  }

  return (
    <animated.button
      type="button"
      style={style}
      className="project"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-label={`Open ${item.title}`}
    >
      <div className="project__figure">
        <img
          {...photo(photos[idx], { sizes: CARD_SIZES })}
          alt={item.title}
          width="1200"
          height="900"
          loading="lazy"
          decoding="async"
        />
        {multi && (
          <>
            <span className="project__count" aria-hidden="true">
              {idx + 1} / {photos.length}
            </span>
            <Dots count={photos.length} index={idx} />
          </>
        )}
      </div>
      <div className="project__title">{item.title}</div>
      <div className="project__meta">{item.meta}</div>
    </animated.button>
  )
}

function Lightbox({ active, photos, photoIndex, onClose, onPrev, onNext, onDot }) {
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

  const touchX = useRef(null)
  function onTouchStart(e) {
    touchX.current = e.changedTouches[0].clientX
  }
  function onTouchEnd(e) {
    if (touchX.current == null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    touchX.current = null
    if (Math.abs(dx) < 40) return
    if (dx < 0) onNext()
    else onPrev()
  }

  const src = photos[photoIndex] ?? active.image
  const multi = photos.length > 1

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
        aria-label="Previous photo"
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
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <img
          {...photo(src, { sizes: LIGHTBOX_SIZES, quality: 78 })}
          alt={active.title}
        />

        {multi && (
          <Dots
            count={photos.length}
            index={photoIndex}
            onDot={onDot}
          />
        )}

        <figcaption className="lightbox__cap">
          <strong>{active.title}</strong>
          <span>
            {active.meta}
            {multi ? ` · ${photoIndex + 1} / ${photos.length}` : ''}
          </span>
        </figcaption>
      </animated.figure>

      <button
        type="button"
        className="lightbox__btn lightbox__nav lightbox__nav--next"
        aria-label="Next photo"
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
  const [photoIndex, setPhotoIndex] = useState(0)

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
    setPhotoIndex(0)
    setFilter(cat)
  }

  const open = activeIndex !== null
  const active = open ? items[activeIndex] : null
  const photos = active ? photosOf(active) : []

  function openProject(i, startAt = 0) {
    setActiveIndex(i)
    setPhotoIndex(startAt)
  }

  function close() {
    setActiveIndex(null)
    setPhotoIndex(0)
  }

  // One continuous sequence: step through the photos of the current project,
  // then roll over into the next / previous project.
  function step(dir) {
    if (activeIndex === null || items.length === 0) return
    const current = photosOf(items[activeIndex])
    const next = photoIndex + dir
    if (next >= 0 && next < current.length) {
      setPhotoIndex(next)
      return
    }
    const nextProject = (activeIndex + dir + items.length) % items.length
    const nextPhotos = photosOf(items[nextProject])
    setActiveIndex(nextProject)
    setPhotoIndex(dir > 0 ? 0 : Math.max(0, nextPhotos.length - 1))
  }

  useEffect(() => {
    if (!open) return
    function onKey(e) {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, activeIndex, photoIndex, items])

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
                  key={item.title}
                  item={item}
                  onOpen={(startAt) => openProject(i, startAt)}
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
          key={`${activeIndex}-${photoIndex}`}
          active={active}
          photos={photos}
          photoIndex={photoIndex}
          onClose={close}
          onPrev={() => step(-1)}
          onNext={() => step(1)}
          onDot={(i) => setPhotoIndex(i)}
        />
      )}
    </>
  )
}
