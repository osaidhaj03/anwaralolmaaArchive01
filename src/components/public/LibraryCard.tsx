import { BookOpen, Eye } from 'lucide-react'
import { Link } from 'react-router-dom'

type LibraryCardProps = {
  href: string
  item: {
    author: string
    category: string
    pages: string
    title: string
    tone: string
    type: string
    views: string
  }
}

export function LibraryCard({ href, item }: LibraryCardProps) {
  return (
    <Link className="library-card" to={href} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className={`library-book-cover tone-${item.tone}`}><BookOpen size={34} /><span>{item.type}</span></div>
      <div className="library-card__body">
        <small>{item.category}</small>
        <h2>{item.title}</h2>
        <p>{item.author}</p>
        <div className="library-meta">
          <span>{item.pages} p</span>
          <span><Eye size={15} />{item.views}</span>
        </div>
      </div>
    </Link>
  )
}

