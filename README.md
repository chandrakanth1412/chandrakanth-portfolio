# Chandrakanth — Developer Portfolio

Responsive portfolio built with HTML, CSS, and vanilla JavaScript. It highlights full-stack Java development, selected projects, experience, education, certifications, and contact links.

## Preview locally

Open `index.html`, or start a local server for browser features such as copy-to-clipboard:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Then visit `http://127.0.0.1:4173/`.

## Build

```powershell
node build.mjs
```

The script copies the page and its referenced assets into `dist/` for static hosting.

## Privacy and hosting

This source repository is private. GitHub Pages is not enabled because Pages sites are publicly reachable; the site can be published there after the owner approves a public release. The Vercel deployment remains access-protected for private review.

## Project notes

- Responsive layouts, palette selection, accessible mobile navigation, and reduced-motion support.
- Project cards link to source or demos where available.
- Contact links use email; no form backend or third-party message service is configured.
- The StreetGuardian demo video and updated résumé are included as site assets.
