import { useEffect, useRef } from 'react'

// Water falling from the rain head in the hero photo. A canvas laid over the
// <img>; every nozzle is a point measured off the photo (fractions of its width
// and height), mapped through the same object-fit: cover / object-position the
// CSS applies, so the water stays on the holes at every screen size. Skipped
// entirely for prefers-reduced-motion.
//
// Each nozzle pours a faint continuous thread that breaks into drops further
// down, the way a real rain head does, and lands a little further forward the
// nearer the hole is to the camera.
//
//   holes: [[x, y], ...]   nozzle positions
//   floor: (y) => y        where water from a nozzle at height y lands
export default function ShowerWater({ imgRef, holes, floor }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const img = imgRef.current
    if (!canvas || !img) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = canvas.getContext('2d')
    let raf = 0
    let streams = []
    let unit = 1
    let visible = true
    let last = 0

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
      unit = dw / 1000
      streams = holes.map(([x, y], i) => ({
        x: ox + x * dw,
        y: oy + y * dh,
        fy: oy + floor(y) * dh,
        // the thread holds together for a while, then breaks into drops
        breakAt: 0.25 + ((i * 37) % 23) / 60,
        drops: streams[i]?.drops ?? [],
      }))
    }

    function frame(t) {
      raf = requestAnimationFrame(frame)
      if (!streams.length || !visible) return
      const dt = Math.min((t - (last || t)) / 16.7, 3)
      last = t
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
      ctx.lineCap = 'round'
      const speed = 22 * unit * dt

      for (const s of streams) {
        const fall = s.fy - s.y
        const join = s.y + fall * s.breakAt

        // the unbroken thread just under the nozzle
        const g = ctx.createLinearGradient(0, s.y, 0, join)
        g.addColorStop(0, 'rgba(235, 240, 245, 0.32)')
        g.addColorStop(1, 'rgba(235, 240, 245, 0)')
        ctx.strokeStyle = g
        ctx.lineWidth = Math.max(0.5, 0.7 * unit)
        ctx.beginPath()
        ctx.moveTo(s.x, s.y + unit)
        ctx.lineTo(s.x, join)
        ctx.stroke()

        // drops: short motion-blurred streaks, catching the warm light
        if (Math.random() < 0.55 * dt) s.drops.push({ y: s.y + Math.random() * fall * 0.3, a: 0.15 + Math.random() * 0.3, len: 8 + Math.random() * 12, dx: 0 })
        ctx.lineWidth = Math.max(0.6, 0.9 * unit)
        s.drops = s.drops.filter((d) => {
          d.y += speed
          if (d.y >= s.fy) return false
          // drops wander a touch sideways as the thread breaks up
          d.dx += (Math.random() - 0.5) * 0.25 * unit * dt
          const k = (d.y - s.y) / fall
          const a = d.a * Math.min(1, k * 3) * (1 - k * 0.5)
          ctx.strokeStyle = `rgba(240, 236, 228, ${a})`
          ctx.beginPath()
          ctx.moveTo(s.x + d.dx, Math.max(s.y, d.y - d.len * unit))
          ctx.lineTo(s.x + d.dx, d.y)
          ctx.stroke()
          return true
        })

        // a faint flicker where it hits the floor
        if (Math.random() < 0.25 * dt) {
          ctx.fillStyle = `rgba(240, 236, 228, ${0.15 + Math.random() * 0.2})`
          ctx.beginPath()
          ctx.ellipse(s.x + (Math.random() - 0.5) * 6 * unit, s.fy, 2.2 * unit, 0.7 * unit, 0, 0, Math.PI * 2)
          ctx.fill()
        }
      }
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
  }, [imgRef, holes, floor])

  return <canvas ref={canvasRef} className="hero__water" aria-hidden="true" />
}
