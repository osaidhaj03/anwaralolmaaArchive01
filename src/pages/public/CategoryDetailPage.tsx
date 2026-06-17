import { BookOpen, GraduationCap, PlayCircle, UsersRound } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { BrandMark } from '../../components/AdminIcons'
import { PublicFooter } from '../../components/PublicFooter'
import { PublicHeader } from '../../components/PublicHeader'
import { useLocalizedArchive } from '../../context/ArchiveDataContext'
import { useLanguage, type Language } from '../../context/LanguageContext'
import { categoriesCopy } from '../../data/public/categories'

const categoryDetailCopy: Record<Language, Record<string, string>> = {
  ar: {
    breadcrumb: 'الرئيسية / الأقسام / تفاصيل القسم',
    courses: 'الدورات',
    lessons: 'الدروس',
    books: 'الكتب',
    scholars: 'العلماء',
    topCourses: 'أبرز الدورات',
    related: 'محتوى مرتبط',
    open: 'فتح الدورة',
    viewAll: 'عرض القسم كاملاً',
  },
  en: {
    breadcrumb: 'Home / Categories / Category details',
    courses: 'Courses',
    lessons: 'Lessons',
    books: 'Books',
    scholars: 'Scholars',
    topCourses: 'Top courses',
    related: 'Related content',
    open: 'Open course',
    viewAll: 'View full category',
  },
}

export function CategoryDetailPage() {
  const { categoryId } = useParams()
  const { dir, language } = useLanguage()
  const copy = categoriesCopy[language]
  const archive = useLocalizedArchive(language)
  const detail = categoryDetailCopy[language]
  const category = archive.categories.find((item) => item.id === categoryId)

  if (!category) {
    return <Navigate to="/categories" replace />
  }

  const Icon = category.icon
  const relatedCourses = archive.courses
    .map((course, index) => ({ course, index }))
    .filter(({ course }) => course.categoryId === category.id)
    .slice(0, 4)

  return (
    <main className="public-site" dir={dir}>
      <PublicHeader activeTo="/categories" brand={copy.brand} languageLabel={copy.languageLabel} login={copy.login} nav={copy.nav} searchLabel={copy.searchLabel} subtitle={copy.subtitle} themeLabel={copy.themeLabel} />

      <section className="category-detail-hero islamic-soft-pattern">
        <div className="public-container category-detail-hero__inner">
          <span>{detail.breadcrumb}</span>
          <div className="category-detail-head">
            <div className="category-detail-copy">
              <div className="category-detail-badge">
                <Icon size={26} />
                <strong>{category.title}</strong>
              </div>
              <h1>{category.title}</h1>
              <p>{category.text}</p>
            </div>
            <div className="category-detail-stats">
              <div><GraduationCap size={18} /><strong>{category.courses}</strong><span>{detail.courses}</span></div>
              <div><PlayCircle size={18} /><strong>{category.lessons}</strong><span>{detail.lessons}</span></div>
              <div><BookOpen size={18} /><strong>{category.books}</strong><span>{detail.books}</span></div>
              <div><UsersRound size={18} /><strong>{Math.max(12, Math.round(category.courses / 3))}</strong><span>{detail.scholars}</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="public-container category-detail-layout">
        <div className="category-detail-main">
          <div className="category-detail-panel">
            <h2>{detail.topCourses}</h2>
            <div className="category-detail-course-list">
              {(relatedCourses.length ? relatedCourses : archive.courses.map((course, index) => ({ course, index })).slice(0, 4)).map(({ course, index }) => (
                <article key={index}>
                  <div className="category-detail-course-icon"><BrandMark /></div>
                  <div>
                    <h3>{course.title}</h3>
                    <p>{`${course.teacher} · ${course.lessons}`}</p>
                  </div>
                  <Link to={`/courses/${index + 1}`}>{detail.open}</Link>
                </article>
              ))}
            </div>
          </div>
        </div>

        <aside className="category-detail-side-panel">
          <h2>{detail.related}</h2>
          <Link to="/courses">{detail.viewAll}</Link>
          <Link to="/library">{detail.books}</Link>
          <Link to="/scholars">{detail.scholars}</Link>
          <Link to="/fatwa">{language === 'ar' ? 'فتاوى مرتبطة' : 'Related fatwas'}</Link>
        </aside>
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
