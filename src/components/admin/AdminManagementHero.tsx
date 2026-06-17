import { Download, Plus } from 'lucide-react'

type AdminManagementHeroProps = {
  actionLabel: string
  adminLabel: string
  description: string
  exportLabel: string
  title: string
  onAdd: () => void
  onExport: () => void
}

export function AdminManagementHero({ actionLabel, adminLabel, description, exportLabel, onAdd, onExport, title }: AdminManagementHeroProps) {
  return (
    <section className="management-hero">
      <div>
        <span>{adminLabel}</span>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="management-hero__actions">
        <button onClick={onExport} type="button">
          <Download size={17} />
          {exportLabel}
        </button>
        <button className="gold-button" onClick={onAdd} type="button">
          <Plus size={17} />
          {actionLabel}
        </button>
      </div>
    </section>
  )
}
