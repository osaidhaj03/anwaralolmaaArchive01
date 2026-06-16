import { Bookmark, Play, Search } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PublicFooter } from '../../components/PublicFooter'
import { PublicHeader } from '../../components/PublicHeader'
import { PublicSectionHeading } from '../../components/public/PublicSectionHeading'
import { useLanguage } from '../../context/LanguageContext'
import { landingCopy } from '../../data/public/landing'
import { scholarsCopy } from '../../data/public/scholars'

export function LandingPage() {
  const { dir, language } = useLanguage()
  const copy = landingCopy[language]
  const scholarsPageCopy = scholarsCopy[language]
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const categoryIds = ['quran', 'aqidah', 'fiqh', 'hadith', 'seerah', 'arabic']
  const heroBadge = language === 'ar' ? 'منصة علمية موثوقة' : 'A Trusted Scholarly Platform'
  const heroAccent = language === 'ar' ? 'إرشاد القلوب بالعلم الأصيل' : 'Guiding Hearts with Authentic Knowledge'

  function submitSearch() {
    const query = search.trim()
    navigate(query ? `/search?q=${encodeURIComponent(query)}` : '/search')
  }

  return (
    <main className="public-site" dir={dir}>
      <PublicHeader activeTo="/" brand={copy.brand} languageLabel={copy.languageLabel} login={copy.login} nav={copy.nav} searchLabel={copy.searchLabel} subtitle={copy.subtitle} themeLabel={copy.themeLabel} />

      <section className="hero-section islamic-soft-pattern" id="home">
        <div className="public-container hero-grid">
          <div className="hero-copy">
            <span className="hero-badge"><Bookmark size={16} />{heroBadge}</span>
            <h1>{copy.heroTitle}</h1>
            <h2>{heroAccent}</h2>
            <p>{copy.heroText}</p>
            <label className="hero-search">
              <Search size={21} />
              <input onChange={(event) => setSearch(event.target.value)} onKeyDown={(event) => event.key === 'Enter' ? submitSearch() : undefined} placeholder={copy.heroPlaceholder} value={search} />
              <button onClick={submitSearch} type="button">{copy.searchButton}</button>
            </label>
          </div>

          <div className="hero-visual">
            <div aria-hidden="true" className="hero-visual-spacer" />
          </div>
        </div>

        <div className="public-container stat-strip">
          {copy.stats.map(({ value, label, icon: Icon }) => (
            <div key={label}>
              <Icon size={24} />
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="public-section" id="categories">
        <PublicSectionHeading link={language === 'ar' ? 'عرض جميع الأقسام' : 'View all categories'} linkTo="/categories" title={copy.categoriesTitle} />
        <div className="public-container category-grid">
          {copy.categories.map((category, index) => {
            const Icon = category.icon
            return (
              <Link className="category-card" key={category.title} to={`/categories/${categoryIds[index]}`}>
                <span>
                  <Icon size={28} />
                </span>
                <h3>{category.title}</h3>
                <p>{category.text}</p>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="public-section" id="courses">
        <PublicSectionHeading link={copy.coursesLink} linkTo="/courses" title={copy.coursesTitle} />
        <div className="public-container courses-row">
          {copy.courses.map((course, index) => (
            <Link className="course-card" key={course.title} to={`/courses/${index + 1}`}>
              <div className={`course-cover tone-${course.tone}`}>
                <span>{course.title}</span>
              </div>
              <div>
                <h3>{course.title}</h3>
                <p>{course.teacher}</p>
                <small>{course.lessons}</small>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="public-section" id="scholars">
        <PublicSectionHeading link={copy.scholarsLink} linkTo="/scholars" title={copy.scholarsTitle} />
        <div className="public-container scholars-row">
          {scholarsPageCopy.scholars.slice(0, 6).map((scholar, index) => (
            <Link className="scholar-card" key={scholar.name} to={`/scholars/${index + 1}`}>
              <img alt={scholar.name} src={scholar.image} />
              <strong>{scholar.name}</strong>
            </Link>
          ))}
        </div>
      </section>

      <section className="public-section">
        <PublicSectionHeading link={copy.latestLink} linkTo="/courses" title={copy.latestTitle} />
        <div className="public-container latest-lessons">
          {copy.lessons.map((lesson, index) => (
            <article key={lesson.title}>
              <Link to={`/courses/${(index % 4) + 1}`}>
                <Play size={18} />
              </Link>
              <div>
                <h3>{lesson.title}</h3>
                <p>{lesson.meta}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="public-section" id="books">
        <PublicSectionHeading link={language === 'ar' ? 'عرض المكتبة' : 'Open library'} linkTo="/library" title={copy.booksTitle} />
        <div className="public-container book-row">
          {copy.books.map((book, index) => (
            <Link className="book-card" key={book} to={`/library/${index + 1}`}>
              <div />
              <h3>{book}</h3>
              <p>{copy.bookMeta}</p>
            </Link>
          ))}
        </div>
      </section>

      <PublicFooter
        brand={copy.brand}
        footerText={copy.footerText}
        newsletterButton={copy.newsletterButton}
        newsletterPlaceholder={copy.newsletterPlaceholder}
        newsletterText={copy.newsletterText}
        newsletterTitle={copy.newsletterTitle}
        quickLinks={copy.quickLinks}
        quickLinksItems={[
          { label: copy.coursesTitle, to: '/courses' },
          { label: copy.scholarsTitle, to: '/scholars' },
          { label: copy.categoriesTitle, to: '/categories' },
        ]}
        successText={copy.newsletterSuccess}
      />
    </main>
  )
}
