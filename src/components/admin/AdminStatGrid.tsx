import { TrendingUp, type LucideIcon } from 'lucide-react'

type AdminStatItem = {
  label: string
  value: string
  change: string
  icon: LucideIcon
  tone: string
}

type AdminStatGridProps = {
  items: AdminStatItem[]
  monthSuffix: string
}

export function AdminStatGrid({ items, monthSuffix }: AdminStatGridProps) {
  return (
    <section className="stats-grid" aria-label="ملخص المنصة">
      {items.map((stat) => {
        const Icon = stat.icon
        return (
          <article className={`stat-card tone-${stat.tone}`} key={stat.label}>
            <span className="stat-icon">
              <Icon size={23} />
            </span>
            <div>
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
              <small>
                <TrendingUp size={13} />
                {stat.change} {monthSuffix}
              </small>
            </div>
          </article>
        )
      })}
    </section>
  )
}
