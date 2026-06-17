import { Grid2X2 } from 'lucide-react'
import { CourseCard } from './CourseCard'
import type { CourseItem } from '../../data/public/pageTypes'

export type CourseViewMode = 'grid' | 'list'

type CoursesResultsProps = {
  allCourses: CourseItem[]
  courses: CourseItem[]
  emptyLabel: string
  showingText: string
  viewMode: CourseViewMode
  onViewModeChange: (mode: CourseViewMode) => void
}

export function CoursesResults({ allCourses, courses, emptyLabel, onViewModeChange, showingText, viewMode }: CoursesResultsProps) {
  return (
    <div className="courses-content">
      <div className="courses-content__header">
        <span>{showingText}</span>
        <div>
          <button className={viewMode === 'grid' ? 'is-active' : ''} onClick={() => onViewModeChange('grid')} type="button" aria-label="Grid view">
            <Grid2X2 size={18} />
          </button>
          <button className={viewMode === 'list' ? 'is-active' : ''} onClick={() => onViewModeChange('list')} type="button" aria-label="List view">
            <Grid2X2 size={18} />
          </button>
        </div>
      </div>

      <div className={`public-course-grid ${viewMode === 'list' ? 'is-list' : ''}`}>
        {courses.map((course) => {
          const courseIndex = allCourses.findIndex((item) => item.title === course.title)
          return <CourseCard course={course} href={`/courses/${courseIndex + 1}`} key={course.title} />
        })}
        {courses.length === 0 ? <p className="courses-empty">{emptyLabel}</p> : null}
      </div>
    </div>
  )
}
