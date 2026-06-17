import { Link } from 'react-router-dom'
import type { CourseItem } from '../../data/public/pageTypes'

type FeaturedCourseCardProps = {
  aboutLabel: string
  allCourses: CourseItem[]
  contentLabel: string
  course: CourseItem
  featuredLabel: string
  levelLabel: string
}

export function FeaturedCourseCard({ aboutLabel, allCourses, contentLabel, course, featuredLabel, levelLabel }: FeaturedCourseCardProps) {
  const courseIndex = Math.max(1, allCourses.findIndex((item) => item.title === course.title) + 1)

  return (
    <Link className="featured-course-card" to={`/courses/${courseIndex}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className={`public-course-cover tone-${course.tone}`}>
        <img alt="" src={course.thumbnail} />
        <span>{course.title}</span>
        <small>{featuredLabel}</small>
      </div>
      <dl>
        <div>
          <dt>{aboutLabel}</dt>
          <dd>{course.teacher}</dd>
        </div>
        <div>
          <dt>{contentLabel}</dt>
          <dd>{course.lessons}</dd>
        </div>
        <div>
          <dt>{levelLabel}</dt>
          <dd>{course.level}</dd>
        </div>
      </dl>
    </Link>
  )
}

