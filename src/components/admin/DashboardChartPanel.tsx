import { AdminPanelHeader } from './AdminPanelHeader'

type DashboardChartPanelProps = {
  last30Label: string
  last7Label: string
  range: string
  title: string
  onRangeChange: (range: string) => void
}

export function DashboardChartPanel({ last30Label, last7Label, onRangeChange, range, title }: DashboardChartPanelProps) {
  return (
    <article className="admin-panel chart-panel">
      <AdminPanelHeader title={title}>
        <select onChange={(event) => onRangeChange(event.target.value)} value={range}>
          <option value="30">{last30Label}</option>
          <option value="7">{last7Label}</option>
        </select>
      </AdminPanelHeader>
      <div className="mock-chart" aria-label={title}>
        {Array.from({ length: range === '30' ? 18 : 7 }, (_, index) => (
          <span key={index} style={{ height: `${34 + ((index * 19) % 58)}%` }} />
        ))}
      </div>
    </article>
  )
}
