import { useEffect, useMemo, useRef, useState, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useSpring, animated } from '@react-spring/web'
import { gallery, gallerySectors } from '../data/site.js'
import { photo, blurStyle } from '../img.js'
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

function ProjectCard({ item, onOpen, eager = false }) {
  const photos = useMemo(() => photosOf(item), [item])
  const multi = photos.length > 1

  const [hovered, setHovered] = useState(false)
  const [idx, setIdx] = useState(0)
  const [primed, setPrimed] = useState(false)
  const style = useSpring({
    transform: hovered ? 'translateY(-4px)' : 'translateY(0px)',
    config: { tension: 280, friction: 18 },
  })

  // Once the visitor shows intent (hover on desktop, first touch on mobile),
  // quietly fetch this project's other photos so swiping is instant.
  useEffect(() => {
    if (!primed || !multi) return
    for (const p of photos) {
      const pr = photo(p, { sizes: CARD_SIZES })
      const im = new Image()
      if (pr.srcSet) im.srcset = pr.srcSet
      if (pr.sizes) im.sizes = pr.sizes
      im.src = pr.src
    }
  }, [primed, multi, photos])

  // Swipe-to-browse on touch, without hijacking a tap (which opens the lightbox)
  // or a vertical scroll.
  const start = useRef(null)
  const swiped = useRef(false)

  function onTouchStart(e) {
    setPrimed(true)
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
      onMouseEnter={() => {
        setHovered(true)
        setPrimed(true)
      }}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-label={`Open ${item.title}`}
    >
      <div className="project__figure" style={blurStyle(photos[idx])}>
        <img
          {...photo(photos[idx], { sizes: CARD_SIZES })}
          alt={item.title}
          loading={eager ? 'eager' : 'lazy'}
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

  // Warm the neighbouring photos so left/right feels instant.
  useEffect(() => {
    for (const n of [photoIndex - 1, photoIndex + 1]) {
      const p = photos[n]
      if (!p) continue
      const pr = photo(p, { sizes: LIGHTBOX_SIZES })
      const im = new Image()
      if (pr.srcSet) im.srcset = pr.srcSet
      if (pr.sizes) im.sizes = pr.sizes
      im.src = pr.src
    }
  }, [photoIndex, photos])

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

      {multi && (
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
      )}

      <animated.figure
        style={figure}
        className="lightbox__figure"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <img
          {...photo(src, { sizes: LIGHTBOX_SIZES })}
          alt={active.title}
          decoding="async"
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

      {multi && (
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
      )}
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

  // Cycle through the photos of the open project only — wrapping around at the
  // ends, never moving on to another project.
  function step(dir) {
    if (activeIndex === null) return
    const count = photosOf(items[activeIndex]).length
    if (count < 2) return
    setPhotoIndex((i) => (i + dir + count) % count)
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
                  eager={i < 4}
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
          key={activeIndex}
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
