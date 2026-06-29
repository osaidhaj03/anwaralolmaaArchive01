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
  onImportExcel: () => void
}

export function AdminCourseLessonsHero({ BackIcon, addLabel, backLabel, copy, course, onAddLesson, onImportExcel }: AdminCourseLessonsHeroProps) {
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
        
        <button
          onClick={onImportExcel}
          type="button"
          style={{
            background: 'transparent',
            border: '1.5px solid var(--color-gold, #c5a880)',
            color: 'var(--color-gold, #c5a880)',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '14px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s',
          }}
        >
          {copy.importExcel || 'Import Excel'}
        </button>

        <button className="gold-button" onClick={onAddLesson} type="button">
          <Plus size={17} />
          {addLabel}
        </button>
      </div>
    </section>
  )
}
