import { Download, Plus, Upload } from 'lucide-react'

type AdminManagementHeroProps = {
  actionLabel: string
  adminLabel: string
  description: string
  exportLabel: string
  importLabel?: string
  title: string
  onAdd: () => void
  onExport: () => void
  onImport?: () => void
}

export function AdminManagementHero({ actionLabel, adminLabel, description, exportLabel, importLabel, onAdd, onExport, onImport, title }: AdminManagementHeroProps) {
  return (
    <section className="management-hero">
      <div>
        <span>{adminLabel}</span>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="management-hero__actions">
        {onImport && (
          <button
            onClick={onImport}
            type="button"
            style={{
              background: 'transparent',
              border: '1.5px solid var(--color-gold, #c5a880)',
              color: 'var(--color-gold, #c5a880)',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '14px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s',
            }}
          >
            <Upload size={17} />
            {importLabel || 'Import'}
          </button>
        )}
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
