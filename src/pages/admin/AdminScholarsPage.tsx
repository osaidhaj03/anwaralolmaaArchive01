import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Edit3, Eye, Search, Trash2, AlertTriangle } from 'lucide-react'
import { AdminManagementHero } from '../../components/admin/AdminManagementHero'
import { useLanguage, type Language } from '../../context/LanguageContext'
import { useArchiveData } from '../../context/ArchiveDataContext'
import { pickLocalizedText, type SharedScholar } from '../../data/shared/archive'

type AdminScholarsPageProps = {
  page?: any // for seed compatibility
}

export function AdminScholarsPage({ page }: AdminScholarsPageProps) {
  const { language, dir } = useLanguage()
  const { scholars, categories, deleteScholarRow } = useArchiveData()
  const copy = pageCopy[language] || pageCopy['ar']
  const navigate = useNavigate()

  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('')
  const [pageNumber, setPageNumber] = useState(1)

  const [deletingIndex, setDeletingIndex] = useState<number | null>(null)

  // Initialize filter chips
  const filters = useMemo(() => {
    if (language === 'ar') return ['الكل', 'الأكثر نشاطاً', 'حسب البلد']
    if (language === 'uz') return ['Barchasi', 'Eng faol', 'Mamlakat bo‘yicha']
    if (language === 'uzCyr') return ['Барчаси', 'Энг фаол', 'Мамлакат бўйича']
    if (language === 'ru') return ['Все', 'Самые активные', 'По странам']
    return ['All', 'Most Active', 'By Country']
  }, [language])

  useEffect(() => {
    setActiveFilter(filters[0])
  }, [filters])

  // Filter scholars
  const filteredScholars = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    let items = [...scholars]

    // Apply search query
    if (normalizedQuery.length > 0) {
      items = items.filter((s) => {
        const nameAr = (s.name.ar || '').toLowerCase()
        const nameEn = (s.name.en || '').toLowerCase()
        const titleAr = (s.title.ar || '').toLowerCase()
        const titleEn = (s.title.en || '').toLowerCase()
        const countryAr = (s.country.ar || '').toLowerCase()
        const countryEn = (s.country.en || '').toLowerCase()
        const specialtyAr = (s.field.ar || '').toLowerCase()
        const specialtyEn = (s.field.en || '').toLowerCase()

        return (
          nameAr.includes(normalizedQuery) ||
          nameEn.includes(normalizedQuery) ||
          titleAr.includes(normalizedQuery) ||
          titleEn.includes(normalizedQuery) ||
          countryAr.includes(normalizedQuery) ||
          countryEn.includes(normalizedQuery) ||
          specialtyAr.includes(normalizedQuery) ||
          specialtyEn.includes(normalizedQuery)
        )
      })
    }

    // Apply filter chips
    if (activeFilter && activeFilter !== filters[0]) {
      if (activeFilter === filters[1]) {
        // Sort descending by courses
        items.sort((a, b) => b.courses - a.courses)
      } else if (activeFilter === filters[2]) {
        // Sort alphabetically by country
        items.sort((a, b) => {
          const aCountry = pickLocalizedText(a.country, language)
          const bCountry = pickLocalizedText(b.country, language)
          return aCountry.localeCompare(bCountry)
        })
      }
    }

    return items
  }, [activeFilter, filters, language, query, scholars])

  const pageSize = 8
  const totalPages = Math.max(1, Math.ceil(filteredScholars.length / pageSize))
  const visibleScholars = filteredScholars.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)

  function openAddDialog() {
    navigate('/admin/teachers/new')
  }

  function openEditDialog(scholar: SharedScholar) {
    navigate(`/admin/teachers/edit/${scholar.id}`)
  }

  function confirmDelete(scholar: SharedScholar) {
    const originalIndex = scholars.findIndex((s) => s.id === scholar.id)
    setDeletingIndex(originalIndex)
  }

  function executeDelete() {
    if (deletingIndex === null) return
    deleteScholarRow(deletingIndex)
    setDeletingIndex(null)
    setPageNumber(1)
  }

  function exportRows() {
    const header = [copy.name, copy.specialty, copy.country, copy.courses, copy.lessons, copy.birthYear, copy.deathYear].join(',')
    const body = filteredScholars
      .map((s) => {
        const nameText = pickLocalizedText(s.name, language)
        const specialtyText = pickLocalizedText(s.field, language)
        const countryText = pickLocalizedText(s.country, language)
        return [
          nameText,
          specialtyText,
          countryText,
          s.courses,
          s.lessons,
          s.birthYear,
          s.deathYear || '',
        ]
          .map((value) => `"${String(value ?? '').replaceAll('"', '""')}"`)
          .join(',')
      })
      .join('\n')
    const blob = new Blob([`\ufeff${header}\n${body}`], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `scholars-list-${language}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  // Handle closing modal on Escape key press
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setDeletingIndex(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [deletingIndex])

  const heroTitle = page?.title || (language === 'ar' ? 'إدارة العلماء والمدرسين' : 'Scholars & Teachers Management')
  const heroDescription = page?.description || (language === 'ar' ? 'إضافة وتعديل بيانات العلماء وتخصصاتهم وسيرتهم العلمية وصورهم الرمزية.' : 'Add and manage scholar profiles, academic specialties, and biographical information.')
  const actionLabel = page?.actionLabel || (language === 'ar' ? 'إضافة عالم جديد' : 'Add New Scholar')

  return (
    <div className="admin-page" dir={dir}>
      <AdminManagementHero
        actionLabel={actionLabel}
        adminLabel={copy.admin}
        description={heroDescription}
        exportLabel={copy.export}
        onAdd={openAddDialog}
        onExport={exportRows}
        title={heroTitle}
      />

      <section className="management-layout-full">
        <article className="admin-panel table-panel">
          <div className="filter-toolbar">
            <label className="admin-search">
              <Search size={18} />
              <input
                onChange={(e) => {
                  setQuery(e.target.value)
                  setPageNumber(1)
                }}
                placeholder={language === 'ar' ? 'ابحث باسم العالم، التخصص، أو البلد...' : 'Search by name, specialty, or country...'}
                value={query}
              />
            </label>
            <div className="filter-chips">
              {filters.map((filter) => (
                <button
                  className={activeFilter === filter ? 'is-active' : ''}
                  key={filter}
                  onClick={() => {
                    setActiveFilter(filter)
                    setPageNumber(1)
                  }}
                  type="button"
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="admin-table-wrap">
            <table className="admin-data-table">
              <thead>
                <tr>
                  <th>{copy.name}</th>
                  <th>{copy.specialty}</th>
                  <th>{copy.country}</th>
                  <th>{copy.courses}</th>
                  <th>{copy.lessons}</th>
                  <th>{copy.birthYear}</th>
                  <th>{copy.deathYear}</th>
                  <th>{copy.actions}</th>
                </tr>
              </thead>
              <tbody>
                {visibleScholars.map((scholar, index) => {
                  const resolvedCategory = categories.find((c) => c.id === scholar.categoryId)
                  const categoryName = resolvedCategory ? pickLocalizedText(resolvedCategory.title, language) : pickLocalizedText(scholar.field, language)
                  const scholarName = pickLocalizedText(scholar.name, language)
                  const scholarTitle = pickLocalizedText(scholar.title, language)

                  return (
                    <tr key={`scholars-${scholar.id}-${index}`}>
                      <td>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                          {scholar.image ? (
                            <img
                              src={scholar.image}
                              alt={scholarName}
                              style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                objectFit: 'cover',
                                border: '1.5px solid var(--color-gold, #c5a880)',
                                background: '#f8fafc',
                              }}
                            />
                          ) : (
                            <div
                              style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                background: 'var(--color-bg-200, #e2e8f0)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '14px',
                                fontWeight: 700,
                                color: 'var(--color-primary-600, #0d263d)',
                              }}
                            >
                              {scholarName ? scholarName.charAt(0) : 'ش'}
                            </div>
                          )}
                          <div>
                            <span style={{ fontWeight: 700, display: 'block' }}>{scholarName}</span>
                            <span style={{ fontSize: '11px', color: '#6b7280', display: 'block', marginTop: '2px' }}>
                              {scholarTitle}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span
                          style={{
                            background: 'var(--color-bg-100, #f1f5f9)',
                            padding: '3px 8px',
                            borderRadius: '12px',
                            fontSize: '12px',
                            color: 'var(--color-primary-700, #1e293b)',
                            fontWeight: 500,
                          }}
                        >
                          {categoryName}
                        </span>
                      </td>
                      <td>{pickLocalizedText(scholar.country, language)}</td>
                      <td style={{ fontWeight: 600 }}>{scholar.courses}</td>
                      <td>{scholar.lessons}</td>
                      <td style={{ opacity: 0.85, fontSize: '13px' }}>{scholar.birthYear}</td>
                      <td style={{ opacity: 0.85, fontSize: '13px' }}>{scholar.deathYear || '—'}</td>
                      <td>
                        <div className="row-actions">
                          <Link
                            title={copy.open}
                            to={`/scholars/${scholar.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Eye size={16} />
                          </Link>
                          <button onClick={() => openEditDialog(scholar)} title={copy.edit} type="button">
                            <Edit3 size={16} />
                          </button>
                          <button onClick={() => confirmDelete(scholar)} title={copy.delete} type="button" className="delete-action-btn">
                            <Trash2 size={16} style={{ color: '#ef4444' }} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
                {visibleScholars.length === 0 ? (
                  <tr>
                    <td colSpan={8}>
                      <div className="empty-state">{copy.empty}</div>
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>

          <footer className="table-footer">
            <span>
              {copy.showing} {filteredScholars.length === 0 ? 0 : (pageNumber - 1) * pageSize + 1} {copy.to} {Math.min(pageNumber * pageSize, filteredScholars.length)} {copy.of}{' '}
              {filteredScholars.length} {copy.items}
            </span>
            <div>
              <button disabled={pageNumber === 1} onClick={() => setPageNumber(Math.max(1, pageNumber - 1))} type="button">
                {copy.previous}
              </button>
              {Array.from({ length: totalPages }, (_, idx) => (
                <button
                  className={pageNumber === idx + 1 ? 'is-current' : ''}
                  key={idx + 1}
                  onClick={() => setPageNumber(idx + 1)}
                  type="button"
                >
                  {idx + 1}
                </button>
              ))}
              <button disabled={pageNumber === totalPages} onClick={() => setPageNumber(Math.min(totalPages, pageNumber + 1))} type="button">
                {copy.next}
              </button>
            </div>
          </footer>
        </article>
      </section>


      {/* Delete Confirmation Modal */}
      {deletingIndex !== null ? (
        <div className="modal-backdrop" role="presentation" onClick={() => setDeletingIndex(null)}>
          <section
            className="admin-modal confirm-modal"
            role="dialog"
            aria-modal="true"
            aria-label={copy.confirmDeleteTitle}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="confirm-modal-body">
              <div className="confirm-modal-icon">
                <AlertTriangle size={32} />
              </div>
              <h3>{copy.confirmDeleteTitle}</h3>
              <p>{copy.confirmDeleteText}</p>
            </div>
            <footer>
              <button onClick={() => setDeletingIndex(null)} type="button">
                {copy.cancel}
              </button>
              <button className="gold-button danger-btn" onClick={executeDelete} type="button">
                {copy.confirmDeleteBtn}
              </button>
            </footer>
          </section>
        </div>
      ) : null}
    </div>
  )
}

const pageCopy: Record<Language, Record<string, string>> = {
  ar: {
    admin: 'لوحة التحكم',
    export: 'تصدير',
    actions: 'الإجراءات',
    edit: 'تعديل بيانات العالم',
    delete: 'حذف العالم',
    open: 'معاينة صفحة العالم',
    showing: 'عرض',
    to: 'إلى',
    of: 'من أصل',
    items: 'علماء ومدرسين',
    previous: 'السابق',
    next: 'التالي',
    empty: 'لا توجد نتائج مطابقة لعلماء الأرشيف',
    cancel: 'إلغاء',
    name: 'اسم العالم واللقب العلمي',
    specialty: 'التخصص العلمي الرئيسي',
    country: 'البلد والمنشأ',
    courses: 'الدورات',
    lessons: 'الدروس',
    birthYear: 'الميلاد',
    deathYear: 'الوفاة',
    confirmDeleteTitle: 'تأكيد حذف العالم',
    confirmDeleteText: 'هل أنت متأكد من حذف هذا العالم؟ سيتم إزالته من لوحة التحكم العامة لعلماء المنصة بالكامل.',
    confirmDeleteBtn: 'حذف العالم الآن',
  },
  en: {
    admin: 'Admin Panel',
    export: 'Export',
    actions: 'Actions',
    edit: 'Edit Scholar Details',
    delete: 'Delete Scholar',
    open: 'Preview Scholar Page',
    showing: 'Showing',
    to: 'to',
    of: 'of',
    items: 'scholars',
    previous: 'Previous',
    next: 'Next',
    empty: 'No matching scholars found',
    cancel: 'Cancel',
    name: 'Scholar Name & Title',
    specialty: 'Primary Specialty',
    country: 'Country',
    courses: 'Courses',
    lessons: 'Lessons',
    birthYear: 'Birth',
    deathYear: 'Death',
    confirmDeleteTitle: 'Confirm Delete',
    confirmDeleteText: 'Are you sure you want to delete this scholar? This will permanently remove them from the admin panel.',
    confirmDeleteBtn: 'Delete Scholar',
  },
  uz: {
    admin: 'Boshqaruv paneli',
    export: 'Eksport',
    actions: 'Harakatlar',
    edit: 'Tahrirlash',
    delete: 'O‘chirish',
    open: 'Saytda ko‘rish',
    showing: 'Ko‘rsatilmoqda',
    to: 'dan',
    of: 'gacha, jami:',
    items: 'ta olim',
    previous: 'Oldingi',
    next: 'Keyingi',
    empty: 'Olimlar topilmadi',
    cancel: 'Bekor qilish',
    name: 'Olim ismi va unvoni',
    specialty: 'Asosiy yo‘nalishi',
    country: 'Mamlakat',
    courses: 'Kurslar',
    lessons: 'Darslar',
    birthYear: 'Tug‘ilgan yili',
    deathYear: 'Vafot etgan yili',
    confirmDeleteTitle: 'Olimni o‘chirish',
    confirmDeleteText: 'Rostdan ham ushbu olimni o‘chirmoqchimisiz?',
    confirmDeleteBtn: 'O‘chirish',
  },
  uzCyr: {
    admin: 'Бошқарув панели',
    export: 'Экспорт',
    actions: 'Ҳаракатлар',
    edit: 'Таҳрирлаш',
    delete: 'Ўчириш',
    open: 'Сайтда кўриш',
    showing: 'Кўрсатилмоқда',
    to: 'дан',
    of: 'гача, жами:',
    items: 'та олим',
    previous: 'Олдинги',
    next: 'Кейинги',
    empty: 'Олимлар топилмади',
    cancel: 'Бекор қилиш',
    name: 'Олим исми ва унвони',
    specialty: 'Асосий йўналиши',
    country: 'Мамлакат',
    courses: 'Курслар',
    lessons: 'Дарслар',
    birthYear: 'Туғилган йили',
    deathYear: 'Вафот этган йили',
    confirmDeleteTitle: 'Олимни ўчириш',
    confirmDeleteText: 'Ростдан ҳам ушбу олимни ўчирмоқчимисиз?',
    confirmDeleteBtn: 'Ўчириш',
  },
  ru: {
    admin: 'Панель управления',
    export: 'Экспорт',
    actions: 'Действия',
    edit: 'Редактировать ученого',
    delete: 'Удалить ученого',
    open: 'Предпросмотр на сайте',
    showing: 'Показано',
    to: 'с',
    of: 'из',
    items: 'ученых',
    previous: 'Назад',
    next: 'Вперед',
    empty: 'Ученые не найдены',
    cancel: 'Отмена',
    name: 'Имя и звание ученого',
    specialty: 'Основная специализация',
    country: 'Страна',
    courses: 'Курсы',
    lessons: 'Уроки',
    birthYear: 'Рождение',
    deathYear: 'Смерть',
    confirmDeleteTitle: 'Подтвердите удаление',
    confirmDeleteText: 'Вы уверены, что хотите удалить этого ученого? Это действие удалит его навсегда.',
    confirmDeleteBtn: 'Удалить ученого',
  },
}
