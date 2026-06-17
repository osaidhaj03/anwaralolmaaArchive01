import { Search, SlidersHorizontal } from 'lucide-react'
import { PublicFilterSelect } from './PublicFilterSelect'
import { PublicStatStrip } from './PublicStatStrip'
import type { PublicStatSeed } from '../../data/public/pageTypes'

export type ArchiveFilterSelect = {
  allLabel: string
  label: string
  onChange: (value: string) => void
  options: string[]
  value: string
}

export type ArchiveSortButton<TSort extends string> = {
  label: string
  value: TSort
}

type ArchiveHeroToolsProps<TSort extends string> = {
  filters: ArchiveFilterSelect[]
  search: string
  searchPlaceholder: string
  showFilters: boolean
  sort: TSort
  sortOptions: ArchiveSortButton<TSort>[]
  statClassName: string
  stats: PublicStatSeed[]
  onSearchChange: (value: string) => void
  onSortChange: (value: TSort) => void
  onToggleFilters: () => void
}

export function ArchiveHeroTools<TSort extends string>({
  filters,
  onSearchChange,
  onSortChange,
  onToggleFilters,
  search,
  searchPlaceholder,
  showFilters,
  sort,
  sortOptions,
  statClassName,
  stats,
}: ArchiveHeroToolsProps<TSort>) {
  return (
    <>
      <div className="courses-searchbar">
        <label>
          <Search size={20} />
          <input onChange={(event) => onSearchChange(event.target.value)} placeholder={searchPlaceholder} value={search} />
        </label>
        <button
          className={`courses-filter-toggle-btn ${showFilters ? 'is-active' : ''}`}
          onClick={onToggleFilters}
          type="button"
          aria-label="Toggle filters"
        >
          <SlidersHorizontal size={20} />
        </button>
      </div>

      {showFilters ? (
        <div className="courses-filter-horizontal-card">
          <div className="courses-filter-grid">
            {filters.map((filter) => (
              <PublicFilterSelect
                allLabel={filter.allLabel}
                key={filter.label}
                label={filter.label}
                onChange={filter.onChange}
                options={filter.options}
                value={filter.value}
              />
            ))}
          </div>
          <div className="courses-filter-horizontal-actions">
            {sortOptions.map((option) => (
              <button className={sort === option.value ? 'is-active' : ''} key={option.value} onClick={() => onSortChange(option.value)} type="button">
                {option.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <PublicStatStrip className={statClassName} items={stats} />
    </>
  )
}
