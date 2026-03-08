import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../App'

describe('App renders all sections', () => {
  it('renders the name heading', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /duncan webb/i })).toBeInTheDocument()
  })

  it('renders the Research section', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /^research$/i })).toBeInTheDocument()
  })

  it('renders Working Papers subsection', () => {
    render(<App />)
    expect(screen.getByText(/working papers/i)).toBeInTheDocument()
  })

  it('renders Publications subsection', () => {
    render(<App />)
    expect(screen.getByText(/publications/i)).toBeInTheDocument()
  })

  it('renders Bits and bobs section', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /bits and bobs/i })).toBeInTheDocument()
  })
})

describe('Bio content', () => {
  it('renders bio text', () => {
    render(<App />)
    expect(screen.getByText(/development economist/i)).toBeInTheDocument()
  })

  it('renders NovaSBE link', () => {
    render(<App />)
    const link = screen.getByRole('link', { name: /nova school of business/i })
    expect(link).toHaveAttribute('href', 'https://www.novasbe.unl.pt/en/')
  })

  it('renders J-PAL link', () => {
    render(<App />)
    const link = screen.getByRole('link', { name: /j-pal/i })
    expect(link).toHaveAttribute('href', 'https://www.povertyactionlab.org/')
  })

  it('renders NOVAFRICA link', () => {
    render(<App />)
    const link = screen.getByRole('link', { name: /novafrica/i })
    expect(link).toHaveAttribute('href', 'https://novafrica.org/')
  })

  it('renders headshot image', () => {
    render(<App />)
    const img = screen.getByAltText(/duncan webb/i)
    expect(img).toHaveAttribute('src', '/assets/headshot.jpg')
  })
})

describe('Contact links', () => {
  it('renders email link', () => {
    render(<App />)
    const link = screen.getByRole('link', { name: /dmbwebb@gmail.com/i })
    expect(link).toHaveAttribute('href', 'mailto:dmbwebb@gmail.com')
  })

  it('renders CV link', () => {
    render(<App />)
    const links = screen.getAllByRole('link', { name: /^cv$/i })
    const cvLink = links.find(l => l.getAttribute('href') === '/papers/duncan_webb_cv_website.pdf')
    expect(cvLink).toBeTruthy()
  })

  it('renders Bluesky link', () => {
    render(<App />)
    const link = screen.getByRole('link', { name: /@duncanwebb/i })
    expect(link).toHaveAttribute('href', 'https://bsky.app/profile/duncanwebb.bsky.social')
  })

  it('renders office location', () => {
    render(<App />)
    expect(screen.getByText(/B115B, Nova SBE/)).toBeInTheDocument()
  })
})

describe('Working papers', () => {
  it('renders Silence to Solidarity', () => {
    render(<App />)
    const link = screen.getByRole('link', { name: /silence to solidarity/i })
    expect(link).toHaveAttribute('href', '/papers/WebbSilenceSolidarity.pdf')
  })

  it('renders JPE venue', () => {
    render(<App />)
    expect(screen.getByText(/accepted, journal of political economy/i)).toBeInTheDocument()
  })

  it('renders NEUDC award', () => {
    render(<App />)
    expect(screen.getByText(/weiss neudc distinguished paper 2023/i)).toBeInTheDocument()
  })

  it('renders Menstrual Stigma paper', () => {
    render(<App />)
    const link = screen.getByRole('link', { name: /menstrual stigma/i })
    expect(link).toHaveAttribute('href', '/papers/StigmaHygieneMadagascar.pdf')
  })

  it('renders Psychological Mechanisms paper', () => {
    render(<App />)
    const link = screen.getByRole('link', { name: /psychological mechanisms/i })
    expect(link).toHaveAttribute('href', '/papers/FriedmanOhWebbPsychMechs.pdf')
  })
})

describe('Publications', () => {
  it('renders Critical Periods paper', () => {
    render(<App />)
    const link = screen.getByRole('link', { name: /critical periods/i })
    expect(link).toHaveAttribute('href', 'https://academic.oup.com/ej/advance-article-abstract/doi/10.1093/ej/uead105/7455874')
  })

  it('renders COVID-19 Bogota paper', () => {
    render(<App />)
    const link = screen.getByRole('link', { name: /covid-19 spread.*bogota/i })
    expect(link).toHaveAttribute('href', 'https://www.nature.com/articles/s41467-021-25038-z')
  })

  it('renders socioeconomic inequalities paper', () => {
    render(<App />)
    const link = screen.getByRole('link', { name: /socioeconomic inequalities/i })
    expect(link).toHaveAttribute('href', 'https://www.nature.com/articles/s41598-022-11706-7')
  })
})

describe('Bits and bobs', () => {
  it('renders dups link', () => {
    render(<App />)
    const link = screen.getByRole('link', { name: /^dups$/i })
    expect(link).toHaveAttribute('href', 'https://github.com/dmbwebb/dups')
  })

  it('renders trackr link', () => {
    render(<App />)
    const link = screen.getByRole('link', { name: /^trackr$/i })
    expect(link).toHaveAttribute('href', 'https://github.com/dmbwebb/trackr')
  })

  it('renders qval link', () => {
    render(<App />)
    const link = screen.getByRole('link', { name: /^qval$/i })
    expect(link).toHaveAttribute('href', 'https://github.com/dmbwebb/qval')
  })

  it('renders ZenBot link', () => {
    render(<App />)
    const link = screen.getByRole('link', { name: /zenbot/i })
    expect(link).toHaveAttribute('href', 'https://dmbwebb.github.io/zenbot_v2/')
  })

  it('renders Longtermism link', () => {
    render(<App />)
    const link = screen.getByRole('link', { name: /longtermism/i })
    expect(link).toHaveAttribute('href', expect.stringContaining('effectivealtruism.org'))
  })

  it('renders History of gay rights link', () => {
    render(<App />)
    const link = screen.getByRole('link', { name: /history of gay rights/i })
    expect(link).toHaveAttribute('href', expect.stringContaining('substack.com'))
  })
})
