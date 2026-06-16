import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { PublicFooter } from '../../components/PublicFooter'
import { PublicHeader } from '../../components/PublicHeader'
import { LibraryCard } from '../../components/public/LibraryCard'
import { PublicFilterSelect } from '../../components/public/PublicFilterSelect'
import { PublicPageHero } from '../../components/public/PublicPageHero'
import { PublicStatStrip } from '../../components/public/PublicStatStrip'
import { useLanguage } from '../../context/LanguageContext'
import { libraryCopy } from '../../data/public/library'

export function LibraryPage() {
  const { dir, language } = useLanguage()
  const copy = libraryCopy[language]
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [author, setAuthor] = useState('')
  const [type, setType] = useState('')
  const [sort, setSort] = useState<'latest' | 'downloads'>('latest')

  const categories = useMemo(() => unique(copy.items.map((item) => item.category)), [copy.items])
  const authors = useMemo(() => unique(copy.items.map((item) => item.author)), [copy.items])
  const types = useMemo(() => unique(copy.items.map((item) => item.type)), [copy.items])
  const items = useMemo(() => {
    const query = search.trim().toLowerCase()
    return copy.items
      .filter((item) => {
        const matchesSearch = [item.title, item.author, item.category, item.type].some((value) => value.toLowerCase().includes(query))
        return (!query || matchesSearch) && (!category || item.category === category) && (!author || item.author === author) && (!type || item.type === type)
      })
      .sort((first, second) => sort === 'downloads' ? numericValue(second.downloads) - numericValue(first.downloads) : 0)
  }, [author, category, copy.items, search, sort, type])

  return (
    <main className="public-site" dir={dir}>
      <PublicHeader activeTo="/library" brand={copy.brand} languageLabel={copy.languageLabel} login={copy.login} nav={copy.nav} searchLabel={copy.searchLabel} subtitle={copy.subtitle} themeLabel={copy.themeLabel} />

      <PublicPageHero breadcrumb={copy.breadcrumb} className="library-hero" description={copy.description} title={copy.title}>
        <PublicStatStrip className="library-stat-strip" items={copy.stats} />
      </PublicPageHero>

      <section className="public-container library-layout">
        <aside className="library-filter-card">
          <label className="library-search"><Search size={19} /><input onChange={(event) => setSearch(event.target.value)} placeholder={copy.searchPlaceholder} value={search} /></label>
          <PublicFilterSelect allLabel={copy.all} label={copy.categoryLabel} onChange={setCategory} options={categories} value={category} />
          <PublicFilterSelect allLabel={copy.all} label={copy.authorLabel} onChange={setAuthor} options={authors} value={author} />
          <PublicFilterSelect allLabel={copy.all} label={copy.typeLabel} onChange={setType} options={types} value={type} />
          <div className="library-sort-buttons">
            <button className={sort === 'latest' ? 'is-active' : ''} onClick={() => setSort('latest')} type="button">{copy.latest}</button>
            <button className={sort === 'downloads' ? 'is-active' : ''} onClick={() => setSort('downloads')} type="button">{copy.mostDownloaded}</button>
          </div>
        </aside>

        <div className="library-grid">
          {items.map((item, index) => (
            <LibraryCard downloadLabel={copy.download} href={`/library/${index + 1}`} item={item} key={item.title} readLabel={copy.read} />
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
