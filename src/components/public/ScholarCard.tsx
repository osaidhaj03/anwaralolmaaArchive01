import { BookOpen, GraduationCap, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'

type ScholarCardProps = {
  aboutLabel: string
  scholar: {
    country: string
    courses: number
    field: string
    image: string
    lessons: number
    name: string
    title: string
  }
  aboutTo: string
}

export function ScholarCard({ aboutLabel, aboutTo, scholar }: ScholarCardProps) {
  return (
    <article className="public-scholar-card">
      <div className="public-scholar-photo">
        <img alt={scholar.name} src={scholar.image} />
      </div>
      <div className="public-scholar-body">
        <small>{scholar.field}</small>
        <h2>{scholar.name}</h2>
        <p>{scholar.title}</p>
        <div className="public-scholar-meta">
          <span><GraduationCap size={15} />{scholar.courses}</span>
          <span><BookOpen size={15} />{scholar.lessons}</span>
          <span><MapPin size={15} />{scholar.country}</span>
        </div>
        <div className="public-scholar-actions">
          <Link to={aboutTo}>{aboutLabel}</Link>
        </div>
      </div>
    </article>
  )
}
