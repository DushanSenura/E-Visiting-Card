# Lee Scents — Digital Visiting Card

A premium, mobile-first digital business card for **Mr. Leslie Peiris** of **Lee Scents**.

Built with React, TypeScript, Vite, Tailwind CSS, Framer Motion, and Lucide icons.
There is no backend. Everything is a static site.

_Designed & Developed by NovaCore Techs._

---

## Installation

Requires Node.js 18+ (Node 22 recommended).

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Production build

```bash
npm run build      # type-checks, then builds into /dist
npm run preview    # serves /dist locally to test it
```

---

## Where to update Mr. Leslie Peiris' details

**Everything lives in one file:**

```text
src/config/profile.ts
```

It holds the name, position, company text, phone, WhatsApp, email, address, website, services,
share text, SEO text and the NovaCore Techs credit. Change a value there and the whole site updates:
the card, the business info, the vCard, the page title and the social previews.

### Phone and WhatsApp

| Field | What to enter |
| --- | --- |
| `contact.phoneDisplay` | The number as it should look on screen, e.g. `0777 123 456` |
| `contact.phoneInternational` | Optional. Leave empty and it is worked out from `phoneDisplay` |
| `contact.whatsapp` | Optional. Leave empty to use the same number for WhatsApp |

Sri Lankan numbers are converted automatically:
`0777123456` → `tel:+94777123456` and `https://wa.me/94777123456`.

### Placeholder values are safe

While a value is empty or still contains `xxx` (like the current `0777 xxxxxxxxxx` and
`X, XXXXXX, XXXXXXX`), the site **never creates a broken link**:

- **Call / WhatsApp**: shown greyed out. On mobile, the floating bar shows Save Contact / Share instead.
- **Email**: hidden until `contact.email` is set.
- **Get Directions**: greyed out until a real address is set.
- **Visit Website**: hidden until `links.website` is set.
- **vCard**: placeholder values are left out of the contact file.

### Services

Edit the `services` list. Each item has a `title`, a `description` and an `icon`.
The icons you can use are listed in `src/config/types.ts` (`ServiceIconName`). To add a new
[Lucide icon](https://lucide.dev/icons), add its name there and in `src/components/icons.ts`.

---

## Where to replace the profile photo

```text
public/profile/leslie-peiris.webp
```

Replace it with a square portrait (at least 600×600 px), keeping the same filename.
WebP is recommended for speed. If you use another name or format, update `person.photo`
in the config. If the photo is missing, the card shows the initials "LP" instead.

## Where to replace the logo

```text
public/brand/logo.svg
```

By default the header and footer use a typographic wordmark ("LEE SCENTS") built from the
config text. To use the official logo:

1. Save it as `public/brand/logo.svg` (or `.png` / `.webp`).
2. Set `company.logo: "/brand/logo.svg"` in `src/config/profile.ts`.

Also replace `public/brand/favicon.svg`, `apple-touch-icon.png` (180×180), `icon-192.png` and
`icon-512.png` with versions of the official mark.

### Regenerating the placeholder images

`npm run assets` rebuilds the placeholder logo, icons and social preview image
(`public/og/lee-scents-card.jpg`) from the config. Run it after changing the name, position or
tagline so link previews match. It needs Node 22.18 or newer. It never overwrites an existing
profile photo unless you pass `--force`.

---

## Setting the digital card URL (after deployment)

Once the site is live, put its public address in the config:

```ts
links: {
  digitalCardUrl: "https://card.leescents.lk",
},
```

Then rebuild and redeploy. This URL is used for:

- **Share** (header button and mobile quick bar)
- **Canonical URL** and **Open Graph / X image links**, which need a full address for previews on WhatsApp, Facebook, LinkedIn and X
- The "Digital Card" link saved inside the vCard

While `digitalCardUrl` is empty (during development), sharing uses the current page address instead.

### Hosting in a sub-folder (e.g. `leescents.lk/card`)

Build with a base path:

```bash
BASE_PATH=/card/ npm run build
# Windows PowerShell:  $env:BASE_PATH="/card/"; npm run build
```

Set `digitalCardUrl` to `https://leescents.lk/card`.

---

## How Save Contact (vCard) works

The contact file is built from the config by `src/utils/vcard.ts` (vCard 3.0, the version with
the widest support):

- **Android and desktop**: the file is created in the browser and downloaded as
  `Leslie-Peiris-Lee-Scents.vcf`. Opening it adds the contact.
- **iPhone / iPad**: the browser opens `/contact.vcf`, a copy generated from the same config
  during `npm run build`, and iOS shows its native **"Create New Contact"** sheet.

The vCard holds the name, company, position, mobile number, WhatsApp number (if different),
email, website, address and the digital card link. Empty or placeholder values are left out.

---

## SEO and social sharing

The page title, description, Open Graph / X tags, theme colour, icons and web manifest are
added to `index.html` **at build time** from the config (`vite-plugins/digital-card.ts`),
so link previews work without JavaScript. Preview image: `public/og/lee-scents-card.jpg` (1200×630).

---

## Deployment

The `dist` folder is a static site. Build command: `npm run build`. Output folder: `dist`.

| Host | Notes |
| --- | --- |
| **Vercel** | Import the repo. `vercel.json` already sets the build and headers. |
| **Netlify** | Import the repo. `netlify.toml` and `public/_headers` are included. |
| **Cloudflare Pages** | Framework preset "Vite", build `npm run build`, output `dist`. `public/_headers` is applied automatically. |

The headers files serve `contact.vcf` with the `text/vcard` content type, which iPhones need to
open the "Add to Contacts" sheet, and cache built assets long-term.

---

## Project structure

```text
src/
  config/
    profile.ts        ← all business details (edit this)
    types.ts          ← config types and allowed icon names
    resolved.ts       ← call / WhatsApp / email / map links built from the config
  components/         ← UI sections (Header, ProfileCard, ContactActions, BusinessInfo, …)
    ui/               ← shared building blocks (ActionButton, SectionCard, Wordmark)
  hooks/              ← useSaveContact, useShareCard, useToast, useScrolledPast
  utils/              ← phone formatting, vCard, links, sharing, validation (no UI)
  context/            ← toast context
vite-plugins/
  digital-card.ts     ← generates meta tags, contact.vcf and site.webmanifest at build time
scripts/
  generate-assets.mjs ← regenerates placeholder logo, icons and social image
public/
  brand/  profile/  og/
```

## Accessibility and motion

- Semantic landmarks, a skip link, labelled buttons and visible focus rings
- Every button and link is at least 44×44 px
- Animations are subtle and switch off for visitors who choose "reduce motion" in their system settings

---

Designed & Developed by **NovaCore Techs**
