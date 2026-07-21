# CLAUDE.md — dmbwebb.github.io

Personal academic website for Duncan Webb, built with React/Vite, deployed to GitHub Pages at www.duncan-webb.com.

## Development

```bash
npm run dev      # Dev server at localhost:5173
npm run build    # Production build to dist/
npm run deploy   # Build + deploy to gh-pages branch
```

- **Deploying**: `git push origin main` does NOT deploy the site. GitHub Pages serves from the `gh-pages` branch. Always run `npm run deploy` after pushing to actually deploy. When committing and pushing, always also run `npm run deploy`.
- **CV-only deploy exception**: If the main worktree has unrelated dirty files and only `public/papers/duncan_webb_cv_website.pdf` changed, update that PDF directly in a separate `gh-pages` worktree and push `gh-pages` so unrelated `dist/` changes are not published.
- The `.github/workflows/deploy.yml` has been deleted. PAT lacks `workflow` scope so it can't be pushed to GitHub. Pages source is `gh-pages` branch (legacy mode).

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

After running `npm run deploy`, always verify the live site in Chrome (via Claude-in-Chrome) by navigating to `www.duncan-webb.com` and confirming the changed text is visible. GitHub Pages CDN can take 1–5 min to propagate. Verification protocol:
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

- The website CV PDF (`public/papers/duncan_webb_cv_website.pdf`) is generated from the latest `~/Dropbox/Dropbox/CVs/cv_academic_YYYY_MM_DD.docx`. To update: edit the docx (docx skill), save a NEW dated docx+pdf copy in CVs/ (don't overwrite the old one), copy the PDF here, deploy. **To make the PDF, run `~/Dropbox/Dropbox/CVs/export_cv_with_word.command <docx>`** — it exports via Word so Constantia stays embedded. Do NOT hand-roll the Word AppleScript (grabbing `active document` risks Duncan's other open Word docs; the wrong `file format` enum silently writes a plain-text file with a `.pdf` name) and do NOT use LibreOffice/`soffice` (substitutes Constantia→Liberation Serif, reflowing the layout).

- Co-author links added (Laajaj, Macours, Vera Rueda, Friedman, Suanna Oh) — check `src/App.jsx` before adding new ones to avoid duplicates.
- A PNG version of the D favicon lives in `public/assets/` for use on the Google Sites mirror — Google Sites does not accept `.ico` files.
- Google Sites mirror still needs: favicon uploaded manually and site republished.
- When adding coauthor names or links, verify preferred spelling and diacritics against an institutional profile, and verify every URL before deploying — academic homepages move frequently (Stanford→Google Sites, Google Sites→Harvard, etc). Use parallel subagents for speed.
- For shorthand website-content requests, preserve the user's display wording or ask for the exact title; do not silently substitute a manuscript title.
- `wip_draft.md` is a scratch file for drafting website content — don't commit it.
- **This site is a general-purpose personal/academic site — never stage anything else's sensitive files here** (survey data, PII, unrelated project outputs), even "temporarily" or password-protected. If that happens: reset the local `main` commit (`git reset --soft HEAD~1` if unpushed), rebuild `dist/` clean, then purge it from the public `gh-pages` history (not just the tip) with `npx gh-pages -d dist --dotfiles --no-history` (clear `node_modules/.cache/gh-pages` first if a prior push half-failed) — this force-replaces `gh-pages` with a single fresh commit containing no trace of the file, unlike a normal `deploy` which appends to history and leaves the blob reachable.
