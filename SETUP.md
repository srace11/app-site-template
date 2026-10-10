# App site template: setup guide

This repo is the mini-site for one app, served at `appname.shaneracey.com`. It has these pages:

| Page | URL | Used for |
| --- | --- | --- |
| Landing | `https://appname.shaneracey.com/` | Marketing URL |
| Privacy | `https://appname.shaneracey.com/privacy` | Privacy Policy URL (App Store Connect and Google Play) |
| Terms | `https://appname.shaneracey.com/terms` | Terms of Use / EULA link |
| Support | `https://appname.shaneracey.com/support` | Support URL (App Store Connect) |
| Waitlist | `https://appname.shaneracey.com/waitlist` | Signups before launch (optional, see below) |

## Files you edit per app

| File | What to change |
| --- | --- |
| `src/app.config.ts` | Name, tagline, URL, colors, main button, waitlist, every home page section, store links, support FAQ |
| `src/policies/privacy.md` | The privacy policy. Replace every `TODO` truthfully. |
| `src/policies/terms.md` | The terms. Replace every `TODO`. |
| `public/icon.svg` | App icon (SVG or PNG; update `icon` in the config if you change the file name) |
| `public/about/` | Your photo for the About section (square) |
| `public/screenshots/` | Phone screenshots (optional; list them in `screenshots` in the config) |
| `wrangler.jsonc` | The Worker's `name` and the app's subdomain |
| `public/og.png` | Link preview image. Regenerate with `npm run og` after editing the config. |

The privacy and terms pages show a yellow "Draft" banner as long as the markdown file still contains the word `TODO`. Do not submit an app while that banner is visible.

> **The policy text is a starting template, not legal advice.** Before every launch, check the privacy policy against what the app really collects: every SDK (analytics, crash reporting, ads, auth, payments), every permission, and every server call. It must match your App Store "App Privacy" answers and your Google Play "Data safety" form.

## The home page

One scroll, straight to the value: a dark hero band with one loud headline, one button and a video, then sections that each start with a small label and a big centred heading. Top to bottom, all set in `app.landing` in the config:

| Section | Config | Header link |
| --- | --- | --- |
| Hero: label, headline (`tagline`), one sentence, button, video | `hero`, `tagline`, `cta` | |
| How it works: numbered steps, then short facts | `how.steps`, `how.facts` | How it works |
| Features | `features.items` | Features |
| Screenshots | `screenshots` (top level) | |
| Coming soon | `soon.items` | |
| About you | `about` | |
| Pricing cards | `pricing.plans` | Pricing |
| FAQ | `faq.items` | FAQ |
| Final call to action | `final` | |

- **Empty sections disappear.** A section whose list is empty is hidden, along with its header link.
- **Placeholders show as placeholders.** Any text starting with `[` (for example `'[Feature name]'`) is drawn in faded italics, so a new site is an obvious outline until it's filled in. Fill them with facts only; never invent numbers or features to make a section look complete.
- **The main button** (`cta`) appears in the header, the hero, the pricing cards and the final section. Before launch it points at `/waitlist`. After launch, point it at the store link and add `stores` links (badges then show in the hero).
- **Video:** put an MP4 in `public/` and set `hero.video` (for example `'/demo.mp4'`). Until then the hero shows a placeholder frame.
- **Colors:** `colors.accent` fills buttons, `colors.accentText` is the text on them, `colors.accentDark` is used for labels on the hero and in dark mode, and `colors.hero` is the hero background (keep it dark).
- **Fonts:** the template uses the system font. To use brand fonts, put `.woff2` files in `public/fonts/`, add `@font-face` rules at the top of `src/styles/global.css`, and set `--font-display` (headings), `--font` (text) and `--font-mono` (numbers). `statjump-site` does exactly this.

## The waitlist (optional)

The `/waitlist` page posts to the shared waitlist API at `api.shaneracey.com` (repo `srace11/waitlist-api`). It stores signups in Cloudflare D1, checks for bots with Turnstile and emails you on each new signup.

1. In `waitlist-api`, add the app to `src/apps.config.ts` (its slug, `origin` = this site's URL, its questions), add the hostname to the Turnstile widget, and deploy. That repo's SETUP.md has the steps.
2. Here, set `waitlist.app` to the same slug and keep `cta.href` as `'/waitlist'`.
3. Build. The form reads its questions from the API at build time, so the API must already have the app. To build against a local copy of the API: `WAITLIST_API=http://localhost:8787 npm run build`.

With `waitlist.app` empty, `/waitlist` just says the waitlist opens soon, and the site builds without contacting the API.

### Seeing where signups come from

Add `?utm_source=` to every link you post, one label per place:

```
https://appname.shaneracey.com/?utm_source=reddit
https://appname.shaneracey.com/?utm_source=instagram
https://appname.shaneracey.com/?utm_source=tiktok
```

Use lowercase and the same spelling every time (letters, digits, `.`, `-` and `_`, up to 40 characters). The first page a visitor lands on saves the label for that tab (`src/components/SourceTracker.astro`), and the waitlist form sends it with the signup. Untagged visits fall back to the referring site's hostname (for example `google.com`), and direct visits stay blank. Instagram and TikTok often hide the referrer, so tag those links. Each signup's source shows in the `source` column of the CSV export and in the new-signup email.

The privacy policy's Waitlist section already describes this. Keep it if you keep the waitlist.

## Run it locally

Requires Node 22.12 or newer.

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # outputs to dist/
npm run preview   # serves dist/ locally
```

## Deploy as a Cloudflare Worker (recommended)

This is how `statjump-site` is deployed. `wrangler.jsonc` builds the site, serves `dist/` and attaches the subdomain, creating its DNS record.

1. In `wrangler.jsonc`, set `name` (for example `appname-site`) and the `routes` pattern (`appname.shaneracey.com`).
2. Run `npx wrangler login` once, then `npm run deploy`.
3. To redeploy on every push: Cloudflare dashboard > **Workers & Pages >** the Worker > **Settings > Build** > connect the GitHub repo. Leave the build settings at their defaults.

If you rename the Worker in the dashboard, change `name` in `wrangler.jsonc` to match.

## Or deploy to Cloudflare Pages

1. Push the repo to GitHub (see the launch checklist below for creating it).
2. In the Cloudflare dashboard go to **Workers & Pages > Create > Pages > Connect to Git**.
3. Authorize GitHub if asked, then pick the app's repo.
4. Build settings:
   - **Project name:** the app's slug, for example `sampleapp`. This becomes `sampleapp.pages.dev`.
   - **Production branch:** `main`
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Environment variables:** add `NODE_VERSION` = `22`
5. Click **Save and Deploy**. After about a minute the site is live at `https://<project>.pages.dev`. Check it there before adding the domain.

Every push to `main` redeploys automatically. Pushes to other branches get their own preview URLs.

## Add the subdomain (appname.shaneracey.com)

shaneracey.com's DNS is hosted on Cloudflare (nameservers `aspen` and `rocky`), in the same account as the Pages project, so Cloudflare can create the DNS record for you.

**Do it in this order.** If you only create the CNAME without step 1, the subdomain returns a 522 error, because the Pages project does not yet know to answer for that hostname.

1. Open the Pages project > **Custom domains > Set up a custom domain**.
2. Enter `appname.shaneracey.com` and click **Continue**.
3. Cloudflare shows the record it will create:

   | Type | Name | Target | Proxy |
   | --- | --- | --- | --- |
   | CNAME | `appname` | `<project>.pages.dev` | Proxied (orange cloud) |

   Click **Activate domain**. Cloudflare adds the CNAME to the shaneracey.com zone.
4. Wait for the status to show **Active** (usually 1 to 5 minutes; it issues the HTTPS certificate in this time).
5. Visit `https://appname.shaneracey.com/privacy` and `/support` to confirm.

**If the subdomain already has a DNS record** (for example you created one earlier by hand), go to **DNS > Records** for shaneracey.com. Either delete the old record and repeat the steps above, or edit it to exactly match the table (CNAME, name `appname`, target `<project>.pages.dev`, proxied). Then retry step 1.

**If the status stays "Pending"** for more than 15 minutes, check that there is exactly one record for `appname` in **DNS > Records**, that it is proxied, and that no Worker route in **Workers Routes** matches `appname.shaneracey.com/*`.

## Launch checklist for a new app

- [ ] **Copy the template.** On GitHub, open `srace11/app-site-template`, click **Use this template > Create a new repository** and name it `appname-site`. Clone it. (Or from the CLI: `gh repo create appname-site --template srace11/app-site-template --public --clone`.)
- [ ] **Edit `src/app.config.ts`:** name, tagline, description, `url` (`https://appname.shaneracey.com`), colors, `cta`, and every home page section. Replace every `[...]` placeholder with real facts, or empty the section to hide it. Leave the store links empty until the app is approved.
- [ ] **Replace the images:** `public/icon.svg`, the screenshots, then run `npm run og` to rebuild the link preview image.
- [ ] **Write the privacy policy** in `src/policies/privacy.md`. List every data type, SDK and permission truthfully, fill in the deletion instructions and set `effectiveDate`. No `TODO` left.
- [ ] **Write the terms** in `src/policies/terms.md`. Fill in subscriptions (if any), governing law and `effectiveDate`. No `TODO` left.
- [ ] **Answer the support FAQ** (account deletion, purchases) in the config.
- [ ] **Build locally:** `npm run build` finishes with no errors and `npm run preview` shows no Draft banner.
- [ ] **Commit and push** to `main`.
- [ ] **Optional waitlist:** add the app to `waitlist-api`, deploy it, then set `waitlist.app` here (see The waitlist).
- [ ] **Deploy** as a Worker (`wrangler.jsonc` name and route, then `npm run deploy`), or as a Pages project and add the subdomain (steps above). Confirm the subdomain loads.
- [ ] **App Store Connect:**
  - App Information > **Privacy Policy URL**: `https://appname.shaneracey.com/privacy`
  - Version page > **Support URL**: `https://appname.shaneracey.com/support`
  - Version page > **Marketing URL** (optional): `https://appname.shaneracey.com`
  - If you use custom terms instead of Apple's standard EULA, link `https://appname.shaneracey.com/terms` in App Information > License Agreement, or in the app description for subscriptions.
  - App Privacy answers match `privacy.md`.
- [ ] **Google Play Console:**
  - Policy and programs > App content > **Privacy policy**: `https://appname.shaneracey.com/privacy`
  - Store presence > Store settings > **Website**: `https://appname.shaneracey.com` and **Email**: the contact email
  - **Data safety** form matches `privacy.md`.
  - If the app has accounts, fill in the **account deletion URL** (the support page, which explains how to delete).
- [ ] **After approval:** paste the store links into `stores` in the config, push, and add the app to the hub (`shaneracey-hub/src/data/apps.json`).

## Store badges

The badges are simple text buttons, so they work without extra assets. If you want the official artwork, download it from Apple's App Store marketing guidelines and Google Play's badge generator, put the files in `public/`, and swap them into `src/components/StoreBadges.astro`.
