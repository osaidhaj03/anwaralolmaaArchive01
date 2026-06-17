import type { LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

type CourseMaterial = {
  icon: LucideIcon
  meta: string
  title: string
}

type CourseMaterialsCardProps = {
  materials: CourseMaterial[]
  openLabel: string
  title: string
}

export function CourseMaterialsCard({ materials, openLabel, title }: CourseMaterialsCardProps) {
  return (
    <div className="course-tabs-card">
      <h3 className="materials-title">{title}</h3>
      <div className="course-resource-list">
        {materials.map(({ icon: Icon, meta, title: materialTitle }) => (
          <article key={materialTitle}>
            <span>
              <Icon size={18} />
            </span>
            <div>
              <strong>{materialTitle}</strong>
              <small>{meta}</small>
            </div>
            <Link to="/login">{openLabel}</Link>
          </article>
        ))}
      </div>
    </div>
  )
}
