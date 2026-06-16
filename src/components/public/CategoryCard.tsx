import type { LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

type CategoryCardProps = {
  category: {
    books: number
    courses: number
    icon: LucideIcon
    id: string
    lessons: number
    text: string
    title: string
  }
  viewLabel: string
}

export function CategoryCard({ category, viewLabel }: CategoryCardProps) {
  const Icon = category.icon

  return (
    <article className="category-page-card">
      <span className="category-page-card__icon">
        <Icon size={30} />
      </span>
      <h2>{category.title}</h2>
      <p>{category.text}</p>
      <div className="category-page-card__stats">
        <span>{category.courses}</span>
        <span>{category.lessons}</span>
        <span>{category.books}</span>
      </div>
      <Link to={`/categories/${category.id}`}>{viewLabel}</Link>
    </article>
  )
}
