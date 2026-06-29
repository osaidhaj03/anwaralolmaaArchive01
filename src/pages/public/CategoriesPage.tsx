import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { CategoryCard } from '../../components/public/CategoryCard'
import { PublicPageFooter, PublicPageHeader } from '../../components/public/PublicPageChrome'
import { PublicPageHero } from '../../components/public/PublicPageHero'
import { useLocalizedArchive } from '../../context/ArchiveDataContext'
import { useLanguage } from '../../context/LanguageContext'
import { categoriesCopy } from '../../data/public/categories'

type CategoryFilter = 'all' | 'courses' | 'books'

export function CategoriesPage() {
  const { dir, language } = useLanguage()
  const copy = categoriesCopy[language]
  const archive = useLocalizedArchive(language)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<CategoryFilter>('all')

  const items = useMemo(() => {
    const query = search.trim().toLowerCase()
    const filtered = archive.categories.filter((item) => [item.title, item.text].some((value) => value.toLowerCase().includes(query)))

    if (filter === 'courses') {
      return [...filtered].sort((a, b) => b.courses - a.courses)
    }

    if (filter === 'books') {
      return [...filtered].sort((a, b) => b.books - a.books)
    }

    return filtered
  }, [archive.categories, filter, search])

  const totals = useMemo(
    () =>
      archive.categories.reduce(
        (current, item) => ({
          books: current.books + item.books,
          categories: current.categories + 1,
          courses: current.courses + item.courses,
          lessons: current.lessons + item.lessons,
        }),
        { books: 0, categories: 0, courses: 0, lessons: 0 },
      ),
    [archive.categories],
  )

  const filters: { id: CategoryFilter; label: string }[] = [
    { id: 'all', label: language === 'ar' ? 'الكل' : 'All' },
    { id: 'courses', label: language === 'ar' ? 'الأكثر دورات' : 'Most courses' },
    { id: 'books', label: language === 'ar' ? 'الأكثر كتبًا' : 'Most books' },
  ]

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

        <div className="categories-hero-stats">
          <span>{totals.categories} {language === 'ar' ? 'قسم' : 'categories'}</span>
          <span>{totals.courses} {language === 'ar' ? 'دورة' : 'courses'}</span>
          <span>{totals.lessons.toLocaleString('en-US')} {language === 'ar' ? 'درس' : 'lessons'}</span>
          <span>{totals.books} {language === 'ar' ? 'كتاب' : 'books'}</span>
        </div>
      </PublicPageHero>

      <section className="public-container categories-toolbar">
        <div>
          <strong>{language === 'ar' ? 'تصفح الأقسام' : 'Browse Categories'}</strong>
          <span>{items.length} {language === 'ar' ? 'نتيجة' : 'results'}</span>
        </div>
        <div className="categories-filter-tabs">
          {filters.map((item) => (
            <button className={filter === item.id ? 'is-active' : undefined} key={item.id} onClick={() => setFilter(item.id)} type="button">
              {item.label}
            </button>
          ))}
        </div>
      </section>

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
