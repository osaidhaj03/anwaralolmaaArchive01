/* eslint-disable react-refresh/only-export-components */
import {
  BookOpen,
  Clock,
  GraduationCap,
  Grid2X2,
  Home,
  LibraryBig,
  MessageCircleQuestion,
  Search,
  Star,
  UserRound,
  UsersRound,
  type LucideIcon,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { BrandMark } from '../../components/AdminIcons'
import { PublicHeader } from '../../components/PublicHeader'
import { useLanguage, type Language } from '../../context/LanguageContext'

type CourseItem = {
  title: string
  teacher: string
  category: string
  level: string
  lessons: string
  hours: string
  students: string
  rating: string
  progress: number
  tone: string
}

type ViewMode = 'grid' | 'list'

type CourseFilters = {
  category: string
  level: string
  status: string
  teacher: string
}

type CoursesCopy = {
  brand: string
  subtitle: string
  nav: Array<{ label: string; to: string; icon: LucideIcon }>
  searchLabel: string
  themeLabel: string
  languageLabel: string
  login: string
  breadcrumb: string
  title: string
  description: string
  searchPlaceholder: string
  all: string
  active: string
  completed: string
  empty: string
  stats: Array<{ value: string; label: string; icon: LucideIcon }>
  filtersTitle: string
  categoryFilter: string
  levelFilter: string
  statusFilter: string
  teacherFilter: string
  apply: string
  reset: string
  featured: string
  about: string
  content: string
  details: string
  showing: string
  newsletterTitle: string
  newsletterText: string
  newsletterPlaceholder: string
  newsletterButton: string
  quickLinks: string
  footerText: string
  courses: CourseItem[]
}

export const coursesCopy: Record<Language, CoursesCopy> = {
  ar: {
    brand: 'أنوار العلماء',
    subtitle: 'الأرشيف العلمي',
    nav: [
      { label: 'الرئيسية', to: '/', icon: Home },
      { label: 'الأقسام', to: '/#categories', icon: LibraryBig },
      { label: 'الدورات', to: '/courses', icon: GraduationCap },
      { label: 'المشايخ', to: '/scholars', icon: UsersRound },
      { label: 'الفتاوى', to: '/fatwa', icon: MessageCircleQuestion },
      { label: 'المكتبة', to: '/library', icon: BookOpen },
    ],
    searchLabel: 'بحث',
    themeLabel: 'الوضع الليلي',
    languageLabel: 'English',
    login: 'تسجيل الدخول',
    breadcrumb: 'الرئيسية / الدورات',
    title: 'الدورات',
    description: 'مجموعة من الدورات العلمية المتخصصة في الفقه وأصوله وفروعه على منهج أهل السنة والجماعة.',
    searchPlaceholder: 'ابحث عن دورة...',
    all: 'الكل',
    active: 'جارية',
    completed: 'مكتملة',
    empty: 'لا توجد دورات مطابقة',
    stats: [
      { value: '332', label: 'دورة', icon: Grid2X2 },
      { value: '10,842', label: 'درس', icon: BookOpen },
      { value: '78', label: 'محاضر', icon: UserRound },
      { value: '5,412', label: 'طالب', icon: UsersRound },
    ],
    filtersTitle: 'تصفية النتائج',
    categoryFilter: 'القسم العلمي',
    levelFilter: 'المستوى العلمي',
    statusFilter: 'حالة الدورة',
    teacherFilter: 'المحاضر',
    apply: 'تطبيق الفلتر',
    reset: 'إعادة تعيين',
    featured: 'الأكثر متابعة',
    about: 'نبذة عن الدورة',
    content: 'محتوى الدورة',
    details: 'عرض تفاصيل الدورة',
    showing: 'عرض 1 - 8 من أصل 332 دورة',
    newsletterTitle: 'اشترك في النشرة البريدية',
    newsletterText: 'ليصلك كل جديد من الدورات والدروس والمحاضرات.',
    newsletterPlaceholder: 'أدخل بريدك الإلكتروني',
    newsletterButton: 'اشترك الآن',
    quickLinks: 'روابط سريعة',
    footerText: 'منهج أهل السنة فقهاً وعقيدة وسلوكاً.',
    courses: [
      { title: 'شرح منهج السالكين في الفقه', teacher: 'د. صالح بن فوزان الفوزان', category: 'الفقه', level: 'متقدم', lessons: '245 درس', hours: '86 ساعة', students: '12,542', rating: '4.8', progress: 85, tone: 'green' },
      { title: 'فقه العبادات على مذهب السلف', teacher: 'د. محمد بن صالح العثيمين', category: 'الفقه', level: 'متوسط', lessons: '186 درس', hours: '60 ساعة', students: '8,421', rating: '4.7', progress: 60, tone: 'gold' },
      { title: 'الجامع في الفقه الإسلامي', teacher: 'د. سعد بن ناصر الشثري', category: 'الفقه', level: 'متقدم', lessons: '312 درس', hours: '96 ساعة', students: '15,231', rating: '4.9', progress: 72, tone: 'navy' },
      { title: 'أصول الفقه وقواعده', teacher: 'د. عبدالعزيز بن باز', category: 'أصول الفقه', level: 'متوسط', lessons: '156 درس', hours: '45 ساعة', students: '6,321', rating: '4.6', progress: 30, tone: 'cream' },
      { title: 'القواعد الفقهية وتطبيقاتها', teacher: 'د. عبدالرحمن السعدي', category: 'الفقه', level: 'متوسط', lessons: '98 درس', hours: '38 ساعة', students: '4,256', rating: '4.5', progress: 65, tone: 'brown' },
      { title: 'المعاملات المالية في الفقه الإسلامي', teacher: 'د. محمد المختار الشنقيطي', category: 'المعاملات', level: 'متقدم', lessons: '210 درس', hours: '72 ساعة', students: '9,870', rating: '4.8', progress: 68, tone: 'green' },
      { title: 'فقه العبادات على المذاهب الأربعة', teacher: 'د. عبدالمحسن العباد', category: 'العبادات', level: 'متقدم', lessons: '278 درس', hours: '92 ساعة', students: '11,624', rating: '4.7', progress: 80, tone: 'blue' },
      { title: 'الفتوى ضوابط وأحكام', teacher: 'د. صالح الفوزان', category: 'الفتوى', level: 'متوسط', lessons: '112 درس', hours: '32 ساعة', students: '5,420', rating: '4.4', progress: 40, tone: 'navy' },
    ],
  },
  en: {
    brand: 'Anwar Alolmaa',
    subtitle: 'Scholarly Archive',
    nav: [
      { label: 'Home', to: '/', icon: Home },
      { label: 'Categories', to: '/#categories', icon: LibraryBig },
      { label: 'Courses', to: '/courses', icon: GraduationCap },
      { label: 'Scholars', to: '/scholars', icon: UsersRound },
      { label: 'Fatwa', to: '/fatwa', icon: MessageCircleQuestion },
      { label: 'Library', to: '/library', icon: BookOpen },
    ],
    searchLabel: 'Search',
    themeLabel: 'Dark mode',
    languageLabel: 'العربية',
    login: 'Log in',
    breadcrumb: 'Home / Courses',
    title: 'Courses',
    description: 'Specialized scholarly courses in Islamic sciences, arranged for structured learning and review.',
    searchPlaceholder: 'Search for a course...',
    all: 'All',
    active: 'Active',
    completed: 'Completed',
    empty: 'No matching courses',
    stats: [
      { value: '332', label: 'Courses', icon: Grid2X2 },
      { value: '10,842', label: 'Lessons', icon: BookOpen },
      { value: '78', label: 'Lecturers', icon: UserRound },
      { value: '5,412', label: 'Students', icon: UsersRound },
    ],
    filtersTitle: 'Filter Results',
    categoryFilter: 'Scientific category',
    levelFilter: 'Level',
    statusFilter: 'Course status',
    teacherFilter: 'Lecturer',
    apply: 'Apply filters',
    reset: 'Reset',
    featured: 'Most followed',
    about: 'Course overview',
    content: 'Course content',
    details: 'View course details',
    showing: 'Showing 1 - 8 of 332 courses',
    newsletterTitle: 'Subscribe to the newsletter',
    newsletterText: 'Get the latest courses, lessons, and lectures.',
    newsletterPlaceholder: 'Enter your email',
    newsletterButton: 'Subscribe',
    quickLinks: 'Quick links',
    footerText: 'A Sunni learning archive for creed, worship, and conduct.',
    courses: [
      { title: 'Manhaj as-Salikin in Fiqh', teacher: 'Dr. Saleh Al-Fawzan', category: 'Fiqh', level: 'Advanced', lessons: '245 lessons', hours: '86 hours', students: '12,542', rating: '4.8', progress: 85, tone: 'green' },
      { title: 'Fiqh of Worship', teacher: 'Dr. Ibn Uthaymeen', category: 'Fiqh', level: 'Intermediate', lessons: '186 lessons', hours: '60 hours', students: '8,421', rating: '4.7', progress: 60, tone: 'gold' },
      { title: 'Comprehensive Islamic Fiqh', teacher: 'Dr. Saad Al-Shithri', category: 'Fiqh', level: 'Advanced', lessons: '312 lessons', hours: '96 hours', students: '15,231', rating: '4.9', progress: 72, tone: 'navy' },
      { title: 'Usul al-Fiqh and Maxims', teacher: 'Dr. Abdulaziz Ibn Baz', category: 'Usul', level: 'Intermediate', lessons: '156 lessons', hours: '45 hours', students: '6,321', rating: '4.6', progress: 30, tone: 'cream' },
      { title: 'Legal Maxims and Applications', teacher: 'Dr. Abdulrahman As-Saadi', category: 'Fiqh', level: 'Intermediate', lessons: '98 lessons', hours: '38 hours', students: '4,256', rating: '4.5', progress: 65, tone: 'brown' },
      { title: 'Financial Transactions in Fiqh', teacher: 'Dr. Muhammad Al-Shinqiti', category: 'Transactions', level: 'Advanced', lessons: '210 lessons', hours: '72 hours', students: '9,870', rating: '4.8', progress: 68, tone: 'green' },
      { title: 'Worship Across the Four Schools', teacher: 'Dr. Abdulmuhsin Al-Abbad', category: 'Worship', level: 'Advanced', lessons: '278 lessons', hours: '92 hours', students: '11,624', rating: '4.7', progress: 80, tone: 'blue' },
      { title: 'Fatwa: Rules and Etiquette', teacher: 'Dr. Saleh Al-Fawzan', category: 'Fatwa', level: 'Intermediate', lessons: '112 lessons', hours: '32 hours', students: '5,420', rating: '4.4', progress: 40, tone: 'navy' },
    ],
  },
}

export function CoursesPage() {
  const { dir, language } = useLanguage()
  const copy = coursesCopy[language]
  const [search, setSearch] = useState('')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [draftFilters, setDraftFilters] = useState<CourseFilters>({ category: '', level: '', status: '', teacher: '' })
  const [activeFilters, setActiveFilters] = useState<CourseFilters>(draftFilters)

  const categoryOptions = useMemo(() => unique(copy.courses.map((course) => course.category)), [copy.courses])
  const levelOptions = useMemo(() => unique(copy.courses.map((course) => course.level)), [copy.courses])
  const teacherOptions = useMemo(() => unique(copy.courses.map((course) => course.teacher)), [copy.courses])

  const filteredCourses = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()
    const filtered = copy.courses.filter((course) => {
      const courseStatus = getCourseStatus(course, language)
      const matchesSearch = [course.title, course.teacher, course.category, course.level].some((value) =>
        value.toLowerCase().includes(normalizedSearch),
      )

      return (
        (!normalizedSearch || matchesSearch) &&
        (!activeFilters.category || course.category === activeFilters.category) &&
        (!activeFilters.level || course.level === activeFilters.level) &&
        (!activeFilters.teacher || course.teacher === activeFilters.teacher) &&
        (!activeFilters.status || courseStatus === activeFilters.status)
      )
    })

    return filtered
  }, [activeFilters, copy.courses, language, search])

  const featured = filteredCourses[0] ?? copy.courses[0]
  const showingText =
    language === 'ar'
      ? `عرض ${filteredCourses.length ? 1 : 0} - ${filteredCourses.length} من أصل ${copy.courses.length} دورة`
      : `Showing ${filteredCourses.length ? 1 : 0} - ${filteredCourses.length} of ${copy.courses.length} courses`

  function updateDraftFilter(key: keyof CourseFilters, value: string) {
    setDraftFilters((current) => ({ ...current, [key]: value }))
  }

  function applyFilters() {
    setActiveFilters(draftFilters)
  }

  function resetFilters() {
    const emptyFilters = { category: '', level: '', status: '', teacher: '' }
    setDraftFilters(emptyFilters)
    setActiveFilters(emptyFilters)
    setSearch('')
  }

  return (
    <main className="public-site" dir={dir}>
      <PublicHeader activeTo="/courses" brand={copy.brand} languageLabel={copy.languageLabel} login={copy.login} nav={copy.nav} searchLabel={copy.searchLabel} subtitle={copy.subtitle} themeLabel={copy.themeLabel} />

      <section className="courses-hero islamic-soft-pattern">
        <div className="public-container courses-hero__inner">
          <span>{copy.breadcrumb}</span>
          <h1>{copy.title}</h1>
          <p>{copy.description}</p>
          <div className="courses-searchbar">
            <label>
              <Search size={20} />
              <input onChange={(event) => setSearch(event.target.value)} placeholder={copy.searchPlaceholder} value={search} />
            </label>
          </div>
          <div className="courses-stat-strip">
            {copy.stats.map(({ value, label, icon: Icon }) => (
              <div key={label}>
                <Icon size={22} />
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="public-container courses-layout">
        <aside className="courses-filter-card">
          <h2>{copy.filtersTitle}</h2>
          <FilterSelect label={copy.categoryFilter} onChange={(value) => updateDraftFilter('category', value)} options={categoryOptions} value={draftFilters.category} allLabel={copy.all} />
          <FilterSelect label={copy.levelFilter} onChange={(value) => updateDraftFilter('level', value)} options={levelOptions} value={draftFilters.level} allLabel={copy.all} />
          <FilterSelect label={copy.statusFilter} onChange={(value) => updateDraftFilter('status', value)} options={[copy.active, copy.completed]} value={draftFilters.status} allLabel={copy.all} />
          <FilterSelect label={copy.teacherFilter} onChange={(value) => updateDraftFilter('teacher', value)} options={teacherOptions} value={draftFilters.teacher} allLabel={copy.all} />
          <div className="courses-filter-actions">
            <button onClick={applyFilters} type="button">{copy.apply}</button>
            <button onClick={resetFilters} type="button">{copy.reset}</button>
          </div>
        </aside>

        <div className="courses-content">
          <div className="courses-content__header">
            <span>{showingText}</span>
            <div>
              <button className={viewMode === 'grid' ? 'is-active' : ''} onClick={() => setViewMode('grid')} type="button" aria-label="Grid view">
                <Grid2X2 size={18} />
              </button>
              <button className={viewMode === 'list' ? 'is-active' : ''} onClick={() => setViewMode('list')} type="button" aria-label="List view">
                <Grid2X2 size={18} />
              </button>
            </div>
          </div>

          <div className={`public-course-grid ${viewMode === 'list' ? 'is-list' : ''}`}>
            {filteredCourses.map((course) => {
              const courseIndex = copy.courses.findIndex((item) => item.title === course.title)
              return (
              <article className="public-course-card" key={course.title}>
                <div className={`public-course-cover tone-${course.tone}`}>
                  <span>{course.title}</span>
                  <small>{course.lessons}</small>
                </div>
                <div className="public-course-body">
                  <h3>{course.title}</h3>
                  <p>{course.teacher}</p>
                  <div className="public-course-meta">
                    <span>
                      <Clock size={15} />
                      {course.hours}
                    </span>
                    <span>
                      <UsersRound size={15} />
                      {course.students}
                    </span>
                    <span>
                      <Star size={15} />
                      {course.rating}
                    </span>
                  </div>
                  <div className="course-progress">
                    <span style={{ width: `${course.progress}%` }} />
                  </div>
                  <div className="public-course-footer">
                    <small>{course.level}</small>
                    <Link to={`/courses/${courseIndex + 1}`}>{copy.details}</Link>
                  </div>
                </div>
              </article>
              )
            })}
            {filteredCourses.length === 0 ? <p className="courses-empty">{copy.empty}</p> : null}
          </div>
        </div>

        <aside className="featured-course-card">
          <div className={`public-course-cover tone-${featured.tone}`}>
            <span>{featured.title}</span>
            <small>{copy.featured}</small>
          </div>
          <dl>
            <div>
              <dt>{copy.about}</dt>
              <dd>{featured.teacher}</dd>
            </div>
            <div>
              <dt>{copy.content}</dt>
              <dd>{featured.lessons}</dd>
            </div>
            <div>
              <dt>{copy.levelFilter}</dt>
              <dd>{featured.level}</dd>
            </div>
          </dl>
          <Link to={`/courses/${Math.max(1, copy.courses.findIndex((item) => item.title === featured.title) + 1)}`}>{copy.details}</Link>
        </aside>
      </section>

      <footer className="public-footer">
        <div className="public-container footer-grid">
          <div className="newsletter-box">
            <h3>{copy.newsletterTitle}</h3>
            <p>{copy.newsletterText}</p>
            <div>
              <input placeholder={copy.newsletterPlaceholder} />
              <button type="button">{copy.newsletterButton}</button>
            </div>
          </div>
          <div>
            <h3>{copy.quickLinks}</h3>
            <Link to="/courses">{copy.title}</Link>
            <Link to="/#categories">{copy.nav[1].label}</Link>
            <Link to="/scholars">{copy.nav[3].label}</Link>
            <Link to="/fatwa">{copy.nav[4].label}</Link>
          </div>
          <div>
            <h3>{copy.brand}</h3>
            <p>{copy.footerText}</p>
            <BrandMark className="footer-mark" />
          </div>
        </div>
      </footer>
    </main>
  )
}

function FilterSelect({
  allLabel,
  label,
  onChange,
  options,
  value,
}: {
  allLabel: string
  label: string
  onChange: (value: string) => void
  options: string[]
  value: string
}) {
  return (
    <label>
      <span>{label}</span>
      <select onChange={(event) => onChange(event.target.value)} value={value}>
        <option value="">{allLabel}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  )
}

function unique(values: string[]) {
  return Array.from(new Set(values))
}

function getCourseStatus(course: CourseItem, language: Language) {
  if (language === 'ar') {
    return course.progress >= 80 ? 'مكتملة' : 'جارية'
  }
  return course.progress >= 80 ? 'Completed' : 'Active'
}
