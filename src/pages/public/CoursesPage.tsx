import {
  Grid2X2,
  Search,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { PublicFooter } from '../../components/PublicFooter'
import { PublicHeader } from '../../components/PublicHeader'
import { CourseCard } from '../../components/public/CourseCard'
import { PublicFilterSelect } from '../../components/public/PublicFilterSelect'
import { PublicPageHero } from '../../components/public/PublicPageHero'
import { PublicStatStrip } from '../../components/public/PublicStatStrip'
import { useLanguage, type Language } from '../../context/LanguageContext'
import { coursesCopy } from '../../data/public/courses'
import type { CourseItem } from '../../data/public/pageTypes'

type ViewMode = 'grid' | 'list'

type CourseFilters = {
  category: string
  level: string
  status: string
  teacher: string
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

      <PublicPageHero breadcrumb={copy.breadcrumb} className="courses-hero" description={copy.description} title={copy.title}>
          <div className="courses-searchbar">
            <label>
              <Search size={20} />
              <input onChange={(event) => setSearch(event.target.value)} placeholder={copy.searchPlaceholder} value={search} />
            </label>
          </div>
          <PublicStatStrip className="courses-stat-strip" iconSize={22} items={copy.stats} />
      </PublicPageHero>

      <section className="public-container courses-layout">
        <aside className="courses-filter-card">
          <h2>{copy.filtersTitle}</h2>
          <PublicFilterSelect label={copy.categoryFilter} onChange={(value) => updateDraftFilter('category', value)} options={categoryOptions} value={draftFilters.category} allLabel={copy.all} />
          <PublicFilterSelect label={copy.levelFilter} onChange={(value) => updateDraftFilter('level', value)} options={levelOptions} value={draftFilters.level} allLabel={copy.all} />
          <PublicFilterSelect label={copy.statusFilter} onChange={(value) => updateDraftFilter('status', value)} options={[copy.active, copy.completed]} value={draftFilters.status} allLabel={copy.all} />
          <PublicFilterSelect label={copy.teacherFilter} onChange={(value) => updateDraftFilter('teacher', value)} options={teacherOptions} value={draftFilters.teacher} allLabel={copy.all} />
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
              return <CourseCard course={course} detailsLabel={copy.details} href={`/courses/${courseIndex + 1}`} key={course.title} />
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

      <PublicFooter
        brand={copy.brand}
        footerText={copy.footerText}
        newsletterButton={copy.newsletterButton}
        newsletterPlaceholder={copy.newsletterPlaceholder}
        newsletterText={copy.newsletterText}
        newsletterTitle={copy.newsletterTitle}
        quickLinks={copy.quickLinks}
        quickLinksItems={[
          { label: copy.title, to: '/courses' },
          { label: copy.nav[1].label, to: '/categories' },
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

function getCourseStatus(course: CourseItem, language: Language) {
  if (language === 'ar') {
    return course.progress >= 80 ? 'مكتملة' : 'جارية'
  }
  return course.progress >= 80 ? 'Completed' : 'Active'
}
