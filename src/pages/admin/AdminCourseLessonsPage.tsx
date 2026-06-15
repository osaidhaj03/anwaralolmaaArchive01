import { Link, Navigate, useParams } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Clock3, Edit3, PlaySquare, Plus, Search, Trash2 } from 'lucide-react'
import { useLanguage, type Language } from '../../context/LanguageContext'
import type { AdminPageSeed } from '../../data/adminSeed'

type AdminCourseLessonsPageProps = {
  coursesPage: AdminPageSeed
  lessonsPage: AdminPageSeed
}

export function AdminCourseLessonsPage({ coursesPage, lessonsPage }: AdminCourseLessonsPageProps) {
  const { courseId } = useParams()
  const { language } = useLanguage()
  const copy = courseLessonsCopy[language]
  const index = Number(courseId) - 1
  const course = coursesPage.rows[index]
  const [lessons, setLessons] = useState(lessonsPage.rows)
  const [query, setQuery] = useState('')
  const [editingLesson, setEditingLesson] = useState<Record<string, string> | null>(null)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)

  const BackIcon = language === 'ar' ? ArrowRight : ArrowLeft
  const visibleLessons = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) return lessons
    return lessons.filter((lesson) => Object.values(lesson).some((value) => value.toLowerCase().includes(normalizedQuery)))
  }, [lessons, query])

  function openAddLesson() {
    if (!course) return
    const blankLesson = Object.fromEntries(lessonsPage.columns.map((column) => [column.key, '']))
    setEditingLesson({
      ...blankLesson,
      course: course.title,
      teacher: course.teacher,
      number: `${lessons.length + 1}`,
      status: language === 'ar' ? 'مسودة' : 'Draft',
    })
    setEditingIndex(null)
  }

  function openEditLesson(lesson: Record<string, string>) {
    setEditingLesson({ ...lesson })
    setEditingIndex(lessons.indexOf(lesson))
  }

  function saveLesson() {
    if (!editingLesson) return
    if (editingIndex === null) {
      setLessons((current) => [...current, editingLesson])
    } else {
      setLessons((current) => current.map((lesson, lessonIndex) => (lessonIndex === editingIndex ? editingLesson : lesson)))
    }
    setEditingLesson(null)
    setEditingIndex(null)
  }

  function reorderLessons() {
    setLessons((current) => [...current].reverse())
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && editingLesson) {
        setEditingLesson(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [editingLesson])

  if (!course) {
    return <Navigate to="/admin/courses" replace />
  }

  return (
    <div className="admin-page">
      <section className="management-hero course-detail-hero">
        <div>
          <span>{copy.parent}</span>
          <h2>{course.title}</h2>
          <p>
            {copy.description} {course.teacher} · {course.category}
          </p>
        </div>
        <div className="management-hero__actions">
          <Link className="ghost-link" to="/admin/courses">
            <BackIcon size={17} />
            {copy.back}
          </Link>
          <button className="gold-button" onClick={openAddLesson} type="button">
            <Plus size={17} />
            {copy.addLesson}
          </button>
        </div>
      </section>

      <section className="stats-grid stats-grid--compact">
        <article className="stat-card tone-blue">
          <span className="stat-icon">
            <PlaySquare size={22} />
          </span>
          <div>
            <span>{copy.lessonCount}</span>
            <strong>{course.lessons}</strong>
            <small>{copy.lessonCountHint}</small>
          </div>
        </article>
        <article className="stat-card tone-green">
          <span className="stat-icon">
            <CheckCircle2 size={22} />
          </span>
          <div>
            <span>{copy.status}</span>
            <strong>{course.status}</strong>
            <small>{copy.statusHint}</small>
          </div>
        </article>
        <article className="stat-card tone-amber">
          <span className="stat-icon">
            <Clock3 size={22} />
          </span>
          <div>
            <span>{copy.level}</span>
            <strong>{course.level}</strong>
            <small>{copy.levelHint}</small>
          </div>
        </article>
        <article className="stat-card tone-violet">
          <span className="stat-icon">
            <BookOpen size={22} />
          </span>
          <div>
            <span>{copy.category}</span>
            <strong>{course.category}</strong>
            <small>{copy.categoryHint}</small>
          </div>
        </article>
      </section>

      <section className="admin-panel table-panel">
        <div className="course-lessons-header">
          <div>
            <h2>{copy.lessonsTitle}</h2>
            <p>{copy.lessonsSubtitle}</p>
          </div>
          <div className="course-lessons-tools">
            <label className="admin-search">
              <Search size={17} />
              <input onChange={(event) => setQuery(event.target.value)} placeholder={copy.search} value={query} />
            </label>
            <button onClick={reorderLessons} type="button">
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
                      {column.key === 'course' ? course.title : column.key === 'number' ? `${lessonIndex + 1}` : lesson[column.key]}
                    </td>
                  ))}
                  <td>
                    <div className="row-actions">
                      <button onClick={() => openEditLesson(lesson)} title={copy.edit} type="button">
                        <Edit3 size={16} />
                      </button>
                      <button onClick={() => setLessons((current) => current.filter((item) => item !== lesson))} title={copy.delete} type="button">
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

      {editingLesson ? (
        <div className="modal-backdrop" role="presentation">
          <section className="admin-modal" role="dialog" aria-modal="true" aria-label={editingIndex === null ? copy.addLesson : copy.edit}>
            <header>
              <h2>{editingIndex === null ? copy.addLesson : copy.edit}</h2>
              <button onClick={() => setEditingLesson(null)} type="button">
                ×
              </button>
            </header>
            <div className="modal-form">
              {lessonsPage.columns.map((column) => (
                <label key={column.key}>
                  {column.label}
                  <input
                    onChange={(event) =>
                      setEditingLesson((current) => (current ? { ...current, [column.key]: event.target.value } : current))
                    }
                    value={editingLesson[column.key] ?? ''}
                  />
                </label>
              ))}
            </div>
            <footer>
              <button onClick={() => setEditingLesson(null)} type="button">
                {copy.cancel}
              </button>
              <button className="gold-button" onClick={saveLesson} type="button">
                {copy.save}
              </button>
            </footer>
          </section>
        </div>
      ) : null}
    </div>
  )
}

const courseLessonsCopy: Record<Language, Record<string, string>> = {
  ar: {
    parent: 'الدورات / دروس الدورة',
    description: 'إدارة الدروس المرتبطة بهذه الدورة للشيخ',
    back: 'العودة للدورات',
    addLesson: 'إضافة درس',
    lessonCount: 'عدد الدروس',
    lessonCountHint: 'حسب بيانات الدورة',
    status: 'حالة الدورة',
    statusHint: 'تؤثر على الظهور العام',
    level: 'المستوى',
    levelHint: 'يستخدم في الفلاتر',
    category: 'القسم',
    categoryHint: 'تصنيف المحتوى',
    lessonsTitle: 'دروس هذه الدورة',
    lessonsSubtitle: 'هذه القائمة تظهر فقط بعد اختيار دورة من صفحة الدورات.',
    reorder: 'ترتيب الدروس',
    search: 'ابحث في الدروس...',
    actions: 'الإجراءات',
    edit: 'تعديل الدرس',
    delete: 'حذف الدرس',
    empty: 'لا توجد دروس مطابقة',
    cancel: 'إلغاء',
    save: 'حفظ',
  },
  en: {
    parent: 'Courses / Course Lessons',
    description: 'Manage lessons linked to this course by',
    back: 'Back to courses',
    addLesson: 'Add Lesson',
    lessonCount: 'Lessons',
    lessonCountHint: 'From course data',
    status: 'Course Status',
    statusHint: 'Controls public visibility',
    level: 'Level',
    levelHint: 'Used in filters',
    category: 'Category',
    categoryHint: 'Content classification',
    lessonsTitle: 'Lessons in This Course',
    lessonsSubtitle: 'This list appears only after selecting a course from the courses page.',
    reorder: 'Reorder lessons',
    search: 'Search lessons...',
    actions: 'Actions',
    edit: 'Edit lesson',
    delete: 'Delete lesson',
    empty: 'No matching lessons',
    cancel: 'Cancel',
    save: 'Save',
  },
}
