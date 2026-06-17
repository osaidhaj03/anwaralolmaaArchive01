import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { PublicFooter } from '../../components/PublicFooter'
import { PublicHeader } from '../../components/PublicHeader'
import { CategoryCard } from '../../components/public/CategoryCard'
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
      <PublicHeader activeTo="/categories" brand={copy.brand} languageLabel={copy.languageLabel} login={copy.login} nav={copy.nav} searchLabel={copy.searchLabel} subtitle={copy.subtitle} themeLabel={copy.themeLabel} />

      <PublicPageHero breadcrumb={copy.breadcrumb} className="categories-hero" description={copy.description} title={copy.title}>
        <div className="categories-tools">
          <label className="courses-searchbar">
            <Search size={20} />
            <input onChange={(event) => setSearch(event.target.value)} placeholder={copy.searchPlaceholder} value={search} />
          </label>
          <button className="category-tool-button" type="button">{copy.sortLabel}</button>
        </div>
      </PublicPageHero>

      <section className="public-container categories-page-grid">
        {items.map((item) => (
          <CategoryCard category={item} key={item.id} viewLabel={copy.view} />
        ))}
        {items.length === 0 ? <p className="courses-empty">{copy.empty}</p> : null}
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
          { label: copy.nav[5].label, to: '/library' },
        ]}
        successText={copy.newsletterSuccess}
      />
    </main>
  )
}
