import { Navigate, useParams, Link } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, PlaySquare, Clock3, Plus, Search, Trash2, Edit3, Eye, CheckCircle2 } from 'lucide-react'
import { useArchiveData } from '../../context/ArchiveDataContext'
import { useLanguage, type Language } from '../../context/LanguageContext'
import { pickLocalizedText, type SharedLecturePart } from '../../data/shared/archive'

export function AdminLecturePartsPage() {
  const { lectureId } = useParams()
  const { language, dir } = useLanguage()
  const { lectures, saveLecturePartRow, deleteLecturePartRow } = useArchiveData()
  const copy = lecturePartsCopy[language]

  // Find index of lecture
  const lectureIndex = useMemo(() => {
    return lectures.findIndex((l) => l.id === lectureId)
  }, [lectures, lectureId])

  const lecture = lectureIndex !== -1 ? lectures[lectureIndex] : null

  const [query, setQuery] = useState('')
  const [editingPart, setEditingPart] = useState<Record<string, string> | null>(null)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)

  const BackIcon = language === 'ar' ? ArrowRight : ArrowLeft

  const parts = useMemo(() => lecture?.parts ?? [], [lecture])

  const visibleParts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) return parts
    return parts.filter((part) => 
      pickLocalizedText(part.title, language).toLowerCase().includes(normalizedQuery) ||
      (part.description && pickLocalizedText(part.description, language).toLowerCase().includes(normalizedQuery))
    )
  }, [parts, query, language])

  function openAddPart() {
    if (!lecture) return
    setEditingPart({
      title: '',
      title_en: '',
      duration: '',
      videoUrl: '',
      audioUrl: '',
      description: '',
      description_en: '',
    })
    setEditingIndex(null)
  }

  function openEditPart(part: SharedLecturePart, idx: number) {
    setEditingPart({
      title: part.title.ar || '',
      title_en: part.title.en || '',
      duration: part.duration || '',
      videoUrl: part.videoUrl || '',
      audioUrl: part.audioUrl || '',
      description: part.description?.ar || '',
      description_en: part.description?.en || '',
    })
    setEditingIndex(idx)
  }

  function savePart() {
    if (!editingPart || lectureIndex === -1) return
    
    // Construct the row record expected by saveLecturePartRow
    // which has Title, Duration, Video link, Audio link, Description
    const row = {
      title: editingPart.title || editingPart.title_en,
      duration: editingPart.duration,
      videoUrl: editingPart.videoUrl,
      audioUrl: editingPart.audioUrl,
      description: editingPart.description || editingPart.description_en,
    }
    
    saveLecturePartRow(lectureIndex, row, editingIndex)
    setEditingPart(null)
    setEditingIndex(null)
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && editingPart) {
        setEditingPart(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [editingPart])

  if (!lecture) {
    return <Navigate to="/admin/lectures" replace />
  }

  return (
    <div className="admin-page" dir={dir}>
      {/* Hero Section */}
      <section className="management-hero course-detail-hero">
        <div>
          <span>{copy.parent}</span>
          <h2>{pickLocalizedText(lecture.title, language)}</h2>
          <p>
            {copy.description} {pickLocalizedText(lecture.scholar, language)} · {pickLocalizedText(lecture.category, language)}
          </p>
        </div>
        <div className="management-hero__actions">
          <Link className="ghost-link" to="/admin/lectures">
            <BackIcon size={17} />
            {copy.back}
          </Link>
          <button className="gold-button" onClick={openAddPart} type="button">
            <Plus size={17} />
            {copy.addPart}
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-grid stats-grid--compact">
        <article className="stat-card tone-blue">
          <span className="stat-icon">
            <PlaySquare size={22} />
          </span>
          <div>
            <span>{copy.partCount}</span>
            <strong>{parts.length}</strong>
            <small>{copy.partCountHint}</small>
          </div>
        </article>
        <article className="stat-card tone-green">
          <span className="stat-icon">
            <CheckCircle2 size={22} />
          </span>
          <div>
            <span>{copy.status}</span>
            <strong>{language === 'ar' ? 'منشور' : 'Published'}</strong>
            <small>{copy.statusHint}</small>
          </div>
        </article>
        <article className="stat-card tone-amber">
          <span className="stat-icon">
            <Clock3 size={22} />
          </span>
          <div>
            <span>{copy.views}</span>
            <strong>{lecture.views}</strong>
            <small>{copy.viewsHint}</small>
          </div>
        </article>
      </section>

      {/* Table Section */}
      <section className="admin-panel table-panel">
        <div className="course-lessons-header">
          <div>
            <h2>{copy.partsTitle}</h2>
            <p>{copy.partsSubtitle}</p>
          </div>
          <div className="course-lessons-tools">
            <label className="admin-search">
              <Search size={17} />
              <input onChange={(event) => setQuery(event.target.value)} placeholder={copy.search} value={query} />
            </label>
          </div>
        </div>
        <div className="admin-table-wrap">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th style={{ width: '80px' }}>#</th>
                <th>{copy.tableTitle}</th>
                <th>{copy.tableDuration}</th>
                <th>{copy.tableVideo}</th>
                <th>{copy.tableAudio}</th>
                <th>{copy.actions}</th>
              </tr>
            </thead>
            <tbody>
              {visibleParts.map((part, index) => (
                <tr key={`${lecture.id}-part-${index}`}>
                  <td>{index + 1}</td>
                  <td>
                    <div style={{ fontWeight: 600, color: '#0d263d' }}>
                      {pickLocalizedText(part.title, language)}
                    </div>
                    {part.description && (
                      <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                        {pickLocalizedText(part.description, language)}
                      </div>
                    )}
                  </td>
                  <td>{part.duration}</td>
                  <td>{part.videoUrl ? <span style={{ color: '#10b981', fontWeight: 500 }}>✓</span> : '—'}</td>
                  <td>{part.audioUrl ? <span style={{ color: '#10b981', fontWeight: 500 }}>✓</span> : '—'}</td>
                  <td>
                    <div className="row-actions">
                      <a
                        href={`/lectures/${lecture.id}?part=${index + 1}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={copy.view}
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
                      <button onClick={() => openEditPart(part, index)} title={copy.edit} type="button">
                        <Edit3 size={16} />
                      </button>
                      <button onClick={() => deleteLecturePartRow(lectureIndex, index)} title={copy.delete} type="button">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {visibleParts.length === 0 ? (
                <tr>
                  <td colSpan={6}>
                    <div className="empty-state">{copy.empty}</div>
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>

      {/* Part Add/Edit Modal */}
      {editingPart ? (
        <div className="modal-backdrop" role="presentation" dir={dir} style={{ zIndex: 1100 }}>
          <section
            className="admin-modal"
            role="dialog"
            aria-modal="true"
            aria-label={editingIndex === null ? copy.addPart : copy.edit}
            style={{
              width: '100%',
              maxWidth: '650px',
              background: '#fff',
              borderRadius: '16px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '90vh',
            }}
          >
            <header style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0d263d', margin: 0 }}>
                {editingIndex === null ? copy.addPart : copy.edit}
              </h2>
              <button
                onClick={() => setEditingPart(null)}
                type="button"
                style={{ background: 'none', border: 'none', fontSize: '24px', color: '#94a3b8', cursor: 'pointer' }}
              >
                ×
              </button>
            </header>

            <div style={{ padding: '24px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Title Arabic */}
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                  {copy.modalTitleAr}
                </label>
                <input
                  type="text"
                  value={editingPart.title}
                  onChange={(e) => setEditingPart({ ...editingPart, title: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '14px' }}
                />
              </div>

              {/* Title English */}
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                  {copy.modalTitleEn}
                </label>
                <input
                  type="text"
                  value={editingPart.title_en}
                  onChange={(e) => setEditingPart({ ...editingPart, title_en: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '14px' }}
                />
              </div>

              {/* Duration */}
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                  {copy.modalDuration}
                </label>
                <input
                  type="text"
                  placeholder="00:00"
                  value={editingPart.duration}
                  onChange={(e) => setEditingPart({ ...editingPart, duration: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '14px' }}
                />
              </div>

              {/* Video URL */}
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                  {copy.modalVideoUrl}
                </label>
                <input
                  type="text"
                  placeholder="https://youtube.com/watch?v=..."
                  value={editingPart.videoUrl}
                  onChange={(e) => setEditingPart({ ...editingPart, videoUrl: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '14px' }}
                />
              </div>

              {/* Audio URL */}
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                  {copy.modalAudioUrl}
                </label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={editingPart.audioUrl}
                  onChange={(e) => setEditingPart({ ...editingPart, audioUrl: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '14px' }}
                />
              </div>

              {/* Description Arabic */}
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                  {copy.modalDescAr}
                </label>
                <textarea
                  rows={3}
                  value={editingPart.description}
                  onChange={(e) => setEditingPart({ ...editingPart, description: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '14px', resize: 'vertical' }}
                />
              </div>

              {/* Description English */}
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                  {copy.modalDescEn}
                </label>
                <textarea
                  rows={3}
                  value={editingPart.description_en}
                  onChange={(e) => setEditingPart({ ...editingPart, description_en: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '14px', resize: 'vertical' }}
                />
              </div>
            </div>

            <footer style={{ padding: '16px 24px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', gap: '12px', background: '#f8fafc' }}>
              <button
                onClick={() => setEditingPart(null)}
                type="button"
                style={{
                  padding: '10px 20px',
                  background: '#fff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#475569',
                  cursor: 'pointer',
                }}
              >
                {copy.cancel}
              </button>
              <button
                onClick={savePart}
                type="button"
                style={{
                  padding: '10px 20px',
                  background: 'var(--color-gold, #c5a880)',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#fff',
                  cursor: 'pointer',
                }}
              >
                {copy.save}
              </button>
            </footer>
          </section>
        </div>
      ) : null}
    </div>
  )
}

const lecturePartsCopy: Record<Language, Record<string, string>> = {
  ar: {
    parent: 'المحاضرات العامة / أجزاء المحاضرة',
    description: 'إدارة الأجزاء والملفات الصوتية والمرئية المرتبطة بالمحاضرة للشيخ',
    back: 'العودة للمحاضرات',
    addPart: 'إضافة جزء',
    partCount: 'عدد الأجزاء',
    partCountHint: 'أجزاء المحاضرة الحالية',
    status: 'حالة المحاضرة',
    statusHint: 'تؤثر على الظهور العام',
    views: 'المشاهدات والزيارات',
    viewsHint: 'إجمالي التفاعل العام',
    partsTitle: 'أجزاء هذه المحاضرة',
    partsSubtitle: 'يمكن تقسيم المحاضرة الطويلة لعدة أجزاء وتوفير البث الصوتي والمرئي لكل جزء.',
    search: 'ابحث في الأجزاء...',
    actions: 'الإجراءات',
    view: 'مشاهدة الجزء في المنصة',
    edit: 'تعديل بيانات الجزء',
    delete: 'حذف الجزء',
    empty: 'لا توجد أجزاء لهذه المحاضرة حالياً',
    cancel: 'إلغاء',
    save: 'حفظ',
    tableTitle: 'عنوان الجزء',
    tableDuration: 'المدة',
    tableVideo: 'فيديو',
    tableAudio: 'صوت',
    modalTitleAr: 'عنوان الجزء (بالعربية)',
    modalTitleEn: 'عنوان الجزء (بالإنجليزية)',
    modalDuration: 'المدة الزمنية (مثال: 45:12)',
    modalVideoUrl: 'رابط فيديو يوتيوب',
    modalAudioUrl: 'رابط الملف الصوتي المباشر',
    modalDescAr: 'وصف الجزء (بالعربية)',
    modalDescEn: 'وصف الجزء (بالإنجليزية)',
  },
  en: {
    parent: 'Public Lectures / Lecture Parts',
    description: 'Manage parts, audio and video files linked to the lecture by',
    back: 'Back to Lectures',
    addPart: 'Add Part',
    partCount: 'Parts Count',
    partCountHint: 'Current parts of the lecture',
    status: 'Lecture Status',
    statusHint: 'Controls public visibility',
    views: 'Views & Hits',
    viewsHint: 'Total public interaction',
    partsTitle: 'Parts of This Lecture',
    partsSubtitle: 'Long lectures can be split into parts with audio and video streaming options.',
    search: 'Search parts...',
    actions: 'Actions',
    view: 'View part on platform',
    edit: 'Edit part details',
    delete: 'Delete part',
    empty: 'No parts found for this lecture',
    cancel: 'Cancel',
    save: 'Save',
    tableTitle: 'Part Title',
    tableDuration: 'Duration',
    tableVideo: 'Video',
    tableAudio: 'Audio',
    modalTitleAr: 'Part Title (Arabic)',
    modalTitleEn: 'Part Title (English)',
    modalDuration: 'Duration (e.g. 45:12)',
    modalVideoUrl: 'YouTube Video URL',
    modalAudioUrl: 'Direct Audio Stream URL',
    modalDescAr: 'Part Description (Arabic)',
    modalDescEn: 'Part Description (English)',
  },
  uz: {
    parent: 'Ma’ruzalar / Qismlar boshqaruvi',
    description: 'Ma’ruza qismlari, audio va video fayllarini boshqarish. Ustoz:',
    back: 'Ma’ruzalarga qaytish',
    addPart: 'Qism qo‘shish',
    partCount: 'Qismlar soni',
    partCountHint: 'Ma’ruza qismlari ro‘yxati',
    status: 'Ma’ruza holati',
    statusHint: 'Ommaviy ko‘rinish holati',
    views: 'Ko‘rishlar',
    viewsHint: 'Jami ko‘rishlar soni',
    partsTitle: 'Ushbu ma’ruza qismlari',
    partsSubtitle: 'Uzun ma’ruzalarni bir nechta qismga bo‘lish mumkin.',
    search: 'Qismlarni qidirish...',
    actions: 'Harakatlar',
    view: 'Platformada ko‘rish',
    edit: 'Qismni tahrirlash',
    delete: 'Qismni o‘chirish',
    empty: 'Ushbu ma’ruzada qismlar mavjud emas',
    cancel: 'Bekor qilish',
    save: 'Saqlash',
    tableTitle: 'Qism nomi',
    tableDuration: 'Davomiyligi',
    tableVideo: 'Video',
    tableAudio: 'Audio',
    modalTitleAr: 'Qism nomi (Arabcha)',
    modalTitleEn: 'Qism nomi (Inglizcha)',
    modalDuration: 'Davomiyligi (masalan: 45:12)',
    modalVideoUrl: 'YouTube Video URL',
    modalAudioUrl: 'Direct Audio URL',
    modalDescAr: 'Tavsif (Arabcha)',
    modalDescEn: 'Tavsif (Inglizcha)',
  },
  uzCyr: {
    parent: 'Маърузалар / Қисмлар бошқаруви',
    description: 'Маъруза қисмлари, аудио ва видео файлларини бошқариш. Устоз:',
    back: 'Маърузаларга қайтиш',
    addPart: 'Қисм қўшиш',
    partCount: 'Қисмлар сони',
    partCountHint: 'Маъруза қисмлари рўйхати',
    status: 'Маъруза ҳолати',
    statusHint: 'Оммавий кўриниш ҳолати',
    views: 'Кўришлар',
    viewsHint: 'Жами кўришлар сони',
    partsTitle: 'Ушбу маъруза қисмлари',
    partsSubtitle: 'Узун маърузаларни бир нечта қисмга бўлиш мумкин.',
    search: 'Қисмларни қидириш...',
    actions: 'Ҳаракатлар',
    view: 'Платформада кўриш',
    edit: 'Қисмни таҳрирлаш',
    delete: 'Қисмни ўчириш',
    empty: 'Ушбу маърузада қисмлар мавjud эмас',
    cancel: 'Бекор қилиш',
    save: 'Сақлаш',
    tableTitle: 'Қисм номи',
    tableDuration: 'Давомийлиги',
    tableVideo: 'Видео',
    tableAudio: 'Аудио',
    modalTitleAr: 'Қисм номи (Арабча)',
    modalTitleEn: 'Қисм номи (Инглизча)',
    modalDuration: 'Давомийлиги (масалан: 45:12)',
    modalVideoUrl: 'YouTube Видео URL',
    modalAudioUrl: 'Аудио URL',
    modalDescAr: 'Тавсиф (Арабча)',
    modalDescEn: 'Тавсиф (Инглизча)',
  },
  ru: {
    parent: 'Публичные лекции / Части лекции',
    description: 'Управление частями, аудио- и видеофайлами лекции. Преподаватель:',
    back: 'Назад к лекциям',
    addPart: 'Добавить часть',
    partCount: 'Количество частей',
    partCountHint: 'Части текущей лекции',
    status: 'Статус лекции',
    statusHint: 'Управляет публичной видимостью',
    views: 'Просмотры',
    viewsHint: 'Всего просмотров',
    partsTitle: 'Части этой лекции',
    partsSubtitle: 'Длинные лекции можно разделить на части с аудио и видео стримингом.',
    search: 'Поиск частей...',
    actions: 'Действия',
    view: 'Посмотреть на платформе',
    edit: 'Редактировать часть',
    delete: 'Удалить часть',
    empty: 'Части для этой лекции не найдены',
    cancel: 'Отмена',
    save: 'Сохранить',
    tableTitle: 'Название части',
    tableDuration: 'Длительность',
    tableVideo: 'Видео',
    tableAudio: 'Аудио',
    modalTitleAr: 'Название части (Арабский)',
    modalTitleEn: 'Название части (Английский)',
    modalDuration: 'Длительность (например: 45:12)',
    modalVideoUrl: 'YouTube URL видео',
    modalAudioUrl: 'Прямая ссылка на аудио',
    modalDescAr: 'Описание части (Арабский)',
    modalDescEn: 'Описание части (Английский)',
  },
}
