import { BookOpen, GraduationCap } from 'lucide-react'
import { Link } from 'react-router-dom'

type ScholarCardProps = {
  aboutTo: string
  scholar: {
    country: string
    courses: number
    field: string
    image: string
    lessons: number
    name: string
    title: string
  }
}

export function ScholarCard({ aboutTo, scholar }: ScholarCardProps) {
  return (
    <Link className="public-scholar-card" to={aboutTo} style={{ textDecoration: 'none', color: 'inherit' }}>
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
        </div>
      </div>
    </Link>
  )
}

