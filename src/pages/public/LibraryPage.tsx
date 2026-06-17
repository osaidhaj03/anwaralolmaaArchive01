import { Search, SlidersHorizontal } from 'lucide-react'
import { useMemo, useState } from 'react'
import { PublicFooter } from '../../components/PublicFooter'
import { PublicHeader } from '../../components/PublicHeader'
import { LibraryCard } from '../../components/public/LibraryCard'
import { PublicFilterSelect } from '../../components/public/PublicFilterSelect'
import { PublicPageHero } from '../../components/public/PublicPageHero'
import { PublicStatStrip } from '../../components/public/PublicStatStrip'
import { useArchiveStats, useLocalizedArchive } from '../../context/ArchiveDataContext'
import { useLanguage } from '../../context/LanguageContext'
import { libraryCopy } from '../../data/public/library'

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

  const categories = useMemo(() => unique(archive.books.map((item) => item.category)), [archive.books])
  const authors = useMemo(() => unique(archive.books.map((item) => item.author)), [archive.books])
  const types = useMemo(() => unique(archive.books.map((item) => item.type)), [archive.books])
  const items = useMemo(() => {
    const query = search.trim().toLowerCase()
    return archive.books
      .filter((item) => {
        const matchesSearch = [item.title, item.author, item.category, item.type].some((value) => value.toLowerCase().includes(query))
        return (!query || matchesSearch) && (!category || item.category === category) && (!author || item.author === author) && (!type || item.type === type)
      })
      .sort((first, second) => sort === 'popular' ? numericValue(second.views) - numericValue(first.views) : 0)
  }, [archive.books, author, category, search, sort, type])

  const normalizedStats = [
    String(stats.public.books),
    String(unique(archive.books.map((item) => item.author)).length),
    compactNumber(stats.public.reads),
  ]

  return (
    <main className="public-site" dir={dir}>
      <PublicHeader activeTo="/library" brand={copy.brand} languageLabel={copy.languageLabel} login={copy.login} nav={copy.nav} searchLabel={copy.searchLabel} subtitle={copy.subtitle} themeLabel={copy.themeLabel} />

      <PublicPageHero breadcrumb={copy.breadcrumb} className="library-hero" description={copy.description} title={copy.title}>
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
              <PublicFilterSelect allLabel={copy.all} label={copy.categoryLabel} onChange={setCategory} options={categories} value={category} />
              <PublicFilterSelect allLabel={copy.all} label={copy.authorLabel} onChange={setAuthor} options={authors} value={author} />
              <PublicFilterSelect allLabel={copy.all} label={copy.typeLabel} onChange={setType} options={types} value={type} />
            </div>
            <div className="courses-filter-horizontal-actions">
              <button
                className={sort === 'latest' ? 'is-active' : ''}
                onClick={() => setSort('latest')}
                type="button"
                style={{
                  background: sort === 'latest' ? 'var(--color-gold-700)' : '#fff',
                  color: sort === 'latest' ? '#fff' : '#0d263d'
                }}
              >
                {copy.latest}
              </button>
              <button
                className={sort === 'popular' ? 'is-active' : ''}
                onClick={() => setSort('popular')}
                type="button"
                style={{
                  background: sort === 'popular' ? 'var(--color-gold-700)' : '#fff',
                  color: sort === 'popular' ? '#fff' : '#0d263d'
                }}
              >
                {copy.mostDownloaded}
              </button>
            </div>
          </div>
        )}

        <PublicStatStrip
          className="library-stat-strip"
          items={copy.stats.map((item, index) => ({ ...item, value: normalizedStats[index] }))}
        />
      </PublicPageHero>

      <section className="public-container library-layout">
        <div className="library-grid">
          {items.map((item, index) => (
            <LibraryCard href={`/library/${index + 1}`} item={item} key={item.title} />
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
          { label: copy.nav[4].label, to: '/fatwa' },
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
