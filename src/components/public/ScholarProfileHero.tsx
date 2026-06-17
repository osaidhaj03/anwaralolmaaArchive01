import { Mail } from 'lucide-react'
import { Link } from 'react-router-dom'

type ScholarProfileHeroProps = {
  breadcrumb: string
  field: string
  name: string
  title: string
  aboutLabel: string
  contactLabel: string
  aboutTo: string
  image: string
}

export function ScholarProfileHero({
  breadcrumb,
  field,
  name,
  title,
  aboutLabel,
  contactLabel,
  aboutTo,
  image,
}: ScholarProfileHeroProps) {
  return (
    <section className="scholar-profile-hero islamic-soft-pattern">
      <div className="public-container scholar-profile-hero__inner">
        <span>{breadcrumb}</span>
        <div className="scholar-profile-head">
          <div className="scholar-profile-copy">
            <small>{field}</small>
            <h1>{name}</h1>
            <p>{title}</p>
            <div className="scholar-profile-actions">
              <Link to={aboutTo}>{aboutLabel}</Link>
              <Link to="/login">
                <Mail size={16} />
                {contactLabel}
              </Link>
            </div>
          </div>
          <div className="scholar-profile-photo-card">
            <img alt={name} src={image} />
          </div>
        </div>
      </div>
    </section>
  )
}
