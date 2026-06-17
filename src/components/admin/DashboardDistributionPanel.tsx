import { AdminPanelHeader } from './AdminPanelHeader'

type DistributionItem = {
  color: string
  label: string
  percent: number
  value: string
}

type DashboardDistributionPanelProps = {
  actionLabel: string
  distribution: DistributionItem[]
  title: string
  totalContentLabel: string
  totalContentValue: string
  onOpen: () => void
}

export function DashboardDistributionPanel({ actionLabel, distribution, onOpen, title, totalContentLabel, totalContentValue }: DashboardDistributionPanelProps) {
  return (
    <article className="admin-panel">
      <AdminPanelHeader actionLabel={actionLabel} onAction={onOpen} title={title} />
      <div className="distribution">
        <div className="donut">
          <strong>{totalContentValue}</strong>
          <span>{totalContentLabel}</span>
        </div>
        <div className="distribution-list">
          {distribution.map((item) => (
            <div key={item.label}>
              <span style={{ backgroundColor: item.color }} />
              <strong>{item.label}</strong>
              <small>
                {item.value} ({item.percent}%)
              </small>
            </div>
          ))}
        </div>
      </div>
    </article>
  )
}
