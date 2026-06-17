import { CourseCard } from './CourseCard'
import type { CourseItem } from '../../data/public/pageTypes'

type CategoryCourseItem = {
  course: CourseItem
  index: number
}

type CategoryDetailCoursesProps = {
  courses: CategoryCourseItem[]
  openLabel?: string // Keep optional to prevent strict compilation errors if caller passes it
  title: string
}

export function CategoryDetailCourses({ courses, title }: CategoryDetailCoursesProps) {
  return (
    <div className="category-detail-panel">
      <h2>{title}</h2>
      <div className="public-course-grid">
        {courses.map(({ course, index }) => (
          <CourseCard course={course} href={`/courses/${index + 1}`} key={course.title} />
        ))}
      </div>
    </div>
  )
}
