import { FatwaCard } from './FatwaCard'
import type { FatwaItem } from '../../data/public/pageTypes'

type FatwaResultsGridProps = {
  emptyLabel: string
  items: FatwaItem[]
}

export function FatwaResultsGrid({ emptyLabel, items }: FatwaResultsGridProps) {
  return (
    <section className="public-container fatwa-layout">
      <div className="fatwa-grid">
        {items.map((item, index) => (
          <FatwaCard fatwa={item} href={`/fatwa/${index + 1}`} key={item.title} />
        ))}
        {items.length === 0 ? <p className="courses-empty">{emptyLabel}</p> : null}
      </div>
    </section>
  )
}
