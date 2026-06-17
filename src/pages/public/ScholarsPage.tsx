import { useMemo, useState } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import { PublicFooter } from '../../components/PublicFooter'
import { PublicHeader } from '../../components/PublicHeader'
import { PublicPageHero } from '../../components/public/PublicPageHero'
import { ScholarsGrid } from '../../components/public/ScholarsGrid'
import { ScholarsHeroStats } from '../../components/public/ScholarsHeroStats'
import { PublicFilterSelect } from '../../components/public/PublicFilterSelect'
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
  const [showFilters, setShowFilters] = useState(false)
  const normalizedStats = [
    String(stats.public.scholars),
    String(stats.public.courses),
    new Intl.NumberFormat('en-US').format(stats.public.lessons),
    compactNumber(stats.public.students),
  ]
  const heroStats = copy.stats.map((item, index) => ({ ...item, value: normalizedStats[index] }))

  const fields = useMemo(() => unique(archive.scholars.map((scholar) => scholar.field)), [archive.scholars])
  const scholars = useMemo(() => {
    const query = search.trim().toLowerCase()
    return archive.scholars.filter((scholar) => {
      const matchesSearch = [scholar.name, scholar.title, scholar.field].some((value) => value.toLowerCase().includes(query))
      return (!query || matchesSearch) && (!field || scholar.field === field)
    })
  }, [archive.scholars, field, search])
  return (
    <main className="public-site" dir={dir}>
      <PublicHeader activeTo="/scholars" brand={copy.brand} languageLabel={copy.languageLabel} login={copy.login} nav={copy.nav} searchLabel={copy.searchLabel} subtitle={copy.subtitle} themeLabel={copy.themeLabel} />

      <PublicPageHero breadcrumb={copy.breadcrumb} className="scholars-hero" description={copy.description} title={copy.title}>
        <div className="courses-searchbar">
          <label>
            <Search size={20} />
            <input onChange={(event) => setSearch(event.target.value)} placeholder={copy.searchPlaceholder} value={search} />
          </label>
          <button
            className={`courses-filter-toggle-btn ${showFilters ? 'is-active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
            type="button"
            aria-label="Toggle filters"
          >
            <SlidersHorizontal size={20} />
          </button>
        </div>

        {showFilters && (
          <div className="courses-filter-horizontal-card">
            <div className="courses-filter-grid">
              <PublicFilterSelect allLabel={copy.all} label={copy.fieldsTitle} onChange={setField} options={fields} value={field} />
            </div>
          </div>
        )}

        <ScholarsHeroStats stats={heroStats} />
      </PublicPageHero>

      <section className="public-container scholars-layout">
        <ScholarsGrid allScholars={archive.scholars} emptyLabel={copy.empty} scholars={scholars} />
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
