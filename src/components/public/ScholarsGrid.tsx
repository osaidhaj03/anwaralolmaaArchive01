import { ScholarCard } from './ScholarCard'
import type { Scholar } from '../../data/public/pageTypes'

type ScholarsGridProps = {
  aboutLabel: string
  allScholars: Scholar[]
  emptyLabel: string
  scholars: Scholar[]
}

export function ScholarsGrid({ aboutLabel, allScholars, emptyLabel, scholars }: ScholarsGridProps) {
  return (
    <div className="scholars-grid">
      {scholars.map((scholar) => {
        const scholarIndex = allScholars.findIndex((item) => item.name === scholar.name)
        return <ScholarCard aboutLabel={aboutLabel} aboutTo={`/scholars/${scholarIndex + 1}`} key={scholar.name} scholar={scholar} />
      })}
      {scholars.length === 0 ? <p className="courses-empty">{emptyLabel}</p> : null}
    </div>
  )
}
