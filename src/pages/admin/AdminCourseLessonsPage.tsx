import { Navigate, useParams } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { AdminCourseLessonModal } from '../../components/admin/AdminCourseLessonModal'
import { AdminExcelImportModal } from '../../components/admin/AdminExcelImportModal'
import { AdminCourseLessonsHero } from '../../components/admin/AdminCourseLessonsHero'
import { AdminCourseLessonsStats } from '../../components/admin/AdminCourseLessonsStats'
import { AdminCourseLessonsTable } from '../../components/admin/AdminCourseLessonsTable'
import { useArchiveData, type CourseLesson } from '../../context/ArchiveDataContext'
import { useLanguage, type Language } from '../../context/LanguageContext'
import type { AdminPageSeed } from '../../data/adminSeed'

type AdminCourseLessonsPageProps = {
  coursesPage: AdminPageSeed
  lessonsPage: AdminPageSeed
}

export function AdminCourseLessonsPage({ coursesPage, lessonsPage }: AdminCourseLessonsPageProps) {
  const { courseId } = useParams()
  const { language } = useLanguage()
  const { deleteLessonRow, lessonsByCourse, reorderLessons: reorderCourseLessons, saveLessonRow, saveBulkLessons } = useArchiveData()
  const copy = courseLessonsCopy[language]
  const index = Number(courseId) - 1
  const course = coursesPage.rows[index]
  const [query, setQuery] = useState('')
  const [editingLesson, setEditingLesson] = useState<Record<string, string> | null>(null)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [showImportModal, setShowImportModal] = useState(false)
  const lessons = useMemo(() => lessonsByCourse[String(index)] ?? [], [index, lessonsByCourse])

  const BackIcon = language === 'ar' ? ArrowRight : ArrowLeft
  const visibleLessons = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) return lessons
    return lessons.filter((lesson) => Object.values(lesson).some((value) => String(value).toLowerCase().includes(normalizedQuery)))
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
      videoLinks: '[]',
      descriptionShort: '',
      descriptionLong: '',
      transcription: '',
      attachments: '[]',
    })
    setEditingIndex(null)
  }

  function openEditLesson(lesson: CourseLesson) {
    setEditingLesson({
      course: lesson.course,
      duration: lesson.duration,
      number: lesson.number,
      status: lesson.status,
      teacher: lesson.teacher,
      title: lesson.title,
      videoLinks: lesson.videoLinks ? JSON.stringify(lesson.videoLinks) : '[]',
      descriptionShort: lesson.descriptionShort || '',
      descriptionLong: lesson.descriptionLong || '',
      transcription: lesson.transcription || '',
      attachments: lesson.attachments ? JSON.stringify(lesson.attachments) : '[]',
    })
    setEditingIndex(lessons.indexOf(lesson))
  }

  function saveLesson() {
    if (!editingLesson) return
    saveLessonRow(index, editingLesson, editingIndex)
    setEditingLesson(null)
    setEditingIndex(null)
  }

  function reorderLessons() {
    reorderCourseLessons(index)
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
      <AdminCourseLessonsHero BackIcon={BackIcon} addLabel={copy.addLesson} backLabel={copy.back} copy={copy} course={course} onAddLesson={openAddLesson} onImportExcel={() => setShowImportModal(true)} />

      <AdminCourseLessonsStats copy={copy} course={course} lessonsCount={lessons.length} />

      <AdminCourseLessonsTable
        copy={copy}
        course={course}
        lessonsPage={lessonsPage}
        onDeleteLesson={(lesson) => deleteLessonRow(index, lessons.indexOf(lesson))}
        onEditLesson={openEditLesson}
        onQueryChange={setQuery}
        onReorderLessons={reorderLessons}
        query={query}
        visibleLessons={visibleLessons}
      />

      {editingLesson ? (
        <AdminCourseLessonModal
          cancelLabel={copy.cancel}
          isAddMode={editingIndex === null}
          lesson={editingLesson}
          lessonsPage={lessonsPage}
          onChange={setEditingLesson}
          onClose={() => setEditingLesson(null)}
          onSave={saveLesson}
          saveLabel={copy.save}
          title={editingIndex === null ? copy.addLesson : copy.edit}
        />
      ) : null}

      {showImportModal ? (
        <AdminExcelImportModal
          onClose={() => setShowImportModal(false)}
          onImport={(importedLessons) => saveBulkLessons(index, importedLessons)}
        />
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
    importExcel: 'استيراد من إكسل',
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
    view: 'مشاهدة',
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
    importExcel: 'Import from Excel',
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
    view: 'View',
    edit: 'Edit lesson',
    delete: 'Delete lesson',
    empty: 'No matching lessons',
    cancel: 'Cancel',
    save: 'Save',
  },
  uz: {
    parent: 'Kurslar / Darslar boshqaruvi',
    description: 'Ushbu kursga tegishli darslarni boshqarish. Ustoz:',
    back: 'Kurslarga qaytish',
    addLesson: 'Dars qo‘shish',
    importExcel: 'Exceldan import',
    lessonCount: 'Darslar soni',
    lessonCountHint: 'Kurs ma’lumotlaridan',
    status: 'Kurs holati',
    statusHint: 'Ommaviy ko‘rinishni boshqaradi',
    level: 'Daraja',
    levelHint: 'Filtrlarda qo‘llaniladi',
    category: 'Kategoriya',
    categoryHint: 'Tarkib tasnifi',
    lessonsTitle: 'Ushbu kursdagi darslar',
    lessonsSubtitle: 'Bu ro‘yxat faqat kurslar sahifasidan kurs tanlangandan keyin paydo bo‘ladi.',
    reorder: 'Darslarni qayta tartiblash',
    search: 'Darslarni qidirish...',
    actions: 'Harakatlar',
    view: 'Ko‘rish',
    edit: 'Darsni tahrirlash',
    delete: 'Darsni o‘chirish',
    empty: 'Mos darslar topilmadi',
    cancel: 'Bekor qilish',
    save: 'Saqlash',
  },
  uzCyr: {
    parent: 'Курслар / Дарслар бошқаруви',
    description: 'Ушбу курсга тегишли дарсларни бошқариш. Устоз:',
    back: 'Курсларга қайтиш',
    addLesson: 'Дарс қўшиш',
    importExcel: 'Excelдан импорт',
    lessonCount: 'Дарслар сони',
    lessonCountHint: 'Курс маълумотларидан',
    status: 'Курс ҳолати',
    statusHint: 'Оммавий кўринишни бошқаради',
    level: 'Даража',
    levelHint: 'Филтрларда қўлланилади',
    category: 'Категория',
    categoryHint: 'Таркиб таснифи',
    lessonsTitle: 'Ушбу курсдаги дарслар',
    lessonsSubtitle: 'Бу рўйхат фақат курслар саҳифасидан курс талангандан кейин пайдо бўлади.',
    reorder: 'Дарсларни қайта тартиблаш',
    search: 'Дарсларни қидириш...',
    actions: 'Ҳаракатлар',
    view: 'Кўриш',
    edit: 'Дарсни таҳрирлаш',
    delete: 'Дарсни ўчириш',
    empty: 'Мос дарслар топилмади',
    cancel: 'Бекор қилиш',
    save: 'Сақлаш',
  },
  ru: {
    parent: 'Курсы / Уроки курса',
    description: 'Управление уроками, привязанными к этому курсу. Преподаватель:',
    back: 'Назад к курсам',
    addLesson: 'Добавить урок',
    importExcel: 'Импорт из Excel',
    lessonCount: 'Количество уроков',
    lessonCountHint: 'Из данных курса',
    status: 'Статус курса',
    statusHint: 'Управляет публичной видимостью',
    level: 'Уровень',
    levelHint: 'Используется в фильтрах',
    category: 'Категория',
    categoryHint: 'Классификация контента',
    lessonsTitle: 'Уроки этого курса',
    lessonsSubtitle: 'Этот список появляется только после выбора курса на странице курсов.',
    reorder: 'Изменить порядок уроков',
    search: 'Поиск уроков...',
    actions: 'Действия',
    view: 'Просмотр',
    edit: 'Редактировать урок',
    delete: 'Удалить урок',
    empty: 'Уроки не найдены',
    cancel: 'Отмена',
    save: 'Сохранить',
  },
}
