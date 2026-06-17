import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { CategoryCard } from '../../components/public/CategoryCard'
import { PublicPageFooter, PublicPageHeader } from '../../components/public/PublicPageChrome'
import { PublicPageHero } from '../../components/public/PublicPageHero'
import { useLocalizedArchive } from '../../context/ArchiveDataContext'
import { useLanguage } from '../../context/LanguageContext'
import { categoriesCopy } from '../../data/public/categories'

export function CategoriesPage() {
  const { dir, language } = useLanguage()
  const copy = categoriesCopy[language]
  const archive = useLocalizedArchive(language)
  const [search, setSearch] = useState('')

  const items = useMemo(() => {
    const query = search.trim().toLowerCase()
    return archive.categories.filter((item) => [item.title, item.text].some((value) => value.toLowerCase().includes(query)))
  }, [archive.categories, search])

  return (
    <main className="public-site" dir={dir}>
      <PublicPageHeader activeTo="/categories" copy={copy} />

      <PublicPageHero breadcrumb={copy.breadcrumb} className="categories-hero" description={copy.description} title={copy.title}>
        <div className="courses-searchbar">
          <label>
            <Search size={20} />
            <input onChange={(event) => setSearch(event.target.value)} placeholder={copy.searchPlaceholder} value={search} />
          </label>
        </div>
      </PublicPageHero>

      <section className="public-container categories-page-grid">
        {items.map((item) => (
          <CategoryCard category={item} key={item.id} />
        ))}
        {items.length === 0 ? <p className="courses-empty">{copy.empty}</p> : null}
      </section>

      <PublicPageFooter copy={copy} successText={copy.newsletterSuccess} />
    </main>
  )
}
