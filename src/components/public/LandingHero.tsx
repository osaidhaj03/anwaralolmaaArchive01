import { Bookmark, Search, type LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

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

function getStatLink(label: string): string {
  const text = label.toLowerCase();
  if (text.includes('course') || text.includes('دورة') || text.includes('student') || text.includes('طالب')) {
    return '/courses';
  }
  if (text.includes('lesson') || text.includes('درس') || text.includes('مقطع')) {
    return '/courses';
  }
  if (text.includes('scholar') || text.includes('شيخ') || text.includes('عالم') || text.includes('محاضر') || text.includes('lecturer')) {
    return '/scholars';
  }
  if (text.includes('book') || text.includes('كتاب') || text.includes('متن') || text.includes('library') || text.includes('مكتبة')) {
    return '/library';
  }
  if (text.includes('category') || text.includes('قسم') || text.includes('أقسام')) {
    return '/categories';
  }
  if (text.includes('fatwa') || text.includes('فتوى') || text.includes('فتاوى')) {
    return '/fatwa';
  }
  return '/courses';
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
          <Link key={label} to={getStatLink(label)} style={{ textDecoration: 'none', color: 'inherit', display: 'contents' }}>
            <div>
              <Icon size={24} />
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
