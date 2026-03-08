import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { existsSync } from 'fs'
import { resolve } from 'path'
import App from '../App'

describe('No broken local links', () => {
  it('all local href paths point to existing files in public/', () => {
    const { container } = render(<App />)
    const allLinks = container.querySelectorAll('a[href]')
    const publicDir = resolve(__dirname, '../../public')
    const broken = []

    allLinks.forEach((link) => {
      const href = link.getAttribute('href')
      // Only check local paths (starting with / but not //)
      if (href && href.startsWith('/') && !href.startsWith('//') && !href.startsWith('/#')) {
        const filePath = resolve(publicDir, href.slice(1))
        if (!existsSync(filePath)) {
          broken.push(href)
        }
      }
    })

    if (broken.length > 0) {
      throw new Error(`Broken local links:\n${broken.map(l => `  - ${l}`).join('\n')}`)
    }
  })

  it('all local img src paths point to existing files in public/', () => {
    const { container } = render(<App />)
    const allImages = container.querySelectorAll('img[src]')
    const publicDir = resolve(__dirname, '../../public')
    const broken = []

    allImages.forEach((img) => {
      const src = img.getAttribute('src')
      if (src && src.startsWith('/') && !src.startsWith('//')) {
        const filePath = resolve(publicDir, src.slice(1))
        if (!existsSync(filePath)) {
          broken.push(src)
        }
      }
    })

    if (broken.length > 0) {
      throw new Error(`Broken local image paths:\n${broken.map(l => `  - ${l}`).join('\n')}`)
    }
  })
})

describe('External links are well-formed', () => {
  it('all external links use https://', () => {
    const { container } = render(<App />)
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
    const allLinks = container.querySelectorAll('a[href^="/papers/"]')
    const publicDir = resolve(__dirname, '../../public')
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
