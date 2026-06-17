import type { LucideIcon } from 'lucide-react'
import { BookOpen, GraduationCap, PlayCircle, UsersRound } from 'lucide-react'

type CategoryDetailItem = {
  books: number
  courses: number
  icon: LucideIcon
  lessons: number
  text: string
  title: string
}

type CategoryDetailHeroProps = {
  breadcrumb: string
  category: CategoryDetailItem
  copy: Record<string, string>
}

export function CategoryDetailHero({ breadcrumb, category, copy }: CategoryDetailHeroProps) {
  const Icon = category.icon

  return (
    <section className="category-detail-hero islamic-soft-pattern">
      <div className="public-container category-detail-hero__inner">
        <span>{breadcrumb}</span>
        <div className="category-detail-head">
          <div className="category-detail-copy">
            <div className="category-detail-badge">
              <Icon size={26} />
              <strong>{category.title}</strong>
            </div>
            <h1>{category.title}</h1>
            <p>{category.text}</p>
          </div>
          <div className="category-detail-stats">
            <div>
              <GraduationCap size={18} />
              <strong>{category.courses}</strong>
              <span>{copy.courses}</span>
            </div>
            <div>
              <PlayCircle size={18} />
              <strong>{category.lessons}</strong>
              <span>{copy.lessons}</span>
            </div>
            <div>
              <BookOpen size={18} />
              <strong>{category.books}</strong>
              <span>{copy.books}</span>
            </div>
            <div>
              <UsersRound size={18} />
              <strong>{Math.max(12, Math.round(category.courses / 3))}</strong>
              <span>{copy.scholars}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
