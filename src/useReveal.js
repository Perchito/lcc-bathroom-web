import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// One IntersectionObserver for the whole page. Any element tagged with
// `data-reveal` starts hidden (see `.reveal` in index.css) and eases in the
// first time it scrolls into view. Re-scans on every route change so freshly
// mounted page content is picked up.
export function useReveal() {
  const { pathname } = useLocation()

  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]:not(.is-visible)')
    if (els.length === 0) return

    const reduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'))
      return
    }

    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            obs.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )

    // rAF: let the new route's DOM paint in its hidden state first.
    const raf = requestAnimationFrame(() => {
      els.forEach((el) => io.observe(el))
    })

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
    }
  }, [pathname])
}
