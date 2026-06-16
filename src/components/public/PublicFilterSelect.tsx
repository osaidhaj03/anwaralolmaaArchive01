type PublicFilterSelectProps = {
  allLabel: string
  label: string
  onChange: (value: string) => void
  options: string[]
  value: string
}

export function PublicFilterSelect({ allLabel, label, onChange, options, value }: PublicFilterSelectProps) {
  return (
    <label>
      <span>{label}</span>
      <select onChange={(event) => onChange(event.target.value)} value={value}>
        <option value="">{allLabel}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  )
}
