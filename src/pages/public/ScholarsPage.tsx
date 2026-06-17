import { useMemo, useState } from 'react'
import { PublicFooter } from '../../components/PublicFooter'
import { PublicHeader } from '../../components/PublicHeader'
import { PublicPageHero } from '../../components/public/PublicPageHero'
import { ScholarsFilterCard } from '../../components/public/ScholarsFilterCard'
import { ScholarsGrid } from '../../components/public/ScholarsGrid'
import { ScholarsHeroStats } from '../../components/public/ScholarsHeroStats'
import { useArchiveStats, useLocalizedArchive } from '../../context/ArchiveDataContext'
import { useLanguage } from '../../context/LanguageContext'
import { scholarsCopy } from '../../data/public/scholars'

export function ScholarsPage() {
  const { dir, language } = useLanguage()
  const copy = scholarsCopy[language]
  const archive = useLocalizedArchive(language)
  const stats = useArchiveStats()
  const [search, setSearch] = useState('')
  const [field, setField] = useState('')
  const [country, setCountry] = useState('')
  const normalizedStats = [
    String(stats.public.scholars),
    String(stats.public.courses),
    new Intl.NumberFormat('en-US').format(stats.public.lessons),
    compactNumber(stats.public.students),
  ]
  const heroStats = copy.stats.map((item, index) => ({ ...item, value: normalizedStats[index] }))

  const fields = useMemo(() => unique(archive.scholars.map((scholar) => scholar.field)), [archive.scholars])
  const countries = useMemo(() => unique(archive.scholars.map((scholar) => scholar.country)), [archive.scholars])
  const scholars = useMemo(() => {
    const query = search.trim().toLowerCase()
    return archive.scholars.filter((scholar) => {
      const matchesSearch = [scholar.name, scholar.title, scholar.field, scholar.country].some((value) => value.toLowerCase().includes(query))
      return (!query || matchesSearch) && (!field || scholar.field === field) && (!country || scholar.country === country)
    })
  }, [archive.scholars, country, field, search])
  return (
    <main className="public-site" dir={dir}>
      <PublicHeader activeTo="/scholars" brand={copy.brand} languageLabel={copy.languageLabel} login={copy.login} nav={copy.nav} searchLabel={copy.searchLabel} subtitle={copy.subtitle} themeLabel={copy.themeLabel} />

      <PublicPageHero breadcrumb={copy.breadcrumb} className="scholars-hero" description={copy.description} title={copy.title}>
        <ScholarsHeroStats stats={heroStats} />
      </PublicPageHero>

      <section className="public-container scholars-layout">
        <ScholarsFilterCard
          allLabel={copy.all}
          countries={countries}
          country={country}
          countryLabel={copy.countriesTitle}
          field={field}
          fieldLabel={copy.fieldsTitle}
          fields={fields}
          onCountryChange={setCountry}
          onFieldChange={setField}
          onSearchChange={setSearch}
          search={search}
          searchPlaceholder={copy.searchPlaceholder}
        />

        <ScholarsGrid aboutLabel={copy.about} allScholars={archive.scholars} emptyLabel={copy.empty} scholars={scholars} />
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

function compactNumber(value: number) {
  if (value >= 1000) {
    return `${Math.round(value / 1000)}K`
  }
  return String(value)
}
