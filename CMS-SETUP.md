# Editing the website

## Recommended: Pages CMS (no GitHub account needed for editors)

Editors use <https://app.pagescms.org>. The forms are defined in `.pages.yml`
at the repo root. Saving commits to `main` and Cloudflare redeploys in ~1 minute.

One-time setup (repo owner):

1. Go to <https://app.pagescms.org>, **Sign in with GitHub**.
2. Install the Pages CMS GitHub App when asked — choose **Only select
   repositories → `Perchito/lcc-bathroom-web`**.
3. Open the repo in Pages CMS → **Settings / Collaborators** → invite the
   editor's email address. They get an email and sign in with that — no
   GitHub account or password to manage.

That's it: no OAuth app, no Worker.

---

## Alternative: Sveltia CMS at `/admin`

Kept as a fallback (same content files, config in `public/admin/config.yml`).
Needs the login helper below and a GitHub account with Write access per editor.

The site has a content editor at **<https://lccbathroom-services.com/admin/>**
([Sveltia CMS](https://sveltiacms.app/), a free, Git-based CMS). Your dad edits
text and photos through forms; hitting **Save** commits the change to this repo
and Cloudflare rebuilds the site automatically in ~1 minute.

The "Sign in with GitHub" button needs a small login helper — the free
[`sveltia-cms-auth`](https://github.com/sveltia/sveltia-cms-auth) Cloudflare
Worker. `public/admin/config.yml` already points at it
(`base_url: https://sveltia-cms-auth.lmateocc99.workers.dev`).

---

### 1. Deploy the login helper (Cloudflare)

1. Open <https://github.com/sveltia/sveltia-cms-auth> and click
   **Deploy to Cloudflare**. Sign in with the Cloudflare account that hosts
   the site.
2. Keep the Worker name **`sveltia-cms-auth`** (the config expects
   `sveltia-cms-auth.lmateocc99.workers.dev`). Deploy.
3. In the new Worker → **Settings → Domains & Routes**, make sure
   **workers.dev** is **enabled** (the login popup is served from it).

### 2. Create a GitHub OAuth app

1. GitHub → **Settings → Developer settings → OAuth Apps → New OAuth App**.
2. Fill in:
   - **Application name:** `LCC Bathroom CMS`
   - **Homepage URL:** `https://lccbathroom-services.com`
   - **Authorization callback URL:**
     `https://sveltia-cms-auth.lmateocc99.workers.dev/callback`
3. **Register application** → **Generate a new client secret**.
4. Copy the **Client ID** and **Client secret**.

### 3. Give the Worker the credentials

Cloudflare → Worker `sveltia-cms-auth` → **Settings → Variables and Secrets**.
Add (type **Secret** for the secret, **Text** for the rest):

| Name                   | Value                                 |
| ---------------------- | ------------------------------------- |
| `GITHUB_CLIENT_ID`     | Client ID from step 2                 |
| `GITHUB_CLIENT_SECRET` | Client secret from step 2             |
| `ALLOWED_DOMAINS`      | `lccbathroom-services.com, www.lccbathroom-services.com` |

Click **Deploy** after adding them.

### 4. Give your dad access to the repo

The CMS commits as whoever is logged in, so he needs write access:

1. He creates a free GitHub account (no coding knowledge needed — just an account).
2. GitHub → repo → **Settings → Collaborators → Add people** → his username →
   role **Write**.
3. He accepts the email invite.

### 5. Done — how he edits

He goes to **<https://lccbathroom-services.com/admin/>**, clicks
**Sign in with GitHub**, and gets a dashboard with sections: *Company info &
homepage*, *Services*, *How it works*, *Reviews*, *Gallery / projects*. He edits
fields, uploads photos by drag-and-drop, clicks **Save**. The site updates itself
a minute later.

---

## Fallbacks / notes

- **Quick personal use:** the login screen also has "Sign in using a token" —
  paste a GitHub fine-grained PAT with Contents read/write on this repo. No
  OAuth app needed, but fiddlier to set up per person.
- **Local CMS testing:** add `local_backend: true` to `config.yml`, run
  `npx @sveltia/cms-proxy-server` in one terminal and `npm run dev` in another,
  then open `http://localhost:5173/admin/`. Don't commit `local_backend: true`.

## What this changed in the codebase

- Editable copy lives in JSON files under `src/content/` (`settings`,
  `services`, `process`, `reviews`, `gallery`).
- `src/data/site.js` is a thin adapter — it imports those JSON files and keeps
  the non-editable structural bits (nav, gallery sectors + category lists).
- `public/admin/` holds the CMS (`index.html` loads it, `config.yml` defines the
  forms).

**Future code work is unaffected** — only add a matching field to `config.yml`
when you introduce a genuinely new *kind* of editable content.
