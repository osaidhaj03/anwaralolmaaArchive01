import { useMemo, useState } from 'react'
import { PublicFooter } from '../../components/PublicFooter'
import { PublicHeader } from '../../components/PublicHeader'
import { CoursesFilterCard, type CourseFilters } from '../../components/public/CoursesFilterCard'
import { CoursesHeroTools } from '../../components/public/CoursesHeroTools'
import { CoursesResults, type CourseViewMode } from '../../components/public/CoursesResults'
import { FeaturedCourseCard } from '../../components/public/FeaturedCourseCard'
import { PublicPageHero } from '../../components/public/PublicPageHero'
import { useArchiveStats, useLocalizedArchive } from '../../context/ArchiveDataContext'
import { useLanguage, type Language } from '../../context/LanguageContext'
import { coursesCopy } from '../../data/public/courses'
import type { CourseItem } from '../../data/public/pageTypes'

export function CoursesPage() {
  const { dir, language } = useLanguage()
  const copy = coursesCopy[language]
  const archive = useLocalizedArchive(language)
  const stats = useArchiveStats()
  const [search, setSearch] = useState('')
  const [viewMode, setViewMode] = useState<CourseViewMode>('grid')
  const [draftFilters, setDraftFilters] = useState<CourseFilters>({ category: '', level: '', status: '', teacher: '' })
  const [activeFilters, setActiveFilters] = useState<CourseFilters>(draftFilters)
  const [showFilters, setShowFilters] = useState(false)

  const categoryOptions = useMemo(() => unique(archive.courses.map((course) => course.category)), [archive.courses])
  const levelOptions = useMemo(() => unique(archive.courses.map((course) => course.level)), [archive.courses])
  const teacherOptions = useMemo(() => unique(archive.courses.map((course) => course.teacher)), [archive.courses])

  const filteredCourses = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()
    const filtered = archive.courses.filter((course) => {
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
  }, [activeFilters, archive.courses, language, search])

  const featured = filteredCourses[0] ?? archive.courses[0]
  const normalizedStats = copy.stats.map((item) => ({
    ...item,
    value: item.label === 'درس' || item.label === 'Lessons' ? new Intl.NumberFormat('en-US').format(stats.public.lessons) : String(stats.public.courses),
  }))
  const showingText =
    language === 'ar'
      ? `عرض ${filteredCourses.length ? 1 : 0} - ${filteredCourses.length} من أصل ${archive.courses.length} دورة`
      : `Showing ${filteredCourses.length ? 1 : 0} - ${filteredCourses.length} of ${archive.courses.length} courses`

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
        <CoursesHeroTools
          onSearchChange={setSearch}
          search={search}
          searchPlaceholder={copy.searchPlaceholder}
          stats={normalizedStats}
          showFilters={showFilters}
          onToggleFilters={() => setShowFilters(!showFilters)}
        />
        {showFilters && (
          <CoursesFilterCard
            layout="horizontal"
            allLabel={copy.all}
            applyLabel={copy.apply}
            categoryLabel={copy.categoryFilter}
            categoryOptions={categoryOptions}
            filters={draftFilters}
            levelLabel={copy.levelFilter}
            levelOptions={levelOptions}
            onApply={applyFilters}
            onReset={resetFilters}
            onUpdate={updateDraftFilter}
            resetLabel={copy.reset}
            statusLabel={copy.statusFilter}
            statusOptions={[copy.active, copy.completed]}
            teacherLabel={copy.teacherFilter}
            teacherOptions={teacherOptions}
            title={copy.filtersTitle}
          />
        )}
      </PublicPageHero>

      <section className="public-container courses-layout">
        <CoursesResults
          allCourses={archive.courses}
          courses={filteredCourses}
          emptyLabel={copy.empty}
          onViewModeChange={setViewMode}
          showingText={showingText}
          viewMode={viewMode}
        />

        <FeaturedCourseCard
          aboutLabel={copy.about}
          allCourses={archive.courses}
          contentLabel={copy.content}
          course={featured}
          featuredLabel={copy.featured}
          levelLabel={copy.levelFilter}
        />
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
