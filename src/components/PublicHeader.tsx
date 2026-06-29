import { useState } from 'react'
import { Languages, Menu, Moon, Sun, type LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { BrandMark } from './AdminIcons'
import { useLanguage, type Language } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'

export type PublicNavItem = {
  label: string
  to: string
  icon: LucideIcon
}

type PublicHeaderProps = {
  activeTo?: string
  brand: string
  languageLabel: string
  login: string
  nav: PublicNavItem[]
  searchLabel: string
  subtitle: string
  themeLabel: string
}

export function PublicHeader({ activeTo, brand, login, nav, themeLabel }: PublicHeaderProps) {
  const { language, setLanguage } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="public-header">
      <div className="public-container public-header__inner">
        <Link aria-label={brand} className="public-brand" to="/">
          <BrandMark />
        </Link>

        <nav className="public-nav" aria-label="Site links">
          {nav.map((item) => (
            <Link className={item.to === activeTo ? 'is-active' : ''} key={item.to} to={item.to}>
              {item.label}
            </Link>
          ))}
        </nav>

        <HeaderActions
          language={language}
          login={login}
          setLanguage={setLanguage}
          theme={theme}
          themeLabel={themeLabel}
          toggleTheme={toggleTheme}
        />

        <details
          className="public-mobile-menu"
          open={menuOpen}
          onToggle={(event) => setMenuOpen((event.target as HTMLDetailsElement).open)}
        >
          <summary
            aria-label="Open menu"
            onClick={(event) => {
              event.preventDefault()
              setMenuOpen(!menuOpen)
            }}
          >
            <Menu size={22} />
          </summary>
          <div className="public-mobile-menu__panel">
            <nav aria-label="Mobile site links">
              {nav.map((item) => (
                <Link
                  className={item.to === activeTo ? 'is-active' : ''}
                  key={item.to}
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <HeaderActions
              language={language}
              login={login}
              onActionClick={() => setMenuOpen(false)}
              setLanguage={setLanguage}
              theme={theme}
              themeLabel={themeLabel}
              toggleTheme={toggleTheme}
            />
          </div>
        </details>
      </div>
    </header>
  )
}

function HeaderActions({
  language,
  login,
  onActionClick,
  setLanguage,
  theme,
  themeLabel,
  toggleTheme,
}: {
  language: Language
  login: string
  onActionClick?: () => void
  setLanguage: (language: Language) => void
  theme: 'light' | 'dark'
  themeLabel: string
  toggleTheme: () => void
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <div className="public-actions">
      <button className="public-icon-button" onClick={toggleTheme} type="button" aria-label={themeLabel}>
        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      <div className="public-language-dropdown-container">
        <button
          aria-label={getLanguageLabel(language)}
          className="public-language-select-wrap public-language-icon-only"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          type="button"
        >
          <Languages size={18} />
        </button>

        {dropdownOpen && (
          <>
            <div className="public-language-dropdown-backdrop" onClick={() => setDropdownOpen(false)} />
            <div className="public-language-dropdown-menu">
              <button
                className={language === 'ar' ? 'is-active' : ''}
                onClick={() => {
                  setLanguage('ar')
                  setDropdownOpen(false)
                }}
                type="button"
              >
                العربية
              </button>
              <button
                className={language === 'uz' ? 'is-active' : ''}
                onClick={() => {
                  setLanguage('uz')
                  setDropdownOpen(false)
                }}
                type="button"
              >
                O'zbekcha
              </button>
              <button
                className={language === 'uzCyr' ? 'is-active' : ''}
                onClick={() => {
                  setLanguage('uzCyr')
                  setDropdownOpen(false)
                }}
                type="button"
              >
                O'zbekcha Cyrillic
              </button>
              <button
                className={language === 'ru' ? 'is-active' : ''}
                onClick={() => {
                  setLanguage('ru')
                  setDropdownOpen(false)
                }}
                type="button"
              >
                Русский
              </button>
              <button
                className={language === 'en' ? 'is-active' : ''}
                onClick={() => {
                  setLanguage('en')
                  setDropdownOpen(false)
                }}
                type="button"
              >
                English
              </button>
            </div>
          </>
        )}
      </div>

      <Link className="login-button" to="/login" onClick={onActionClick}>
        {login}
      </Link>
    </div>
  )
}

function getLanguageLabel(lang: Language) {
  switch (lang) {
    case 'ar':
      return 'العربية'
    case 'uz':
      return "O'zbekcha"
    case 'uzCyr':
      return "O'zbekcha Cyrillic"
    case 'ru':
      return 'Русский'
    case 'en':
      return 'English'
    default:
      return ''
  }
}
