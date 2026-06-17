import { PublicFilterSelect } from './PublicFilterSelect'

export type CourseFilters = {
  category: string
  level: string
  status: string
  teacher: string
}

type CoursesFilterCardProps = {
  allLabel: string
  applyLabel: string
  categoryLabel: string
  categoryOptions: string[]
  filters: CourseFilters
  levelLabel: string
  levelOptions: string[]
  statusLabel: string
  statusOptions: string[]
  teacherLabel: string
  teacherOptions: string[]
  title: string
  resetLabel: string
  onApply: () => void
  onReset: () => void
  onUpdate: (key: keyof CourseFilters, value: string) => void
}

export function CoursesFilterCard({
  allLabel,
  applyLabel,
  categoryLabel,
  categoryOptions,
  filters,
  levelLabel,
  levelOptions,
  onApply,
  onReset,
  onUpdate,
  resetLabel,
  statusLabel,
  statusOptions,
  teacherLabel,
  teacherOptions,
  title,
}: CoursesFilterCardProps) {
  return (
    <aside className="courses-filter-card">
      <h2>{title}</h2>
      <PublicFilterSelect allLabel={allLabel} label={categoryLabel} onChange={(value) => onUpdate('category', value)} options={categoryOptions} value={filters.category} />
      <PublicFilterSelect allLabel={allLabel} label={levelLabel} onChange={(value) => onUpdate('level', value)} options={levelOptions} value={filters.level} />
      <PublicFilterSelect allLabel={allLabel} label={statusLabel} onChange={(value) => onUpdate('status', value)} options={statusOptions} value={filters.status} />
      <PublicFilterSelect allLabel={allLabel} label={teacherLabel} onChange={(value) => onUpdate('teacher', value)} options={teacherOptions} value={filters.teacher} />
      <div className="courses-filter-actions">
        <button onClick={onApply} type="button">
          {applyLabel}
        </button>
        <button onClick={onReset} type="button">
          {resetLabel}
        </button>
      </div>
    </aside>
  )
}
