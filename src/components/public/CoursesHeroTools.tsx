import { Search } from 'lucide-react'
import { PublicStatStrip } from './PublicStatStrip'
import type { PublicStatSeed } from '../../data/public/pageTypes'

type CoursesHeroToolsProps = {
  search: string
  searchPlaceholder: string
  stats: PublicStatSeed[]
  onSearchChange: (value: string) => void
}

export function CoursesHeroTools({ onSearchChange, search, searchPlaceholder, stats }: CoursesHeroToolsProps) {
  return (
    <>
      <div className="courses-searchbar">
        <label>
          <Search size={20} />
          <input onChange={(event) => onSearchChange(event.target.value)} placeholder={searchPlaceholder} value={search} />
        </label>
      </div>
      <PublicStatStrip className="courses-stat-strip" iconSize={22} items={stats} />
    </>
  )
}
