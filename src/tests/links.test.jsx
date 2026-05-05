import { describe, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { existsSync } from 'fs'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import App from '../App'

const publicDir = resolve(dirname(fileURLToPath(import.meta.url)), '../../public')

function revealMoreLinks() {
  screen.getAllByRole('button', { name: /^more$/i }).forEach((button) => {
    fireEvent.click(button)
  })
}

function getMissingPublicPaths(container, selector, getPath) {
  const missing = []

  container.querySelectorAll(selector).forEach((element) => {
    const path = getPath(element)
    if (path && path.startsWith('/') && !path.startsWith('//')) {
      const filePath = resolve(publicDir, path.slice(1))
      if (!existsSync(filePath)) {
        missing.push(path)
      }
    }
  })

  return missing
}

describe('No broken local links', () => {
  it('all local href paths point to existing files in public/', () => {
    const { container } = render(<App />)
    revealMoreLinks()
    const broken = getMissingPublicPaths(container, 'a[href]', (link) => {
      const href = link.getAttribute('href')
      return href && !href.startsWith('/#') ? href : null
    })

    if (broken.length > 0) {
      throw new Error(`Broken local links:\n${broken.map(l => `  - ${l}`).join('\n')}`)
    }
  })

  it('all local img src paths point to existing files in public/', () => {
    const { container } = render(<App />)
    const broken = getMissingPublicPaths(container, 'img[src]', (img) => img.getAttribute('src'))

    if (broken.length > 0) {
      throw new Error(`Broken local image paths:\n${broken.map(l => `  - ${l}`).join('\n')}`)
    }
  })
})

describe('External links are well-formed', () => {
  it('all external links use https://', () => {
    const { container } = render(<App />)
    revealMoreLinks()
    const allLinks = container.querySelectorAll('a[href]')
    const bad = []

    allLinks.forEach((link) => {
      const href = link.getAttribute('href')
      if (href && !href.startsWith('/') && !href.startsWith('#') && !href.startsWith('mailto:')) {
        if (!href.startsWith('https://')) {
          bad.push(href)
        }
      }
    })

    if (bad.length > 0) {
      throw new Error(`Non-https external links:\n${bad.map(l => `  - ${l}`).join('\n')}`)
    }
  })

  it('no external links have empty href', () => {
    const { container } = render(<App />)
    revealMoreLinks()
    const allLinks = container.querySelectorAll('a[href]')
    const empty = []

    allLinks.forEach((link) => {
      const href = link.getAttribute('href')
      if (!href || href.trim() === '') {
        empty.push(link.textContent)
      }
    })

    if (empty.length > 0) {
      throw new Error(`Links with empty href:\n${empty.map(l => `  - "${l}"`).join('\n')}`)
    }
  })

  it('no duplicate local PDF references to missing files', () => {
    const { container } = render(<App />)
    revealMoreLinks()
    const allLinks = container.querySelectorAll('a[href^="/papers/"]')
    const pdfPaths = new Set()

    allLinks.forEach((link) => {
      pdfPaths.add(link.getAttribute('href'))
    })

    const missing = []
    pdfPaths.forEach((href) => {
      const filePath = resolve(publicDir, href.slice(1))
      if (!existsSync(filePath)) {
        missing.push(href)
      }
    })

    if (missing.length > 0) {
      throw new Error(`Missing PDF files:\n${missing.map(l => `  - ${l}`).join('\n')}`)
    }
  })
})
