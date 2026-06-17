import { Search } from 'lucide-react'

type ScholarsFilterCardProps = {
  allLabel: string
  field: string
  fieldLabel: string
  fields: string[]
  search: string
  searchPlaceholder: string
  onFieldChange: (value: string) => void
  onSearchChange: (value: string) => void
}

export function ScholarsFilterCard({
  allLabel,
  field,
  fieldLabel,
  fields,
  onFieldChange,
  onSearchChange,
  search,
  searchPlaceholder,
}: ScholarsFilterCardProps) {
  return (
    <div className="scholars-filter-card">
      <label className="scholars-search">
        <Search size={19} />
        <input onChange={(event) => onSearchChange(event.target.value)} placeholder={searchPlaceholder} value={search} />
      </label>
      <label>
        <span>{fieldLabel}</span>
        <select onChange={(event) => onFieldChange(event.target.value)} value={field}>
          <option value="">{allLabel}</option>
          {fields.map((value) => (
            <option key={value}>{value}</option>
          ))}
        </select>
      </label>
    </div>
  )
}
