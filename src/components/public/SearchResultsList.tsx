import { Link } from 'react-router-dom'
import type { SearchFilterButton } from './SearchResultsHero'

export type SearchResultItem = {
  meta: string
  title: string
  to: string
  type: string
}

type SearchResultsListProps = {
  emptyLabel: string
  filters: SearchFilterButton[]
  openLabel: string
  results: SearchResultItem[]
  resultsLabel: string
}

export function SearchResultsList({ emptyLabel, filters, openLabel, results, resultsLabel }: SearchResultsListProps) {
  return (
    <section className="public-container search-results-layout">
      <div className="search-results-summary">
        <strong>{results.length}</strong>
        <span>{resultsLabel}</span>
      </div>
      <div className="search-results-list">
        {results.map((item) => (
          <article className="search-results-card" key={`${item.type}-${item.to}`}>
            <div>
              <small>{filters.find((entry) => entry.key === item.type)?.label}</small>
              <h2>{item.title}</h2>
              <p>{item.meta}</p>
            </div>
            <Link to={item.to}>{openLabel}</Link>
          </article>
        ))}
        {results.length === 0 ? <p className="courses-empty">{emptyLabel}</p> : null}
      </div>
    </section>
  )
}
