import { Link } from 'react-router-dom'
import { Edit3, Eye, MoreHorizontal, Search, Trash2 } from 'lucide-react'
import type { AdminTableColumn, AdminTableRow } from '../../data/adminSeed'

type ManagementCopy = Record<string, string>

type AdminManagementTableProps = {
  activeFilter: string
  columns: AdminTableColumn[]
  copy: ManagementCopy
  filteredRows: AdminTableRow[]
  filters: string[]
  getRowHref?: (row: AdminTableRow, index: number) => string
  pageNumber: number
  pageSize: number
  query: string
  searchPlaceholder: string
  sourceRows: AdminTableRow[]
  title: string
  totalPages: number
  visibleRows: AdminTableRow[]
  onDeleteRow: (row: AdminTableRow, index: number) => void
  onEditRow: (row: AdminTableRow) => void
  onFilterChange: (filter: string) => void
  onPageChange: (page: number) => void
  onQueryChange: (query: string) => void
  onToggleRowStatus: (row: AdminTableRow, index: number) => void
}

export function AdminManagementTable({
  activeFilter,
  columns,
  copy,
  filteredRows,
  filters,
  getRowHref,
  onDeleteRow,
  onEditRow,
  onFilterChange,
  onPageChange,
  onQueryChange,
  onToggleRowStatus,
  pageNumber,
  pageSize,
  query,
  searchPlaceholder,
  sourceRows,
  title,
  totalPages,
  visibleRows,
}: AdminManagementTableProps) {
  return (
    <article className="admin-panel table-panel">
      <div className="filter-toolbar">
        <label className="admin-search">
          <Search size={18} />
          <input onChange={(event) => onQueryChange(event.target.value)} placeholder={searchPlaceholder} value={query} />
        </label>
        <div className="filter-chips">
          {filters.map((filter) => (
            <button className={activeFilter === filter ? 'is-active' : ''} key={filter} onClick={() => onFilterChange(filter)} type="button">
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-data-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key}>{column.label}</th>
              ))}
              <th>{copy.actions}</th>
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row, index) => {
              const sourceIndex = sourceRows.indexOf(row)
              return (
                <tr key={`${title}-${sourceIndex}-${index}`}>
                  {columns.map((column) => (
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
                        <Link title={copy.open} to={getRowHref(row, sourceIndex)}>
                          <Eye size={16} />
                        </Link>
                      ) : null}
                      <button onClick={() => onEditRow(row)} title={copy.edit} type="button">
                        <Edit3 size={16} />
                      </button>
                      <button onClick={() => onDeleteRow(row, sourceIndex)} title={copy.delete} type="button">
                        <Trash2 size={16} />
                      </button>
                      <button onClick={() => onToggleRowStatus(row, sourceIndex)} title={copy.more} type="button">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
            {visibleRows.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1}>
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
          <button disabled={pageNumber === 1} onClick={() => onPageChange(Math.max(1, pageNumber - 1))} type="button">
            {copy.previous}
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button className={pageNumber === index + 1 ? 'is-current' : ''} key={index + 1} onClick={() => onPageChange(index + 1)} type="button">
              {index + 1}
            </button>
          ))}
          <button disabled={pageNumber === totalPages} onClick={() => onPageChange(Math.min(totalPages, pageNumber + 1))} type="button">
            {copy.next}
          </button>
        </div>
      </footer>
    </article>
  )
}

function isStatusColumn(key: string) {
  return key === 'status' || key === 'file'
}

function statusTone(value: string) {
  if (
    [
      'منشور',
      'مكتمل',
      'مفعل',
      'جاهز',
      'PDF',
      'تم الاستيراد',
      'مفهرس',
      'Published',
      'Faol',
      'Фаол',
      'Опубликовано',
      'Chop etilgan',
      'Чоп этилган',
      'Import qilingan',
      'Импорт қилинган',
      'Импортировано',
    ].includes(value)
  ) {
    return 'is-good'
  }
  if (
    [
      'مراجعة',
      'قيد المعالجة',
      'يحتاج مراجعة',
      'بانتظار رد',
      'ناقص',
      'Review',
      'Ko‘rib chiqilmoqda',
      'Кўриб чиқилмоқда',
      'На проверке',
      'Ishlanmoqda',
      'Ишланмоқда',
      'В обработке',
    ].includes(value)
  ) {
    return 'is-warn'
  }
  if (['مسودة', 'ناقص', 'فشل', 'حرج', 'Draft', 'Missing', 'Xato', 'Хато', 'Ошибка', 'Loyiha', 'Лойиҳа', 'Черновик'].includes(value)) {
    return 'is-bad'
  }
  return 'is-neutral'
}
