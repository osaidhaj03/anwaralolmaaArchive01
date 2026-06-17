import { LibraryCard } from './LibraryCard'
import type { LibraryItem } from '../../data/public/pageTypes'

type LibraryResultsGridProps = {
  emptyLabel: string
  items: LibraryItem[]
}

export function LibraryResultsGrid({ emptyLabel, items }: LibraryResultsGridProps) {
  return (
    <section className="public-container library-layout">
      <div className="library-grid">
        {items.map((item, index) => (
          <LibraryCard href={`/library/${index + 1}`} item={item} key={item.title} />
        ))}
        {items.length === 0 ? <p className="courses-empty">{emptyLabel}</p> : null}
      </div>
    </section>
  )
}
