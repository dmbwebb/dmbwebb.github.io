import { describe, it, expect, beforeEach, vi } from 'vitest'
import { initClickTracking } from '../analytics.js'

function clickLink(href, text = 'link') {
  const a = document.createElement('a')
  a.setAttribute('href', href)
  const span = document.createElement('span')
  span.textContent = text
  a.appendChild(span)
  document.body.appendChild(a)
  // click the child to exercise the closest() delegation
  span.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  a.remove()
}

describe('click tracking', () => {
  let count

  beforeEach(() => {
    document.body.innerHTML = ''
    count = vi.fn()
    window.goatcounter = { count }
    initClickTracking()
  })

  it('tracks paper downloads by filename', () => {
    clickLink('/papers/WebbSilenceSolidarity.pdf', 'Silence to Solidarity')
    expect(count).toHaveBeenCalledWith({
      path: 'download/WebbSilenceSolidarity.pdf',
      title: 'Silence to Solidarity',
      event: true,
    })
  })

  it('tracks mailto as contact/email', () => {
    clickLink('mailto:dmbwebb@gmail.com')
    expect(count).toHaveBeenCalledWith(expect.objectContaining({ path: 'contact/email' }))
  })

  it('tracks external links by hostname', () => {
    clickLink('https://github.com/dmbwebb/dups')
    expect(count).toHaveBeenCalledWith(expect.objectContaining({ path: 'ext/github.com' }))
  })

  it('ignores in-page anchors', () => {
    clickLink('#research')
    expect(count).not.toHaveBeenCalled()
  })

  it('does not throw when goatcounter has not loaded', () => {
    delete window.goatcounter
    expect(() => clickLink('/papers/x.pdf')).not.toThrow()
  })
})
