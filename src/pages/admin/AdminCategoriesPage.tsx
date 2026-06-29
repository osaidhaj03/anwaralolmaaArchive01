import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Edit3, Eye, MoreHorizontal, Search, Trash2, AlertTriangle } from 'lucide-react'
import * as Icons from 'lucide-react'
import { AdminManagementHero } from '../../components/admin/AdminManagementHero'
import { AdminCategoryModal } from '../../components/admin/AdminCategoryModal'
import { useLanguage, type Language } from '../../context/LanguageContext'
import type { AdminPageSeed } from '../../data/adminSeed'

type AdminCategoriesPageProps = {
  page: AdminPageSeed
  rowsOverride?: Record<string, string>[]
  onSaveRow?: (row: Record<string, string>, index: number | null) => void
  onDeleteRow?: (index: number) => void
  onToggleRowStatus?: (index: number, language: Language) => void
}

export function AdminCategoriesPage({
  page,
  onDeleteRow,
  onSaveRow,
  onToggleRowStatus,
  rowsOverride,
}: AdminCategoriesPageProps) {
  const { language, dir } = useLanguage()
  const copy = pageCopy[language] || pageCopy['ar']
  
  const [rows, setRows] = useState(page.rows)
  const sourceRows = rowsOverride ?? rows
  
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState(page.filters[0] ?? '')
  const [pageNumber, setPageNumber] = useState(1)
  
  const [editingRow, setEditingRow] = useState<Record<string, string> | null>(null)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  
  const [deletingIndex, setDeletingIndex] = useState<number | null>(null)

  // Custom filtering and sorting logic
  const filteredRows = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    
    // First, filter by search query
    let items = sourceRows.filter((row) => {
      const matchesSearch =
        normalizedQuery.length === 0 ||
        (row.name ?? '').toLowerCase().includes(normalizedQuery) ||
        (row.description ?? '').toLowerCase().includes(normalizedQuery) ||
        (row.slug ?? '').toLowerCase().includes(normalizedQuery)
      return matchesSearch
    })

    // Second, apply filter chips
    if (activeFilter !== page.filters[0]) {
      if (activeFilter === copy.filterMostContent) {
        // Sort descending by number of courses
        items = [...items].sort((a, b) => {
          const aCount = parseInt((a.courses ?? '0').replace(/[^\d]/g, ''), 10) || 0
          const bCount = parseInt((b.courses ?? '0').replace(/[^\d]/g, ''), 10) || 0
          return bCount - aCount
        })
      } else {
        // Filter by status match
        items = items.filter((row) =>
          (row.status ?? '').toLowerCase() === activeFilter.toLowerCase()
        )
      }
    }

    return items
  }, [activeFilter, page.filters, query, sourceRows, copy.filterMostContent])

  const pageSize = 5
  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize))
  const visibleRows = filteredRows.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)

  function openAddDialog() {
    // Blank category row structure
    setEditingRow({
      name: '',
      slug: '',
      description: '',
      iconName: 'Folder',
      imageUrl: '',
      parentId: '',
      status: language === 'ar' ? 'منشور' : 'Published',
      courses: '0',
      lessons: '0',
      updated: '',
    })
    setEditingIndex(null)
  }

  function openEditDialog(row: Record<string, string>) {
    const originalIndex = sourceRows.indexOf(row)
    setEditingRow({ ...row })
    setEditingIndex(originalIndex)
  }

  function saveDialog() {
    if (!editingRow) return
    if (onSaveRow) {
      onSaveRow(editingRow, editingIndex)
    } else {
      if (editingIndex === null) {
        setRows((current) => [editingRow, ...current])
      } else {
        setRows((current) => current.map((row, index) => (index === editingIndex ? editingRow : row)))
      }
    }
    setEditingRow(null)
    setEditingIndex(null)
    setPageNumber(1)
  }

  function confirmDelete(row: Record<string, string>) {
    const originalIndex = sourceRows.indexOf(row)
    setDeletingIndex(originalIndex)
  }

  function executeDelete() {
    if (deletingIndex === null) return
    if (onDeleteRow) {
      onDeleteRow(deletingIndex)
    } else {
      setRows((current) => current.filter((_, idx) => idx !== deletingIndex))
    }
    setDeletingIndex(null)
    setPageNumber(1)
  }

  function toggleRowStatus(row: Record<string, string>) {
    const originalIndex = sourceRows.indexOf(row)
    if (onToggleRowStatus) {
      onToggleRowStatus(originalIndex, language)
    } else {
      const currentStatus = row.status || ''
      let nextStatus = 'منشور'
      if (currentStatus === 'منشور' || currentStatus === 'Published') {
        nextStatus = language === 'ar' ? 'مراجعة' : 'Review'
      } else if (currentStatus === 'مراجعة' || currentStatus === 'Review') {
        nextStatus = language === 'ar' ? 'مسودة' : 'Draft'
      } else {
        nextStatus = language === 'ar' ? 'منشور' : 'Published'
      }
      setRows((current) =>
        current.map((item, idx) => (idx === originalIndex ? { ...item, status: nextStatus } : item))
      )
    }
  }

  function exportRows() {
    const header = ['القسم', 'الرابط', 'الدورات', 'الدروس', 'الحالة', 'آخر تحديث'].join(',')
    const body = filteredRows
      .map((row) =>
        [row.name, row.slug, row.courses, row.lessons, row.status, row.updated]
          .map((value) => `"${(value ?? '').replaceAll('"', '""')}"`)
          .join(',')
      )
      .join('\n')
    const blob = new Blob([`\ufeff${header}\n${body}`], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${page.title.replaceAll(' ', '-')}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  // Handle closing modal on Escape key press
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setEditingRow(null)
        setDeletingIndex(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [editingRow, deletingIndex])

  return (
    <div className="admin-page" dir={dir}>
      <AdminManagementHero
        actionLabel={page.actionLabel}
        adminLabel={copy.admin}
        description={page.description}
        exportLabel={copy.export}
        onAdd={openAddDialog}
        onExport={exportRows}
        title={page.title}
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
                placeholder={page.searchPlaceholder}
                value={query}
              />
            </label>
            <div className="filter-chips">
              {page.filters.map((filter) => (
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
                  <th>{copy.slug}</th>
                  <th>{copy.courses}</th>
                  <th>{copy.lessons}</th>
                  <th>{copy.status}</th>
                  <th>{copy.updated}</th>
                  <th>{copy.actions}</th>
                </tr>
              </thead>
              <tbody>
                {visibleRows.map((row, index) => {
                  const sourceIndex = sourceRows.indexOf(row)
                  const IconComp = (Icons as any)[row.iconName || 'Folder'] || Icons.Folder
                  const parentCat = sourceRows.find((c) => c.slug === row.parentId)

                  return (
                    <tr key={`categories-${sourceIndex}-${index}`}>
                      <td>
                        <div className="table-category-cell-name">
                          <span className="table-category-icon-wrap" title={row.iconName}>
                            {row.imageUrl ? (
                              <img src={row.imageUrl} alt={row.name} style={{ width: '18px', height: '18px', objectFit: 'contain' }} />
                            ) : (
                              <IconComp size={18} />
                            )}
                          </span>
                          <div>
                            <span style={{ fontWeight: 700 }}>{row.name}</span>
                            {parentCat && (
                              <span style={{ fontSize: '11px', color: '#6b7280', display: 'block', marginTop: '2px' }}>
                                {language === 'ar' ? `فرعي من: ${parentCat.name}` : `Subcategory of: ${parentCat.name}`}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td>
                        <code style={{ background: 'var(--color-bg-200)', padding: '2px 6px', borderRadius: '4px', fontSize: '12px' }}>
                          {row.slug}
                        </code>
                      </td>
                      <td>{row.courses}</td>
                      <td>{row.lessons}</td>
                      <td>
                        <span
                          className={`table-status ${statusTone(row.status || '')}`}
                          style={{ cursor: 'pointer' }}
                          onClick={() => toggleRowStatus(row)}
                          title={copy.clickToToggle}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td style={{ fontSize: '13px', opacity: 0.8 }}>{row.updated}</td>
                      <td>
                        <div className="row-actions">
                          <Link
                            title={copy.open}
                            to={`/categories/${row.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Eye size={16} />
                          </Link>
                          <button onClick={() => openEditDialog(row)} title={copy.edit} type="button">
                            <Edit3 size={16} />
                          </button>
                          <button onClick={() => confirmDelete(row)} title={copy.delete} type="button" className="delete-action-btn">
                            <Trash2 size={16} style={{ color: '#ef4444' }} />
                          </button>
                          <button onClick={() => toggleRowStatus(row)} title={copy.clickToToggle} type="button">
                            <MoreHorizontal size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
                {visibleRows.length === 0 ? (
                  <tr>
                    <td colSpan={7}>
                      <div className="empty-state">{copy.empty}</div>
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>

          <footer className="table-footer">
            <span>
              {copy.showing} {filteredRows.length === 0 ? 0 : (pageNumber - 1) * pageSize + 1} {copy.to} {Math.min(pageNumber * pageSize, filteredRows.length)} {copy.of}{' '}
              {filteredRows.length} {copy.items}
            </span>
            <div>
              <button disabled={pageNumber === 1} onClick={() => setPageNumber(Math.max(1, pageNumber - 1))} type="button">
                {copy.previous}
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  className={pageNumber === index + 1 ? 'is-current' : ''}
                  key={index + 1}
                  onClick={() => setPageNumber(index + 1)}
                  type="button"
                >
                  {index + 1}
                </button>
              ))}
              <button disabled={pageNumber === totalPages} onClick={() => setPageNumber(Math.min(totalPages, pageNumber + 1))} type="button">
                {copy.next}
              </button>
            </div>
          </footer>
        </article>
      </section>

      {/* Editing Modal */}
      {editingRow ? (
        <AdminCategoryModal
          isAddMode={editingIndex === null}
          onChange={setEditingRow}
          onClose={() => {
            setEditingRow(null)
            setEditingIndex(null)
          }}
          onSave={saveDialog}
          row={editingRow}
          categoriesList={sourceRows}
        />
      ) : null}

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

function statusTone(value: string) {
  if (['منشور', 'Published', 'Faol', 'Фаол', 'Опубликовано'].includes(value)) {
    return 'is-good'
  }
  if (['مراجعة', 'Review', 'Ko‘rib chiqilmoqda', 'Кўриб чиқилмоқда', 'На проверке'].includes(value)) {
    return 'is-warn'
  }
  if (['مسودة', 'Draft', 'Loyiha', 'Лойиҳа', 'Черновик'].includes(value)) {
    return 'is-bad'
  }
  return 'is-neutral'
}

const pageCopy: Record<Language, Record<string, string>> = {
  ar: {
    admin: 'لوحة التحكم',
    export: 'تصدير',
    actions: 'الإجراءات',
    edit: 'تعديل القسم',
    delete: 'حذف القسم',
    open: 'معاينة في الموقع',
    showing: 'عرض',
    to: 'إلى',
    of: 'من أصل',
    items: 'تصنيفات',
    previous: 'السابق',
    next: 'التالي',
    insights: 'ملاحظات سريعة',
    notes: 'إرشادات العمل',
    empty: 'لا توجد نتائج مطابقة لتصنيفات الأرشيف',
    cancel: 'إلغاء',
    name: 'اسم القسم العلمي',
    slug: 'الرابط الخاص (Slug)',
    courses: 'الدورات المرتبطة',
    lessons: 'الدروس المرتبطة',
    status: 'الحالة',
    updated: 'آخر تحديث',
    clickToToggle: 'انقر لتغيير الحالة سريعاً',
    filterMostContent: 'الأكثر محتوى',
    confirmDeleteTitle: 'تأكيد حذف القسم',
    confirmDeleteText: 'هل أنت متأكد من حذف هذا القسم؟ سيتم قطع الروابط المباشرة في الموقع العام للطلاب، ولن يتم حذف الدروس والدورات المرتبطة به.',
    confirmDeleteBtn: 'حذف القسم الآن',
  },
  en: {
    admin: 'Admin Panel',
    export: 'Export',
    actions: 'Actions',
    edit: 'Edit Category',
    delete: 'Delete Category',
    open: 'Preview on Site',
    showing: 'Showing',
    to: 'to',
    of: 'of',
    items: 'categories',
    previous: 'Previous',
    next: 'Next',
    insights: 'Quick Insights',
    notes: 'Work Notes',
    empty: 'No matching categories found',
    cancel: 'Cancel',
    name: 'Scientific Category',
    slug: 'URL Slug',
    courses: 'Linked Courses',
    lessons: 'Linked Lessons',
    status: 'Status',
    updated: 'Last Updated',
    clickToToggle: 'Click to quickly toggle status',
    filterMostContent: 'Most Content',
    confirmDeleteTitle: 'Confirm Delete',
    confirmDeleteText: 'Are you sure you want to delete this category? The links in the public view will be broken, but associated lessons and courses will not be deleted.',
    confirmDeleteBtn: 'Delete Category',
  },
  uz: {
    admin: 'Boshqaruv paneli',
    export: 'Eksport',
    actions: 'Harakatlar',
    edit: 'Kategoriyani tahrirlash',
    delete: 'Kategoriyani o‘chirish',
    open: 'Saytda ko‘rish',
    showing: 'Ko‘rsatilmoqda',
    to: 'dan',
    of: 'gacha, jami:',
    items: 'ta kategoriya',
    previous: 'Oldingi',
    next: 'Keyingi',
    insights: 'Tezkor tahlillar',
    notes: 'Ishchi eslatmalar',
    empty: 'Kategoriyalar topilmadi',
    cancel: 'Bekor qilish',
    name: 'Kategoriya nomi',
    slug: 'Slug',
    courses: 'Kurslar soni',
    lessons: 'Darslar soni',
    status: 'Holati',
    updated: 'Oxirgi yangilanish',
    clickToToggle: 'Holatni tezkor almashtirish uchun bosing',
    filterMostContent: 'Ko‘p kontentli',
    confirmDeleteTitle: 'Kategoriyani o‘chirish',
    confirmDeleteText: 'Rostdan ham ushbu kategoriyani o‘chirmoqchimisiz?',
    confirmDeleteBtn: 'O‘chirish',
  },
  uzCyr: {
    admin: 'Бошқарув панели',
    export: 'Экспорт',
    actions: 'Ҳаракатлар',
    edit: 'Категорияни таҳрирлаш',
    delete: 'Категорияни ўчириш',
    open: 'Сайтда кўриш',
    showing: 'Кўрсатилмоқда',
    to: 'дан',
    of: 'гача, жами:',
    items: 'та категория',
    previous: 'Олдинги',
    next: 'Keyingi',
    insights: 'Тезкор таҳлиллар',
    notes: 'Ишчи эслатмалар',
    empty: 'Категориялар топилмади',
    cancel: 'Бекор қилиш',
    name: 'Категория номи',
    slug: 'Slug',
    courses: 'Курслар сони',
    lessons: 'Дарслар сони',
    status: 'Ҳолати',
    updated: 'Охирги янгиланиш',
    clickToToggle: 'Ҳолатни тезкор алмаштириш учун босинг',
    filterMostContent: 'Кўп контентли',
    confirmDeleteTitle: 'Категорияни ўчириш',
    confirmDeleteText: 'Ростдан ҳам ушбу категорияни ўчирмоқчимисиз?',
    confirmDeleteBtn: 'Ўчириш',
  },
  ru: {
    admin: 'Панель управления',
    export: 'Экспорт',
    actions: 'Действия',
    edit: 'Редактировать категорию',
    delete: 'Удалить категорию',
    open: 'Предпросмотр на сайте',
    showing: 'Показано',
    to: 'с',
    of: 'из',
    items: 'категорий',
    previous: 'Назад',
    next: 'Вперед',
    insights: 'Аналитика',
    notes: 'Рабочие заметки',
    empty: 'Категории не найдены',
    cancel: 'Отмена',
    name: 'Категория',
    slug: 'Slug',
    courses: 'Курсы',
    lessons: 'Уроки',
    status: 'Статус',
    updated: 'Обновлено',
    clickToToggle: 'Нажмите для быстрого изменения статуса',
    filterMostContent: 'Больше всего контента',
    confirmDeleteTitle: 'Подтвердите удаление',
    confirmDeleteText: 'Вы уверены, что хотите удалить эту категорию? Связи на публичном сайте будут нарушены, но сами уроки и курсы не удалятся.',
    confirmDeleteBtn: 'Удалить категорию',
  },
}
