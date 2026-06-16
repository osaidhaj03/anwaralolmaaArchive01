import type { ReactNode } from 'react'

type ScholarFeatureListProps = {
  items: Array<{
    description: string
    icon: ReactNode
    title: string
  }>
}

export function ScholarFeatureList({ items }: ScholarFeatureListProps) {
  return (
    <div className="scholar-profile-course-list">
      {items.map((item) => (
        <article key={item.title}>
          <div className="scholar-profile-course-mark">{item.icon}</div>
          <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        </article>
      ))}
    </div>
  )
}
