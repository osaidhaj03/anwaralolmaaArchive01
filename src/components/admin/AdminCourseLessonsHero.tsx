import { Link } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'
import { Plus } from 'lucide-react'
import type { AdminTableRow } from '../../data/adminSeed'

type AdminCourseLessonsHeroProps = {
  BackIcon: LucideIcon
  addLabel: string
  backLabel: string
  copy: Record<string, string>
  course: AdminTableRow
  onAddLesson: () => void
}

export function AdminCourseLessonsHero({ BackIcon, addLabel, backLabel, copy, course, onAddLesson }: AdminCourseLessonsHeroProps) {
  return (
    <section className="management-hero course-detail-hero">
      <div>
        <span>{copy.parent}</span>
        <h2>{course.title}</h2>
        <p>
          {copy.description} {course.teacher} · {course.category}
        </p>
      </div>
      <div className="management-hero__actions">
        <Link className="ghost-link" to="/admin/courses">
          <BackIcon size={17} />
          {backLabel}
        </Link>
        <button className="gold-button" onClick={onAddLesson} type="button">
          <Plus size={17} />
          {addLabel}
        </button>
      </div>
    </section>
  )
}
