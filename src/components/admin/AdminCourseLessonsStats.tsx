import { BookOpen, CheckCircle2, Clock3, PlaySquare } from 'lucide-react'
import type { AdminTableRow } from '../../data/adminSeed'

type AdminCourseLessonsStatsProps = {
  copy: Record<string, string>
  course: AdminTableRow
  lessonsCount: number
}

export function AdminCourseLessonsStats({ copy, course, lessonsCount }: AdminCourseLessonsStatsProps) {
  return (
    <section className="stats-grid stats-grid--compact">
      <article className="stat-card tone-blue">
        <span className="stat-icon">
          <PlaySquare size={22} />
        </span>
        <div>
          <span>{copy.lessonCount}</span>
          <strong>{lessonsCount}</strong>
          <small>{copy.lessonCountHint}</small>
        </div>
      </article>
      <article className="stat-card tone-green">
        <span className="stat-icon">
          <CheckCircle2 size={22} />
        </span>
        <div>
          <span>{copy.status}</span>
          <strong>{course.status}</strong>
          <small>{copy.statusHint}</small>
        </div>
      </article>
      <article className="stat-card tone-amber">
        <span className="stat-icon">
          <Clock3 size={22} />
        </span>
        <div>
          <span>{copy.level}</span>
          <strong>{course.level}</strong>
          <small>{copy.levelHint}</small>
        </div>
      </article>
      <article className="stat-card tone-violet">
        <span className="stat-icon">
          <BookOpen size={22} />
        </span>
        <div>
          <span>{copy.category}</span>
          <strong>{course.category}</strong>
          <small>{copy.categoryHint}</small>
        </div>
      </article>
    </section>
  )
}
