# CMS setup — one-time steps

The site now has a content editor at **`/admin`** ([Sveltia CMS](https://sveltiacms.app/),
a free, Decap-compatible, Git-based CMS). Your dad edits text and photos through
forms; hitting **Save** commits the change to this repo and the site rebuilds
automatically in ~1 minute.

The code is ready. These steps connect it up — do them once, in order.

---

## 1. Move hosting to Netlify

GitHub Pages can't run the login part of the CMS, so hosting moves to Netlify
(free). The old `.github/workflows/deploy.yml` has been removed and
`vite.config.js` now builds for the domain root.

1. Sign in at <https://app.netlify.com> (use "Log in with GitHub").
2. **Add new site → Import an existing project → GitHub →** pick
   `Perchito/lcc-bathroom-web`.
3. Branch to deploy: `main`. Netlify reads `netlify.toml` — leave build command
   and publish dir as detected (`npm run build`, `dist`). Click **Deploy**.
4. When it finishes, note the site URL, e.g. `https://lcc-bathroom.netlify.app`
   (you can rename it under **Site configuration → Site details → Change site name**,
   or add a custom domain later).

From now on, every push to `main` (including the CMS's own commits) auto-deploys.

## 2. Put the real site URL in the CMS config

Edit **`public/admin/config.yml`** and set both `site_url` and `display_url` to
your Netlify URL (or custom domain). Commit and push.

## 3. Create a GitHub OAuth app (for the "Sign in with GitHub" button)

1. GitHub → **Settings → Developer settings → OAuth Apps → New OAuth App**.
2. Fill in:
   - **Application name:** `LCC Bathroom CMS`
   - **Homepage URL:** your Netlify site URL
   - **Authorization callback URL:** `https://api.netlify.com/auth/done`
3. **Register application** → **Generate a new client secret**.
4. Copy the **Client ID** and **Client secret**.

## 4. Give Netlify the OAuth credentials

Netlify → your site → **Site configuration → Access & security → OAuth →
Authentication providers → Install provider → GitHub**. Paste the Client ID and
Client secret from step 3. Save.

## 5. Give your dad access to the repo

The CMS commits as whoever is logged in, so he needs write access:

1. He creates a free GitHub account (no coding knowledge needed — just an account).
2. GitHub → repo → **Settings → Collaborators → Add people** → his username →
   role **Write**.
3. He accepts the email invite.

## 6. Done — how he edits

He goes to **`https://your-site/admin/`**, clicks **Sign in with GitHub**, and
gets a dashboard with sections: *Company info & homepage*, *Services*,
*How it works*, *Reviews*, *Gallery / projects*. He edits fields, uploads photos
by drag-and-drop, clicks **Save**. The site updates itself a minute later.

---

## Fallbacks / notes

- **No Netlify OAuth?** Instead of steps 3–4, deploy the
  [`sveltia-cms-auth`](https://github.com/sveltia/sveltia-cms-auth) Cloudflare
  Worker (free) and add `base_url: <worker-url>` under `backend:` in
  `config.yml`.
- **Quick personal use:** the login screen also has "Sign in using a token" —
  paste a GitHub fine-grained PAT with Contents read/write on this repo. No
  OAuth app needed, but fiddlier to set up per person.
- **Local CMS testing:** add `local_backend: true` to `config.yml`, run
  `npx @sveltia/cms-proxy-server` in one terminal and `npm run dev` in another,
  then open `http://localhost:5173/admin/`. Don't commit `local_backend: true`.

## What this changed in the codebase

- Editable copy moved from `src/data/site.js` into JSON files under
  `src/content/` (`settings`, `services`, `process`, `reviews`, `gallery`).
- `src/data/site.js` is now a thin adapter — it imports those JSON files and
  keeps the non-editable structural bits (nav, gallery sectors + category lists).
- `public/admin/` holds the CMS (`index.html` loads it, `config.yml` defines the
  forms).
- `netlify.toml` added; GitHub Pages workflow removed; Vite `base` is now `/`.

**Future code work is unaffected** — design, layout, animations and new pages are
still edited in code exactly as before. Only add a matching field to
`config.yml` when you introduce a genuinely new *kind* of editable content.
