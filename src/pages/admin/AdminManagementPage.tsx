import { useEffect, useMemo, useState } from 'react'
import { AdminManagementHero } from '../../components/admin/AdminManagementHero'
import { AdminManagementModal } from '../../components/admin/AdminManagementModal'
import { AdminManagementSidePanels } from '../../components/admin/AdminManagementSidePanels'
import { AdminManagementStats } from '../../components/admin/AdminManagementStats'
import { AdminManagementTable } from '../../components/admin/AdminManagementTable'
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
      <AdminManagementHero actionLabel={page.actionLabel} adminLabel={copy.admin} description={page.description} exportLabel={copy.export} onAdd={openAddDialog} onExport={exportRows} title={page.title} />

      <AdminManagementStats stats={page.stats} title={page.title} />

      <section className="management-layout">
        <AdminManagementTable
          activeFilter={activeFilter}
          columns={page.columns}
          copy={copy}
          filteredRows={filteredRows}
          filters={page.filters}
          getRowHref={getRowHref}
          onDeleteRow={deleteRow}
          onEditRow={openEditDialog}
          onFilterChange={(filter) => {
            setActiveFilter(filter)
            setPageNumber(1)
          }}
          onPageChange={setPageNumber}
          onQueryChange={setQuery}
          onToggleRowStatus={toggleRowStatus}
          pageNumber={pageNumber}
          pageSize={pageSize}
          query={query}
          searchPlaceholder={page.searchPlaceholder}
          sourceRows={sourceRows}
          title={page.title}
          totalPages={totalPages}
          visibleRows={visibleRows}
        />

        <AdminManagementSidePanels insights={page.insights} insightsTitle={copy.insights} notes={page.notes} notesTitle={copy.notes} />
      </section>

      {editingRow ? (
        <AdminManagementModal
          cancelLabel={copy.cancel}
          columns={page.columns}
          imageAlt={copy.imageAlt}
          imagePlaceholder={copy.imagePlaceholder}
          isAddMode={editingIndex === null}
          onChange={setEditingRow}
          onClose={() => setEditingRow(null)}
          onSave={saveDialog}
          row={editingRow}
          saveLabel={copy.save}
          title={editingIndex === null ? page.actionLabel : copy.edit}
        />
      ) : null}
    </div>
  )
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
