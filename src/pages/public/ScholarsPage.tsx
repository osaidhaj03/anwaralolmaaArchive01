import {
  Search,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { PublicFooter } from '../../components/PublicFooter'
import { PublicHeader } from '../../components/PublicHeader'
import { PublicPageHero } from '../../components/public/PublicPageHero'
import { ScholarCard } from '../../components/public/ScholarCard'
import { PublicStatStrip } from '../../components/public/PublicStatStrip'
import { useLanguage } from '../../context/LanguageContext'
import { scholarsCopy } from '../../data/public/scholars'

export function ScholarsPage() {
  const { dir, language } = useLanguage()
  const copy = scholarsCopy[language]
  const [search, setSearch] = useState('')
  const [field, setField] = useState('')
  const [country, setCountry] = useState('')

  const fields = useMemo(() => unique(copy.scholars.map((scholar) => scholar.field)), [copy.scholars])
  const countries = useMemo(() => unique(copy.scholars.map((scholar) => scholar.country)), [copy.scholars])
  const scholars = useMemo(() => {
    const query = search.trim().toLowerCase()
    return copy.scholars.filter((scholar) => {
      const matchesSearch = [scholar.name, scholar.title, scholar.field, scholar.country].some((value) => value.toLowerCase().includes(query))
      return (!query || matchesSearch) && (!field || scholar.field === field) && (!country || scholar.country === country)
    })
  }, [copy.scholars, country, field, search])
  return (
    <main className="public-site" dir={dir}>
      <PublicHeader activeTo="/scholars" brand={copy.brand} languageLabel={copy.languageLabel} login={copy.login} nav={copy.nav} searchLabel={copy.searchLabel} subtitle={copy.subtitle} themeLabel={copy.themeLabel} />

      <PublicPageHero breadcrumb={copy.breadcrumb} className="scholars-hero" description={copy.description} title={copy.title}>
        <PublicStatStrip className="scholars-stat-strip" items={copy.stats} />
      </PublicPageHero>

      <section className="public-container scholars-layout">
        <div className="scholars-filter-card">
          <label className="scholars-search">
            <Search size={19} />
            <input onChange={(event) => setSearch(event.target.value)} placeholder={copy.searchPlaceholder} value={search} />
          </label>
          <label>
            <span>{copy.fieldsTitle}</span>
            <select onChange={(event) => setField(event.target.value)} value={field}>
              <option value="">{copy.all}</option>
              {fields.map((value) => <option key={value}>{value}</option>)}
            </select>
          </label>
          <label>
            <span>{copy.countriesTitle}</span>
            <select onChange={(event) => setCountry(event.target.value)} value={country}>
              <option value="">{copy.all}</option>
              {countries.map((value) => <option key={value}>{value}</option>)}
            </select>
          </label>
        </div>

        <div className="scholars-grid">
          {scholars.map((scholar) => {
            const scholarIndex = copy.scholars.findIndex((item) => item.name === scholar.name)
            return (
              <ScholarCard
                aboutLabel={copy.about}
                aboutTo={`/scholars/${scholarIndex + 1}`}
                key={scholar.name}
                scholar={scholar}
              />
            )
          })}
          {scholars.length === 0 ? <p className="courses-empty">{copy.empty}</p> : null}
        </div>
      </section>

      <PublicFooter
        brand={copy.brand}
        footerText={copy.footerText}
        newsletterButton={copy.newsletterButton}
        newsletterPlaceholder={copy.newsletterPlaceholder}
        newsletterText={copy.newsletterText}
        newsletterTitle={copy.newsletterTitle}
        quickLinks={copy.quickLinks}
        quickLinksItems={[
          { label: copy.nav[2].label, to: '/courses' },
          { label: copy.title, to: '/scholars' },
          { label: copy.nav[4].label, to: '/fatwa' },
          { label: copy.nav[1].label, to: '/categories' },
        ]}
        successText={copy.newsletterSuccess}
      />
    </main>
  )
}

function unique(values: string[]) {
  return Array.from(new Set(values))
}
