import { Link } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { Download, Edit3, Eye, MoreHorizontal, Plus, Search, Trash2 } from 'lucide-react'
import { useLanguage, type Language } from '../../context/LanguageContext'
import type { AdminPageSeed } from '../../data/adminSeed'

type AdminManagementPageProps = {
  page: AdminPageSeed
  getRowHref?: (row: Record<string, string>, index: number) => string
  rowsOverride?: Record<string, string>[]
  onSaveRow?: (row: Record<string, string>, index: number | null) => void
  onDeleteRow?: (index: number) => void
  onToggleRowStatus?: (index: number, language: Language) => void
}

export function AdminManagementPage({ page, getRowHref, onDeleteRow, onSaveRow, onToggleRowStatus, rowsOverride }: AdminManagementPageProps) {
  const { language } = useLanguage()
  const copy = managementCopy[language]
  const [rows, setRows] = useState(page.rows)
  const sourceRows = rowsOverride ?? rows
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState(page.filters[0] ?? '')
  const [pageNumber, setPageNumber] = useState(1)
  const [editingRow, setEditingRow] = useState<Record<string, string> | null>(null)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)

  const filteredRows = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return sourceRows.filter((row) => {
      const matchesSearch =
        normalizedQuery.length === 0 ||
        Object.values(row).some((value) => value.toLowerCase().includes(normalizedQuery))
      const matchesFilter =
        activeFilter === page.filters[0] ||
        Object.values(row).some((value) => value.toLowerCase().includes(activeFilter.toLowerCase()))
      return matchesSearch && matchesFilter
    })
  }, [activeFilter, page.filters, query, sourceRows])

  const pageSize = 5
  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize))
  const visibleRows = filteredRows.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)

  function openAddDialog() {
    const blankRow = Object.fromEntries(page.columns.map((column) => [column.key, '']))
    setEditingRow(blankRow)
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

  function deleteRow(row: Record<string, string>, index: number) {
    if (onDeleteRow) {
      onDeleteRow(index)
      return
    }
    setRows((current) => current.filter((item) => item !== row))
  }

  function toggleRowStatus(row: Record<string, string>, index: number) {
    if (onToggleRowStatus) {
      onToggleRowStatus(index, language)
      return
    }
    if (!row.status) return
    const nextStatus = nextStatusValue(row.status, language)
    setRows((current) => current.map((item) => (item === row ? { ...item, status: nextStatus } : item)))
  }

  function exportRows() {
    const header = page.columns.map((column) => column.label).join(',')
    const body = filteredRows
      .map((row) =>
        page.columns
          .map((column) => `"${(row[column.key] ?? '').replaceAll('"', '""')}"`)
          .join(','),
      )
      .join('\n')
    const blob = new Blob([`${header}\n${body}`], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${page.title.replaceAll(' ', '-')}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && editingRow) {
        setEditingRow(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [editingRow])

  return (
    <div className="admin-page">
      <section className="management-hero">
        <div>
          <span>{copy.admin}</span>
          <h2>{page.title}</h2>
          <p>{page.description}</p>
        </div>
        <div className="management-hero__actions">
          <button onClick={exportRows} type="button">
            <Download size={17} />
            {copy.export}
          </button>
          <button className="gold-button" onClick={openAddDialog} type="button">
            <Plus size={17} />
            {page.actionLabel}
          </button>
        </div>
      </section>

      <section className="stats-grid stats-grid--compact" aria-label={`ملخص ${page.title}`}>
        {page.stats.map((stat) => {
          const Icon = stat.icon
          return (
            <article className={`stat-card tone-${stat.tone}`} key={stat.label}>
              <span className="stat-icon">
                <Icon size={22} />
              </span>
              <div>
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
                <small>{stat.change}</small>
              </div>
            </article>
          )
        })}
      </section>

      <section className="management-layout">
        <article className="admin-panel table-panel">
          <div className="filter-toolbar">
            <label className="admin-search">
              <Search size={18} />
              <input onChange={(event) => setQuery(event.target.value)} placeholder={page.searchPlaceholder} value={query} />
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
                  {page.columns.map((column) => (
                    <th key={column.key}>{column.label}</th>
                  ))}
                  <th>{copy.actions}</th>
                </tr>
              </thead>
              <tbody>
                {visibleRows.map((row, index) => (
                  <tr key={`${page.title}-${index}`}>
                    {page.columns.map((column) => (
                      <td key={column.key}>
                        {column.key === 'image' ? (
                          <img className="table-avatar" alt={row.name ?? copy.imageAlt} src={row[column.key]} />
                        ) : isStatusColumn(column.key) ? (
                          <span className={`table-status ${statusTone(row[column.key])}`}>{row[column.key]}</span>
                        ) : (
                          row[column.key]
                        )}
                      </td>
                    ))}
                    <td>
                      <div className="row-actions">
                        {getRowHref ? (
                          <Link title={copy.open} to={getRowHref(row, sourceRows.indexOf(row))}>
                            <Eye size={16} />
                          </Link>
                        ) : null}
                        <button onClick={() => openEditDialog(row)} title={copy.edit} type="button">
                          <Edit3 size={16} />
                        </button>
                        <button onClick={() => deleteRow(row, sourceRows.indexOf(row))} title={copy.delete} type="button">
                          <Trash2 size={16} />
                        </button>
                        <button onClick={() => toggleRowStatus(row, sourceRows.indexOf(row))} title={copy.more} type="button">
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {visibleRows.length === 0 ? (
                  <tr>
                    <td colSpan={page.columns.length + 1}>
                      <div className="empty-state">{copy.empty}</div>
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>

          <footer className="table-footer">
            <span>
              {copy.showing} {filteredRows.length === 0 ? 0 : (pageNumber - 1) * pageSize + 1} {copy.to}{' '}
              {Math.min(pageNumber * pageSize, filteredRows.length)} {copy.of} {filteredRows.length} {copy.items}
            </span>
            <div>
              <button disabled={pageNumber === 1} onClick={() => setPageNumber((current) => Math.max(1, current - 1))} type="button">
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
              <button disabled={pageNumber === totalPages} onClick={() => setPageNumber((current) => Math.min(totalPages, current + 1))} type="button">
                {copy.next}
              </button>
            </div>
          </footer>
        </article>

        <aside className="management-side">
          <article className="admin-panel">
            <div className="admin-panel__header">
              <h2>{copy.insights}</h2>
            </div>
            <div className="note-list">
              {page.insights.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </article>

          <article className="admin-panel">
            <div className="admin-panel__header">
              <h2>{copy.notes}</h2>
            </div>
            <div className="work-notes">
              {page.notes.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>
        </aside>
      </section>

      {editingRow ? (
        <div className="modal-backdrop" role="presentation">
          <section className="admin-modal" role="dialog" aria-modal="true" aria-label={editingIndex === null ? page.actionLabel : copy.edit}>
            <header>
              <h2>{editingIndex === null ? page.actionLabel : copy.edit}</h2>
              <button onClick={() => setEditingRow(null)} type="button">
                ×
              </button>
            </header>
            <div className="modal-form">
              {page.columns.map((column) => (
                <label className={column.key === 'image' ? 'image-field' : ''} key={column.key}>
                  {column.label}
                  {column.key === 'image' ? (
                    <img className="image-preview" alt={editingRow.name ?? copy.imageAlt} src={editingRow[column.key] || 'https://i.pravatar.cc/96?img=1'} />
                  ) : null}
                  <input
                    onChange={(event) => setEditingRow((current) => (current ? { ...current, [column.key]: event.target.value } : current))}
                    placeholder={column.key === 'image' ? copy.imagePlaceholder : undefined}
                    value={editingRow[column.key] ?? ''}
                  />
                </label>
              ))}
            </div>
            <footer>
              <button onClick={() => setEditingRow(null)} type="button">
                {copy.cancel}
              </button>
              <button className="gold-button" onClick={saveDialog} type="button">
                {copy.save}
              </button>
            </footer>
          </section>
        </div>
      ) : null}
    </div>
  )
}

function isStatusColumn(key: string) {
  return key === 'status' || key === 'file'
}

function nextStatusValue(status: string, language: Language) {
  const arabic = ['منشور', 'مراجعة', 'مسودة']
  const english = ['Published', 'Review', 'Draft']
  const uzbek = ['Faol', 'Ko‘rib chiqilmoqda', 'Loyiha']
  const uzbekCyr = ['Фаол', 'Кўриб чиқилмоқда', 'Лойиҳа']
  const russian = ['Опубликовано', 'На проверке', 'Черновик']

  let statuses = english
  if (language === 'ar') statuses = arabic
  else if (language === 'uz') statuses = uzbek
  else if (language === 'uzCyr') statuses = uzbekCyr
  else if (language === 'ru') statuses = russian

  const index = statuses.indexOf(status)
  return statuses[index === -1 ? 0 : (index + 1) % statuses.length]
}

function statusTone(value: string) {
  if (['منشور', 'مكتمل', 'مفعل', 'جاهز', 'PDF', 'تم الاستيراد', 'مفهرس', 'Published', 'Faol', 'Фаол', 'Опубликовано', 'Chop etilgan', 'Чоп этилган', 'Import qilingan', 'Импорт қилинган', 'Импортировано'].includes(value)) {
    return 'is-good'
  }
  if (['مراجعة', 'قيد المعالجة', 'يحتاج مراجعة', 'بانتظار رد', 'ناقص', 'Review', 'Ko‘rib chiqilmoqda', 'Кўриб чиқилмоқда', 'На проверке', 'Ishlanmoqda', 'Ишланмоқда', 'В обработке'].includes(value)) {
    return 'is-warn'
  }
  if (['مسودة', 'ناقص', 'فشل', 'حرج', 'Draft', 'Missing', 'Xato', 'Хато', 'Ошибка', 'Loyiha', 'Лойиҳа', 'Черновик'].includes(value)) {
    return 'is-bad'
  }
  return 'is-neutral'
}

const managementCopy: Record<Language, Record<string, string>> = {
  ar: {
    admin: 'لوحة التحكم',
    export: 'تصدير',
    filters: 'الفلاتر',
    actions: 'الإجراءات',
    edit: 'تعديل',
    delete: 'حذف',
    more: 'المزيد',
    open: 'فتح',
    showing: 'عرض',
    to: 'إلى',
    of: 'من أصل',
    items: 'عنصر',
    previous: 'السابق',
    next: 'التالي',
    insights: 'ملاحظات سريعة',
    notes: 'إرشادات العمل',
    empty: 'لا توجد نتائج مطابقة',
    cancel: 'إلغاء',
    save: 'حفظ',
    imageAlt: 'صورة العالم',
    imagePlaceholder: 'رابط الصورة...',
  },
  en: {
    admin: 'Admin Panel',
    export: 'Export',
    filters: 'Filters',
    actions: 'Actions',
    edit: 'Edit',
    delete: 'Delete',
    more: 'More',
    open: 'Open',
    showing: 'Showing',
    to: 'to',
    of: 'of',
    items: 'items',
    previous: 'Previous',
    next: 'Next',
    insights: 'Quick Insights',
    notes: 'Work Notes',
    empty: 'No matching results',
    cancel: 'Cancel',
    save: 'Save',
    imageAlt: 'Scholar photo',
    imagePlaceholder: 'Image URL...',
  },
  uz: {
    admin: 'Boshqaruv paneli',
    export: 'Eksport',
    filters: 'Filtrlar',
    actions: 'Harakatlar',
    edit: 'Tahrirlash',
    delete: 'O‘chirish',
    more: 'Batafsil',
    open: 'Ochish',
    showing: 'Ko‘rsatilmoqda',
    to: 'dan',
    of: 'gacha, jami:',
    items: 'ta',
    previous: 'Oldingi',
    next: 'Keyingi',
    insights: 'Tezkor tahlillar',
    notes: 'Ishchi eslatmalar',
    empty: 'Natija topilmadi',
    cancel: 'Bekor qilish',
    save: 'Saqlash',
    imageAlt: 'Rasm',
    imagePlaceholder: 'Rasm havolasi...',
  },
  uzCyr: {
    admin: 'Бошқарув панели',
    export: 'Экспорт',
    filters: 'Филтрлар',
    actions: 'Ҳаракатлар',
    edit: 'Таҳрирлаш',
    delete: 'Ўчириш',
    more: 'Батафсил',
    open: 'Очиш',
    showing: 'Кўрсатилмоқда',
    to: 'дан',
    of: 'гача, жами:',
    items: 'та',
    previous: 'Олдинги',
    next: 'Кейинги',
    insights: 'Тезкор таҳлиллар',
    notes: 'Ишчи эслатмалар',
    empty: 'Натижа топилмади',
    cancel: 'Бекор қилиш',
    save: 'Сақлаш',
    imageAlt: 'Расм',
    imagePlaceholder: 'Расм ҳаволаси...',
  },
  ru: {
    admin: 'Панель управления',
    export: 'Экспорт',
    filters: 'Фильтры',
    actions: 'Действия',
    edit: 'Редактировать',
    delete: 'Удалить',
    more: 'Еще',
    open: 'Открыть',
    showing: 'Показано',
    to: 'с',
    of: 'из',
    items: 'записей',
    previous: 'Назад',
    next: 'Вперед',
    insights: 'Аналитика',
    notes: 'Рабочие заметки',
    empty: 'Совпадений не найдено',
    cancel: 'Отмена',
    save: 'Сохранить',
    imageAlt: 'Фото',
    imagePlaceholder: 'Ссылка на изображение...',
  },
}
