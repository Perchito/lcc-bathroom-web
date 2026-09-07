// Pre-generate optimized, responsive versions of every gallery photo.
//
// The CMS uploads full-size originals to public/gallery/ (a phone photo is
// ~2000px wide, ~350 KB). This script turns each one into a set of small WebP
// files plus a tiny blur placeholder, all written as *static* files under
// public/gallery/_opt/ and indexed in src/generated/gallery-images.json.
//
// Because the output is static, the browser gets a right-sized, pre-compressed
// file straight from the CDN with no on-the-fly transform latency — that's what
// makes the first view feel instant. src/img.js reads the manifest.
//
// Runs automatically before `npm run dev` and `npm run build`. It's incremental
// (skips work when the output is newer than the source), so re-runs are cheap.

import { createHash } from 'node:crypto'
import {
  mkdir,
  readdir,
  readFile,
  rm,
  stat,
  writeFile,
} from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const SRC_DIR = 'public/gallery'
const OUT_DIR = 'public/gallery/_opt'
const MANIFEST = 'src/generated/gallery-images.json'

// Widths we might serve. Cards render ~250–550px, the lightbox up to 1000px;
// double each for high-DPI screens and cap at 1800.
const WIDTHS = [360, 560, 800, 1100, 1400, 1800]
const QUALITY = 72
const SOURCE_RE = /\.(jpe?g|png)$/i

async function mtime(file) {
  try {
    return (await stat(file)).mtimeMs
  } catch {
    return 0
  }
}

async function main() {
  let files = []
  try {
    files = (await readdir(SRC_DIR)).filter((f) => SOURCE_RE.test(f))
  } catch {
    console.warn(`[gallery] ${SRC_DIR} not found — skipping`)
    return
  }

  await mkdir(OUT_DIR, { recursive: true })
  await mkdir(path.dirname(MANIFEST), { recursive: true })

  const manifest = {}
  const keepFiles = new Set()

  for (const file of files) {
    const input = path.join(SRC_DIR, file)
    const base = file.replace(SOURCE_RE, '')
    const srcMtime = await mtime(input)

    const meta = await sharp(input).metadata()
    // EXIF orientation 5–8 means the image is stored rotated 90°.
    const rotated = (meta.orientation ?? 0) >= 5
    const realW = rotated ? meta.height : meta.width
    const realH = rotated ? meta.width : meta.height

    const targets = [
      ...new Set(
        WIDTHS.filter((w) => w < realW * 0.95).concat(Math.min(realW, 1800)),
      ),
    ].sort((a, b) => a - b)

    const variants = []
    for (const w of targets) {
      const name = `${base}-${w}.webp`
      const outPath = path.join(OUT_DIR, name)
      keepFiles.add(name)
      if ((await mtime(outPath)) < srcMtime) {
        await sharp(input)
          .rotate()
          .resize({ width: w, withoutEnlargement: true })
          .webp({ quality: QUALITY })
          .toFile(outPath)
        console.log(`[gallery] ${name}`)
      }
      variants.push({ w, src: `/gallery/_opt/${name}` })
    }

    const blur = await sharp(input)
      .rotate()
      .resize({ width: 20 })
      .webp({ quality: 28 })
      .toBuffer()

    manifest[`/gallery/${file}`] = {
      width: realW,
      height: realH,
      variants,
      blur: `data:image/webp;base64,${blur.toString('base64')}`,
    }
  }

  // Drop _opt files whose source photo is gone.
  for (const stale of await readdir(OUT_DIR)) {
    if (!keepFiles.has(stale)) {
      await rm(path.join(OUT_DIR, stale))
      console.log(`[gallery] removed stale ${stale}`)
    }
  }

  const json = JSON.stringify(manifest, null, 2) + '\n'
  const prev = await readFile(MANIFEST, 'utf8').catch(() => '')
  if (hash(json) !== hash(prev)) {
    await writeFile(MANIFEST, json)
    console.log(`[gallery] wrote ${MANIFEST} (${files.length} photos)`)
  }
}

function hash(s) {
  return createHash('sha1').update(s).digest('hex')
}

main().catch((err) => {
  // Never fail the build over image optimization — fall back to whatever
  // (originals + any existing _opt output) is already there.
  console.warn('[gallery] optimization skipped:', err.message)
})
