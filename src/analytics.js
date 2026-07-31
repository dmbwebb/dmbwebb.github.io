// GoatCounter click events via delegation, so links need no per-element
// attributes and binding order vs. React render doesn't matter.
// Pageviews are counted separately by count.js (loaded in index.html);
// count.js ignores localhost, so dev traffic is never recorded.

const MAX_TITLE_LENGTH = 100

// Event name for a link's href, or null when the click isn't tracked.
function eventNameFor(href) {
  if (href.startsWith('/papers/')) {
    return 'download/' + href.slice('/papers/'.length)
  }
  if (href.startsWith('mailto:')) {
    return 'contact/email'
  }
  if (!/^https?:\/\//.test(href)) {
    return null // in-page anchors (#research etc.)
  }
  try {
    return 'ext/' + new URL(href).hostname
  } catch {
    return null
  }
}

export function initClickTracking() {
  document.addEventListener('click', (e) => {
    const a = e.target.closest?.('a[href]')
    // count.js loads async and is blocked by some ad-blockers, so re-check per click.
    if (!a || !window.goatcounter?.count) return

    const event = eventNameFor(a.getAttribute('href'))
    if (!event) return

    window.goatcounter.count({
      path: event,
      title: a.textContent.trim().slice(0, MAX_TITLE_LENGTH),
      event: true,
    })
  })
}
