import { Eye, UsersRound } from 'lucide-react'

type PopularLesson = {
  title: string
  teacher: string
  views: string
}

type DistributionItem = {
  label: string
  value: string
  percent: number
  color: string
}

type ActivityItem = {
  user: string
  action: string
  time: string
}

type DashboardCopy = {
  activity: ActivityItem[]
  activityTitle: string
  distributionTitle: string
  imports: { title: string; lessons: string; status: string; date: string }[]
  importsTitle: string
  popularTitle: string
  totalContent: string
  userMetrics: string[]
  usersTitle: string
  viewAll: string
}

type AdminDashboardModalProps = {
  panel: string
  data: DashboardCopy
  popularLessons: PopularLesson[]
  distribution: DistributionItem[]
  userMetricValues: string[]
  totalContentValue: string
  onClose: () => void
}

export function AdminDashboardModal({
  data,
  distribution,
  onClose,
  panel,
  popularLessons,
  totalContentValue,
  userMetricValues,
}: AdminDashboardModalProps) {
  return (
    <div className="modal-backdrop" role="presentation">
      <section className="admin-modal dashboard-modal" role="dialog" aria-modal="true" aria-label={modalTitle(panel, data)}>
        <header>
          <h2>{modalTitle(panel, data)}</h2>
          <button onClick={onClose} type="button">
            ×
          </button>
        </header>
        <div className="dashboard-modal__content">{renderDashboardModal(panel, data, popularLessons, distribution, userMetricValues, totalContentValue)}</div>
      </section>
    </div>
  )
}

function modalTitle(panel: string, data: DashboardCopy) {
  if (panel === 'popular') return data.popularTitle
  if (panel === 'imports') return data.importsTitle
  if (panel === 'distribution') return data.distributionTitle
  if (panel === 'users') return data.usersTitle
  return data.activityTitle
}

function renderDashboardModal(
  panel: string,
  data: DashboardCopy,
  popularLessons: PopularLesson[],
  distribution: DistributionItem[],
  userMetricValues: string[],
  totalContentValue: string,
) {
  if (panel === 'popular') {
    return (
      <div className="rank-list">
        {[...popularLessons, ...popularLessons].map((lesson, index) => (
          <div className="rank-item" key={`${lesson.title}-${index}`}>
            <span>{index + 1}</span>
            <div>
              <strong>{lesson.title}</strong>
              <small>{lesson.teacher}</small>
            </div>
            <b>{lesson.views}</b>
          </div>
        ))}
      </div>
    )
  }

  if (panel === 'imports') {
    return (
      <div className="import-list">
        {[...data.imports, ...data.imports].map((item, index) => (
          <div className="import-row" key={`${item.title}-${index}`}>
            <div>
              <strong>{item.title}</strong>
              <small>{item.lessons}</small>
            </div>
            <span className={`import-status ${statusClass(item.status)}`}>{item.status}</span>
            <time>{item.date}</time>
          </div>
        ))}
      </div>
    )
  }

  if (panel === 'distribution') {
    return (
      <div className="distribution-list">
        {[...distribution, { label: data.totalContent, value: totalContentValue, percent: 100, color: '#0d263d' }].map((item) => (
          <div key={item.label}>
            <span style={{ backgroundColor: item.color }} />
            <strong>{item.label}</strong>
            <small>
              {item.value} ({item.percent}%)
            </small>
          </div>
        ))}
      </div>
    )
  }

  if (panel === 'users') {
    return (
      <div className="user-metrics">
        {data.userMetrics.map((label, index) => (
          <div key={label}>
            <Eye size={18} />
            <span>{label}</span>
            <strong>{userMetricValues[index]}</strong>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="activity-feed">
      {[...data.activity, ...data.activity].map((item, index) => (
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
  )
}

function statusClass(status: string) {
  if (status === 'تم الاستيراد' || status === 'Imported') return 'is-success'
  if (status === 'جاري المعالجة' || status === 'Processing') return 'is-info'
  if (status === 'قيد المراجعة' || status === 'In review') return 'is-warning'
  return 'is-danger'
}
