import { Bookmark, Search, type LucideIcon } from 'lucide-react'

type LandingHeroStat = {
  icon: LucideIcon
  label: string
  value: string
}

type LandingHeroProps = {
  badge: string
  title: string
  accent: string
  text: string
  placeholder: string
  searchButton: string
  searchValue: string
  stats: LandingHeroStat[]
  onSearchChange: (value: string) => void
  onSubmit: () => void
}

export function LandingHero({
  accent,
  badge,
  onSearchChange,
  onSubmit,
  placeholder,
  searchButton,
  searchValue,
  stats,
  text,
  title,
}: LandingHeroProps) {
  return (
    <section className="hero-section islamic-soft-pattern" id="home">
      <div className="public-container hero-grid">
        <div className="hero-copy">
          <span className="hero-badge">
            <Bookmark size={16} />
            {badge}
          </span>
          <h1>{title}</h1>
          <h2>{accent}</h2>
          <p>{text}</p>
          <label className="hero-search">
            <Search size={21} />
            <input
              onChange={(event) => onSearchChange(event.target.value)}
              onKeyDown={(event) => (event.key === 'Enter' ? onSubmit() : undefined)}
              placeholder={placeholder}
              value={searchValue}
            />
            <button onClick={onSubmit} type="button">
              {searchButton}
            </button>
          </label>
        </div>

        <div className="hero-visual">
          <div aria-hidden="true" className="hero-visual-spacer" />
        </div>
      </div>

      <div className="public-container stat-strip">
        {stats.map(({ icon: Icon, label, value }) => (
          <div key={label}>
            <Icon size={24} />
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
