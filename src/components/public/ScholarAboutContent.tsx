import { BookOpen, GraduationCap, Landmark } from 'lucide-react'

type ScholarAboutContentProps = {
  copy: Record<string, string>
  bioLong?: string
}

export function ScholarAboutContent({ copy, bioLong }: ScholarAboutContentProps) {
  return (
    <div className="scholar-profile-main">
      <article className="scholar-profile-card">
        <h2>{copy.title}</h2>
        <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.7' }}>{bioLong || copy.text}</p>
      </article>
      <article className="scholar-profile-card">
        <h2>{copy.expertise}</h2>
        <div className="scholar-profile-course-list">
          <article>
            <div className="scholar-profile-course-mark">
              <GraduationCap size={22} />
            </div>
            <div>
              <h3>{copy.teaching}</h3>
              <p>{copy.teachingText}</p>
            </div>
          </article>
          <article>
            <div className="scholar-profile-course-mark">
              <BookOpen size={22} />
            </div>
            <div>
              <h3>{copy.references}</h3>
              <p>{copy.referencesText}</p>
            </div>
          </article>
          <article>
            <div className="scholar-profile-course-mark">
              <Landmark size={22} />
            </div>
            <div>
              <h3>{copy.outreach}</h3>
              <p>{copy.outreachText}</p>
            </div>
          </article>
        </div>
      </article>
    </div>
  )
}
