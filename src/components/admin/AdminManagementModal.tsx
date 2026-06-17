import type { AdminTableColumn, AdminTableRow } from '../../data/adminSeed'

type AdminManagementModalProps = {
  cancelLabel: string
  columns: AdminTableColumn[]
  imageAlt: string
  imagePlaceholder: string
  isAddMode: boolean
  row: AdminTableRow
  saveLabel: string
  title: string
  onChange: (row: AdminTableRow) => void
  onClose: () => void
  onSave: () => void
}

export function AdminManagementModal({
  cancelLabel,
  columns,
  imageAlt,
  imagePlaceholder,
  isAddMode,
  onChange,
  onClose,
  onSave,
  row,
  saveLabel,
  title,
}: AdminManagementModalProps) {
  return (
    <div className="modal-backdrop" role="presentation">
      <section className="admin-modal" role="dialog" aria-modal="true" aria-label={title}>
        <header>
          <h2>{title}</h2>
          <button onClick={onClose} type="button">
            ×
          </button>
        </header>
        <div className="modal-form">
          {columns.map((column) => (
            <label className={column.key === 'image' ? 'image-field' : ''} key={column.key}>
              {column.label}
              {column.key === 'image' ? <img className="image-preview" alt={row.name ?? imageAlt} src={row[column.key] || 'https://i.pravatar.cc/96?img=1'} /> : null}
              <input
                autoFocus={isAddMode && column === columns[0]}
                onChange={(event) => onChange({ ...row, [column.key]: event.target.value })}
                placeholder={column.key === 'image' ? imagePlaceholder : undefined}
                value={row[column.key] ?? ''}
              />
            </label>
          ))}
        </div>
        <footer>
          <button onClick={onClose} type="button">
            {cancelLabel}
          </button>
          <button className="gold-button" onClick={onSave} type="button">
            {saveLabel}
          </button>
        </footer>
      </section>
    </div>
  )
}
