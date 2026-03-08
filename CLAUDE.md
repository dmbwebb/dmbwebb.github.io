# CLAUDE.md — dmbwebb.github.io

Personal academic website for Duncan Webb, built with React/Vite, deployed to GitHub Pages at www.duncan-webb.com.

## Development

```bash
npm run dev      # Dev server at localhost:5173
npm run build    # Production build to dist/
npm run deploy   # Build + deploy to gh-pages branch
```

- **Deploying**: `git push origin main` does NOT deploy the site. GitHub Pages serves from the `gh-pages` branch. Always run `npm run deploy` after committing to actually deploy.
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
