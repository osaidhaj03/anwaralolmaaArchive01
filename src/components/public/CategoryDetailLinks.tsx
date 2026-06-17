import { Link } from 'react-router-dom'

type CategoryDetailLinksProps = {
  booksLabel: string
  fatwaLabel: string
  relatedLabel: string
  scholarsLabel: string
  viewAllLabel: string
}

export function CategoryDetailLinks({ booksLabel, fatwaLabel, relatedLabel, scholarsLabel, viewAllLabel }: CategoryDetailLinksProps) {
  return (
    <aside className="category-detail-side-panel">
      <h2>{relatedLabel}</h2>
      <Link to="/courses">{viewAllLabel}</Link>
      <Link to="/library">{booksLabel}</Link>
      <Link to="/scholars">{scholarsLabel}</Link>
      <Link to="/fatwa">{fatwaLabel}</Link>
    </aside>
  )
}
