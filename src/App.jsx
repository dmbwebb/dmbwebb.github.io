import { useState } from 'react'
import './App.css'

function CoverageLinks({ links }) {
  if (!links || links.length === 0) return null
  return (
    <div className="paper__coverage">
      Coverage:{' '}
      {links.map((link, i) => (
        <span key={i}>
          {i > 0 && ' | '}
          <a href={link.href} target="_blank" rel="noopener noreferrer">
            {link.label}
          </a>
        </span>
      ))}
    </div>
  )
}

function Paper({ title, href, venue, award, authors, abstract, links, coverage }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="paper">
      <div className="paper__title">
        <a href={href} target="_blank" rel="noopener noreferrer">
          {title}
        </a>
      </div>
      {venue && <div className="paper__venue">{venue}</div>}
      {award && <div className="paper__award">{award}</div>}
      {authors && <div className="paper__authors">{authors}</div>}
      {(abstract || (links && links.length > 0)) && (
        <div className="paper__supplements">
          {abstract && (
            <span>
              <button
                className={`paper__abstract-toggle ${open ? 'paper__abstract-toggle--open' : ''}`}
                onClick={() => setOpen(!open)}
                aria-expanded={open}
              >
                Abstract
              </button>
            </span>
          )}
          {links && links.map((link, i) => (
            <span key={i}>
              {(i > 0 || abstract) && ' | '}
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            </span>
          ))}
        </div>
      )}
      {abstract && (
        <div className={`paper__abstract ${open ? 'paper__abstract--open' : ''}`}>
          <p>{abstract}</p>
        </div>
      )}
      {coverage && coverage.length > 0 && <CoverageLinks links={coverage} />}
    </div>
  )
}

function App() {
  return (
    <div className="site">
      {/* Header */}
      <header className="header">
        <nav className="header__nav">
          <a href="#" className="header__name">Duncan Webb</a>
          <ul className="header__links">
            <li><a href="#research">Research</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="/papers/duncan_webb_cv_website.pdf" target="_blank">CV</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero / Bio */}
      <section className="hero">
        <div className="hero__sidebar">
          <img
            src="/assets/headshot.jpg"
            alt="Duncan Webb"
            className="hero__photo"
          />
          <ul className="hero__contact">
            <li>
              <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              <a href="mailto:dmbwebb@gmail.com">dmbwebb@gmail.com</a>
            </li>
            <li>
              <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              <a href="/papers/duncan_webb_cv_website.pdf" target="_blank">CV</a>
            </li>
            <li>
              <svg className="contact-icon" viewBox="0 0 568 501" fill="currentColor"><path d="M123.121 33.664C188.241 82.553 258.281 181.681 284 234.873c25.719-53.192 95.759-152.32 160.879-201.209C491.866-1.612 568-28.906 568 57.946c0 17.346-10.426 161.319-16.709 186.112-19.582 77.195-101.788 98.012-175.183 85.047 130.071 20.347 165.471 92.812 98.818 165.277-128.067 138.886-179.271-37.222-188.637-67.929-1.088-3.4-1.774-5.003-2.289-5.003s-1.201 1.603-2.289 5.003c-9.366 30.707-60.57 206.815-188.637 67.929C26.421 421.917 61.821 349.452 191.892 329.105 118.497 342.07 36.291 321.253 16.709 244.058 10.426 219.265 0 75.292 0 57.946 0-28.906 76.134-1.612 123.121 33.664Z"/></svg>
              <a href="https://bsky.app/profile/duncanwebb.bsky.social" target="_blank" rel="noopener noreferrer">@duncanwebb</a>
            </li>
            <li>
              <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/><path d="M9 9v.01"/><path d="M9 12v.01"/><path d="M9 15v.01"/><path d="M9 18v.01"/></svg>
              <span>B115B, Nova SBE</span>
            </li>
          </ul>
        </div>
        <div className="hero__content">
          <h1 className="hero__title">Duncan Webb</h1>
          <p className="hero__bio">
            I am a development economist who uses tools and insights from
            behavioural economics. My current projects focus on{' '}
            <strong>discrimination</strong>, <strong>social change</strong>,
            and <strong>human capital</strong>.
          </p>
          <p className="hero__bio">
            I'm an Assistant Professor of Economics at{' '}
            <a href="https://www.novasbe.unl.pt/en/" target="_blank" rel="noopener noreferrer">
              Nova School of Business and Economics
            </a>
            . I recently spent a year as a postdoctoral researcher at Princeton
            University, completed my PhD at the Paris School of Economics in
            2024, and spent 2022-23 as a visiting scholar at MIT. I am a{' '}
            <a href="https://www.povertyactionlab.org/" target="_blank" rel="noopener noreferrer">
              J-PAL
            </a>{' '}
            Invited Researcher and a member of the{' '}
            <a href="https://novafrica.org/" target="_blank" rel="noopener noreferrer">
              NOVAFRICA
            </a>{' '}
            group.
          </p>
        </div>
      </section>

      {/* Research */}
      <section className="section" id="research">
        <h2 className="section__title">Research</h2>

        <h3 className="section__subtitle">Working Papers</h3>

        <Paper
          title="Silence to Solidarity: How Communication About a Minority Affects Discrimination"
          href="/papers/WebbSilenceSolidarity.pdf"
          venue="Accepted, Journal of Political Economy"
          award="Winner of Weiss NEUDC Distinguished Paper 2023"
          abstract="People predominantly talk within their identity groups. Conversations between majority-group members may therefore be crucial in shaping discrimination against minorities. In an experiment in India (N=3,397), non-transgender participants strongly discriminate against transgender workers when hiring for a grocery delivery, but a discussion with two non-transgender neighbors eliminates this discrimination in private post-discussion choices. The discussion is 1.7x more effective at reducing discrimination than information about transgender people's legal rights, and effects partially persist after 1 month. The evidence is consistent with norm-based persuasion, in which pro-transgender participants are more vocal and create a perceived anti-discriminatory norm that reduces subsequent discrimination."
          links={[
            { label: 'Questionnaires', href: '/papers/WebbSilenceSolidaritySurveyMaterials.zip' },
            { label: 'Archived Analyses', href: '/papers/WebbSilenceSolidarityArchived.pdf' },
            { label: 'Replication Package', href: 'https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/UC27B9' },
          ]}
          coverage={[
            { label: 'VoxDev', href: 'https://voxdev.org/topic/institutions-political-economy/can-conversations-about-minority-reduce-discrimination' },
            { label: 'VoxTalks Economics', href: 'https://cepr.org/multimedia/next-generation-research' },
            { label: 'Ideas of India Podcast', href: 'https://www.mercatus.org/ideasofindia/duncan-webb-reducing-anti-transgender-discrimination-india' },
            { label: 'World Bank', href: 'https://blogs.worldbank.org/en/impactevaluations/can-conversations-between-discriminators-lead-less-discrimination-evidence-anti' },
            { label: 'Ideas for India', href: 'https://www.ideasforindia.in/topics/social-identity/can-conversations-about-minorities-reduce-discrimination-evidence-from-anti-transgender-discrimination-in-chennai.html' },
            { label: 'NewsLaundry', href: 'https://www.newslaundry.com/2025/02/28/miles-to-go-before-we-sleep-the-long-road-to-leadership-for-lgbtqia-professionals' },
            { label: 'JPAL Summary', href: 'https://www.povertyactionlab.org/evaluation/impact-group-discussion-hiring-discrimination-against-transgender-workers-india' },
          ]}
        />

        <Paper
          title="Menstrual Stigma and Human Capital: Experimental Evidence from Madagascar"
          href="/papers/StigmaHygieneMadagascar.pdf"
          authors="with Karen Macours and Julieta Vera Rueda"
          venue="CEPR Discussion Paper 21167, 2026"
          abstract={`Menstrual stigma affects adolescent girls worldwide, yet its impact on human capital development remains largely unexamined. We use a field experiment in 140 schools in Madagascar to evaluate interventions designed to reduce menstrual stigma and promote hygiene behaviors (N=2,250). Teacher-led sensitization on stigma and hygiene, menstrual products, and sanitation infrastructure together substantially improve girls\u2019 learning outcomes on standardized tests (+0.2 SD). These gains do not operate by improving school attendance or health, the channels typically invoked to justify menstrual hygiene programs. Instead, the improvements appear to arise from psychosocial mechanisms, including reduced menstrual stigma (measured using lab-in-the-field exercises, enumerator observations, and self-reports) and reduced stress (lower heart rate). We also test a novel approach for norm change by identifying \u201Cpositive deviants\u201D \u2013 girls within schools willing to openly challenge menstrual stigma. Selecting and training these positive deviants to serve as peer ambassadors for norm change produces significant additional improvements in self-reported stigma and hygiene behavior. The results demonstrate that addressing gender-specific psychosocial barriers can substantially improve girls\u2019 education outcomes in highly deprived contexts, while highlighting both the promise and limitations of leveraging positive deviance for social norm change.`}
          links={[
            { label: 'JPAL Summary', href: 'https://www.povertyactionlab.org/evaluation/addressing-menstrual-stigma-and-hygiene-improve-education-and-psychosocial-well-being' },
            { label: 'FID', href: 'https://fundinnovation.dev/news/ameliorer-les-apprentissages-a-travers-une-approche-combinee-d-interventions-sur-l-hygiene-menstruelle' },
            { label: 'VoxDev', href: 'https://voxdev.org/topic/health/improving-hygiene-reducing-menstrual-stigma-and-boosting-learning-schools' },
            { label: 'CEPR', href: 'https://cepr.org/publications/dp21167' },
          ]}
        />

        <Paper
          title="Psychological Mechanisms for Measuring Preferences and Beliefs"
          href="/papers/FriedmanOhWebbPsychMechs.pdf"
          authors="with Evan Friedman and Suanna Oh"
          abstract="Accurately measuring preferences and beliefs in surveys is crucial for social science research, but standard monetary incentives cannot be used when responses cannot be verified. We study two psychological mechanisms for improving answer quality that can be applied to unverifiable questions: (i) an unexpected bonus payment designed to trigger reciprocity towards the researcher, and (ii) telling respondents that they will later be paid to accurately restate their previously-given answers, which could motivate careful initial answers that are naturally easier to reconstruct. In a large online experiment (N=2,428), the bonus method improves both answer correctness and consistency, and does so more effectively than dropping participants who fail an attention check. This effect is driven by increased effort and reciprocity. The restatement method, however, does not consistently improve answer quality, primarily because participants exert effort trying to memorize their answers instead of answering carefully. These results demonstrate the potential and limitations of using psychological mechanisms to improve the quality of survey responses."
          links={[
            { label: 'CESifo WP', href: 'https://www.ifo.de/sites/default/files/docbase/docs/cesifo1_wp11859.pdf' },
            { label: 'Questionnaire', href: '/papers/PsychMechs_Questionnaire.pdf' },
            { label: 'Questionnaire, Experiment 2', href: '/papers/PsychMechs_Questionnaire_Exp2.pdf' },
          ]}
        />

        <h3 className="section__subtitle">Publications</h3>

        <Paper
          title="Critical Periods in Cognitive and Socioemotional Development: Evidence from Weather Shocks in Indonesia"
          href="https://academic.oup.com/ej/advance-article-abstract/doi/10.1093/ej/uead105/7455874"
          venue="Economic Journal, 2024"
          abstract={`Early life circumstances are important determinants of long-run human capital and wellbeing outcomes. The first 1000 days of life are often cited as a \u2018critical period\u2019 for child development, but this notion has rarely been directly tested. In a setting where children are potentially subject to shocks in every year of their childhood, I estimate the impact of early life weather shocks on adult cognitive and socioemotional outcomes for individuals born in rural Indonesia between 1988 and 2000. There is a strong critical period for these shocks at age 2 for cognitive development, but no evidence for a similar critical period for socioemotional development. The effects appear to be driven by changes in agricultural income and nutritional investment. The impacts are initially latent, only appearing after age 15. I show suggestive evidence for dynamic complementarity in early life investments.`}
          links={[
            { label: 'Ungated', href: '/papers/WebbCriticalPeriodsAccepted.pdf' },
          ]}
        />

        <Paper
          title="COVID-19 spread, detection, and dynamics in Bogota, Colombia"
          href="https://www.nature.com/articles/s41467-021-25038-z"
          venue="Nature Communications, 2021"
          authors="with Rachid Laajaj et al."
          abstract="Latin America has been severely affected by the COVID-19 pandemic but estimations of rates of infections are very limited and lack the level of detail required to guide policy decisions. We implemented a COVID-19 sentinel surveillance study with 59,770 RT-PCR tests on mostly asymptomatic individuals and combine this data with administrative records on all detected cases to capture the spread and dynamics of the COVID-19 pandemic in Bogota from June 2020 to early March 2021. We find that, by March 2021, slightly more than half of the population in Bogota has been infected, despite only a small fraction of this population being detected. The initial buildup of immunity contributed to the containment of the pandemic in the first and second waves. We also show that the share of the population infected by March 2021 varies widely by occupation, socio-economic stratum, and location, which has affected the dynamics of the spread with different groups being infected in the two waves."
          coverage={[
            { label: 'Blu', href: 'https://www.bluradio.com/especiales/coronavirus/estudio-revela-alta-afectacion-del-covid-19-en-los-estratos-mas-bajos-de-bogota' },
            { label: 'Caracol', href: 'https://caracol.com.co/radio/2021/08/25/salud/1629847144_391076.html' },
            { label: 'Caracol 2', href: 'https://caracol.com.co/radio/2021/12/23/salud/1640299891_424471.html' },
            { label: 'Nuevo Siglo', href: 'https://www.elnuevosiglo.com.co/articulos/04-15-2021-la-mitad-de-los-bogotanos-ya-se-contagio-de-covid-estudio-uniandes' },
          ]}
        />

        <Paper
          title="Understanding how socioeconomic inequalities drive inequalities in COVID-19 infections"
          href="https://www.nature.com/articles/s41598-022-11706-7"
          venue="Scientific Reports, 2022"
          authors="with Rachid Laajaj et al."
          abstract={`Across the world, the COVID-19 pandemic has disproportionately affected economically disadvantaged groups. This differential impact has numerous possible explanations, each with significantly different policy implications. We examine, for the first time in a low- or middle-income country, which mechanisms best explain the disproportionate impact of the virus on the poor. Combining an epidemiological model with rich data from Bogot\u00E1, Colombia, we show that total infections and inequalities in infections are largely driven by inequalities in the ability to work remotely and in within-home secondary attack rates. Inequalities in isolation behavior are less important but non-negligible, while access to testing and contact-tracing plays practically no role because it is too slow to contain the virus. Interventions that mitigate transmission are often more effective when targeted on socioeconomically disadvantaged populations.`}
          coverage={[
            { label: 'Espectador', href: 'https://blogs.elespectador.com/economia/desde-la-academia/cuantas-olas-tendra-la-pandemia-covid-19-colombia-unas-reflexiones-basadas-resultados-del-proyecto-covida-universidad-los-andes' },
            { label: 'Blu', href: 'https://www.bluradio.com/especiales/coronavirus/estudio-revela-alta-afectacion-del-covid-19-en-los-estratos-mas-bajos-de-bogota' },
          ]}
        />
      </section>

      {/* Bits and Bobs */}
      <section className="section" id="projects">
        <h2 className="section__title">Bits and bobs</h2>
        <ul className="projects-list">
          <li className="project-item">
            <a href="https://github.com/dmbwebb/dups" target="_blank" rel="noopener noreferrer" className="project-item__name">
              dups
            </a>
            <span className="project-item__desc"> &mdash; an R package for dealing with duplicates</span>
          </li>
          <li className="project-item">
            <a href="https://github.com/dmbwebb/trackr" target="_blank" rel="noopener noreferrer" className="project-item__name">
              trackr
            </a>
            <span className="project-item__desc"> &mdash; an R package that helps you easily track the results of dplyr functions</span>
          </li>
          <li className="project-item">
            <a href="https://github.com/dmbwebb/qval" target="_blank" rel="noopener noreferrer" className="project-item__name">
              qval
            </a>
            <span className="project-item__desc">
              {' '}&mdash; an R package that helps with multiple hypothesis testing by calculating FDR-adjusted p-values in the style of{' '}
              <a href="https://www.tandfonline.com/doi/abs/10.1198/016214508000000841" target="_blank" rel="noopener noreferrer" className="project-item__ref">
                Anderson (2008)
              </a>
            </span>
          </li>
          <li className="project-item">
            <a href="https://dmbwebb.github.io/zenbot_v2/" target="_blank" rel="noopener noreferrer" className="project-item__name">
              ZenBot
            </a>
            <span className="project-item__desc"> &mdash; a simple web app that generates customised guided meditations of any length</span>
          </li>
          <li className="project-item">
            <a href="https://forum.effectivealtruism.org/posts/z2DkdXgPitqf98AvY/formalising-the-washing-out-hypothesis" target="_blank" rel="noopener noreferrer" className="project-item__name">
              Longtermism
            </a>
            <span className="project-item__desc"> &mdash; a framework outlining the tradeoff faced when trying to affect the long-run future</span>
          </li>
          <li className="project-item">
            <a href="https://open.substack.com/pub/duncanwebb/p/how-the-world-became-more-accepting?r=bc4om&utm_campaign=post&utm_medium=web&showWelcomeOnShare=true" target="_blank" rel="noopener noreferrer" className="project-item__name">
              History of gay rights
            </a>
            <span className="project-item__desc"> &mdash; a blog post outlining how the world became more accepting of homosexuality</span>
          </li>
        </ul>
      </section>

      {/* Footer */}
      <footer className="footer">
        &copy; {new Date().getFullYear()} Duncan Webb
      </footer>
    </div>
  )
}

export default App
