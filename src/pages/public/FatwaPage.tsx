import { useMemo, useState } from 'react'
import { ArchiveHeroTools } from '../../components/public/ArchiveHeroTools'
import { FatwaResultsGrid } from '../../components/public/FatwaResultsGrid'
import { PublicPageFooter, PublicPageHeader } from '../../components/public/PublicPageChrome'
import { PublicPageHero } from '../../components/public/PublicPageHero'
import { useArchiveStats, useLocalizedArchive } from '../../context/ArchiveDataContext'
import { useLanguage } from '../../context/LanguageContext'
import { fatwaCopy } from '../../data/public/fatwa'
import { compactNumber, numericTextValue, uniqueValues } from '../../utils/publicFormat'

export function FatwaPage() {
  const { dir, language } = useLanguage()
  const copy = fatwaCopy[language]
  const archive = useLocalizedArchive(language)
  const stats = useArchiveStats()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [scholar, setScholar] = useState('')
  const [sort, setSort] = useState<'latest' | 'views'>('latest')
  const [showFilters, setShowFilters] = useState(false)

  const normalizedStats = [
    new Intl.NumberFormat('en-US').format(stats.public.fatwas),
    String(uniqueValues(archive.fatwas.map((item) => item.category)).length),
    String(stats.public.scholars),
    compactNumber(stats.public.reads),
  ]
  const heroStats = copy.stats.map((item, index) => ({ ...item, value: normalizedStats[index] }))
  const categories = useMemo(() => uniqueValues(archive.fatwas.map((item) => item.category)), [archive.fatwas])
  const scholars = useMemo(() => uniqueValues(archive.fatwas.map((item) => item.scholar)), [archive.fatwas])
  const items = useMemo(() => {
    const query = search.trim().toLowerCase()
    return archive.fatwas
      .filter((item) => {
        const matchesSearch = [item.title, item.scholar, item.category].some((value) => value.toLowerCase().includes(query))
        return (!query || matchesSearch) && (!category || item.category === category) && (!scholar || item.scholar === scholar)
      })
      .sort((first, second) => sort === 'views' ? numericTextValue(second.views) - numericTextValue(first.views) : second.date.localeCompare(first.date))
  }, [archive.fatwas, category, scholar, search, sort])

  return (
    <main className="public-site" dir={dir}>
      <PublicPageHeader activeTo="/fatwa" copy={copy} />

      <PublicPageHero breadcrumb={copy.breadcrumb} className="fatwa-hero" description={copy.description} title={copy.title}>
        <ArchiveHeroTools
          filters={[
            { allLabel: copy.all, label: copy.categoryLabel, onChange: setCategory, options: categories, value: category },
            { allLabel: copy.all, label: copy.scholarLabel, onChange: setScholar, options: scholars, value: scholar },
          ]}
          onSearchChange={setSearch}
          onSortChange={setSort}
          onToggleFilters={() => setShowFilters((current) => !current)}
          search={search}
          searchPlaceholder={copy.searchPlaceholder}
          showFilters={showFilters}
          sort={sort}
          sortOptions={[
            { label: copy.latest, value: 'latest' },
            { label: copy.mostViewed, value: 'views' },
          ]}
          statClassName="fatwa-stat-strip"
          stats={heroStats}
        />
      </PublicPageHero>

      <FatwaResultsGrid emptyLabel={copy.empty} items={items} />

      <PublicPageFooter
        copy={copy}
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

