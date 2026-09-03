import { useEffect, useMemo, useState, Fragment } from 'react'
import { gallery, galleryCategories, company } from '../data/site.js'
import { asset } from '../asset.js'

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
        <div className="wrap">
          <p className="label">Selected work</p>
          <h1 className="display">Projects</h1>
          <p className="lead" style={{ maxWidth: '52ch' }}>
            Bathroom, kitchen, and addition work completed by {company.name}.
            These are placeholder images — see <code>PHOTOS.md</code> for what to
            drop into <code>/public/gallery/</code>.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="filters" role="tablist" aria-label="Filter projects">
            {galleryCategories.map((cat, i) => (
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

          <div className="grid">
            {items.map((item, i) => (
              <button
                type="button"
                className="project"
                key={item.id}
                onClick={() => setActiveIndex(i)}
                aria-label={`Open ${item.title}`}
              >
                <div className="project__figure">
                  <img src={asset(item.image)} alt={item.title} loading="lazy" />
                </div>
                <div className="project__title">{item.title}</div>
                <div className="project__meta">{item.meta}</div>
              </button>
            ))}
          </div>

          {items.length === 0 && (
            <p className="lead">No projects in this category yet.</p>
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
            className="lightbox__btn lightbox__close"
            aria-label="Close"
            onClick={() => setActiveIndex(null)}
          >
            &times;
          </button>

          <button
            type="button"
            className="lightbox__btn lightbox__nav lightbox__nav--prev"
            aria-label="Previous project"
            onClick={(e) => {
              e.stopPropagation()
              setActiveIndex((i) => (i - 1 + items.length) % items.length)
            }}
          >
            &lsaquo;
          </button>

          <figure
            className="lightbox__figure"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={asset(active.image)} alt={active.title} />
            <figcaption className="lightbox__cap">
              <strong>{active.title}</strong>
              <span>{active.meta}</span>
            </figcaption>
          </figure>

          <button
            type="button"
            className="lightbox__btn lightbox__nav lightbox__nav--next"
            aria-label="Next project"
            onClick={(e) => {
              e.stopPropagation()
              setActiveIndex((i) => (i + 1) % items.length)
            }}
          >
            &rsaquo;
          </button>
        </div>
      )}
    </>
  )
}
