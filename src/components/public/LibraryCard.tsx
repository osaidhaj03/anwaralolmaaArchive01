import { BookOpen, Download, Eye } from 'lucide-react'
import { Link } from 'react-router-dom'

type LibraryCardProps = {
  downloadLabel: string
  href: string
  item: {
    author: string
    category: string
    downloads: string
    pages: string
    title: string
    tone: string
    type: string
    views: string
  }
  readLabel: string
}

export function LibraryCard({ downloadLabel, href, item, readLabel }: LibraryCardProps) {
  return (
    <article className="library-card">
      <div className={`library-book-cover tone-${item.tone}`}><BookOpen size={34} /><span>{item.type}</span></div>
      <div className="library-card__body">
        <small>{item.category}</small>
        <h2>{item.title}</h2>
        <p>{item.author}</p>
        <div className="library-meta">
          <span>{item.pages} p</span>
          <span><Download size={15} />{item.downloads}</span>
          <span><Eye size={15} />{item.views}</span>
        </div>
        <div className="library-card__actions">
          <Link to={href}>{readLabel}</Link>
          <Link to={href}>{downloadLabel}</Link>
        </div>
      </div>
    </article>
  )
}
