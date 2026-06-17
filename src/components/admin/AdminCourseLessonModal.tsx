import type { AdminPageSeed, AdminTableRow } from '../../data/adminSeed'

type AdminCourseLessonModalProps = {
  cancelLabel: string
  isAddMode: boolean
  lesson: AdminTableRow
  lessonsPage: AdminPageSeed
  saveLabel: string
  title: string
  onChange: (lesson: AdminTableRow) => void
  onClose: () => void
  onSave: () => void
}

export function AdminCourseLessonModal({ cancelLabel, isAddMode, lesson, lessonsPage, onChange, onClose, onSave, saveLabel, title }: AdminCourseLessonModalProps) {
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
          {lessonsPage.columns.map((column) => (
            <label key={column.key}>
              {column.label}
              <input autoFocus={isAddMode && column === lessonsPage.columns[0]} onChange={(event) => onChange({ ...lesson, [column.key]: event.target.value })} value={lesson[column.key] ?? ''} />
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
