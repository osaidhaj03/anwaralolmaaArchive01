import { LibraryBig, TrendingUp, UsersRound } from 'lucide-react'
import { AdminPanelHeader } from './AdminPanelHeader'

type DashboardUserMetricsPanelProps = {
  actionLabel: string
  labels: string[]
  title: string
  values: string[]
  onOpen: () => void
}

export function DashboardUserMetricsPanel({ actionLabel, labels, onOpen, title, values }: DashboardUserMetricsPanelProps) {
  return (
    <article className="admin-panel">
      <AdminPanelHeader actionLabel={actionLabel} onAction={onOpen} title={title} />
      <div className="user-metrics">
        <div>
          <UsersRound size={18} />
          <span>{labels[0]}</span>
          <strong>{values[0]}</strong>
        </div>
        <div>
          <TrendingUp size={18} />
          <span>{labels[1]}</span>
          <strong>{values[1]}</strong>
        </div>
        <div>
          <LibraryBig size={18} />
          <span>{labels[2]}</span>
          <strong>{values[2]}</strong>
        </div>
      </div>
    </article>
  )
}
