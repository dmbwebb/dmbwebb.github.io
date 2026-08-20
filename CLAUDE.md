# CLAUDE.md — dmbwebb.github.io

Personal academic website for Duncan Webb, built with React/Vite, deployed to GitHub Pages at www.duncan-webb.com.

## Development

```bash
npm run dev      # Dev server at localhost:5173
npm run build    # Production build to dist/
npm run deploy   # Build + deploy to gh-pages branch
```

- **Deploying**: `git push origin main` does NOT deploy the site. GitHub Pages serves from the `gh-pages` branch. Always run `npm run deploy` after pushing to actually deploy. When committing and pushing, always also run `npm run deploy`.
- **Pushing source**: Run `./push.sh` from any directory to push this repository's `main` branch to `origin`; the script resolves the website repo from its own location. It does not deploy the site.
- **CV-only deploy exception**: If the main worktree has unrelated dirty files and only `public/papers/duncan_webb_cv_website.pdf` changed, update that PDF directly in a separate `gh-pages` worktree and push `gh-pages` so unrelated `dist/` changes are not published.
- The `.github/workflows/deploy.yml` has been deleted. PAT lacks `workflow` scope so it can't be pushed to GitHub. Pages source is `gh-pages` branch (legacy mode).

## Analytics

GoatCounter (account `dmbwebb`, dashboard at https://dmbwebb.goatcounter.com; no cookies, so no consent banner). Two pieces:
- **Pageviews**: `count.js` snippet in `index.html` (`data-goatcounter="https://dmbwebb.goatcounter.com/count"`). Ignores localhost automatically.
- **Click events**: `src/analytics.js` — one delegated document-level listener (init'd in `main.jsx`), no per-link attributes needed. Event naming: `/papers/*` → `download/<file>`, `mailto:` → `contact/email`, external → `ext/<hostname>`; in-page `#` anchors ignored. Tests in `src/tests/analytics.test.jsx`.
- CSV export + API are in the dashboard settings if stats need to be pulled programmatically.

## Testing

Always test extensively before committing:
- Use Chrome (via Claude-in-Chrome) to visually verify all pages and sections
- Check for broken links: every `<a href>` in `App.jsx` must resolve (local PDFs in `public/papers/`, external URLs)
- Test responsive layout at mobile (400px) and desktop (1200px+) widths
- Verify all PDFs load correctly from `/papers/`
- Check that the CNAME file matches `www.duncan-webb.com`
- Tests use Vitest; run `npm test` directly — Jest flags like `--runInBand` are invalid.

## Structure

- `src/App.jsx` — All content and components (single-page site)
- `src/App.css` — All component styles
- `src/index.css` — Global reset, CSS variables, fonts
- `public/papers/` — Locally hosted PDFs
- `public/assets/` — Headshot, favicon
- `public/CNAME` — Custom domain config
- `.github/workflows/deploy.yml` — **Deleted**. Cannot be pushed (PAT lacks `workflow` scope). Deploy via `npm run deploy` only.

## Deployment

After running `npm run deploy`, always verify the live site in Chrome (via Claude-in-Chrome) by navigating to `www.duncan-webb.com` and confirming the changed text is visible. If the Chrome extension won't connect, headless Playwright (`~/.venvs/lifecoach/bin/python` has it + chromium) is an acceptable fallback: load the live URL, assert on the DOM/network requests, and poll the CDN with `until curl -s "https://www.duncan-webb.com/?cb=$(date +%s)" | grep -q "<marker>"; do sleep 5; done` before checking. GitHub Pages CDN can take 1–5 min to propagate. Verification protocol:
1. Check which JS bundle the page loaded (`Array.from(document.querySelectorAll('script[src]')).map(s=>s.src)`) and compare to the new bundle filename in `dist/assets/`.
2. If the old bundle is still served, first distinguish browser cache from CDN: `fetch('https://www.duncan-webb.com/?cb='+performance.now(), {cache:'no-store'}).then(r=>r.text()).then(t=>t.match(/index-[\w-]+\.js/)?.[0])`. If this returns the NEW bundle, it's just browser cache — navigate to `https://www.duncan-webb.com/?fresh=1` (query string forces a fresh load). Only if the fetch returns the old bundle is it CDN propagation — then wait 60s and re-check.
3. Do not consider the task done until Chrome shows the correct text.

## Type scale

The site uses a strict 4-tier scale — do not introduce new sizes when adding sections:
- **2.2rem** — `.hero__title` only (display)
- **1.8rem** — `.section__title` (H2)
- **1.2rem** — emphasis tier: `.header__name`, `.hero__bio`, `.section__subtitle`, `.paper__title`
- **1.05rem** — body tier: everything else (`.project-item`, `.paper__authors`, `.paper__venue`, `.header__links a`, `.footer`, etc.)

Responsive overrides for `.hero__title` (1.7rem @ 768px, 1.4rem @ 480px) and `.section__title` (1.55rem @ 768px) are the only exceptions.

## Lessons

- The website CV PDF (`public/papers/duncan_webb_cv_website.pdf`) is generated from `~/Dropbox/Dropbox/CVs/cv_academic.tex`. Edit that canonical LaTeX source, then run `~/Dropbox/Dropbox/CVs/build_cv.command` for `cv_academic.pdf` or pass a dated output path such as `~/Dropbox/Dropbox/CVs/cv_academic_YYYY_MM_DD.pdf`. Copy the generated PDF here and deploy. The LaTeX source uses the licensed Constantia files in Microsoft Word's `Contents/Resources/DFonts/` directory; its four-page geometry and vertical rhythm were calibrated page-by-page against the former Constantia Word PDF.

- The Madagascar K1 paper's canonical source is `~/Dropbox/Apps/Overleaf/Mada Paper/main_mada.tex`. Before publishing `main_mada.pdf`, confirm `latexmk -pdf main_mada.tex` reports it up to date, then synchronize the website title and abstract with the manuscript.
- The public Madagascar download is `public/papers/MacoursVeraRuedaWebb_MenstrualStigmaHygieneMadagascar.pdf`. Keep `public/papers/StigmaHygieneMadagascar.pdf` byte-identical as a legacy alias for existing links.

- Co-author links added (Laajaj, Macours, Vera Rueda, Friedman, Suanna Oh) — check `src/App.jsx` before adding new ones to avoid duplicates.
- A PNG version of the D favicon lives in `public/assets/` for use on the Google Sites mirror — Google Sites does not accept `.ico` files.
- Google Sites mirror still needs: favicon uploaded manually and site republished.
- When adding coauthor names or links, verify preferred spelling and diacritics against an institutional profile, and verify every URL before deploying — academic homepages move frequently (Stanford→Google Sites, Google Sites→Harvard, etc). Use parallel subagents for speed.
- For shorthand website-content requests, preserve the user's display wording or ask for the exact title; do not silently substitute a manuscript title.
- `wip_draft.md` is a scratch file for drafting website content — don't commit it.
- **This site is a general-purpose personal/academic site — never stage anything else's sensitive files here** (survey data, PII, unrelated project outputs), even "temporarily" or password-protected. If that happens: reset the local `main` commit (`git reset --soft HEAD~1` if unpushed), rebuild `dist/` clean, then purge it from the public `gh-pages` history (not just the tip) with `npx gh-pages -d dist --dotfiles --no-history` (clear `node_modules/.cache/gh-pages` first if a prior push half-failed) — this force-replaces `gh-pages` with a single fresh commit containing no trace of the file, unlike a normal `deploy` which appends to history and leaves the blob reachable.
