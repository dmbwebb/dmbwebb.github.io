import { describe, expect, it } from 'vitest'
import { existsSync, readFileSync } from 'fs'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const publicDir = resolve(repositoryRoot, 'public')
const appName = 'Duncan Webb Personal Automation'
const pages = [
  ['about', resolve(publicDir, 'google-automation/index.html')],
  ['privacy', resolve(publicDir, 'google-automation/privacy/index.html')],
  ['terms', resolve(publicDir, 'google-automation/terms/index.html')],
]

function parsePage(filePath) {
  return new DOMParser().parseFromString(readFileSync(filePath, 'utf8'), 'text/html')
}

describe('Google automation public pages', () => {
  it.each(pages)('%s page consistently identifies the OAuth application', (_name, filePath) => {
    const document = parsePage(filePath)

    expect(document.title).toContain(appName)
    expect(document.body.textContent).toContain(appName)
  })

  it.each(pages)('%s page has no scripts or third-party embedded resources', (_name, filePath) => {
    const document = parsePage(filePath)

    expect(document.querySelectorAll('script')).toHaveLength(0)

    const externalResources = [...document.querySelectorAll('[src], link[href]')]
      .map((element) => element.getAttribute('src') ?? element.getAttribute('href'))
      .filter((url) => /^https?:\/\//i.test(url))

    expect(externalResources).toEqual([])
  })

  it.each(pages)('%s page has no broken local links or resources', (_name, filePath) => {
    const document = parsePage(filePath)
    const missing = []

    for (const element of document.querySelectorAll('[href], [src]')) {
      const url = element.getAttribute('href') ?? element.getAttribute('src')
      if (!url || /^(https:\/\/|mailto:|#)/i.test(url)) continue

      if (url === '/') {
        if (!existsSync(resolve(repositoryRoot, 'index.html'))) missing.push(url)
        continue
      }

      const withoutQuery = url.split(/[?#]/, 1)[0]
      const target = withoutQuery.startsWith('/')
        ? resolve(publicDir, withoutQuery.slice(1))
        : resolve(dirname(filePath), withoutQuery)
      const resolvedTarget = target.endsWith('/') ? resolve(target, 'index.html') : target

      if (!existsSync(resolvedTarget)) missing.push(url)
    }

    expect(missing).toEqual([])
  })

  it('publishes the required privacy and revocation disclosures', () => {
    const privacy = readFileSync(resolve(publicDir, 'google-automation/privacy/index.html'), 'utf8')

    expect(privacy).toContain('Google API Services User Data Policy')
    expect(privacy).toContain('Limited Use requirements')
    expect(privacy).toContain('https://myaccount.google.com/connections')
    expect(privacy).toContain('macOS login Keychain')
  })
})
