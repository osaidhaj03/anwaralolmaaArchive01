import { Navigate, useParams } from 'react-router-dom'
import { CategoryDetailCourses } from '../../components/public/CategoryDetailCourses'
import { CategoryDetailHero } from '../../components/public/CategoryDetailHero'
import { PublicPageFooter, PublicPageHeader } from '../../components/public/PublicPageChrome'
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
  uz: {
    breadcrumb: 'Bosh sahifa / Kategoriyalar / Tafsilotlar',
    courses: 'Kurslar',
    lessons: 'Darslar',
    books: 'Kitoblar',
    scholars: 'Ustozlar',
    topCourses: 'Eng yaxshi kurslar',
    related: 'Tegishli kontent',
    open: 'Kursni ochish',
    viewAll: 'Kategoriyani to‘liq ko‘rish',
  },
  uzCyr: {
    breadcrumb: 'Бош саҳифа / Категориялар / Тафсилотлар',
    courses: 'Курслар',
    lessons: 'Дарслар',
    books: 'Китоблар',
    scholars: 'Устозлар',
    topCourses: 'Энг яхши курслар',
    related: 'Тегишли контент',
    open: 'Курсни очиш',
    viewAll: 'Категорияни тўлиқ кўриш',
  },
  ru: {
    breadcrumb: 'Главная / Категории / Детали категории',
    courses: 'Курсы',
    lessons: 'Уроки',
    books: 'Книги',
    scholars: 'Ученые',
    topCourses: 'Популярные курсы',
    related: 'Похожие материалы',
    open: 'Открыть курс',
    viewAll: 'Все материалы категории',
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

  const relatedCourses = archive.courses
    .map((course, index) => ({ course, index }))
    .filter(({ course }) => course.categoryId === category.id)
    .slice(0, 4)
  const featuredCourses = relatedCourses.length ? relatedCourses : archive.courses.map((course, index) => ({ course, index })).slice(0, 4)

  return (
    <main className="public-site" dir={dir}>
      <PublicPageHeader activeTo="/categories" copy={copy} />

      <CategoryDetailHero breadcrumb={detail.breadcrumb} category={category} />

      <section className="public-container category-detail-layout">
        <div className="category-detail-main">
          <CategoryDetailCourses courses={featuredCourses} title={detail.topCourses} />
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
