import { BookOpen, GraduationCap, MapPin, Star } from 'lucide-react'

type ScholarAboutHighlightsProps = {
  copy: Record<string, string>
  scholar: {
    country: string
    courses: number
    field: string
    lessons: number
    rating: string
  }
}

export function ScholarAboutHighlights({ copy, scholar }: ScholarAboutHighlightsProps) {
  return (
    <aside className="scholar-profile-side">
      <article className="scholar-profile-card">
        <h2>{copy.highlights}</h2>
        <dl className="scholar-profile-info">
          <div>
            <dt>{copy.field}</dt>
            <dd>{scholar.field}</dd>
          </div>
          <div>
            <dt>{copy.country}</dt>
            <dd>
              <MapPin size={15} />
              {scholar.country}
            </dd>
          </div>
          <div>
            <dt>{copy.courses}</dt>
            <dd>
              <GraduationCap size={15} />
              {scholar.courses}
            </dd>
          </div>
          <div>
            <dt>{copy.lessons}</dt>
            <dd>
              <BookOpen size={15} />
              {scholar.lessons}
            </dd>
          </div>
          <div>
            <dt>{copy.rating}</dt>
            <dd>
              <Star size={15} />
              {scholar.rating}
            </dd>
          </div>
        </dl>
      </article>
    </aside>
  )
}
