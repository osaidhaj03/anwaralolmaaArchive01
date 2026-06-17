import { useState } from 'react'
import { Languages, LogIn, Menu, Moon, Search, Sun, type LucideIcon } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
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

export function PublicHeader({ activeTo, brand, languageLabel, login, nav, searchLabel, subtitle, themeLabel }: PublicHeaderProps) {
  const { language, setLanguage } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const nextLanguage: Language = language === 'ar' ? 'en' : 'ar'
  const [menuOpen, setMenuOpen] = useState(false)
  const [headerSearch, setHeaderSearch] = useState('')
  const navigate = useNavigate()

  function handleHeaderSearchSubmit(e: React.FormEvent) {
    e.preventDefault()
    const query = headerSearch.trim()
    navigate(query ? `/search?q=${encodeURIComponent(query)}` : '/search')
  }

  return (
    <header className="public-header">
      <div className="public-container public-header__inner">
        <Link className="public-brand" to="/">
          <BrandMark />
          <div>
            <strong>{brand}</strong>
            <span>{subtitle}</span>
          </div>
        </Link>

        {activeTo === '/' && (
          <form className="public-header-mobile-search" onSubmit={handleHeaderSearchSubmit}>
            <Search size={15} />
            <input
              type="text"
              value={headerSearch}
              onChange={(e) => setHeaderSearch(e.target.value)}
              placeholder={language === 'ar' ? 'بحث...' : 'Search...'}
            />
          </form>
        )}

        <nav className="public-nav" aria-label="Site links">
          {nav.map((item) => {
            const Icon = item.icon
            return (
              <Link className={item.to === activeTo ? 'is-active' : ''} key={item.to} to={item.to}>
                <Icon size={17} />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <HeaderActions
          language={language}
          languageLabel={languageLabel}
          login={login}
          nextLanguage={nextLanguage}
          searchLabel={searchLabel}
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
              {nav.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    className={item.to === activeTo ? 'is-active' : ''}
                    key={item.to}
                    to={item.to}
                    onClick={() => setMenuOpen(false)}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </nav>
            <HeaderActions
              language={language}
              languageLabel={languageLabel}
              login={login}
              nextLanguage={nextLanguage}
              onActionClick={() => setMenuOpen(false)}
              searchLabel={searchLabel}
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
  languageLabel,
  login,
  nextLanguage,
  onActionClick,
  searchLabel,
  setLanguage,
  theme,
  themeLabel,
  toggleTheme,
}: {
  language: Language
  languageLabel: string
  login: string
  nextLanguage: Language
  onActionClick?: () => void
  searchLabel: string
  setLanguage: (language: Language) => void
  theme: 'light' | 'dark'
  themeLabel: string
  toggleTheme: () => void
}) {
  return (
    <div className="public-actions">
      <Link className="public-icon-button" to="/search" aria-label={searchLabel} onClick={onActionClick}>
        <Search size={19} />
      </Link>
      <button className="public-icon-button" onClick={toggleTheme} type="button" aria-label={themeLabel}>
        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
      </button>
      <div className="public-language-select-wrap">
        <Languages size={17} />
        <select value={language} onChange={(e) => setLanguage(e.target.value as Language)}>
          <option value="ar">العربية</option>
          <option value="uz">O'zbekcha</option>
          <option value="uzCyr">Ўзбекча</option>
          <option value="ru">Русский</option>
          <option value="en">English</option>
        </select>
      </div>
      <Link className="login-button" to="/login" onClick={onActionClick}>
        <LogIn size={17} />
        {login}
      </Link>
    </div>
  )
}
