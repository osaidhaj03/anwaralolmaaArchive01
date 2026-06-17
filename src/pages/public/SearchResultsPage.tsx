import { BookOpen, GraduationCap, LibraryBig, MessageCircleQuestion, PlaySquare, Search, UsersRound } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { PublicFooter } from '../../components/PublicFooter'
import { PublicHeader } from '../../components/PublicHeader'
import { useArchiveData, useLocalizedArchive } from '../../context/ArchiveDataContext'
import { useLanguage, type Language } from '../../context/LanguageContext'
import { coursesCopy } from '../../data/public/courses'

type SearchResult = {
  title: string
  meta: string
  type: string
  to: string
}

const searchCopy: Record<Language, Record<string, string>> = {
  ar: {
    breadcrumb: 'الرئيسية / نتائج البحث',
    title: 'نتائج البحث',
    description: 'بحث موحد في الدورات والعلماء والفتاوى والكتب والأقسام.',
    placeholder: 'ابحث في كل المحتوى...',
    all: 'الكل',
    courses: 'الدورات',
    lessons: 'الدروس',
    scholars: 'العلماء',
    fatwa: 'الفتاوى',
    library: 'المكتبة',
    categories: 'الأقسام',
    results: 'نتيجة',
    open: 'فتح',
    empty: 'لا توجد نتائج مطابقة',
  },
  en: {
    breadcrumb: 'Home / Search results',
    title: 'Search results',
    description: 'Unified search across courses, scholars, fatwas, books, and categories.',
    placeholder: 'Search all content...',
    all: 'All',
    courses: 'Courses',
    lessons: 'Lessons',
    scholars: 'Scholars',
    fatwa: 'Fatwa',
    library: 'Library',
    categories: 'Categories',
    results: 'results',
    open: 'Open',
    empty: 'No matching results',
  },
}

export function SearchResultsPage() {
  const { dir, language } = useLanguage()
  const [params, setParams] = useSearchParams()
  const copy = searchCopy[language]
  const archive = useLocalizedArchive(language)
  const { lessonsByCourse } = useArchiveData()
  const courses = coursesCopy[language]
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState(params.get('q') ?? '')

  const results = useMemo(() => {
    const lessonItems: SearchResult[] = Object.entries(lessonsByCourse).flatMap(([courseIndex, lessons]) =>
      lessons.map((lesson, lessonIndex) => ({
        title: lesson.title,
        meta: `${lesson.teacher} · ${lesson.duration}`,
        type: 'lessons',
        to: `/courses/${Number(courseIndex) + 1}#lesson-${lessonIndex + 1}`,
      })),
    )

    const items: SearchResult[] = [
      ...archive.courses.map((item, index) => ({ title: item.title, meta: item.teacher, type: 'courses', to: `/courses/${index + 1}` })),
      ...lessonItems,
      ...archive.scholars.map((item, index) => ({ title: item.name, meta: item.field, type: 'scholars', to: `/scholars/${index + 1}` })),
      ...archive.books.map((item, index) => ({ title: item.title, meta: item.author, type: 'library', to: `/library/${index + 1}` })),
      ...archive.fatwas.map((item, index) => ({ title: item.title, meta: item.scholar, type: 'fatwa', to: `/fatwa/${index + 1}` })),
      ...archive.categories.map((item) => ({ title: item.title, meta: item.text, type: 'categories', to: `/categories/${item.id}` })),
    ]
    const normalized = query.trim().toLowerCase()
    return items.filter((item) => {
      const match = !normalized || item.title.toLowerCase().includes(normalized) || item.meta.toLowerCase().includes(normalized)
      return match && (filter === 'all' || item.type === filter)
    })
  }, [archive.books, archive.categories, archive.courses, archive.fatwas, archive.scholars, filter, lessonsByCourse, query])

  function handleSubmit() {
    const next = new URLSearchParams(params)
    if (query.trim()) next.set('q', query.trim())
    else next.delete('q')
    setParams(next)
  }

  const filterButtons = [
    { key: 'all', label: copy.all, icon: Search },
    { key: 'courses', label: copy.courses, icon: GraduationCap },
    { key: 'lessons', label: copy.lessons, icon: PlaySquare },
    { key: 'scholars', label: copy.scholars, icon: UsersRound },
    { key: 'fatwa', label: copy.fatwa, icon: MessageCircleQuestion },
    { key: 'library', label: copy.library, icon: BookOpen },
    { key: 'categories', label: copy.categories, icon: LibraryBig },
  ]

  return (
    <main className="public-site" dir={dir}>
      <PublicHeader activeTo="" brand={courses.brand} languageLabel={courses.languageLabel} login={courses.login} nav={courses.nav} searchLabel={courses.searchLabel} subtitle={courses.subtitle} themeLabel={courses.themeLabel} />

      <section className="search-results-hero islamic-soft-pattern">
        <div className="public-container search-results-hero__inner">
          <span>{copy.breadcrumb}</span>
          <h1>{copy.title}</h1>
          <p>{copy.description}</p>
          <div className="search-results-input">
            <Search size={19} />
            <input onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => event.key === 'Enter' ? handleSubmit() : undefined} placeholder={copy.placeholder} value={query} />
            <button onClick={handleSubmit} type="button">{copy.open}</button>
          </div>
          <div className="search-results-filters">
            {filterButtons.map(({ key, label, icon: Icon }) => (
              <button className={filter === key ? 'is-active' : ''} key={key} onClick={() => setFilter(key)} type="button">
                <Icon size={16} />
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="public-container search-results-layout">
        <div className="search-results-summary">
          <strong>{results.length}</strong>
          <span>{copy.results}</span>
        </div>
        <div className="search-results-list">
          {results.map((item) => (
            <article className="search-results-card" key={`${item.type}-${item.to}`}>
              <div>
                <small>{filterButtons.find((entry) => entry.key === item.type)?.label}</small>
                <h2>{item.title}</h2>
                <p>{item.meta}</p>
              </div>
              <Link to={item.to}>{copy.open}</Link>
            </article>
          ))}
          {results.length === 0 ? <p className="courses-empty">{copy.empty}</p> : null}
        </div>
      </section>

      <PublicFooter
        brand={courses.brand}
        footerText={courses.footerText}
        newsletterButton={courses.newsletterButton}
        newsletterPlaceholder={courses.newsletterPlaceholder}
        newsletterText={courses.newsletterText}
        newsletterTitle={courses.newsletterTitle}
        quickLinks={courses.quickLinks}
        quickLinksItems={[
          { label: courses.nav[2].label, to: '/courses' },
          { label: courses.nav[3].label, to: '/scholars' },
          { label: courses.nav[5].label, to: '/library' },
        ]}
        successText={language === 'ar' ? 'تم تسجيل بريدك في القائمة البريدية.' : 'Your email has been added to the newsletter list.'}
      />
    </main>
  )
}
