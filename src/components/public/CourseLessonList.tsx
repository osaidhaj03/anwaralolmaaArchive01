import { CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'

type LessonRow = {
  duration: string
  locked: boolean
  title: string
}

type CourseLessonListProps = {
  lessons: LessonRow[]
  openTo?: string
  teacher: string
}

export function CourseLessonList({ lessons, openTo, teacher }: CourseLessonListProps) {
  return (
    <div className="lesson-list">
      {lessons.map((lesson, lessonIndex) => {
        const content = (
          <>
            <span>{lesson.locked ? lessonIndex + 1 : <CheckCircle2 size={18} />}</span>
            <div>
              <h3>{lesson.title}</h3>
              <p>{teacher}</p>
            </div>
            <small>{lesson.duration}</small>
          </>
        )

        return openTo
          ? <Link className="lesson-list__link" key={lesson.title} to={openTo}>{content}</Link>
          : <article key={lesson.title}>{content}</article>
      })}
    </div>
  )
}
