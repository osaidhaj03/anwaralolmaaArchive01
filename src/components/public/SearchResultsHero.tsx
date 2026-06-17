import type { LucideIcon } from 'lucide-react'
import { Search } from 'lucide-react'

export type SearchFilterButton = {
  key: string
  label: string
  icon: LucideIcon
}

type SearchResultsHeroProps = {
  activeFilter: string
  breadcrumb: string
  description: string
  filters: SearchFilterButton[]
  openLabel: string
  placeholder: string
  query: string
  title: string
  onFilterChange: (filter: string) => void
  onQueryChange: (query: string) => void
  onSubmit: () => void
}

export function SearchResultsHero({
  activeFilter,
  breadcrumb,
  description,
  filters,
  onFilterChange,
  onQueryChange,
  onSubmit,
  openLabel,
  placeholder,
  query,
  title,
}: SearchResultsHeroProps) {
  return (
    <section className="search-results-hero islamic-soft-pattern">
      <div className="public-container search-results-hero__inner">
        <span>{breadcrumb}</span>
        <h1>{title}</h1>
        <p>{description}</p>
        <div className="search-results-input">
          <Search size={19} />
          <input onChange={(event) => onQueryChange(event.target.value)} onKeyDown={(event) => (event.key === 'Enter' ? onSubmit() : undefined)} placeholder={placeholder} value={query} />
          <button onClick={onSubmit} type="button">
            {openLabel}
          </button>
        </div>
        <div className="search-results-filters">
          {filters.map(({ icon: Icon, key, label }) => (
            <button className={activeFilter === key ? 'is-active' : ''} key={key} onClick={() => onFilterChange(key)} type="button">
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
