import { useEffect, useMemo, useState } from 'react'
import { gallery, galleryCategories, company } from '../data/site.js'

export default function Gallery() {
  const [filter, setFilter] = useState('All')
  const [activeIndex, setActiveIndex] = useState(null)

  const items = useMemo(
    () =>
      filter === 'All'
        ? gallery
        : gallery.filter((g) => g.category === filter),
    [filter],
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
      if (e.key === 'ArrowRight')
        setActiveIndex((i) => (i + 1) % items.length)
      if (e.key === 'ArrowLeft')
        setActiveIndex((i) => (i - 1 + items.length) % items.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, items.length])

  return (
    <>
      <section className="page-head">
        <div className="container">
          <p className="section__eyebrow" style={{ color: 'var(--amber)' }}>
            Portfolio
          </p>
          <h1>Renovations gallery</h1>
          <p>
            A selection of bathroom, kitchen, and addition projects completed by{' '}
            {company.name}. These are placeholder images — drop real project
            photos into <code>/public/gallery/</code> and update{' '}
            <code>src/data/site.js</code>.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="filters" role="tablist" aria-label="Filter projects">
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={filter === cat}
                className={'filter' + (filter === cat ? ' is-active' : '')}
                onClick={() => changeFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="gallery-grid">
            {items.map((item, i) => (
              <button
                type="button"
                className="tile"
                key={item.id}
                onClick={() => setActiveIndex(i)}
                aria-label={`Open ${item.title}`}
              >
                <img src={item.image} alt={item.title} loading="lazy" />
                <span className="tile__caption">
                  <strong>{item.title}</strong>
                  <span>{item.category}</span>
                </span>
              </button>
            ))}
          </div>

          {items.length === 0 && (
            <p className="section__lead">No projects in this category yet.</p>
          )}
        </div>
      </section>

      {open && active && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={() => setActiveIndex(null)}
        >
          <button
            type="button"
            className="lightbox__close"
            aria-label="Close"
            onClick={() => setActiveIndex(null)}
          >
            ✕
          </button>

          <button
            type="button"
            className="lightbox__nav lightbox__nav--prev"
            aria-label="Previous project"
            onClick={(e) => {
              e.stopPropagation()
              setActiveIndex((i) => (i - 1 + items.length) % items.length)
            }}
          >
            ‹
          </button>

          <figure
            className="lightbox__figure"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={active.image} alt={active.title} />
            <figcaption className="lightbox__cap">
              <strong>{active.title}</strong>
              {active.blurb ? ` — ${active.blurb}` : ''}
            </figcaption>
          </figure>

          <button
            type="button"
            className="lightbox__nav lightbox__nav--next"
            aria-label="Next project"
            onClick={(e) => {
              e.stopPropagation()
              setActiveIndex((i) => (i + 1) % items.length)
            }}
          >
            ›
          </button>
        </div>
      )}
    </>
  )
}
