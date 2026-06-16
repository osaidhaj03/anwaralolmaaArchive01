import { Clock3 } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { PublicHeader } from '../../components/PublicHeader'
import { useLanguage, type Language } from '../../context/LanguageContext'
import { scholarsCopy } from './ScholarsPage'

const aboutCopy: Record<Language, Record<string, string>> = {
  ar: {
    breadcrumb: 'الرئيسية / المشايخ / نبذة',
    title: 'قريباً',
    text: 'صفحة النبذة التفصيلية لهذا العالم ستضاف بعد تثبيت المحتوى العام والروابط المرجعية.',
    back: 'العودة إلى صفحة المشايخ',
  },
  en: {
    breadcrumb: 'Home / Scholars / About',
    title: 'Coming soon',
    text: 'The full biography page for this scholar will be added after the public content structure is finalized.',
    back: 'Back to scholars',
  },
}

export function ScholarAboutComingSoonPage() {
  const { scholarId } = useParams()
  const { dir, language } = useLanguage()
  const copy = aboutCopy[language]
  const scholarsPageCopy = scholarsCopy[language]
  const index = Number(scholarId) - 1
  const scholar = scholarsPageCopy.scholars[index]

  if (!scholar) {
    return <Navigate to="/scholars" replace />
  }

  return (
    <main className="public-site" dir={dir}>
      <PublicHeader activeTo="/scholars" brand={scholarsPageCopy.brand} languageLabel={scholarsPageCopy.languageLabel} login={scholarsPageCopy.login} nav={scholarsPageCopy.nav} searchLabel={scholarsPageCopy.searchLabel} subtitle={scholarsPageCopy.subtitle} themeLabel={scholarsPageCopy.themeLabel} />
      <section className="public-container public-coming-soon">
        <span>{copy.breadcrumb}</span>
        <div className="public-coming-soon__card">
          <Clock3 size={34} />
          <h1>{copy.title}</h1>
          <strong>{scholar.name}</strong>
          <p>{copy.text}</p>
          <Link to="/scholars">{copy.back}</Link>
        </div>
      </section>
    </main>
  )
}
