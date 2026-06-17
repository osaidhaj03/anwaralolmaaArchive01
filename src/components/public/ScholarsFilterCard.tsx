import { Search } from 'lucide-react'
import { PublicFilterSelect } from './PublicFilterSelect'

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
      <PublicFilterSelect
        allLabel={allLabel}
        label={fieldLabel}
        onChange={onFieldChange}
        options={fields}
        value={field}
      />
    </div>
  )
}
