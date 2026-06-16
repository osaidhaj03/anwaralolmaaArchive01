import { Languages, LogIn, Menu, Moon, Search, Sun, type LucideIcon } from 'lucide-react'
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

export function PublicHeader({ activeTo, brand, languageLabel, login, nav, searchLabel, subtitle, themeLabel }: PublicHeaderProps) {
  const { language, setLanguage } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const nextLanguage: Language = language === 'ar' ? 'en' : 'ar'

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
          languageLabel={languageLabel}
          login={login}
          nextLanguage={nextLanguage}
          searchLabel={searchLabel}
          setLanguage={setLanguage}
          theme={theme}
          themeLabel={themeLabel}
          toggleTheme={toggleTheme}
        />

        <details className="public-mobile-menu">
          <summary aria-label="Open menu">
            <Menu size={22} />
          </summary>
          <div className="public-mobile-menu__panel">
            <nav aria-label="Mobile site links">
              {nav.map((item) => {
                const Icon = item.icon
                return (
                  <Link className={item.to === activeTo ? 'is-active' : ''} key={item.to} to={item.to}>
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </nav>
            <HeaderActions
              languageLabel={languageLabel}
              login={login}
              nextLanguage={nextLanguage}
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
  languageLabel,
  login,
  nextLanguage,
  searchLabel,
  setLanguage,
  theme,
  themeLabel,
  toggleTheme,
}: {
  languageLabel: string
  login: string
  nextLanguage: Language
  searchLabel: string
  setLanguage: (language: Language) => void
  theme: 'light' | 'dark'
  themeLabel: string
  toggleTheme: () => void
}) {
  return (
    <div className="public-actions">
      <button className="public-icon-button" type="button" aria-label={searchLabel}>
        <Search size={19} />
      </button>
      <button className="public-icon-button" onClick={toggleTheme} type="button" aria-label={themeLabel}>
        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
      </button>
      <button className="public-language-button" onClick={() => setLanguage(nextLanguage)} type="button">
        <Languages size={17} />
        {languageLabel}
      </button>
      <Link className="login-button" to="/login">
        <LogIn size={17} />
        {login}
      </Link>
    </div>
  )
}
