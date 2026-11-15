import { useEffect, useRef } from 'react'

// Water falling from the rain head in the hero photo. A canvas laid over the
// <img>; the head and floor are given as fractions of the photo, and mapped
// through the same object-fit: cover / object-position the CSS applies, so the
// stream stays on the shower head at every screen size. Skipped entirely for
// prefers-reduced-motion.
//
//   head:  { x, y, r }  centre of the rain head and its radius (fractions of width)
//   floor: y            where the water lands (fraction of height)
export default function ShowerWater({ imgRef, head, floor }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const img = imgRef.current
    if (!canvas || !img) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = canvas.getContext('2d')
    let raf = 0
    let geo = null
    let drops = []
    let splashes = []
    let visible = true

    // photo fraction → canvas pixels, matching object-fit: cover
    function layout() {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      const iw = img.naturalWidth
      const ih = img.naturalHeight
      if (!w || !h || !iw || !ih) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const scale = Math.max(w / iw, h / ih)
      const dw = iw * scale
      const dh = ih * scale
      const [px, py] = getComputedStyle(img)
        .objectPosition.split(' ')
        .map((v) => parseFloat(v) / 100)
      const ox = (w - dw) * px
      const oy = (h - dh) * py
      geo = {
        hx: ox + head.x * dw,
        hy: oy + head.y * dh,
        hr: head.r * dw,
        fy: oy + floor * dh,
        unit: dw / 1000,
      }
    }

    function spawn() {
      const { hx, hy, hr, unit } = geo
      // nozzles are spread across the head's disc; the stream fans out a little
      const a = Math.random() * 2 - 1
      return {
        x: hx + a * hr,
        y: hy - Math.random() * 20 * unit,
        vx: a * 0.35 * unit,
        vy: (3 + Math.random() * 2) * unit,
        len: (10 + Math.random() * 18) * unit,
        alpha: 0.15 + Math.random() * 0.3,
      }
    }

    function frame() {
      raf = requestAnimationFrame(frame)
      if (!geo || !visible) return
      const { fy, unit } = geo
      const cw = canvas.clientWidth
      ctx.clearRect(0, 0, cw, canvas.clientHeight)
      // nothing above the head: streaks start at its underside
      ctx.save()
      ctx.beginPath()
      ctx.rect(0, geo.hy, cw, canvas.clientHeight)
      ctx.clip()

      for (let i = 0; i < 6; i++) drops.push(spawn())
      ctx.lineCap = 'round'
      ctx.lineWidth = Math.max(0.7, 1 * unit)
      drops = drops.filter((d) => {
        d.vy += 0.35 * unit
        d.x += d.vx
        d.y += d.vy
        if (d.y > fy) {
          if (Math.random() < 0.15) splashes.push({ x: d.x, y: fy, r: 1, life: 1 })
          return false
        }
        ctx.strokeStyle = `rgba(225, 236, 245, ${d.alpha})`
        ctx.beginPath()
        ctx.moveTo(d.x, d.y - d.len)
        ctx.lineTo(d.x, d.y)
        ctx.stroke()
        return true
      })

      ctx.lineWidth = Math.max(0.6, unit)
      splashes = splashes.filter((s) => {
        s.r += 0.9 * unit
        s.life -= 0.08
        if (s.life <= 0) return false
        ctx.strokeStyle = `rgba(225, 236, 245, ${s.life * 0.25})`
        ctx.beginPath()
        ctx.ellipse(s.x, s.y, s.r * 2.2, s.r * 0.5, 0, 0, Math.PI * 2)
        ctx.stroke()
        return true
      })
      ctx.restore()
    }

    const start = () => {
      layout()
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(frame)
    }
    if (img.complete && img.naturalWidth) start()
    else img.addEventListener('load', start, { once: true })

    const ro = new ResizeObserver(layout)
    ro.observe(canvas)
    // stop drawing once the hero has scrolled away
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    io.observe(canvas)

    return () => {
      cancelAnimationFrame(raf)
      img.removeEventListener('load', start)
      ro.disconnect()
      io.disconnect()
    }
  }, [imgRef, head, floor])

  return <canvas ref={canvasRef} className="hero__water" aria-hidden="true" />
}
