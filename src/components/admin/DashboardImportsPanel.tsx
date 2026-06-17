import { AdminPanelHeader } from './AdminPanelHeader'

type DashboardImportItem = {
  date: string
  lessons: string
  status: string
  title: string
}

type DashboardImportsPanelProps = {
  actionLabel: string
  imports: DashboardImportItem[]
  title: string
  onOpen: () => void
}

export function DashboardImportsPanel({ actionLabel, imports, onOpen, title }: DashboardImportsPanelProps) {
  return (
    <article className="admin-panel">
      <AdminPanelHeader actionLabel={actionLabel} onAction={onOpen} title={title} />
      <div className="import-list">
        {imports.slice(0, 3).map((item, index) => (
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
    </article>
  )
}

function statusClass(status: string) {
  if (['تم الاستيراد', 'Imported', 'Import qilingan', 'Импорт қилинган', 'Импортировано'].includes(status)) return 'is-success'
  if (['جاري المعالجة', 'Processing', 'Ishlanmoqda', 'Ишланмоқда', 'В обработке'].includes(status)) return 'is-info'
  if (['قيد المراجعة', 'In review', 'Ko‘rib chiqilmoqda', 'Кўриб чиқилмоқда', 'На проверке'].includes(status)) return 'is-warning'
  return 'is-danger'
}
