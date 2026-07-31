// GoatCounter click events via delegation, so links need no per-element
// attributes and binding order vs. React render doesn't matter.
// Pageviews are counted separately by count.js (loaded in index.html);
// count.js ignores localhost, so dev traffic is never recorded.
export function initClickTracking() {
  document.addEventListener('click', (e) => {
    const a = e.target.closest?.('a[href]')
    if (!a || !window.goatcounter?.count) return

    const href = a.getAttribute('href')
    let event
    if (href.startsWith('/papers/')) {
      event = 'download/' + href.slice('/papers/'.length)
    } else if (href.startsWith('mailto:')) {
      event = 'contact/email'
    } else if (/^https?:\/\//.test(href)) {
      try {
        event = 'ext/' + new URL(href).hostname
      } catch {
        return
      }
    } else {
      return // in-page anchors (#research etc.)
    }

    window.goatcounter.count({ path: event, title: a.textContent.trim().slice(0, 100), event: true })
  })
}
