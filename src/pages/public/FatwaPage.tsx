import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { PublicFooter } from '../../components/PublicFooter'
import { PublicHeader } from '../../components/PublicHeader'
import { FatwaCard } from '../../components/public/FatwaCard'
import { PublicPageHero } from '../../components/public/PublicPageHero'
import { PublicStatStrip } from '../../components/public/PublicStatStrip'
import { useArchiveStats, useLocalizedArchive } from '../../context/ArchiveDataContext'
import { useLanguage } from '../../context/LanguageContext'
import { fatwaCopy } from '../../data/public/fatwa'

export function FatwaPage() {
  const { dir, language } = useLanguage()
  const copy = fatwaCopy[language]
  const archive = useLocalizedArchive(language)
  const stats = useArchiveStats()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [scholar, setScholar] = useState('')
  const [sort, setSort] = useState<'latest' | 'views'>('latest')

  const normalizedStats = [
    new Intl.NumberFormat('en-US').format(stats.public.fatwas),
    String(unique(archive.fatwas.map((item) => item.category)).length),
    String(stats.public.scholars),
    compactNumber(stats.public.reads),
  ]
  const categories = useMemo(() => unique(archive.fatwas.map((item) => item.category)), [archive.fatwas])
  const scholars = useMemo(() => unique(archive.fatwas.map((item) => item.scholar)), [archive.fatwas])
  const items = useMemo(() => {
    const query = search.trim().toLowerCase()
    return archive.fatwas
      .filter((item) => {
        const matchesSearch = [item.title, item.scholar, item.category].some((value) => value.toLowerCase().includes(query))
        return (!query || matchesSearch) && (!category || item.category === category) && (!scholar || item.scholar === scholar)
      })
      .sort((first, second) => sort === 'views' ? numericValue(second.views) - numericValue(first.views) : second.date.localeCompare(first.date))
  }, [archive.fatwas, category, scholar, search, sort])

  return (
    <main className="public-site" dir={dir}>
      <PublicHeader activeTo="/fatwa" brand={copy.brand} languageLabel={copy.languageLabel} login={copy.login} nav={copy.nav} searchLabel={copy.searchLabel} subtitle={copy.subtitle} themeLabel={copy.themeLabel} />

      <PublicPageHero breadcrumb={copy.breadcrumb} className="fatwa-hero" description={copy.description} title={copy.title}>
        <PublicStatStrip
          className="fatwa-stat-strip"
          items={copy.stats.map((item, index) => ({ ...item, value: normalizedStats[index] }))}
        />
      </PublicPageHero>

      <section className="public-container fatwa-layout">
        <aside className="fatwa-filter-card">
          <label className="fatwa-search">
            <Search size={19} />
            <input onChange={(event) => setSearch(event.target.value)} placeholder={copy.searchPlaceholder} value={search} />
          </label>
          <label><span>{copy.categoryLabel}</span><select onChange={(event) => setCategory(event.target.value)} value={category}><option value="">{copy.all}</option>{categories.map((value) => <option key={value}>{value}</option>)}</select></label>
          <label><span>{copy.scholarLabel}</span><select onChange={(event) => setScholar(event.target.value)} value={scholar}><option value="">{copy.all}</option>{scholars.map((value) => <option key={value}>{value}</option>)}</select></label>
          <div className="fatwa-sort-buttons">
            <button className={sort === 'latest' ? 'is-active' : ''} onClick={() => setSort('latest')} type="button">{copy.latest}</button>
            <button className={sort === 'views' ? 'is-active' : ''} onClick={() => setSort('views')} type="button">{copy.mostViewed}</button>
          </div>
        </aside>

        <div className="fatwa-grid">
          {items.map((item, index) => (
            <FatwaCard fatwa={item} href={`/fatwa/${index + 1}`} key={item.title} watchLabel={copy.watch} />
          ))}
          {items.length === 0 ? <p className="courses-empty">{copy.empty}</p> : null}
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
          { label: copy.nav[3].label, to: '/scholars' },
          { label: copy.title, to: '/fatwa' },
        ]}
        successText={copy.newsletterSuccess}
      />
    </main>
  )
}

function unique(values: string[]) {
  return Array.from(new Set(values))
}

function numericValue(value: string) {
  return Number(value.replace(/[^\d]/g, ''))
}

function compactNumber(value: number) {
  if (value >= 1000) {
    return `${Math.round(value / 1000)}K`
  }
  return String(value)
}
