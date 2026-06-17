import type { LucideIcon } from 'lucide-react'

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
}

export function CategoryDetailHero({ breadcrumb, category }: CategoryDetailHeroProps) {
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
        </div>
      </div>
    </section>
  )
}
