import { Link } from 'react-router-dom'
import { BookOpen, GraduationCap, Moon, Sun, UsersRound } from 'lucide-react'
import { BrandMark } from '../AdminIcons'
import type { Language } from '../../context/LanguageContext'
import type { Theme } from '../../context/ThemeContext'

type LoginVisualProps = {
  copy: Record<string, string>
  language: Language
  theme: Theme
  onLanguageChange: (language: Language) => void
  onThemeToggle: () => void
}

export function LoginVisual({ copy, language, onLanguageChange, onThemeToggle, theme }: LoginVisualProps) {
  return (
    <section className="login-visual">
      <div className="login-language">
        <button aria-label="Toggle dark mode" onClick={onThemeToggle} type="button">
          {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
        </button>
        <button className={language === 'ar' ? 'is-active' : ''} onClick={() => onLanguageChange('ar')} type="button">
          AR
        </button>
        <button className={language === 'en' ? 'is-active' : ''} onClick={() => onLanguageChange('en')} type="button">
          EN
        </button>
      </div>

      <Link className="login-brand" to="/">
        <BrandMark />
        <div>
          <strong>{copy.brand}</strong>
          <span>{copy.subtitle}</span>
        </div>
      </Link>

      <div className="login-arch">
        <img alt={copy.brand} src="/brand/channel-banner.jpg" />
      </div>

      <div className="login-visual-copy">
        <h2>{copy.headline}</h2>
        <p>{copy.text}</p>
        <div className="login-benefits">
          <span>
            <BookOpen size={24} />
            {copy.books}
          </span>
          <span>
            <GraduationCap size={24} />
            {copy.lessons}
          </span>
          <span>
            <UsersRound size={24} />
            {copy.scholars}
          </span>
        </div>
      </div>
    </section>
  )
}
