import { BookOpen, GraduationCap, LibraryBig, MessageCircleQuestion, PlaySquare, Search, UsersRound } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PublicPageFooter, PublicPageHeader } from '../../components/public/PublicPageChrome'
import { SearchResultsHero } from '../../components/public/SearchResultsHero'
import { SearchResultsList, type SearchResultItem } from '../../components/public/SearchResultsList'
import { useArchiveData, useLocalizedArchive } from '../../context/ArchiveDataContext'
import { useLanguage, type Language } from '../../context/LanguageContext'
import { coursesCopy } from '../../data/public/courses'

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
  uz: {
    breadcrumb: 'Bosh sahifa / Qidiruv natijalari',
    title: 'Qidiruv natijalari',
    description: 'Kurslar, ustozlar, fatvolar, kitoblar va kategoriyalar bo‘yicha umumiy qidiruv.',
    placeholder: 'Barcha kontentni qidirish...',
    all: 'Barchasi',
    courses: 'Kurslar',
    lessons: 'Darslar',
    scholars: 'Ustozlar',
    fatwa: 'Fatvolar',
    library: 'Kutubxona',
    categories: 'Kategoriyalar',
    results: 'natija',
    open: 'Ochish',
    empty: 'Mos keladigan natijalar topilmadi',
  },
  uzCyr: {
    breadcrumb: 'Бош саҳифа / Қидирув натижалари',
    title: 'Қидирув натижалари',
    description: 'Курслар, устозлар, фатволар, китоблар ва категориялар бўйича умумий қидирув.',
    placeholder: 'Барча контентни қидириш...',
    all: 'Барчаси',
    courses: 'Курслар',
    lessons: 'Дарслар',
    scholars: 'Устозлар',
    fatwa: 'Фатволар',
    library: 'Кутубхона',
    categories: 'Категориялар',
    results: 'натижа',
    open: 'Очиш',
    empty: 'Мос келадиган натижалар топилмади',
  },
  ru: {
    breadcrumb: 'Главная / Результаты поиска',
    title: 'Результаты поиска',
    description: 'Единый поиск по курсам, ученым, фетвам, книгам и категориям.',
    placeholder: 'Искать по всему сайту...',
    all: 'Все',
    courses: 'Курсы',
    lessons: 'Уроки',
    scholars: 'Ученые',
    fatwa: 'Фетвы',
    library: 'Библиотека',
    categories: 'Категории',
    results: 'результатов',
    open: 'Открыть',
    empty: 'Совпадений не найдено',
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
  const query = params.get('q') ?? ''

  const results = useMemo(() => {
    const lessonItems: SearchResultItem[] = Object.entries(lessonsByCourse).flatMap(([courseIndex, lessons]) =>
      lessons.map((lesson, lessonIndex) => ({
        title: lesson.title,
        meta: `${lesson.teacher} · ${lesson.duration}`,
        type: 'lessons',
        to: `/courses/${Number(courseIndex) + 1}#lesson-${lessonIndex + 1}`,
      })),
    )

    const items: SearchResultItem[] = [
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
    updateQuery(query)
  }

  function updateQuery(value: string) {
    const next = new URLSearchParams(params)
    if (value.trim()) next.set('q', value.trim())
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
      <PublicPageHeader activeTo="" copy={courses} />

      <SearchResultsHero
        activeFilter={filter}
        breadcrumb={copy.breadcrumb}
        description={copy.description}
        filters={filterButtons}
        onFilterChange={setFilter}
        onQueryChange={updateQuery}
        onSubmit={handleSubmit}
        openLabel={copy.open}
        placeholder={copy.placeholder}
        query={query}
        title={copy.title}
      />

      <SearchResultsList emptyLabel={copy.empty} filters={filterButtons} openLabel={copy.open} results={results} resultsLabel={copy.results} />

      <PublicPageFooter
        copy={courses}
        quickLinksItems={[
          { label: courses.nav[2].label, to: '/courses' },
          { label: courses.nav[3].label, to: '/scholars' },
          { label: courses.nav[5].label, to: '/library' },
        ]}
        successText={courses.newsletterSuccess}
      />
    </main>
  )
}
