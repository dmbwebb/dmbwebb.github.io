# CLAUDE.md — dmbwebb.github.io

Personal academic website for Duncan Webb, built with React/Vite, deployed to GitHub Pages at www.duncan-webb.com.

## Development

```bash
npm run dev      # Dev server at localhost:5173
npm run build    # Production build to dist/
npm run deploy   # Build + deploy to gh-pages branch
```

- **Deploying**: `git push origin main` does NOT deploy the site. GitHub Pages serves from the `gh-pages` branch. Always run `npm run deploy` after pushing to actually deploy. When committing and pushing, always also run `npm run deploy`.
- The `.github/workflows/deploy.yml` is inactive — Pages source is set to `gh-pages` branch, not GitHub Actions.

## Testing

Always test extensively before committing:
- Use Chrome (via Claude-in-Chrome) to visually verify all pages and sections
- Check for broken links: every `<a href>` in `App.jsx` must resolve (local PDFs in `public/papers/`, external URLs)
- Test responsive layout at mobile (400px) and desktop (1200px+) widths
- Verify all PDFs load correctly from `/papers/`
- Check that the CNAME file matches `www.duncan-webb.com`

## Structure

- `src/App.jsx` — All content and components (single-page site)
- `src/App.css` — All component styles
- `src/index.css` — Global reset, CSS variables, fonts
- `public/papers/` — Locally hosted PDFs
- `public/assets/` — Headshot, favicon
- `public/CNAME` — Custom domain config
- `.github/workflows/deploy.yml` — Auto-deploy on push to main

## Deployment

After running `npm run deploy`, always verify the live site in Chrome (via Claude-in-Chrome) by navigating to `www.duncan-webb.com` and confirming the changed text is visible. GitHub Pages CDN can take 1–5 min to propagate. Verification protocol:
1. Check which JS bundle the page loaded (`Array.from(document.querySelectorAll('script[src]')).map(s=>s.src)`) and compare to the new bundle filename in `dist/assets/`.
2. If the old bundle is still served, wait 60s and reload — keep checking every 60s until the new bundle loads and the changed text is confirmed in the DOM.
3. Do not consider the task done until Chrome shows the correct text.

## Lessons

- Co-author links added (Laajaj, Macours, Vera Rueda, Friedman, Suanna Oh) — check `src/App.jsx` before adding new ones to avoid duplicates.
- A PNG version of the D favicon lives in `public/assets/` for use on the Google Sites mirror — Google Sites does not accept `.ico` files.
- Google Sites mirror still needs: favicon uploaded manually and site republished.
