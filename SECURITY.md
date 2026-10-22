# Website security maintenance

## Hosting and scope

The public site is static HTML, CSS, JavaScript and downloads served by GitHub Pages from `gh-pages`, with HTTPS enforced for `www.duncan-webb.com`. There is no PHP or Node application server in this deployment. Node is used locally to build, test and publish the site; updating it on a developer's machine is separate from updating GitHub Pages.

## Dependency review, 22 October 2026

- Use Node 22.23.4 (in `.node-version`), or a patched 24.x/26.x release satisfying `package.json`. These minimums include the [21 October Node security fixes](https://nodejs.org/en/blog/vulnerability/october-2026-security-releases). Version-manager pins do not update an already running process or a machine's default Node automatically.
- Use npm 12.0.2 or newer. npm 10.9.9 failed to resolve Vitest 4's optional peers with `Cannot read properties of null (reading 'edgesOut')`; npm 12.0.2 resolved the same manifest successfully.
- Vite was updated from 7.3.1 to 7.3.7, Vitest from 3.2.4 to 4.1.12, and affected transitive dependencies were refreshed in `package-lock.json`. React and React DOM remain at 19.2.4.
- The initial lockfile audit flagged 22 packages, including two critical findings. After updating, the production-only audit reports zero findings. The full audit retains five high-severity package entries from the single advisory below. Audit counts describe known package advisories, not proof of exploitability or absence of compromise.

## Remaining deployment-tool advisory

`gh-pages@6.3.0` depends on `globby`, `fast-glob`, `micromatch` and `braces`. [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) reports stack exhaustion from maliciously nested brace patterns; no patched `braces` release was available at review time.

This dependency chain is used only by the local publishing command, not shipped to visitors. The site's command is fixed as `gh-pages -d dist` and accepts no visitor-supplied glob patterns. Keep those inputs trusted and do not expose the deployment CLI as a network service. This limits exposure but does not remove the vulnerable dependency.

Do not use `npm audit fix --force` merely to clear this report: its proposed change is a downgrade to `gh-pages@6.1.1`, not a patch to `braces`. Recheck for an upstream fix during subsequent maintenance. Retain the existing publishing behaviour, including `--no-history` support for the repository's documented sensitive-file recovery procedure.

## Verification commands

With the supported Node/npm versions active, run `npm ci`, `npm test`, `npm run lint`, `npm run build`, `npm audit --omit=dev`, and `npm audit`. The last command is expected to exit nonzero while the documented deployment advisory remains. Before publishing, inspect the generated files; afterwards verify the live bundle, desktop/mobile layout and public downloads as described in `CLAUDE.md`.

The 22 October check passed all 57 tests, lint and the production build. All 29 generated public files matched the existing `gh-pages` files byte-for-byte. Chrome checks at 1280px and 400px showed no horizontal overflow or console errors, and the Abstract/More controls worked. All 15 hosted PDFs returned HTTP 200 with PDF headers; the survey ZIP and three Google Automation pages also returned HTTP 200. Of 72 distinct URLs checked, 61 returned success, ten external sites refused automated requests with HTTP 403, and the existing FID article link returned HTTP 404. Those external links were not changed as part of this dependency-only maintenance.
