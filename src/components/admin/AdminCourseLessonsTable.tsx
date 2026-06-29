import { Edit3, Search, Trash2, Eye } from 'lucide-react'
import type { CourseLesson } from '../../context/ArchiveDataContext'
import type { AdminPageSeed, AdminTableRow } from '../../data/adminSeed'

type AdminCourseLessonsTableProps = {
  copy: Record<string, string>
  course: AdminTableRow
  lessonsPage: AdminPageSeed
  query: string
  visibleLessons: CourseLesson[]
  onDeleteLesson: (lesson: CourseLesson) => void
  onEditLesson: (lesson: CourseLesson) => void
  onQueryChange: (query: string) => void
  onReorderLessons: () => void
}

export function AdminCourseLessonsTable({
  copy,
  course,
  lessonsPage,
  onDeleteLesson,
  onEditLesson,
  onQueryChange,
  onReorderLessons,
  query,
  visibleLessons,
}: AdminCourseLessonsTableProps) {
  return (
    <section className="admin-panel table-panel">
      <div className="course-lessons-header">
        <div>
          <h2>{copy.lessonsTitle}</h2>
          <p>{copy.lessonsSubtitle}</p>
        </div>
        <div className="course-lessons-tools">
          <label className="admin-search">
            <Search size={17} />
            <input onChange={(event) => onQueryChange(event.target.value)} placeholder={copy.search} value={query} />
          </label>
          <button onClick={onReorderLessons} type="button">
            {copy.reorder}
          </button>
        </div>
      </div>
      <div className="admin-table-wrap">
        <table className="admin-data-table">
          <thead>
            <tr>
              {lessonsPage.columns.map((column) => (
                <th key={column.key}>{column.label}</th>
              ))}
              <th>{copy.actions}</th>
            </tr>
          </thead>
          <tbody>
            {visibleLessons.map((lesson, lessonIndex) => (
              <tr key={`${course.title}-${lesson.title}`}>
                {lessonsPage.columns.map((column) => (
                  <td key={column.key}>
                    {column.key === 'course' ? course.title : column.key === 'number' ? `${lessonIndex + 1}` : String(lesson[column.key as keyof CourseLesson] ?? '')}
                  </td>
                ))}
                <td>
                  <div className="row-actions">
                    <a
                      href={`/courses/${course.id || 1}?lesson=${lessonIndex + 1}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={copy.view || 'مشاهدة الدرس'}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '6px',
                        borderRadius: '4px',
                        color: '#64748b',
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        textDecoration: 'none',
                      }}
                    >
                      <Eye size={16} />
                    </a>
                    <button onClick={() => onEditLesson(lesson)} title={copy.edit} type="button">
                      <Edit3 size={16} />
                    </button>
                    <button onClick={() => onDeleteLesson(lesson)} title={copy.delete} type="button">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {visibleLessons.length === 0 ? (
              <tr>
                <td colSpan={lessonsPage.columns.length + 1}>
                  <div className="empty-state">{copy.empty}</div>
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </section>
  )
}
