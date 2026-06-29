import { useEffect, useState } from 'react'
import { Search, type LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

type LandingHeroStat = {
  icon: LucideIcon
  label: string
  to: string
  value: string
}

type LandingHeroProps = {
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

export function getStatLink(label: string): string {
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

function AnimatedCounter({ targetValue }: { targetValue: string }) {
  const numericString = targetValue.replace(/[^0-9]/g, '')
  const target = parseInt(numericString, 10) || 0
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (target === 0) {
      setCount(0)
      return
    }

    const duration = 1500 // 1.5 seconds animation duration
    const startTime = performance.now()
    let animationFrameId: number

    const updateCount = (timestamp: number) => {
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = progress * (2 - progress) // easeOutQuad
      const currentVal = Math.floor(easedProgress * target)
      setCount(currentVal)

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCount)
      } else {
        setCount(target)
      }
    }

    animationFrameId = requestAnimationFrame(updateCount)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [target])

  const formatCount = (val: number) => {
    if (targetValue.includes(',')) {
      return new Intl.NumberFormat('en-US').format(val)
    }
    return String(val)
  }

  return <>{formatCount(count)}</>
}

export function LandingHero({
  accent,
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
        {stats.map(({ icon: Icon, label, to, value }) => (
          <Link key={label} to={to} style={{ textDecoration: 'none', color: 'inherit', display: 'contents' }}>
            <div className="stat-strip-item">
              <div className="stat-icon-wrapper">
                <Icon size={24} />
              </div>
              <strong><AnimatedCounter targetValue={value} /></strong>
              <span>{label}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
