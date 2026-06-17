import { UsersRound } from 'lucide-react'
import { AdminPanelHeader } from './AdminPanelHeader'

type ActivityItem = {
  action: string
  time: string
  user: string
}

type DashboardActivityPanelProps = {
  actionLabel: string
  activity: ActivityItem[]
  title: string
  onOpen: () => void
}

export function DashboardActivityPanel({ actionLabel, activity, onOpen, title }: DashboardActivityPanelProps) {
  return (
    <article className="admin-panel">
      <AdminPanelHeader actionLabel={actionLabel} onAction={onOpen} title={title} />
      <div className="activity-feed">
        {activity.slice(0, 2).map((item, index) => (
          <div key={`${item.user}-${item.time}-${index}`}>
            <span className="avatar avatar--small">
              <UsersRound size={15} />
            </span>
            <div>
              <strong>{item.user}</strong>
              <small>{item.action}</small>
            </div>
            <time>{item.time}</time>
          </div>
        ))}
      </div>
    </article>
  )
}
