import { AdminPanelHeader } from './AdminPanelHeader'

type PopularLesson = {
  teacher: string
  title: string
  views: string
}

type DashboardRankPanelProps = {
  actionLabel: string
  lessons: PopularLesson[]
  title: string
  onOpen: () => void
}

export function DashboardRankPanel({ actionLabel, lessons, onOpen, title }: DashboardRankPanelProps) {
  return (
    <article className="admin-panel">
      <AdminPanelHeader actionLabel={actionLabel} onAction={onOpen} title={title} />
      <div className="rank-list">
        {lessons.slice(0, 3).map((lesson, index) => (
          <div className="rank-item" key={lesson.title}>
            <span>{index + 1}</span>
            <div>
              <strong>{lesson.title}</strong>
              <small>{lesson.teacher}</small>
            </div>
            <b>{lesson.views}</b>
          </div>
        ))}
      </div>
    </article>
  )
}
