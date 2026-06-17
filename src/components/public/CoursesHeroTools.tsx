import { Search, SlidersHorizontal } from 'lucide-react'
import { PublicStatStrip } from './PublicStatStrip'
import type { PublicStatSeed } from '../../data/public/pageTypes'

type CoursesHeroToolsProps = {
  search: string
  searchPlaceholder: string
  stats: PublicStatSeed[]
  onSearchChange: (value: string) => void
  showFilters: boolean
  onToggleFilters: () => void
}

export function CoursesHeroTools({ onSearchChange, search, searchPlaceholder, stats, showFilters, onToggleFilters }: CoursesHeroToolsProps) {
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
      <PublicStatStrip className="courses-stat-strip" iconSize={22} items={stats} />
    </>
  )
}
