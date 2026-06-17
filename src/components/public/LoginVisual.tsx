import { useState } from 'react'
import { ChevronDown, Languages, Moon, Sun } from 'lucide-react'
import type { Language } from '../../context/LanguageContext'
import type { Theme } from '../../context/ThemeContext'

type LoginVisualProps = {
  copy: Record<string, string>
  language: Language
  theme: Theme
  onLanguageChange: (language: Language) => void
  onThemeToggle: () => void
}

function getLanguageLabel(lang: Language) {
  switch (lang) {
    case 'ar': return 'العربية'
    case 'uz': return 'O\'zbekcha'
    case 'uzCyr': return 'Ўзбекча'
    case 'ru': return 'Русский'
    case 'en': return 'English'
    default: return ''
  }
}

export function LoginVisual({ copy, language, onLanguageChange, onThemeToggle, theme }: LoginVisualProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const imageSrc = theme === 'dark'
    ? '/Login page/Dark background.png'
    : '/Login page/Light background.png'

  return (
    <section className="login-visual">
      <div className="login-language">
        <button aria-label="Toggle dark mode" onClick={onThemeToggle} type="button" className="login-theme-toggle-btn">
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        
        <div className="public-language-dropdown-container">
          <button
            className="public-language-select-wrap"
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <Languages size={17} />
            <span className="selected-lang-label">{getLanguageLabel(language)}</span>
            <ChevronDown size={14} className={`chevron-down-icon ${dropdownOpen ? 'is-open' : ''}`} />
          </button>

          {dropdownOpen && (
            <>
              <div className="public-language-dropdown-backdrop" onClick={() => setDropdownOpen(false)} />
              <div className="public-language-dropdown-menu">
                <button
                  type="button"
                  className={language === 'ar' ? 'is-active' : ''}
                  onClick={() => {
                    onLanguageChange('ar')
                    setDropdownOpen(false)
                  }}
                >
                  العربية
                </button>
                <button
                  type="button"
                  className={language === 'uz' ? 'is-active' : ''}
                  onClick={() => {
                    onLanguageChange('uz')
                    setDropdownOpen(false)
                  }}
                >
                  O'zbekcha
                </button>
                <button
                  type="button"
                  className={language === 'uzCyr' ? 'is-active' : ''}
                  onClick={() => {
                    onLanguageChange('uzCyr')
                    setDropdownOpen(false)
                  }}
                >
                  Ўзбекча
                </button>
                <button
                  type="button"
                  className={language === 'ru' ? 'is-active' : ''}
                  onClick={() => {
                    onLanguageChange('ru')
                    setDropdownOpen(false)
                  }}
                >
                  Русский
                </button>
                <button
                  type="button"
                  className={language === 'en' ? 'is-active' : ''}
                  onClick={() => {
                    onLanguageChange('en')
                    setDropdownOpen(false)
                  }}
                >
                  English
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="login-arch">
        <img alt={copy.brand} src={imageSrc} />
      </div>

    </section>
  )
}
