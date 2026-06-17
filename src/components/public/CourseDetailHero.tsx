import type { Language } from '../../context/LanguageContext'
import { WatchBreadcrumbs } from './WatchBreadcrumbs'

type CourseDetailHeroProps = {
  category: string
  courseTitle: string
  language: Language
}

export function CourseDetailHero({ category, courseTitle, language }: CourseDetailHeroProps) {
  return (
    <section className="course-detail-hero islamic-soft-pattern">
      <div className="public-container course-detail-hero__inner">
        <WatchBreadcrumbs category={category} courseTitle={courseTitle} language={language} />
      </div>
    </section>
  )
}
