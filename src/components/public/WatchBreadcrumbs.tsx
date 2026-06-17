import { Link } from 'react-router-dom'
import type { Language } from '../../context/LanguageContext'

type WatchBreadcrumbsProps = {
  category: string
  courseTitle: string
  language: Language
}

export function WatchBreadcrumbs({ category, courseTitle, language }: WatchBreadcrumbsProps) {
  return (
    <span className="custom-watch-breadcrumbs">
      <Link to="/">{language === 'ar' ? 'الرئيسية' : 'Home'}</Link> &gt;{' '}
      <Link to="/courses">{language === 'ar' ? 'الدورات' : 'Courses'}</Link> &gt;{' '}
      <Link to={`/categories/${category}`}>{category}</Link> &gt;{' '}
      <span className="current-watch-crumb">{courseTitle}</span>
    </span>
  )
}
