import { Eye, HelpCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

type FatwaCardProps = {
  fatwa: {
    category: string
    date: string
    duration: string
    scholar: string
    title: string
    tone: string
    views: string
  }
  href: string
}

export function FatwaCard({ fatwa, href }: FatwaCardProps) {
  return (
    <Link className="fatwa-card" to={href} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className={`fatwa-thumb tone-${fatwa.tone}`}>
        <HelpCircle size={30} />
        <span>{fatwa.duration}</span>
      </div>
      <div className="fatwa-card__body">
        <small>{fatwa.category}</small>
        <h2>{fatwa.title}</h2>
        <p>{fatwa.scholar}</p>
        <div>
          <span><Eye size={15} />{fatwa.views}</span>
          <span>{fatwa.date}</span>
        </div>
      </div>
    </Link>
  )
}

