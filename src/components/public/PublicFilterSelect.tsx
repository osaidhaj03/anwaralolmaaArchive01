import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

type PublicFilterSelectProps = {
  allLabel: string
  label: string
  onChange: (value: string) => void
  options: string[]
  value: string
}

export function PublicFilterSelect({ allLabel, label, onChange, options, value }: PublicFilterSelectProps) {
  const [isOpen, setIsOpen] = useState(false)

  const activeLabel = value || allLabel

  return (
    <div className="public-filter-select-container">
      <span className="public-filter-select-label">{label}</span>
      <div className="public-filter-dropdown-wrap">
        <button
          type="button"
          className={`public-filter-dropdown-trigger ${isOpen ? 'is-active' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{activeLabel}</span>
          <ChevronDown size={16} className={`chevron-down-icon ${isOpen ? 'is-open' : ''}`} />
        </button>

        {isOpen && (
          <>
            <div className="public-filter-dropdown-backdrop" onClick={() => setIsOpen(false)} />
            <div className="public-filter-dropdown-menu">
              <button
                type="button"
                className={value === '' ? 'is-selected' : ''}
                onClick={() => {
                  onChange('')
                  setIsOpen(false)
                }}
              >
                {allLabel}
              </button>
              {options.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={value === option ? 'is-selected' : ''}
                  onClick={() => {
                    onChange(option)
                    setIsOpen(false)
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
