import { Eye, PlayCircle, Layers } from 'lucide-react'
import { Link } from 'react-router-dom'

type LectureCardProps = {
  lecture: {
    id: string
    title: string
    scholar: string
    category: string
    views: string
    date: string
    tone: string
    thumbnail: string
    parts: any[]
  }
  href: string
  partLabel: string
  partsLabel: string
}

export function LectureCard({ lecture, href, partLabel, partsLabel }: LectureCardProps) {
  const partsCount = lecture.parts.length
  const partsText = partsCount === 1 ? `1 ${partLabel}` : `${partsCount} ${partsLabel}`

  return (
    <Link className="fatwa-card" to={href} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className={`fatwa-thumb tone-${lecture.tone}`}>
        <img alt="" src={lecture.thumbnail} />
        <PlayCircle size={30} />
        <span className="lecture-parts-badge" style={{
          position: 'absolute',
          bottom: '8px',
          right: '8px',
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          color: '#fff',
          padding: '2px 8px',
          borderRadius: '4px',
          fontSize: '11px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          <Layers size={11} />
          {partsText}
        </span>
      </div>
      <div className="fatwa-card__body">
        <small>{lecture.category}</small>
        <h2>{lecture.title}</h2>
        <p>{lecture.scholar}</p>
        <div>
          <span><Eye size={15} />{lecture.views}</span>
          <span>{lecture.date}</span>
        </div>
      </div>
    </Link>
  )
}
