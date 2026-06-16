import { Clock, Star, UsersRound } from 'lucide-react'
import { Link } from 'react-router-dom'

type CourseCardProps = {
  course: {
    hours: string
    lessons: string
    level: string
    progress: number
    rating: string
    students: string
    teacher: string
    title: string
    tone: string
  }
  detailsLabel: string
  href: string
}

export function CourseCard({ course, detailsLabel, href }: CourseCardProps) {
  return (
    <article className="public-course-card">
      <div className={`public-course-cover tone-${course.tone}`}>
        <span>{course.title}</span>
        <small>{course.lessons}</small>
      </div>
      <div className="public-course-body">
        <h3>{course.title}</h3>
        <p>{course.teacher}</p>
        <div className="public-course-meta">
          <span><Clock size={15} />{course.hours}</span>
          <span><UsersRound size={15} />{course.students}</span>
          <span><Star size={15} />{course.rating}</span>
        </div>
        <div className="course-progress">
          <span style={{ width: `${course.progress}%` }} />
        </div>
        <div className="public-course-footer">
          <small>{course.level}</small>
          <Link to={href}>{detailsLabel}</Link>
        </div>
      </div>
    </article>
  )
}
