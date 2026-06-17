import { Search } from 'lucide-react'

type ScholarsFilterCardProps = {
  allLabel: string
  countries: string[]
  country: string
  countryLabel: string
  field: string
  fieldLabel: string
  fields: string[]
  search: string
  searchPlaceholder: string
  onCountryChange: (value: string) => void
  onFieldChange: (value: string) => void
  onSearchChange: (value: string) => void
}

export function ScholarsFilterCard({
  allLabel,
  countries,
  country,
  countryLabel,
  field,
  fieldLabel,
  fields,
  onCountryChange,
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
      <label>
        <span>{countryLabel}</span>
        <select onChange={(event) => onCountryChange(event.target.value)} value={country}>
          <option value="">{allLabel}</option>
          {countries.map((value) => (
            <option key={value}>{value}</option>
          ))}
        </select>
      </label>
    </div>
  )
}
