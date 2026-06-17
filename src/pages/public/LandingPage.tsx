import { useState } from 'react'
import { LandingHero } from '../../components/public/LandingHero'
import { LandingPreviewSection } from '../../components/public/LandingPreviewSection'
import { PublicPageFooter, PublicPageHeader } from '../../components/public/PublicPageChrome'
import { useNavigate } from 'react-router-dom'
import { useArchiveStats, useLocalizedArchive } from '../../context/ArchiveDataContext'
import { useLanguage } from '../../context/LanguageContext'
import { landingCopy } from '../../data/public/landing'

export function LandingPage() {
  const { dir, language } = useLanguage()
  const copy = landingCopy[language]
  const archive = useLocalizedArchive(language)
  const stats = useArchiveStats()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const heroBadge = language === 'ar' ? 'منصة علمية موثوقة' : 'A Trusted Scholarly Platform'
  const heroAccent = language === 'ar' ? 'إرشاد القلوب بالعلم الأصيل' : 'Guiding Hearts with Authentic Knowledge'
  const normalizedStats = copy.stats.map((item, index) => ({
    ...item,
    value: [
      String(stats.public.courses),
      new Intl.NumberFormat('en-US').format(stats.public.lessons),
      String(stats.public.scholars),
      String(stats.public.books),
      String(stats.public.categories),
    ][index],
  }))

  function submitSearch() {
    const query = search.trim()
    navigate(query ? `/search?q=${encodeURIComponent(query)}` : '/search')
  }

  return (
    <main className="public-site" dir={dir}>
      <PublicPageHeader activeTo="/" copy={copy} />

      <LandingHero
        accent={heroAccent}
        badge={heroBadge}
        onSearchChange={setSearch}
        onSubmit={submitSearch}
        placeholder={copy.heroPlaceholder}
        searchButton={copy.searchButton}
        searchValue={search}
        stats={normalizedStats}
        text={copy.heroText}
        title={copy.heroTitle}
      />

      <LandingPreviewSection
        items={archive.categories.slice(0, 6)}
        kind="categories"
        link={language === 'ar' ? 'عرض جميع الأقسام' : 'View all categories'}
        linkTo="/categories"
        title={copy.categoriesTitle}
      />

      <LandingPreviewSection items={archive.courses.slice(0, 4)} kind="courses" link={copy.coursesLink} linkTo="/courses" title={copy.coursesTitle} />

      <LandingPreviewSection items={archive.scholars.slice(0, 6)} kind="scholars" link={copy.scholarsLink} linkTo="/scholars" title={copy.scholarsTitle} />

      <LandingPreviewSection
        items={archive.books.slice(0, 5).map((book) => ({ title: book.title }))}
        kind="books"
        link={language === 'ar' ? 'عرض المكتبة' : 'Open library'}
        linkTo="/library"
        meta={copy.bookMeta}
        title={copy.booksTitle}
      />

      <PublicPageFooter
        copy={copy}
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
