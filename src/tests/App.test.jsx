import { describe, it, expect } from 'vitest'
import { fireEvent, render, screen, within } from '@testing-library/react'
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

  it('renders Teaching section', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /^teaching$/i })).toBeInTheDocument()
  })

  it('renders Code & other writing section', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /code & other writing/i })).toBeInTheDocument()
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
    expect(img).toHaveAttribute('src', '/assets/headshot2.jpg')
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
    expect(screen.getByText(/B128C, Nova SBE/)).toBeInTheDocument()
  })
})

describe('Working papers', () => {
  it('renders the AI robustness checker project and coauthor links', () => {
    render(<App />)
    expect(screen.getByText(/automating robustness: using agentic ai to automate robustness checks/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Magnus Johannesson' })).toHaveAttribute('href', 'https://www.hhs.se/en/persons/j/johannesson-magnus/')
    expect(screen.getByRole('link', { name: 'Joseph Kopecky' })).toHaveAttribute('href', 'https://www.josephkopecky.com/')
    expect(screen.getByRole('link', { name: 'Lester Lusher' })).toHaveAttribute('href', 'https://www.econ.pitt.edu/people/lester-lusher')
  })

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
    expect(link).toHaveAttribute('href', '/papers/MacoursVeraRuedaWebb_MenstrualStigmaHygieneMadagascar.pdf')
    expect(screen.getByText('CEPR Discussion Paper 21167, 2026')).toHaveClass('paper__venue--regular')

    const paper = link.closest('.paper')
    fireEvent.click(within(paper).getByRole('button', { name: /^more$/i }))
    expect(within(paper).getByRole('link', { name: 'FID Video' })).toHaveAttribute(
      'href',
      'https://www.youtube.com/watch?v=saK1-5y5FpU',
    )
  })

  it('renders Psychological Mechanisms paper', () => {
    render(<App />)
    const link = screen.getByRole('link', { name: /psychological mechanisms/i })
    expect(link).toHaveAttribute('href', '/papers/FriedmanOhWebbPsychMechs.pdf')
  })

  it('links Ángela Guarín’s profile', () => {
    render(<App />)
    expect(screen.getByRole('link', { name: 'Ángela Guarín' })).toHaveAttribute(
      'href',
      'https://imagina.uniandes.edu.co/red-imagina/angela-guarin/',
    )
  })
})

describe('Paper expandable links', () => {
  it('hides supplemental and coverage links until More is expanded', () => {
    render(<App />)

    expect(screen.queryByRole('link', { name: /questionnaires/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /voxdev/i })).not.toBeInTheDocument()

    fireEvent.click(screen.getAllByRole('button', { name: /^more$/i })[0])

    expect(screen.getByRole('link', { name: /questionnaires/i })).toHaveAttribute(
      'href',
      '/papers/WebbSilenceSolidaritySurveyMaterials.zip',
    )
    expect(screen.getByRole('link', { name: /voxdev/i })).toHaveAttribute(
      'href',
      'https://voxdev.org/topic/institutions-political-economy/can-conversations-about-minority-reduce-discrimination',
    )
  })

  it('closes More when Abstract is opened on the same paper', () => {
    render(<App />)
    const abstractButton = screen.getAllByRole('button', { name: /^abstract$/i })[0]
    const moreButton = screen.getAllByRole('button', { name: /^more$/i })[0]

    fireEvent.click(moreButton)
    expect(moreButton).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('link', { name: /questionnaires/i })).toBeInTheDocument()

    fireEvent.click(abstractButton)
    expect(abstractButton).toHaveAttribute('aria-expanded', 'true')
    expect(moreButton).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByRole('link', { name: /questionnaires/i })).not.toBeInTheDocument()
  })

  it('closes Abstract when More is opened on the same paper', () => {
    render(<App />)
    const abstractButton = screen.getAllByRole('button', { name: /^abstract$/i })[0]
    const moreButton = screen.getAllByRole('button', { name: /^more$/i })[0]

    fireEvent.click(abstractButton)
    expect(abstractButton).toHaveAttribute('aria-expanded', 'true')

    fireEvent.click(moreButton)
    expect(moreButton).toHaveAttribute('aria-expanded', 'true')
    expect(abstractButton).toHaveAttribute('aria-expanded', 'false')
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

describe('Teaching', () => {
  it('renders Development Economics with syllabus link', () => {
    render(<App />)
    const link = screen.getByRole('link', { name: /^development economics$/i })
    expect(link).toHaveAttribute('href', '/papers/development_economics_syllabus.pdf')
  })

  it('renders Econometrics with syllabus link', () => {
    render(<App />)
    const link = screen.getByRole('link', { name: /^econometrics$/i })
    expect(link).toHaveAttribute('href', '/papers/phd_econometrics_syllabus.pdf')
  })
})

describe('Code & other writing', () => {
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
