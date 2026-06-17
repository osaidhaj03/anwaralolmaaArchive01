import { Link } from 'react-router-dom'
import { BrandMark } from '../AdminIcons'

type CategoryCourse = {
  lessons: string
  teacher: string
  title: string
}

type CategoryCourseItem = {
  course: CategoryCourse
  index: number
}

type CategoryDetailCoursesProps = {
  courses: CategoryCourseItem[]
  openLabel: string
  title: string
}

export function CategoryDetailCourses({ courses, openLabel, title }: CategoryDetailCoursesProps) {
  return (
    <div className="category-detail-panel">
      <h2>{title}</h2>
      <div className="category-detail-course-list">
        {courses.map(({ course, index }) => (
          <article key={index}>
            <div className="category-detail-course-icon">
              <BrandMark />
            </div>
            <div>
              <h3>{course.title}</h3>
              <p>{`${course.teacher} · ${course.lessons}`}</p>
            </div>
            <Link to={`/courses/${index + 1}`}>{openLabel}</Link>
          </article>
        ))}
      </div>
    </div>
  )
}
