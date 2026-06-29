import { LectureCard } from './LectureCard'
import type { LectureItem } from '../../data/public/pageTypes'

type LectureResultsGridProps = {
  emptyLabel: string
  items: LectureItem[]
  partLabel: string
  partsLabel: string
}

export function LectureResultsGrid({ emptyLabel, items, partLabel, partsLabel }: LectureResultsGridProps) {
  return (
    <section className="public-container fatwa-layout">
      <div className="fatwa-grid">
        {items.map((item) => (
          <LectureCard
            lecture={item}
            href={`/lectures/${item.id}`}
            key={item.id}
            partLabel={partLabel}
            partsLabel={partsLabel}
          />
        ))}
        {items.length === 0 ? <p className="courses-empty">{emptyLabel}</p> : null}
      </div>
    </section>
  )
}
