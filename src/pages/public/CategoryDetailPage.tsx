import { BookOpen, Clock, FileQuestion, GraduationCap, Mic2, Newspaper, Play, Search, UsersRound } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useMemo, useState, type ReactNode } from 'react'
import { CategoryCard } from '../../components/public/CategoryCard'
import { CategoryDetailHero } from '../../components/public/CategoryDetailHero'
import { CourseCard } from '../../components/public/CourseCard'
import { PublicPageFooter, PublicPageHeader } from '../../components/public/PublicPageChrome'
import { useLocalizedArchive } from '../../context/ArchiveDataContext'
import { useLanguage } from '../../context/LanguageContext'
import { categoriesCopy } from '../../data/public/categories'

type ContentTab = 'courses' | 'lectures' | 'fatwas' | 'books' | 'scholars' | 'articles'

export function CategoryDetailPage() {
  const { categoryId } = useParams()
  const { dir, language } = useLanguage()
  const isArabic = language === 'ar'
  const copy = categoriesCopy[language]
  const archive = useLocalizedArchive(language)
  const category = archive.categories.find((item) => item.id === categoryId)
  const [activeTab, setActiveTab] = useState<ContentTab>('courses')
  const [search, setSearch] = useState('')

  if (!category) {
    return <Navigate replace to="/categories" />
  }

  const labels = {
    articles: isArabic ? 'المقالات' : 'Articles',
    books: isArabic ? 'الكتب' : 'Books',
    breadcrumb: isArabic ? 'الرئيسية / الأقسام / تفاصيل القسم' : 'Home / Categories / Category details',
    courses: isArabic ? 'الدورات' : 'Courses',
    fatwas: isArabic ? 'الفتاوى والأسئلة' : 'Fatwas and questions',
    lectures: isArabic ? 'المحاضرات' : 'Lectures',
    parts: isArabic ? 'أجزاء' : 'parts',
    scholars: isArabic ? 'العلماء' : 'Scholars',
    search: isArabic ? 'ابحث داخل هذا القسم...' : 'Search inside this category...',
    subcategories: isArabic ? 'الأقسام الفرعية التابعة' : 'Subcategories',
    topCourses: isArabic ? 'دورات هذا القسم' : 'Courses in this category',
  }

  const relatedCourses = archive.courses
    .map((course, index) => ({ course, index }))
    .filter(({ course }) => course.categoryId === category.id)
  const featuredCourses = relatedCourses.length ? relatedCourses : archive.courses.map((course, index) => ({ course, index })).slice(0, 4)
  const relatedBooks = archive.books.slice(0, 6)
  const relatedFatwas = archive.fatwas.slice(0, 6)
  const relatedScholars = archive.scholars.slice(0, 6)
  const subcategories = archive.categories.filter((sub) => sub.parentId === category.id)

  const lectures = [
    {
      duration: '28:00',
      parts: 1,
      scholar: featuredCourses[0]?.course.teacher ?? relatedScholars[0]?.name ?? '',
      thumbnail: featuredCourses[0]?.course.thumbnail ?? relatedFatwas[0]?.thumbnail ?? '',
      title: isArabic ? `مدخل إلى ${category.title}` : `Introduction to ${category.title}`,
      type: isArabic ? 'محاضرة مرئية' : 'Video lecture',
    },
    {
      duration: '42:15',
      parts: 3,
      scholar: featuredCourses[1]?.course.teacher ?? relatedScholars[1]?.name ?? '',
      thumbnail: featuredCourses[1]?.course.thumbnail ?? relatedFatwas[1]?.thumbnail ?? '',
      title: isArabic ? `مسائل مختارة في ${category.title}` : `Selected topics in ${category.title}`,
      type: isArabic ? 'سلسلة قصيرة' : 'Short series',
    },
    {
      duration: '36:40',
      parts: 2,
      scholar: featuredCourses[2]?.course.teacher ?? relatedScholars[2]?.name ?? '',
      thumbnail: featuredCourses[2]?.course.thumbnail ?? relatedFatwas[2]?.thumbnail ?? '',
      title: isArabic ? `فوائد وتنبيهات في ${category.title}` : `Benefits and notes in ${category.title}`,
      type: isArabic ? 'محاضرة صوتية' : 'Audio lecture',
    },
  ]

  const articles = [
    {
      author: isArabic ? 'قسم البحوث' : 'Research desk',
      title: isArabic ? `أصول مهمة في ${category.title}` : `Key foundations in ${category.title}`,
      type: isArabic ? 'بحث' : 'Research',
    },
    {
      author: isArabic ? 'هيئة التحرير' : 'Editorial team',
      title: isArabic ? `خطة دراسة ${category.title}` : `Study plan for ${category.title}`,
      type: isArabic ? 'مقال' : 'Article',
    },
    {
      author: isArabic ? 'المقالات العلمية' : 'Articles',
      title: isArabic ? `مراجعات وفوائد في ${category.title}` : `Reviews and benefits in ${category.title}`,
      type: isArabic ? 'مقال' : 'Article',
    },
  ]

  const query = search.trim().toLowerCase()
  const matches = (values: string[]) => !query || values.some((value) => value.toLowerCase().includes(query))
  const visibleCourses = featuredCourses.filter(({ course }) => matches([course.title, course.teacher, course.category]))
  const visibleLectures = lectures.filter((lecture) => matches([lecture.title, lecture.scholar, lecture.type]))
  const visibleFatwas = relatedFatwas.filter((fatwa) => matches([fatwa.title, fatwa.scholar, fatwa.category]))
  const visibleBooks = relatedBooks.filter((book) => matches([book.title, book.author, book.category]))
  const visibleScholars = relatedScholars.filter((scholar) => matches([scholar.name, scholar.title, scholar.field]))
  const visibleArticles = articles.filter((article) => matches([article.title, article.author, article.type]))

  const tabs = useMemo(
    () => [
      { count: visibleCourses.length, icon: GraduationCap, id: 'courses' as const, label: labels.courses },
      { count: visibleLectures.length, icon: Mic2, id: 'lectures' as const, label: labels.lectures },
      { count: visibleFatwas.length, icon: FileQuestion, id: 'fatwas' as const, label: labels.fatwas },
      { count: visibleBooks.length, icon: BookOpen, id: 'books' as const, label: labels.books },
      { count: visibleScholars.length, icon: UsersRound, id: 'scholars' as const, label: labels.scholars },
      { count: visibleArticles.length, icon: Newspaper, id: 'articles' as const, label: labels.articles },
    ],
    [labels.articles, labels.books, labels.courses, labels.fatwas, labels.lectures, labels.scholars, visibleArticles.length, visibleBooks.length, visibleCourses.length, visibleFatwas.length, visibleLectures.length, visibleScholars.length],
  )
  const show = (tab: ContentTab) => activeTab === tab

  return (
    <main className="public-site" dir={dir}>
      <PublicPageHeader activeTo="/categories" copy={copy} />

      <CategoryDetailHero breadcrumb={labels.breadcrumb} category={category} />

      <section className="public-container category-detail-dashboard">
        <label className="category-detail-search">
          <Search size={19} />
          <input onChange={(event) => setSearch(event.target.value)} placeholder={labels.search} value={search} />
        </label>
        <div className="category-detail-tabs">
          {tabs.map(({ count, icon: Icon, id, label }) => (
            <button className={activeTab === id ? 'is-active' : undefined} key={id} onClick={() => setActiveTab(id)} type="button">
              <Icon size={17} />
              <span>{label}</span>
              <strong>{count}</strong>
            </button>
          ))}
        </div>
      </section>

      <section className="public-container category-detail-layout">
        <div className="category-detail-main">
          {show('courses') ? (
            <ContentPanel title={labels.topCourses}>
              <div className="category-course-grid">
                {visibleCourses.map(({ course, index }) => (
                  <CourseCard course={course} href={`/courses/${index + 1}`} key={course.title} showProgress={false} />
                ))}
              </div>
            </ContentPanel>
          ) : null}

          {show('lectures') ? (
            <ContentPanel title={labels.lectures}>
              <div className="category-video-grid">
                {visibleLectures.map((lecture) => (
                  <VideoContentCard
                    duration={lecture.duration}
                    eyebrow={`${lecture.type} - ${lecture.parts} ${labels.parts}`}
                    key={lecture.title}
                    scholar={lecture.scholar}
                    thumbnail={lecture.thumbnail}
                    title={lecture.title}
                    to="/courses"
                  />
                ))}
              </div>
            </ContentPanel>
          ) : null}

          {show('fatwas') ? (
            <ContentPanel title={labels.fatwas}>
              <div className="category-video-grid">
                {visibleFatwas.map((fatwa) => (
                  <VideoContentCard
                    duration={fatwa.duration}
                    eyebrow={fatwa.category}
                    key={fatwa.title}
                    scholar={fatwa.scholar}
                    thumbnail={fatwa.thumbnail}
                    title={fatwa.title}
                    to="/fatwa"
                    views={fatwa.views}
                  />
                ))}
              </div>
            </ContentPanel>
          ) : null}

          {show('books') ? (
            <ContentPanel title={labels.books}>
              <div className="category-content-grid">
                {visibleBooks.map((book, index) => (
                  <Link className="category-content-card" key={book.title} to={`/library/${index + 1}`}>
                    <BookOpen size={22} />
                    <small>{book.type}</small>
                    <h3>{book.title}</h3>
                    <p>{book.author}</p>
                  </Link>
                ))}
              </div>
            </ContentPanel>
          ) : null}

          {show('scholars') ? (
            <ContentPanel title={labels.scholars}>
              <div className="category-scholar-mini-grid">
                {visibleScholars.map((scholar, index) => (
                  <Link className="category-scholar-mini" key={scholar.name} to={`/scholars/${index + 1}`}>
                    <img alt={scholar.name} src={scholar.image} />
                    <h3>{scholar.name}</h3>
                    <p>{scholar.field}</p>
                  </Link>
                ))}
              </div>
            </ContentPanel>
          ) : null}

          {show('articles') ? (
            <ContentPanel title={labels.articles}>
              <div className="category-content-grid">
                {visibleArticles.map((article) => (
                  <Link className="category-content-card" key={article.title} to="#">
                    <Newspaper size={22} />
                    <small>{article.type}</small>
                    <h3>{article.title}</h3>
                    <p>{article.author}</p>
                  </Link>
                ))}
              </div>
            </ContentPanel>
          ) : null}

          {subcategories.length > 0 ? (
            <ContentPanel title={labels.subcategories}>
              <div className="categories-page-grid category-detail-subcategories">
                {subcategories.map((sub) => (
                  <CategoryCard category={sub} key={sub.id} />
                ))}
              </div>
            </ContentPanel>
          ) : null}
        </div>
      </section>

      <PublicPageFooter
        copy={copy}
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

function ContentPanel({ children, title }: { children: ReactNode; title: string }) {
  return (
    <div className="category-detail-panel category-detail-content-panel">
      <h2>{title}</h2>
      {children}
    </div>
  )
}

function VideoContentCard({
  duration,
  eyebrow,
  scholar,
  thumbnail,
  title,
  to,
  views,
}: {
  duration: string
  eyebrow: string
  scholar: string
  thumbnail: string
  title: string
  to: string
  views?: string
}) {
  return (
    <Link className="category-video-card" to={to}>
      <div className="category-video-cover">
        <img alt="" src={thumbnail} />
        <span className="category-video-play"><Play fill="currentColor" size={18} /></span>
        <span className="category-video-duration">{duration}</span>
      </div>
      <div className="category-video-body">
        <small>{eyebrow}</small>
        <h3>{title}</h3>
        <p>{scholar}</p>
        <div className="category-video-meta">
          <span><Clock size={15} />{duration}</span>
          {views ? <span><UsersRound size={15} />{views}</span> : null}
        </div>
      </div>
    </Link>
  )
}
