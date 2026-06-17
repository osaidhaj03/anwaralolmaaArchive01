import type { AdminStat } from '../../data/adminSeed'

type AdminManagementStatsProps = {
  stats: AdminStat[]
  title: string
}

export function AdminManagementStats({ stats, title }: AdminManagementStatsProps) {
  return (
    <section className="stats-grid stats-grid--compact" aria-label={`Summary ${title}`}>
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <article className={`stat-card tone-${stat.tone}`} key={stat.label}>
            <span className="stat-icon">
              <Icon size={22} />
            </span>
            <div>
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
              <small>{stat.change}</small>
            </div>
          </article>
        )
      })}
    </section>
  )
}
