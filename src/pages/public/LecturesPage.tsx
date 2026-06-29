import { useMemo, useState } from 'react'
import { ArchiveHeroTools } from '../../components/public/ArchiveHeroTools'
import { LectureResultsGrid } from '../../components/public/LectureResultsGrid'
import { PublicPageFooter, PublicPageHeader } from '../../components/public/PublicPageChrome'
import { PublicPageHero } from '../../components/public/PublicPageHero'
import { useArchiveStats, useLocalizedArchive } from '../../context/ArchiveDataContext'
import { useLanguage } from '../../context/LanguageContext'
import { lecturesCopy } from '../../data/public/lectures'
import { compactNumber, numericTextValue, uniqueValues } from '../../utils/publicFormat'

export function LecturesPage() {
  const { dir, language } = useLanguage()
  const copy = lecturesCopy[language]
  const archive = useLocalizedArchive(language)
  const stats = useArchiveStats()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [scholar, setScholar] = useState('')
  const [sort, setSort] = useState<'latest' | 'views'>('latest')
  const [showFilters, setShowFilters] = useState(false)

  const normalizedStats = [
    new Intl.NumberFormat('en-US').format(stats.public.lectures),
    String(uniqueValues(archive.lectures.map((item) => item.category)).length),
    String(stats.public.scholars),
    compactNumber(stats.public.reads * 0.4),
  ]
  const heroStats = copy.stats.map((item, index) => ({ ...item, value: normalizedStats[index] }))
  const categories = useMemo(() => uniqueValues(archive.lectures.map((item) => item.category)), [archive.lectures])
  const scholars = useMemo(() => uniqueValues(archive.lectures.map((item) => item.scholar)), [archive.lectures])
  const items = useMemo(() => {
    const query = search.trim().toLowerCase()
    return archive.lectures
      .filter((item) => {
        const matchesSearch = [item.title, item.scholar, item.category].some((value) => value.toLowerCase().includes(query))
        return (!query || matchesSearch) && (!category || item.category === category) && (!scholar || item.scholar === scholar)
      })
      .sort((first, second) => sort === 'views' ? numericTextValue(second.views) - numericTextValue(first.views) : second.date.localeCompare(first.date))
  }, [archive.lectures, category, scholar, search, sort])

  return (
    <main className="public-site" dir={dir}>
      <PublicPageHeader activeTo="/lectures" copy={copy} />

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

      <LectureResultsGrid
        emptyLabel={copy.empty}
        items={items}
        partLabel={copy.partLabel}
        partsLabel={copy.partsLabel}
      />

      <PublicPageFooter
        copy={copy}
        quickLinksItems={[
          { label: copy.nav[2].label, to: '/courses' },
          { label: copy.nav[3].label, to: '/scholars' },
          { label: copy.title, to: '/lectures' },
        ]}
        successText={copy.newsletterSuccess}
      />
    </main>
  )
}
