import { useMemo, useState } from 'react'
import { ArchiveHeroTools } from '../../components/public/ArchiveHeroTools'
import { LibraryResultsGrid } from '../../components/public/LibraryResultsGrid'
import { PublicPageFooter, PublicPageHeader } from '../../components/public/PublicPageChrome'
import { PublicPageHero } from '../../components/public/PublicPageHero'
import { useArchiveStats, useLocalizedArchive } from '../../context/ArchiveDataContext'
import { useLanguage } from '../../context/LanguageContext'
import { libraryCopy } from '../../data/public/library'
import { compactNumber, numericTextValue, uniqueValues } from '../../utils/publicFormat'

export function LibraryPage() {
  const { dir, language } = useLanguage()
  const copy = libraryCopy[language]
  const archive = useLocalizedArchive(language)
  const stats = useArchiveStats()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [author, setAuthor] = useState('')
  const [type, setType] = useState('')
  const [sort, setSort] = useState<'latest' | 'popular'>('latest')
  const [showFilters, setShowFilters] = useState(false)

  const categories = useMemo(() => uniqueValues(archive.books.map((item) => item.category)), [archive.books])
  const authors = useMemo(() => uniqueValues(archive.books.map((item) => item.author)), [archive.books])
  const types = useMemo(() => uniqueValues(archive.books.map((item) => item.type)), [archive.books])
  const items = useMemo(() => {
    const query = search.trim().toLowerCase()
    return archive.books
      .filter((item) => {
        const matchesSearch = [item.title, item.author, item.category, item.type].some((value) => value.toLowerCase().includes(query))
        return (!query || matchesSearch) && (!category || item.category === category) && (!author || item.author === author) && (!type || item.type === type)
      })
      .sort((first, second) => sort === 'popular' ? numericTextValue(second.views) - numericTextValue(first.views) : 0)
  }, [archive.books, author, category, search, sort, type])

  const normalizedStats = [
    String(stats.public.books),
    String(uniqueValues(archive.books.map((item) => item.author)).length),
    compactNumber(stats.public.reads),
  ]
  const heroStats = copy.stats.map((item, index) => ({ ...item, value: normalizedStats[index] }))

  return (
    <main className="public-site" dir={dir}>
      <PublicPageHeader activeTo="/library" copy={copy} />

      <PublicPageHero breadcrumb={copy.breadcrumb} className="library-hero" description={copy.description} title={copy.title}>
        <ArchiveHeroTools
          filters={[
            { allLabel: copy.all, label: copy.categoryLabel, onChange: setCategory, options: categories, value: category },
            { allLabel: copy.all, label: copy.authorLabel, onChange: setAuthor, options: authors, value: author },
            { allLabel: copy.all, label: copy.typeLabel, onChange: setType, options: types, value: type },
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
            { label: copy.mostDownloaded, value: 'popular' },
          ]}
          statClassName="library-stat-strip"
          stats={heroStats}
        />
      </PublicPageHero>

      <LibraryResultsGrid emptyLabel={copy.empty} items={items} />

      <PublicPageFooter
        copy={copy}
        quickLinksItems={[
          { label: copy.nav[2].label, to: '/courses' },
          { label: copy.nav[3].label, to: '/scholars' },
          { label: copy.nav[4].label, to: '/fatwa' },
        ]}
        successText={copy.newsletterSuccess}
      />
    </main>
  )
}

